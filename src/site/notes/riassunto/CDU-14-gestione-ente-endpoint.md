---
{"dg-publish":true,"permalink":"/riassunto/cdu-14-gestione-ente-endpoint/","dg-note-properties":{}}
---

# CDU-14 — Gestione enti ed endpoint (Back Office + API per le aziende)

**Perimetro:** FE ✅ · BE ✅ — Riferimenti: SRS v10 §6.14, §6.17, §7.4, §8.3.7, §8.3.8, §8.3.10, §8.3.23, §8.4.3, §8.4.6, §8.4.7; ADR-006.

## Cosa fa

Gestisce l'anagrafica degli **enti** (ASR, enti nazionali e regionali) e dei loro **endpoint**, cioè gli URL dei SIA a cui il sistema notifica le variazioni dei consensi. Per ogni endpoint si indica per quali sotto-tipi di consenso è attivo.

Quando si aggiunge un endpoint a un consenso già attivo, il nuovo SIA va **allineato** con i consensi esistenti. Il sistema non fa push massivi: imposta `stato_allineamento = DA_ALLINEARE`, avvisa il SIA fuori banda (email e/o webhook) e il SIA scarica i dati in PULL con [CDU-17](CDU-17-snapshot-pull.md).

**Doppia esposizione**: le stesse operazioni su endpoint (inserimento, modifica, eliminazione) sono disponibili
- dalla **webapp Operatore**, in chiamata diretta senza API Manager;
- per le **aziende**, via **API Manager APIMBBONE** (servono anche per allineamento e manutenzione, §7.4).

## Precondizioni

Operatore autenticato (webapp); SIA autenticato su APIMBBONE (API).

## Flusso (webapp)

1. "Configurazione" → "Gestione Enti ed Endpoint" → elenco enti.
2. Nuovo ente o modifica di uno esistente.
3. Per l'ente, uno o più endpoint: URL, sotto-tipi associati, destinazione, validità.
4. Salvataggio in `cons_d_asr`, `cons_t_endpoint`, `cons_r_asr_endpoint`, `cons_r_sotto_tipo_cons_asr_endpoint`.
5. Ogni salvataggio di endpoint imposta `stato_allineamento = DA_ALLINEARE`.
6. Nuovo endpoint su consenso già attivo: notifica out-of-band al SIA (email, webhook o entrambe, scelta da un parametro). Per il webhook è il SIA a esporre un REST, con contratto, firma e sicurezza forniti da CSI.

## Campi

**Ente**

| Campo | Obbl. | Validazione |
|---|---|---|
| cod_asr | sì | max 10, univoco ("Codice ente già esistente") |
| desc_asr | sì | max 255 |
| tipo_ente | sì | NAZIONALE / REGIONALE / AZIENDALE (**colonna nuova**) |
| data_creazione | display | |
| data_cancellazione | no | cancellazione logica |

**Endpoint**

| Campo | Obbl. | Validazione |
|---|---|---|
| endp_url | sì | URL https valido ("URL non valido") |
| cod_asr | sì | FK `cons_d_asr` |
| sotto_tipo_consenso | sì | multi, FK `cons_d_sotto_tipo_cons` |
| destinazione_id | no | FK `cons_d_asr_destinazione`: `NOTIFICA_CONSENSO` (default, anche se vuoto) o `WEBHOOK_ALLINEAMENTO` (ADR-024) |
| valida_inizio | sì | ≤ valida_fine |
| valida_fine | no | > valida_inizio |
| stato_allineamento | display | DA_ALLINEARE / IN_CORSO / COMPLETATO / ERRORE (sola lettura) |

## Logica di backend

- Salvataggio ente: INSERT/UPDATE `cons_d_asr` (+ audit).
- Salvataggio endpoint (transazione unica):
  1. INSERT/UPDATE `cons_t_endpoint` (`endp_url`, validità);
  2. INSERT `cons_r_asr_endpoint` (`cod_asr`, `endp_id`, validità, **`stato_allineamento = 'DA_ALLINEARE'`**);
  3. per ogni sotto-tipo: INSERT `cons_r_sotto_tipo_cons_asr_endpoint`;
  4. se il consenso ha già un endpoint attivo per l'azienda (caso CDU-17): invio della notifica out-of-band in base al parametro (email/webhook), tracciata in `cons_t_traccia_serv_est`.
- Eliminazione: logica (`valida_fine` / `data_cancellazione`), non fisica. Gli endpoint dismessi escludono l'azienda dagli elenchi. Regola provvisoria: azienda visibile con almeno un endpoint attivo (BE-16); DEV-01 da confermare con CSI.
- Destinazione (ADR-024): solo gli endpoint `NOTIFICA_CONSENSO` (o senza destinazione) ricevono le notifiche e partecipano all'allineamento. L'URL del webhook out-of-band è un endpoint `WEBHOOK_ALLINEAMENTO` dell'ente, senza `stato_allineamento`; se manca, il webhook non parte e l'errore va in `cons_t_traccia_serv_est`.
- Disattivazione ente (requisito CSI V03, SRS rev. 1.12 §6.14): la fine validità si propaga a `cons_r_asr_endpoint`, `cons_r_sotto_tipo_cons_asr_endpoint` e `cons_r_informativa_asr`; l'eliminazione di un endpoint chiude anche i suoi legami. Blocchi su modifica/disattivazione: da chiedere a CSI (DEV-12).
- Effetti su altri CDU: CDU-09/10/11 non generano notifiche verso endpoint `IN_CORSO` e bloccano l'acquisizione per quel sotto-tipo finché l'allineamento è in corso. BATCH-01 legge l'URL di destinazione.

## API esposte alle aziende (via APIMBBONE)

Servizi CRUD endpoint, più `PATCH /api/v1/endpoints/{endp_id}/stato-allineamento` (CDU-17) e `PATCH /api/v1/endpoints/{endp_id}/stato` (manutenzione, §7.4). Sicurezza come CDU-15/16: `EnteAuthorizationFilter`, l'azienda opera solo sui propri endpoint. Vanno descritti nell'OpenAPI.

## Come svilupparlo

**Backend**
- Service di dominio unico per enti/endpoint, usato da due controller: webapp (sessione PUA) e API aziende (APIM, `/api/v1/...`).
- Parametro di configurazione per il canale di notifica (EMAIL | WEBHOOK | ENTRAMBI) e client email/webhook.
- Migrazione: colonne `tipo_ente`, `stato_allineamento`, `cons_t_endpoint.destinazione_id`; tabella `cons_d_asr_destinazione` con seed (`NOTIFICA_CONSENSO`, `WEBHOOK_ALLINEAMENTO`); endpoint AS-IS valorizzati a `NOTIFICA_CONSENSO`.

**Frontend**
- Lista enti → dettaglio ente con elenco endpoint; form ente; form endpoint con multi-select dei sotto-tipi; badge `stato_allineamento` in sola lettura.

## Dipendenze

CDU-12 (sotto-tipi); CDU-17 e §7.4 consumano lo stato; BATCH-01 consuma gli URL.

## Punti aperti

- Contratto, firma e sicurezza del webhook verso i SIA (forniti da CSI); indirizzi email destinatari (dove si configurano?). L'URL del webhook si configura come endpoint `WEBHOOK_ALLINEAMENTO` (ADR-024).
- Blocchi su modifica/disattivazione di ente ed endpoint (DEV-12).
- Destinatari della notifica "endpoint aggiunto" quando l'azienda non ha ancora altri endpoint.
- Formalizzazione di `IN_MANUTENZIONE`: SRS rev. 1.18 (§7.4) lo separa da `stato_allineamento`, con orientamento a colonna di stato dedicata; il dettaglio resta alla progettazione.
- **A-01** API di aggiornamento ente (§6.14 passo 3) assente dall'OpenAPI 0.2-DRAFT: definire i campi modificabili, codice in sola lettura.
- **A-02** E-mail di avviso dell'endpoint (`notificaEmail`, canale e-mail PULL-02): da aggiungere alla maschera SRS §6.14 e al modello dati. Nel contratto attuale un campo vuoto mantiene il valore: per poterla cancellare serve un aggiornamento del contratto BE (mockup FE rev. 12).

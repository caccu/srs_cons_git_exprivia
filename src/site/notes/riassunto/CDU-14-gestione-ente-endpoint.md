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
| destinazione_id | no | FK `cons_d_asr_destinazione` (tabella nuova: NOTIFICA_CONSENSO, RECUPERO_STATO, CONFIGURAZIONE…) |
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
- Eliminazione: logica (`valida_fine` / `data_cancellazione`), non fisica. Gli endpoint dismessi escludono l'azienda dagli elenchi (regola DEV-01 da definire).
- Effetti su altri CDU: CDU-09/10/11 non generano notifiche verso endpoint `IN_CORSO` e bloccano l'acquisizione per quel sotto-tipo finché l'allineamento è in corso. BATCH-01 legge l'URL di destinazione.

## API esposte alle aziende (via APIMBBONE)

Servizi CRUD endpoint, più `PATCH /api/v1/endpoints/{endp_id}/stato-allineamento` (CDU-17) e `PATCH /api/v1/endpoints/{endp_id}/stato` (manutenzione, §7.4). Sicurezza come CDU-15/16: `EnteAuthorizationFilter`, l'azienda opera solo sui propri endpoint. Vanno descritti nell'OpenAPI.

## Come svilupparlo

**Backend**
- Service di dominio unico per enti/endpoint, usato da due controller: webapp (sessione PUA) e API aziende (APIM, `/api/v1/...`).
- Parametro di configurazione per il canale di notifica (EMAIL | WEBHOOK | ENTRAMBI) e client email/webhook.
- Migrazione: colonne `tipo_ente`, `stato_allineamento`; tabella `cons_d_asr_destinazione` con seed.

**Frontend**
- Lista enti → dettaglio ente con elenco endpoint; form ente; form endpoint con multi-select dei sotto-tipi; badge `stato_allineamento` in sola lettura.

## Dipendenze

CDU-12 (sotto-tipi); CDU-17 e §7.4 consumano lo stato; BATCH-01 consuma gli URL.

## Punti aperti

- Contratto, firma e sicurezza del webhook verso i SIA (forniti da CSI); indirizzi email destinatari (dove si configurano?).
- Destinatari della notifica "endpoint aggiunto" quando l'azienda non ha ancora altri endpoint.
- Formalizzazione dello stato `IN_MANUTENZIONE` (colonna dedicata o valore in più).

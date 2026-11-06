---
{"dg-publish":true,"permalink":"/riassunto/cdu-14-gestione-ente-endpoint/","dg-note-properties":{}}
---

# CDU-14 — Gestione enti ed endpoint (Back Office + API per le aziende)

**Perimetro:** FE ✅ · BE ✅ — Riferimenti: SRS v10 §6.14, §6.17, §7.4, §8.3.7, §8.3.8, §8.3.10, §8.3.23, §8.4.3, §8.4.6, §8.4.7; ADR-006; ADR-027 (proposta A+D del 06/11/2026, da confermare con CSI, ST-11).

## Cosa fa

Gestisce l'anagrafica degli **enti** (ASR, enti nazionali e regionali) e dei loro **endpoint**, cioè gli URL dei SIA a cui il sistema notifica le variazioni dei consensi. Per ogni endpoint si indica per quali sotto-tipi di consenso è attivo.

Quando si aggiunge un nuovo endpoint, il nuovo SIA va **allineato** con i consensi esistenti. Il sistema non fa push massivi: imposta `stato_allineamento = DA_ALLINEARE`. In **V1.0** l'operatore di back office aziendale scarica da questa pagina lo snapshot in un CSV identico a quello dell'allineamento massivo di oggi, e l'azienda lo carica come fa ora ([CDU-17](CDU-17-snapshot-pull.md)).

**Esposizione** (ADR-027, niente API Manager):
- le operazioni su enti ed endpoint (inserimento, modifica, eliminazione) si fanno **solo dalla webapp Operatore**;
- le **aziende** in V1.0 non chiamano nessun servizio: allineamento (CDU-17) e manutenzione (§7.4) li fa l'operatore da questa pagina (proposta A+D, ST-11; vincolo: nessun adeguamento per le ASR). I due `PATCH` per le aziende restano nel codice ma non sono esposti. ~~Mutual TLS (decisione dedotta).~~

## Precondizioni

Operatore autenticato (webapp, sessione PUA e JWT interno). In V1.0 nessuna chiamata dai SIA.

## Flusso (webapp)

1. "Configurazione" → "Gestione Enti ed Endpoint" → elenco enti.
2. Nuovo ente o modifica di uno esistente.
3. Per l'ente, uno o più endpoint: URL, sotto-tipi associati, destinazione, validità.
4. Salvataggio in `cons_d_asr`, `cons_t_endpoint`, `cons_r_asr_endpoint`, `cons_r_sotto_tipo_cons_asr_endpoint`.
5. La creazione di un endpoint imposta `stato_allineamento = DA_ALLINEARE`. La modifica non cambia lo stato (scelta esplicita: un endpoint COMPLETATO che cambia URL o destinazione resta COMPLETATO, riallineamento manuale se serve).
6. Nuovo endpoint: avviso all'azienda **solo via email** in V1.0 (parametro = `EMAIL`, proposta). Il webhook richiede che il SIA esponga un REST, quindi lavoro per le ASR: non si usa in V1.0.
7. Endpoint `DA_ALLINEARE`: pulsante «Scarica snapshot» (CDU-17). Il sistema restituisce il CSV e segna l'endpoint `COMPLETATO`.
8. Endpoint attivo: pulsante «Manutenzione» (`IN_MANUTENZIONE` / `ATTIVO`, §7.4), su richiesta dell'azienda.

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
| valida_inizio | sì | < valida_fine |
| valida_fine | no | > valida_inizio; fine esclusiva (fine al 30/10 = valido fino al 29/10) |
| stato_allineamento | display | DA_ALLINEARE / IN_CORSO / COMPLETATO / ERRORE (sola lettura) |

## Logica di backend

- Salvataggio ente: INSERT/UPDATE `cons_d_asr` (+ audit).
- Salvataggio endpoint (transazione unica):
  1. INSERT/UPDATE `cons_t_endpoint` (`endp_url`, validità);
  2. INSERT `cons_r_asr_endpoint` (`cod_asr`, `endp_id`, validità, **`stato_allineamento = 'DA_ALLINEARE'`**);
  3. per ogni sotto-tipo: INSERT `cons_r_sotto_tipo_cons_asr_endpoint`;
  4. sempre alla creazione (caso CDU-17): invio della notifica out-of-band in base al parametro (email/webhook), tracciata in `cons_t_traccia_serv_est`.
- Eliminazione: logica (`valida_fine` / `data_cancellazione`), non fisica. Gli endpoint dismessi escludono l'azienda dagli elenchi. Regola provvisoria: azienda visibile con almeno un endpoint attivo (BE-16); DEV-01 da confermare con CSI.
- Destinazione (ADR-024): solo gli endpoint `NOTIFICA_CONSENSO` (o senza destinazione) ricevono le notifiche e partecipano all'allineamento. L'URL del webhook out-of-band è un endpoint `WEBHOOK_ALLINEAMENTO` dell'ente, senza `stato_allineamento`; se manca, il webhook non parte e l'errore va in `cons_t_traccia_serv_est`.
- Disattivazione ente (requisito CSI V03, SRS rev. 1.12 §6.14): la fine validità si propaga a `cons_r_asr_endpoint`, `cons_r_sotto_tipo_cons_asr_endpoint` e `cons_r_informativa_asr`; l'eliminazione di un endpoint chiude anche i suoi legami. Blocchi su modifica/disattivazione: da chiedere a CSI (DEV-12).
- Effetti su altri CDU: CDU-09/10/11 non generano notifiche verso endpoint `IN_CORSO` e bloccano l'acquisizione per quel sotto-tipo finché l'allineamento è in corso. BATCH-01 legge l'URL di destinazione.

## Servizi per allineamento e manutenzione (V1.0 solo webapp, tramite BFF)

- `GET /api/v1/endpoints/{endp_id}/snapshot?codice_consenso=` → CSV (CDU-17).
- `PATCH /api/v1/endpoints/{endp_id}/stato` (manutenzione, §7.4).
- `PATCH .../stato-allineamento` non serve in V1.0: COMPLETATO lo imposta lo scaricamento.
- ⚠️ L'ente si ricava dall'abilitazione dell'operatore nel JWT, **non dall'header dell'API Manager** (rischio ST-14). Il CRUD degli endpoint resta solo nella webapp. Vanno descritti nell'OpenAPI (PULL-09).
- Scenario futuro, con i due `PATCH` chiamati dal SIA: richiede sviluppo da parte delle ASR, non previsto.

## Come svilupparlo

**Backend**
- Service di dominio unico per enti/endpoint. In V1.0 un solo controller: webapp tramite BFF (sessione PUA, JWT interno). Il controller per le aziende resta nel codice, non esposto.
- Parametro di configurazione per il canale di notifica (EMAIL | WEBHOOK | ENTRAMBI): in V1.0 `EMAIL`.
- Migrazione: colonne `tipo_ente`, `stato_allineamento`, `cons_t_endpoint.destinazione_id`; tabella `cons_d_asr_destinazione` con seed (`NOTIFICA_CONSENSO`, `WEBHOOK_ALLINEAMENTO`); endpoint AS-IS valorizzati a `NOTIFICA_CONSENSO`.

**Frontend**
- Lista enti → dettaglio ente con elenco endpoint; form ente; form endpoint con multi-select dei sotto-tipi; badge `stato_allineamento` in sola lettura.
- Pulsanti «Scarica snapshot» (solo endpoint `DA_ALLINEARE`) e «Manutenzione» (inizio e fine).

## Dipendenze

CDU-12 (sotto-tipi); CDU-17 e §7.4 consumano lo stato; BATCH-01 consuma gli URL.

## Punti aperti

- Webhook verso i SIA: solo scenario futuro (richiede sviluppo da parte delle ASR). In V1.0 email: indirizzi dei destinatari, dove si configurano? L'URL del webhook resta configurabile come endpoint `WEBHOOK_ALLINEAMENTO` (ADR-024).
- Blocchi su modifica/disattivazione di ente ed endpoint (DEV-12).
- Destinatari della notifica "endpoint aggiunto" quando l'azienda non ha ancora altri endpoint.
- Formalizzazione di `IN_MANUTENZIONE`: SRS rev. 1.18 (§7.4) lo separa da `stato_allineamento`, con orientamento a colonna di stato dedicata; il dettaglio resta alla progettazione.
- **A-01** API di aggiornamento ente (§6.14 passo 3) assente dall'OpenAPI 0.2-DRAFT. Campi modificabili recepiti in SRS rev. 1.27 dal requisito CSI V03: descrizione ente, data fine validità, eliminazione endpoint; codice, tipo ente e data creazione in sola lettura. Resta al BE la definizione dell'API. Il mockup rev. 12 (pag. 31) lascia modificabile il tipo ente (N-09): deciso il 29/10/2026 che resta in sola lettura, il FE allinea la schermata.
- **A-02** E-mail di avviso dell'endpoint: recepita in SRS rev. 1.26 (campo facoltativo `notifica_email` nella maschera Endpoint e in `cons_t_endpoint`). Nel contratto attuale un campo vuoto mantiene il valore: per poterla cancellare serve un aggiornamento del contratto BE (mockup FE rev. 12). Destinatari dell'avviso: proposta, conferma CSI richiesta.

---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-024-cdu-14-destinazione-endpoint/","title":"CDU-14 — valori del campo Destinazione degli endpoint","tags":["cdu-14","cdu-17","batch-01","modello-dati","migrazione"],"dg-note-properties":{"adr":24,"title":"CDU-14 — valori del campo Destinazione degli endpoint","status":"accepted","date":"2026-10-15","deciders":["Exprivia (Marco Forneris)"],"supersedes":[],"superseded-by":[],"tags":["cdu-14","cdu-17","batch-01","modello-dati","migrazione"],"related_wiki":["[[ADR-006-batch-03-pull-cdu-17]]","[[ADR-007-batch-01-5min-skip-locked]]","[[alternativa-batch-03-pull|Alternativa BATCH-03 — PULL CDU-17 (centro stella)]]","[[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI]]"],"sources":["2026-03-02-conspref-srs-v1-revised"]}}
---


# ADR-024: CDU-14 — valori del campo Destinazione degli endpoint

## Status

`accepted`: decisione interna Exprivia del 15/10/2026, su domanda del team FE. Non serve chiedere a CSI: la tabella `cons_d_asr_destinazione` è una proposta Exprivia (marcata `[PROPOSTA]` nelle bozze SRS v2÷v4) e non compare nei requisiti CSI V03, che per l'endpoint chiedono solo URL e sotto-tipi.

## Context

La maschera endpoint di CDU-14 (SRS §6.14) ha un campo facoltativo `destinazione_id`, FK verso la tabella nuova `cons_d_asr_destinazione` (SRS §8.4.7). L'SRS v10 riportava i valori solo come esempi (NOTIFICA_CONSENSO, RECUPERO_STATO, CONFIGURAZIONE in un punto; NOTIF, QUERY, CONFIG in un altro) e non diceva cosa significhi lasciare il campo vuoto.

Gli endpoint di `cons_t_endpoint` sono URL che il sistema **chiama**. CDU-15 (recupero stato) e CDU-16 (configurazione) vanno nella direzione opposta: è il SIA a chiamare il sistema tramite APIMBBONE. RECUPERO_STATO e CONFIGURAZIONE non corrispondono quindi a nessun endpoint configurabile.

Le chiamate in uscita verso il SIA previste dall'SRS sono due:
1. notifica delle variazioni dei consensi (`cons_t_notifica`, BATCH-01, [[wiki/docs/adr/ADR-007-batch-01-5min-skip-locked\|ADR-007]]);
2. avviso out-of-band di nuovo endpoint da allineare, canale webhook (CDU-14 passo 6, CDU-17 PULL-02, [[wiki/docs/adr/ADR-006-batch-03-pull-cdu-17\|ADR-006]]). L'SRS non diceva dove si configura l'URL di questo webhook.

## Decision

- `cons_d_asr_destinazione` contiene due valori, caricati dagli script di migrazione:

  | `destinazione_cod` | `destinazione_desc` | Chi usa l'URL |
  |---|---|---|
  | `NOTIFICA_CONSENSO` | Notifica variazioni consensi | Notifiche ai SIA (`cons_t_notifica`, BATCH-01) |
  | `WEBHOOK_ALLINEAMENTO` | Avviso nuovo endpoint da allineare (webhook) | Notifica out-of-band CDU-14 / CDU-17, canale webhook |

- La colonna `destinazione_id` (FK, facoltativa) è aggiunta a `cons_t_endpoint`.
- **Campo vuoto = `NOTIFICA_CONSENSO`.** In migrazione tutti gli endpoint AS-IS sono valorizzati a `NOTIFICA_CONSENSO`; il BE tratta comunque NULL come `NOTIFICA_CONSENSO`.
- FE: select popolata da `cons_d_asr_destinazione`, preselezionata su `NOTIFICA_CONSENSO`. Il campo resta facoltativo, come da SRS.
- Solo gli endpoint `NOTIFICA_CONSENSO` generano record in `cons_t_notifica` e partecipano all'allineamento (`stato_allineamento`, blocco acquisizioni, CDU-17).
- Per gli endpoint `WEBHOOK_ALLINEAMENTO` `stato_allineamento` non è valorizzato e la maschera non lo mostra.
- Se il parametro di canale prevede il webhook e l'ente non ha un endpoint `WEBHOOK_ALLINEAMENTO` valido per il sotto-tipo, il webhook non parte e l'evento è tracciato come errore in `cons_t_traccia_serv_est`.

## Consequences

### Positive
- Il FE ha valori definiti e una regola per il campo vuoto.
- Risolve il punto aperto «dove si configura l'URL del webhook» senza tabelle né parametri nuovi.
- Nessun impatto sugli endpoint AS-IS: continuano a ricevere le notifiche.
- Elimina l'incoerenza dei codici nell'SRS (NOTIFICA_CONSENSO vs NOTIF).

### Negative
- Le query che selezionano gli endpoint per notifiche e allineamento devono filtrare anche per destinazione (`NOTIFICA_CONSENSO` o NULL).
- Colonna nuova su `cons_t_endpoint` negli script di migrazione.

### Neutral
- Altre destinazioni si aggiungono alla tabella, ma ognuna richiede uno sviluppo che la gestisca.
- Contratto, firma e sicurezza del webhook restano a carico di CSI (punto già aperto in ADR-006): qui si decide solo dove si configura l'URL.

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| Tenere RECUPERO_STATO e CONFIGURAZIONE | Corrispondono a servizi chiamati dal SIA, non a URL chiamati dal sistema |
| Rendere il campo obbligatorio | Contrasta con l'SRS (facoltativo) e richiede comunque un default per gli endpoint migrati |
| URL del webhook in un parametro di configurazione per ente | Tabella o parametro in più, mentre `cons_t_endpoint` gestisce già URL, validità e collegamento all'ente |
| Chiedere i valori a CSI | La tabella è una proposta Exprivia, non un requisito CSI |

## Open issues

- Aggiornare l'OpenAPI dei servizi endpoint esposti alle aziende (PULL-09) con il campo destinazione.

## References

- SRS v10 (rev. 1.11) §6.14, §8.4.7
- Requisiti CSI V03, «Gestione ente ed endpoint»
- `riassunto/CDU-14-gestione-ente-endpoint.md`, `riassunto/CDU-16-api-configurazione.md`
- [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI]] §12 BE-09

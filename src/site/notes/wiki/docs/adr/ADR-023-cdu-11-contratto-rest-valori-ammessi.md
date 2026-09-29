---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-023-cdu-11-contratto-rest-valori-ammessi/","title":"CDU-11 — contratto REST dedicato e valori ammessi da configurazione","tags":["cdu-11","api","webapp-operatore","modello-dati","migrazione"],"dg-note-properties":{"adr":23,"title":"CDU-11 — contratto REST dedicato e valori ammessi da configurazione","status":"accepted","date":"2026-09-29","deciders":["Exprivia (team FE e BE)"],"supersedes":[],"superseded-by":[],"tags":["cdu-11","api","webapp-operatore","modello-dati","migrazione"],"related_wiki":["[[ADR-008-ssot-form-renderer]]","[[ADR-015-storicizzazione-immutabile]]","[[ADR-021-perimetro-solo-operatore]]","[[2026-09-22-ricognizione-endpoint-as-is|Ricognizione endpoint AS-IS — riscontro sviluppo]]","[[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI]]"],"sources":["2026-09-22-ricognizione-endpoint-as-is","2026-09-25-riscontro-csi-domande-sviluppo"]}}
---


# ADR-023: CDU-11 — contratto REST dedicato e valori ammessi da configurazione

## Status

`accepted`: proposta Exprivia del 29/09/2026, confermata lo stesso giorno dai team fullstack FE e BE. Decisione interna: rientra nell'autorizzazione CSI del 25/09/2026 ad adeguare il FE Operatore ai servizi del nuovo BE, se compatibili con i requisiti (DEV-01).

## Context

Il team FE, avviando CDU-11 (Modifica del valore di un consenso per conto di un assistito), ha chiesto:

1. se usare l'endpoint AS-IS `PUT /informativa/update/{cfAssistito}/{cfOperatore}` e con quale payload per modificare una singola azienda;
2. da quale API leggere i valori ammessi di `valore_consenso`, che l'SRS vuole letti dalla configurazione.

L'endpoint AS-IS riceve l'intero oggetto `Informativa` con la lista `consenso_list` e aggiorna in blocco più aziende ([[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|ricognizione 22/09/2026]]). CDU-11 modifica invece un consenso per volta, una sola azienda per operazione (tracker FE-03). Il `cfOperatore` nel path è inoltre un dato fornito dal client. Nessuna API AS-IS espone i valori ammessi per sotto-tipo.

## Decision

- **Endpoint dedicato** sul nuovo BE per CDU-11:

  ```
  PUT /consensi/{cfAssistito}/valore
  {
    "sotto_tipo_consenso_id": 12,
    "cod_asr": "010",          // null per i consensi regionali
    "valore_consenso": "NO"
  }
  ```

  - `sotto_tipo_consenso_id` obbligatorio: con `cf_cittadino` e `cod_asr` identifica il record da storicizzare ([[wiki/docs/adr/ADR-015-storicizzazione-immutabile\|ADR-015]]).
  - CF dell'operatore letto dalla sessione, non dal path.
  - `fonte_id`, `login_operazione`, `ruoloop_id`, `cf_delegato` valorizzati dal BE.
  - Il BE ha già un endpoint equivalente, con lo stesso motore di storicizzazione di CDU-05: viene adeguato a questa forma, così il FE sviluppa da subito sul contratto definitivo.
- **Valori ammessi** esposti nel campo `valori_ammessi: [{valore, descrizione}]` della risposta che carica il consenso: una sola chiamata dal FE. Fonte: `cons_r_consenso_valore` (sotto-tipo ↔ valore, con validità), descrizioni in `cons_d_valore_cons`. È l'applicazione di [[wiki/docs/adr/ADR-008-ssot-form-renderer\|ADR-008]] al campo valore.
- **`cons_r_consenso_valore`** non esiste nel DB AS-IS: la crea e la popola il **team BE Exprivia** in migrazione, con SI/NO per tutti i sotto-tipi esistenti. I sotto-tipi nuovi li popola CDU-12.

## Consequences

### Positive
- Il FE costruisce subito sul contratto definitivo.
- Il CF operatore non è più un parametro manipolabile dal client.
- La composizione dinamica del campo valore è coperta senza un endpoint in più.

### Negative
- Il contratto REST del FE Operatore diverge dall'AS-IS su questa funzione: il PUT `/informativa/update` resta come riferimento di comportamento, non come vincolo.
- Lavoro BE aggiuntivo: DDL e popolamento di `cons_r_consenso_valore` nella migrazione.

### Neutral
- Il PUT AS-IS resta disponibile finché serve ad altri consumatori; la sua dismissione non è decisa qui.

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| Riuso del PUT AS-IS `/informativa/update/{cf}/{cfOperatore}` | Aggiornamento in blocco di più aziende; `cfOperatore` passato dal client |
| Endpoint dedicato `GET /sotto-tipi/{id}/valori` | Chiamata in più per il FE, senza vantaggi per CDU-11 |

## Open issues

- Aggiornare la specifica OpenAPI del BE Operatore con il nuovo endpoint e il campo `valori_ammessi`.

## References

- [[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|2026-09-22-ricognizione-endpoint-as-is]]: contratto REST AS-IS
- [[wiki/sources/2026-09-25-riscontro-csi-domande-sviluppo\|Riscontro CSI 25/09/2026]] §DEV-01
- [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI]] §10 BE-02, BE-03
- SRS v10 (rev. 1.9) §6.9, §6.10, §6.11, §8.3.24

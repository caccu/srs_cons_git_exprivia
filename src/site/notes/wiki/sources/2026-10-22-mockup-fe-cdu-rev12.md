---
{"dg-publish":true,"permalink":"/wiki/sources/2026-10-22-mockup-fe-cdu-rev12/","title":"Mockup FE Webapp Operatore (rev. 12) — verifica correzioni","tags":["frontend","mockup","webapp-operatore","cdu-06","cdu-08","cdu-09","cdu-10","cdu-11","cdu-12","cdu-13","cdu-14","form-renderer"],"dg-note-properties":{"title":"Mockup FE Webapp Operatore (rev. 12) — verifica correzioni","aliases":["Mockup FE Webapp Operatore (rev. 12) — verifica correzioni"],"type":"source","tags":["frontend","mockup","webapp-operatore","cdu-06","cdu-08","cdu-09","cdu-10","cdu-11","cdu-12","cdu-13","cdu-14","form-renderer"],"created":"2026-10-23","updated":"2026-10-23","sources":["2026-10-22-mockup-fe-cdu-rev12"],"related":["[[2026-10-22-mockup-fe-cdu-rev11|Mockup FE rev. 11 — verifica correzioni]]","[[2026-10-22-mockup-fe-cdu|Mockup FE rev. 10 — riscontro]]","[[informativa|Informativa]]","[[analysis-2026-05-14-punti-aperti-csi|Punti Aperti CSI]]"]}}
---


# Mockup FE Webapp Operatore (rev. 12) — verifica correzioni

**Fonte:** `raw/Consensi-mockup-cdu_v2.pdf`, «Proposte di schermate — Gestione consensi», revisione 12 del 22/10/2026, prodotto dallo sviluppatore FE dopo la [[wiki/sources/2026-10-22-mockup-fe-cdu-rev11\|verifica della rev. 11]]. 32 pagine con la stessa struttura della rev. 11: indice, 30 schermate (CDU-06, 08-14), pagina finale «Note funzionali e punti da confermare». CDU-14 riferita all'OpenAPI 0.2-DRAFT.

**Verifica:** Exprivia, 23/10/2026, contro la rev. 11 e l'SRS `revised_v10` rev. 1.19. Sei rifiniture su sette chiuse; N-01 parziale; una nuova incongruenza a pag. 31.

## Esito sulle rifiniture della rev. 11

| # | Esito | Dove |
|---|---|---|
| N-01 | 🟡 Parziale. La didascalia ora dice che in creazione si definisce se l'informativa è generale o specifica per gli enti selezionati, ma la schermata mostra ancora «Informativa generale» spuntata con l'elenco «Aziende associate» non chiaramente disabilitato; la mutua esclusione non è esplicitata | pag. 19-20 |
| N-02 | ✅ Modifica sotto-tipo con parametri in sola lettura | pag. 17-18 |
| N-03 | ✅ Testo di disattivazione legato alla regola provvisoria DEV-01 | pag. 29-30 |
| N-04 | ✅ Didascalia esplicita: l'e-mail si sostituisce ma non si cancella; la rimozione richiede un aggiornamento del contratto BE | pag. 27 |
| N-05 | ✅ | pag. 20 |
| N-06 | ✅ | — |
| N-07 | ✅ | pag. 13 |

## Nuova incongruenza

| # | Punto | Indicazione |
|---|---|---|
| N-08 | CDU-14 pag. 31 (Modifica ente): la didascalia dice «il codice è qui in sola lettura», ma il campo «Codice ente» appare modificabile | Rendere il campo visivamente in sola lettura, come in CDU-12 |

## Azioni fuori dal mockup

Invariate rispetto alla [[wiki/sources/2026-10-22-mockup-fe-cdu-rev11\|rev. 11]]: **A-01** (API di aggiornamento ente, BE) e **A-02** (`notificaEmail` in SRS §6.14 e nel modello dati) restano aperte. La pag. 25 e la pag. 31 lo dichiarano («l'API per Modifica ente è da integrare»). A-03 è chiuso con l'SRS rev. 1.19.

**Aperti con CSI:** DEV-01 (regola provvisoria «azienda visibile con almeno un endpoint attivo») e DEV-12 (disattivazione consentita anche durante allineamento o manutenzione), indicati come da confermare anche nella pagina finale del mockup ([[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|tracker]]).

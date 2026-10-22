---
{"dg-publish":true,"permalink":"/wiki/sources/2026-10-22-mockup-fe-cdu/","title":"Mockup FE Webapp Operatore (rev. 10) — riscontro","tags":["frontend","mockup","webapp-operatore","cdu-06","cdu-08","cdu-09","cdu-10","cdu-11","cdu-12","cdu-13","cdu-14","form-renderer"],"dg-note-properties":{"title":"Mockup FE Webapp Operatore (rev. 10) — riscontro","aliases":["Mockup FE Webapp Operatore (rev. 10) — riscontro"],"type":"source","tags":["frontend","mockup","webapp-operatore","cdu-06","cdu-08","cdu-09","cdu-10","cdu-11","cdu-12","cdu-13","cdu-14","form-renderer"],"created":"2026-10-22","updated":"2026-10-22","sources":["2026-10-22-mockup-fe-cdu"],"related":["[[composizione-dinamica-form-consenso|Composizione Dinamica Form Consenso]]","[[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]]","[[wiki/docs/adr/ADR-022-cdu-06-scarico-informativa-operatore\|ADR-022]]","[[ADR-023-cdu-11-contratto-rest-valori-ammessi|ADR-023]]","[[wiki/docs/adr/ADR-024-cdu-14-destinazione-endpoint\|ADR-024]]","[[2026-09-25-riscontro-csi-domande-sviluppo|Riscontro CSI alle domande di sviluppo]]","[[analysis-2026-05-14-punti-aperti-csi|Punti Aperti CSI]]"]}}
---


# Mockup FE Webapp Operatore (rev. 10) — riscontro

**Fonte:** `raw/Consensi-mockup-cdu.pdf` (copia identica in `wiki/raw/`), «Proposte di schermate — Gestione consensi», revisione 10 del 22/10/2026, prodotto dallo sviluppatore FE. 24 pagine: indice + 23 schermate con dati dimostrativi su CDU-06, 08-14 della sola Webapp Operatore ([[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]]). CDU-14 riferito all'OpenAPI 0.2-DRAFT.

**Riscontro:** verifica Exprivia del 22/10/2026 contro SRS `revised_v10` (§6.6, §6.8-6.14, §7.4, §8.4.5), ADR e wiki. Grafica e navigazione coerenti con il design system; lo scostamento principale è il form di rilascio/modifica, statico anziché dinamico.

| Pagine | CDU | Schermate |
|---|---|---|
| 2-3 | CDU-08, CDU-06 | Lista consensi a card con filtri (Data, Stato, Delegato, Azienda); icone download/stampa informativa |
| 4-7 | CDU-09, CDU-10 | Dettaglio con elenco aziende e «Acconsento/Nego per tutte»; rilascio e modifica con riaccettazione su singola azienda |
| 8 | CDU-11 | Cambia valore, informativa in sola lettura |
| 9-12 | CDU-12 | Elenco tipi, nuovo tipo, dettaglio con sotto-tipi, nuovo sotto-tipo (valori e parametri) |
| 13-16 | CDU-13 | Nuova informativa (generale/aziende, PDF, flag online e annulla), elenco, dettaglio con «Associa azienda» |
| 17-24 | CDU-14 | Elenco enti, nuovo ente, dettaglio con endpoint, nuovo/modifica endpoint, aggiungi sotto-tipo, disattivazione ente/endpoint |

---

## Da correggere (difformità SRS)

| # | Punto | Riferimento | Indicazione |
|---|---|---|---|
| M-01 | Form CDU-09/10/11 con etichette fisse («Acconsento/Nego» pag. 6-7, «Acconsento/Negato» pag. 8) | §6.9-6.11, [[wiki/docs/adr/ADR-023-cdu-11-contratto-rest-valori-ammessi\|ADR-023]] | Valori dal campo `valori_ammessi` (`cons_r_consenso_valore`; SI/NO in migrazione) |
| M-02 | Mancano descrizione estesa, domanda e testo aggiuntivo | [[wiki/concepts/composizione-dinamica-form-consenso\|Form Renderer]] §5.1-5.2 | Blocchi da `cons_r_consenso_parametro` nell'ordine fisso concordato |
| M-03 | Due flussi per CDU-09: multi-azienda con «per tutte» e una sola presa visione (pag. 4-5) e singola azienda (pag. 6) | Contratto `GET /consensi/{cf}/form?…&cod_asr&operazione` | Tenere il flusso a singola azienda. Per i regionali il valore vale per tutte le ASR collegate, senza selezione |
| M-04 | Banner «La ASR 904 San Luigi non è al momento disponibile» | DEV-01 ([[wiki/sources/2026-09-25-riscontro-csi-domande-sviluppo\|CSI 25/09]]), §7.4, [[wiki/sources/2026-10-22-domande-dev-be-unp-cdu-02-08\|BE-16/BE-17]] | San Luigi va ripristinata. Messaggio legato allo stato dell'endpoint (`IN_CORSO`/`IN_MANUTENZIONE`), esempio generico. Con endpoint in questi stati: rilascio, modifica e cambio valore bloccati per quell'azienda; consultazione libera. Elenco aziende: mostrata se ha almeno un endpoint attivo (regola provvisoria, DEV-01) |
| M-05 | CDU-12: «Nuovo tipo» crea tipi | §6.12, requisiti V03, BE-19 | Tipi = dominio fisso (Nazionale/Regionale/Aziendale, `cons_d_tipo_cons`; «Nazionale» esiste). L'oggetto gestito è il sotto-tipo, con `fk_tipo_cons` |
| M-06 | CDU-12: manca «Associazione Enti» | §6.12 ALG01 | Tipo consenso + multi-select enti; per l'aziendale solo enti con endpoint attivo |
| M-07 | CDU-12: valori ammessi a testo libero | §6.12 (Valori Possibili, Multi-Select) | Selezione tra i valori di `cons_d_valore_cons` |
| M-08 | CDU-12: mancano variante Modifica e filtri Codice/Tipo | §6.12 | Modifica limitata a descrizione, data fine, associazione enti. Descrizione estesa e domanda obbligatorie |
| M-09 | CDU-08: la card mostra validità/scadenza | §6.8 | Mostrare stato, valore espresso, data acquisizione, informativa |
| M-10 | CDU-08: casi non rappresentati | §6.11 nota 29/09, BE-18, BE-20 | Le azioni della card le calcola il FE (il BE non le fornisce, BE-20) da stato del consenso e stato dell'endpoint: «Cambia valore» solo per ATTIVO/NEGATO; SCADUTO/ANNULLATO → Gestisci (CDU-10); non espresso → rilascio (CDU-09); endpoint `IN_CORSO`/`IN_MANUTENZIONE` → azioni disabilitate. Il flag `online = false` **non** blocca l'operatore (BE-18). Aggiungere card SCADUTO/ANNULLATO, non espresso e azienda in manutenzione |

## Da rivedere

| # | Punto | Indicazione |
|---|---|---|
| R-01 | CDU-13 pag. 16: «Associa azienda» su informativa in vigore la rende specifica dopo la pubblicazione | Contraddice la regola di pag. 13 (solo scadenza, altrimenti nuova versione). Togliere o limitare a prima della decorrenza |
| R-02 | CDU-13: testo del flag online cita «farmacia convenzionata» | Usare «punto di servizio assistito» (§8.4.5) |
| R-03 | CDU-06: PDF informativa facoltativo (pag. 15, colonna PDF «—») | Definire comportamento delle icone senza PDF (nascoste o stampa HTML) |
| R-04 | CDU-14: campo «E-mail di notifica» sull'endpoint | Non nella maschera §6.14; serve al canale email PULL-02. Verificare nell'OpenAPI 0.2-DRAFT, altrimenti aggiungerlo lì e nell'SRS |
| R-05 | CDU-14: manca la modifica dell'ente | §6.14 passo 3 |
| R-06 | CDU-14: disattivazione abilitata su endpoint «In corso» | Accettabile fino alla risposta CSI su DEV-12 ([[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|tracker]]) |
| R-07 | Dati demo | FSE (consenso nazionale via INI) mostrato come aziendale: usare ROL/Dossier. ASL Città di Torino = 001 nelle liste, 010 in CDU-14. «attivo»/«ATTIVO», «SALVA»/«Salva» |

## Già allineato

- Disattivazione logica di ente/endpoint con chiusura dei legami (§6.14, nota 15/10/2026).
- Destinazione endpoint con default NOTIFICA_CONSENSO; stato allineamento non mostrato per il webhook ([[wiki/docs/adr/ADR-024-cdu-14-destinazione-endpoint\|ADR-024]]).
- Informativa «generale» se senza aziende associate ([[wiki/concepts/informativa\|Informativa]]).
- Flag `online`/`annulla_consensi` in CDU-13, non in CDU-12 (deroga §8.4.5).
- Scarico informativa lato Operatore ([[wiki/docs/adr/ADR-022-cdu-06-scarico-informativa-operatore\|ADR-022]]).
- Cambia valore senza riaccettazione, informativa in sola lettura (§6.11 nota 29/09).

**Interlocutori:** tutti i punti si chiudono tra Exprivia e FE, tranne R-06 (DEV-12) e la regola provvisoria di M-04 (DEV-01), entrambe in attesa di CSI.

> ✅ **Rev. 11 (22/10/2026):** tutti i punti recepiti. Verifica e rifiniture residue in [[wiki/sources/2026-10-22-mockup-fe-cdu-rev11\|Mockup FE rev. 11 — verifica correzioni]].

> 🔄 **Aggiornamento 22/10/2026:** M-04, M-05 e M-10 integrati con le [[wiki/sources/2026-10-22-domande-dev-be-unp-cdu-02-08\|risposte al dev BE]] (BE-16÷BE-20): blocchi per stato dell'endpoint, tipologia Nazionale, azioni della card calcolate dal FE, `online = false` non vincolante per l'operatore. Le verifiche BE-12, BE-14 e INT-10 non toccano il mockup.

---
{"dg-publish":true,"permalink":"/wiki/sources/2026-10-22-mockup-fe-cdu-rev11/","title":"Mockup FE Webapp Operatore (rev. 11) — verifica correzioni","tags":["frontend","mockup","webapp-operatore","cdu-06","cdu-08","cdu-09","cdu-10","cdu-11","cdu-12","cdu-13","cdu-14","form-renderer"],"dg-note-properties":{"title":"Mockup FE Webapp Operatore (rev. 11) — verifica correzioni","aliases":["Mockup FE Webapp Operatore (rev. 11) — verifica correzioni"],"type":"source","tags":["frontend","mockup","webapp-operatore","cdu-06","cdu-08","cdu-09","cdu-10","cdu-11","cdu-12","cdu-13","cdu-14","form-renderer"],"created":"2026-10-22","updated":"2026-10-23","sources":["2026-10-22-mockup-fe-cdu-rev11"],"related":["[[2026-10-22-mockup-fe-cdu|Mockup FE rev. 10 — riscontro]]","[[composizione-dinamica-form-consenso|Composizione Dinamica Form Consenso]]","[[informativa|Informativa]]","[[ADR-023-cdu-11-contratto-rest-valori-ammessi|ADR-023]]","[[ADR-024-cdu-14-destinazione-endpoint|ADR-024]]","[[analysis-2026-05-14-punti-aperti-csi|Punti Aperti CSI]]"]}}
---


# Mockup FE Webapp Operatore (rev. 11) — verifica correzioni

> ➡️ **Superata dalla [[wiki/sources/2026-10-22-mockup-fe-cdu-rev12\|rev. 12]]** (verifica del 23/10/2026): N-02÷N-07 chiusi, N-01 parziale, nuova N-08.

**Fonte:** `raw/Consensi-mockup-cdu_v1.pdf`, «Proposte di schermate — Gestione consensi», revisione 11 del 22/10/2026, prodotto dallo sviluppatore FE dopo il [[wiki/sources/2026-10-22-mockup-fe-cdu\|riscontro sulla rev. 10]]. 32 pagine: indice, 30 schermate (CDU-06, 08-14) e una pagina finale «Note funzionali e punti da confermare». CDU-14 riferita all'OpenAPI 0.2-DRAFT.

**Verifica:** Exprivia, 22/10/2026, contro SRS `revised_v10` rev. 1.18, ADR e wiki. Tutti i 17 punti della rev. 10 risultano recepiti; restano rifiniture minori e tre azioni fuori dal mockup (BE, SRS).

| Pagine | CDU | Schermate |
|---|---|---|
| 2-5 | CDU-06, CDU-08 | Lista a card: ATTIVO/NEGATO, SCADUTO/ANNULLATO, non espresso + azienda in manutenzione, allineamento in corso |
| 6-8 | CDU-09 | Rilascio su singola azienda (prima e dopo la scelta), rilascio regionale senza selezione ASR |
| 9-11 | CDU-10 | Gestisci su SCADUTO (valore precedente, conferma a valore invariato) e su ANNULLATO (nessun valore) |
| 12-13 | CDU-11, CDU-09/10/11 | Cambia valore senza presa visione; form con endpoint `IN_CORSO`/`IN_MANUTENZIONE` |
| 14-18 | CDU-12 | Elenco sotto-tipi con filtri, nuovo sotto-tipo (enti, valori, parametri), modifica |
| 19-22 | CDU-13 | Nuova informativa, allegato e flag, elenco, dettaglio senza «Associa azienda» |
| 23-31 | CDU-14 | Enti, nuovo ente, dettaglio, nuovo/modifica endpoint, aggiungi sotto-tipo, disattivazioni, modifica ente (proposta) |

---

## Esito sui punti della rev. 10

| # | Esito | Dove |
|---|---|---|
| M-01 | ✅ Opzioni da `valori_ammessi`, esempio SI/NO con etichette Acconsento/Nego | pag. 6-12 |
| M-02 | ✅ Descrizione estesa, domanda, testo aggiuntivo, presa visione | pag. 6-12 |
| M-03 | ✅ Una sola azienda per operazione; regionale applicato a tutte le ASR collegate | pag. 6-8 |
| M-04 | ✅ San Luigi (904) ripristinata; messaggio legato allo stato dell'endpoint | pag. 4-5, 13 |
| M-05 | ✅ Gestione dei sotto-tipi; Nazionale/Regionale/Aziendale fissi | pag. 14-15 |
| M-06 | ✅ Associazione Enti multi-selezione | pag. 15 |
| M-07 | ✅ Valori ammessi selezionati tra quelli esistenti | pag. 15-16 |
| M-08 | ✅ Filtri Codice/Tipo, modifica limitata, descrizione estesa e domanda obbligatorie (vedi N-02) | pag. 14, 17-18 |
| M-09 | ✅ Card con stato, valore, data acquisizione, informativa | pag. 2-5 |
| M-10 | ✅ Card SCADUTO, ANNULLATO, non espresso, manutenzione, allineamento; `online = false` non blocca l'operatore | pag. 2-5, 20 |
| R-01 | ✅ «Associa azienda» rimosso dall'informativa pubblicata; vincolo prima della decorrenza da concordare con il BE | pag. 21-22 |
| R-02 | ✅ «punto di servizio assistito» | pag. 20 |
| R-03 | ✅ Senza PDF icone nascoste e «PDF non disponibile» | pag. 2, 4 |
| R-04 | ✅ nel mockup: e-mail facoltativa (`notificaEmail` dell'OpenAPI 0.2-DRAFT). Resta l'azione su SRS e modello dati (A-02) | pag. 26-27 |
| R-05 | ✅ come proposta: API di aggiornamento ente mancante (A-01) | pag. 25, 31 |
| R-06 | ✅ disattivazione consentita anche in allineamento, in attesa di DEV-12 | pag. 30 |
| R-07 | ✅ FSE come Nazionale, ASL Città di Torino = 001 ovunque, ATTIVO maiuscolo. Nuove incoerenze nei dati demo in N-06 | — |

## Rifiniture da chiedere al FE

| # | Punto | Indicazione |
|---|---|---|
| N-01 | CDU-13 pag. 19-20: «Informativa generale» spuntata e, insieme, elenco «Aziende associate» attivo con «Seleziona tutto» | Le due scelte si escludono: generale = nessuna riga in `cons_r_informativa_asr` ([[wiki/concepts/informativa\|Informativa]]). Con generale spuntata l'elenco va disabilitato; selezionare un'azienda toglie la spunta |
| N-02 | CDU-12 pag. 17-18: in Modifica la select «Tipo Consenso» e la select «Parametro aggiuntivo» appaiono abilitate | Renderle in sola lettura come codice, inizio validità e valori, coerentemente con la didascalia e il banner |
| N-03 | CDU-14 pag. 29: «I consensi dell'ente o dell'endpoint disattivato non saranno più visibili nella webapp» | Dipende dalla regola provvisoria DEV-01 (azienda visibile con almeno un endpoint attivo). Per l'endpoint non è vero se l'ente ne ha altri attivi. Riformulare: «L'azienda non sarà più proposta per nuove operazioni se non ha altri endpoint attivi» e marcarla DEV-01 |
| N-04 | CDU-14 pag. 27: «Lasciando vuoti recapito, destinazione o date, i valori esistenti restano invariati» | Con questa semantica l'e-mail non si può più cancellare. Da allineare al contratto del BE (PATCH parziale o PUT completo) |
| N-05 | CDU-13 pag. 20: il testo di «Annulla consensi» cita solo la notifica alle aziende | BATCH-02 notifica anche il cittadino via UNP ([[wiki/concepts/batch-processes\|Batch]] ALG02 passo 4). Aggiungere «e al cittadino» |
| N-06 | Dati demo | Tipo ente «Azienda sanitaria» a pag. 31 contro «AZIENDALE» a pag. 23 e 25; sotto-tipo PSE negli endpoint ma assente dall'elenco CDU-12 (ROL, REG, FSE); colonna Tipo a pag. 14 con codici A/R/N anziché descrizioni |
| N-07 | CDU-09 pag. 13: form raggiungibile con allineamento in corso, mentre a pag. 5 il pulsante della card è disabilitato | Accettabile come caso di stato cambiato dopo l'apertura o di rifiuto del BE; esplicitarlo nella didascalia |

## Azioni fuori dal mockup

| # | Azione | Chi |
|---|---|---|
| A-01 | API di aggiornamento ente (CDU-14 §6.14 passo 3) assente dall'OpenAPI 0.2-DRAFT: definire campi modificabili (codice in sola lettura) | BE |
| A-02 | E-mail di avviso dell'endpoint (`notificaEmail`, canale email PULL-02): aggiungerla alla maschera SRS §6.14 e decidere la colonna nel modello dati. L'OpenAPI 0.2-DRAFT non è nel repository: verificare il campo nel contratto | Exprivia (SRS) + BE |
| A-03 | Residuo SRS §6.12: la tabella della maschera CDU-12 elenca ancora i campi «Online» e «Annulla consensi» e la variante «Modifica tipo consenso» cita «Flag (Online, Annulla)». Con GOV-02 i flag sono solo in CDU-13 (`cons_d_informativa`), come già nel mockup | ✅ Chiuso: SRS rev. 1.19 (22/10/2026) |

**Aperti con CSI:** DEV-01 (visibilità aziende ed enti associabili) e DEV-12 (disattivazione durante l'allineamento), invariati ([[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|tracker]]).

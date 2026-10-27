---
{"dg-publish":true,"permalink":"/wiki/sources/2026-10-27-revisione-be-slide-domande/","title":"Revisione dev BE di slide e domande CSI (27/10/2026)","tags":["team-sviluppo","backend","presentazione","domande-csi","scaduto","cdu-17","batch-01"],"dg-note-properties":{"title":"Revisione dev BE di slide e domande CSI (27/10/2026)","aliases":["Revisione dev BE di slide e domande CSI (27/10/2026)"],"type":"source","tags":["team-sviluppo","backend","presentazione","domande-csi","scaduto","cdu-17","batch-01"],"created":"2026-10-27","updated":"2026-10-27","sources":["2026-10-27-revisione-be-slide-domande"],"related":["[[ciclo-vita-consenso|Ciclo di vita del consenso]]","[[analysis-2026-08-05-stato-scaduto-comunicazione-sia|Stato SCADUTO — BAT-03]]","[[ADR-007-batch-01-5min-skip-locked|ADR-007]]","[[ADR-012-notificatore-deleghe-post-completato|ADR-012]]","[[ADR-016-scaduto-async-batch-02|ADR-016]]","[[ADR-023-cdu-11-contratto-rest-valori-ammessi|ADR-023]]","[[analysis-2026-05-14-punti-aperti-csi|Punti Aperti CSI]]"]}}
---


# Revisione dev BE di slide e domande CSI (27/10/2026)

**Fonte:** `presentazione/Revisione_slide_domande_v2_27_10_2026.md` — controllo del dev BE sulle versioni aggiornate di `CONSPREF-presentazione-tecnica_2026-10-28_glossario.pptx` (69 slide) e `Domande-CSI_CONSPREF_2026-10-23 (1).docx` (37 domande), contro il codice `dev` (rconsprefbe `82cdab9`, rconsprefboweb `9029c04`), in vista della call CSI del 28/10. Chiarimenti successivi dello stesso dev sul punto 5 e sullo snapshot, stessa giornata.

Il codice non è nel repo: i punti che dipendono dal codice sono **riscontri del dev**, non verifiche nostre.

## Esito dei 12 punti

| # | Tema | Esito | Dove recepito |
|---|---|---|---|
| 1 | n. 37, `NE`: oggi errore **E09** su inserimento di un consenso già presente; la modifica verso NE è accettata senza salvare nulla. E01 solo se si ripete esattamente stato e valore | Testo corretto. La spec ACC-DEL 2019 diceva E01 ([[wiki/sources/2019-03-20-acc-del-cdu-01-servizi-acquisizione\|2019-03-20-acc-del-cdu-01-servizi-acquisizione]]) | Domande CSI |
| 2 | n. 16: il nuovo BATCH-01 invia solo le righe in coda; i consensi del vecchio sistema non ancora inviati andrebbero persi (63 su DEV: 49 acquisizioni, 14 revoche) | Aggiunto alla domanda. Preferenza: notifica `DA_INVIARE` negli script di migrazione | [[wiki/docs/adr/ADR-007-batch-01-5min-skip-locked\|ADR-007-batch-01-5min-skip-locked]], Domande CSI |
| 3 | n. 25: `modifyToRevoked` è un espediente del vecchio Back Office, non un servizio | DEV-01 chiuso con decisione interna, da confermare a CSI | [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|analysis-2026-05-14-punti-aperti-csi]] |
| 4 | Manca la n. 13 nella numerazione del documento | Confermato nel docx (12 → 14). **Non rinumerato**: slide e riferimenti del dev usano i numeri attuali; da decidere se rinumerare prima dell'invio | — |
| 5 | Slide 7: il record chiuso prende il codice SCADUTO (stato S) | **Decisione (a):** si tiene, per i canali SOAP legacy. Doppio significato scritto in SRS §5.1 | SRS rev. 1.20, [[wiki/concepts/ciclo-vita-consenso\|ciclo-vita-consenso]], [[wiki/docs/adr/ADR-016-scaduto-async-batch-02\|ADR-016-scaduto-async-batch-02]] |
| 6 | Slide 21: `valori_ammessi` ritorna solo codici, la slide dice `[{valore, descrizione}]` | Il codice si adegua al contratto | [[wiki/docs/adr/ADR-023-cdu-11-contratto-rest-valori-ammessi\|ADR-023-cdu-11-contratto-rest-valori-ammessi]] |
| 7 | Slide 21: `/informativa/update` — verifica già fatta (SANSOL passa da `ConsensoBeService`) | Testo corretto | Slide 21 |
| 8 | Slide 43: le modifiche 8.4.1-8.4.10 sono già sul DB di sviluppo dal 01/10 | Testo corretto; riga 8.4.1 con il Notificatore di Deleghe da verificare sull'SRS | Slide 43 |
| 9 | Slide 64: BATCH-01 senza ritentativi, come il vecchio sistema | Testo corretto; **conflitto** con ADR-007 | [[wiki/docs/adr/ADR-007-batch-01-5min-skip-locked\|ADR-007-batch-01-5min-skip-locked]] |
| 10 | Slide 55: INT-05 non è chiuso (nel codice l'avviso usa già `notify-mb`) | Stato "Da rivedere dopo INT-10" | [[wiki/docs/adr/ADR-012-notificatore-deleghe-post-completato\|ADR-012-notificatore-deleghe-post-completato]] |
| 11 | Slide 41, 45: mancano le domande bloccanti n. 14-19 | Righe aggiunte | Slide |
| 12 | Slide 46: stato del codice al 26/10 | Righe aggiunte | Slide |

## Chiarimenti successivi (stato S, snapshot, canali SOAP)

- **Stato S.** Due significati distinti solo da `data_fine`: record chiuso = "superato" (AS-IS, impostato a ogni variazione per i canali legacy); record aperto creato da BATCH-02 = SCADUTO TO-BE. **Vigente = `data_fine` nulla.** CDU-15 e CDU-17 già filtrano su `data_fine IS NULL`.
- **Snapshot CDU-17** (decisione 27/10, opzione A senza ANNULLATO): restituisce ATTIVO, NEGATO, SCADUTO. ANNULLATO è escluso perché **resta aperto per design** (stato corrente da cui si riesprime il consenso, CDU-08/09/10) ma copia il valore precedente. Chiude in parte il buco BAT-03 ([[wiki/analyses/analysis-2026-08-05-stato-scaduto-comunicazione-sia\|analysis-2026-08-05-stato-scaduto-comunicazione-sia]]).
- **Canali SOAP:** nessuno stato nuovo nel contratto. `ConsensoBeService` cerca per informativa e SANSOL conosce solo informative non scadute: lo SCADUTO resta legato alla informativa scaduta.
- **Inserimento con SCADUTO/ANNULLATO aperto:** chiude sempre il record e crea il nuovo sull'informativa corrente, anche a valore invariato (CDU-10: presa visione). `ConsprefService` lo fa già; **`ConsensoBeService` e `/informativa/update` no**: lasciano due record vigenti. Bug da correggere nel codice, anche per ANNULLATO. Inserire su informativa scaduta non è possibile.

> ⚠️ **Conflict:** [[wiki/analyses/analysis-2026-08-05-stato-scaduto-comunicazione-sia\|analysis-2026-08-05-stato-scaduto-comunicazione-sia]] (§2.4, 05/08) diceva che lo snapshot CDU-17 non include SCADUTO/ANNULLATO e li definiva "terminali"; il codice e il dev BE (27/10) includono SCADUTO ed escludono ANNULLATO, che resta aperto. Risolto in favore del dev: aggiornati SRS §6.17, analisi e [[wiki/concepts/ciclo-vita-consenso\|ciclo-vita-consenso]]. Da confermare con CSI (estensione del contratto CDU-17).

## Applicato il 27/10/2026

- **SRS v10 in place** (rev. 1.20): §5.1, §6.4, §6.17.
- **Slide** (`presentazione/…_glossario.pptx`): 7, 21, 33, 41, 43, 45, 46, 55, 64. Controllate in render.
- **Domande CSI** (docx e `domande-csi.js`): n. 16, 25, 37. Glossario: `glossario_data.py` (INT-05, BATCH-01).
- Backup in `backup/` (SRS docx/md, pptx, docx domande).

## Azioni aperte

- Dev BE: correggere `valori_ammessi`; chiudere SCADUTO/ANNULLATO in `ConsensoBeService` e `/informativa/update`.
- Marco: confermare con CSI n. 16 (migrazione notifiche), n. 19 (ritentativi), n. 25, estensione snapshot CDU-17.
- Specifica OpenAPI CDU-17: non esiste ancora (il file v0.1 copre CDU-15/16, con nota integratori su SCADUTO aggiornata il 27/10); alla stesura riportare gli stati restituiti dallo snapshot.

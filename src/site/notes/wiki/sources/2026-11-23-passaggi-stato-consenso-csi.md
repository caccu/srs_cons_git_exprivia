---
{"dg-publish":true,"permalink":"/wiki/sources/2026-11-23-passaggi-stato-consenso-csi/","title":"Passaggi di stato del consenso — logica TO-BE CSI V01 (23/11/2026)","tags":["csi","macchina-a-stati","consenso","to-be","att","sca","ann","non-espresso","annulla-consensi","notifiche","logica-csi"],"dg-note-properties":{"title":"Passaggi di stato del consenso — logica TO-BE CSI V01 (23/11/2026)","aliases":["Passaggi di stato del consenso — logica TO-BE CSI V01 (23/11/2026)"],"type":"source","tags":["csi","macchina-a-stati","consenso","to-be","att","sca","ann","non-espresso","annulla-consensi","notifiche","logica-csi"],"created":"2026-11-23","updated":"2026-11-23","sources":["2026-11-23-passaggi-stato-consenso-csi"],"related":["[[csi-piemonte|CSI Piemonte]]","[[2026-11-23-risposte-csi-domande-funzionali|Risposte CSI alle domande funzionali (23/11/2026)]]","[[ciclo-vita-consenso|Ciclo di vita del consenso]]","[[batch-processes|Processi Batch]]","[[informativa|Informativa]]","[[2026-11-05-call-csi-analisi-dubbi|Call CSI 05/11/2026]]"]}}
---


# Passaggi di stato del consenso — logica TO-BE CSI V01 (23/11/2026)

**Fonte:** `raw/Passagi_stato_consenso_CSI.docx`, «Passaggi di stato CONSPREF», versione V01. Redazione Bontempi e Caroni (20/11/2026), controllo e approvazione Bourlot (23/11/2026). Arrivato per mail da Gaia Bourlot ([[wiki/entities/csi-piemonte\|CSI]]) il 23/11/2026 con le [[wiki/sources/2026-11-23-risposte-csi-domande-funzionali\|risposte alle domande funzionali]].

> ✅ **Logica TO-BE indicata da CSI (23/11/2026).** Il documento definisce la macchina a stati TO-BE ed è adottato come riferimento (supera ST-02, chiude ST-05). Restano da chiarire con CSI i dettagli elencati in «Confronto con la wiki» (ST-18). Le regole precedenti in [[wiki/concepts/ciclo-vita-consenso\|ciclo-vita-consenso]] sono superate.

## Stati AS-IS (secondo CSI)

- **Attivo:** valore Sì o No.
- **Revocato:** valore No, passaggio da Sì a No.
- **Scaduto:** vecchio valore storicizzato.

## Stati TO-BE

Stato e valore sono separati.

- **ATT (Attivo):** consenso espresso attivo, valore SI o NO.
- **SCA (Scaduto):** consenso non più attivo, perché variato dopo essere stato espresso; il record tiene il suo valore.
- **ANN (Annullato):** l'informativa è variata e il consenso espresso prende il valore NE (non espresso).

Non compaiono NEGATO, REVOCATO, STORICO né uno SCADUTO per scadenza dell'informativa.

## Passaggi (esempi di `T_CONSENSI`)

Colonne degli esempi: id, stato, valore, fonte (cittadino, operatore o SIA), data creazione, data modifica.

**Mai espresso:** nessun record.

**Prima espressione:**
- sì → record 1 ATT/SI, creato il 1/1;
- no → record 1 ATT/NO, creato il 1/1.

**Variazione (sì → no → sì):**
- 1/1: record 1 ATT/SI;
- 10/1, nuova scelta NO: record 1 diventa SCA/SI con data modifica 10/1; nuovo record 2 ATT/NO creato il 10/1;
- 20/1, nuova scelta SI: record 2 diventa SCA/NO con data modifica 20/1; nuovo record 3 ATT/SI creato il 20/1.

Il record precedente passa a SCA mantenendo il proprio valore.

**Cambio dell'informativa con annullamento:**
- prima: record 1 SCA/SI, record 2 SCA/NO, record 3 ATT/SI;
- dopo (30/1): record 3 diventa **ANN/NE** con data modifica 30/1; i record 1 e 2 restano invariati.

Regole scritte nel documento:
- se cambia l'informativa e si devono annullare i consensi espressi, il sistema porta in ANN tutti i consensi e cambia il valore in NE;
- a video il consenso si mostra come mai espresso;
- un batch porta da ATT ad ANN i consensi di tutti gli assistiti;
- la variazione si notifica alle aziende con valore NE.

## Confronto con la wiki

Punti che cambiano o contraddicono [[wiki/concepts/ciclo-vita-consenso\|ciclo-vita-consenso]]:
1. **SCA = record superato:** è la S chiusa dell'AS-IS, a cui il 05/11 si voleva dare il nome STORICO. Lo SCADUTO TO-BE (record aperto creato da BATCH-02, valore valido da riaccettare) non c'è più.
2. **Niente REVOCATO né NEGATO:** sì → no diventa SCA/SI più ATT/NO. Va contro il 05/11 (REVOCATO solo per sì → no) e contro la decisione ST-17 (la Webapp Operatore scrive R/NO). Non dice cosa fare dei record R già presenti.
3. **ANN modifica lo stesso record** (record 3, data modifica 30/1), invece di chiuderlo e crearne uno nuovo: va contro [[wiki/docs/adr/ADR-015-storicizzazione-immutabile\|ADR-015]].
4. **Valore dopo l'annullamento:** qui ANN/NE, cioè il valore del cittadino è sostituito; nella [[wiki/sources/2026-11-23-risposte-csi-domande-funzionali\|risposta 2.1]] invece «rimane il valore del cittadino, lo stato diventa NE».
5. **NE nelle notifiche alle aziende:** il [[wiki/sources/2019-05-01-specifica-ws-consenso-regionale-aziendale-v02c\|documento CPROL v02c]] ammette solo SI/NO nelle notifiche SRV-03. Va contro anche la regola «ANNULLATO inviato come NO», già sviluppata.
6. **Flag `annulla_consensi` eliminato:** al cambio di informativa l'annullamento è un processo automatico (chiarimento interno del 23/11/2026; il testo dice «se si devono annullare i consensi»). Va contro la regola attuale, che sceglie SCADUTO o ANNULLATO secondo il flag.
7. **Mai espresso = nessun record:** chiude ST-05 (non espresso come assenza di record).

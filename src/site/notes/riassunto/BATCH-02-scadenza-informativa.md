---
{"dg-publish":true,"permalink":"/riassunto/batch-02-scadenza-informativa/","dg-note-properties":{}}
---

# BATCH-02 — Scadenza / annullamento informativa

**Perimetro:** BE ✅ — Riferimenti: SRS v10 §7.2, §6.13 ALG02, §8.4.2, §8.4.8; ADR-015, ADR-016 (superato dalla logica CSI); logica stati CSI 23/11/2026 (wiki `sources/2026-11-23-passaggi-stato-consenso-csi`); SC67 non si pone più (flag tolto).

## Cosa fa

Ogni notte cerca le **informative scadute** (sostituite da una nuova versione) e **annulla** in automatico i consensi collegati (logica TO-BE indicata da CSI, 23/11/2026):
- i consensi ATT (SI o NO) dell'informativa passano ad **ANN** con valore **NE**: a video risultano come mai espressi e vanno riespressi con la nuova informativa;
- l'annullamento si notifica alle aziende (via coda e BATCH-01) con valore NE;
- notifica al cittadino tramite **UNP**: oggi prevista, da confermare con CSI (ST-18).

Non esistono più il flag `annulla_consensi` e lo SCADUTO da riaccettare. I record SCA (superati da una variazione) non cambiano.

## Dati di base

- Nome: `NotificaScadenzaInformative`. Periodicità: una volta al giorno, notturna (cadenza esatta da concordare).
- Input: `cons_d_informativa`, `cons_t_consenso`. Output: nuovi record di consenso, coda notifiche, chiamate UNP.

## Logica

**ALG01 — Selezione**
```sql
SELECT d_informativa_id
FROM cons_d_informativa
WHERE data_scadenza < NOW() AND stato_elaborazione = 'DA_ELABORARE';
```
Per ogni informativa scaduta si marca `IN_ELABORAZIONE`, poi:
```sql
SELECT cons_id FROM cons_t_consenso
WHERE d_informativa_id = :id_scaduta AND tipo_stato = 'ATT' AND data_fine IS NULL; -- codice ATT da definire (oggi A)
```

**ALG02 — Annullamento**, per ogni `cons_id` (con il motore comune, TRASV §4):
1. UPDATE chiusura: `data_fine = NOW()`, `data_modifica = NOW()`, `login_operazione = 'BATCH_SCADENZA_INF'`; il record chiuso prende lo stato SCA e tiene il suo valore.
2. INSERT in `cons_s_consenso` (copia del record chiuso con FK `cons_id`).
3. INSERT del nuovo record in `cons_t_consenso`: copia dei dati, stato ANN, `valore_consenso = 'NE'`, `d_informativa_id` = **informativa scaduta** (non la nuova), `data_acquisizione = NOW()`, `data_fine = NULL`, `login_operazione = 'BATCH-02'`, `uuid = gen_random_uuid()`, `endp_id = NULL`.
4. INSERT in `cons_t_notifica` (`DA_INVIARE`) per gli endpoint, con valore NE → li invia BATCH-01.
5. Notifica al cittadino via **UNP**, se confermata con CSI (ST-18). Record con `flag_notifica_cittadino = TRUE`, inviato **direttamente da BATCH-02**: CF, codice modulo "Gestione Consensi", tipo evento, testo/template. Il canale (email, push, IO, area riservata) lo sceglie l'UNP in base alle preferenze; SMS non usato. Il cittadino senza preferenze non riceve nulla e il caso è chiuso. Si salvano `notificatore_uuid` e `notificatore_data_invio`, tracciatura in `cons_t_traccia_serv_est`.

> **Da chiarire con CSI (ST-18):** nel documento CSI l'annullamento modifica lo stesso record (stato ANN, valore NE, data di modifica) invece dei passi 1-3; la mail CSI dice invece che resta il valore del cittadino. Oggi SRV-03 accetta solo SI/NO.

Lo scenario SC67 (flag diverso tra informativa scaduta e nuova) non si pone più: senza flag l'annullamento vale sempre. La nuova informativa corrente si cerca quando il consenso viene riespresso (CDU-09 o CDU-10, da chiarire ST-18).

**Transazioni e ripresa**
- Lotti configurabili (default 1000 record), COMMIT a fine lotto.
- `stato_elaborazione` (DA_ELABORARE → IN_ELABORAZIONE → ELABORATA) evita di rielaborare dopo un riavvio. A fine informativa: `ELABORATA`.
- Due nodi (21/10/2026): il job gira su entrambi. La presa in carico (`DA_ELABORARE` → `IN_ELABORAZIONE`) avviene con `SELECT … FOR UPDATE SKIP LOCKED` in una transazione breve, così l'altro nodo non vede l'informativa. A ogni lotto si aggiorna `data_modifica` dell'informativa (colonna esistente), che fa da battito. Un'informativa `IN_ELABORAZIONE` con `data_modifica` ferma da più di 120 minuti viene ripresa da un nodo qualsiasi; i consensi già chiusi non vengono riselezionati, quindi niente duplicati. Le notifiche al cittadino sono prese una alla volta con lo stesso meccanismo. I due batch sono spenti per default: negli ambienti di deploy si accendono con la loro variabile d'ambiente (dev BE, 24/11/2026).
- Errori non fatali in `cons_t_batch_errori`, senza bloccare l'intera elaborazione.
- Notifiche sospese per le ASR in manutenzione (§7.4).

## Come svilupparlo

- Job Spring Batch (chunk = lotto) o `@Scheduled` con paginazione e transazioni per lotto. Riusare il motore di storicizzazione comune (TRASV §4) con stato ANN e valore NE.
- Client REST UNP secondo la documentazione CSI (gitlab.csi.it/user-notification-platform/unpdocumentazione). Endpoint `notify-mb` `/api/v1/topics/messages`, token nell'header `x-authentication` (codice legacy, 22/10/2026); valore del token applicativo da definire. Una sola chiamata di invio: la verifica delle preferenze è interna a UNP (BE-10).
- Migrazione: colonne `stato_elaborazione` (e `online`) su `cons_d_informativa`, valorizzate per le informative esistenti; `annulla_consensi` non serve più (logica CSI).
- Test: informativa con migliaia di consensi, riavvio a metà, annullamento con coda (valore NE) e UNP, record SCA non toccati.

## Dipendenze

CDU-13 (informative e date); BATCH-01 (consegna notifiche ASR); UNP.

## Punti aperti

- Cadenza esatta e finestra notturna.
- Template e testo della notifica UNP; codice modulo.
- Dettagli della logica CSI (ST-18): annullamento sullo stesso record o chiusura più nuovo record; valore dopo l'annullamento; NE nelle notifiche SRV-03; notifica UNP al cittadino.

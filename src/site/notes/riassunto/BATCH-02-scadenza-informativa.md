---
{"dg-publish":true,"permalink":"/riassunto/batch-02-scadenza-informativa/","dg-note-properties":{}}
---

# BATCH-02 — Scadenza / annullamento informativa

**Perimetro:** BE ✅ — Riferimenti: SRS v10 §7.2, §6.13 ALG02, §8.4.2, §8.4.8; ADR-015, ADR-016; SC67 risolto (23/07/2026).

## Cosa fa

Ogni notte cerca le **informative scadute** e aggiorna i consensi collegati:
- `annulla_consensi = false` → i consensi passano a **SCADUTO**. Il valore resta valido, ma va riaccettata la nuova informativa. **Nessuna** notifica alle aziende.
- `annulla_consensi = true` → i consensi passano ad **ANNULLATO**. Il consenso è nullo e va riespresso. Notifica alle aziende (via coda e BATCH-01) e al **cittadino** tramite **UNP**.

È l'**unico** punto del sistema che imposta SCADUTO (differenza rispetto all'AS-IS da comunicare ai SIA).

## Dati di base

- Nome: `NotificaScadenzaInformative`. Periodicità: una volta al giorno, notturna (cadenza esatta da concordare).
- Input: `cons_d_informativa`, `cons_t_consenso`. Output: nuovi record di consenso, coda notifiche, chiamate UNP.

## Logica

**ALG01 — Selezione**
```sql
SELECT d_informativa_id, annulla_consensi
FROM cons_d_informativa
WHERE data_scadenza < NOW() AND stato_elaborazione = 'DA_ELABORARE';
```
Per ogni informativa scaduta si marca `IN_ELABORAZIONE`, poi:
```sql
SELECT cons_id, tipo_stato FROM cons_t_consenso
WHERE d_informativa_id = :id_scaduta AND tipo_stato IN ('ATTIVO','NEGATO') AND data_fine IS NULL;
```

**ALG02 — Aggiornamento**, per ogni `cons_id`:
1. UPDATE chiusura: `data_fine = NOW()`, `data_modifica = NOW()`, `login_operazione = 'BATCH_SCADENZA_INF'`.
2. INSERT in `cons_s_consenso` (copia del record chiuso con FK `cons_id`).
3. INSERT del nuovo record in `cons_t_consenso`: copia dei dati, `tipo_stato = CASE WHEN i.annulla_consensi THEN 'ANNULLATO' ELSE 'SCADUTO'`, `d_informativa_id` = **informativa scaduta** (non la nuova), `data_acquisizione = NOW()`, `data_fine = NULL`, `login_operazione = 'BATCH-02'`, `uuid = gen_random_uuid()`, `endp_id = NULL`.
4. Se ANNULLATO: INSERT in `cons_t_notifica` (`DA_INVIARE`) per gli endpoint → li invia BATCH-01.
5. Se ANNULLATO: notifica al cittadino via **UNP**. Record con `flag_notifica_cittadino = TRUE`, inviato **direttamente da BATCH-02**: CF, codice modulo "Gestione Consensi", tipo evento, testo/template. Il canale (email, push, IO, area riservata) lo sceglie l'UNP in base alle preferenze; SMS non usato. Il cittadino senza preferenze non riceve nulla e il caso è chiuso. Si salvano `notificatore_uuid` e `notificatore_data_invio`, tracciatura in `cons_t_traccia_serv_est`.

Esempio SC67: l'informativa A (`annulla_consensi = NO`) scade ed è sostituita da B (`annulla_consensi = SI`). Un consenso ATTIVO legato ad A diventa **SCADUTO**: conta il flag di A. La nuova informativa corrente si cerca solo quando il consenso viene riespresso (CDU-10/CDU-04).

**Transazioni e ripresa**
- Lotti configurabili (default 1000 record), COMMIT a fine lotto.
- `stato_elaborazione` (DA_ELABORARE → IN_ELABORAZIONE → ELABORATA) evita di rielaborare dopo un riavvio. A fine informativa: `ELABORATA`.
- Errori non fatali in `cons_t_batch_errori`, senza bloccare l'intera elaborazione.
- Notifiche sospese per le ASR in manutenzione (§7.4).

## Come svilupparlo

- Job Spring Batch (chunk = lotto) o `@Scheduled` con paginazione e transazioni per lotto. Riusare il motore di storicizzazione comune (TRASV §4) con stato terminale parametrico.
- Client REST UNP secondo la documentazione CSI (gitlab.csi.it/user-notification-platform/unpdocumentazione). Token applicativo UNP da definire.
- Migrazione: colonne `stato_elaborazione`, `annulla_consensi` (e `online`) su `cons_d_informativa`, valorizzate per le informative esistenti.
- Test: informativa con migliaia di consensi, riavvio a metà, SCADUTO senza notifica, ANNULLATO con coda e UNP, scenario SC67.

## Dipendenze

CDU-13 (informative e date); BATCH-01 (consegna notifiche ASR); UNP.

## Punti aperti

- Cadenza esatta e finestra notturna.
- Template e testo della notifica UNP; codice modulo.
- Canale asincrono per comunicare ai SIA lo **SCADUTO**, oggi non notificato e assente dallo snapshot CDU-17 (BAT-03, call CSI dedicata pending).

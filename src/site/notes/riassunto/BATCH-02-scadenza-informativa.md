---
{"dg-publish":true,"permalink":"/riassunto/batch-02-scadenza-informativa/","dg-note-properties":{}}
---

# BATCH-02 — Scadenza / annullamento informativa

**Perimetro:** BE ✅ — Riferimenti: SRS v10 §7.2, §6.13 ALG02, §8.4.2, §8.4.8; ADR-015, ADR-016 (superato dalla logica CSI); logica stati CSI 23/11/2026 (wiki `sources/2026-11-23-passaggi-stato-consenso-csi`); SC67 non si pone più (flag tolto).

## Cosa fa

Ogni notte cerca le **informative scadute** (sostituite da una nuova versione) e **annulla** in automatico i consensi collegati (logica TO-BE indicata da CSI, 23/11/2026):
- i consensi ATT (SI o NO) dell'informativa passano ad **ANN** con valore **NE**: a video risultano come mai espressi e vanno riespressi con la nuova informativa;
- l'annullamento si notifica alle aziende (via coda e BATCH-01) con SRV-04 e valore NE (decisione Exprivia del 27/11; accettazione di NE a carico di CSI);
- notifica al cittadino tramite **UNP**: oggi prevista, resta aperta (ST-18).

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
1. INSERT in `cons_s_consenso` della copia del record ATT (FK `cons_id`): il valore espresso dal cittadino resta nello storico.
2. UPDATE dello stesso record (schema CSI V01, confermato il 27/11/2026; eccezione ad ADR-015): stato ANN, `valore_consenso = 'NE'`, `data_modifica = NOW()`, `login_operazione = 'BATCH_SCADENZA_INF'`; `data_fine` resta NULL e `d_informativa_id` resta l'informativa scaduta.
3. INSERT in `cons_t_notifica` (`DA_INVIARE`) per gli endpoint, con SRV-04 e valore NE: li invia BATCH-01.
4. Notifica al cittadino via **UNP**, se confermata (ST-18, aperto). Record con `flag_notifica_cittadino = TRUE`, inviato **direttamente da BATCH-02**: CF, codice modulo "Gestione Consensi", tipo evento, testo/template. Il canale (email, push, IO, area riservata) lo sceglie l'UNP in base alle preferenze; SMS non usato. Il cittadino senza preferenze non riceve nulla e il caso è chiuso. Si salvano `notificatore_uuid` e `notificatore_data_invio`, tracciatura in `cons_t_traccia_serv_est`.

> ✅ **Deciso il 27/11/2026 (risposte CSI):** l'annullamento aggiorna lo stesso record come nello schema CSI V01; la proposta Exprivia (chiusura come SCA più nuovo record ANN/NE) è respinta. La copia nello storico al passo 1 è una scelta Exprivia (27/11). Annullamento verso le aziende con SRV-04 (decisione Exprivia); se le aziende accettano NE lo verifica CSI.

Lo scenario SC67 (flag diverso tra informativa scaduta e nuova) non si pone più: senza flag l'annullamento vale sempre. La nuova informativa corrente si cerca quando il consenso viene riespresso (CDU-09 o CDU-10).

**Transazioni e ripresa**
- Lotti configurabili (default 1000 record), COMMIT a fine lotto.
- `stato_elaborazione` (DA_ELABORARE → IN_ELABORAZIONE → ELABORATA) evita di rielaborare dopo un riavvio. A fine informativa: `ELABORATA`.
- Due nodi (21/10/2026): il job gira su entrambi. La presa in carico (`DA_ELABORARE` → `IN_ELABORAZIONE`) avviene con `SELECT … FOR UPDATE SKIP LOCKED` in una transazione breve, così l'altro nodo non vede l'informativa. A ogni lotto si aggiorna `data_modifica` dell'informativa (colonna esistente), che fa da battito. Un'informativa `IN_ELABORAZIONE` con `data_modifica` ferma da più di 120 minuti viene ripresa da un nodo qualsiasi; i consensi già chiusi non vengono riselezionati, quindi niente duplicati. Le notifiche al cittadino sono prese una alla volta con lo stesso meccanismo. I due batch sono spenti per default: negli ambienti di deploy si accendono con la loro variabile d'ambiente (dev BE, 24/11/2026).
- Errori non fatali in `cons_t_batch_errori`, senza bloccare l'intera elaborazione.
- ~~Notifiche sospese per le ASR in manutenzione (§7.4).~~ Manutenzione fuori V1.0 dal 27/11.

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
- Notifica UNP al cittadino sull'annullamento (ST-18, aperto).

---
{"dg-publish":true,"permalink":"/riassunto/batch-01-notifica-consensi/","dg-note-properties":{}}
---

# BATCH-01 — Notifica consensi verso aziende/enti

**Perimetro:** BE ✅ — Riferimenti: SRS v10 §7.1, §8.3.13, §8.3.14, §8.4.2, §8.4.9; ADR-007, ADR-012, ADR-014; Specifica WebService ConsensoRegionaleAziendale v03.

## Cosa fa

Svuota la **coda delle notifiche** (`cons_t_notifica`) e invia ai SIA delle ASR, via **SOAP**, ogni nuovo consenso o variazione. I record in coda li scrivono i CDU di salvataggio (09/10/11 e BE cittadino) e BATCH-02 (annullamenti).

Quando tutte le notifiche di una variazione risultano consegnate (`COMPLETATO`), avvisa il cittadino/delegato tramite il **Notificatore di Deleghe**, che ADR-012 distingue dall'UNP. Nel legacy però c'è un solo notificatore, `notify-mb`: l'identità va confermata da CSI (**INT-10**) prima di sviluppare l'avviso.

## Dati di base

- Nome: `NotificaConsensi`. Periodicità: **ogni 5 minuti** (AS-IS: 30).
- Input: `cons_t_notifica` con `not_stato = 'DA_INVIARE'`. Output: chiamate SOAP e aggiornamento della coda.

## Logica

1. **Selezione con lock** (ALG01), sicura con più istanze in parallelo:
   ```sql
   SELECT * FROM cons_t_notifica
   WHERE not_stato = 'DA_INVIARE' AND data_cancellazione IS NULL
   ORDER BY data_creazione
   LIMIT :batch_size
   FOR UPDATE SKIP LOCKED;
   ```
2. Per ogni record: costruzione del messaggio SOAP. **SRV-03 `NotificaAcquisizioneConsenso`** per acquisizioni/modifiche, **SRV-04 `NotificaRevocaConsenso`** per revoche/annullamenti. Campi obbligatori: `codFiscale`, `codAsr`, `codConsenso`, `valConsenso` (SI/NO), `dataAcquisizione`, `codOperatore`, `fonte`. I nomi esatti vanno presi dal WSDL.
3. Invio a `not_endp_url`.
4. Esito OK → stato inviato/completato e `not_fine`.
5. Errore HTTP o SOAP Fault (VAR01) → `not_stato = 'ERRORE'`, dettaglio in `cons_t_notifica_errore_dett`, `num_tentativi + 1`. Dopo **3 tentativi** (`MAX_TENTATIVI` configurabile) → **`ERRORE_PERMANENTE`**: non viene più ripreso in automatico e richiede intervento manuale. Il ritentativo avviene a ogni ciclo del batch (5 minuti, senza backoff) per le notifiche in `ERRORE` con `num_tentativi < MAX_TENTATIVI` (decisione Exprivia 30/10/2026 su BE-26, conferma CSI richiesta, domanda n. 23); le notifiche non tentate per manutenzione non contano. Il riporto a `DA_INVIARE` è una procedura manuale. Con una notifica in `ERRORE_PERMANENTE` l'avviso al cittadino resta fermo.
6. Tutte le notifiche di una variazione COMPLETATE → invio della conferma al cittadino/delegato via Notificatore di Deleghe (mai prima).
7. Ogni chiamata tracciata in `cons_t_traccia_serv_est`. Eccezioni non fatali in `cons_t_batch_errori`.

Macchina a stati indicativa (ADR-007): `DA_INVIARE → IN_INVIO → INVIATO | ERRORE → (retry) IN_INVIO | ERRORE_PERMANENTE`.

Durante una **manutenzione ASR** (§7.4) le notifiche verso quell'azienda sono sospese: i record restano in coda.

I record con `flag_notifica_cittadino = TRUE` **non** li gestisce BATCH-01: li invia BATCH-02 all'UNP.

## Come svilupparlo

- Job schedulato (Spring `@Scheduled` o Spring Batch) con transazioni brevi per lotto.
- Client **Apache CXF** generato dal WSDL v03 (contratto SIA **invariato**, nessuna migrazione a REST).
- Configurazione: `batch_size`, `MAX_TENTATIVI`, timeout SOAP, autenticazione verso i SIA come da contratto AS-IS.
- Funzione di "conferma COMPLETATO per variazione": raggruppare i record di `cons_t_notifica` per `cons_id` (o UUID della variazione) e verificare che siano tutti consegnati.
- Migrazione: colonne `num_tentativi`, `flag_notifica_cittadino`, `notificatore_uuid`, `notificatore_data_invio`; tabella `cons_t_batch_errori`.
- Test: concorrenza tra due istanze (nessun doppio invio), retry, errore permanente, sospensione per manutenzione.

## Punti aperti

- ~~Conferma CSI dell'operazione WSDL corretta~~ **Chiuso (BAT-01, call CSI 20/07/2026):** SRV-03 e SRV-04 confermati.
- Notificatore di Deleghe (**INT-10**): nel legacy l'avviso al cittadino lo invia `consprefnotifica` su `notify-mb` (`/api/v1/topics/messages`, token nell'header `x-authentication`), la stessa API del client UNP di BATCH-02. Se CSI conferma che sono lo stesso servizio, si riusa quel client.
- Definizione di "variazione COMPLETATA" per i consensi regionali (N record × M endpoint).
- Strumento di rilancio manuale degli `ERRORE_PERMANENTE` (funzione di Back Office o operazione DB?).

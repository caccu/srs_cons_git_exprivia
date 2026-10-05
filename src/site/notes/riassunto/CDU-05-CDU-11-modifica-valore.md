---
{"dg-publish":true,"permalink":"/riassunto/cdu-05-cdu-11-modifica-valore/","dg-note-properties":{}}
---

# CDU-05 / CDU-11 — Modifica del valore di un consenso (per conto dell'assistito)

**Perimetro:** FE ✅ · BE ✅ — Riferimenti: SRS v10 §6.5, §6.11 (nota chiarimenti 29/09/2026); ADR-023, ADR-015.

> Lato operatore **CDU-05 e CDU-11 coincidono**: stessa maschera, stesso servizio. Si sviluppano e si stimano una volta sola.

## Cosa fa

Inverte il valore di un consenso **già valido** (ATTIVO ↔ NEGATO, "Acconsento" ↔ "Nego") senza far riaccettare l'informativa. Il sistema storicizza il vecchio record, ne crea uno nuovo e notifica le aziende.

## Precondizioni

- Operatore autenticato, assistito selezionato (CDU-07), consensi visualizzati (CDU-08).
- Il pulsante **"Modifica Valore" / "Cambia Valore"** è abilitato **solo per ATTIVO o NEGATO**. Per SCADUTO e ANNULLATO si usa CDU-10.
- Disponibile al profilo unico Operatore, senza limitazioni per azienda o tipo di consenso.

## Flusso

1. L'operatore seleziona il consenso e preme "Modifica Valore".
2. Maschera riepilogativa: descrizione, valore attuale, informativa dell'azienda **in sola lettura**.
3. L'operatore sceglie il nuovo valore (quello opposto, o uno dei `valori_ammessi`).
4. Conferma.
5. Validazioni.
6. Storicizzazione + nuovo record (algoritmo canonico).
7. Coda notifiche agli endpoint.
8. Messaggio di successo, lista aggiornata.

## Regole chiarite il 29/09/2026

- **Aziendale**: ogni operazione riguarda **una sola azienda**. **Regionale**: il nuovo valore vale per tutte le ASR collegate.
- `cf_delegato` resta **NULL**; l'operatore è tracciato con `login_operazione` + `ruoloop_id`.
- `fonte_id` **non** arriva dal FE: lo valorizza il BE con la fonte Punto Assistito di `cons_d_fonte`, mantenendo il codice AS-IS (`PASS` è l'etichetta logica, il valore reale va verificato, es. `WA_PASS`).
- Esito mostrato all'operatore = esito del salvataggio. Consenso e righe di `cons_t_notifica` si scrivono nella **stessa transazione**. Gli errori di invio alle aziende (BATCH-01, asincrono) **non** compaiono qui.
- Nessuna accettazione dell'informativa.

## Contratto REST (deciso, ADR-023)

```
PUT /consensi/{cfAssistito}/valore
{
  "sotto_tipo_consenso_id": 12,
  "cod_asr": "010",          // null per i consensi regionali
  "valore_consenso": "NO"
}
```

- CF operatore dalla sessione, non nel path.
- Sostituisce, per questa funzione, il PUT AS-IS `/informativa/update/{cf}/{cfOperatore}`, che aggiornava in blocco tutti i consensi dell'informativa.
- I valori ammessi arrivano nel campo **`valori_ammessi: [{valore, descrizione}]`** della risposta che carica il consenso (fonte `cons_r_consenso_valore` + `cons_d_valore_cons`). Caricamento: `GET /consensi/{cfAssistito}/form?...&operazione=CAMBIO_VALORE`.

## Logica di backend

1. Validazione: record valido esistente con `tipo_stato` in (ATTIVO, NEGATO), altrimenti 409. Nuovo valore ≠ attuale e presente in `cons_r_consenso_valore` per il sotto-tipo (validità attiva). `cod_asr` obbligatorio per gli aziendali, null per i regionali.
2. Per ogni record coinvolto (1 per aziendale, N per regionale) si applica l'algoritmo canonico: UPDATE chiusura → INSERT `cons_s_consenso` → INSERT nuovo `cons_t_consenso` (stesso `d_informativa_id`, `tipo_stato` = ATTIVO se SI / NEGATO se NO) → `csi_log_audit` → `cons_t_notifica` per gli endpoint attivi non `IN_CORSO`.
3. Transazione unica. Rollback totale se fallisce un passo.

Il BE ha già un endpoint equivalente con lo stesso motore: va adeguato a questa forma.

## Come svilupparlo

**Backend**: adeguare l'endpoint esistente al contratto ADR-023. Includere `valori_ammessi` nella risposta di caricamento. Test su aziendale (1 record), regionale (N record), stato non ammesso (409), valore non ammesso (400).

**Frontend**: è la variante più leggera del Form Renderer (`operazione = CAMBIO_VALORE`): valore precompilato, informativa in sola lettura, nessuna checkbox.

## Dipendenze

`cons_r_consenso_valore` creata e popolata in migrazione (SI/NO per tutti i sotto-tipi esistenti); motore di storicizzazione; CDU-08.

## Punti aperti

- Valore effettivo di `fonte_id`.
- Ordine di presentazione dei `valori_ammessi` (manca una colonna d'ordine).

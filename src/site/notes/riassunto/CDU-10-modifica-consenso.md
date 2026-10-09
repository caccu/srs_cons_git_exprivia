---
{"dg-publish":true,"permalink":"/riassunto/cdu-10-modifica-consenso/","dg-note-properties":{}}
---

# CDU-10 — Modifica del consenso per conto di un assistito

**Perimetro:** FE ✅ · BE ✅ — Riferimenti: SRS v10 §6.10 (rinvia a §6.4 CDU-04: ALG01, ALG02 canonico, tabella campi); ADR-008, ADR-015, ADR-016; risposta FE 01/10/2026.

## Cosa fa

Serve quando un consenso **va riespresso perché l'informativa è cambiata**, cioè quando è in stato **SCADUTO** o **ANNULLATO**. L'assistito deve prendere visione della nuova informativa. L'operatore conferma o indica il valore e il sistema storicizza il vecchio record, ne crea uno nuovo e notifica le aziende.

Differenza con CDU-11: CDU-11 cambia solo il valore (SI↔NO) di un consenso ATTIVO/NEGATO, senza riaccettare l'informativa. Nella webapp Operatore i pulsanti restano **due**: "Modifica Consenso" (CDU-10) e "Cambia Valore" (CDU-11).

## Precondizioni

Operatore autenticato, assistito selezionato (CDU-07), consenso esistente in stato SCADUTO o ANNULLATO. Valgono gli stessi blocchi di allineamento e manutenzione del CDU-09.

## Comportamento per stato

| Stato attuale | Maschera | Richiesto |
|---|---|---|
| **SCADUTO** | mostra il valore precedente (non modificabile finché non si accetta la nuova informativa) | accettare la nuova informativa, anche lasciando il valore invariato |
| **ANNULLATO** | come un rilascio ex novo: valore precedente **non** mostrato | indicare il valore + accettare la nuova informativa |
| ATTIVO / NEGATO | — | si usa CDU-11 |

Consenso aziendale: se anche una sola azienda è in SCADUTO/ANNULLATO, va riaccettata l'informativa (per quell'azienda).

## Campi (dal CDU-04)

| Campo | Obbl. | Note |
|---|---|---|
| valore_consenso | sì | default = valore attuale (SCADUTO) |
| accettazione_informativa | sì (SCADUTO/ANNULLATO) | "È obbligatorio accettare la nuova informativa" |
| d_informativa_id | sì (SCADUTO/ANNULLATO) | id della **nuova** informativa corrente; "Errore: informativa non trovata" |
| sotto_tipo_consenso_id | sì | |
| cod_asr | aziendale | null per regionale |

## Logica di backend

**ALG01 — Caricamento**
1. Record valido in `cons_t_consenso` (`data_fine IS NULL`) per assistito + sotto-tipo + ASR.
2. Lettura di `tipo_stato` e `d_informativa_id`.
3. Ricerca dell'**informativa corrente** del sotto-tipo con lo SQL canonico (§7.2 ALG01): `sotto_tipo_consenso` uguale, `data_decorrenza <= NOW()`, `data_scadenza` nulla o futura, `data_cancellazione` nulla, `ORDER BY data_decorrenza DESC LIMIT 1`. Il record SCADUTO/ANNULLATO punta ancora all'informativa scaduta (scelta SC67): la nuova si individua qui.
4. Calcolo delle `regole` (tabella sopra).

**ALG02 — Salvataggio**: algoritmo canonico completo (TRASV §4):
SELECT valido → UPDATE `data_fine` → INSERT `cons_s_consenso` → INSERT `cons_t_consenso` con nuovo `d_informativa_id`, `tipo_stato` ATTIVO/NEGATO, `fonte_id` Punto Assistito, `login_operazione`, `ruoloop_id` → `csi_log_audit` (`update`) → `cons_t_notifica` per ogni endpoint attivo non `IN_CORSO`.

Per i regionali l'operazione riguarda tutti i record delle ASR collegate.

## Contratto API proposto

```
GET /consensi/{cfAssistito}/form?sotto_tipo_consenso_id=12&cod_asr=010&operazione=MODIFICA
PUT /consensi/{cfAssistito}
{ "sotto_tipo_consenso_id": 12, "cod_asr": "010", "valore_consenso": "SI",
  "d_informativa_id": 46, "accettazione_informativa": true }
```

## Come svilupparlo

**Backend**: riuso del servizio di caricamento form + motore di storicizzazione. Validazioni: lo stato deve essere SCADUTO/ANNULLATO (altrimenti 409 o rinvio a CDU-11), `d_informativa_id` deve essere l'informativa corrente del sotto-tipo, presa visione = true.

Test:
- SCADUTO con valore invariato → nuovo record ATTIVO/NEGATO con nuova informativa;
- ANNULLATO → nuovo record;
- storico corretto in `cons_s_consenso`;
- notifiche generate.

**Frontend**: stesso Form Renderer; in SCADUTO mostra il valore precedente e abilita la modifica dopo la presa visione; in ANNULLATO form vuoto.

## Dipendenze

CDU-08; BATCH-02 (genera gli stati SCADUTO/ANNULLATO); CDU-13 (nuova informativa); motore comune.

## Punti aperti

Gli stessi del CDU-09 (default radio, HTML parametri, una azienda per operazione, `fonte_id` reale, consensi regionali migrati sull'ASR 999 e TELEMED senza aziende collegate: DEV-07, DEV-08, BE-05).

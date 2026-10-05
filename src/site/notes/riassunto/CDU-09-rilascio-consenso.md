---
{"dg-publish":true,"permalink":"/riassunto/cdu-09-rilascio-consenso/","dg-note-properties":{}}
---

# CDU-09 — Rilascio del consenso per conto di un assistito

**Perimetro:** FE ✅ · BE ✅ — Riferimenti: SRS v10 §6.9 (rinvia a §6.3 CDU-03: ALG01, ALG02, tabella campi), §5, §6.17, §7.4; ADR-008, ADR-015, ADR-021; risposta FE 01/10/2026.

## Cosa fa

L'operatore, allo sportello, registra un consenso **nuovo** per l'assistito: un consenso mai espresso, oppure un consenso ANNULLATO che quindi è "vuoto". L'operatore mostra l'informativa, l'assistito ne prende visione, l'operatore registra "Acconsento" o "Nego". Il sistema salva e mette in coda le notifiche verso le aziende.

È la stessa logica del CDU-03 del cittadino. Cambiano solo i campi di tracciatura: `fonte_id` = Punto Assistito, `login_operazione` e `ruoloop_id` dell'operatore.

## Precondizioni

- Operatore autenticato, assistito selezionato (CDU-07).
- Consenso **non** in stato ATTIVO o NEGATO. Se lo è, il sistema rimanda a CDU-11 o CDU-10.
- Endpoint dell'ente **non** in allineamento (`cons_r_asr_endpoint.stato_allineamento ≠ 'IN_CORSO'`, blocco obbligatorio CDU-17) e ASR non in manutenzione (§7.4).

## Flusso

1. Dal cruscotto (CDU-08) l'operatore sceglie "Rilascia".
2. Il sistema elenca i tipi di consenso: per i regionali una riga con lo stato globale, per gli aziendali una riga per azienda.
3. L'operatore sceglie il consenso (e l'azienda, se aziendale).
4. Il sistema compone il form con il Form Renderer: informativa PDF dell'azienda, descrizione estesa, domanda, valori ammessi, testo aggiuntivo.
5. L'assistito prende visione dell'informativa: checkbox obbligatoria.
6. L'operatore seleziona il valore e conferma.
7. Il sistema salva e accoda le notifiche.
8. Messaggio di conferma e ritorno al cruscotto aggiornato.

Dopo la consegna alle aziende (stato `COMPLETATO`), parte la conferma al cittadino/delegato tramite il **Notificatore di Deleghe**. È gestita a valle da BATCH-01 (ADR-012).

## Campi (dal CDU-03)

| Campo | Tipo | Obbl. | Note |
|---|---|---|---|
| valore_consenso | radio | sì | valori da `valori_ammessi`; "Selezionare un valore per il consenso" |
| accettazione_informativa | checkbox | sì | "È obbligatorio accettare l'informativa" |
| sotto_tipo_consenso_id | hidden | sì | dalla selezione |
| d_informativa_id | hidden | sì | informativa corrente mostrata |
| cod_asr | hidden | per aziendale | null per regionale |

Default del radio: l'SRS indica NO. La **proposta** è nessuna preselezione lato operatore, da confermare con CSI.

## Logica di backend

**ALG01 — Caricamento**
- Sotto-tipi validi in `cons_d_sotto_tipo_cons` non ancora espressi dall'assistito o in stato `ANNULLATO`.
- Per ciascuno, informativa corrente e flag `online` da `cons_d_informativa`. Informativa corrente = stessa `sotto_tipo_consenso`, `data_decorrenza <= NOW()`, `data_scadenza` nulla o futura, non cancellata, la più recente. Per gli aziendali va considerata anche `cons_r_informativa_asr`.
- `valori_ammessi` da `cons_r_consenso_valore` + `cons_d_valore_cons`; parametri da `cons_r_consenso_parametro`.
- `regole.bloccato_allineamento = true` se l'endpoint è `IN_CORSO`.

**ALG02 — Salvataggio** (passi 4, 5, 6 dell'algoritmo canonico, vedi TRASV §4). In un'unica transazione:
1. validazione: campi obbligatori, valore tra quelli ammessi, informativa corrente coerente col sotto-tipo, presa visione = true, nessun record valido già ATTIVO/NEGATO, nessun blocco di allineamento o manutenzione;
2. se c'è un record ANNULLATO valido, va chiuso e storicizzato prima (UPDATE `data_fine` + INSERT `cons_s_consenso`);
3. INSERT `cons_t_consenso`: `cf_cittadino`, `id_aura`, `nome`, `cognome` (da AURA), `sotto_tipo_consenso`, `cod_asr`, `d_informativa_id`, `tipo_stato` = ATTIVO se SI / NEGATO se NO, `valore_consenso`, `fonte_id` = Punto Assistito, `login_operazione` = CF operatore, `ruoloop_id`, `cf_delegato = NULL`, `data_acquisizione = NOW()`, `uuid`;
   - **regionale**: N record, uno per ogni ASR collegata in `cons_r_sotto_tipo_cons_asr_endpoint`;
   - **aziendale**: un record per l'azienda scelta (vedi punto aperto 4);
4. INSERT `csi_log_audit` (`operazione = 'insert'`, `ogg_oper = 'cons_t_consenso'`, `key_oper`);
5. INSERT `cons_t_notifica` (`DA_INVIARE`) per ogni endpoint attivo del sotto-tipo/ASR non `IN_CORSO`.

L'esito per l'operatore dipende solo dal salvataggio. L'invio alle aziende è asincrono (BATCH-01).

## Contratto API proposto

```
GET  /consensi/{cfAssistito}/form?sotto_tipo_consenso_id=12&cod_asr=010&operazione=RILASCIO
POST /consensi/{cfAssistito}
{ "sotto_tipo_consenso_id": 12, "cod_asr": "010", "valore_consenso": "SI",
  "d_informativa_id": 45, "accettazione_informativa": true }
```

`fonte_id`, `login_operazione`, `ruoloop_id` e CF operatore li valorizza il BE dalla sessione.

## Come svilupparlo

**Backend**: servizio di caricamento del form (condiviso con CDU-10/11) + servizio di rilascio che usa il motore di storicizzazione comune. Test su consenso regionale (N record + N×endpoint notifiche), aziendale, ANNULLATO → nuovo, blocco `IN_CORSO`.

**Frontend**: componente **Form Renderer** unico (lo stesso di CDU-10/11), ordine dei blocchi fisso, regole dal campo `regole`, visualizzazione PDF via CDU-06.

## Dipendenze

CDU-07, CDU-08; configurazione da CDU-12/13/14; motore di storicizzazione e coda notifiche; BATCH-01.

## Punti aperti (regole di business da chiedere a CSI)

1. "Domande opzionali": è una sola domanda per sotto-tipo? Il DB salva un solo `valore_consenso`.
2. Consenso con `online = false`: l'operatore può rilasciarlo? Proposta: sì.
3. Default del radio. Proposta: nessuno.
4. Aziendale: una azienda per salvataggio o più aziende insieme? Il CDU-03 ALG02 dice "un record per ogni ASR a cui l'utente appartiene", ma l'informativa può cambiare per azienda. Proposta: una azienda per operazione.
5. Descrizione estesa e testo aggiuntivo: testo semplice o HTML? Ordine dei valori ammessi (nessuna colonna d'ordine).
6. Valore reale di `fonte_id` per il Punto Assistito in `cons_d_fonte`.

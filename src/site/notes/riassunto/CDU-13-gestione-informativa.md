---
{"dg-publish":true,"permalink":"/riassunto/cdu-13-gestione-informativa/","dg-note-properties":{}}
---

# CDU-13 — Gestione informativa (Back Office)

**Perimetro:** FE ✅ · BE ✅ — Riferimenti: SRS v10 §6.13, §7.2, §8.3.5, §8.3.6, §8.3.9, §8.4.5, §8.4.8; ADR-015, ADR-016.

## Cosa fa

L'operatore carica e gestisce le **informative privacy** collegate ai consensi: testo HTML, PDF, date di validità, flag `online` e `annulla_consensi`.

Le informative sono **versionate**: per cambiare un'informativa se ne pubblica una nuova e si mette una data di scadenza alla precedente. La scadenza **non** aggiorna subito i consensi. Se ne occupa **BATCH-02** di notte: i consensi legati all'informativa scaduta passano a SCADUTO (`annulla_consensi = false`) o ANNULLATO (`true`).

## Precondizioni

Operatore autenticato.

## Flusso

1. "Configurazione" → "Gestione Informative".
2. Selezione del sotto-tipo di consenso.
3. Inserimento della nuova informativa: descrizione, HTML, PDF opzionale, data decorrenza, data scadenza opzionale, flag.
4. Il sistema salva il PDF sullo storage e crea **una nuova versione** in `cons_d_informativa`.
5. Gli allegati (PDF, HTML) vanno in `cons_t_allegato` (`d_informativa_id`, `allegato_tipo_id` → `cons_d_allegato_tipo`).
6. Mettere una data di scadenza sulla precedente segnala a BATCH-02 che c'è da elaborare.

## Campi

| Campo | Obbl. | Formato / validazione | Default |
|---|---|---|---|
| sotto_tipo_consenso | sì | FK valida `cons_d_sotto_tipo_cons` ("Selezionare il tipo di consenso associato") | |
| desc_informativa | sì | testo ("Descrizione obbligatoria") | |
| html_informativa | sì | HTML ("Testo informativa obbligatorio") | |
| pdf_informativa | no | upload .pdf | |
| data_decorrenza | sì | GG/MM/AAAA | oggi |
| data_scadenza | no | > decorrenza ("Data scadenza non valida") | |
| online | no | checkbox | selezionato |
| annulla_consensi | no | checkbox | non selezionato |

## Regole importanti

- **Versionamento, non modifica in place**: una nuova informativa è un nuovo record. L'informativa corrente di un sotto-tipo è quella con `data_decorrenza <= oggi`, `data_scadenza` nulla o futura, non cancellata, la più recente.
- La modifica dell'**allegato** non cambia lo stato dei consensi espressi.
- `online` e `annulla_consensi` sono **colonne nuove** su `cons_d_informativa` (non presenti nel DB AS-IS), sorgente autoritativa dei flag in V1.0.
  - `online = false` vuol dire consenso esprimibile solo de visu, presso un punto assistito. Indica il **canale**, non lo stato di pubblicazione: la pubblicazione dipende dalle date.
  - `annulla_consensi` decide SCADUTO o ANNULLATO alla scadenza. Il flag si legge dall'**informativa che scade** (SC67 risolto).
- Aziendale con informativa per azienda: relazione in `cons_r_informativa_asr`.

## Logica di backend

**ALG01 — Creazione/Modifica**
1. Validazione dei campi.
2. INSERT in `cons_d_informativa` (`sotto_tipo_consenso`, `tipo_consenso`, `desc_informativa`, `html_informativa`, date, `online`, `annulla_consensi`, `stato_elaborazione = 'DA_ELABORARE'`, `login_operazione`, `ruoloop_id`).
3. PDF caricato: salvataggio sullo storage dedicato, percorso in `pdf_informativa` e record in `cons_t_allegato`.
4. Eventuale relazione con le ASR in `cons_r_informativa_asr`.
5. Audit `csi_log_audit` (operazione tipo `GESTIONE_INFORMATIVA`).

**ALG02 — Scadenza: NON sincrona**
Quando si imposta `data_scadenza` sulla precedente, il servizio **non** aggiorna i consensi: un numero alto di record manderebbe in timeout la richiesta HTTP. Si limita a lasciare l'informativa marcata `DA_ELABORARE` (flag/messaggio per BATCH-02). Tutta la storicizzazione è in [BATCH-02](BATCH-02-scadenza-informativa.md).

## Riferimento AS-IS

Il contratto `Informativa` AS-IS (`id_informativa, desc_informativa, html_informativa, tipo_consenso, sotto_tipo_consenso, pdf_informativa, data_decorrenza, data_scadenza`) indica i campi già presenti.

## Come svilupparlo

**Backend**
- `GET /config/informative?sotto_tipo_consenso=...` (storico delle versioni), `GET /config/informative/{id}`, `POST /config/informative` (multipart per il PDF), `PATCH /config/informative/{id}` per impostare la scadenza. Le modifiche ai dati di una versione già in uso andrebbero evitate: da decidere.
- Servizio di storage del PDF (percorso su IaaS da definire con CSI). Lo stesso file è servito da CDU-06.
- Validazione: date coerenti, nessuna sovrapposizione anomala tra versioni dello stesso sotto-tipo (regola da fissare).
- Migrazione: aggiungere `online`, `annulla_consensi`, `stato_elaborazione` e valorizzarle per le informative esistenti.

**Frontend**
- Selezione del sotto-tipo → elenco versioni (corrente, future, scadute).
- Form nuova versione con editor HTML, upload PDF, date e flag.
- Azione "imposta scadenza" sulla versione corrente, con avviso degli effetti (SCADUTO o ANNULLATO dei consensi collegati, notifica alle aziende se annullati).

## Dipendenze

CDU-12 (sotto-tipi); storage; a valle BATCH-02, CDU-06 e il Form Renderer.

## Punti aperti

- Codice dell'informativa: generato dal BE o inserito dall'utente? Nel modello TO-BE non c'è una colonna `versione` esplicita, mentre CDU-15 espone `informativa.versione`.
- Area di storage dei PDF su IaaS.
- Si può modificare una versione già pubblicata (es. correggere un refuso)?
- Rapporto con i flag Online/Annulla della maschera CDU-12.

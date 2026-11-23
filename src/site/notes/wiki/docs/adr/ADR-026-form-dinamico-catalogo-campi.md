---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-026-form-dinamico-catalogo-campi/","title":"Form dinamico — catalogo di campi tipizzati configurato in CDU-12 (FE-08)","tags":["form-renderer","composizione-dinamica","cdu-12","cdu-09","cdu-10","cdu-11","modello-dati","fe-08"],"dg-note-properties":{"adr":26,"title":"Form dinamico — catalogo di campi tipizzati configurato in CDU-12 (FE-08)","status":"accepted","date":"2026-10-29","deciders":["Exprivia (Marco Forneris)"],"supersedes":[],"superseded-by":[],"tags":["form-renderer","composizione-dinamica","cdu-12","cdu-09","cdu-10","cdu-11","modello-dati","fe-08"],"related_wiki":["[[ADR-008-ssot-form-renderer]]","[[ADR-023-cdu-11-contratto-rest-valori-ammessi]]","[[ADR-021-perimetro-solo-operatore]]","[[wiki/concepts/composizione-dinamica-form-consenso\|Composizione Dinamica Form Consenso]]","[[wiki/sources/2026-10-28-call-csi-analisi-dubbi\|Call CSI 28/10/2026]]","[[analysis-2026-05-14-punti-aperti-csi|Punti Aperti CSI]]"],"sources":["2026-10-28-call-csi-analisi-dubbi","2026-10-22-mockup-fe-cdu","2026-11-23-risposte-csi-domande-funzionali"]}}
---


# ADR-026: Form dinamico — catalogo di campi tipizzati configurato in CDU-12

## Status

`accepted` dal 23/11/2026 (conferma CSI, sotto). Nato come proposta Exprivia del 29/10/2026, da condividere con il team FE/BE (documento tecnico per Boris) e da far confermare a CSI sul punto del modello dati. Chiude l'ADR di conferma richiesto dal tracker FE-08. Non ancora recepita in SRS.

**Revisione del 16/11/2026** (domande del BE, criterio del minimo impatto): in V1.0 la maschera e le API di CDU-12 non cambiano. `ordine` e `obbligatorio` li valorizzano la migrazione e il BE con valori fissi. La lista di campi configurabile dall'operatore diventa un'evoluzione futura. Il dettaglio è nella specifica tecnica 0.3.

**Conferma CSI del 23/11/2026** ([[wiki/sources/2026-11-23-risposte-csi-domande-funzionali\|risposta 2.5]], chiude FE-08): l'assistito non risponde a nulla oltre alla domanda del valore, quindi bastano i tipi di sola visualizzazione più `DOMANDA`. Il profilo di configurazione non può aggiungere nuovi campi: il catalogo lo fissiamo noi alla migrazione. ADR portato a `accepted`; resta l'allineamento dell'SRS.

## Context

La composizione dinamica della maschera di consenso è un **requisito CSI** (documento requisiti V03: tabella `Cons_d_parametro` con label e tipo di campo; commento CSI del 14/04/2026), confermato da Manuela Bontempi nella [[wiki/sources/2026-10-28-call-csi-analisi-dubbi\|call del 28/10/2026]]: tutte le informazioni che compaiono in maschera stanno in una tabella e il FE compone la maschera su quella.

Nella call il team ha chiesto se il dinamico sia solo la label del consenso o anche il **numero di campi**. Risposta di Manuela: anche il numero, perché con più informazioni compaiono più campi, e cambia tra consenso aziendale e regionale. Il contratto proposto il 01/10/2026 dai team FE e BE ([[wiki/concepts/composizione-dinamica-form-consenso\|composizione-dinamica-form-consenso]] §5.3) prevede invece tre campi fissi (`descrizione_estesa`, `domanda`, `testo_aggiuntivo`) in ordine fisso. Anche il modello dati dell'SRS non basta: `cons_d_parametro` (§8.3.2) non ha né tipo di campo né ordine.

Boris Minardo Incitti ha chiesto 1-2 pagine di documentazione tecnica con regole, campi e tabella, per costruire l'API senza ambiguità. Il punto è, per Tommaso Ruggiero (CSI), «a maggior rischio» e sarà il fulcro della prossima riunione.

## Decision

Il form è composto da una **cornice fissa** e da un **elenco ordinato di campi** letto dal DB.

- **Cornice fissa** (non configurabile): intestazione (consenso e azienda), informativa in PDF (CDU-06), checkbox di presa visione, Salva. Le regole di visibilità restano calcolate dal BE nel campo `regole` ([[wiki/docs/adr/ADR-008-ssot-form-renderer\|ADR-008]]).
- **Campi dinamici**: righe di `cons_r_consenso_parametro` per il sotto-tipo, ordinate per `ordine`. Il tipo del campo è definito nel catalogo `cons_d_parametro`.
- **Tipi di campo V1.0**: `TESTO` (riga di sola lettura), `TEXTAREA` (blocco di testo di sola lettura), `DOMANDA` (testo della domanda a cui risponde il radio del valore del consenso; al massimo uno per consenso, con `valori_ammessi` da [[wiki/docs/adr/ADR-023-cdu-11-contratto-rest-valori-ammessi\|ADR-023]]).
- **Modello dati** (colonne nuove sulle tabelle già nuove):

  | Tabella | Colonna nuova | Significato |
  |---|---|---|
  | `cons_d_parametro` | `tipo_campo` | `TESTO` \| `TEXTAREA` \| `DOMANDA` |
  | `cons_r_consenso_parametro` | `ordine` | posizione del campo nel form, univoca per sotto-tipo |
  | `cons_r_consenso_parametro` | `obbligatorio` | il contenuto non può essere vuoto al salvataggio in CDU-12 |

  `param_cod` è la chiave del campo nel JSON; `param_desc` la sua etichetta di catalogo; `param_val` il contenuto per quel consenso.

  In V1.0 `ordine` e `obbligatorio` non li sceglie l'operatore: li valorizzano la migrazione e, per i consensi nuovi creati da CDU-12, il BE con gli stessi valori fissi.
- **Contratto** `GET /consensi/{cfAssistito}/form`: l'oggetto `parametri{}` è sostituito da `campi[]`:

  ```json
  "campi": [
    { "codice": "DESC_ESTESA", "tipo": "TEXTAREA", "ordine": 1, "obbligatorio": true, "valore": "..." },
    { "codice": "DOMANDA",     "tipo": "DOMANDA",  "ordine": 2, "obbligatorio": true,  "valore": "Vuoi ritirare il referto online?" },
    { "codice": "TESTO_AGG",   "tipo": "TEXTAREA", "ordine": 3, "obbligatorio": false, "valore": "..." }
  ]
  ```

  Il FE rende i campi nell'ordine ricevuto, per tipo. Un tipo sconosciuto è ignorato e registrato nel log, così un tipo aggiunto in futuro non rompe una versione vecchia del FE. Un campo facoltativo con contenuto vuoto non viene restituito: così il numero dei campi a video cambia da un consenso all'altro anche con il catalogo fisso.
- **Aziendale e regionale**: la composizione dipende dal sotto-tipo (e quindi da `fk_tipo_cons`), non da una colonna a parte. Il regionale è un solo record senza `cod_asr`; l'aziendale richiede `cod_asr` e l'informativa dell'azienda.
- **Migrazione**: il catalogo parte con le tre voci attuali: `DESC_ESTESA` (TEXTAREA, ordine 1, obbligatorio), `DOMANDA` (DOMANDA, ordine 2, obbligatorio), `TESTO_AGG` (TEXTAREA, ordine 3, facoltativo). La descrizione estesa è obbligatoria come nell'SRS §6.12 e nei requisiti CSI V03. Per i sotto-tipi esistenti il risultato a video resta quello di oggi (iso-funzionalità).
- **CDU-12**: in V1.0 maschera e API invariate: si salvano i tre campi di oggi. Evoluzione futura: la sezione «Parametri Aggiuntivi» diventa una lista di campi presi dal catalogo (aggiungi, rimuovi, ordina, contenuto, obbligatorio). Scambio JSON chiave-valore su REST, non XML, come detto in call.

## Consequences

### Positive
- Copre quanto chiesto da CSI: numero di campi variabile tra consensi e tra aziendale e regionale.
- Nuovi campi dello stesso tipo non richiedono sviluppo del form; dalla V1.0 in poi basta l'evoluzione di CDU-12.
- Compatibile con il contratto di CDU-11 ([[wiki/docs/adr/ADR-023-cdu-11-contratto-rest-valori-ammessi\|ADR-023]]) e con il payload di salvataggio, che non cambia.

### Negative
- Tre colonne nuove da inserire nel piano di migrazione (CONSPREF-DMP, in carico a CSI) e da riportare nell'SRS §8.3.2 e §8.3.25.
- Più lavoro nei test del Form Renderer. CDU-12 non cambia in V1.0; la gestione della lista resta da fare in un secondo momento.
- Cambia il contratto GET proposto il 01/10 (`parametri{}` → `campi[]`): da avvisare i team FE e BE prima che consolidino il codice.

### Neutral
- Il checkbox di presa visione e l'informativa restano fuori dal catalogo: dipendono da regole di stato, non da configurazione.

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| Tre campi fissi (contratto del 01/10) | Non copre «più campi» detto da CSI nella call; resta come ripiego se CSI conferma che bastano |
| Tre fissi più campi extra opzionali | Due logiche di rendering nel FE, senza vantaggi sul catalogo unico |
| JSON Schema / libreria di form (RJSF) | Dipendenza esterna, già scartata in [[wiki/docs/adr/ADR-008-ssot-form-renderer\|ADR-008]] |

## Open issues

- ~~**Campi di input aggiuntivi** (radio o flag extra a cui l'assistito risponde): V03 elenca anche radio SI/NO e flag, ma `cons_t_consenso` non ha dove salvare le risposte. In V1.0 i tipi sono di sola visualizzazione più la domanda del valore. Da chiedere a CSI se servono davvero risposte aggiuntive.~~ ✅ Chiuso 23/11/2026: non servono (risposta CSI 2.5).
- ~~**Chi estende il catalogo:** solo migrazione o anche un'operazione di CDU-12 (nuova voce con codice, etichetta e tipo)? Proposta: V1.0 solo le tre voci iniziali, estensione futura.~~ ✅ Chiuso 23/11/2026: solo la migrazione; il profilo di configurazione non aggiunge campi (risposta CSI 2.5).
- **Formato del contenuto** di `TEXTAREA` (testo semplice o HTML): già aperto in [[wiki/concepts/composizione-dinamica-form-consenso\|composizione-dinamica-form-consenso]] §5.2.
- **Storicizzazione:** la modifica del contenuto segue la validità (`validita_inizio` / `validita_fine`) delle altre tabelle di relazione; da definire se una modifica chiude la riga e ne apre una nuova.
- **Testo dei valori per l'operatore:** le descrizioni in `cons_d_valore_cons` restano «SI»/«NO», perché le restituisce anche il servizio SOAP del cittadino (Webapp Cittadino, SANSOL). Un testo diverso per l'operatore (es. «Acconsento»/«Nego») richiederebbe un campo dedicato: da chiedere a CSI.
- **SRS:** aggiornare §6.12 (CDU-12), §8.3.2, §8.3.25 e la descrizione di CDU-09/10/11 dopo la conferma; nessuna modifica fatta.

## References

- [[wiki/sources/2026-10-28-call-csi-analisi-dubbi\|Call CSI 28/10/2026]], sezione Form dinamico
- [[wiki/concepts/composizione-dinamica-form-consenso\|Composizione Dinamica Form Consenso]] §5
- [[wiki/docs/adr/ADR-008-ssot-form-renderer\|ADR-008]] (SSoT Form Renderer), [[wiki/docs/adr/ADR-023-cdu-11-contratto-rest-valori-ammessi\|ADR-023]] (valori ammessi)
- Documento tecnico per il team: `presentazione/Specifica-tecnica_form-dinamico_2026-10-29.docx` (versione 0.3 del 16/11/2026)
- SRS v10 §6.12 (CDU-12), §8.3.2, §8.3.24, §8.3.25

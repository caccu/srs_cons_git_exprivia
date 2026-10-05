---
{"dg-publish":true,"permalink":"/riassunto/cdu-12-gestione-tipo-consenso/","dg-note-properties":{}}
---

# CDU-12 — Gestione tipo consenso (Back Office)

**Perimetro:** FE ✅ · BE ✅ — Riferimenti: SRS v10 §6.12, §8.3.2-8.3.4, §8.3.23-25, §8.4.5, §8.4.6; requisiti [1] par. 2.2.2.1; ADR-008, ADR-023.

## Cosa fa

È la funzione di configurazione che **definisce i consensi**. L'operatore crea o modifica un tipo/sotto-tipo di consenso: codice, descrizione, validità, valori possibili, testi del form e aziende a cui si applica.

Tutto quello che il **Form Renderer** (CDU-09/10/11) mostra viene da qui. CDU-12 è quindi l'hub che popola le tabelle di configurazione.

## Precondizioni

Operatore autenticato sul PUA (profilo unico).

## Flusso

1. "Gestione Tipo Consenso" → elenco consensi con filtri per **Codice** e **Tipo** (Nazionale, Regionale, Aziendale).
2. "Nuovo Tipo Consenso" → maschera in tre sezioni: **Dati Generali**, **Parametri Aggiuntivi**, **Associazione Enti**.
3. Compilazione dei dati generali e dei parametri.
4. Scelta del tipo (Nazionale/Regionale/Aziendale): la lista enti si popola dinamicamente (ALG01).
5. Selezione di uno o più enti.
6. Salva → validazione → salvataggio di tutte le entità (ALG02) → messaggio e lista aggiornata.

**Variante modifica**: maschera precompilata. Sono modificabili **solo** Descrizione, Data fine, flag Online/Annulla e associazione enti.

## Campi

| Sezione | Campo | Obbl. | Formato / validazione |
|---|---|---|---|
| Dati generali | Codice Consenso | sì | max 50, univoco in `cons_d_sotto_tipo_cons` ("Codice consenso già esistente") |
| | Descrizione | sì | max 255 |
| | Data inizio decorrenza | sì | GG/MM/AAAA, default oggi |
| | Data fine decorrenza | no | > inizio ("Data fine non valida") |
| | Valori possibili | sì | multi-select, almeno uno ("Selezionare almeno un valore") |
| | fk_tipo_cons | sì | FK valida verso `cons_d_tipo_cons` |
| Parametri aggiuntivi | Descrizione estesa | sì | text area |
| | Domanda da porre | sì | max 255 (è l'etichetta del radio nel form) |
| | Testo aggiuntivo | no | text area |
| | Consenso online | sì | SI/NO, default SI |
| | Annulla consensi | sì | SI/NO, default NO |
| Associazione enti | Tipo consenso | sì | Nazionale / Regionale / Aziendale |
| | Enti/Aziende | sì | multi-select, almeno uno ("Associare almeno un ente") |

## Dove si salvano i flag `online` e `annulla_consensi` (importante)

In V1.0 i due flag **non** vanno in `cons_r_consenso_parametro`. La loro unica sorgente autoritativa è **`cons_d_informativa`**: deroga al requisito V03 approvata da CSI il 20/07/2026 (GOV-02). È la stessa sorgente letta da BATCH-02.

Le due colonne **non esistono nel DB AS-IS**: vanno create con gli script di migrazione TO-BE. In caso di conflitto tra tipo consenso e informativa prevale l'informativa.

Conseguenza pratica: i due campi della maschera CDU-12 vanno propagati sull'informativa (oppure gestiti solo in CDU-13). Il comportamento esatto va definito, vedi punti aperti.

## Logica di backend

**ALG01 — Popolamento enti per tipo**

| Tipo | Query |
|---|---|
| Nazionale | `cons_d_asr` con `tipo_ente = 'NAZIONALE'` |
| Regionale | `tipo_ente = 'REGIONALE'` |
| Aziendale | `tipo_ente = 'AZIENDALE'` **e** almeno un record attivo in `cons_r_asr_endpoint` |

`cons_d_asr.tipo_ente` è una **colonna nuova** (decisione interna del 24/09/2026): va creata e valorizzata in migrazione per gli enti esistenti.

**ALG02 — Salvataggio** (transazione unica)
1. INSERT `cons_d_sotto_tipo_cons` (codice, descrizione, date, `tipo_consenso` FK).
2. Per ogni parametro (Descrizione estesa, Domanda, Testo): INSERT in `cons_r_consenso_parametro` (`sotto_tipo_consenso`, `param_id` ricavato da `cons_d_parametro` per codice, `param_val`). Online e Annulla: vedi sopra.
3. Per ogni valore possibile: INSERT in `cons_r_consenso_valore` (`sotto_tipo_consenso`, `valore_consenso` FK `cons_d_valore_cons`, validità).
4. Per ogni ente: INSERT in `cons_r_sotto_tipo_cons_asr_endpoint`. **Logica regionale**: se tipo Regionale e ente "Regione Piemonte", il sistema crea N record, uno per **ogni ASR** della regione.
5. Audit in `csi_log_audit`.

Modifica: in linea con la storicizzazione delle tabelle di relazione (`validita_fine`/`valida_fine`, `data_cancellazione`) conviene chiudere e riaprire le righe invece di cancellarle.

## Come svilupparlo

**Backend**
- CRUD `/config/tipi-consenso` (lista filtrata, dettaglio, create, update limitato ai campi ammessi).
- Lookup: tipi consenso (`cons_d_tipo_cons`), valori (`cons_d_valore_cons`), parametri (`cons_d_parametro`), enti per tipo (ALG01).
- Prerequisito DB: seed di `cons_d_parametro` con le chiavi (DESCRIZIONE_ESTESA, DOMANDA, TESTO_AGGIUNTIVO; codici da fissare) e di `tipo_ente` sugli enti esistenti.

**Frontend**
- Lista con filtri; maschera a tre sezioni; select del tipo che ricarica la multi-select degli enti; in modifica solo i campi ammessi abilitati.

## Dipendenze

Colonne/tabelle nuove in migrazione (`tipo_ente`, `cons_r_consenso_valore`, `cons_r_consenso_parametro`, `cons_d_parametro`). È a monte di CDU-09/10/11 e di CDU-13.

## Punti aperti

- Rapporto tra i flag Online/Annulla nella maschera CDU-12 e i flag sull'informativa (CDU-13): sola visualizzazione, default per le nuove informative, o propagazione su quella corrente?
- Codici di `cons_d_parametro` e formato (testo o HTML) di Descrizione estesa / Testo aggiuntivo.
- Colonna d'ordine per i valori ammessi.
- Elenco ASR della "Regione Piemonte" per la logica regionale: con quale criterio? Tutte le `tipo_ente = 'AZIENDALE'`?

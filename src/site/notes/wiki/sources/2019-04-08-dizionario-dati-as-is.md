---
{"dg-publish":true,"permalink":"/wiki/sources/2019-04-08-dizionario-dati-as-is/","title":"Modello Dizionario Dati AS-IS (2019)","tags":["modello-dati","as-is","database",2019,"dizionario"],"dg-note-properties":{"title":"Modello Dizionario Dati AS-IS (2019)","aliases":["Modello Dizionario Dati AS-IS (2019)"],"type":"source","tags":["modello-dati","as-is","database",2019,"dizionario"],"created":"2026-05-05","updated":"2026-05-05","sources":[],"related":["[[2026-03-02-conspref-srs-v1-revised|CONSPREF-SRS-V1.0 revised bozza v2]]","[[Gestione Consensi - Applicativo]]","[[2019-03-20-acc-del-cdu-01-servizi-acquisizione|ACC-DEL-CDU-01 Servizi Acquisizione Consensi (AS-IS)]]"]}}
---


# Modello Dizionario Dati AS-IS

**Documento:** CSI-Progetto-Consensi-Modello-Dizionario-dati-3.md
**Autore:** Marcello Frinco — 08/04/2019
**Versione:** 01
**Rilevanza:** Baseline schema DB AS-IS — input per migrazione PG9→PG17 e audit DDL

---

## Struttura modello AS-IS

**12 entità totali** (vs **25+** nel TO-BE):
- **2 entità di business** (1 principale + 1 di storico)
- **1 tabella di log**
- **9 tabelle di dominio**

---

## Entità AS-IS

| Entità | Tipo | Storicizzazione | Descrizione |
|---|---|---|---|
| `cons_t_consenso` | Business | **SÌ** | Consensi espressi |
| `cons_s_consenso` | Business (storico) | NO | Storicizzazione — **al momento non popolata** |
| `csi_log_audit` | Log | NO | Log accessi/operazioni |
| `cons_d_valore_consenso` | Dominio | No | Valori esprimibili di consenso |
| `cons_d_asr` | Dominio | No | Anagrafica ASR |
| `cons_d_operatore` | Dominio | No | Operatori |
| `cons_d_stato` | Dominio | No | Stati del consenso |
| `cons_d_fonte` | Dominio | No | Fonti |
| `cons_d_tipo_fonte` | Dominio | No | Tipologie di fonti |
| `cons_d_informativa` | Dominio | No | Informative per tipo/sottotipo consenso |
| `cons_d_sotto_tipo_cons` | Dominio | No | Sottotipi di consenso |
| `cons_d_tipo_cons` | Dominio | No | Tipi di consenso |

---

## Delta AS-IS → TO-BE (modello dati)

| Aspetto | AS-IS | TO-BE |
|---|---|---|
| Totale entità | 12 | **25+** |
| Tabella storico | `cons_s_consenso` (non usata) | Usata attivamente |
| Notifiche batch | Non presente | `cons_t_notifica`, `cons_t_notifica_errore_dett` — vedi [[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] |
| Endpoint | Non modellato | `cons_t_endpoint`, `cons_r_asr_endpoint` |
| Tracciatura ext. | Non presente | `cons_t_traccia_serv_est` |
| Parametri dinamici | Non presente | `cons_d_parametro`, `cons_r_consenso_parametro` |
| Allegati informativa | Non presente | `cons_t_allegato`, `cons_d_allegato_tipo` |
| Batch errori | Non presente | `cons_t_batch_errori` |
| Relazioni | Non visibili nel doc | `cons_r_sotto_tipo_cons_asr_endpoint`, `cons_r_consenso_valore`, `cons_r_informativa_asr` |

---

## Note critiche

**Il dizionario AS-IS è molto scarno** — nessuna definizione di attributi nei campi visibili del documento. I dettagli degli attributi (nomi colonne, tipi, vincoli) non sono stati pubblicati nel documento markdown. Questo significa che l'**audit PG9→PG17** (Sprint 0) deve lavorare direttamente sul DDL reale del DB AS-IS, non da questo documento.

**Nota su `cons_s_consenso`:** Il documento AS-IS dice "al momento non popolata". Nel TO-BE invece viene usata attivamente come tabella di storico pre-modifica (INSERT prima di ogni UPDATE) — vedi [[wiki/concepts/ciclo-vita-consenso\|Ciclo di Vita del Consenso]]. Questo potrebbe significare che la tabella esiste fisicamente nel DB ma è vuota — da verificare nell'audit DDL.

---

## Implicazioni per audit migrazione

1. Eseguire `\d` su ogni tabella AS-IS per ottenere il DDL reale
2. Confrontare con tabelle TO-BE dell'SRS (cap. 8)
3. Verificare che `cons_s_consenso` esista e abbia struttura compatibile con il TO-BE
4. Identificare colonne deprecate/rinominate tra AS-IS e TO-BE
5. Verificare presenza di SERIAL/BIGSERIAL da migrare a `GENERATED ALWAYS AS IDENTITY`

Vedi anche: [[wiki/analyses/analysis-gap-as-is-to-be\|Analisi Gap AS-IS → TO-BE — Gestione Consensi]] per delta completo modello dati.

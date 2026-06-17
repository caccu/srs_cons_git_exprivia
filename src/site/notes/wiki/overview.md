---
{"dg-publish":true,"permalink":"/wiki/overview/","title":"Overview","tags":["gestione-consensi","sanita-piemonte","srs","exprivia"],"dg-note-properties":{"title":"Overview","aliases":["Overview"],"type":"overview","tags":["gestione-consensi","sanita-piemonte","srs","exprivia"],"created":"2026-05-05","updated":"2026-05-29","sources":["2026-03-02-conspref-srs-v1-revised","2026-03-02-appunti-e-pianificazione","2026-03-02-domande-srs-csi-v02","2023-09-01-conspref-srs-01-v03","2019-02-01-sfu-gestione-consensi-v1-7","2026-03-12-pile-tecnologiche-csi"]}}
---


# Wiki Overview — Progetto Gestione Consensi

**Dominio:** Rifacimento applicativo Gestione Consensi, Sanità Elettronica Regione Piemonte
**Fornitore:** [[wiki/entities/exprivia\|Exprivia S.p.A.]] per [[wiki/entities/csi-piemonte\|CSI Piemonte]] / Regione Piemonte
**Fase attuale:** Analisi/SRS in bozza, pre-sviluppo

---

## Sintesi del progetto

[[wiki/entities/exprivia\|Exprivia S.p.A.]] sta analizzando il rifacimento completo dell'applicativo [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi - Applicativo]] della Regione Piemonte. Il sistema gestisce i consensi sanitari dei cittadini piemontesi (tre livelli: nazionale, regionale, aziendale) attraverso 16 casi d'uso, 3 processi batch e 6 sistemi esterni.

Il documento centrale è **CONSPREF-SRS-V1.0** (bozza v2), redatto da Marco Forneris/Exprivia il 02/03/2026, che specifica il sistema TO-BE con stack tecnologico Angular 19 + Spring Boot 3 + PostgreSQL 17 su infrastruttura cloud [[wiki/concepts/architettura-iaas\|Architettura IaaS]] (Kubernetes/Nivola).

---

## Stato dell'analisi

**Giudizio:** alta qualità per un documento in bozza. Il lavoro è stato fatto bene. Le lacune principali sono:
1. **CONSPREF-DMP non formalizzato** — rischio critico per Fase 6 migrazione PG9→PG17
2. **Protocollo [[wiki/concepts/gasp-salute\|GASP Salute]] (OIDC vs SAML2)** — aperto, blocca CDU-01
3. **OpenAPI CDU-15/16** — [[wiki/analyses/analysis-2026-05-06-openapi-cdu-15-16\|v0.1-DRAFT prodotta]]; 5 TBD da confermare con CSI prima di condividere con [[wiki/concepts/sistemi-esterni-integrati\|SIA ASR]]

Vedi [[wiki/analyses/valutazione-qualita-srs-consensi\|Valutazione Qualità SRS — Gestione Consensi]] per analisi completa.

---

## Architettura del sistema (sintesi)

```
Cittadino (SPID/CIE) → GASP Salute → Angular SPA → Spring Boot 3 → PostgreSQL 17 (DBaaS)
Operatore (RUPAR/IRIDE) → PUA → Angular SPA → Spring Boot 3

Spring Boot → AURA (SOAP), Deleghe (SOAP), UNP (REST), SIA-ASR (SOAP+REST)
```

---

## Temi chiave

### [[wiki/concepts/ciclo-vita-consenso\|Ciclo di Vita del Consenso]]
5 stati: NON_ESPRESSO → ATTIVO/NEGATO → SCADUTO/ANNULLATO. No sovrascrittura. Notifica asincrona via BATCH-01 ogni 5 minuti.

### Migrazione PostgreSQL 9 → 17
8 major release di salto. Strategia dump/restore. CONSPREF-DMP da redigere. Rischi documentati: autenticazione (md5→scram), tipi deprecati, comportamento timestamp.

### Sicurezza
No API Gateway, Spring Security diretto. K8s Secret per credenziali. OWASP Top 10. CF mascherato nei log.
Per CDU-15/16 (servizi REST verso SIA ASR): OAuth2 Client Credentials + JWT, isolamento per ente via tabella `cons_t_client_ente` + filter custom + WHERE clause repository (difesa a 3 livelli). Dettaglio: [[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15-16 — Modello Autorizzazione per Ente]].

---

## Documenti ingestionati (12/12)

| Documento | Status |
|---|---|
| CONSPREF-SRS-V1.0 revised v2 | ✅ |
| Sommario SRS Consensi (TOC strutturale) | ✅ |
| Appunti sistema + Pianificazione | ✅ |
| Domande SRS — revisione CSI V02 | ✅ |
| CONSPREF-SRS-01-V03 | ✅ |
| SFU Gestione Consensi V1.7 AS-IS | ✅ |
| Pile Tecnologiche CSI (mar 2026) | ✅ |
| Linea Guida Fornitori v1.0.1 cloud | ✅ |
| WebService ConsensoRegionaleAziendale v03 | ✅ |
| CSI Modello Dizionario Dati | ✅ |
| ACC-DEL-CDU-01-V01 Servizi Acquisizione | ✅ |
| Mermaid.txt (diagramma architettura) | ✅ |

---

## Evolution

- **2026-05-05** — Primo ingest: 6 documenti. Struttura wiki creata. Valutazione SRS.
- **2026-05-05** — Completamento corpus: 4 documenti rimanenti ingestionati. 2 nuovi rischi identificati: ambiguità BATCH-01/WSDL e differenza AS-IS/TO-BE stato SCADUTO.
- **2026-05-05** — Ingest Sommario SRS (TOC strutturale). Confermato: 25 tabelle TO-BE, 10 [PROPOSTA] §8.4. Index rielaborato con quick reference rischi e raggruppamento per categoria.
- **2026-05-05** — **Lint completo:** 6 nuove pagine create ([[wiki/concepts/gasp-salute\|GASP Salute]], [[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]], [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]], [[wiki/entities/regione-piemonte\|Regione Piemonte]], [[wiki/sources/2026-05-05-mermaid-architettura\|Diagramma Architettura Sistema — Mermaid]], [[wiki/analyses/analysis-gap-as-is-to-be\|Analisi Gap AS-IS → TO-BE — Gestione Consensi]]). Cross-ref densificate su 5 pagine esistenti. Filename ACC-DEL corretto nel log. Totale wiki: 24 pagine.
- **2026-05-14** — Risposta tecnica al commento cliente **TR30** (SRS v3 §6.16): creato concept [[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15-16 — Modello Autorizzazione per Ente]] con modello a 3 livelli (JWT + tabella mapping + WHERE clause), pseudocodice filter Spring Security, schema tabella `cons_t_client_ente`, 6 gap SRS e 6 punti aperti da CSI. Confermato esplicitamente: **no API Manager/Gateway** in path. Corpus 27→28 pagine.
- **2026-05-14** — Risposta tecnica al commento cliente **TR34** (SRS v3 §7.3 BATCH-03): proposta sostituzione BATCH-03 push con [[wiki/concepts/alternativa-batch-03-pull\|Alternativa BATCH-03 — PULL CDU-17 (centro stella)]] — endpoint REST paginato cursor-based, hub-and-spoke pull, zero push burden sul sistema regionale, zero downtime. Riusa interamente security CDU-15/16. BATCH-03 da rimuovere dal SRS. Variante export-with-downtime documentata come fallback. Status: PROPOSTA awaiting CSI. Corpus 28→30 pagine.
- **2026-05-14** — **Propagazione 30 risposte MF** da SRS v3 lavorazione (69 commenti). Nuovo concept [[wiki/concepts/composizione-dinamica-form-consenso\|Composizione Dinamica Form Consenso — Single Source of Truth]] (pattern SSoT Form Renderer unico Citt+Op). Tracker master [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|analysis-2026-05-14-risposte-mf-srs-v3]]. Aggiornati 5 concept + 1 analysis (gap AS-IS→TO-BE) + 1 source. Eliminato SistemaTS dal corpus integrazioni. BATCH-01 scheduling 5min+SKIP LOCKED, Notificatore di Deleghe distinto da UNP, LIS 3° canale acquisizione. Aperto: SC67 (storicizzazione INSERT BATCH-02). Corpus 30→31 pagine.
- **2026-05-14** — **Tracker unificato punti aperti CSI** ([[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti da Chiedere a CSI Piemonte — Tracker Unificato]]): 38 punti consolidati da 8 pagine, raggruppati per area (Identità, Sicurezza CDU-15/16, Pull CDU-17, OpenAPI, Batch, Integrazioni, Infra, Gov) e prioritizzati per sprint. 10 punti Giorno 1 / Sprint 0 critico. Corpus 31→32 pagine.
- **2026-05-14** — **Lint wiki:** zero dead-links, zero orfani. Fix: rinomina page "Pile Tecnologiche CSI Piemonte" (era "(marzo 2026)") — chiude 6 riferimenti dead. Aggiornati frontmatter `related` in source SRS-v1-revised (3 link). Q&A CSI #N nel checklist convertiti in alias verso [[wiki/sources/2026-03-02-domande-srs-csi-v02\|Domande SRS Consensi — Revisione CSI V02]]. Rimosso duplicato Concept/Source nell'index. Corpus ricalibrato 32→31 (errore di conteggio precedente).

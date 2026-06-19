---
{"dg-publish":true,"permalink":"/wiki/sources/2026-03-02-sommario-srs-consensi/","title":"Sommario SRS Gestione Consensi — Indice Strutturale","tags":["srs","struttura","toc","navigazione","gestione-consensi"],"dg-note-properties":{"title":"Sommario SRS Gestione Consensi — Indice Strutturale","aliases":["Sommario SRS Gestione Consensi — Indice Strutturale"],"type":"source","tags":["srs","struttura","toc","navigazione","gestione-consensi"],"created":"2026-05-05","updated":"2026-05-05","sources":[],"related":["[[wiki/sources/2026-03-02-conspref-srs-v1-revised\|CONSPREF-SRS-V1.0 revised bozza v2]]","[[Gestione Consensi - Applicativo]]","[[ciclo-vita-consenso|Ciclo di Vita del Consenso]]","[[Architettura IaaS]]"]}}
---


# Sommario SRS Gestione Consensi — Indice Strutturale

**Documento:** Sommario-SRS-concensi.md  
**Natura:** TOC/outline strutturale dell'SRS — nessun contenuto testuale, solo intestazioni  
**Utilità:** Mappa di navigazione completa, conferma conteggio esatto sezioni e tabelle

---

## Struttura SRS confermata

| Sezione | Titolo                                                                       | Note                                                                                                                  |                                                 |
| ------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| §1      | Scopo, Riferimenti, Glossario                                                | —                                                                                                                     |                                                 |
| §2      | Contesto: descrizione, modello, profili applicativi                          | —                                                                                                                     |                                                 |
| §3      | Architettura: sintesi, modello, componenti, GASP, framework, ECaaS           | §3.3.1 specifica [[wiki/concepts/gasp-salute\|GASP Salute]]; §3.5.1-3.5.6 infrastruttura [[wiki/concepts/architettura-iaas\|Architettura IaaS]] |                                                 |
| §4      | Logging: tracciatura servizi esterni, spec integrazioni                      | —                                                                                                                     |                                                 |
| §5      | Requisiti di business: stati consenso + diagramma                            | §5.1-5.2 macchina a stati — vedi [[wiki/concepts/ciclo-vita-consenso\|ciclo-vita-consenso]]                                                              |                                                 |
| §6      | Modello Casi d'Uso: CDU-01÷17 (CDU-17 = proposta tecnica)                    | 17 sezioni, una per CDU                                                                                               |                                                 |
| §7      | Processi batch: BATCH-01, BATCH-02 (BATCH-03 RIMOSSO → CDU-17 PULL)          | vedi [[wiki/concepts/batch-processes\|batch-processes]]                                                                                              | Processi Batch — BATCH-01, BATCH-02, BATCH-03]] |
| §8      | Modello dati: ER AS-IS, ER TO-BE, dizionario 25 tabelle + 1 nuova, 11 PROPOSTA | §8.3.1-8.3.25 + §8.4.1-8.4.11                                                                                       |                                                 |
| §9      | Requisiti Non Funzionali: sicurezza, scalabilità, migrazione, audit PG9→PG17 | —                                                                                                                     |                                                 |

---

## Dizionario dati TO-BE — 25 tabelle (§8.3)

| # | Tabella | # | Tabella |
|---|---|---|---|
| 8.3.1 | `cons_d_allegato_tipo` | 8.3.14 | `cons_t_notifica_errore_dett` |
| 8.3.2 | `cons_d_parametro` | 8.3.15 | `cons_d_errore_tipo` |
| 8.3.3 | `cons_d_tipo_cons` | 8.3.16 | `cons_d_valore_cons` |
| 8.3.4 | `cons_d_sotto_tipo_cons` | 8.3.17 | `cons_d_stato` |
| 8.3.5 | `cons_d_informativa` | 8.3.18 | `cons_d_fonte` |
| 8.3.6 | `cons_r_informativa_asr` | 8.3.19 | `cons_d_tipo_fonte` |
| 8.3.7 | `cons_r_asr_endpoint` | 8.3.20 | `cons_d_operatore` |
| 8.3.8 | `cons_d_asr` | 8.3.21 | `cons_t_operatorebo` |
| 8.3.9 | `cons_t_allegato` | 8.3.22 | `csi_log_audit` |
| 8.3.10 | `cons_t_endpoint` | 8.3.23 | `cons_r_sotto_tipo_cons_asr_endpoint` |
| 8.3.11 | `cons_t_consenso` | 8.3.24 | `cons_r_consenso_valore` |
| 8.3.12 | `cons_s_consenso` | 8.3.25 | `cons_r_consenso_parametro` |
| 8.3.13 | `cons_t_notifica` | | |

**Totale: 25 tabelle core (§8.3) + 1 nuova tabella applicativa `cons_t_client_ente` (§8.4.11) = 26 TO-BE** (vs 12 AS-IS)

---

## Proposte evolutive — 11 [PROPOSTA] in §8.4

| § | Oggetto |
|---|---|
| 8.4.1 | Nuova tabella: `cons_t_traccia_serv_est` |
| 8.4.2 | Estensione: `cons_t_notifica` |
| 8.4.3 | Estensione: `cons_r_asr_endpoint` |
| 8.4.4 | Estensione: `cons_s_consenso` |
| 8.4.5 | Spostamento campi "online" e "annulla_consensi" |
| 8.4.6 | Estensione: `cons_d_asr` |
| 8.4.7 | Nuova tabella: `cons_d_asr_destinazione` |
| 8.4.8 | Estensione: `cons_d_informativa` |
| 8.4.9 | Nuova tabella: `cons_t_batch_errori` |
| 8.4.10 | Estensione: `cons_s_consenso` e `cons_t_consenso` |
| 8.4.11 | Nuova tabella: `cons_t_client_ente` (isolamento dati per ente — CDU-15/16/17; con `EnteAuthorizationFilter`, Snapshot Service, rate limit bucket4j) |

Dettagli di ogni PROPOSTA nel documento principale [[wiki/sources/2026-03-02-conspref-srs-v1-revised\|CONSPREF-SRS-V1.0 revised bozza v2]].

---

## Utilità per la wiki

- **Audit DDL:** lista completa 26 tabelle TO-BE (25 §8.3 + `cons_t_client_ente` §8.4.11) — usare per Sprint 0 audit PG9→PG17
- **Navigazione SRS:** mappa sezioni per query rapide
- **PROPOSTA tracking:** 11 proposte da validare con CSI prima degli sprint

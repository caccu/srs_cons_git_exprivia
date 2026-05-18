---
{"dg-publish":true,"permalink":"/wiki/analyses/analysis-2026-05-14-punti-aperti-csi/","title":"Punti Aperti da Chiedere a CSI Piemonte — Tracker Unificato","tags":["tracker","punti-aperti","csi-piemonte","blocking","sprint-0","sprint-1","da-chiedere"],"dg-note-properties":{"title":"Punti Aperti da Chiedere a CSI Piemonte — Tracker Unificato","aliases":["Punti Aperti da Chiedere a CSI Piemonte — Tracker Unificato"],"type":"analysis","tags":["tracker","punti-aperti","csi-piemonte","blocking","sprint-0","sprint-1","da-chiedere"],"created":"2026-05-14","updated":"2026-05-14","sources":["2026-03-02-conspref-srs-v1-revised","2026-03-02-domande-srs-csi-v02"],"related":["[[wiki/analyses/analysis-2026-05-06-checklist-avvio-progetto|Checklist Avvio Progetto — Gestione Consensi]]","[[wiki/concepts/sicurezza-cdu-15-16|Sicurezza CDU-15-16 — Modello Autorizzazione per Ente]]","[[wiki/concepts/alternativa-batch-03-pull|Alternativa BATCH-03 — PULL CDU-17 (centro stella)]]","[[wiki/analyses/analysis-2026-05-06-openapi-cdu-15-16|analysis-2026-05-06-openapi-cdu-15-16]]","[[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3|analysis-2026-05-14-risposte-mf-srs-v3]]","[[GASP Salute|GASP Salute]]","[[wiki/concepts/batch-processes|Processi Batch — BATCH-01, BATCH-02, BATCH-03]]","[[Sistemi Esterni Integrati]]","[[wiki/sources/2026-05-05-mermaid-architettura|Diagramma Architettura Sistema — Mermaid]]","[[valutazione-qualita-srs-consensi|Valutazione Qualità SRS — Gestione Consensi]]"]}}
---


# Punti Aperti da Chiedere a CSI Piemonte

**Scopo:** consolidare in un unico tracker tutte le domande, ambiguità, TBD e proposte in attesa di conferma sparse nel corpus wiki. Ogni voce rimanda alla pagina autoritativa.

**Stato corpus alla data:** 31 pagine, 30/30 risposte MF da SRS v3_lavorazione propagate, 0 dead-link.

**Legenda priorità:**
- 🔴 **CRITICO** — blocca Sprint 0/1, da chiarire **Giorno 1**
- 🟠 **ALTO** — blocca Sprint 2-3
- 🟡 **MODERATO** — necessario prima di UAT/go-live
- ⚪ **APERTO** — utile ma non bloccante

---

## 1. Identità & Autenticazione (Cittadino + Operatore)

| #     | Domanda                                                                                                    | Prio | Sprint     | Fonte wiki                                                            |
|-------|------------------------------------------------------------------------------------------------------------|------|------------|------------------------------------------------------------------------|
| ID-01 | **GASP Salute: protocollo OIDC o SAML2?** Endpoint AS + metadata + flow autenticazione                     | 🔴   | Giorno 1   | [[GASP Salute|GASP Salute]], [[wiki/analyses/analysis-2026-05-06-checklist-avvio-progetto|Checklist Avvio Progetto — Gestione Consensi]] §B1 |
| ID-02 | Registrazione app PUA — 2 profili (Operatore, Amministratore)                                              | 🟠   | Sprint 2   | Checklist §B9                                                          |
| ID-03 | Credenziali IRIS per autenticazione AURA (ambiente DEV)                                                   | 🟠   | Sprint 1   | Checklist §B7                                                          |

---

## 2. Sicurezza CDU-15/16 — OAuth2/JWT (TR30 → TR58)

Tutte da [[wiki/concepts/sicurezza-cdu-15-16|Sicurezza CDU-15-16 — Modello Autorizzazione per Ente]] §Punti da chiarire con CSI.

| #     | Domanda                                                                                                    | Prio | Sprint   |
|-------|------------------------------------------------------------------------------------------------------------|------|----------|
| SEC-01 | URL produzione/test Authorization Server CSI Piemonte                                                     | 🔴   | Sprint 0 |
| SEC-02 | Algoritmo firma JWT (RS256? ES256?) + URL endpoint JWKS                                                   | 🔴   | Sprint 0 |
| SEC-03 | Procedura onboarding nuovo SIA — chi crea `client_id`, chi popola tabella mapping `cons_t_client_ente`    | 🟠   | Sprint 1 |
| SEC-04 | TTL token raccomandato + politica refresh (default proposto: 3600s)                                       | 🟠   | Sprint 1 |
| SEC-05 | Scope OAuth predefiniti CSI o liberi a definire dal progetto? (`consensi:read`, `consensi:snapshot`, ...) | 🟠   | Sprint 1 |
| SEC-06 | Politica revoca credenziali compromesse (blacklist? rotation?)                                            | 🟡   | Sprint 2 |

---

## 3. CDU-17 Snapshot Pull (TR34 → TR68) — sostituzione BATCH-03

Tutte da [[wiki/concepts/alternativa-batch-03-pull|Alternativa BATCH-03 — PULL CDU-17 (centro stella)]] §Domande aperte CSI.

| #     | Domanda                                                                                                    | Prio | Sprint   |
|-------|------------------------------------------------------------------------------------------------------------|------|----------|
| PULL-01 | Variante 6.A (blocco acquisizioni durante snapshot) o 6.B (watermark no-block) preferita?                | 🔴   | Sprint 0 |
| PULL-02 | Canale notifica out-of-band al SIA: email solo o anche webhook configurabile per ASR?                    | 🔴   | Sprint 0 |
| PULL-03 | Scope OAuth `consensi:snapshot` accettato? Lifecycle (attivazione → disattivazione post-allineamento)?   | 🟠   | Sprint 1 |
| PULL-04 | `page_size` massimo accettabile? Tunable per ASR via `cons_t_client_ente`?                               | 🟡   | Sprint 2 |
| PULL-05 | Variante export-with-downtime da formalizzare come opzione retrocompatibile (fallback)?                  | 🟡   | Sprint 2 |
| PULL-06 | **BATCH-03: eliminazione totale dal SRS o deprecation marker?**                                          | 🟠   | Sprint 1 |
| PULL-07 | Conferma completamento allineamento via PATCH idempotente accettabile? Alternativa: auto-detect timeout? | 🟡   | Sprint 2 |

---

## 4. OpenAPI CDU-15/16 — TBD da OpenAPI v0.1

Da [[wiki/analyses/analysis-2026-05-06-openapi-cdu-15-16|analysis-2026-05-06-openapi-cdu-15-16]] e dal file `openapi-cdu-15-16-v0.1.yaml`.

| #     | Domanda                                                                                                    | Prio | Sprint   |
|-------|------------------------------------------------------------------------------------------------------------|------|----------|
| API-01 | URL Authorization Server CSI (TODO-M1) — confluisce con SEC-01                                            | 🔴   | Sprint 0 |
| API-02 | Scope OAuth richiesto per `/consensi/stato` (TODO-M2) — confluisce con SEC-05                             | 🟠   | Sprint 1 |
| API-03 | Schema paginazione cursor-based — `page_size` default + max accettato (TODO-M3)                          | 🟡   | Sprint 2 |
| API-04 | SLA tempo risposta + throughput target per CDU-15/16 (TODO-M4)                                            | 🟡   | UAT      |
| API-05 | Lista ASR coinvolte nel TO-BE + referenti tecnici per recepimento OpenAPI (TODO-M5)                       | 🟠   | Sprint 2 |

---

## 5. Batch & WSDL — BATCH-01 / BATCH-02

| #     | Domanda                                                                                                    | Prio | Sprint   | Fonte                                                              |
|-------|------------------------------------------------------------------------------------------------------------|------|----------|--------------------------------------------------------------------|
| BAT-01 | **Operazione WSDL per BATCH-01: SRV-01 (AcquisizioneConsenso inbound) o SRV-03 (NotificaAcquisizioneConsenso outbound)?** | 🟡 (rischio implementativo grave) | Sprint 1 | [[wiki/concepts/batch-processes|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] §RISCHIO, Checklist §B10 |
| BAT-02 | **SC67 — Logica INSERT cons_t_consenso da BATCH-02 (ALG02 storicizzazione): "da approfondire e verificare meglio"** | 🟠   | Prima di chiudere SRS | [[wiki/concepts/batch-processes|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] §ALG02, [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3|analysis-2026-05-14-risposte-mf-srs-v3]] §Tema J |
| BAT-03 | Stato SCADUTO — semantica cambiata AS-IS vs TO-BE: SIA ASR devono aggiornare logica business. Conferma comunicazione ASR? | 🟠   | Sprint 1 | [[wiki/concepts/batch-processes|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] §Differenza semantica, [[wiki/analyses/analysis-gap-as-is-to-be|Analisi Gap AS-IS → TO-BE — Gestione Consensi]] |

---

## 6. Integrazioni & Canali

| #      | Domanda                                                                                   | Prio | Sprint   | Fonte                                                                                                             |
| ------ | ----------------------------------------------------------------------------------------- | ---- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| INT-01 | **WSDL AURA** — lista completa servizi (CDU-07/08 ricerca paziente + operatori)           | 🟠   | Sprint 0 | Checklist §B5                                                                                                     |
| INT-02 | **WSDL Gestione Deleghe**                                                                 | 🟠   | Sprint 0 | Checklist §B6                                                                                                     |
| INT-03 | **LIS — acronimo + spec integrazione canale acquisizione consensi** (MF3R1, MF4R1)        | 🟠   | Sprint 1 | [[wiki/concepts/sistemi-esterni-integrati|Sistemi Esterni Integrati]] §LIS, [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3|analysis-2026-05-14-risposte-mf-srs-v3]] §Tema A |
| INT-04 | Accesso repo **QUASAR CSI** (componenti UI)                                               | 🟠   | Sprint 1 | Checklist §B8                                                                                                     |
| INT-05 | Distinzione formalizzata in SRS: **Notificatore di Deleghe ≠ Notificatore UNP** (MF33R31) | 🟡   | Sprint 2 | [[wiki/concepts/sistemi-esterni-integrati|Sistemi Esterni Integrati]] §Notificatore                                            |
|        |                                                                                           |      |          |                                                                                                                   |

---

## 7. Infrastruttura & Provisioning

| #     | Domanda                                                                                                    | Prio | Sprint   | Fonte         |
|-------|------------------------------------------------------------------------------------------------------------|------|----------|---------------|
| INF-01 | **Provisioning DBaaS Nivola DEV** — scheda provisioning standard                                          | 🔴   | Giorno 1 | Checklist §B2 |
| INF-02 | **Provisioning DBaaS Nivola PROD**                                                                       | 🔴   | Sprint 0 | Checklist §B3 |
| INF-03 | **Accesso automation CSI** per generazione skeleton progetto (struttura + pipeline + Helm)               | 🔴   | Giorno 1 | Checklist §B4 |
| INF-04 | **Diagramma architetturale** (`Mermaid.txt`) — versione concordata con CSI o proposta Exprivia? Risolvere conflitto nodo "API Gateway" (CSI ha confermato no-API-GW) | 🟠 | Sprint 0 | [[wiki/sources/2026-05-05-mermaid-architettura|Diagramma Architettura Sistema — Mermaid]] §Conflict, Checklist §B14 |

---

## 8. Governance & Documenti

| #      | Domanda                                                                                                                   | Prio | Sprint         | Fonte                                                              |                                                                                    |                                               |
| ------ | ------------------------------------------------------------------------------------------------------------------------- | ---- | -------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | --------------------------------------------- |
| GOV-01 | **Approvazione formale SRS V1.0 bozza v2** da CSI (post-recepimento risposte MF v3_lavorazione)                           | 🟠   | Prima Sprint 1 | Checklist §B12, [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3|analysis-2026-05-14-risposte-mf-srs-v3]]         |                                                                                    |                                               |
| GOV-02 | **Validazione [PROPOSTA] nell'SRS** — ALG02 BATCH-01 (gestione tentativi), CDU-06 PDF (MF49R48 MF51R50), 10 proposte §8.4 | 🟠   | Prima Sprint 2 | Checklist §B13, [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3|analysis-2026-05-14-risposte-mf-srs-v3]] §Tema D |                                                                                    |                                               |
| GOV-03 | **CONSPREF-DMP** — Piano migrazione PG9→PG17 non ancora formalizzato: chi è responsabile lato CSI?                        | 🔴   | Sprint 0       | [[2026-03-02-domande-srs-csi-v02                                   | Domande SRS Consensi — Revisione CSI V02]] Q11, [[valutazione-qualita-srs-consensi | Valutazione Qualità SRS — Gestione Consensi]] |
| GOV-04 | **SLA e NFR performance** — tempo risposta max CDU-02, throughput BATCH-01, disponibilità (99.x%)                         | 🟡   | Prima UAT      | Checklist §B15                                                     |                                                                                    |                                               |
| GOV-05 | **Lista ASR coinvolte** + referenti tecnici (confluisce con API-05)                                                       | 🟠   | Sprint 2       | Checklist §B11                                                     |                                                                                    |                                               |

---

## Riepilogo per Sprint

| Sprint        | Numero punti aperti                                                                                                                          |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| Giorno 1 / Sprint 0 critico | ID-01, INF-01, INF-02, INF-03, GOV-03, SEC-01, SEC-02, PULL-01, PULL-02, API-01 → **10 punti** |
| Sprint 0 alto             | INT-01, INT-02, INF-04 → **3 punti**                                                                                                            |
| Sprint 1                  | ID-03, SEC-03÷05, PULL-03, PULL-06, API-02, BAT-03, INT-03, INT-04, GOV-01 → **11 punti**                                                       |
| Sprint 2+                 | ID-02, SEC-06, PULL-04, PULL-05, PULL-07, API-03, API-05, BAT-01, BAT-02, INT-05, GOV-02, GOV-05 → **12 punti**                                |
| Prima UAT                 | API-04, GOV-04 → **2 punti**                                                                                                                  |
| **Totale**                | **38 punti aperti** (dedupli: PULL-03↔SEC-05, API-01↔SEC-01, API-02↔SEC-05, API-05↔GOV-05 → ~34 distinti)                                       |

---

## Note di gestione

1. **Ownership tracker:** Marco Forneris (Exprivia) propone questo file come agenda per la prossima riunione CSI/Exprivia.
2. **Workflow proposto:** ogni voce avrà un campo `risposta_csi` da popolare in revisione successiva del SRS; alla chiusura del punto, la voce si trasforma in entry permanente in [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3|analysis-2026-05-14-risposte-mf-srs-v3]] o nella relativa concept page.
3. **Dipendenze incrociate evidenti:**
   - SEC-01/API-01 (URL AS) → bloccante per qualsiasi test integrazione SIA
   - SEC-05/PULL-03/API-02 (scope) → da chiarire in singolo round
   - INT-01/INT-02 (WSDL AURA/Deleghe) → bloccano CDU-07/08
   - INF-01/INF-03 (DBaaS + automation) → bloccano partenza Sprint 1 tout court
1. **Riferimenti operativi:** [[wiki/analyses/analysis-2026-05-06-checklist-avvio-progetto|Checklist Avvio Progetto — Gestione Consensi]] resta lo strumento day-1 operativo; questo tracker è la versione consolidata e tematicamente raggruppata.

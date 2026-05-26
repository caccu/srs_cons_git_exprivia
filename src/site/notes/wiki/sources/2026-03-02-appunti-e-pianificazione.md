---
{"dg-publish":true,"permalink":"/wiki/sources/2026-03-02-appunti-e-pianificazione/","title":"Appunti Sistema + Pianificazione Progetto Consensi","tags":["pianificazione","sprint","architettura","migrazione","gestione-consensi"],"dg-note-properties":{"title":"Appunti Sistema + Pianificazione Progetto Consensi","aliases":["Appunti Sistema + Pianificazione Progetto Consensi"],"type":"source","tags":["pianificazione","sprint","architettura","migrazione","gestione-consensi"],"created":"2026-05-05","updated":"2026-05-05","sources":[],"related":["[[2026-03-02-conspref-srs-v1-revised|CONSPREF-SRS-V1.0 revised bozza v2]]","[[Architettura ECaaS]]","[[ciclo-vita-consenso|Ciclo di Vita del Consenso]]","[[2026-03-12-pile-tecnologiche-csi|Pile Tecnologiche CSI Piemonte]]"]}}
---


# Appunti Sistema + Pianificazione Progetto Consensi

**File originali:** `appunti.md`, `pianificazione.md`
**Contesto:** Documenti di sintesi e pianificazione operativa redatti da Exprivia

---

## Sintesi Architetturale (da file appunti)

Documento di sintesi rapida dell'intero sistema. Conferma e integra l'SRS:

### Stack tecnologico confermato
- Frontend: Angular 19, QUASAR CSI
- Backend: Spring Boot 3 / Java 17
- DB: PostgreSQL 17 via DBaaS Nivola
- CI/CD: GitLab + Jenkins + SonarQube + Helm GitOps

### 6 sistemi esterni
| Sistema | Protocollo | Auth |
|---|---|---|
| GASP Salute | OAuth2/OIDC o SAML2 | SPID/CIE |
| AURA | SOAP | WS-Security UsernameToken (IRIS) |
| Gestione Deleghe | SOAP | OAuth2 CC |
| Notificatore UNP | REST | Token UNP |
| SIA ASR | REST (CDU-15/16) | Bearer JWT |
| PUA/Config. Regionale | Web | RUPAR/IRIDE |

### Ciclo vita consenso
`NON ESPRESSO → ATTIVO/NEGATO → SCADUTO/ANNULLATO`
— no sovrascrittura, storia completa garantita

### 16 CDU, 3 Batch, 25 tabelle, 9 proposte evolutive

---

## Pianificazione (da file pianificazione)

### Timeline 8 fasi — 120gg lavorativi / 17 settimane

| Fase | Settimane | Durata | Dipendenze critiche |
|---|---|---|---|
| FASE 0 – Setup & Prerequisiti | 1–2 | 10gg | DBaaS Nivola, AURA WSDL, GASP doc (latenze esterne) |
| FASE 1 – Design Tecnico | 2–3 | 10gg | Può partire in parallelo a Fase 0 |
| FASE 2 – Data Layer TO-BE | 3–5 | 14gg | DBaaS provisioned |
| FASE 3 – Backend Spring Boot | 4–11 | 49gg | Dipende da Fase 1+2 |
| FASE 4 – Frontend Angular 19 | 5–12 | 49gg | **Parallelo** a Fase 3 |
| FASE 5 – Testing & QA | 11–15 | 28gg | |
| FASE 6 – Migrazione PG9→PG17 | 13–16 | 21gg | Strategia dump/restore |
| FASE 7 – Go-Live | 15–17 | 14gg | |

### Piano Sprint Agile — 10 sprint × 2 settimane

| Sprint | Focus | SP |
|---|---|---|
| Sprint 0 | Setup infra, provisioning, DMP bozza | 13 |
| Sprint 1 | Skeleton Angular+Spring, DDL base, GASP backend | 19 |
| Sprint 2 | CDU-01 FE+BE, client SOAP AURA+Deleghe, DDL esteso | 23 |
| Sprint 3 | CDU-03/04/05 macchina a stati consenso | 27 |
| Sprint 4 | CDU-06/07/08 PDF+ricerca assistito | 24 |
| Sprint 5 | CDU-09/10/11/12 operatore+backoffice | 26 |
| Sprint 6 | CDU-13/14/15/16 informativa+enti+API SIA | 27 |
| Sprint 7 | BATCH-01/02/03 + audit completo | 15 |
| Sprint 8 | Testing, security, stati consenso | 24 |
| Sprint 9 | UAT, migrazione PG9→PG17, deploy PROD | 19 |

**Scala:** 1 SP = 4 ore/sviluppatore

---

## Piano Migrazione PG9→PG17

**Strategia:** dump & restore logico (pg_dump/pg_restore) — **no pg_upgrade diretto** (salto 8 major release)

### Rischi principali identificati

| Categoria | Rischio | Azione |
|---|---|---|
| Autenticazione | md5 → scram-sha-256 in PG17 | Aggiornare JDBC + datasource |
| Tipi | SERIAL/BIGSERIAL deprecati | GENERATED ALWAYS AS IDENTITY nel TO-BE |
| default_with_oids | Rimosso in PG12 | Verificare tabelle AS-IS |
| JSON/JSONB | Operatori cambiati | Rivalutare query con ->, ->> |
| Sequenze orfane | Rimangono dopo drop oggetti | SELECT * FROM pg_sequences + cleanup |
| timestamp | AT TIME ZONE cambiato in PG15 | Test su data_acquisizione, data_fine |

### Procedura cutover PROD
1. Stop app (kubectl scale --replicas=0)
2. Dump finale PG9 PROD
3. Restore incrementale su PG17 PROD
4. Aggiornamento K8s Secret con nuova stringa JDBC
5. Restart (--replicas=2), verifica readinessProbe
6. Smoke test (login, rilascio consenso, verifica cons_t_notifica)
7. Monitoraggio ELK 30 min
8. **Rollback:** K8s Secret → stringa JDBC PG9, istanza PG9 standby 48h

---

## Note critiche

- DBaaS Nivola e credenziali IRIS/AURA: **latenze esterne imprevedibili** → avviare giorno 1
- CONSPREF-DMP: bozza v1 da produrre in Sprint 0
- Sprint 3 identificato come più complesso (macchina a stati CDU-03/04)

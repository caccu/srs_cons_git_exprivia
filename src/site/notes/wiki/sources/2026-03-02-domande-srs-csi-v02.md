---
{"dg-publish":true,"permalink":"/wiki/sources/2026-03-02-domande-srs-csi-v02/","title":"Domande SRS Consensi — Revisione CSI V02","tags":["q-and-a","csi-piemonte","exprivia","chiarimenti-tecnici","gestione-consensi"],"dg-note-properties":{"title":"Domande SRS Consensi — Revisione CSI V02","aliases":["Domande SRS Consensi — Revisione CSI V02"],"type":"source","tags":["q-and-a","csi-piemonte","exprivia","chiarimenti-tecnici","gestione-consensi"],"created":"2026-05-05","updated":"2026-05-05","sources":[],"related":["[[2026-03-02-conspref-srs-v1-revised|CONSPREF-SRS-V1.0 revised bozza v2]]","[[CSI Piemonte]]","[[Architettura ECaaS]]"]}}
---


# Domande SRS Consensi — Revisione CSI V02

**Tipo:** Q&A tra Exprivia (domande) e CSI Piemonte (risposte)
**Rilevanza:** Le risposte hanno determinato scelte architetturali definitive nell'SRS

---

## Chiarimenti tecnici rilevanti (estratto)

| # | Domanda | Risposta CSI | Impatto SRS |
|---|---|---|---|
| 1 | Skeleton di progetto fornito o ex-novo? | CSI fornisce automation per generare struttura + pipeline + Helm | SRS § 3.5: no skeleton ex-novo necessario |
| 2 | Versione Angular validata? | Angular v19.x CURRENT — stack SPA Angular2/springboot/Resteasy v2.1.0 | SRS § 3.4: Angular 19+ confermato |
| 3 | UI Kit ufficiale CSI? | Nessun UI Kit, ma componenti **QUASAR** disponibili | SRS § 3.3: usare QUASAR CSI |
| 4 | IdP per SPID/CIE? | **GASP Salute** — Identity Provider federato CSI Piemonte | SRS § 3.3.1: integrazione via GASP Salute |
| 5 | Versione minima Spring Boot? | Almeno v3.4.10 (protezione vulnerabilità note) | SRS § 3.4: Spring Boot 3.4.10 minimo |
| 6 | API Gateway CSI? | **Non utilizzato** — integrazione diretta. Serve Swagger file | SRS § 3.2: no API Gateway, Spring Security diretto |
| 7 | Auth inter-servizio AURA/Deleghe? | AURA: SOAP + WS-Security UsernameToken (IRIS). Deleghe: SOAP + OAuth2 | SRS § 4.2 |
| 8 | Notificatore: REST o SOAP? | REST. Canali: email, push, IO, mex Salute Piemonte | SRS § 4.2 |
| 9 | SIA ASR: SOAP o REST nel TO-BE? | **I servizi delle ASR non devono cambiare** — SOAP AS-IS invariato | SRS § 7.1 BATCH-01 |
| 10 | PostgreSQL in K8s o DBaaS? | **DBaaS Nivola** — scheda provisioning standard | SRS § 3.5.6 |
| 11 | Piano migrazione PG9→PG17 formalizzato? | **Non ancora formalizzato** | Rischio aperto: CONSPREF-DMP da redigere |
| 12 | Audit DDL PG9 per incompatibilità? | Sì — attività da prevedere | SRS § 9.4, pianificazione Sprint 0 |
| 13 | Firma digitale eIDAS per PDF? | L'applicativo AS-IS non genera PDF — è una proposta TO-BE del team | CDU-06: NUOVA funzionalità, firma eIDAS **non richiesta** |

---

## Implicazioni strategiche

- **No API Gateway** → sicurezza interamente gestita lato applicativo (Spring Security)
- **GASP Salute** → protocollo (OIDC vs SAML2) ancora da definire con referente CSI
- **SOAP invariato per ASR** → Apache CXF necessario nel backend
- **DMP non formalizzato** → rischio di blocco nella Fase 6 migrazione
- **CDU-06 PDF** → funzionalità nova non presente nell'AS-IS, nessun precedente da cui partire

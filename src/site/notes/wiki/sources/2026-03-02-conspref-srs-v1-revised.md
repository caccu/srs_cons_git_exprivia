---
{"dg-publish":true,"permalink":"/wiki/sources/2026-03-02-conspref-srs-v1-revised/","title":"CONSPREF-SRS-V1.0 revised bozza v2","tags":["srs","requisiti","gestione-consensi","exprivia","csi-piemonte"],"dg-note-properties":{"title":"CONSPREF-SRS-V1.0 revised bozza v2","aliases":["CONSPREF-SRS-V1.0 revised bozza v2"],"type":"source","tags":["srs","requisiti","gestione-consensi","exprivia","csi-piemonte"],"created":"2026-05-05","updated":"2026-05-14","sources":[],"related":["[[2023-09-01-conspref-srs-01-v03|CONSPREF-SRS-01-V03 Requisiti Gestione Consensi]]","[[2026-03-02-appunti-e-pianificazione|Appunti Sistema + Pianificazione Progetto Consensi]]","[[Gestione Consensi - Applicativo]]","[[ciclo-vita-consenso|Ciclo di Vita del Consenso]]","[[Architettura ECaaS]]","[[valutazione-qualita-srs-consensi|Valutazione Qualità SRS — Gestione Consensi]]","[[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|analysis-2026-05-14-risposte-mf-srs-v3]]"]}}
---


# CONSPREF-SRS-V1.0 — Specifica Requisiti Sistema Gestione Consensi

**Documento:** CONSPREF-SRS-V1.0 (bozza v2, revised)
**Autore:** Marco Forneris / Exprivia S.p.A.
**Data:** 02/03/2026
**Stato:** Bozza — in attesa di controllo/approvazione CSI

> 📝 **Revisione cliente v3_lavorazione (2026-05-14):** disponibile in raw/ il file `CONSPREF-SRS-V1.0-revised_bozza_v3_CSI_lavorazione.pdf` contenente **69 commenti** dei revisori (SC/MB/TR) con **~30 risposte autoritative MF** (Marco Forneris). Sintesi e propagazione wiki: [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|analysis-2026-05-14-risposte-mf-srs-v3]]. Decisioni chiave già propagate: terminologia UI acconsento/nego, transizioni stati ATTIVO↔NEGATO dirette, CDU-01 split a+b, CDU-04/05 merge cittadino, CDU-06 scope ridotto, eliminazione SistemaTS, Form Renderer SSoT, BATCH-01 5min+SKIP LOCKED, Notificatore di Deleghe distinto da UNP, BATCH-03 sostituito da PULL CDU-17, LIS come 3° canale acquisizione.

---

## Scopo

Definisce i requisiti funzionali e non funzionali per il **rifacimento** dell'applicativo Gestione Consensi della Regione Piemonte. Documento di riferimento per progettazione, sviluppo e collaudo.

---

## Contesto

Sistema parte dell'ecosistema **Sanità Elettronica Regione Piemonte**. Gestisce tre livelli di consenso:
- **Nazionale** — FSE/INI (es. apertura Fascicolo Sanitario Elettronico)
- **Regionale** — stratificazione, cronicità, telemedicina, reti di patologia
- **Aziendale ASR** — Dossier Clinico, ROL referti, prestazioni specifiche

Tre profili utente:
| Profilo | Accesso |
|---|---|
| Cittadino | SPID/CIE via GASP Salute |
| Operatore Sanitario/Amministrativo | PUA con RUPAR/IRIDE |
| Operatore di Back Office | PUA con RUPAR/IRIDE |

---

## Architettura (cap. 3)

**Paradigma:** microservizi su [[wiki/concepts/architettura-ecaas\|Architettura ECaaS]] (Kubernetes/Nivola CSI Piemonte)

| Layer | Tecnologia |
|---|---|
| Frontend | SPA Angular 19, componenti QUASAR CSI, Apache WS k8s |
| Backend | Spring Boot 3.4.10+, Java 17, Spring Security (no API Gateway) |
| Database | PostgreSQL 17 via DBaaS Nivola (esterno al namespace ECaaS) |
| CI/CD | GitLab + Jenkins + SonarQube, deploy GitOps Helm |

**Vincoli infrastrutturali rilevanti:**
- IngressController: solo TRAEFIK
- Registry immagini: solo Artifactory CSI (docker-trusted, docker-base, docker-projects)
- No KNative, Istio, network mesh
- Ogni Deployment: resources requests/limits + livenessProbe + readinessProbe obbligatori

**No API Gateway CSI** — confermato. Integrazione diretta frontend→backend via Spring Security.

---

## Integrazioni Esterne (cap. 4.2)

| Sistema | Protocollo | Autenticazione |
|---|---|---|
| GASP Salute (IdP) | OAuth2/OIDC o SAML2 | Federazione SPID/CIE |
| AURA (anagrafica) | SOAP | WS-Security UsernameToken (IRIS) |
| Gestione Deleghe | SOAP | OAuth2 Client Credentials |
| Notificatore UNP | REST | Token applicativo UNP |
| SIA ASR (BATCH-01 uscente) | SOAP | Contratto AS-IS invariato |

---

## Requisiti di Business (cap. 5)

### Stati del Consenso
```
NON_ESPRESSO → ATTIVO | NEGATO → SCADUTO | ANNULLATO
```
- Ogni variazione **non sovrascrive**: chiude record precedente (data_fine=NOW()) e crea nuovo
- SCADUTO: valore valido, informativa cambiata, annulla_consensi=NO → **non notificato** alle ASR
- ANNULLATO: informativa cambiata, annulla_consensi=SI → **notificato** alle ASR

---

## Casi d'Uso — 16 CDU (cap. 6)

**Area Cittadino (CDU-01÷CDU-06):**
- CDU-01: Accesso/selezione profilo (GASP Salute, deleghe)
- CDU-02: Consultazione consensi (cruscotto con card per stato)
- CDU-03: Rilascio nuovo consenso (ALG01 caricamento, ALG02 salvataggio+notifica)
- CDU-04: Modifica consenso (logica differenziata per stato ATTIVO/NEGATO/SCADUTO/ANNULLATO)
- CDU-05: Modifica valore consenso (solo ATTIVO/NEGATO, senza riaccettazione informativa)
- CDU-06: Download/stampa PDF (**NUOVA funzionalità TO-BE**, iText7 o PDFBox lato backend)

**Area Operatore Sanitario/Amministrativo (CDU-07÷CDU-11):**
- CDU-07: Ricerca assistito (AURA → fallback SistemaTS, tracciatura cons_t_traccia_serv_est)
- CDU-08: Consultazione consensi assistito
- CDU-09: Rilascio consenso per conto (fonte_id='PASS')
- CDU-10: Modifica consenso per conto
- CDU-11: Modifica valore per conto

**Area Back Office (CDU-12÷CDU-14):**
- CDU-12: Gestione tipo consenso (parametri dinamici da cons_d_parametro, ALG01 popolamento enti, ALG02 salvataggio multi-tabella)
- CDU-13: Gestione informativa (upload PDF, trigger asincrono BATCH-02)
- CDU-14: Gestione ente ed endpoint (stato_allineamento, trigger BATCH-03)

**Servizi per SIA (CDU-15÷CDU-16):**
- CDU-15: GET /api/v1/consensi/stato — Bearer JWT OAuth2 CC, RFC 7807 errori
- CDU-16: GET /api/v1/configurazione/{codiceEnte} — configurazioni attive per ente

---

## Processi Batch (cap. 7)

| Batch | Nome | Periodicità | Funzione |
|---|---|---|---|
| BATCH-01 | NotificaConsensi | Ogni 5 min | Notifica variazioni consensi alle ASR via SOAP |
| BATCH-02 | NotificaScadenzaInformative | 1x/giorno (notturno) | Scadenza informative → aggiorna stati consenso |
| BATCH-03 | AllineamentoConsensi | On-demand (trigger CDU-14) | Allinea consensi verso nuovi endpoint |

---

## Modello Dati (cap. 8)

**25 tabelle principali**, schema `gestioneconsensi`:
- `cons_t_consenso` — record storico consensi (no sovrascrittura)
- `cons_s_consenso` — copia storica pre-modifica
- `cons_d_informativa` — informative con versioning
- `cons_d_asr` — enti/aziende sanitarie
- `cons_r_asr_endpoint` / `cons_t_endpoint` — endpoint notifica
- `cons_r_sotto_tipo_cons_asr_endpoint` — associazione tipo-ente-endpoint
- `cons_t_notifica` — coda notifiche BATCH-01
- `csi_log_audit` — audit DB
- `cons_t_traccia_serv_est` — tracciatura chiamate esterne

**9 proposte evolutive** incluse nel documento (nuove tabelle e estensioni).

---

## Requisiti Non Funzionali (cap. 9)

- **Sicurezza:** Spring Security, JWT Bearer, CSRF su POST/PUT, OWASP Top 10, CF mascherato nei log, secrets via K8s Secret
- **Scalabilità:** stateless, ≥2 repliche in PROD, HikariCP max 40 conn/replica
- **Migrazione:** PG9→PG17 (8 major release, dump/restore), piano CONSPREF-DMP da redigere
- **Logging:** audit DB (csi_log_audit) + SLF4j/Logback su ELK + log accesso HTTP Apache
- **Accessibilità:** AgID WCAG 2.1 livello AA (obbligatorio per go-live)

---

## Tag documento

I requisiti sono etichettati con:
- `[DOC]` — derivato direttamente da CONSPREF-SRS-01-V03
- `[DEDOTTO]` — derivato logicamente dal contesto
- `[PROPOSTA]` — proposta del team Exprivia non ancora concordata

---

## Note critiche

- Specifica OpenAPI 3.x CDU-15/16: da produrre a cura Exprivia **prima** dello sprint di sviluppo
- CONSPREF-DMP (migration plan): **non ancora formalizzato** al momento della stesura
- GASP Salute: protocollo OIDC vs SAML2 ancora da definire con referente CSI
- WSDL AURA e Deleghe: disponibili su richiesta, lista servizi da specificare
- CDU-06 (PDF): funzionalità nuova — firma digitale eIDAS **non richiesta**

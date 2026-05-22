---
{"dg-publish":true,"permalink":"/raw/appunti/","dg-note-properties":{}}
---

**1. Contesto**
Il sistema si inserisce nell'ecosistema della **Sanità Elettronica della Regione Piemonte** e gestisce tre livelli di consenso: **Nazionale** (FSE/INI), **Regionale** (stratificazione/cronicità) e **Aziendale ASR** (Dossier Clinico, ROL referti). I tre profili utente sono il **Cittadino** (accesso via SPID/CIE), l'**Operatore Sanitario/Amministrativo** e l'**Operatore di Back Office** (entrambi via PUA con credenziali RUPAR/IRIDE).
**2. Architettura**
L'applicativo segue un paradigma a **microservizi** ospitato sull'infrastruttura cloud **ECaaS**** ****Kubernetes**** / Nivola CSI Piemonte**:
**Frontend**: SPA Angular 19 con componenti QUASAR
**Backend**: Servizi REST Spring Boot 3 / Java 17
**Database**: PostgreSQL 17 tramite DBaaS Nivola (no container nel namespace)
**CI/CD**: Pipeline GitLab + Jenkins + SonarQube con deploy GitOps tramite Helm Chart
**3. Integrazioni Esterne**
Sei sistemi esterni si interfacciano con la piattaforma:

| **Sistema** | **Protocollo** | **Autenticazione** |
| --- | --- | --- |
| GASP Salute (IdP) | OAuth2/OIDC o SAML2 | Federazione SPID/CIE |
| AURA (anagrafica) | SOAP | WS-Security UsernameToken (IRIS) |
| Gestione Deleghe | SOAP | OAuth2 Client Credentials |
| Notificatore UNP | REST | Token applicativo UNP |
| SIA ASR (CDU-15/16) | REST | Bearer Token JWT |
| PUA / Config. Regionale | Web | RUPAR/IRIDE |

**4. Requisiti Business e Stati Consenso**
Un consenso attraversa cinque stati nel suo ciclo di vita: **NON ESPRESSO → ATTIVO / NEGATO → SCADUTO / ANNULLATO**. Ogni variazione **non sovrascrive** il record precedente: viene chiuso con datafine e creato un nuovo record, garantendo la storia completa degli atti di consenso.
**5. Casi d'Uso (16 CDU)**
**Area Cittadino (CDU-01 ÷ CDU-06)**: accesso con selezione profilo/delegato, consultazione, rilascio, modifica e download PDF del consenso.
**Area Operatore Sanitario/****Amm****. (CDU-07 ÷ CDU-11)**: ricerca assistito su AURA/SistemaTS, consultazione e gestione consensi per conto dell'assistito.
**Area Back Office (CDU-12 ÷ CDU-16)**: configurazione anagrafiche (tipi consenso, informative PDF, enti/endpoint) e due API REST per i SIA delle ASR (recupero stato e configurazione).
**6. Processi Batch**
Tre job asincroni garantiscono la coerenza del sistema:
**BATCH-01**: notifica le variazioni dei consensi alle ASR ogni **5 minuti** via SOAP
**BATCH-02**: gestisce la scadenza/annullamento delle informative e aggiorna lo stato dei consensi
**BATCH-03**: allineamento massivo dei consensi verso i nuovi endpoint configurati
**7. Modello Dati**
Il database comprende **25 tabelle** principali, tra cui cons_t_consenso (record storico), cons_d_informativa, cons_d_asr, cons_t_notifica per i batch, csi_log_audit per l'audit e cons_t_traccia_servest per la tracciatura delle chiamate esterne. Il documento include anche **9 proposte evolutive** (nuove tabelle e estensioni).
**8. Requisiti Non Funzionali**
**Sicurezza**: Spring Security senza API Gateway, JWT Bearer Token, protezione CSRF, conformità OWASP Top 10, dati personali mascherati nei log, secrets via Kubernetes Secret
**Scalabilità**: architettura stateless con almeno 2 repliche attive in produzione su Kubernetes
**Migrazione**: passaggio da PostgreSQL 9 a PostgreSQL 17 (da formalizzare nel documento CONSPREF-DMP)
**Logging**** multi-livello**: audit su DB (csi_log_audit), log applicativo SLF4j/Logback su stack ELK, log accesso HTTP
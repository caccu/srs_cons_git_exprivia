---
{"dg-publish":true,"permalink":"/raw/pianificazione/","dg-note-properties":{}}
---

**FASE 0 – Setup & Prerequisiti *****(Settimane 1–2 · 10gg)***
Questa fase è il **collo di bottiglia critico**: molte attività dipendono da risorse esterne CSI/Nivola con latenze imprevedibili

| **Attività** | **Responsabile** | **Note** |
| --- | --- | --- |
| Provisioning DBaaS Nivola (DEV + PROD) | Exprivia → CSI/Nivola | Richiedere scheda formale; almeno 2 istanze PG17 |
| Richiesta credenziali AURA (IRIS) + WSDL | Exprivia → CSI | Specificare lista servizi (ricerca per CF, dati anagrafici) |
| Documentazione tecnica GASP Salute | Exprivia → CSI | Protocollo OIDC/SAML2 da definire con referente CSI |
| Accesso repository componenti QUASAR CSI | Exprivia → CSI | Prerequisito per avvio sviluppo UI |
| Registrazione app su Configuratore Regionale (PUA) | Exprivia → CSI | 2 profili: Operatore Sanitario-Amm. e Back Office |

**FASE 1 – Design Tecnico *****(Settimane 2–3 · 10gg)***
Le attività di design possono partire in parallelo alle richieste della Fase 0.
**Audit compatibilità PG9→PG17** (obbligatorio per sez. 9.4): analisi sequence/SERIAL, funzioni deprecate (to_timestamp, date_part), comportamento NULLS FIRST/LAST in PG15, sintassi SQL ritirata
**Design DDL Schema TO-BE**: 25+ tabelle documentate nel cap. 8, incluse le proposte evolutive obbligatorie (8.4.1–8.4.10) — es. consttracciaservest, constbatcherrori, estensioni constnotifica e consrasrendpoint
**Specifica ****OpenAPI**** 3.x (CDU-15 & CDU-16)**: da produrre a cura di Exprivia, con endpoint, schemi dati, Bearer Token JWT OAuth2 CC, gestione errori RFC 7807
**Setup scheletro progetti** Angular 19 + Spring Boot 3.4.10 (minimo) con pipeline CI/CD GitLab → Jenkins → SonarQube
**Redazione CONSPREF-DMP** (Data Migration Plan): documento separato, da assegnare formalmente al team
**FASE 2 – Data Layer TO-BE *****(Settimane 3–5 · 14gg)***
Implementazione completa del modello dati PostgreSQL 17 su istanza DBaaS Nivola.
Esecuzione DDL TO-BE (schema gestioneconsensi, utenza applicativa separata da DBA)
Applicazione di tutte le proposte evolutive obbligatorie: consttracciaservest (req. CDU-09/10/11), estensione constnotifica (BATCH-01/02/03), statoallineamento su consrasrendpoint (CDU-03, BATCH-03)
Configurazione connessione sicura: credenziali **mai** nel codice sorgente, iniettate via **Kubernetes**** Secret** come variabili d'ambiente SPRING_DATASOURCE_*
Configurazione pool HikariCP: maximum-pool-size ≤ 40 per replica (su istanza da 100 connessioni max, 2 repliche)
**FASE 3 – Backend Spring Boot 3 *****(******Settimane****** 4–11 · 49gg)***
Il backend è il componente più articolato, con 16 CDU, 3 batch e 4 integrazioni esterne.
**Integrazioni esterne (parallele, sett. 4–7):**

| **Servizio** | **Protocollo** | **Autenticazione** | **Stima** |
| --- | --- | --- | --- |
| AURA | SOAP | WS-Security UsernameToken (IRIS) | 5gg |
| Gestione Deleghe | SOAP | OAuth2 Client Credentials | 4gg |
| Notificatore UNP | REST | Token applicativo UNP | 3gg |
| SIA ASR (BATCH-01 uscente) | SOAP | Contratto AS-IS invariato | 2gg |

**CDU per area:**
**Cittadino** (CDU-01..06, sett. 5–8): accesso GASP Salute, consultazione, rilascio, modifica e PDF consenso · 20gg
**Operatore Sanitario** (CDU-07..11, sett. 7–9): ricerca assistito su AURA/SistemaTS, gestione consenso per conto · 14gg
**Back Office** (CDU-12..14, sett. 8–10): gestione tipi consenso, informative, enti/endpoint · 14gg
**Servizi esposti SIA** (CDU-15..16, sett. 9–11): REST con OpenAPI 3.x + SpringDoc UI · 10gg
**BATCH-01/02/03** + csilogaudit (sett. 8–11): notifiche SOAP, scadenza informative, allineamento nuovi endpoint · 21gg
**FASE 4 – ****Frontend**** ****Angular**** 19 *****(Settimane 5–12 · 49gg, parallelo al Backend)***
SPA Angular sviluppata con i componenti **QUASAR CSI** come riferimento UI.
Web App **Cittadino**: autenticazione via redirect GASP Salute (SPID/CIE), cruscotto consensi, flusso rilascio/modifica/PDF
Web App **Operatore**: ricerca assistito, gestione consensi per conto
Web App **Back Office**: maschere configurazione tipi consenso, informative (upload PDF), enti/endpoint
Collaudo accessibilità **AgID WCAG 2.1 livello AA** (obbligatorio per go-live)
**FASE 5 – Testing & QA *****(Settimane 11–15 · 28gg)***
**Unit + Integration Test** (Spring Boot + Angular): copertura dei casi d'uso e degli algoritmi ALG01/ALG02 dei CDU
**Security Test**: OWASP Top 10, protezione CSRF su tutti i POST/PUT, TLS 1.2+, mascheramento CF nei log
**UAT** con referenti CSI/Regione Piemonte: validazione funzionale, test stati consenso (ATTIVO, NEGATO, SCADUTO, ANNULLATO) e cicli batch
**FASE 6 – Migrazione Dati PG9→PG17 *****(Settimane 13–16 · 21gg)***
Il salto è di **8 major release**: non è possibile un upgrade in-place diretto.
**Strategia**: da scegliere nel CONSPREF-DMP tra pg_dump/restore (finestra manutenzione) o upgrade a step intermedi PG9→PG12→PG14→PG17 via pg_upgrade
Esecuzione della migrazione dati: DDL/DML, verifica integrità referenziale, conteggio record, test funzionali
Piano di **rollback** documentato e validato prima del go-live
**FASE 7 – Go-Live *****(Settimane 15–17 · 14gg)***
Deploy PROD tramite **GitOps**** ECaaS** (tag GitLab → immagini Artifactory docker-projects → rollout Kubernetes)
Verifica livenessProbe / readinessProbe su tutti i Deployment, con requests/limits specificati
Consegna formale **specifica ****OpenAPI**** Swagger** per i sistemi SIA/ASR (CDU-15/16)
Attivazione monitoraggio: **Prometheus** per metriche, stack **ELK** per log centralizzati
**Riepilogo Timeline**

| **Fase** | **Settimane** | **Durata stimata** |
| --- | --- | --- |
| FASE 0 – Setup & Prerequisiti | 1–2 | 10gg |
| FASE 1 – Design Tecnico | 2–3 | 10gg |
| FASE 2 – Data Layer TO-BE | 3–5 | 14gg |
| FASE 3 – Backend API (Spring Boot) | 4–11 | 49gg |
| FASE 4 – Frontend (Angular 19) | 5–12 | 49gg (parallelo) |
| FASE 5 – Testing & QA | 11–15 | 28gg |
| FASE 6 – Migrazione PG9→PG17 | 13–16 | 21gg |
| FASE 7 – Go-Live | 15–17 | 14gg |
| **TOTALE (****elapsed****)** | **17 sett.** | **120gg lavorativi** |

**S****tima per i singoli sprint Agile**
**Note: **Piano Sprint Agile (10 sprint × 2 settimane)
Ogni sprint copre backend + frontend in parallelo. La stima in Story Points (SP) adotta una scala dove 1 SP = 4 ore di lavoro di un singolo sviluppatore.
**Sprint 0 – Setup & Prerequisiti *****(Sett. 1–2 | 13 SP)***

| **Attività** | **Area** | **SP** | **Output** |
| --- | --- | --- | --- |
| Richiesta scheda provisioning DBaaS Nivola DEV+PROD | Infra | 2 | Ticket formale Nivola |
| Richiesta credenziali AURA (IRIS) + lista servizi | Infra | 1 | Email formale CSI |
| Richiesta doc GASP Salute (protocollo OIDC/SAML2) | Infra | 1 | Documentazione tecnica |
| Accesso repo componenti QUASAR CSI | Infra | 1 | Accesso repository |
| Registrazione app PUA (2 profili Back Office) | Infra | 2 | Configuratore Regionale |
| Audit PG9→PG17 (sez. 9.4) – analisi DDL AS-IS | DB | 3 | Report compatibilità |
| Redazione CONSPREF-DMP (documento migrazione) | DB | 3 | DMP bozza v1 |

**Note: **DBaaS Nivola e credenziali IRIS/AURA hanno latenze esterne imprevedibili. Vanno avviate nel giorno 1.
**Sprint 1 – Foundation *****(Sett. 3–4 | 19 SP)***

| **Attività** | **Area** | **SP** |
| --- | --- | --- |
| Setup scheletro Angular 19 + QUASAR CSI + pipeline CI/CD | Infra/FE | 3 |
| Setup Spring Boot 3.4.10 + SpringDoc + Helm Chart | Infra/BE | 3 |
| DDL TO-BE base: 12 tabelle lookup (consd*, consdf*) | DB | 5 |
| Kubernetes Secret per credenziali DBaaS + HikariCP config | DB | 2 |
| Integrazione GASP Salute (backend: validazione token/asserzione) | BE | 4 |
| Setup SLF4j/Logback + struttura csilogaudit | BE | 2 |

**Sprint 2 – Autenticazione & Integrazioni *****(Sett. 5–6 | 23 SP)***

| **Attività** | **Area** | **SP** |
| --- | --- | --- |
| Frontend CDU-01: pagina login, redirect GASP Salute, selezione profilo | FE | 5 |
| Backend CDU-01: lettura deleghe, getTokenInformation2 PUA | BE | 4 |
| Client SOAP AURA (Apache CXF): WS-Security UsernameToken su IRIS | BE | 5 |
| Client SOAP Gestione Deleghe (OAuth2 Client Credentials) | BE | 4 |
| DDL TO-BE esteso: tabelle cons_t_consenso, cons_s_consenso, cons_r_asr_endpoint + proposte 8.4.x | DB | 5 |

**Sprint 3 – CDU-03/04/05 Cittadino *****(Sett. 7–8 | 27 SP)***
Questo è lo sprint più complesso per la macchina a stati del consenso (ATTIVO / NEGATO / SCADUTO / ANNULLATO).

| **Attività** | **Area** | **SP** |
| --- | --- | --- |
| BE CDU-03: ALG01 caricamento consensi esprimibili (flag online), ALG02 salvataggio constconsenso + constnotifica | BE | 6 |
| FE CDU-02: cruscotto consensi, card per stato, raggruppamento per tipo | FE | 4 |
| FE CDU-03: lista tipologie, viewer PDF informativa, checkbox presa visione, radio SI/NO | FE | 5 |
| BE CDU-04: macchina a stati (SCADUTO→riaccetta informativa, ANNULLATO→flusso ex-novo), storicizzazione constconsenso UPDATE+INSERT | BE | 6 |
| BE CDU-05: modifica valore consenso ATTIVO/NEGATO (senza riaccettazione informativa) | BE | 3 |
| FE CDU-04/05: due bottoni distinti *Modifica Consenso* / *Cambia Valore*, maschera adattiva per stato | FE | 3 |

**Sprint 4 – CDU-06/07/08 *****(Sett. 9–10 | 24 SP)***

| **Attività** | **Area** | **SP** |
| --- | --- | --- |
| BE CDU-06: generazione PDF (iText7 o PDFBox), streaming binario con Content-Disposition attachment | BE | 5 |
| FE CDU-06: pulsante download PDF, preview inline | FE | 3 |
| BE CDU-07: ALG01 ricerca assistito su AURA → fallback SistemaTS, tracciatura cons_t_traccia_servest | BE | 6 |
| FE CDU-07: maschera ricerca (CF oppure nome+cognome+data), tabella risultati con dati AURA | FE | 4 |
| BE CDU-08: caricamento lista consensi assistito (logica identica CDU-02, fonte diversa) | BE | 3 |
| FE CDU-08: visualizzazione consensi assistito da operatore | FE | 3 |

**Sprint 5 – CDU-09/10/11/12 *****(Sett. 11–12 | 26 SP)***

| **Attività** | **Area** | **SP** |
| --- | --- | --- |
| BE CDU-09/10/11: ALG02 – gestione consenso per conto, valorizzazione fonteid=PASS, loginoperazione, ruoloopid | BE | 6 |
| FE CDU-09/10/11: re-uso componenti CDU-03/04/05 con contesto operatore | FE | 4 |
| Integrazione Notificatore UNP (REST, token applicativo) | BE | 4 |
| BE CDU-12: ALG01 popolamento dinamico EntiAziende per tipo (Nazionale/Regionale/Aziendale), ALG02 salvataggio cons_d_sotto_tipo_cons + cons_r_consenso_parametro + cons_r_consenso_valore | BE | 6 |
| FE CDU-12: form multi-sezione (Dati Generali, Parametri, EntiAziende), logica Regionale → espansione su tutte le ASR | FE | 6 |

**Sprint 6 – CDU-13/14/15/16 *****(Sett. 13–14 | 27 SP)***

| **Attività** | **Area** | **SP** |
| --- | --- | --- |
| BE CDU-13: upload PDF informativa, gestione versioning, flag annullaconsensi, online, scadenza | BE | 5 |
| FE CDU-13: maschera upload PDF, date-picker validità, flag checkbox | FE | 4 |
| BE CDU-14: CRUD enti cons_d_asr + endpoint cons_t_endpoint + relazioni cons_r_sotto_tipo_cons_asr_endpoint | BE | 4 |
| FE CDU-14: gestione enti/endpoint con associazione tipologie consenso | FE | 3 |
| BE CDU-15: GET /api/v1/consensi/stato – Bearer JWT OAuth2 CC, response RFC 7807 | BE | 5 |
| BE CDU-16: GET /api/v1/configurazione/{codiceEnte} – risposta JSON configurazioni attive | BE | 4 |
| Specifica OpenAPI 3.x CDU-15/16 + validazione swagger-parser + stub openapi-generator-maven-plugin | BE | 2 |

**Sprint 7 – BATCH & Audit *****(Sett. 15–16 | 15 SP)***

| **Attività** | **Area** | **SP** |
| --- | --- | --- |
| BATCH-01: notifica consensi verso ASR (SOAP AS-IS), lettura cons_t_notifica, invio, aggiornamento stato | BE | 5 |
| BATCH-02: notifica scadenza/annullamento informativa → aggiornamento stati + inserimento cons_t_notifica + chiamata UNP | BE | 4 |
| BATCH-03: allineamento consensi per nuovi endpoint (statoallineamento=INCORSO → COMPLETATO), gestione cons_t_batch_errori | BE | 4 |
| Completamento audit log csilogaudit + cons_t_traccia_servest su tutti i CDU | BE | 2 |

**Sprint 8 – Testing & Security *****(Sett. 17–18 | 24 SP)***

| **Attività** | **SP** |
| --- | --- |
| Unit test Spring Boot (JUnit 5/Mockito): copertura CDU, algoritmi ALG01/ALG02 | 6 |
| Integration test con DB PG17 DEV (Testcontainers) | 4 |
| Test Angular (Jasmine/Karma): componenti UI, form validation | 5 |
| Security test OWASP Top 10, CSRF (POST/PUT), TLS 1.2+, mascheramento CF nei log | 5 |
| Test stati consenso: cicli completi macchina a stati su tutti i path | 4 |

**Sprint 9 – UAT, ****Migrazione****, Go-Live *****(Sett. 19–20 | 19 SP)***

| **Attività** | **SP** |
| --- | --- |
| UAT con CSI / Regione Piemonte: scenari funzionali su ambiente TEST | 5 |
| Esecuzione migrazione PG9→PG17 (dettaglio sotto) | 6 |
| Verifica post-migrazione + rollback check | 3 |
| Deploy PROD GitOps (tag GitLab → Artifactory → Kubernetes rollout) | 3 |
| Consegna Swagger SIA + monitoraggio ELK/Prometheus | 2 |

**Migrazione PG9 → PG17 (CONSPREF-DMP)**
Il salto copre 8 major release: pg_upgrade non supporta upgrade diretti su distanze così grandi, quindi la strategia raccomandata per il contesto DBaaS Nivola è il dump & restore logico.
**Punti critici da ispezionare sul DDL AS-IS di PG9:**

| **Categoria** | **Rischio PG9→PG17** | **Azione** |
| --- | --- | --- |
| Autenticazione | pg_hba.conf usa md5 → PG17 default è scram-sha-256 | Aggiornare connessioni JDBC + Spring datasource |
| Tipi deprecati | SERIAL/BIGSERIAL ancora supportati ma sconsigliati | Migrare a GENERATED ALWAYS AS IDENTITY nel TO-BE |
| recovery.conf | Rimosso in PG12, integrato in postgresql.conf | Non rilevante per DBaaS (gestito da Nivola) |
| default_with_oids | Rimosso in PG12 | Verificare tabelle AS-IS con WITH OIDS |
| JSON/JSONB | json_* in PG9 limitato → PG17 ricco di funzioni | Rivalutare query che usano operatori ->, ->> |
| Sequenze orfane | Sequenze associate a oggetti droppati rimangono | Eseguire SELECT * FROM pg_sequences e pulire |
| timestamp | Comportamento AT TIME ZONE cambiato in PG15 | Test espliciti su campi dataacquisizione, datafine |
| to_char con TZ | Comportamento lievemente diverso | Test su tutte le query con formattazione date |

**Step 2 – Dump ****dell'istanza**** AS-IS *****(Sprint 9)***
**# ****Dump**** schema + dati (formato custom, compresso)**
**pg_dump**** -Fc -v \**
**  -h <host-pg9> -p 5432 \**
**  ****-U ****consappuser**** \**
**  -d ****gestioneconsensi**** \**
**  --no-****owner**** --no-****acl**** \**
**  ****-f dump_conspref_pg9_$(date +%****Y%m%d****).dump**
Il dump non include owner/ACL per compatibilità con il nuovo schema DBaaS Nivola**.**
**Step 3 – ****Restore**** su PG17 DEV *****(Sprint 9)***
**# Crea schema vuoto sul ****DBaaS**** PG17**
**psql**** -h <host-pg17-dev> -U ****consappuser**** \**
**     ****-d ****gestioneconsensi**** \**
**     -c "CREATE SCHEMA IF NOT EXISTS ****conspref****;"**
**# ****Restore**
**pg_restore**** -****Fc**** -v \**
**  ****-h <host-pg17-dev> -p 5432 \**
**  ****-U ****consappuser**** \**
**  -d ****gestioneconsensi**** \**
**  --no-****owner**** --no-****acl**** \**
**  ****dump_conspref_pg9_$(date +%****Y%m%d****).dump**
**Step 4 – Validazione Post-****Restore**

| **Check** | **Query / Metodo** | **Atteso** |
| --- | --- | --- |
| Conteggio record per tabella | SELECT relname, n_live_tup FROM pg_stat_user_tables ORDER BY 1 | Uguale a AS-IS |
| Integrità FK | SELECT conname FROM pg_constraint WHERE contype='f' + test insert | Nessun errore |
| Sequenze correnti | SELECT * FROM pg_sequences | Valori > MAX(id) di ogni tabella |
| Funzioni custom | \df in psql | Tutte presenti |
| Test stati consenso | Script SQL che percorre la macchina a stati (ATTIVO→SCADUTO→ANNULLATO) | Transizioni corrette |
| Performance query critiche | EXPLAIN ANALYZE sulle query principali di CDU-02, CDU-07, BATCH-01 | Piani ragionevoli, no Seq Scan su tabelle grandi |

**Step 5 – ****Cutover**** PROD *****(Sprint 9, finestra manutenzione)***
Stop applicazione (Kubernetes: kubectl scale deploy/gestione-consensi-backend --replicas=0)
Dump finale dell'istanza PG9 PROD (delta dall'ultimo dump)
Restore incrementale su PG17 PROD
Aggiornamento Kubernetes Secret con nuova stringa JDBC PG17
Restart (--replicas=2), verifica readinessProbe
Smoke test: login Cittadino, rilascio consenso, verifica constnotifica
Monitoraggio ELK per 30 minuti post-cutover
**Piano di ****rollback****: **se entro 30 minuti si rilevano anomalie critiche, ripristino dei Kubernetes Secret con stringa JDBC PG9 e restart. L'istanza PG9 rimane attiva in standby per almeno 48 ore dopo il go-live
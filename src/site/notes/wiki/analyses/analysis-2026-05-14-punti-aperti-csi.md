---
{"dg-publish":true,"permalink":"/wiki/analyses/analysis-2026-05-14-punti-aperti-csi/","title":"Punti Aperti da Chiedere a CSI Piemonte — Tracker Unificato","tags":["tracker","punti-aperti","csi-piemonte","blocking","sprint-0","sprint-1","da-chiedere"],"dg-note-properties":{"title":"Punti Aperti da Chiedere a CSI Piemonte — Tracker Unificato","aliases":["Punti Aperti da Chiedere a CSI Piemonte — Tracker Unificato"],"type":"analysis","tags":["tracker","punti-aperti","csi-piemonte","blocking","sprint-0","sprint-1","da-chiedere"],"created":"2026-05-14","updated":"2026-10-09","sources":["2026-03-02-conspref-srs-v1-revised","2026-03-02-domande-srs-csi-v02","2026-09-22-ricognizione-endpoint-as-is","2026-09-25-riscontro-csi-domande-sviluppo"],"related":["[[analysis-2026-05-06-checklist-avvio-progetto|Checklist Avvio Progetto — Gestione Consensi]]","[[sicurezza-cdu-15-16|Sicurezza CDU-15-16 — Modello Autorizzazione per Ente]]","[[alternativa-batch-03-pull|Alternativa BATCH-03 — PULL CDU-17 (centro stella)]]","[[analysis-2026-05-06-openapi-cdu-15-16]]","[[analysis-2026-05-14-risposte-mf-srs-v3]]","[[GASP Salute]]","[[batch-processes|Processi Batch — BATCH-01, BATCH-02, BATCH-03]]","[[Sistemi Esterni Integrati]]","[[2026-05-05-mermaid-architettura|Diagramma Architettura Sistema — Mermaid]]","[[valutazione-qualita-srs-consensi|Valutazione Qualità SRS — Gestione Consensi]]"]}}
---


# Punti Aperti da Chiedere a CSI Piemonte

**Scopo:** consolidare in un unico tracker tutte le domande, ambiguità, TBD e proposte in attesa di conferma sparse nel corpus wiki. Ogni voce rimanda alla pagina autoritativa.

**Stato alla data (rev. 09/10/2026):** tracker riallineato al log e alle pagine wiki fino al 09/10/2026. Documento di riferimento: `CONSPREF-SRS-V1.0-revised_v10` (rev. 1.10, 06/10/2026). Il quadro sintetico dei punti ancora aperti è in §Riepilogo punti aperti.

> 🔄 **Aggiornamento 18/06/2026 (allineato all'agenda riunione):** chiusi/recepiti nel documento — **ID-01** (GASP=SAML2, restano solo metadata), **INF-03** (skeleton Exprivia/IaaS), **INT-05** (Notificatore di Deleghe ≠ UNP), **INF-04** (diagramma aggiornato). Nuovi/raffinati — **INF-05** (dettagli operativi IaaS: deploy/ingress/segreti/CI-CD + pila «k8s»), **BAT-01** (SRV-03 + SRV-04), **BAT-02/SC67** (sorgente `annulla_consensi`: informativa scaduta vs nuova), **GOV-02** (deroga V03 su `online`/`annulla_consensi`). L'ordine del giorno operativo è in `Agenda-riunione-CSI-CONSPREF_2026-06-18`.

> ✅ **Aggiornamento call CSI 20/07/2026 — chiusure di massa.** Chiusi/delegati: **SEC-01÷06** (Q1 header CF+`codice_ente` risolto; Q3/Q4/Q5/Q6 delegati ad APIMBBONE), **INT-01** (AURA: nessun servizio nuovo, stessi WSDL nei properties, credenziali IRIS DEV incluse → chiude anche **ID-03**), **INT-02** (Gestione Deleghe già integrata), **GOV-02** (deroga V03 `online`/`annulla_consensi` approvata, sorgente unica `cons_d_informativa` confermata), **BAT-01** (SRV-03/SRV-04 confermati, "svecchiare + nuova logica"). **Differiti/non vincolanti:** onboarding SIA (evento raro → CR), Manutenzione ASR §7.4 (post-Sprint 0), frequenza BATCH-02, **GOV-05/API-05** (lista ASR), Stato SCADUTO **BAT-03** (call dedicata pending). **Da riformulare:** **BAT-02/SC67** (CSI non ha capito la domanda → domanda mirata a scenario, vedi sotto). **Non toccato:** CDU-17 (attende delucidazioni via mail).

> ✅ **Aggiornamento 29/09/2026** — nuova §10 **FE-01÷08, BE-01÷03**: domande del team FE su CDU-11, risposte recepite in SRS v10 (rev. 1.9). Aperto **FE-08** (presunto accordo di eliminare la composizione dinamica del form: da confermare). Da verificare sull'AS-IS: **FE-03** (multi-azienda), **FE-05** (filtri per ASR). Verifica BE: **BE-01** (`fonte_cod` Punto Assistito). BE-02 e BE-03 chiusi (contratto REST CDU-11 e `valori_ammessi`, [[wiki/docs/adr/ADR-023-cdu-11-contratto-rest-valori-ammessi\|ADR-023]]).

> 🆕 **Aggiornamento 09/10/2026** — nuova §11: domande del team BE su CDU-09/10/11 e CDU-13. Da chiedere a CSI: **DEV-07÷DEV-11** (consensi regionali sull'ASR 999, collegamenti TELEMED, correzione di un'informativa pubblicata, prima informativa propria di un'azienda, storage dei PDF). Chiuse internamente: **BE-05÷BE-08**.

> ✅ **Aggiornamento mail CSI 25/09/2026** (risposta alle domande di sviluppo del 24/09, [[wiki/sources/2026-09-25-riscontro-csi-domande-sviluppo\|fonte]]). Nuova §9 **DEV-01÷06**. Chiusi: **DEV-02** (Deleghe fuori perimetro, richiude INT-02), **DEV-03** (`ConsprefService` SOAP mantenuto), **DEV-06** (scarico informativa anche per l'Operatore, [[wiki/docs/adr/ADR-022-cdu-06-scarico-informativa-operatore\|ADR-022]]). Parziale: **DEV-01**. In verifica CSI: **DEV-04**, **DEV-05**.

> ✅ **Aggiornamento call CSI 06/08/2026.** Migrazione dati: target aggiornato **PG9→PG18** (era PG17). LIS/RIS: chiude **INT-03** — nessun terzo canale, integrazione BE già esistente in AS-IS da migrare (vedi [[wiki/docs/adr/ADR-020-lis-integrazione-be-esistente\|ADR-020]]). Perimetro progetto: **solo Webapp Operatore** — Webapp Cittadino fuori scope di sviluppo (vedi [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]]). **Componente DELEGHE riconfermato AS-IS legacy riciclato** — sia **Gestione Deleghe** (`getDelegantiService`, già chiuso INT-02 il 20/07) sia **Notificatore di Deleghe**: **nessun nuovo sviluppo richiesto** per entrambi (Notificatore di Deleghe risultava "❌ da richiedere" nella tabella approvvigionamento prima di questa call — ora chiuso, vedi [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] §Notificatore di Deleghe).

**Legenda priorità:**
- 🔴 **CRITICO** — blocca Sprint 0/1, da chiarire **Giorno 1**
- 🟠 **ALTO** — blocca Sprint 2-3
- 🟡 **MODERATO** — necessario prima di UAT/go-live
- ⚪ **APERTO** — utile ma non bloccante

---

## 1. Identità & Autenticazione (Cittadino + Operatore)

| #     | Domanda                                                                                | Prio | Sprint   | Fonte wiki                                                                         |
| ----- | -------------------------------------------------------------------------------------- | ---- | -------- | ---------------------------------------------------------------------------------- |
| ID-01 | ~~GASP Salute: protocollo OIDC o SAML2? metadata?~~ ✅ **CHIUSO** — **SAML2** confermato (verbale 11/06/2026); **metadata SP ricevuti** (TEST/preprod, 07/2026: Shibboleth SP `tst-consprefbo-spid.isan.csi.it`, IdP GASPRP_SALUTE, LIV1/2/3). Resta: censire il SP via `Template-richiesta-Federazione-Service-Provider` a `identita.federazione@csi.it`. | ✅   | Giorno 1 | [[wiki/concepts/gasp-salute\|GASP Salute]], [[wiki/analyses/analysis-2026-05-06-checklist-avvio-progetto\|analysis-2026-05-06-checklist-avvio-progetto]] §B1 |
| ID-02 | Registrazione app PUA — **1 profilo Operatore** (unico, corretto call CSI 06/08/2026 — era erroneamente "2 profili") | 🟠   | Sprint 2 | Checklist §B9                                                                      |
| ID-03 | ~~Credenziali IRIS per autenticazione AURA (ambiente DEV)~~ ✅ **CHIUSO (call 20/07/2026):** incluse tra i parametri già presenti nei file di properties AURA | ✅   | Sprint 1 | Checklist §B7                                                                      |

---

## 2. Sicurezza CDU-15/16 — OAuth2/JWT (TR30 → TR58)

Tutte da [[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15-16 — Modello Autorizzazione per Ente]] §Punti da chiarire con CSI.

> ✅ **CHIUSI in call CSI 20/07/2026.** Il token è gestito dall'**API Manager CSI APIMBBONE** (OAuth2 `client_credentials`, Key Manager + Gateway). Q1 (header/claim) risolto; Q3/Q4/Q5/Q6 delegati ad APIMBBONE. **Unico residuo attivo:** produrre e consegnare lo **swagger (OpenAPI)** dei servizi CDU-15/16/17 per abilitare la sottoscrizione. Dettaglio in [[wiki/concepts/sicurezza-cdu-15-16\|sicurezza-cdu-15-16]] §7.

| #     | Domanda                                                                                                    | Esito |
|-------|------------------------------------------------------------------------------------------------------------|------|
| SEC-01 | ~~URL Authorization Server / header-claim~~ | ✅ **RISOLTO** — il Gateway APIM inoltra sempre **CF (da Shibboleth) + `codice_ente`**; backend deriva l'ente da qui |
| SEC-02 | ~~Firma JWT + JWKS~~ | ✅ **Non a nostro carico** — token validato dal Key Manager APIM. Prerequisito: **swagger** |
| SEC-03 | ~~Onboarding nuovo SIA + chi popola `cons_t_client_ente`~~ | ✅ **Delegato ad APIMBBONE** (http interno); mapping fuori scope V1.0; evento **raro** → **CR** |
| SEC-04 | ~~TTL token + refresh~~ | ✅ **Delegato ad APIMBBONE** (policy interne) |
| SEC-05 | ~~Scope OAuth~~ | ✅ **Delegato ad APIMBBONE** |
| SEC-06 | ~~Revoca credenziali compromesse~~ | ✅ **Delegato** — credenziali fornite da CSI, revoca a **terza parte** |

---

## 3. CDU-17 Snapshot Pull (TR34 → TR68) — sostituzione BATCH-03

> ✅ **CDU-17 RIELABORATO E CONFERMATO dal committente (call CSI 20/07/2026).** Fonte autoritativa: [[wiki/concepts/alternativa-batch-03-pull\|Alternativa BATCH-03 — PULL CDU-17]] + diagrammi [[CDU-17_diagramma-sequenza\|CDU-17]] · [[Manutenzione-endpoint_diagramma-sequenza\|Manutenzione endpoint]]. La maggior parte dei punti è chiusa.

| #     | Domanda                                                                                                    | Esito (call 20/07/2026) |
|-------|------------------------------------------------------------------------------------------------------------|------|
| PULL-01 | ~~Variante blocco o watermark?~~ | ✅ **Blocco obbligatorio** (Variante A). Watermark (B) **eliminata** |
| PULL-02 | ~~Canale notifica out-of-band~~ | ✅ **email e/o webhook** via parametro di configurazione. Con webhook **il SIA espone un REST** (contratto/firma/sicurezza forniti da CSI) |
| PULL-03 | Scope OAuth `consensi:snapshot` + lifecycle | Delegato ad **APIMBBONE**; resta lo swagger |
| PULL-04 | `page_size` massimo + tarabilità | ⚪ Da precisare (non bloccante) |
| PULL-05 | ~~Variante export-with-downtime~~ | ✅ **Non perseguita** |
| PULL-06 | ~~BATCH-03 eliminazione o marker?~~ | ✅ **Rimosso** dal SRS (§6.17) |
| PULL-07 | Conferma via PATCH idempotente | ✅ Confermato idempotente |
| PULL-08 | ~~SIA può fare chiamate REST attive?~~ | ✅ **Sì** — SIA/aziende via API Manager |
| PULL-09 | **Swagger (OpenAPI) CDU-17** da scrivere end-to-end. Ora include: **passo 5** (notifica esito webapp), **servizi endpoint CRUD** esposti alle aziende, **scenario manutenzione** (`IN_MANUTENZIONE`). | 🟠 **Residuo attivo** — Sprint 0/1 |

---

## 4. OpenAPI CDU-15/16 — TBD da OpenAPI v0.1

Da [[wiki/analyses/analysis-2026-05-06-openapi-cdu-15-16\|analysis-2026-05-06-openapi-cdu-15-16]] e dal file `openapi-cdu-15-16-v0.1.yaml`.

| #     | Domanda                                                                                                    | Prio | Sprint   |
|-------|------------------------------------------------------------------------------------------------------------|------|----------|
| API-01 | ~~URL Authorization Server CSI (TODO-M1)~~ ✅ **Chiuso con SEC-01/SEC-02 (20/07/2026):** token emesso e validato da APIMBBONE | ✅ | — |
| API-02 | ~~Scope OAuth richiesto per `/consensi/stato` (TODO-M2)~~ ✅ **Chiuso con SEC-05 (20/07/2026):** delegato ad APIMBBONE | ✅ | — |
| API-03 | Paginazione su CDU-16 (TODO-M3): serve? Se sì, cursor-based come CDU-17 — `page_size` default + max accettato | 🟡   | Sprint 2 |
| API-04 | SLA tempo risposta + throughput target per CDU-15/16 (TODO-M4). Rate limit già sul Traffic Manager APIMBBONE | 🟡   | UAT      |
| API-05 | Lista ASR coinvolte nel TO-BE + referenti tecnici (TODO-M5). **Call 20/07/2026:** non vincolante, differito. | ⚪ (differito)   | Sprint 2 |
| API-06 | **URL dei server DEV/PROD** e **nome esatto degli header** inoltrati dal Gateway APIMBBONE, da riportare nello YAML (emersi il 06/10/2026) | 🔴   | Pre sottoscrizione APIM |

---

## 5. Batch & WSDL — BATCH-01 / BATCH-02

| #     | Domanda                                                                                                    | Prio | Sprint   | Fonte                                                              |
|-------|------------------------------------------------------------------------------------------------------------|------|----------|--------------------------------------------------------------------|
| BAT-01 | ~~Confermare SRV-03 NotificaAcquisizioneConsenso + SRV-04 NotificaRevocaConsenso~~ ✅ **CONFERMATO (call 20/07/2026):** operazioni esistenti, **"solo da svecchiare e integrare la nuova logica"**. Restano solo i nomi esatti dei campi del tracciato. | ✅ | Sprint 1 | [[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] §RISCHIO, Checklist §B10 |
| BAT-02 | ~~**SC67**~~ ✅ **RISOLTO PER VIA TECNICA (2026-07-23).** La storicizzazione BATCH-02 è **ancorata all'informativa scaduta A**: legge `annulla_consensi` da A e àncora il record terminale a A. Allinea l'SQL §7.2 alla prosa autoritativa §6.13; nessun impatto su CDU-17 (snapshot esporta solo consensi attivi). Da segnalare a CSI come scelta di design, non domanda. **SQL SRS §7.2 corretto (2026-07-23, `.md`+`.docx`, riga variazioni 1.4).** | ✅ Chiuso | Prima di chiudere SRS | [[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] §ALG02, [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|analysis-2026-05-14-risposte-mf-srs-v3]] §Tema J |
| BAT-03 | Stato SCADUTO — semantica cambiata AS-IS vs TO-BE. **Call 20/07/2026:** CSI lo considera "componente da gestire" → **call dedicata pending** per definire la comunicazione ai SIA ASR (gestione asincrona). **05/08/2026:** analisi delle opzioni pronta per la call ([[wiki/analyses/analysis-2026-08-05-stato-scaduto-comunicazione-sia\|versione tecnica]], [[wiki/analyses/analysis-2026-08-05-stato-scaduto-spiegato-semplice\|versione per il cliente]]). | 🟠   | Sprint 1 (call pending) | [[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] §Differenza semantica, [[wiki/analyses/analysis-gap-as-is-to-be\|Analisi Gap AS-IS → TO-BE — Gestione Consensi]] |

---

## 6. Integrazioni & Canali

| #      | Domanda                                                                                   | Prio | Sprint   | Fonte                                                                                                             |
| ------ | ----------------------------------------------------------------------------------------- | ---- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| INT-01 | ~~**WSDL AURA** — lista servizi (CDU-07/08)~~ ✅ **CHIUSO (call 20/07/2026):** nessun servizio nuovo, **gli stessi già presenti nei file di properties** (`FindProfiliAnagrafici`, `getProfiloSanitario`); credenziali IRIS DEV incluse. | ✅   | Sprint 0 | Checklist §B5                                                                                                     |
| INT-02 | ~~**WSDL Gestione Deleghe** — `getDelegantiService`, accreditamento portale API-Piemonte~~ ✅ **CHIUSO (call 20/07/2026):** **già integrato, nulla da fare.** ⚠️ Riaperto come conflict il 22/09/2026 (WSDL senza client). ✅ **Richiuso 25/09/2026 (DEV-02):** Deleghe **fuori perimetro**, il backend riceve solo il CF del delegato; nessuna integrazione da migrare né da costruire | ✅   | Sprint 0 | Checklist §B6, [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] §Gestione Deleghe |
| INT-03 | ~~**LIS — acronimo + spec integrazione canale acquisizione consensi** (MF3R1, MF4R1)~~ ✅ **CHIUSO (call 06/08/2026):** nessun terzo canale — LIS/RIS acquisiscono via **integrazione BE già presente nel codice sorgente AS-IS**, da individuare e migrare al nuovo stack. Vedi [[wiki/docs/adr/ADR-020-lis-integrazione-be-esistente\|ADR-020]] (supersede ADR-017). | ✅   | — | [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] §LIS, [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|analysis-2026-05-14-risposte-mf-srs-v3]] §Tema A |
| INT-04 | Accesso repo **QUASAR CSI** (componenti UI)                                               | 🟠   | Sprint 1 | Checklist §B8                                                                                                     |
| INT-05 | ~~Distinzione Notificatore di Deleghe ≠ Notificatore UNP in SRS~~ ✅ **RECEPITO** in SRS §4.2/§7 (Deleghe = conferma rilascio post-COMPLETATO; UNP = annullamento/scadenza e notifiche generiche) | ✅   | — | [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] §Notificatore                                            |
| INT-06 | **Elenco delle interfacce che la Webapp Cittadino invoca oggi sul backend** (path, metodo, protocollo, formato), riferimento di non-regressione. Richiesto il 22/09/2026, riassegnato da Exprivia a CSI: il sorgente cittadino non è in consegna. Senza l'elenco la compatibilità verso la Webapp Cittadino non è collaudabile | 🟠   | Prima del collaudo | [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]] §Open issues, [[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|Ricognizione endpoint AS-IS]] |
| INT-07 | **[Exprivia/BE] LIS/RIS — lacuna L2 di ADR-020.** Estrarre da `consprefdb` i valori distinti di `fonte_id` sui consensi storici: dicono se LIS/RIS usano `ConsprefService` (L2 chiusa) o un'integrazione da cercare. Se l'integrazione non si trova, il punto torna a CSI | 🟡   | Sprint 1 | [[wiki/docs/adr/ADR-020-lis-integrazione-be-esistente\|ADR-020]] §Open issues |

---

## 7. Infrastruttura & Provisioning

| #     | Domanda                                                                                                    | Prio | Sprint   | Fonte         |
|-------|------------------------------------------------------------------------------------------------------------|------|----------|---------------|
| INF-01 | ~~**Provisioning DBaaS Nivola DEV**~~ ✅ **CHIUSO (09/10/2026):** DB DEV con i dati AS-IS migrati in uso dal team BE. Storico: ✅ **in corso (07/2026)**; su DEV verrà caricato un **ribaltamento dei dati** dal DB **TEST PG 9.6**. Target di versione **PG18** (call 06/08/2026, era PG17). **24/09/2026:** il team BE lavora già sul DB AS-IS migrato (verifiche CDU-12). Chiusura confermata dall'utente il 09/10/2026 | ✅ | Giorno 1 | Checklist §B2, [[wiki/docs/adr/ADR-003-dbaas-nivola\|ADR-003]] |
| INF-02 | **Provisioning DBaaS Nivola PROD** — **rinviato**: in questa fase si creano solo **DEV + pre-prod** (no PROD, per contenere i costi). | 🟡 | Post-collaudo | Checklist §B3 |
| INF-03 | ~~Accesso automation CSI~~ ✅ **CHIUSO** — Skeleton in carico a **Exprivia** (IaaS, non ECaaS). Confronto su POM con CSI (verbale 11/06/2026). | ✅   | Giorno 1 | Checklist §B4 |
| INF-04 | ~~Diagramma architetturale~~ ✅ **AGGIORNATO** (Exprivia, 18/06/2026): rimosso il nodo API Gateway dal percorso AS-IS, infra IaaS, SIA 1:n, cittadini via SPID/CIE diretto, aggiunti EnteAuthorizationFilter/Snapshot Service/CDU-17. | ✅ | — | [[wiki/sources/2026-05-05-mermaid-architettura\|Diagramma Architettura Sistema — Mermaid]], Checklist §B14 |
| INF-05 | Dettagli operativi ambiente IaaS — ✅ **in gran parte chiariti (07/2026, `ElencoUrlTools`)**: deploy via **automation Chef (ADA Deployer)** su Nivola; CI/CD **GitLab + Jenkins**; qualità **SonarQube**; artefatti **Artifactory**; consegna **ASGARD**. **Restano:** ingress/TLS e meccanismo di gestione dei **segreti applicativi**. | 🟠 | Sprint 0/1 | [[wiki/concepts/architettura-iaas\|Architettura IaaS]] §Toolchain, SRS §3.5 |

---

## 8. Governance & Documenti

| #      | Domanda                                                                                                                   | Prio | Sprint         | Fonte                                                                        |
| ------ | ------------------------------------------------------------------------------------------------------------------------- | ---- | -------------- | ---------------------------------------------------------------------------- |
| GOV-01 | **Approvazione formale dell'SRS V1.0** da CSI. Il testo è nato per la bozza v2; la revisione corrente è `revised_v10` (rev. 1.10, 06/10/2026). Nessuna approvazione formale registrata nel log | 🟠   | Prima Sprint 1 | Checklist §B12, [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|analysis-2026-05-14-risposte-mf-srs-v3]]                   |
| GOV-02 | **Validazione [PROPOSTA] nell'SRS** — ALG02 BATCH-01, CDU-06 PDF, 11 proposte §8.4. ✅ **Deroga V03 su `online`/`annulla_consensi` APPROVATA (call 20/07/2026):** confermata la scelta V1.0 di mantenerli su `cons_d_informativa` (sorgente autoritativa unica); CSI conferma il funzionamento. ⚠️ **24/09/2026:** sul DB AS-IS migrato `online`/`annulla_consensi` **non esistono** → colonne nuove da aggiungere (motivazione «retrocompatibilità AS-IS» corretta in SRS v8, rev. 1.7). Stesso caso per `cons_d_asr.tipo_ente` (§8.4.6, CDU-12): colonna nuova, ✅ **adottata con decisione interna di progetto** (24/09/2026) per chiudere lo sviluppo del CDU-12 — non è un'approvazione CSI. Restano le altre [PROPOSTA]. | 🟠 (deroga V03 ✅) | Prima Sprint 2 | Checklist §B13, [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|analysis-2026-05-14-risposte-mf-srs-v3]] §Tema D           |
| GOV-03 | **CONSPREF-DMP** — ~~chi è responsabile lato CSI?~~ ✅ **CHIUSO 16/07/2026:** redazione in carico a **CSI Piemonte**. Resta la produzione della bozza v1 (Sprint 0) | ✅   | Sprint 0       | [[wiki/sources/2026-03-02-domande-srs-csi-v02\|2026-03-02-domande-srs-csi-v02]], Q11,[[wiki/analyses/valutazione-qualita-srs-consensi\|valutazione-qualita-srs-consensi]] |
| GOV-04 | **SLA e NFR performance** — tempo risposta max CDU-02, throughput BATCH-01, disponibilità (99.x%)                         | 🟡   | Prima UAT      | Checklist §B15                                                               |
| GOV-05 | **Lista ASR coinvolte** + referenti tecnici (confluisce con API-05). **Call 20/07/2026:** componente **non vincolante**, smarcabile in seguito. | ⚪ (differito)   | Sprint 2       | Checklist §B11                                                               |

---

## 9. Domande di sviluppo — mail 24/09/2026, riscontro CSI 25/09/2026

Fonte: [[wiki/sources/2026-09-25-riscontro-csi-domande-sviluppo\|Riscontro CSI alle domande di sviluppo]]. CSI lo definisce «primo riscontro»: DEV-04 e DEV-05 restano in verifica lato CSI.

| #      | Domanda | Esito CSI (25/09/2026) | Residuo | Stato |
| ------ | ------- | ---------------------- | ------- | ----- |
| DEV-01 | Servizi `/informativa/*` AS-IS: replicarli? `modifyToRevoked`? Esclusione ASR 904 (San Luigi)? | **Ripristinare San Luigi.** Rivedere la logica di esclusione delle aziende con endpoint dismessi. Adeguare il FE ai servizi del nuovo BE, se compatibile con i requisiti funzionali | `modifyToRevoked` **senza risposta: ⏸️ pending, in attesa di decisione** (utente 25/09/2026); regola "endpoint dismessi" da definire (stato endpoint CDU-14? tutti o almeno uno?); verificare che la Webapp Cittadino non consumi `/informativa/*` | 🟡 Parziale |
| DEV-02 | ~~Gestione Deleghe (BE-02): dov'è realizzata?~~ | **Fuori perimetro.** Il servizio riceve il CF del delegato che opera per il cittadino | Dettaglio di contratto: servizio, nome campo, persistenza del CF delegato (non bloccante) | ✅ Chiuso |
| DEV-03 | ~~SOAP in ingresso `/services/ConsprefService`: chi lo usa, resta SOAP?~~ | **Mantenerlo** per le integrazioni SOAP esistenti | Sbloccare l'accesso nella security del nuovo BE con autenticazione equivalente all'AS-IS. Chiude la lacuna **L1** di [[wiki/docs/adr/ADR-020-lis-integrazione-be-esistente\|ADR-020]] | ✅ Chiuso |
| DEV-04 | Codici HTTP distinti per errori esterni (502 / 409 / 503) invece di 500 | Coerente, ma **verificare prima gli impatti** su FE e integrazioni esistenti | Proposta: nuovi codici solo su REST nuovi e FE Operatore; contratti AS-IS (Webapp Cittadino, SOAP) invariati | 🟡 In verifica CSI |
| DEV-05 | CDU-15/16: JWT validato dall'API Manager, il BE si fida degli header del gateway | **Allineato** all'architettura CSI. Conferma formale dagli architetti. Le **aziende federate restano sulla canalità esistente** | Conferma architetti; requisito "BE raggiungibile solo via gateway" da garantire nel deploy IaaS; chiarire che "federate" = aziende sul canale SOAP `ConsprefService` | 🟡 In verifica CSI |
| DEV-06 | ~~CDU-06: l'operatore scarica/stampa il PDF?~~ | **Sì:** scarico dell'informativa per cittadino **e** operatore di BO (= profilo unico Operatore) | Collocazione SRS ✅ recepita in v9 (CDU-06 unico a due attori, accesso Operatore da CDU-08); resta la voce backlog FE Operatore. Vedi [[wiki/docs/adr/ADR-022-cdu-06-scarico-informativa-operatore\|ADR-022]] | ✅ Chiuso |

---

## 10. Domande team FE su CDU-11 — 29/09/2026

Domande del team FE all'avvio di CDU-11 (Modifica del valore di un consenso per conto di un assistito). Risposte date da Exprivia sulla base dell'SRS v9 e della wiki, recepite in **SRS v10 (rev. 1.9)**, §6.11 «NOTA CHIARIMENTI SVILUPPO». I punti marcati *da verificare AS-IS* diventano domande a CSI solo se l'applicativo attuale si comporta diversamente.

| #     | Domanda | Risposta (29/09/2026) | Residuo | Stato |
| ----- | ------- | --------------------- | ------- | ----- |
| FE-01 | CDU-11 riusa la maschera di CDU-05, senza altri campi? | **Sì.** Stessa maschera di §6.5; le differenze (`fonte_id`, `login_operazione`, `ruoloop_id`) sono solo BE | — | ✅ Chiuso |
| FE-02 | Nel cambio valore non si chiede l'accettazione dell'informativa? | **Confermato.** «Modifica Valore» solo per ATTIVO/NEGATO; SCADUTO/ANNULLATO → CDU-10 con riaccettazione ([[wiki/docs/adr/ADR-016-scaduto-async-batch-02\|ADR-016]]) | — | ✅ Chiuso |
| FE-03 | Consensi aziendali: una azienda o più insieme, come oggi? | **Una azienda per operazione** (chiave `cf_cittadino` + `sotto_tipo_consenso` + `cod_asr`). Regionale: un record, valore propagato a tutte le ASR | Se la multi-selezione AS-IS è usata davvero → domanda a CSI | 🟡 Da verificare AS-IS |
| FE-04 | Informativa per singola azienda visibile anche nella modifica? | **Sì, in sola lettura** (link/PDF da `d_informativa_id`), senza checkbox | — | ✅ Chiuso |
| FE-05 | Ruoli abilitati, limitazioni per azienda o tipo consenso? | **Profilo unico Operatore**, nessuna limitazione prevista dall'SRS | Se l'AS-IS filtra per ASR dell'operatore → domanda a CSI | 🟡 Da verificare AS-IS |
| FE-06 | `cf_delegato`: CF del delegato o del delegante? | **CF del delegato** (conferma CSI DEV-02). Default «CF delegante» in §6.3/6.4/6.5 era un refuso, corretto in v10. **Per CDU-11 resta NULL** | — | ✅ Chiuso |
| FE-07 | Consenso salvato ma notifica aziendale fallita: che esito vede l'operatore? | **Esito positivo** a transazione confermata (consenso + `cons_t_notifica`). Invio asincrono BATCH-01 ([[wiki/docs/adr/ADR-007-batch-01-5min-skip-locked\|ADR-007]]); i KO restano nel batch | — | ✅ Chiuso |
| FE-08 | Form dinamico e Renderer condiviso «come concordato non si fanno» | Superato solo il renderer **condiviso** Cittadino/Operatore ([[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]]); SRS v10 corretto in §6.9/6.10/6.11. La **composizione dinamica** da configurazione resta requisito CSI ([[wiki/docs/adr/ADR-008-ssot-form-renderer\|ADR-008]]) | Nessuna traccia in wiki di un accordo per eliminarla: **da confermare** (Marco). Se confermato → nuovo ADR. **01/10/2026:** la risposta al FE sul Form Renderer (struttura fissa, contenuti da DB, `riassunto/TRASV-componenti-comuni.md` §9) presuppone la composizione dinamica; contratto ancora in proposta, nessun ADR | 🟠 Aperto |
| BE-01 | `fonte_id = 'PASS'` vs `WA_PASS` inviato dal FE | `'PASS'` è l'etichetta logica; vale il `fonte_cod` AS-IS in `cons_d_fonte`, senza rinomina. Il FE **non invia** la fonte: la ricava il BE dal canale | BE: verificare `SELECT fonte_id, fonte_cod, fonte_desc FROM cons_d_fonte` | 🟡 Verifica BE |
| BE-02 | CDU-11: va bene `PUT /informativa/update/{cfAssistito}/{cfOperatore}`? Payload per singola azienda, serve `sotto_tipo_consenso_id`? | **Nuovo endpoint** `PUT /consensi/{cfAssistito}/valore`, corpo `{sotto_tipo_consenso_id, cod_asr, valore_consenso}` (`cod_asr` null per i regionali), CF operatore dalla sessione. Confermato dai team FE e BE il 29/09: il BE adegua l'endpoint equivalente già esistente. Vedi [[wiki/docs/adr/ADR-023-cdu-11-contratto-rest-valori-ammessi\|ADR-023]] | Aggiornare OpenAPI BE Operatore | ✅ Chiuso |
| BE-03 | Da quale API arrivano i valori ammessi di `valore_consenso`? | Campo `valori_ammessi: [{valore, descrizione}]` nella risposta che carica il consenso, letto da `cons_r_consenso_valore` + `cons_d_valore_cons`. Confermato FE/BE 29/09 ([[wiki/docs/adr/ADR-023-cdu-11-contratto-rest-valori-ammessi\|ADR-023]]) | — | ✅ Chiuso |

---

## 11. Domande team BE su CDU-09/10/11 e CDU-13 — 09/10/2026

Domande del team BE. Risposte date da Exprivia sulla base dell'SRS v10 e della wiki. Le voci DEV-07÷DEV-11 sono domande per CSI: il testo è stato preparato il 09/10/2026 e non risulta ancora inviato. Fino alla risposta valgono le proposte indicate.

| #      | Domanda | Risposta / proposta (09/10/2026) | Residuo | Stato |
| ------ | ------- | -------------------------------- | ------- | ----- |
| DEV-07 | Consensi regionali migrati salvati in un solo record sull'ASR fittizia 999: convertirli in un record per azienda? | **Proposta Exprivia:** in migrazione ogni record 999 diventa N record, uno per azienda collegata in `cons_r_sotto_tipo_cons_asr_endpoint`, con lo stesso valore (SRS §6.3 passo 6, requisito [1]) | CSI: conferma della conversione; verificare se sistemi esterni (servizi SOAP verso le ASR, SIA, reportistica) usano oggi il codice 999. Conversione non implementata fino alla risposta | 🟠 Da chiedere CSI |
| DEV-08 | TELEMED non ha aziende collegate in `cons_r_sotto_tipo_cons_asr_endpoint` | Comportamento del sistema deciso internamente (BE-05). Mancano i collegamenti di configurazione | CSI: quali aziende collegare; configurazione via CDU-14 (CSI) o negli script di migrazione (Exprivia). Prerequisito di DEV-07 per i consensi TELEMED | 🟠 Da chiedere CSI |
| DEV-09 | Correzione di un'informativa già pubblicata (es. refuso CPROL). SRS §6.13 passo 4 «nuova versione» vs ALG01 «salva o aggiorna» | **Proposta Exprivia:** versione non ancora in vigore → tutti i campi modificabili; in vigore → solo `desc_informativa` e `data_scadenza`; testo HTML e PDF di una versione in vigore solo come errata corrige non sostanziale, con traccia in `csi_log_audit`. Una nuova versione per un refuso farebbe scadere tutti i consensi | CSI: conferma o parere DPO della Regione. Nel frattempo il BE sviluppa l'aggiornamento con questi vincoli | 🟠 Da chiedere CSI |
| DEV-10 | Prima informativa propria di un'azienda (es. ASL TO5, che prima usava la generale CPROL): i consensi TO5 legati alla generale scadono? | **Provvisorio:** restano validi, la generale non scade | CSI: scadenza/annullamento come per una nuova versione, oppure validità | 🟠 Da chiedere CSI |
| DEV-11 | PDF delle informative: cartella/volume su IaaS (SRS §3.5.2 «da definire con CSI»), limite di dimensione, conservazione | **Proposta Exprivia:** servizio di storage dedicato con percorso base configurabile; limite configurabile, iniziale 10 MB; nessuna cancellazione, perché le informative sono referenziate anche dai consensi storici ([[wiki/docs/adr/ADR-015-storicizzazione-immutabile\|ADR-015]]) | CSI: volume e condivisione tra nodi, limite, policy di conservazione. BE: verificare se `pdf_informativa` nel DB AS-IS contiene un percorso o il file | 🟠 Da chiedere CSI |
| BE-05 | Consenso regionale senza aziende collegate: cosa fa il salvataggio? | **Rifiuto con errore applicativo** («Consenso non configurato: nessuna azienda collegata»). Già al caricamento il form segnala il consenso come non rilasciabile, con lo stesso meccanismo di `regole.bloccato_allineamento` | Configurazione TELEMED → DEV-08 | ✅ Chiuso |
| BE-06 | Informativa propria di un'azienda: quale si usa, vale la generale, cosa si chiude? | **a)** quella dell'azienda (SRS §6.3 passo 4). **b)** è generale un'informativa senza righe in `cons_r_informativa_asr`; per un'azienda si cerca prima l'informativa corrente collegata, altrimenti la generale corrente dello stesso sotto-tipo. **c)** una nuova informativa TO5 chiude solo la precedente TO5; la generale resta valida | Caso «prima informativa propria» → DEV-10. Da fissare in sviluppo quali date valgono per l'azienda (`cons_r_informativa_asr.valida_*` o `cons_d_informativa.data_*`) | ✅ Chiuso |
| BE-07 | Allegato HTML: va salvato anche in `cons_t_allegato` oltre che in `html_informativa`? | **Sì, come SRS §6.13 passo 5.** La colonna è il testo mostrato nel form; l'allegato HTML è la copia documentale, insieme al PDF. Scritti nella stessa operazione, con lo stesso contenuto | — | ✅ Chiuso |
| BE-08 | Valori di `online` e `annulla_consensi` per le informative esistenti (CPROL, TELEMED) | Colonne nuove create dagli script di migrazione (SRS §8.4.5), valorizzate con i default della maschera CDU-13 (§6.13): `online = true`, `annulla_consensi = false`. Eventuali eccezioni le imposta l'operatore da CDU-13 | — | ✅ Chiuso |

---

## Riepilogo punti aperti (09/10/2026)

> 🔄 **Riscritto il 09/10/2026.** Il riepilogo per Sprint del 14/05/2026 e lo «stato residuo post-call 20/07/2026» elencavano come aperti molti punti chiusi in seguito (ID-01, ID-03, SEC-01÷06, PULL-01/02/05/06/08, API-01/02, INT-01÷03, INT-05, INF-01, INF-03/04, BAT-01/02, GOV-03, DEV-02/03/06). Qui restano solo i punti non chiusi, raggruppati per chi deve rispondere. Il dettaglio è nelle sezioni sopra.

**Da CSI: bloccanti o ad alta priorità**

| # | Tema | Stato |
|---|---|---|
| PULL-09 | Swagger (OpenAPI) CDU-17, inclusi servizi endpoint e scenario manutenzione | 🟠 Residuo attivo |
| API-06 | URL server DEV/PROD e nome degli header del Gateway nello YAML CDU-15/16 | 🔴 Pre sottoscrizione APIM |
| GOV-01 | Approvazione formale dell'SRS (oggi rev. 1.10) | 🟠 |
| BAT-03 | Stato SCADUTO, comunicazione ai SIA: call dedicata | 🟠 Call pending |
| INF-05 | IaaS: ingress/TLS e gestione dei segreti applicativi | 🟠 |
| INT-04 | Accesso al repo QUASAR CSI | 🟠 |
| INT-06 | Elenco interfacce della Webapp Cittadino (non-regressione) | 🟠 |
| DEV-07÷DEV-11 | Domande BE del 09/10/2026: regionali sull'ASR 999, TELEMED, correzione informativa, prima informativa aziendale, storage PDF | 🟠 Da inviare |

**Da CSI: in verifica o parziali**

| # | Tema | Stato |
|---|---|---|
| DEV-01 | `modifyToRevoked`; regola «endpoint dismessi» | 🟡 Parziale |
| DEV-04 | Codici HTTP 502/409/503 | 🟡 In verifica CSI |
| DEV-05 | Conferma architetti sul trust negli header del Gateway | 🟡 In verifica CSI |
| GOV-02 | Altre [PROPOSTA] dell'SRS (deroga V03 già approvata) | 🟠 |
| ID-02 | Registrazione app PUA, profilo unico Operatore | 🟠 |
| INF-02 | DBaaS PROD | 🟡 Rinviato |

**Interni (Exprivia / team di sviluppo)**

| # | Tema | Stato |
|---|---|---|
| FE-08 | Composizione dinamica del form: confermare che resta (01/10/2026) e, se serve, ADR | 🟠 |
| FE-03, FE-05 | Verifica sull'AS-IS: multi-azienda, filtri per ASR | 🟡 |
| BE-01 | Valore reale di `fonte_cod` per il Punto Assistito | 🟡 |
| INT-07 | Valori distinti di `fonte_id` per LIS/RIS (ADR-020 L2) | 🟡 |

**Non bloccanti o differiti:** PULL-04 (`page_size`), API-03 (paginazione CDU-16), API-04 e GOV-04 (SLA/NFR, prima dell'UAT), API-05 e GOV-05 (lista ASR).

---

## Note di gestione

1. **Ownership tracker:** Marco Forneris (Exprivia) propone questo file come agenda per la prossima riunione CSI/Exprivia.
   - 📋 **2026-06-18:** da questo tracker è stata derivata un'agenda formale per la riunione — deliverable `Agenda-riunione-CSI-CONSPREF_2026-06-18.docx`/`.pdf` (root repo), con in più i punti emersi dall'audit del 18/06: dettagli operativi infrastruttura **IaaS** (modello deploy/ingress/segreti/CI-CD + pila CSI di riferimento al posto degli identificativi «k8s») e l'evidenza su **BAT-01** (operazione WSDL attesa SRV-03 NotificaAcquisizioneConsenso).
2. **Workflow proposto:** ogni voce avrà un campo `risposta_csi` da popolare in revisione successiva del SRS; alla chiusura del punto, la voce si trasforma in entry permanente in [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|analysis-2026-05-14-risposte-mf-srs-v3]] o nella relativa concept page.
3. **Dipendenze incrociate evidenti:**
   - ~~SEC-01/API-01 (URL AS)~~ e ~~SEC-05/API-02 (scope)~~ → chiusi 20/07/2026 (APIMBBONE); PULL-03 segue il tracker CDU-17
   - ~~INT-01/INT-02 (WSDL AURA/Deleghe) → bloccano CDU-07/08~~ → chiusi (20/07 e 25/09/2026)
   - ~~INF-01/INF-03 (DBaaS + automation) → bloccano partenza Sprint 1~~ → INF-03 chiuso; INF-01 chiuso 09/10/2026
   - ~~PULL-08 (SIA caller capability)~~ → chiuso 20/07/2026
   - PULL-09 (spec CDU-17) → bloccante per implementazione endpoint, per aggiornamento YAML OpenAPI e per test integrazione SIA
   - API-06 (URL server, header Gateway) → bloccante per la sottoscrizione su APIMBBONE di CDU-15/16
   - DEV-07/DEV-08 (regionali 999, collegamenti TELEMED) → bloccano lo script di migrazione dei consensi regionali
   - INT-06 (interfacce Webapp Cittadino) → condiziona il collaudo di non-regressione del backend
1. **Riferimenti operativi:** [[wiki/analyses/analysis-2026-05-06-checklist-avvio-progetto\|Checklist Avvio Progetto — Gestione Consensi]] resta lo strumento day-1 operativo; questo tracker è la versione consolidata e tematicamente raggruppata.
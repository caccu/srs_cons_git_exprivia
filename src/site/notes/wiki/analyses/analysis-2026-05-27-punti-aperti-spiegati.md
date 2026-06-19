---
{"dg-publish":true,"permalink":"/wiki/analyses/analysis-2026-05-27-punti-aperti-spiegati/","title":"Punti Aperti — Spiegati in Modo Semplice","tags":["punti-aperti","csi-piemonte","guida-semplice","sprint-0","da-chiedere"],"dg-note-properties":{"title":"Punti Aperti — Spiegati in Modo Semplice","type":"analysis","tags":["punti-aperti","csi-piemonte","guida-semplice","sprint-0","da-chiedere"],"created":"2026-05-27","updated":"2026-06-18","sources":["2026-03-02-conspref-srs-v1-revised","2026-03-02-domande-srs-csi-v02"],"related":["[[analysis-2026-05-14-punti-aperti-csi|Punti Aperti da Chiedere a CSI Piemonte — Tracker Unificato]]","[[analysis-2026-05-06-checklist-avvio-progetto|Checklist Avvio Progetto — Gestione Consensi]]","[[gasp-salute|GASP Salute]]","[[batch-processes|Processi Batch — BATCH-01, BATCH-02, BATCH-03]]","[[sicurezza-cdu-15-16|Sicurezza CDU-15-16 — Modello Autorizzazione per Ente]]"]}}
---


# Punti Aperti — Spiegati in Modo Semplice

Versione "in parole povere" del [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|tracker tecnico]], **allineata all'agenda della riunione CSI** (`Agenda-riunione-CSI-CONSPREF_2026-06-18`). Per ogni punto ancora aperto spiega: **cosa significa**, **perché serve**, **come si chiude**. È raggruppata come l'agenda.

**Priorità:** 🔴 critico (blocca la partenza) · 🟠 alto (blocca sprint 2-3) · 🟡 moderato (prima del collaudo) · ✅ chiuso/recepito.

---

## ✅ Già chiusi o recepiti (non più da chiedere)

- **Login cittadini/operatori (GASP Salute):** protocollo confermato **SAML2** (verbale 11/06/2026). Resta solo da farsi dare i metadata/endpoint (vedi sotto).
- **Chi crea lo scheletro del progetto:** lo fa **Exprivia** (ambiente IaaS, non ECaaS), con confronto sul POM con CSI.
- **Due notificatori distinti:** nel documento ora è chiaro — *Notificatore di Deleghe* per la conferma di rilascio, *UNP* per annullamenti e notifiche generiche.
- **Diagramma dell'architettura:** aggiornato (tolto l'API Gateway dal percorso interno, infrastruttura IaaS, SIA 1‑a‑n, aggiunti Snapshot Service/CDU‑17).
- **BATCH-03:** rimosso e sostituito dal CDU-17 (snapshot PULL) nel documento.

---

## 1. Decisioni da far prendere a CSI

### 🔴 Sì al CDU-17 al posto di BATCH-03
**Cosa significa:** abbiamo proposto di sostituire il vecchio invio massivo (BATCH-03) con un servizio che i sistemi esterni vengono a interrogare loro ("centro stella"). **Come si chiude:** CSI dà l'ok formale (sign-off) alla proposta.

### 🟠 Approvazione del documento SRS (GOV-01)
**Cosa significa:** dopo aver recepito le risposte, l'SRS va approvato ufficialmente. **Come si chiude:** CSI approva la versione allineata del 18/06/2026.

### 🟠 Ok alla scelta su online / annulla_consensi (GOV-02)
**Cosa significa:** nella V1.0 teniamo questi due parametri sull'informativa; il requisito originale (V03) diceva di legarli al consenso. È una deroga consapevole. **Come si chiude:** CSI approva la deroga (o chiede di rientrare nel requisito V03).

---

## 2. Bloccanti — da chiarire subito (Sprint 0)

### 🔴 Metadata di GASP Salute (ID-01)
**Cosa significa:** il protocollo è SAML2; per integrarlo servono i metadata XML dell'Identity Provider e gli indirizzi (endpoint). **Come si chiude:** CSI consegna metadata + endpoint di GASP.

### 🔴 Server che rilascia i token e come è firmato (SEC-01 / SEC-02 / SEC-05)
**Cosa significa:** i sistemi esterni che chiamano le nostre API ottengono prima un token da un "Authorization Server" di CSI. Ci servono: l'indirizzo (test/prod), l'algoritmo di firma del token, l'URL per scaricare le chiavi (JWKS) e l'elenco dei "permessi" (scope: `consensi:read`, `consensi:snapshot`). **Come si chiude:** CSI comunica URL, algoritmo, JWKS e scope.

### 🔴 Database DEV e PROD (INF-01 / INF-02)
**Cosa significa:** il database lo fornisce CSI su Nivola tramite richiesta formale ("scheda di provisioning"), una per sviluppo e una per produzione. Tempi lunghi: meglio chiederlo presto. **Come si chiude:** Exprivia invia le schede; CSI/Nivola crea le istanze PostgreSQL 17.

### 🔴 Dettagli dell'ambiente IaaS (INF-05)
**Cosa significa:** abbiamo deciso che l'ambiente è IaaS (non ECaaS/Kubernetes). Restano da definire i dettagli pratici: come si rilascia l'applicazione, ingress/TLS, dove si tengono i segreti, la pipeline CI/CD, e quale "pila" CSI usare (oggi quelle di riferimento hanno l'etichetta "k8s", legata al vecchio modello). **Come si chiude:** CSI indica il modello operativo IaaS e la pila di riferimento.

### 🔴 Responsabile della migrazione dati (GOV-03)
**Cosa significa:** si passa da PostgreSQL 9 a 17; serve un piano scritto (CONSPREF-DMP) e qualcuno lato CSI che lo guidi. **Come si chiude:** CSI nomina il referente.

---

## 3. CDU-17 (lo "snapshot" PULL) — da concordare

### 🔴 I sistemi esterni possono chiamarci loro? (PULL-08)
**Cosa significa:** nel nuovo modello è il sistema esterno (SIA) che viene a prendersi i dati. Bisogna verificare che tecnicamente possano farlo (firewall, ecc.). **Come si chiude:** CSI/ASR confermano la capacità.

### 🔴 Lo snapshot blocca o no le scritture? (PULL-01)
**Cosa significa:** per fare una "foto" coerente dei consensi, o fermiamo un attimo le acquisizioni (semplice, micro-stop) oppure usiamo una marca temporale (zero stop, più complesso). **Come si chiude:** CSI sceglie la variante.

### 🔴 Come avvisiamo il sistema esterno? (PULL-02)
**Cosa significa:** quando registriamo un nuovo endpoint, avvisiamo il SIA via email e/o webhook? **Come si chiude:** CSI indica il canale.

### 🔴 Scrivere la specifica del CDU-17 (PULL-09)
**Cosa significa:** va definita la specifica REST del servizio (parametri, risposta, errori). **Come si chiude:** la scriviamo insieme a CSI.

---

## 4. Integrazioni con altri sistemi

### 🟠 Documentazione di AURA + credenziali (INT-01 / ID-03)
**Cosa significa:** AURA è l'anagrafe per cercare i pazienti; servono il WSDL dei servizi (FindProfiliAnagrafici, getProfiloSanitario) e le credenziali IRIS per l'ambiente DEV. **Come si chiude:** CSI consegna WSDL e credenziali.

### 🟠 Gestione Deleghe via API-Piemonte (INT-02)
**Cosa significa:** le deleghe si raggiungono tramite il portale API-Piemonte (non chiamata diretta), operazione `getDelegantiService`. Serve l'accreditamento sul portale, il WSDL e sapere come si firma il token. **Come si chiude:** CSI abilita l'accreditamento e fornisce i dettagli.

### 🟠 Operazioni SOAP di BATCH-01 (BAT-01)
**Cosa significa:** BATCH-01 notifica i consensi alle ASR. Va confermato che si usa **SRV-03** per le acquisizioni e **SRV-04** per revoche/annullamenti (non SRV-01, che è in ingresso), e i nomi esatti dei campi. **Come si chiude:** CSI conferma operazioni e tracciato del WSDL.

### 🟠 Chi crea le credenziali dei nuovi sistemi (SEC-03)
**Cosa significa:** ogni sistema esterno ha un suo `client_id`; va deciso chi lo crea e chi riempie la tabella che lo collega all'ente. **Come si chiude:** si concorda la procedura di onboarding.

### 🟠 Cos'è "LIS" e come si integra (INT-03)
**Cosa significa:** "LIS" compare come terzo canale di acquisizione ma non è chiaro l'acronimo né come funziona. **Come si chiude:** CSI scioglie l'acronimo e dà le specifiche.

### 🟠 Accesso ai componenti grafici QUASAR (INT-04)
**Cosa significa:** QUASAR è la libreria UI di riferimento del CSI. **Come si chiude:** CSI dà accesso al repository.

### 🟠 Registrazione dei profili su PUA (ID-02)
**Cosa significa:** l'app di Back Office va registrata sul Configuratore con i due profili operatore. **Come si chiude:** CSI esegue la registrazione.

---

## 5. Punti tecnici da chiarire o comunicare

### 🟠 Ogni quanto gira BATCH-02? (BAT-02 / frequenza)
**Cosa significa:** il processo che gestisce le informative scadute: l'ipotesi è "una volta al giorno, notturno", da confermare. **Come si chiude:** CSI conferma la cadenza.

### 🟠 Da quale informativa si legge "annulla_consensi"? (SC67)
**Cosa significa:** quando un'informativa scade, il flag che decide se i consensi diventano "annullati" o solo "scaduti" va letto dall'informativa **scaduta** o dalla **nuova**? Nel documento i due punti (§6.13 e §7.2) al momento non concordano. **Come si chiude:** CSI/approfondimento tecnico stabilisce la regola e si uniforma il testo.

### 🟠 Le ASR sanno che "SCADUTO" cambia significato? (BAT-03)
**Cosa significa:** nel nuovo sistema lo stato SCADUTO scatta in un momento diverso (asincrono). Le ASR che leggono questi dati devono adeguarsi. **Come si chiude:** confermare che CSI lo comunica alle ASR.

### 🟡 Prestazioni e lista delle ASR (GOV-04 / API-04 / API-05)
**Cosa significa:** servono i target di prestazione (tempi di risposta, carico) e l'elenco delle ASR coinvolte con i referenti tecnici. **Come si chiude:** CSI fornisce SLA e lista ASR.

---

## In sintesi: come si chiudono

Quasi tutti i punti si chiudono in **tre modi**:

1. **CSI ci dà un accesso o una risorsa** (database, repository, credenziali) → richiesta formale.
2. **CSI ci dà documentazione tecnica** (metadata GASP, WSDL AURA/Deleghe, URL e firma token) → consegna documenti.
3. **CSI/Regione prende una decisione** (variante snapshot, scope, deroghe sul SRS) → si decide in riunione e si verbalizza.


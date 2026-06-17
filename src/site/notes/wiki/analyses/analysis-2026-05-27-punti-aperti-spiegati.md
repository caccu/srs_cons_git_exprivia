---
{"dg-publish":true,"permalink":"/wiki/analyses/analysis-2026-05-27-punti-aperti-spiegati/","title":"Punti Aperti — Spiegati in Modo Semplice","tags":["punti-aperti","csi-piemonte","guida-semplice","sprint-0","da-chiedere"],"dg-note-properties":{"title":"Punti Aperti — Spiegati in Modo Semplice","type":"analysis","tags":["punti-aperti","csi-piemonte","guida-semplice","sprint-0","da-chiedere"],"created":"2026-05-27","updated":"2026-06-17","sources":["2026-03-02-conspref-srs-v1-revised","2026-03-02-domande-srs-csi-v02"],"related":["[[analysis-2026-05-14-punti-aperti-csi|Punti Aperti da Chiedere a CSI Piemonte — Tracker Unificato]]","[[analysis-2026-05-06-checklist-avvio-progetto|Checklist Avvio Progetto — Gestione Consensi]]","[[gasp-salute|GASP Salute]]","[[batch-processes|Processi Batch — BATCH-01, BATCH-02, BATCH-03]]","[[sicurezza-cdu-15-16|Sicurezza CDU-15-16 — Modello Autorizzazione per Ente]]"]}}
---


# Punti Aperti — Spiegati in Modo Semplice

Questa è la versione "in parole povere" del [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|tracker tecnico dei punti aperti]]. Per ogni domanda ancora senza risposta spiega: **cosa significa**, **perché blocca**, **come si chiude**.

I punti aperti sono 38 in totale. Quasi tutti dipendono da una risposta o da un accesso che deve dare **CSI Piemonte**. Finché non arrivano, certe parti dello sviluppo non possono partire.

**Cosa vuol dire la priorità:**
- 🔴 **Critico** — serve subito, blocca la partenza (Giorno 1 / Sprint 0)
- 🟠 **Alto** — blocca gli sprint 2–3
- 🟡 **Moderato** — serve prima del collaudo o del go-live
- ⚪ **Aperto** — utile ma non blocca

---

## I 10 punti critici (da sbloccare per primi)

Questi sono i "tappi" iniziali. Senza, lo sviluppo vero non parte.

### 🔴 Come fanno login i cittadini e gli operatori? (GASP Salute — ID-01)
**Cosa significa:** GASP Salute è il sistema regionale che gestisce l'accesso con SPID/CIE. Per integrarlo dobbiamo sapere con che "linguaggio" parla: due standard possibili, **OIDC** oppure **SAML2**. Sono diversi e richiedono codice diverso.
**Perché blocca:** senza saperlo non possiamo scrivere la pagina di login, che è il punto d'ingresso di tutta l'applicazione.
**Come si chiude:** CSI ci dà la documentazione tecnica di GASP Salute (protocollo, indirizzi degli endpoint, esempio di flusso).

### 🔴 Dove sta il database? (DBaaS Nivola DEV — INF-01)
**Cosa significa:** Nivola è il cloud regionale; il database non ce lo creiamo noi, lo fornisce CSI tramite una richiesta formale ("scheda di provisioning"). DEV = ambiente di sviluppo.
**Perché blocca:** senza database non si può sviluppare né testare niente.
**Come si chiude:** Exprivia compila e invia la scheda di provisioning; CSI/Nivola crea l'istanza PostgreSQL 17.

### 🔴 Database di produzione (DBaaS Nivola PROD — INF-02)
**Cosa significa:** stessa cosa di sopra, ma per l'ambiente reale dove gireranno gli utenti veri.
**Perché blocca:** serve per il go-live; ha tempi di consegna lunghi, meglio chiederlo presto.
**Come si chiude:** seconda scheda di provisioning a CSI/Nivola.

### ✅ Chi ci crea lo scheletro del progetto? (Automation CSI — INF-03) — CHIUSO (verbale 11/06/2026)
**Risposta:** Skeleton in carico a **Exprivia** (ambiente IaaS, non ECaaS). Exprivia crea autonomamente la struttura di progetto; confronto sul POM con CSI per allineamento su standard maven/Helm.
**Come si chiude:** ✅ Già definito — INF-03 chiuso.

### 🔴 Chi è responsabile della migrazione del database? (CONSPREF-DMP — GOV-03)
**Cosa significa:** il vecchio sistema gira su PostgreSQL 9, il nuovo su PostgreSQL 17 — 8 versioni di salto. Serve un piano scritto di migrazione dati (il "DMP"). Oggi non esiste e non si sa chi lo deve scrivere lato CSI.
**Perché blocca:** è un'attività rischiosa; senza un responsabile chiaro resta in sospeso fino alla fine, quando è troppo tardi.
**Come si chiude:** CSI nomina un referente; si concorda chi redige il CONSPREF-DMP.

### 🔴 Indirizzo del server che rilascia i "permessi" per i servizi (SEC-01 / API-01)
**Cosa significa:** i servizi esterni (le ASR) che chiamano le nostre API devono prima farsi dare un token. Questo token lo rilascia un "Authorization Server" di CSI. Ci serve il suo indirizzo (test e produzione).
**Perché blocca:** senza, nessun test di integrazione con i sistemi esterni è possibile.
**Come si chiude:** CSI comunica gli URL dell'Authorization Server.

### 🔴 Come è firmato il token? (SEC-02)
**Cosa significa:** il token va verificato controllandone la firma digitale. Dobbiamo sapere con quale algoritmo è firmato (es. RS256 o ES256) e dove scaricare le chiavi pubbliche per verificarlo (l'URL "JWKS").
**Perché blocca:** senza non possiamo validare i token in arrivo, quindi non possiamo proteggere le API.
**Come si chiude:** CSI indica algoritmo di firma + URL del JWKS.

### 🔴 Lo snapshot blocca o no le scritture? (CDU-17 — PULL-01)
**Cosa significa:** per allineare un nuovo ente serve una "foto" coerente dei consensi. Due modi: **6.A** ferma un attimo le acquisizioni mentre fa la foto (più semplice, ma c'è un microstop); **6.B** non ferma niente e usa una marca temporale (più complesso, zero stop).
**Perché blocca:** è una scelta di architettura: cambia come scriviamo il codice del recupero dati.
**Come si chiude:** CSI/Regione sceglie la variante preferita.

### 🔴 Come avvisiamo il sistema esterno quando la foto è pronta? (CDU-17 — PULL-02)
**Cosa significa:** finito lo snapshot bisogna avvisare il sistema esterno (SIA) che può venirsi a prendere i dati. Solo email? Oppure anche un "webhook" (chiamata automatica) configurabile per ogni ASR?
**Perché blocca:** definisce un pezzo dell'interfaccia con gli enti esterni.
**Come si chiude:** CSI dice quale canale di notifica vuole.

---

## Sicurezza delle API (chi può chiamarci e cosa)

### 🟠 Chi crea le credenziali dei nuovi sistemi? (SEC-03)
**Cosa significa:** ogni sistema esterno autorizzato ha un suo `client_id`. Va deciso chi lo crea e chi riempie la tabella che collega quel client all'ente che rappresenta.
**Come si chiude:** si concorda con CSI la procedura di "onboarding" di un nuovo SIA.

### 🟠 Quanto dura un token? (SEC-04)
**Cosa significa:** il token d'accesso scade dopo un po'. Quanto? (proposta nostra: 1 ora) E come si rinnova?
**Come si chiude:** CSI conferma la durata e la politica di rinnovo.

### 🟠 Quali "permessi" esistono? (SEC-05 / API-02 / PULL-03)
**Cosa significa:** uno "scope" è l'etichetta che dice cosa un token può fare (es. `consensi:read` = solo lettura, `consensi:snapshot` = recupero massivo). Li definisce CSI o li scegliamo noi?
**Come si chiude:** si concorda la lista degli scope in un'unica chiacchierata (questi tre punti sono lo stesso tema).

### 🟡 Cosa succede se una credenziale viene rubata? (SEC-06)
**Cosa significa:** serve una procedura per disattivare credenziali compromesse (lista nera? rotazione periodica?).
**Come si chiude:** CSI definisce la politica di revoca.

---

## Recupero dati massivo per i nuovi enti (CDU-17, sostituisce BATCH-03)

### 🟡 Quanti record per pagina? (PULL-04 / API-03)
**Cosa significa:** i dati si scaricano "a pagine". Quanto grande può essere una pagina? Si può regolare per ogni ASR?
**Come si chiude:** CSI indica il valore massimo accettabile.

### 🟡 Teniamo la vecchia modalità come riserva? (PULL-05)
**Cosa significa:** la vecchia idea (export con un po' di downtime) va tenuta come fallback retrocompatibile?
**Come si chiude:** decisione condivisa CSI/Exprivia.

### 🟠 BATCH-03 si cancella o si segna come superato? (PULL-06)
**Cosa significa:** dato che CDU-17 sostituisce BATCH-03, nel documento SRS lo togliamo del tutto o lo lasciamo marcato come "deprecato"?
**Come si chiude:** decisione editoriale sul SRS, da confermare con CSI.

### 🟡 Come si conferma che l'allineamento è finito? (PULL-07)
**Cosa significa:** quando il sistema esterno ha finito di scaricare, ce lo dice con una chiamata di conferma? Oppure lo capiamo da soli con un timeout?
**Come si chiude:** si concorda il meccanismo di conferma.

---

## Documenti OpenAPI (il "contratto" delle API verso le ASR)

### 🟡 Quanto devono essere veloci le API? (API-04)
**Cosa significa:** servono target di prestazione (tempo di risposta, quante richieste al secondo) per i servizi CDU-15/16.
**Come si chiude:** CSI fornisce gli SLA; serve prima del collaudo.

### 🟠 Quali ASR sono coinvolte e chi sono i referenti? (API-05 / GOV-05)
**Cosa significa:** dobbiamo sapere l'elenco delle aziende sanitarie che useranno le API e con chi parlare tecnicamente in ognuna.
**Come si chiude:** CSI fornisce lista ASR + nomi dei referenti tecnici.

---

## Batch e servizi SOAP (notifiche verso le ASR)

### 🟡 Quale operazione del WSDL usa BATCH-01? (BAT-01)
**Cosa significa:** BATCH-01 notifica i consensi alle ASR via SOAP. C'è ambiguità su quale operazione del contratto WSDL chiamare (una in ingresso o una in uscita). Sbagliarla è un errore implementativo grave.
**Come si chiude:** CSI conferma l'operazione WSDL corretta.

### 🟠 Come storicizza i consensi BATCH-02? (BAT-02 / SC67)
**Cosa significa:** quando un'informativa scade/viene annullata, BATCH-02 deve registrare lo storico dei consensi. La logica esatta nel SRS è ancora segnata "da verificare meglio".
**Come si chiude:** approfondimento tecnico interno + verifica con CSI prima di chiudere il SRS.

### 🟠 Le ASR sanno che "SCADUTO" cambia significato? (BAT-03)
**Cosa significa:** nel nuovo sistema lo stato SCADUTO scatta in un momento diverso rispetto al vecchio. Le ASR che leggono questi dati devono adeguare la loro logica.
**Come si chiude:** confermare che CSI comunica il cambiamento alle ASR.

---

## Integrazioni con altri sistemi

### 🟠 Documentazione tecnica di AURA (INT-01)
**Cosa significa:** AURA è l'anagrafe regionale per cercare i pazienti. Ci serve il suo WSDL (l'elenco dei servizi disponibili).
**Come si chiude:** CSI consegna il WSDL di AURA.

### 🟠 Documentazione tecnica di Gestione Deleghe (INT-02)
**Cosa significa:** serve il WSDL del servizio che gestisce le deleghe (chi può agire per conto di chi).
**Come si chiude:** CSI consegna il WSDL di Gestione Deleghe.

### 🟠 Cos'è "LIS" e come ci si integra? (INT-03)
**Cosa significa:** nei documenti compare "LIS" come terzo canale di acquisizione consensi, ma non è chiaro cosa sia l'acronimo né come funziona l'integrazione.
**Come si chiude:** CSI scioglie l'acronimo e fornisce le specifiche.

### 🟠 Accesso ai componenti grafici QUASAR (INT-04)
**Cosa significa:** QUASAR è la libreria di componenti UI di CSI da usare come riferimento per il frontend.
**Come si chiude:** CSI dà accesso al repository QUASAR.

### 🟡 Due "notificatori" diversi (INT-05)
**Cosa significa:** nel SRS vanno distinti chiaramente il "Notificatore di Deleghe" e il "Notificatore UNP" — sono due cose diverse, oggi si rischia di confonderle.
**Come si chiude:** correzione formale nel testo del SRS.

---

## Infrastruttura e architettura

### 🟠 Il diagramma dell'architettura è quello giusto? (INF-04)
**Cosa significa:** esiste un diagramma con un nodo "API Gateway", ma CSI ha confermato che NON si usa un API Gateway. Va allineato.
**Come si chiude:** concordare con CSI la versione definitiva del diagramma e togliere il nodo in conflitto.

---

## Governance e approvazioni

### 🟠 Approvazione formale del SRS V1.0 (GOV-01)
**Cosa significa:** dopo aver recepito tutte le risposte di CSI, il documento dei requisiti (SRS) va approvato ufficialmente.
**Come si chiude:** CSI firma/approva la bozza v2 del SRS.

### 🟠 Validazione delle nostre proposte [PROPOSTA] (GOV-02)
**Cosa significa:** nel SRS abbiamo inserito alcune proposte nostre (gestione tentativi BATCH-01, scope PDF del CDU-06, le 10 proposte evolutive del cap. 8.4). Vanno validate da CSI.
**Come si chiude:** CSI conferma o corregge le proposte marcate [PROPOSTA].

### 🟡 Prestazioni e affidabilità richieste (GOV-04)
**Cosa significa:** servono i requisiti non-funzionali: tempo di risposta massimo, capacità di carico, percentuale di disponibilità (es. 99,x%).
**Come si chiude:** CSI fornisce gli SLA/NFR; serve prima del collaudo.

---

## Identità e profili (resto)

### 🟠 Registrazione dei profili operatore su PUA (ID-02)
**Cosa significa:** l'app va registrata sul Configuratore Regionale (PUA) con due profili: Operatore Sanitario-Amm. e Back Office.
**Come si chiude:** CSI esegue/abilita la registrazione.

### 🟠 Credenziali IRIS per AURA in DEV (ID-03)
**Cosa significa:** per chiamare AURA in sviluppo servono credenziali IRIS dedicate.
**Come si chiude:** CSI fornisce le credenziali per l'ambiente DEV.

---

## In sintesi: come si chiudono

Quasi tutti i punti si chiudono in **tre modi**:

1. **CSI ci dà un accesso o una risorsa** (database, repository, credenziali, automation) → si chiude con una richiesta formale.
2. **CSI ci dà una documentazione tecnica** (GASP Salute, WSDL AURA/Deleghe, URL e firma dei token) → si chiude con consegna documenti.
3. **CSI/Regione prende una decisione** (variante snapshot, scope, scelte sul SRS) → si chiude in riunione e si verbalizza nel SRS.

**Prossimo passo concreto:** usare la lista dei 10 punti critici qui sopra come ordine del giorno della prossima riunione con CSI. Vedi anche la [[wiki/analyses/analysis-2026-05-06-checklist-avvio-progetto\|Checklist Avvio Progetto]] per le azioni operative del Giorno 1.

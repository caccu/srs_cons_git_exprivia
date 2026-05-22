---
{"dg-publish":true,"permalink":"/raw/conspref-srs-v1-0-revised-bozza-v2/","dg-note-properties":{}}
---


# SPECIFICA DEI REQUISITI DEL SISTEMA

Sistema: Gestione Consensi
Codice Documento: CONSPREF-SRS-V1.0
VERIFICHE E APPROVAZIONI

| REDAZIONE | CONTROLLO | AUTORIZZAZIONE | APPROVAZIONE | EMISSIONE |
| --- | --- | --- | --- | --- |
| NOME | DATA | NOME | DATA | NOME |
| Marco Forneris | 02/03/2026 |  |  |  |
| Exprivia S.p.A. |  |  |  |  |

STATO DELLE VARIAZIONI

| VERS. | PARAGRAFO O PAGINA | DESCRIZIONE DELLA VARIAZIONE |
| --- | --- | --- |
| 1.0 | Tutto il documento | Prima emissione. |

Sommario

## 1. Scopo e riferimenti del documento


### 1.1 Scopo del documento

[DOC] Lo scopo del presente documento è definire i requisiti funzionali e non funzionali per il rifacimento dell'applicativo Gestione Consensi della Regione Piemonte. Il sistema ha l'obiettivo di gestire il ciclo di vita completo dei consensi sanitari espressi dai cittadini, in conformità con la normativa vigente, fornendo interfacce dedicate per cittadini, operatori sanitari/amministrativi e operatori di back office.
[DEDOTTO] Questo documento servirà come riferimento principale per le fasi di progettazione, sviluppo, e collaudo del nuovo applicativo, assicurando che il prodotto finale sia allineato alle esigenze del committente e alle specifiche tecniche concordate.

### 1.2 Riferimenti


| ID | Documento | Versione | Descrizione |
| --- | --- | --- | --- |
| [1] | CONSPREF-SRS-01-V03 - Requisiti Gestione Consensi.docx | 03 | Documento principale dei requisiti (versione aggiornata) per il rifacimento della Gestione Consensi. |
| [2] | Conspref_new20240806.zip | N/A | Archivio contenente la proposta di struttura del database. |
| [3] | piletecnologiche.pdf | N/A | Documento ufficiale CSI Piemonte sulle pile tecnologiche approvate e il loro piano di evoluzione. |
| [4] | P18-004-SFU-StudioFunzionale-GestioneConsensiSoL-V1.7.pdf | 1.7 | Studio Funzionale dell'applicativo Gestione Consensi AS-IS (2019). |
| [5] | ACC-DEL-CDU-01-V01ServiziAcquisizioneConsensi.pdf | 01 | Specifica dei Casi d'Uso dei servizi di acquisizione consensi AS-IS (2019). |
| [6] | Specifica-WebService_ConsensoRegionaleAziendale_v03(1).pdf | 03 | Specifica tecnica dei Web Service per l'interoperabilità AS-IS (2019). |
| [7] | CONSPREF-DMP (Data Migration Plan) | x | Piano di migrazione dati da PostgreSQL 9 a PostgreSQL 17 – da redigere |


### 1.3 Glossario


| Termine | Significato |
| --- | --- |
| AgID | Agenzia per l’Italia Digitale. |
| ASR | Azienda Sanitaria Regionale. |
| AURA | Anagrafe Unica Regionale degli Assistiti. Sistema anagrafico di riferimento per i cittadini piemontesi. [DOC] |
| CDU | Caso d’Uso (Use Case). |
| CIE | Carta d'Identità Elettronica. [DEDOTTO] |
| ECaaS | Enterprise Container as a Service. Piattaforma di containerizzazione del CSI Piemonte. [DOC] |
| FSE | Fascicolo Sanitario Elettronico. [DOC] |
| INI | Infrastruttura Nazionale per l'Interoperabilità. [DEDOTTO] |
| PUA | Punto Unico di Accesso. Sistema di accesso centralizzato per gli operatori della PA. [DOC] |
| ROL | Ritiro On Line. Tipologia di consenso specifico per il ritiro online dei referti. [DOC] |
| RUPAR/ IRIDE | Credenziali di accesso al sistema PUA per gli operatori. [DOC] |
| SIA | Sistema Informativo Aziendale (di una ASR). [DOC] |
| SIR | Sistema Informativo Regionale. [DOC] |
| SoL | Servizi on Line. [DOC] |
| SPID | Sistema Pubblico di Identità Digitale. [DOC] |
| SRS | Software Requirements Specification (Specifica dei Requisiti del Sistema). |
| **SistemaTS**** ** | Sistema Tessera Sanitaria |
| **DBaaS**** ** | Database as a Service |
| **UNP ** | User Notification Platform |


## 2. Contesto


### 2.1 Descrizione del Contesto

[DOC] L'applicativo Gestione Consensi si inserisce nell'ecosistema della Sanità Elettronica della Regione Piemonte come strumento centrale per la raccolta, la gestione e la consultazione dei consensi espressi dagli assistiti. Il sistema è progettato per gestire diverse tipologie di consenso, che si articolano su più livelli [1]:
- *Consenso Nazionale*: Ha validità su tutto il territorio nazionale e si applica a normative centralizzate, come ad esempio il consenso all'apertura e alla consultazione del Fascicolo Sanitario Elettronico (FSE), la cui gestione è centralizzata attraverso l'Infrastruttura Nazionale per l'Interoperabilità (INI).
- *Consenso Regionale*: Ha validità sull'intero territorio regionale e si applica a iniziative trasversali come la stratificazione dei dati sanitari per la medicina d'iniziativa, la presa in carico in programmi di gestione della cronicità o l'adesione a reti di patologia (es. rete oncologica).
- *Consenso Aziendale (ASR)*: Ha validità limitatamente a una specifica Azienda Sanitaria Regionale e copre casistiche come il consenso al trattamento dei dati personali per il Dossier Clinico, il consenso informato per specifiche prestazioni o il consenso al Ritiro On Line (ROL) dei referti.
[DEDOTTO] L’aggiornamento dell'applicativo mira a modernizzare la piattaforma tecnologica, ad allinearla alle nuove linee guida di sviluppo e sicurezza, e a introdurre le nuove funzionalità specificate nel documento dei requisiti [1], garantendo al contempo l'interoperabilità con i sistemi informativi aziendali (SIA) delle ASR e con i servizi centrali della Regione.

### 2.2 Modello del contesto

[DOC] I seguenti diagrammi, derivati dal documento dei requisiti [1], illustrano il modello del contesto in cui opera l'applicativo Gestione Consensi, evidenziando i principali flussi di interazione tra gli attori e i sistemi.
Figura 1: Flusso di espressione e notifica dal sistema regionale alle ASR
Figura 2: Flusso di espressione e notifica da ASR al sistema regionale

### 2.3 Profili applicativi

[DOC] Il sistema prevede tre profili utente principali, ciascuno con specifiche modalità di accesso e un set definito di funzionalità.

| Profilo | Descrizione | Modalità di Accesso |
| --- | --- | --- |
| Cittadino | L'assistito della Regione Piemonte che accede al servizio per gestire i propri consensi o quelli di un soggetto per cui ha una delega attiva (es. figlio minore, tutelato). | Accesso diretto alla Web App tramite credenziali di identità digitale SPID o CIE. Non utilizza il PUA. |
| Operatore Sanitario/Amministrativo | Personale che opera presso i Punti di Servizio Assistito (es. sportelli ASL) e che necessita di gestire i consensi per conto dei cittadini che si recano fisicamente presso gli sportelli. | Accesso all'applicazione di Back Office tramite il Punto Unico di Accesso (PUA) con credenziali RUPAR/IRIDE. |
| Operatore di Back Office | Personale con privilegi amministrativi che ha il compito di configurare e manutenere le anagrafiche del sistema (tipologie di consenso, informative, enti, endpoint). | Accesso all'applicazione di Back Office tramite il Punto Unico di Accesso (PUA) con credenziali RUPAR/IRIDE. |

[DEDOTTO] Per gli operatori che accedono tramite PUA, il sistema riceverà l'elenco delle funzionalità a cui l'utente è abilitato e adatterà dinamicamente l'interfaccia utente per mostrare solo le sezioni e le operazioni pertinenti al suo profilo.
**Gestione dei profili e ruolo del Configuratore Regionale**
L'accesso al sistema è differenziato per tipo di attore e canale applicativo. Il Cittadino accede alla Web App pubblica tramite autenticazione diretta con credenziali di identità digitale SPID o CIE, gestite dal rispettivo Identity Provider nazionale. Non è previsto alcun intermediario di profilazione per questo profilo.
L'Operatore Sanitario/Amministrativo e l'Operatore di Back Office accedono alla Web App di Back Office tramite il Punto Unico di Accesso (PUA) con credenziali RUPAR/IRIDE. La profilazione delle funzionalità disponibili è delegata al Configuratore Regionale, il sistema centralizzato del CSI Piemonte che censisce le applicazioni e i profili degli operatori abilitati.
Affinché la Web App di Back Office sia visibile e raggiungibile dal PUA, l'applicazione deve essere registrata sul Configuratore come applicazione abilitata. Devono essere creati sul Configuratore i seguenti due profili distinti per l'applicazione Gestione Consensi BackOffice:
Profilo Operatore Sanitario/Amministrativo — abilita la sezione di gestione del consenso per conto di un assistito (CDU-07 - CDU-11).
Profilo Operatore di Back Office — abilita le sezioni di configurazione delle anagrafiche: tipo consenso, informativa, ente ed endpoint (CDU-12 - CDU-14).
A seguito dell'autenticazione tramite PUA, il sistema invoca il servizio **getTokenInformation2 **per leggere il profilo dell'operatore autenticato e adatta dinamicamente l'interfaccia, mostrando esclusivamente le sezioni e le funzionalità per cui l'operatore è abilitato. Un operatore può essere abilitato a entrambi i profili contemporaneamente.
**NOTA IMPLEMENTATIVA** — L'integrazione con il Configuratore Regionale e il PUA è un prerequisito infrastrutturale del progetto. Prima del go-live è necessario:
Registrare l'applicazione Gestione Consensi BackOffice sul Configuratore con i due profili sopra indicati.
Verificare che il servizio getTokenInformation2 restituisca correttamente i profili abilitati per ciascun operatore.
Implementare nel Backend la lettura dinamica del profilo ricevuto dal PUA per il controllo degli accessi alle API.

## 3. Architettura


### 3.1 Vista di sintesi

[DEDOTTO] L'architettura del nuovo applicativo Gestione Consensi è concepita secondo un moderno paradigma a microservizi, con una netta separazione tra il livello di presentazione (frontend) e il livello di logica di business e accesso ai dati (backend). L'intera soluzione sarà ospitata sull'infrastruttura Cloud del CSI Piemonte (Nivola) e orchestrata tramite la piattaforma di containerizzazione ECaaS (Enterprise Container as a Service), basata su Kubernetes.
[PROPOSTA] Questa scelta architetturale garantisce scalabilità, manutenibilità, resilienza e un'evoluzione tecnologica indipendente dei singoli componenti, in linea con le più recenti direttive di sviluppo [3].

### 3.2 Modello architetturale

[PROPOSTA] Il modello architetturale si basa su tre componenti principali che interagiscono tra loro tramite protocolli standard.
- Frontend Layer: Un'unica Single Page Application (SPA) sviluppata in Angular, servita da un web server Apache, che presenta interfacce differenziate per il profilo Cittadino e per i profili Operatore.
- Backend Layer: Un insieme di servizi RESTful sviluppati con Spring Boot 3, che implementano la logica di business e gestiscono le interazioni con il database e i sistemi esterni. E’** stato confermato che il progetto non adotterà l'API Gateway centralizzato del CSI Piemonte come punto d'ingresso esterno.** L'architettura adotta un modello di **integrazione diretta**: le chiamate HTTP provenienti dal Frontend Angular vengono instradate direttamente ai Servizi Backend Spring Boot 3, senza intermediari gateway esterni al progetto. La sicurezza delle API (autenticazione e autorizzazione) è interamente gestita a livello applicativo tramite **Spring Security**, configurato come filtro sul Backend. Per i servizi esposti verso i sistemi SIA (CDU-15 e CDU-16), il contratto formale è definito tramite specifica **OpenAPI**** 3.x (Swagger)**, come descritto nella sezione seguente.
- Data Layer: Un database PostgreSQL che funge da persistence layer per l'intera applicazione.

### 3.3 Componenti software

[DEDOTTO] I principali componenti software che costituiscono la soluzione sono:
- Web Application Frontend: Realizzata come Single Page Application con il framework Angular. Questo componente è responsabile di tutta l'interazione con l'utente, della validazione dei dati di input e della comunicazione con i servizi backend tramite chiamate API REST.
- Non è disponibile un UI Kit o una Component Library ufficiale e centralizzata del CSI Piemonte (es. basata su Angular Material o Bootstrap). Tuttavia, il CSI Piemonte mette a disposizione una serie di **componenti basati su QUASAR Framework** già utilizzati in altri applicativi dell'ecosistema regionale.
- Il team di sviluppo deve adottare i **componenti QUASAR** forniti dal CSI come riferimento per la realizzazione dell'interfaccia grafica, al fine di garantire la maggiore coerenza possibile con gli altri applicativi del portale Salute Piemonte. Il team deve concordare con il referente CSI l'accesso al repository dei componenti QUASAR disponibili prima dell'avvio della fase di sviluppo UI.
- In assenza di un componente QUASAR specifico per un determinato caso d'uso, il team può integrare componenti aggiuntivi del framework **Quasar Framework (****quasar.dev****)**, avendo cura di garantire la conformità con le **Linee Guida di Accessibilità AgID (WCAG 2.1 livello AA)****.**
- Backend API (Servizi REST): Sviluppati con il framework Spring Boot 3, questi servizi implementano tutta la logica applicativa (casi d'uso), gestiscono la sicurezza, l'accesso ai dati sul database PostgreSQL e l'orchestrazione delle chiamate verso i sistemi esterni (AURA, Deleghe, Notificatore, SIA).
- **[DEDOTTO] ****Prerequisiti per l'avvio dei connettori e specifica ****OpenAPI****:**
-       A conferma della scelta di integrazione diretta (senza API Gateway CSI), il contratto formale di interoperabilità con i sistemi SIA si articola su due direttrici distinte:
- Per i servizi REST esposti da Gestione Consensi verso i SIA (CDU-15 e CDU-16), il team di sviluppo è responsabile della produzione della specifica OpenAPI 3.x (Swagger). Il documento deve essere redatto, versionato e consegnato ai sistemi ASR prima del go-live, per consentire loro l'integrazione. La specifica deve rispettare i contenuti minimi descritti di seguito.
- Per le chiamate uscenti di BATCH-01 verso i SIA (notifiche SOAP), il contratto rimane invariato: i servizi delle ASR non cambiano nel TO-BE e il riferimento tecnico è la Specifica-WebService_ConsensoRegionaleAziendale_v03.
- Il documento Swagger deve includere obbligatoriamente le seguenti sezioni:
- **Definizione degli Endpoint**: elenco completo delle risorse esposte, con URL, metodi HTTP (GET, POST, PUT, DELETE), parametri di path ({codice_fiscale}, {codice_ente}), parametri di query opzionali e body delle richieste.
- **Modelli Dati (****Schemas****)**: struttura dettagliata e tipizzata di tutti i payload di request e response in formato JSON (o XML per i servizi SOAP), con indicazione di tipo dato, obbligatorietà (required) e vincoli di validazione (es. minLength, pattern, enum).
- **Standard di Sicurezza (Security ****Schemes****)**: specifica del meccanismo di autenticazione adottato per ciascun endpoint. Per i servizi REST esposti verso i SIA (CDU-15, CDU-16), si adotta **Bearer Token JWT** (OAuth2 Client Credentials), come già indicato nella specifica dei CDU. Per i servizi SOAP verso AURA e Deleghe, il riferimento rimane il WSDL di cui alla 4.2.
- **Gestione Errori**: mapping completo dei codici di stato HTTP restituiti per ogni scenario (200 OK, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error) e struttura standardizzata del payload di errore. **Si adotta il formato RFC 7807 (****Problem**** ****Details**** for HTTP ****APIs****)** per la risposta in caso di errore:
```json
{
"type": "https://gestione-consensi.csi.it/errors/not-found",
"title": "Consenso non trovato",
"status": 404,
"detail": "Nessun consenso trovato per il CF RSSMRA80A01L219X e codice ROL",
"instance": "/api/v1/consensi/RSSMRA80A01L219X/ROL"
}
```
Una volta disponibile il documento Swagger, il team di sviluppo deve:
- Validarne la compatibilità tecnica con lo stack Spring Boot 3.x (es. tramite strumenti come swagger-parser o l'import su Postman).
- Generare automaticamente gli stub dei controller REST tramite **OpenAPI**** Generator** (plugin Maven openapi-generator-maven-plugin), garantendo coerenza tra specifica e implementazione.
- Configurare **SpringDoc**** ****OpenAPI** (springdoc-openapi-starter-webmvc-ui) nel progetto Backend per esporre la documentazione Swagger UI aggiornata a ogni build, accessibile all'indirizzo /swagger-ui.html nei soli ambienti non produttivi.
- **NOTA IMPLEMENTATIVA****:** La specifica OpenAPI (Swagger) dei servizi CDU-15 e CDU-16 è un documento da produrre a cura del team di sviluppo Exprivia. Deve essere redatta prima dell'avvio dello sprint di sviluppo di tali CDU, versionata nel repository di progetto e condivisa formalmente con i referenti dei sistemi SIA delle ASR per consentirne l'integrazione. Per le chiamate uscenti BATCH-01 verso i SIA (protocollo SOAP), non è richiesta alcuna specifica aggiuntiva: il contratto AS-IS rimane valido e invariato.
- Database: Un'istanza di PostgreSQL che ospita il modello dei dati dell'applicazione, come descritto nel Capitolo 8.

### 3.3.1 Integrazione con l'Identity Provider GASP Salute

L'autenticazione del profilo Cittadino tramite SPID e CIE non avviene attraverso un'integrazione diretta con gli Identity Provider nazionali, bensì tramite il servizio centralizzato del CSI Piemonte denominato GASP Salute (Gestione Accessi e Single Sign-On per la Sanità).
GASP Salute agisce come Identity Provider federato del CSI Piemonte e si occupa di:
Federare le identità SPID (livelli 1, 2, 3) e CIE con i servizi del portale Salute Piemonte.
Restituire all'applicazione, al termine dell'autenticazione, l'asserzione con gli attributi dell'utente autenticato (incluso il Codice Fiscale).
Gestire la sessione utente in modo centralizzato.
Implicazioni implementative per il Frontend Angular:
Il frontend deve implementare il flusso di redirect verso GASP Salute per l'autenticazione del Cittadino (analogamente a un flusso OAuth2/OIDC o SAML2, a seconda del protocollo esposto da GASP Salute — dettaglio da definire con il referente CSI in fase di design tecnico).
Non è necessario integrare direttamente SDK degli Identity Provider SPID/CIE: tutta la logica di federazione è incapsulata in GASP Salute.
Il Backend deve validare il token/asserzione ricevuta da GASP Salute prima di procedere con qualsiasi operazione applicativa.
Il team deve richiedere al referente CSI Piemonte la documentazione tecnica aggiornata di GASP Salute (endpoint, protocollo, attributi restituiti) prima dell'avvio della fase di sviluppo dell'autenticazione.

### 3.4 Elenco Framework e Tecnologie

[DOC] In base alle indicazioni del committente e in conformità con il documento ufficiale sulle pile tecnologiche del CSI Piemonte [3], lo stack tecnologico previsto per il rifacimento dell'applicativo è il seguente.

| Componente | Tecnologia/Framework | Versione | Stato Pila CSI (Marzo 2026) |
| --- | --- | --- | --- |
| Infrastruttura | Cloud CSI Nivola (ECaaS) | - | Strategica |
| Orchestrazione | Kubernetes | - | Strategica |
| Web Server | Apache WS k8s | 2.4 | CURRENT |
| Framework Frontend | Angular | 19+ | CURRENT (Stack SPA Angular2/SpringBoot/RESTEasy v.2.1.0) |
| Linguaggio Backend | Java | 17 | AdoptiumTemurinOpenJDK17 - CURRENT |
| Framework Backend | Spring Boot K8S | 3.4.10 (minimo) | CURRENT  (Stack springboot3_k8s_v1.0.0) |
| Database | PostgreSQL — DBaaS Nivola | 17+ (determinata dal catalogo DBaaS al momento del provisioning) | DBaaS Nivola — Scheda provisioning standard |
| Librerie | Open Source | Ultime stabili | Requisito per pubblicazione su Developers Italia |
| Accessibilità | Linee guida AgID | - | Obbligatorio |


---


---


---


### 3.5 Infrastruttura Cloud Native e Linee Guida di Setup

Il progetto non richiede la costruzione ex-novo di uno skeleton applicativo. Il CSI Piemonte fornisce un processo di automation per la generazione della struttura di progetto, della pipeline CI/CD e delle Helm Chart di base, previa descrizione dell'architettura da parte del team. Lo sviluppo deve essere condotto in piena conformità con le Linee Guida Cloud Native per Fornitori v1.0.1 del CSI Piemonte, che disciplinano l'intero ciclo di vita delle componenti containerizzate.

### 3.5.1 Architettura dell'Infrastruttura ECaaS

L'infrastruttura è basata su ECaaS (Enterprise Container as a Service), ospitata su Nivola e orchestrata da Kubernetes. Ogni progetto è collocato in un Namespace dedicato e isolato da un punto di vista di rete dagli altri namespace. I componenti principali dell'infrastruttura sono:
IngressController: esclusivamente di tipo TRAEFIK (non è possibile installare IngressController differenti). Più istanze gestiscono il traffico proveniente da reti diverse (Internet, RUPAR, rete CSI, interoperabilità interna).
Storage: volumi NFS allocati dinamicamente tramite StorageClass CSI Trident (NetApp). Non è possibile utilizzare storage diversi né volumi di tipo host.
Monitoraggio: Prometheus per metriche e alert.
Log: log applicativi centralizzati su stack ELK (ElasticSearch + LogStash + Kibana).
Rete (CNI): Cilium (non è possibile installare CNI differenti). La visibilità di rete è governata da NetworkPolicy gestite centralmente.
Deployment: tramite Helm con processo GitOps. Il cluster osserva il repository di Environment del progetto e, al rilevamento di variazioni sul branch dell'ambiente corrispondente, esegue automaticamente il rollout. La chart di progetto deve includere come dipendenze le chart CSI delle tecnologie utilizzate; non è possibile dispiegare chart esterne.
**Vincoli architetturali obbligatori:**
Non è possibile installare software a livello di Cluster (es. nuovi IngressController); eventuali esigenze devono essere concordate in anticipo con l'area Architetture e Nivola Ingegneria.
Non è possibile installare soluzioni quali **KNative**, **Istio** o soluzioni di Network Mesh.
Ogni Deployment deve avere specificate le **risorse minime e massime richieste** al sistema (requests e limits).
Ogni Deployment deve prevedere **health check** (livenessProbe) e **readiness**** check** (readinessProbe) con tempistiche congrue.

### 3.5.2 Registry Immagini Docker

Il cluster rigetta qualsiasi immagine proveniente dall'esterno. Tutte le immagini utilizzate devono essere ospitate sul Registry Artifactory aziendale e devono rientrare in uno dei seguenti registry:

| **Registry** | **Scopo** | **Endpoint** |
| --- | --- | --- |
| docker-trusted | Immagini pubbliche ritenute adeguate, importate as-is | docker-trusted.ecosis.csi.it |
| docker-base | Immagini personalizzate CSI Piemonte per standard interni e sicurezza | docker-base.ecosis.csi.it |
| docker-projects | Immagini generate dalla pipeline CI del progetto | Artifactory progetto |

Per il progetto **Gestione Consensi**, le immagini di riferimento da utilizzare sono:
**Backend Spring Boot**: immagine reference/spring-boot da docker-base
**Frontend**** ****Angular**: immagine angular da docker-base
**Web Server**: immagine httpd_csi da docker-base
Per eventuali esigenze non coperte dall'elenco corrente, è necessario richiedere una nuova immagine scrivendo a: architetture_ai@csi.it.
Le immagini create devono includere le label standard **OpenContainers**** Foundation** obbligatorie, tra cui: org.opencontainers.image.created, org.opencontainers.image.authors, org.opencontainers.image.version, org.opencontainers.image.source, org.opencontainers.image.title, org.opencontainers.image.description.
Il Dockerfile deve essere costruito seguendo i principi di minimalizzazione dei layer (RUN raggruppati), utilizzo di **multi-stage build** (build Maven nello stage di build, copia del solo artefatto JAR nello stage finale), e indicazione esplicita delle versioni di ogni pacchetto installato per garantire la riproducibilità della build.

### 3.5.3 Catalogo Helm Chart

Il dispiegamento deve essere realizzato esclusivamente tramite le Chart CSI disponibili sul catalogo Artifactory:

| **Registry** | **Scopo** |
| --- | --- |
| helm-base | Chart base CSI, conformi all'infrastruttura ECaaS |
| helm-projects | Chart specifiche del progetto, generate dalla pipeline CI |

Le Chart disponibili nel catalogo CSI rilevanti per questo progetto sono: **springboot** (per il backend) e **httpd** (per il web server Apache). La chart di progetto dovrà includere queste come dipendenze.

### 3.5.4 Pipeline CI/CD

La pipeline è automatizzata tramite GitLab + Jenkins. Ad ogni push o tag push su GitLab:
Jenkins recupera il Dockerfile e il contesto di build dal repository.
Esegue la build dell'immagine e la pubblica su Artifactory (docker-projects).
Esegue l'analisi del Dockerfile per la conformità alle linee guida.
SonarQube viene automaticamente attivato per l'analisi della qualità del codice (report consultabili su sonarqube.csi.it).
Il processo GitOps rileva la variazione nel repository di Environment e procede al rollout automatico sull'ambiente corrispondente.
Tagging delle immagini di progetto: Il tag dell'immagine deve seguire il versioning del progetto. Il tag assegnato su GitLab viene utilizzato come tag dell'immagine su Artifactory.

### 3.5.5 Accesso alla Piattaforma Cloud Native

Per accedere alla piattaforma è necessaria una utenza di posta CSI. I consulenti devono:
Installare autonomamente la Rancher CLI.
Scaricare il file kubeconfig dall'indirizzo fornito dal referente CSI.
All'esecuzione di kubectl selezionare l'opzione OpenLDAPProvider e inserire le credenziali di posta.
La console web è accessibile all'indirizzo: nivola-rancher2.nivolapiemonte.it (Login with OpenLDAP).

### 3.5.6 Provisioning del Database: DBaaS Nivola

E’ stato confermato che il progetto Gestione Consensi non utilizzerà un'istanza PostgreSQL containerizzata all'interno del namespace ECaaS (né tramite Helm Chart CSI dedicata, né tramite operatore Kubernetes come CloudNativePG o Zalando Postgres Operator). Il cluster ECaaS non dispone di tali operatori installati a livello cluster, né è consentita la loro installazione autonoma da parte del fornitore, in conformità con i vincoli architetturali descritti al 3.5.1.
Il database PostgreSQL per il progetto è erogato come servizio gestito (DBaaS — Database as a Service) dall'infrastruttura Nivola del CSI Piemonte, lato account Nivola, ed è quindi una risorsa esterna al namespace ECaaS del progetto ma raggiungibile da esso tramite rete interna Nivola.
**Modello di provisioning:**
Il provisioning dell'istanza PostgreSQL avviene tramite scheda di provisioning standard da richiedere formalmente al team Nivola/CSI. La scheda deve contenere le seguenti informazioni minime:
Nome progetto
Ambiente di destinazione (DEV / TEST / PROD) — un'istanza separata per ciascun ambiente
Versione PostgreSQL richiesta (17 o versione disponibile nel catalogo DBaaS al momento della richiesta)
Dimensionamento stimato: storage (GB), numero massimo di connessioni applicative concorrenti, RAM richiesta
Nome del database applicativo (es. gestione_consensi)
Utenza applicativa richiesta (es. cons_app_user) con ruoli di lettura/scrittura sullo schema applicativo; separata dall'utenza DBA
Caratteristiche operative del DBaaS Nivola:
Il ciclo di vita del database (backup periodici, patching del motore PostgreSQL, high availability) è gestito interamente dal team Nivola: il fornitore non ha accesso diretto all'infrastruttura di storage o agli script di backup.
Il team di sviluppo deve definire, in accordo con il referente CSI/Nivola, le politiche di retention dei backup (es. backup giornaliero con retention 7 giorni, settimanale con retention 4 settimane) e gli obiettivi di ripristino (RTO e RPO) in linea con i requisiti di continuità operativa del progetto.
Al termine del provisioning, Nivola fornisce al team una stringa di connessione JDBC nella forma:
```
jdbc:postgresql://<host-dbaas-nivola>:<porta>/gestione_consensi
```
**Implicazioni implementative:**
La stringa di connessione JDBC (hostname, porta, nome database), le credenziali dell'utenza applicativa (username e password) e qualsiasi segreto di connessione al database non devono mai essere inseriti nel codice sorgente né nel repository Git. Devono essere iniettati a runtime tramite Kubernetes Secret nel deployment Spring Boot, referenziato nella Helm Chart di progetto come variabile d'ambiente SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, SPRING_DATASOURCE_PASSWORD.
Il pool di connessioni Spring Boot (HikariCP, incluso di default in Spring Boot 3.x) deve essere configurato in modo coerente con il numero massimo di connessioni autorizzato sull'istanza DBaaS. A titolo indicativo, per un'istanza con limite di 100 connessioni totali e 2 repliche del Backend in esecuzione, il maximum-pool-size di HikariCP non deve superare 40 connessioni per replica (lasciando margine per connessioni di manutenzione e monitoring).
```yaml
# Esempio configurazione application.yml
spring:
datasource:
hikari:
maximum-pool-size: 40
minimum-idle: 5
connection-timeout: 30000
idle-timeout: 600000
max-lifetime: 1800000
```
La Helm Chart di progetto non deve includere una dipendenza dalla chart postgresql del catalogo Bitnami o da chart simili: il database non viene deployato nel namespace. La chart deve includere esclusivamente la definizione del Kubernetes Secret per le credenziali di connessione e i riferimenti alle variabili d'ambiente nel Deployment del Backend.
**NOTA IMPLEMENTATIVA** — La richiesta della scheda di provisioning DBaaS Nivola è un'attività a lunga latenza (i tempi di erogazione dipendono dal calendario operativo del team Nivola). Il team di sviluppo deve avviare formalmente la richiesta prima dell'inizio dello sprint di sviluppo del Data Layer, per evitare blocchi durante la fase di sviluppo e test dell'integrazione con il database. È necessario richiedere almeno due istanze separate: una per l'ambiente di sviluppo/test (DEV) e una per la produzione (PROD).

## 4. Logging delle informazioni

[DOC] Tutte le operazioni significative eseguite dal sistema, sia quelle avviate dagli utenti (Cittadino, Operatore) sia quelle eseguite dai processi automatici (batch), devono essere tracciate in modo dettagliato a fini di audit, sicurezza e monitoraggio. Il logging deve essere implementato su più livelli.
- Log di Audit: [DEDOTTO] Verrà utilizzata una tabella dedicata, csi_log_audit, per registrare gli eventi di business critici. Per ogni evento, saranno memorizzate le seguenti informazioni:
- Timestamp dell'evento.
- Identificativo dell'utente che ha eseguito l'operazione (Codice Fiscale).
- Identificativo del profilo utente (Cittadino, Operatore, Batch).
- Codice Fiscale dell'assistito su cui si sta operando (se diverso dall'utente).
- Tipo di operazione eseguita (es. RILASCIO_CONSENSO, GESTIONE_INFORMATIVA).
- Esito dell'operazione (SUCCESSO, FALLIMENTO).
- Indirizzo IP del client.
- Eventuali dettagli o messaggi di errore.
- Log Applicativo: [PROPOSTA] I servizi backend produrranno log a livello applicativo (es. DEBUG, INFO, WARN, ERROR) utilizzando un framework standard come SLF4j con Logback. Questi log confluiranno in un sistema di centralizzazione (es. stack ELK o similare) per consentire analisi e monitoraggio in tempo reale dello stato di salute dell'applicazione.
- Log di Accesso: Il Web Server registrerà tutte le richieste HTTP in entrata, includendo l'URL richiesto, il metodo, l'indirizzo IP sorgente, lo user-agent e il tempo di risposta.
[DOC] Particolare attenzione sarà data alla tracciatura delle chiamate verso i sistemi esterni (AURA, Gestione Deleghe, Notificatore, SIA), registrando sia la richiesta inviata che la risposta ricevuta [1].

## 4.1 Tracciatura Chiamate Servizi Esterni

[DOC] Oltre all'audit delle operazioni utente, il sistema deve tracciare in modo granulare tutte le chiamate in uscita verso servizi esterni, al fine di garantire la piena visibilità dei flussi di interoperabilità e facilitare il debugging in caso di anomalie. I servizi soggetti a questa tracciatura includono, ma non sono limitati a: *AURA*, *Gestione Deleghe** *e *Notificatore* [1].
[PROPOSTA] Per ogni chiamata effettuata, verranno registrate le seguenti informazioni nella tabella dedicata cons_t_traccia_serv_est:
*Data e ora** *della chiamata.
*Servizio contattato* (es. AURA, DELEGHE).
*Operatore/Utente** *che ha innescato la chiamata.
*Assistito* di riferimento (Codice Fiscale).
*Request*: Il payload completo inviato al servizio esterno.
*Response*: Il payload completo ricevuto dal servizio esterno.
*Esito*: L'esito della chiamata (es. 'SUCCESSO', 'FALLIMENTO').
*Errori*: Eventuali codici e messaggi di errore restituiti dal servizio.

## 4.2 Specifica tecnica Integrazioni

Il servizio AURA espone esclusivamente Web Service SOAP. Non è prevista migrazione a REST nel contesto di questo progetto. Il backend Spring Boot deve includere un client SOAP (si raccomanda Apache CXF o Spring-WS, entrambi compatibili con Spring Boot 3.x).
**Meccanismo di autenticazione verso AURA:**
L'autenticazione avviene tramite WS-Security UsernameToken inserito nell'header SOAP della richiesta. Il profilo da utilizzare è UsernameToken con PasswordType = PasswordText (password in chiaro nell'header SOAP, protetto da TLS a livello di trasporto).
Le credenziali (username e password) sono fornite dal gruppo di assistenza anagrafiche del CSI Piemonte, che provvede a censirle sulla piattaforma IRIS (Identity and Resource Integration Service) per ciascun fruitore del servizio. Il team di sviluppo deve richiedere formalmente tali credenziali al referente CSI prima dell'avvio dello sviluppo dell'integrazione.
**Ottenimento WSDL:**
I WSDL dei servizi AURA sono disponibili su richiesta. Il team deve specificare al referente CSI l'elenco puntuale dei servizi AURA che intende invocare (es. ricerca anagrafica, recupero dati assistito), al fine di ricevere i relativi WSDL e gli endpoint di test/produzione. I servizi tipicamente coinvolti nel progetto Gestione Consensi includono almeno: ricerca assistito per CF e ricerca per dati anagrafici (nome, cognome, data di nascita).
**Integrazione con il Servizio Gestione Deleghe**
Analogamente ad AURA, anche il servizio Gestione Deleghe espone Web Service SOAP. Il client SOAP del backend deve gestire entrambe le integrazioni.
Meccanismo di autenticazione verso Gestione Deleghe:
L'autenticazione inter-servizio avviene tramite OAuth2. Il backend deve implementare il flusso OAuth2 Client Credentials per ottenere un access token e allegarlo alle richieste verso il servizio Deleghe. I WSDL del servizio Deleghe sono disponibili su richiesta al referente CSI.
**Riepilogo tecnico integrazioni servizi esterni:**

| **Servizio** | **Protocollo** | **Autenticazione** | **WSDL/Specifiche** |
| --- | --- | --- | --- |
| AURA | SOAP | WS-Security UsernameToken (PasswordText) su IRIS | Disponibile su richiesta (specificare servizi) |
| Gestione Deleghe | SOAP | OAuth2 Client Credentials | Disponibile su richiesta |
| Notificatore Regionale (UNP) | REST | Da definire con referente CSI (token applicativo UNP) | Vedi 7.2 — gitlab.csi.it/user-notification-platform/unpdocumentazione |
| SIA ASR (BATCH-01) | SOAP | Come da contratto WSDL AS-IS | Specifica-WebService_ConsensoRegionaleAziendale_v03 |

**NOTA DI SICUREZZA:** Le credenziali IRIS per AURA e il client_secret OAuth2 per Deleghe non devono mai essere inseriti nel codice sorgente né nel repository Git. Devono essere iniettati tramite Kubernetes Secret o tramite ConfigMap cifrata in fase di deployment, in conformità con le linee guida di sicurezza ECaaS.

## 5. Requisiti di business

[DEDOTTO] In questa sezione vengono definiti i requisiti di business dell'applicativo, organizzati per profilo utente. Dato che il progetto prevede un unico rilascio, non è presente una suddivisione per fasi. La tabella seguente mappa le principali funzionalità ai profili applicativi che possono eseguirle.

| ID Funzione | Funzionalità | Cittadino | Operatore Sanitario/ Amministrativo | Operatore di Back Office | SIA/ Sistema Esterno |
| --- | --- | --- | --- | --- | --- |
| F01 | Accesso e selezione profilo (proprio/delegato) | ✓ | ✓ | ✓ |  |
| F02 | Consultazione elenco consensi | ✓ | ✓ |  |  |
| F03 | Rilascio nuovo consenso | ✓ | ✓ |  |  |
| F04 | Modifica consenso | ✓ | ✓ |  |  |
| F05 | Download/Stampa PDF consenso [PROPOSTA] | ✓ | ✓ |  |  |
| F06 | Gestione anagrafica Tipi Consenso |  |  | ✓ |  |
| F07 | Gestione anagrafica Informative |  |  | ✓ |  |
| F08 | Gestione anagrafica Enti ed Endpoint |  |  | ✓ |  |
| F09 | Esposizione servizio recupero stato consenso |  |  |  | ✓ |
| F10 | Esposizione servizio di configurazione |  |  |  | ✓ |


### 5.1 Stati del Consenso

[DOC] Nel modulo regionale il consenso espresso dal cittadino può assumere i seguenti stati [1]:
*Accettato*: Espressione positiva del consenso per un'informativa attiva. Il cittadino può modificare il valore senza dover riaccettare l'informativa.
*Negato*: Espressione negativa del consenso per un'informativa attiva. Il cittadino può modificare il valore senza dover riaccettare l'informativa.
*Scaduto*: Il consenso assume lo stato di "Scaduto" quando cambia l'informativa del consenso e il flag annulla_consensi è impostato a "NO". Il valore espresso dal cittadino è ancora valido ma deve essere accettata la nuova informativa. Tale variazione *non viene notificata* alle aziende.
*Annullato* (da riemettere per nuova informativa): Il consenso assume questo stato quando cambia l'informativa e il flag annulla_consensi è impostato a "SI". Tutti i consensi espressi per l'informativa precedente vengono annullati. Il cittadino accedendo al sistema visualizzerà l'interfaccia come se non avesse mai espresso quel consenso. Il valore "Annullato" *viene notificato* a tutti gli endpoint delle aziende configurate.
[DOC] Ogni variazione del consenso da parte del cittadino o dall'operatore del punto assistito non prevede mai la sovrascrittura del consenso espresso precedentemente: il record precedente viene "chiuso" (valorizzando la data_fine) e viene inserito un nuovo record con il nuovo valore. In questo modo si conserva la "storia" completa dei consensi espressi [1].
 [DOC] Nel caso che un consenso presenti un allegato all'informativa, la modifica dell'allegato *non prevede* alcun cambio di stato dei consensi espressi dai cittadini [1].

---


### 5.2 Diagramma degli stati del consenso

Il ciclo di vita di un consenso è rappresentato dal seguente diagramma di stato. Ogni consenso espresso da un utente si trova in uno dei seguenti stati, e le transizioni sono causate da azioni dell'utente o da processi automatici (batch).
La tabella seguente descrive ciascuno stato e le condizioni di transizione:

| **Stato** | **Descrizione** | **Transizioni in uscita** |
| --- | --- | --- |
| NON_ESPRESSO | Il consenso non è mai stato espresso dall'utente | Verso ATTIVO (esprime SI) o NEGATO (esprime NO) |
| ATTIVO | Il consenso è stato espresso con valore SI | Verso SCADUTO (scade informativa, annulla_consensi=NO), ANNULLATO (scade informativa, annulla_consensi=SI) |
| NEGATO | Il consenso è stato espresso con valore NO | Verso SCADUTO (scade informativa, annulla_consensi=NO), ANNULLATO (scade informativa, annulla_consensi=SI) |
| SCADUTO | L'informativa associata è scaduta, il valore resta valido | Verso ATTIVO (esprime nuovo SI) o NEGATO (esprime nuovo NO) dopo accettazione nuova informativa |
| ANNULLATO | L'informativa è scaduta con annullamento, il consenso è nullo | Verso ATTIVO (esprime nuovo SI) o NEGATO (esprime nuovo NO) dopo accettazione nuova informativa |


## 6. Modello dei Casi d’Uso

[DEDOTTO] In questo capitolo vengono descritti in dettaglio i casi d’uso (CDU) che definiscono le interazioni tra gli attori (Cittadino, Operatore) e il sistema Gestione Consensi. Ogni caso d’uso è presentato seguendo una struttura standard che include l'obiettivo, le precondizioni, lo scenario principale di successo, le varianti e gli algoritmi specifici.
[DOC] Il seguente diagramma, derivato dal documento dei requisiti [1], illustra i principali casi d'uso e gli attori coinvolti.
Figura 3: Diagramma dei Casi d'Uso principali
L'elenco completo dei casi d'uso è il seguente:
Area Cittadino (Web App)
- CDU-01: Accesso al servizio e selezione profilo (cittadino/delegato)
Area Operatore Sanitario/Amministrativo (Assistito)
Area Back Office
- CDU-14: Gestione ente ed endpoint
- CDU-15: Esposizione servizio recupero stato consenso (per Enti/Aziende)
- CDU-16: Esposizione servizio di configurazione (per Enti/Aziende)

### 6.1 CDU-01: Accesso al servizio e selezione profilo

- Obiettivo: [DOC] Consentire a un utente autenticato di accedere al servizio e, se ha delle deleghe attive, di scegliere se operare per sé stesso o per conto di un suo delegante.
- Precondizioni: L'utente (Cittadino o Operatore) deve essere in possesso di credenziali valide (SPID/CIE per il Cittadino, RUPAR/IRIDE per l'Operatore).
- Scenario principale

| Passo | Descrizione del passo |
| --- | --- |
| 1 | L'utente accede all'URL dell'applicazione. |
| 2 | Il sistema presenta la pagina di login. Il Cittadino seleziona l'accesso tramite SPID/CIE, l'Operatore viene reindirizzato al PUA, link di accesso separati per i due profili separati. |
| 3 | L'utente si autentica con successo tramite il sistema prescelto (Identity Provider SPID/CIE o PUA). |
| 4 | [DOC] Il sistema riceve i dati anagrafici dell'utente (incluso il Codice Fiscale). |
| 5 | [DOC] Il sistema invoca il servizio Gestione Deleghe per verificare se l'utente autenticato ha deleghe attive per operare per conto di altri soggetti. |
| 6 | Il sistema presenta una pagina di benvenuto. Se l'utente ha deleghe attive (vedi Variante 6.1.1), viene presentata una schermata di scelta del profilo. Altrimenti, il sistema carica direttamente il cruscotto personale dell'utente. |
| 7 | L'utente seleziona il profilo per cui operare (sé stesso o un delegante). |
| 8 | Il sistema carica il cruscotto con i dati relativi al profilo selezionato. |

- Varianti
- 6.1.1 Utente con deleghe attive (flusso di selezione profilo).
- 6.1.2 (Autenticazione fallita): Deve essere gestita in accordo con i codici di errore e i redirect definiti da GASP Salute. In caso di timeout o indisponibilità di GASP Salute, il sistema deve mostrare una pagina di errore generica con un messaggio che inviti l'utente a riprovare, senza esporre dettagli tecnici dell'errore.
- 6.1.3 (Servizio Gestione Deleghe non disponibile): [PROPOSTA] Se il servizio Gestione Deleghe non risponde o restituisce un errore, il sistema impedisce la selezione del profilo delegato, mostrando un messaggio di avviso. L'utente può operare solo per sé stesso.

### 6.2 CDU-02: Consultazione consensi rilasciati

- Obiettivo: [DOC] Fornire all'utente una visione completa di tutti i consensi che ha espresso, con il loro stato corrente e i dettagli principali.
- Precondizioni: L'utente deve aver completato con successo il CDU-01 e aver selezionato un profilo (sé stesso o un delegante).
- Scenario principale

| Passo | Descrizione del passo |
| --- | --- |
| 1 | L'utente accede al proprio cruscotto (home page del servizio). |
| 2 | [DOC] Il sistema, in base al Codice Fiscale del profilo selezionato, interroga il backend per ottenere l'elenco completo dei consensi associati. |
| 3 | Il sistema presenta l'elenco dei consensi, raggruppandoli per tipologia (es. Regionali, Aziendali) o stato. [PROPOSTA] Per ogni consenso, vengono mostrate le seguenti informazioni in una "card" riassuntiva: |

Nome del consenso (es. "Ritiro On Line Referti", "Presa in carico cronicità").
Ente/ASR di riferimento (se applicabile).
Stato attuale (es. Accettato, Negato, Annullato).
Data di ultima modifica/espressione.
| 4 | L'utente può cliccare su una singola card per visualizzare i dettagli completi del consenso.
- Varianti
- 6.2.1 (Nessun consenso espresso): Se l'utente non ha ancora espresso alcun consenso, il sistema mostra un messaggio informativo e un invito a esplorare i consensi disponibili per l'espressione.

### 6.3 CDU-03: Rilascio nuovo consenso cittadino

- Obiettivo: [DOC] Permettere all'utente di esprimere un nuovo consenso per una delle tipologie disponibili.
- Precondizioni: L'utente deve aver completato con successo il CDU-01. Il consenso da esprimere non deve essere già in stato "Accettato" o "Negato". 
- Gli enti/endpoint per cui è possibile esprimere il consenso non devono essere in stato di allineamento (stato_allineamento = 'IN_CORSO' nella tabella cons_r_asr_endpoint).
- Scenario principale

| Passo | Descrizione del passo |
| --- | --- |
| 1 | Dal cruscotto, l'utente seleziona la funzionalità per rilasciare un nuovo consenso. |
| 2 | Il sistema presenta l'elenco delle tipologie di consenso che possono essere espresse. [DEDOTTO] L'elenco è filtrato per mostrare solo i consensi per cui l'utente non ha ancora espresso una preferenza (stato "Non Espresso" o "Annullato" a db). |
| 3 | L'utente seleziona la tipologia di consenso di suo interesse. |
| 4 | [DOC] Il sistema presenta il documento dell'Informativa associata in formato PDF, rendendolo disponibile per la visualizzazione, il download e la stampa. |
| 5 | L'utente, dopo aver letto l'informativa, seleziona una checkbox per confermare la "presa visione". |
| 6 | [DOC] L'utente esprime la propria volontà selezionando "Accetto" o "Nego".  [DOC] Al momento del salvataggio, il sistema opera in modo differenziato in base alla tipologia di consenso [1]: *Consenso Regionale*: Il valore espresso dal cittadino viene salvato N volte nella tabella cons_t_consenso, tante quante sono le aziende collegate a quel consenso nella tabella cons_r_sotto_tipo, cons_asr_endpoint. Il valore è identico per tutte le aziende. Per ogni record salvato, il sistema inserisce N record nella tabella cons_t_notifica, uno per ogni endpoint attivo.  *Consenso Aziendale**:* Per ogni azienda, il cittadino deve leggere e accettare l'informativa specifica. Il valore viene salvato singolarmente per ogni coppia consenso/ente. Ogni azienda può avere una propria informativa.   [DOC] Il sistema deve anche verificare la tipologia di consenso: se il campo flag_online è valorizzato a NO (consenso de visu), la web app del cittadino non deve permettere la valorizzazione e deve presentare un messaggio che indichi di recarsi presso un'azienda sanitaria/ente [1]. |
| 7 | L'utente conferma l'operazione. |
| 8 | Il sistema salva il nuovo stato del consenso nel database, associandolo al CF del profilo, alla data/ora correnti e all'informativa visionata. |
| 9 | [DOC] Il sistema invia una notifica di avvenuto rilascio al cittadino (e al delegante, se applicabile) tramite il Servizio Notificatore. |
| 10 | Il sistema mostra un messaggio di conferma e reindirizza l'utente al cruscotto, dove il nuovo consenso appare nell'elenco. |

- Rilascio del consenso da parte del Cittadino
- **Informazioni trasmesse tra attore e sistema ****[DEDOTTO]**

| Nome Campo | Tipo | Modalità | Obbligatorio | Formato | Default | Criteri di validazione | Messaggio di errore |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Elenco Consensi | Tabella | D | - | - | - | - | - |
| consenso_desc | Stringa | D | - | - | - | - | - |
| valore_consenso | Radio Button | I | Sì | (SI, NO) | NO | Deve essere selezionato | "Selezionare un valore per il consenso" |
| accettazione_informativa | Checkbox | I | Sì | - | - | Deve essere spuntato | "È obbligatorio accettare l'informativa" |
| Bottone Conferma | Bottone | I | - | - | - | - | - |
| sotto_tipo_consenso_id | Hidden | I/D | Sì | int | Precaricato dalla selezione | Non NULL | - |
| d_informativa_id | Hidden | I/D | Sì | int | ID informativa corrente | Non NULL | - |
| cf_delegato | Hidden | I/D | Condiz. | 16 car. alfanum. | CF delegante se in sessione di delega | - | - |

- **NOTE:**
- Il campo Display consenso_desc corrisponde alla colonna desc_sotto_tipo_cons della tabella cons_d_sotto_tipo_cons.
- **Legenda Modalità: I = Input utente, D = Display (output sistema), I/D = Input con valore precaricato**
- Varianti
- 6.3.1 (Consenso già espresso): [PROPOSTA] Se l'utente tenta di accedere al rilascio di un consenso per cui ha già espresso una preferenza (stato "Accettato" o "Negato"), il sistema lo informa che è possibile solo modificare la scelta esistente, e lo guida verso il CDU-04 o CDU-05.
***	*****Algoritmi**
ALG01 - Caricamento pagina di rilascio consenso [DEDOTTO]
Il sistema recupera i parametri dalla tabella *cons_d_sotto_tipo_cons** *l'elenco dei consensi (sotto_tipo_consenso, desc_sotto_tipo_cons) che non sono ancora stati espressi dall'utente (cf_cittadino) o che si trovano in stato 'ANNULLATO' nella tabella cons_t_consenso.
Per ciascun consenso, il sistema verifica il flag online nella tabella cons_d_informativa associata. 
Se online = true, il consenso è presentabile a video per l'espressione.
Se online = false, il consenso viene mostrato come "non esprimibile online" con un messaggio che invita l'utente a recarsi presso un punto di servizio assistito.
Il sistema popola la maschera con l'elenco dei consensi esprimibili.
ALG02 - Salvataggio nuovo consenso [DEDOTTO]
Alla conferma dell'utente, il sistema esegue i seguenti controlli di validazione sui dati inseriti (vedi tabella "Informazioni trasmesse" per i dettagli).
Se la validazione ha successo, il sistema procede a registrare il consenso nella tabella cons_t_consenso:
Crea un nuovo record in cons_t_consenso.
Valorizza i campi con i dati dell'utente (cf_cittadino, id_aura, nome, cognome).
Imposta tipo_stato = 'ATTIVO' se il valore è 'SI', o 'NEGATO' se il valore è 'NO'.
Registra l'ID dell'informativa accettata (d_informativa_id).
Registra la fonte (fonte_id = 'CITT').
Imposta sotto_tipo_consenso = valore del campo hidden sotto_tipo_consenso_id ricevuto dalla request"
Popola i campi di tracciatura (data_acquisizione, login_operazione, uuid, ecc.).
Se il consenso è di tipo 'A' (Aziendale), crea un record per ogni ASR a cui l'utente appartiene.
Il sistema scrive un record di audit nella tabella csi_log_audit con operazione = 'insert' e ogg_oper = 'cons_t_consenso'.
Il sistema inserisce un record nella tabella cons_t_notifica per ogni endpoint associato al consenso, per la successiva notifica tramite il BATCH-01.

### 6.4 CDU-04: Modifica consenso espresso

Distinzione CDU-04 vs CDU-05: CDU-04 gestisce i casi in cui lo stato del consenso è SCADUTO o ANNULLATO (richiedono riaccettazione dell'informativa) e il flusso comprende la visualizzazione e accettazione della nuova informativa. CDU-05 è un subset di CDU-04 che gestisce esclusivamente la modifica del valore (SI→NO o NO→SI) quando il consenso è in stato ATTIVO o NEGATO, senza necessità di riaccettare l'informativa. La UI dovrebbe presentare due bottoni distinti: "Modifica Consenso" (CDU-04) e "Cambia Valore" (CDU-05).
- Obiettivo: [DOC] Consentire all'utente di modificare una scelta di consenso precedentemente espressa (es. da "Nego" a "Accetto").
- La logica di modifica varia in base allo stato corrente del consenso [1]
- Precondizioni: L'utente deve aver già espresso un consenso (*stato Accettato, Negato, Scaduto o Annullato*) per la tipologia che intende modificare.
- Scenario principale

| Stato attuale | Comportamento Web App | Azione richiesta al cittadino |
| --- | --- | --- |
| *Accettato* | Consenso già espresso, modificabile | Il cittadino *non deve** *riaccettare l'informativa, anche al variare del valore. |
| *Negato* | Consenso già espresso, modificabile | Il cittadino *non deve** *riaccettare l'informativa, anche al variare del valore. |
| *Scaduto* | Consenso già espresso, modificabile, con obbligo di accettazione informativa | Il cittadino *deve* accettare la nuova informativa (anche senza variare il valore). Il sistema presenta il valore precedentemente espresso. |
| *Annullato* | Consenso "vuoto", con obbligo di accettazione informativa | Il cittadino *deve** *indicare il consenso e accettare la nuova informativa. Il sistema *non** *visualizza il valore precedente. |

[DOC] Nel caso di consenso aziendale, se anche un solo consenso del cittadino per un'azienda ha stato "Scaduto" o "Annullato", il cittadino dovrà riaccettare le informative [1].
Modifica del consenso da parte del Cittadino:
**Informazioni trasmesse tra attore e sistema [DEDOTTO]**

| **Nome Campo** | **Tipo** | **Modalità** | **Obbl.** | **Formato** | **Default** | **Criteri di validazione** | **Messaggio di errore** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Descrizione Consenso | Stringa | D | - | - | - | - | - |
| Stato Attuale | Stringa | D | - | - | - | - | - |
| valore_consenso | Radio Button | I/D | Sì | (SI, NO) | Valore attuale | - | "Selezionare un valore per il consenso" |
| accettazione_informativa | Checkbox | I | Condiz. | - | - | Obbligatorio se stato = SCADUTO o ANNULLATO | "È obbligatorio accettare la nuova informativa" |
| Bottone Salva | Bottone | I | - | - | - | - | - |
| d_informativa_id | Hidden | I/D | Condiz | int |  | Obbligatorio se stato = SCADUTO o ANNULLATO | "Errore: informativa non trovata" |
| sotto_tipo_consenso_id | Hidden | I/D | Si | int | Precaricato dalla selezione | Non NULL | - |
| cf_delegato | Hidden | I/D | Condiz | 16 car. alfanum. | CF delegante se in sessione di delega | - | - |

**Legenda Modalità: I = Input utente, D = Display (output sistema), I/D = Input con valore precaricato**
**Algoritmi**
ALG01 - Caricamento pagina di modifica consenso
Il sistema recupera dalla tabella cons_t_consenso il record del consenso che l'utente intende modificare, usando cf_cittadino e cons_id.
Il sistema legge il tipo_stato attuale del consenso e il d_informativa_id associato.
Il sistema verifica se l'informativa associata al consenso è ancora valida confrontando il d_informativa_id del consenso con la versione più recente in cons_d_informativa.
In base allo stato, il sistema prepara la maschera:
Se stato = 'ATTIVO' o 'NEGATO': la maschera mostra il valore attuale e permette di cambiarlo. L'accettazione dell'informativa non è richiesta se non è cambiata.
Se stato = 'SCADUTO': la maschera mostra il valore precedente (non modificabile) e richiede obbligatoriamente la lettura e accettazione della nuova informativa prima di poter esprimere un nuovo valore.
Se stato = 'ANNULLATO': la maschera si presenta come un rilascio ex-novo, richiedendo obbligatoriamente la lettura e accettazione della nuova informativa.
Validazione Dati: Il sistema valida che tutti i campi obbligatori siano compilati e che i valori rispettino i formati previsti.
ALG02 - Salvataggio modifica consenso
Vedi algoritmo Canonico sotto
**Storicizzazione e Aggiornamento Consenso (algoritmo canonico, valido anche per CDU-05):**
Il sistema esegue una SELECT su cons_t_consenso per trovare il record valido (data_fine IS NULL) per l'assistito (cf_cittadino), la sotto-tipologia di consenso (sotto_tipo_consenso)) e l'eventuale azienda (cod_asr).
Il sistema esegue un UPDATE sul record trovato: imposta data_fine = NOW() e login_operazione con il CF dell'operatore/cittadino.
Il sistema esegue una INSERT nella tabella cons_s_consenso copiando tutti i dati del record appena chiuso in cons_t_consenso, valorizzando la FK cons_id.
Il sistema esegue una INSERT nella tabella cons_t_consenso con i nuovi dati: cf_cittadino, nome, cognome, id_aura, sotto_tipo_consenso, cod_asr, d_informativa_id (ID informativa accettata), tipo_stato = 'ATTIVO' o 'NEGATO', valore_consenso, data_acquisizione = NOW(), data_fine = NULL, login_operazione = CF operatore/cittadino, cf_delegato (se presente), fonte_id, endp_id = NULL (per i consensi inseriti da utente; valorizzato solo per consensi ricevuti da SIA).
Il sistema scrive un record in csi_log_audit con operazione = 'update' e ogg_oper = 'cons_t_consenso'.
Il sistema inserisce un record in cons_t_notifica per ogni endpoint attivo associato al sotto-tipo consenso nella tabella cons_r_sotto_tipo_cons_asr_endpoint (con stato_allineamento != 'IN_CORSO').
Notifica agli Endpoint: L’algoritmo è lo stesso descritto nel caso d’uso *CDU-03, ALG02*. Il sistema inserisce un record in cons_t_notifica per ogni endpoint associato.

### 6.5 CDU-05: Modifica del valore di un consenso

- Obiettivo: Permettere al Cittadino di modificare il valore di un consenso già espresso (es. da “Accettato” a “Negato” o viceversa).
- Precondizioni: L’utente ha effettuato l’accesso al sistema (CDU-01) e ha visualizzato la lista dei suoi consensi (CDU-02).
- Attori: Cittadino
- Post-**condizioni**: Il sistema ha storicizzato la modifica del consenso e ha notificato il nuovo valore agli endpoint aziendali.
- Scenario principale:

| Passo | Descrizione del passo |
| --- | --- |
| 1 | L’utente seleziona un consenso dalla lista e preme il pulsante “Modifica Valore”. |
| 2 | Il sistema presenta una maschera riepilogativa con i dati del consenso e il valore attuale (“Accettato” o “Negato”). |
| 3 | L’utente seleziona il nuovo valore del consenso (l’opposto di quello attuale). |
| 4 | L’utente conferma l’operazione. |
| 5 | Il sistema esegue le validazioni formali e di coerenza. |
| 6 | Il sistema invoca l’algoritmo *ALG01 – Storicizzazione e Aggiornamento Consenso** *per registrare la modifica. |
| 7 | Il sistema invoca l’algoritmo *ALG02 – Notifica agli Endpoint** * per comunicare la modifica. |
| 8 | Il sistema mostra un messaggio di successo e aggiorna la lista dei consensi. |

**Informazioni trasmesse tra attore e sistema [DEDOTTO]**

| **Nome Campo** | **Tipo** | **Modalità** | **Obbl.** | **Formato** | **Default** | **Criteri** | **Errore** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Descrizione Consenso | Stringa | D | — | — | — | — | — |
| Valore Attuale | Stringa | D | — | (Accettato/Negato) | — | — | — |
| valore_consenso | Radio Button | I | Sì | (SI, NO) | Valore attuale | Deve essere selezionato | "Selezionare un valore" |
| Bottone Conferma | Bottone | I | — | — | — | — | — |
| sotto_tipo_consenso_id | Hidden | I/D | Sì | int | Precaricato | Non NULL | — |
| cf_delegato | Hidden | I/D | Condiz. | 16 car. alfanum. | CF delegante se presente | — | — |

**Nota: **CDU-05 non include accettazione_informativa (non richiesta, lo stato è ATTIVO/NEGATO).
**Algoritmi**
ALG01 – Storicizzazione e Aggiornamento Consenso: 
Vedi CDU-04, ALG02 — Storicizzazione e Aggiornamento Consenso.
ALG02 – Notifica agli Endpoint: 
L’algoritmo è lo stesso descritto nel caso d’uso *CDU-03, ALG02*. Il sistema inserisce un record in cons_t_notifica per ogni endpoint associato.

### 6.6 CDU-06: Download/stampa PDF consenso

- Obiettivo: [DOC] Fornire all'utente una copia PDF del consenso espresso, che attesti la scelta fatta e l'informativa visionata.
- Precondizioni: L'utente deve aver espresso almeno un consenso.
- Scenario principale

| Passo | Descrizione del passo |
| --- | --- |
| 1 | Dal cruscotto dei consensi (CDU-02), l'utente individua il consenso di cui desidera una copia. |
| 2 | L'utente seleziona l'opzione "Scarica PDF" o "Stampa". |
| 3 | Il sistema genera dinamicamente un documento PDF. |
| 4 | Struttura del documento PDF generato: [PROPOSTA] Il PDF deve contenere:  **Intestazione:** logo Regione Piemonte, titolo "Attestazione di Consenso" **Dati dell'assistito:** Nome, Cognome, Codice Fiscale (da cons_t_consenso: cf_cittadino, nome, cognome) **Dati del consenso:** Descrizione (desc_sotto_tipo_cons), Data acquisizione (data_acquisizione), Valore espresso (SI/NO), Stato **Dati dell'informativa:** Descrizione informativa (desc_informativa), Data versione, testo HTML dell'informativa o link al PDF allegato Eventuale indicazione del delegato (cf_delegato) se l'operazione è stata eseguita per delega **Firma digitale del documento:** il PDF deve includere data e ora di generazione e un identificativo univoco della stampa  **Libreria suggerita:** **Per la generazione server-side usare ****iText**** 7 (licenza AGPL, compatibile con Developers Italia) o Apache ****PDFBox****. La generazione avviene lato ****backend****, il ****frontend**** riceve lo stream binario tramite Content-****Type****: ****application****/pdf.** |

| 4 | Il sistema rende disponibile il PDF per il download o avvia la funzione di stampa del browser.
**Informazioni trasmesse tra attore e sistema [DEDOTTO]**

| **Nome Campo** | **Tipo** | **Modalità** | **Obbl.** | **Formato** | **Default** | **Criteri** | **Errore** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| cons_id | Hidden | I/D | Sì | int | Precaricato dalla selezione in CDU-02 | Non NULL | "Consenso non trovato" |
| PDF Generato | Stream binario | D | — | application/pdf | — | — | — |

**NOTA TECNICA – Contesto AS-IS / TO-BE per la Generazione PDF:**
Il CDU-06 (Download/stampa PDF consenso) è pertanto una **funzionalità nuova introdotta nel TO-BE** dal presente progetto di rifacimento.
La firma digitale qualificata del PDF (eIDAS) **non è richiesta** in questa fase: il CSI Piemonte ha confermato che non è prevista l'integrazione con un servizio centralizzato di firma qualificata. Il documento PDF generato deve includere unicamente la data e l'ora di generazione e un identificativo univoco della stampa come elementi di attestazione, come già descritto nello scenario principale del CDU-06.
**Specifica tecnica libreria di generazione PDF:**
Per la generazione server-side del PDF, il backend deve utilizzare una delle seguenti librerie, compatibili con lo stack Spring Boot 3.x e con i requisiti di pubblicazione su Developers Italia (licenza open source):
**iText**** 7** (licenza AGPL-3.0) – raccomandato per la ricchezza delle funzionalità di layout.
**Apache ****PDFBox** (licenza Apache 2.0) – alternativa con licenza più permissiva.
La generazione avviene lato **backend**; il frontend Angular riceve lo stream binario del PDF tramite response HTTP con Content-Type: application/pdf e Content-Disposition: attachment; filename="consenso_[CF]_[data].pdf".

### 6.7 CDU-07: Ricerca assistito

- Obiettivo: [DOC] Consentire a un Operatore Sanitario/Amministrativo di cercare e selezionare un assistito per poter operare sui suoi consensi.
- Precondizioni: L'utente deve essere un Operatore Sanitario/Amministrativo autenticato tramite PUA.
- Scenario principale

| Passo | Descrizione del passo |
| --- | --- |
| 1 | L'Operatore, dopo l'accesso, visualizza la maschera di ricerca assistito. |
| 2 | L'Operatore inserisce i criteri di ricerca: Codice Fiscale oppure Cognome, Nome e Data di Nascita. |
| 3 | L'Operatore avvia la ricerca. |
| 4 | [DOC] Il sistema invoca il servizio di ricerca anagrafica di AURA utilizzando i criteri forniti. Se non c’è output invia una richiesta di ricerca al servizio esterno SistemaTS. |
| 5 | Il sistema mostra l'elenco degli assistiti trovati che corrispondono ai criteri. |
| 6 | L'Operatore seleziona l'assistito corretto dalla lista. |
| 7 | Il sistema carica il cruscotto dei consensi per l'assistito selezionato. |

- Dettaglio colonne del "Risultato Ricerca": La tabella dei risultati deve mostrare per ogni assistito trovato: Cognome, Nome, Codice Fiscale, Data di Nascita, Comune di Nascita, ASR di appartenenza. Questi dati sono quelli restituiti dalla response del servizio AURA e devono essere sufficienti per permettere all'operatore di identificare univocamente il paziente in caso di omonimi.
- Ricerca assistito da parte dell'Operatore
- **Informazioni trasmesse tra attore e sistema ****[DEDOTTO]**

| Nome Campo | Tipo | Modalità | Obbl. | Formato | Default | Criteri di validazione | Messaggio di errore |
| --- | --- | --- | --- | --- | --- | --- | --- |
| codice_fiscale | Testo | I | Condiz. | 16 car. alfanum. | - | Validazione formale CF | "Codice Fiscale non valido" |
| nome | Testo | I | Condiz. | - | - | - | - |
| cognome | Testo | I | Condiz. | - | - | - | - |
| data_nascita | Data | I | Condiz. | GG/MM/AAAA | - | - | - |
| Bottone Cerca | Bottone | I | - | - | - | CF oppure nome+cognome+data | "Inserire almeno un criterio di ricerca" |
| Risultato Ricerca | Tabella | D | - | - | - | - | - |

- Nota: La ricerca può avvenire per Codice Fiscale (campo singolo) oppure per combinazione nome + cognome + data di nascita. Almeno uno dei due criteri deve essere compilato.
**Legenda Modalità: I = Input utente, D = Display (output sistema), I/D = Input con valore precaricato**
- Varianti
- 6.7.1 (Assistito non trovato): Se la ricerca su AURA non produce risultati, il sistema mostra un messaggio di errore.
- 6.7.2 (Risultati multipli): Se la ricerca produce più risultati, l'operatore deve raffinarla o selezionare l'utente corretto in base ad altri dati visibili (es. indirizzo). [PROPOSTA]

### 6.8 CDU-08: Consultazione dei consensi di un assistito


| **Attributo** | **Valore** |
| --- | --- |
| Attore primario | Operatore Sanitario/Amministrativo |
| Breve descrizione | L'operatore, dopo aver cercato e selezionato un assistito (CDU-07), visualizza lo stato di tutti i suoi consensi |
| Precondizioni | L'operatore ha effettuato l'accesso tramite PUA. L'assistito è stato cercato e selezionato (CDU-07). |

Scenario principale [DEDOTTO]
La logica di visualizzazione è identica a quella del CDU-02 (Consultazione dei consensi da parte del Cittadino). Il sistema presenta l'elenco dei consensi dell'assistito selezionato, con il relativo stato (Attivo, Negato, Scaduto, Annullato), il valore espresso, la data di acquisizione e l'informativa associata. 
L'operatore può selezionare un consenso per visualizzarne il dettaglio completo.

### 6.9 CDU-09: Rilascio del consenso per conto di un assistito


| **Attributo** | **Valore** |
| --- | --- |
| Attore primario | Operatore Sanitario/Amministrativo |
| Breve descrizione | L'operatore rilascia un nuovo consenso per conto dell'assistito |
| Precondizioni | L'operatore ha effettuato l'accesso tramite PUA. L'assistito è stato cercato e selezionato (CDU-07). Gli enti/endpoint per cui è possibile esprimere il consenso non devono essere in stato di allineamento (stato_allineamento = 'IN_CORSO' nella tabella cons_r_asr_endpoint). |

Scenario principale [DEDOTTO]
La logica è identica a quella del CDU-03 (Rilascio del consenso da parte del Cittadino), con le seguenti differenze: il campo fonte_id viene valorizzato con 'PASS' (Punto Assistito) e i campi login_operazione e ruoloop_id vengono valorizzati con i dati dell'operatore. Si applicano gli stessi Algoritmi (ALG01, ALG02) e la stessa tabella "Informazioni trasmesse" del CDU-03.
**Per CDU-09, CDU-10, CDU-11: Rilascio, Modifica del consenso da parte dell'Operatore****
****
****Algoritmi**
ALG01 - Ricerca assistito [DOC]
L'operatore inserisce il Codice Fiscale o i dati anagrafici (nome, cognome, data di nascita).
Il sistema invia una richiesta di ricerca al servizio esterno di AURA.
Se AURA restituisce un match, il sistema visualizza i dati dell'assistito.
Se AURA non restituisce un match, il sistema invia una richiesta di ricerca al servizio esterno SistemaTS.
Se SistemaTS restituisce un match, il sistema visualizza i dati.
Se nessun sistema restituisce risultati, viene mostrato un messaggio di "Assistito non trovato".
Il sistema traccia la chiamata ai servizi esterni nelle tabelle di tracciatura (cons_t_traccia_serv_est).
ALG02 - Gestione consenso per conto di [DEDOTTO]
Una volta selezionato l'assistito, la logica applicativa per il rilascio, la modifica del consenso segue esattamente gli stessi algoritmi descritti per i CDU-03, CDU-04 e CDU-05.
L'unica differenza è che il campo fonte_id nella tabella cons_t_consenso viene valorizzato con 'PASS' (Punto Assistito) e i campi login_operazione e ruoloop_id vengono valorizzati con i dati dell'operatore che sta eseguendo l'operazione.

### 6.10 CDU-10: Modifica del consenso per conto di un assistito


| **Attributo** | **Valore** |
| --- | --- |
| Attore primario | Operatore Sanitario/Amministrativo |
| Breve descrizione | L'operatore modifica un consenso esistente per conto dell'assistito |
| Precondizioni | L'operatore ha effettuato l'accesso tramite PUA. L'assistito è stato cercato e selezionato (CDU-07). |

Scenario principale [DEDOTTO]
La logica è identica a quella del CDU-04 (Modifica del consenso da parte del Cittadino), con le stesse differenze indicate nel CDU-09 per quanto riguarda la fonte e la tracciatura dell'operatore. Si applicano gli stessi Algoritmi (ALG01, ALG02) e la stessa tabella "Informazioni trasmesse" del CDU-04.
**Per CDU-09, CDU-10, CDU-11: Rilascio, Modifica del consenso da parte dell'Operatore****
****
****Algoritmi**
ALG01 - Ricerca assistito: 
Vedi CDU-07, scenario principale. La logica di ricerca tramite AURA/SistemaTS e la tracciatura in cons_t_traccia_serv_est sono le medesime descritte nel CDU-07.
ALG02 - Gestione consenso per conto di [DEDOTTO]
Una volta selezionato l'assistito, la logica applicativa per il rilascio, la modifica del consenso segue esattamente gli stessi algoritmi descritti per i CDU-03, CDU-04 e CDU-05.
L'unica differenza è che il campo fonte_id nella tabella cons_t_consenso viene valorizzato con 'PASS' (Punto Assistito) e i campi login_operazione e ruoloop_id vengono valorizzati con i dati dell'operatore che sta eseguendo l'operazione.

### 6.11 CDU-11: Modifica del valore di un consenso per conto di un assistito

- Obiettivo: Permettere all’Operatore Sanitario/Amministrativo di modificare il valore di un consenso per conto di un assistito.
- Precondizioni: L’operatore ha effettuato l’accesso (CDU-01), ha cercato e selezionato un assistito (CDU-07) e ha visualizzato i suoi consensi (CDU-08).
- Attori: Operatore Sanitario/Amministrativo
- Post-**condizioni**: Il sistema ha storicizzato la modifica del consenso e ha notificato il nuovo valore agli endpoint aziendali.
- Scenario principale:
**Scenario principale**
Lo scenario ricalca quello del caso d’uso *CDU-05*, con la differenza che ogni operazione viene eseguita dall’Operatore per conto dell’assistito. Tutti gli algoritmi di validazione e aggiornamento sono i medesimi.
**Per CDU-09, CDU-10, CDU-11: Rilascio, Modifica del consenso da parte dell'Operatore****
****
****Algoritmi**
ALG01 - Ricerca assistito: 
Vedi CDU-07, scenario principale. La logica di ricerca tramite AURA/SistemaTS e la tracciatura in cons_t_traccia_serv_est sono le medesime descritte nel CDU-07.
ALG02 - Gestione consenso per conto di [DEDOTTO]
Una volta selezionato l'assistito, la logica applicativa per il rilascio, la modifica del consenso segue esattamente gli stessi algoritmi descritti per i CDU-03, CDU-04 e CDU-05.
L'unica differenza è che il campo fonte_id nella tabella cons_t_consenso viene valorizzato con 'PASS' (Punto Assistito) e i campi login_operazione e ruoloop_id vengono valorizzati con i dati dell'operatore che sta eseguendo l'operazione.

### 6.12 CDU-12: Gestione tipo consenso

- Obiettivo: Permettere all’Operatore di Back Office di creare e modificare le tipologie di consenso, definendone le caratteristiche generali, i parametri dinamici, i valori possibili e le aziende associate, in base a quanto definito nel documento di requisiti [1].
- Attori: Operatore di Back Office
- Precondizioni: L’operatore è autenticato sul PUA con il profilo di Operatore di Back Office.
- Post-**condizioni:** Il sistema ha salvato o modificato la configurazione del tipo consenso e delle sue entità collegate (parametri, valori, associazioni enti).
- Scenario principale
- L’operatore seleziona la funzione “Gestione Tipo Consenso”.
- Il sistema visualizza l’elenco dei consensi esistenti, con filtri per “Codice Consenso” e “Tipo Consenso” (Nazionale, Regionale, Aziendale).
L’operatore clicca su “Nuovo Tipo Consenso”.
Il sistema presenta la maschera di inserimento, suddivisa in sezioni: “Dati Generali”, “Parametri Aggiuntivi”, “Associazione Enti”.
L’operatore compila i Dati Generali (Codice, Descrizione, Date, Valori possibili).
L’operatore compila i Parametri Aggiuntivi (Descrizione Estesa, Domanda, Testo, Online, Annulla Consensi). Questi campi sono dinamici e vengono letti dalla tabella cons_d_parametro [1].
L’operatore seleziona il Tipo Consenso (Nazionale, Regionale, Aziendale).
Il sistema, in base alla selezione, popola dinamicamente la lista Enti/Aziende da associare (vedi ALG01).
L’operatore seleziona uno o più enti/aziende dalla lista.
L’operatore clicca su “Salva”.
Il sistema valida i dati (vedi tabella “Informazioni Trasmesse”).
Il sistema esegue il salvataggio del nuovo tipo consenso e di tutte le sue entità collegate (vedi ALG02).
Il sistema mostra un messaggio di successo e aggiorna l’elenco dei consensi.
**Informazioni trasmesse tra attore e sistema**

| **Sezione** | **Nome Campo** | **Tipo** | **Modalità** | **Obbl.** | **Formato** | **Default** | **Criteri di validazione** | **Messaggio di errore** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dati Generali | Codice Consenso | Testo | I | S | Max 50 chr | - | Univoco in cons_d_sotto_tipo_cons | "Codice consenso già esistente" |
|  | Descrizione Consenso | Testo | I | S | Max 255 chr | - | - | - |
|  | Data Inizio Decorrenza | Data | I | S | GG/MM/AAAA | Data odierna | - | - |
|  | Data Fine Decorrenza | Data | I | N | GG/MM/AAAA | - | Deve essere > validita_inizio | "Data fine non valida" |
|  | Valori Possibili | Multi-Select | I/D | S | - | - | Almeno uno selezionato | "Selezionare almeno un valore" |
|  | fk_tipo_cons | Select | I | S | Id Numerico |  | FK valida verso cons_d_tipo_cons |  |
| Parametri Aggiuntivi | Descrizione Estesa | Text Area | I | S | - | - | - | - |
|  | Domanda da porre | Testo | I | S | Max 255 chr | - | - | - |
|  | Testo aggiuntivo | Text Area | I | N | - | - | - | - |
|  | Consenso Online | Radio | I | S | SI/NO | SI | - | - |
|  | Annulla consensi | Radio | I | S | SI/NO | NO | - | - |
| Associazione Enti | Tipo Consenso | Select | I | S | Nazionale, Regionale, Aziendale | - | - | - |
|  | Enti/Aziende | Multi-Select | I/D | S | - | - | Almeno uno selezionato | "Associare almeno un ente" |

**Legenda Modalità: I = Input utente, D = Display (output sistema), I/D = Input con valore precaricato**
**NOTA:** I campi online e annulla_consensi in questa sezione vengono salvati in cons_r_consenso_parametro come valori dinamici. Gli stessi campi in CDU-13 riguardano esclusivamente la specifica cons_d_informativa. Non sono ridondanti: un tipo consenso può avere online=SI ma una singola informativa può avere online=NO (es. informativa speciale de visu). In caso di conflitto, prevale il valore dell'informativa.
**Varianti:**
Modifica tipo consenso: L’operatore seleziona un consenso esistente e clicca “Modifica”. Il sistema presenta la maschera pre-compilata. La modifica è limitata ai campi: Descrizione, Data fine, Flag (Online, Annulla), e l’associazione con gli enti/aziende [1].
**Algoritmi:**
ALG01 – Popolamento dinamico Enti/Aziende
Alla selezione del campo “Tipo Consenso”:
Se il valore è “Nazionale”, il sistema popola la lista “Enti/Aziende” con gli enti presenti in cons_d_asr dove tipo_ente = 'NAZIONALE'.
Se il valore è “Regionale”, il sistema popola la lista con gli enti dove tipo_ente = 'REGIONALE'.
Se il valore è “Aziendale”, il sistema popola la lista con tutti gli enti dove tipo_ente = 'AZIENDALE' e per cui esiste almeno un record attivo nella tabella cons_r_asr_endpoint [1].
ALG02 – Salvataggio del Tipo Consenso
Il sistema esegue una INSERT nella tabella cons_d_sotto_tipo_cons con i dati generali (codice, descrizione, date).
Per ogni parametro aggiuntivo compilato dall’utente (Descrizione Estesa, Domanda, Testo, Online, Annulla), il sistema esegue una INSERT nella tabella cons_r_consenso_parametro, associando il valore al sotto_tipo_consenso_id appena creato. Il param_id viene recuperato dalla tabella cons_d_parametro in base al nome del campo.
Per ogni valore possibile selezionato dall’utente (es. “Accettato”, “Negato”), il sistema esegue una INSERT nella tabella cons_r_consenso_valore, associando il valore_consenso_id al sotto_tipo_consenso_id.
Per ogni ente/azienda selezionato dall’utente:
Il sistema esegue una INSERT nella tabella cons_r_sotto_tipo_cons_asr_endpoint per creare l’associazione diretta.
Logica Regionale: Se il tipo consenso è “Regionale” e l’utente seleziona “Regione Piemonte”, il sistema itera su tutte le ASR appartenenti a quella regione e crea N record di associazione in cons_r_sotto_tipo_cons_asr_endpoint, uno per ogni ASR [1].

### 6.13 CDU-13: Gestione informativa

- Obiettivo: [DOC] Permettere a un Operatore di Back Office di caricare e gestire le informative sulla privacy associate a ciascun tipo di consenso.
- Precondizioni: L'utente deve essere un Operatore di Back Office autenticato.
- Scenario principale

| Passo | Descrizione del passo |
| --- | --- |
| 1 | L'Operatore accede alla sezione "Configurazione" e seleziona "Gestione Informative". |
| 2 | L'Operatore seleziona la tipologia di consenso a cui associare l'informativa. |
| 3 | L'Operatore carica un nuovo documento PDF per l'informativa, specificando una data di inizio e (opzionalmente) una data di fine validità. |
| 4 | [DEDOTTO] Il sistema salva il file PDF e crea una nuova versione dell'informativa nella tabella cons_d_informativa. |
| 5 | Il sistema salva gli allegati dell'informativa (PDF, HTML) nella tabella cons_t_allegato, associandoli all'informativa tramite d_informativa_id e classificandoli per tipo tramite allegato_tipo_id (FK verso cons_d_allegato_tipo). |
| 6 | [DOC] La pubblicazione di una nuova informativa (impostando una data di scadenza a quella precedente) attiva il processo BATCH-02, che aggiornerà lo stato dei consensi a "Scaduto" o "Annullato" in base al valore del flag annulla_consensi associato [1]. |

**Algoritmi**
ALG01 - Creazione/Modifica Informativa
- L'operatore di Back Office compila i campi della maschera (codice, descrizione, testo HTML, date di validità, flag online e annulla_consensi).
- Il sistema salva o aggiorna il record nella tabella cons_d_informativa.
Se viene caricato un nuovo PDF, il sistema lo salva in un'area di storage dedicata e memorizza il percorso nel campo pdf_informativa.
ALG02 - Logica di scadenza/annullamento consensi
**Nota architetturale:** L'algoritmo ALG02 descrive la logica di business eseguita dal BATCH-02. Il CDU-13 (step 6) si limita a triggerare il processo: alla pubblicazione di una nuova informativa (salvataggio con data_scadenza valorizzata sulla precedente), il backend del CDU-13 inserisce un messaggio/flag che segnala al BATCH-02 di eseguire la prossima elaborazione. Non eseguire questa logica in modo sincrono nel service del CDU-13, poiché potrebbe impattare un numero elevato di record e causare timeout della richiesta HTTP. Tutta la logica è delegata al BATCH-02 che la esegue in modo asincrono.
1.  L'operatore imposta una data di scadenza all'informativa e salva.
2.  Il sistema legge il valore del flag annulla_consensi direttamente dalla tabella cons_d_informativa per l'informativa in scadenza.
3.  Per ogni cons_t_consenso attivo (data_fine IS NULL) legato all'informativa in scadenza:
    Il sistema esegue un UPDATE impostando data_fine = NOW().
    *Se "Annulla consensi" = SI*: 
       Il sistema esegue una INSERT in cons_t_consenso con i dati del consenso precedente ma con tipo_stato = 'ANNULLATO' e data_fine = NULL.
        Il sistema inserisce un record in cons_t_notifica per notificare l'annullamento.
    *Se "Annulla consensi" = N**O*:
        Il sistema esegue una INSERT in cons_t_consenso con i dati del consenso precedente ma con tipo_stato = 'SCADUTO' e data_fine = NULL.
**Informazioni trasmesse tra attore e sistema ****[DEDOTTO]**

| **Nome Campo** | **Tipo** | **Modalità** | **Obbl.** | **Formato** | **Default** | **Criteri di validazione** | **Messaggio di errore** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| desc_informativa | Testo | I | Sì | - | - | - | "Descrizione obbligatoria" |
| html_informativa | Area Testo | I | Sì | HTML | - | - | "Testo informativa obbligatorio" |
| pdf_informativa | File Upload | I | No | .pdf | - | - | - |
| data_decorrenza | Data | I | Sì | GG/MM/AAAA | Data odierna | - | "Data decorrenza obbligatoria" |
| data_scadenza | Data | I | No | GG/MM/AAAA | - | Deve essere > data_decorrenza | "Data scadenza non valida" |
| online | Checkbox | I | No | - | Selezionato | - | - |
| annulla_consensi | Checkbox | I | No | - | Non selezionato | - | - |
| Bottone Salva | Bottone | I | - | - | - | - | - |
| sotto_tipo_consenso | Select | I | SI | Id numerico |  | FK valida verso cons_d_sotto_tipo_cons | "Selezionare il tipo di consenso associato" |

**Legenda Modalità: I = Input utente, D = Display (output sistema), I/D = Input con valore precaricato**

### 6.14 CDU-14: Gestione ente ed endpoint

- Obiettivo: [DOC] Permettere a un Operatore di Back Office di gestire l'anagrafica degli enti (ASR) e dei relativi endpoint a cui notificare le variazioni dei consensi.
- Precondizioni: L'utente deve essere un Operatore di Back Office autenticato.
- Scenario principale

| Passo | Descrizione del passo |
| --- | --- |
| 1 | L'Operatore accede alla sezione "Configurazione" e seleziona "Gestione Enti ed Endpoint". |
| 2 | Il sistema mostra l'elenco degli enti (ASR) configurati. |
| 3 | L'Operatore può aggiungere un nuovo ente o modificarne uno esistente. |
| 4 | Per ogni ente, l'Operatore può configurare uno o più endpoint di servizio (URL), specificando a quale tipologia di consenso sono associati. |
| 5 | [DEDOTTO] Il sistema salva le configurazioni nelle tabelle cons_d_asr, cons_t_endpoint e nelle relative tabelle di relazione. |
| 6 | [DOC] L'aggiunta di un nuovo endpoint per un consenso già attivo attiverà il processo batch (BATCH-03) per l'allineamento massivo dei consensi esistenti verso il nuovo sistema. |
| 7 | Salvataggio endpoint: al salvataggio il campo stato_allineamento viene impostato a DA_ALLINEARE |

Informazioni trasmesse tra attore e sistema - Maschera Ente [DEDOTTO]

| Nome Campo | Tipo | Modalità | Obbl. | Formato | Default | Criteri di validazione | Messaggio di errore |
| --- | --- | --- | --- | --- | --- | --- | --- |
| cod_asr | Testo | I | Sì | Max 10 chr | - | Univoco in cons_d_asr | "Codice ente già esistente" |
| desc_asr | Testo | I | Sì | Max 255 chr | - | - | "Descrizione obbligatoria" |
| Bottone Salva | Bottone | I | - | - | - | - | - |
| tipo_ente | Select | I | SI | NAZIONALE / REGIONALE / AZIENDALE |  |  |  |
| data_creazione | Data | D | - | GG/MM/AAAA | - | - | - |
| data_cancellazione | Data | I | NO | GG/MM/AAAA | - | - | - |

Informazioni trasmesse tra attore e sistema - Maschera Endpoint [DEDOTTO]

| Nome Campo | Tipo | Modalità | Obbl. | Formato | Default | Criteri di validazione | Messaggio di errore |
| --- | --- | --- | --- | --- | --- | --- | --- |
| endp_url | Testo | I | Sì | URL valida (https://) | - | Formato URL valido | "URL non valido" |
| cod_asr | Select | I/D | Sì | - | - | FK valida verso cons_d_asr | "Selezionare un ente" |
| sotto_tipo_consenso | Select (Multi) | I | Sì | - | - | FK valida verso cons_d_sotto_tipo_cons | “Selezionare almeno un tipo consenso" |
| destinazione_id | Select | I | No | - | - | FK valida verso cons_d_asr_destinazione | "Selezionare una destinazione" |
| valida_inizio | Data | I | SI | GG/MM/AAAA | - | *≤ **valida_fine** se valorizzata* | "Data inizio obbligatoria" |
| valida_fine | Data | I | NO | GG/MM/AAAA | - | Deve essere > valida_inizio | "Data fine non valida" |
| stato_allineamento | Display | D | - | - | DA_ALLINEARE | Sola lettura (IN_CORSO / COMPLETATO / DA_ALLINEARE /ERRORE) | - |
| Bottone Salva | Bottone | I | - | - | - | - | - |


---


### 6.15 CDU-15: Esposizione servizio recupero stato consenso (per Enti/Aziende)

**Attore primario**: Sistema Informativo Aziendale (SIA).
**Obiettivo**: [DOC] Fornire un servizio REST sicuro e performante che permetta a un sistema esterno (es. un'applicazione di un'ASR) di verificare lo stato di un consenso per un dato cittadino [1].
**Precondizioni:** Il sistema chiamante deve essere autenticato e autorizzato a invocare il servizio.
**Scenario principale:**
    1.  Il sistema esterno (client) invia una richiesta GET all'endpoint /api/v1/consensi/stato fornendo come parametri codice_fiscale, codice_consenso e codice_ente.
    2.  Il sistema Gestione Consensi valida la richiesta e i parametri.
    3.  Recupera dalla tabella cons_t_consenso l'ultimo stato valido del consenso per l'assistito e l'ente specificati.
    4.  Recupera le informazioni sull'informativa associata da cons_d_informativa.
    5.  Il sistema risponde con un oggetto JSON contenente: valore_consenso, data_espressione, stato_consenso, informativa (con versione, date validità), data_inizio_validita_consenso, data_fine_validita_consenso.
**Specifiche tecniche API:**
GET /api/v1/consensi/stato?codice_fiscale={cf}&codice_consenso={cod}&codice_ente={ente}
Autenticazione: Bearer Token (JWT) rilasciato dall'Authorization Server del CSI Piemonte. Il token deve includere il client_id del sistema SIA chiamante.
**Response**** 200 OK:**
{
  "codice_fiscale": "RSSMRA80A01L219X",
  "codice_consenso": "ROL",
  "codice_ente": "010",
  "stato_consenso": "ATTIVO",
  "valore_consenso": "SI",
  "data_espressione": "2025-01-15T10:30:00Z",
  "informativa": {
    "id": 42,
    "versione": "3.1",
    "data_decorrenza": "2024-06-01",
    "data_scadenza": null
  }
}
**Codici di risposta:** 200 OK, 400 Bad Request (parametri mancanti/malformati), 401 Unauthorized, 403 Forbidden (ente non autorizzato a leggere quel consenso), 404 Not Found (consenso non trovato per l'assistito), 500 Internal Server Error.

### 6.16 CDU-16: Esposizione servizio di configurazione (per Enti/Aziende)


**Attore primario**: Sistema Informativo Aziendale (SIA).
**Obiettivo:** [DOC] Fornire un servizio REST che esponga le configurazioni attive (consensi, informative, endpoint) per un dato ente, permettendo ai sistemi esterni di allinearsi dinamicamente [1].
**Precondizioni:** Il sistema chiamante deve essere autenticato e autorizzato.
**Scenario principale:**
    1.  Il sistema esterno (client) invia una richiesta GET all'endpoint /api/v1/configurazione/{codice_ente}.
    2.  Il sistema Gestione Consensi valida la richiesta.
    3.  Recupera dal database l'elenco dei consensi attivi per l'ente specificato.
    4.  Per ogni consenso, recupera l'informativa attiva e gli endpoint di notifica configurati.
    5.  Il sistema risponde con un oggetto JSON strutturato contenente l'elenco dei consensi, ognuno con i dettagli dell'informativa e degli endpoint associati.
**Specifiche tecniche API:**
GET /api/v1/configurazione/{codice_ente}
**Autenticazione:** medesima di CDU-15 (Bearer Token JWT).
**Response**** 200 OK:**
{
  "codice_ente": "010",
  "consensi_attivi": [
    {
      "codice_consenso": "ROL",
      "descrizione": "Ritiro On Line Referti",
      "tipo": "AZIENDALE",
      "informativa": {
        "id": 42,
        "data_decorrenza": "2024-06-01"
      },
      "endpoints_notifica": [
        {
          "endp_id": 5,
          "endp_url": "https://sia.asl01.piemonte.it/ws/consensi"
        }
      ] }]}

## 7. Processi batch

[DOC] Il sistema prevede l'esecuzione di processi batch periodici per gestire attività asincrone e massive, garantendo l'allineamento dei dati tra il sistema centrale e i sistemi periferici, e mantenendo informati i cittadini. [1]

### 7.1 BATCH-01: Notifica consensi verso aziende/enti

**Informazioni di base**
Nome: NotificaConsensi
Periodicità: Ogni 5 minuti
**Descrizione procedura:** Il processo batch notifica ai sistemi esterni (endpoint) le variazioni dei consensi (nuovi, modificati).
**Input:** Tabella cons_t_notifica
**Output:** Chiamate ai Web Service degli endpoint, aggiornamento cons_t_notifica
**Logica applicativa**
- Il processo seleziona tutti i record dalla tabella cons_t_notifica con not_stato = ‘DA_INVIARE’.
Per ogni record, costruisce il messaggio SOAP di notifica (Acquisizione) contenente i dati del consenso.
Invia la notifica all'URL specificato in not_endp_url.
Per ogni notifica inviata con successo all'azienda, il sistema inserisce un record nella tabella delle notifiche verso il cittadino per informarlo dell'avvenuta comunicazione del suo consenso all'azienda X.

- **Nota per gli sviluppatori:** Confermato da CSI: i sistemi informativi aziendali (SIA) delle ASR che ricevono le notifiche del BATCH-01 mantengono gli endpoint SOAP esistenti e non sono previste migrazioni a REST/JSON nel TO-BE. I contratti WSDL e gli endpoint AS-IS descritti nel documento di riferimento [6] (*Specifica-WebService_ConsensoRegionaleAziendale_v03*) rimangono validi e devono essere rispettati.
- Di conseguenza, il backend Spring Boot deve includere un client SOAP per la comunicazione con i SIA delle ASR. Si raccomanda l'utilizzo di Apache CXF (integrazione nativa con Spring Boot 3.x tramite cxf-spring-boot-starter-jaxws) oppure di Spring-WS (spring-ws-core). La scelta del framework SOAP client deve essere consolidata nella fase di progettazione tecnica.
- Il payload del messaggio SOAP di notifica deve essere compatibile con l'operazione Acquisizione definita nel WSDL di riferimento e deve includere obbligatoriamente i campi: codFiscale, codAsr, codConsenso, valConsenso (SI/NO), dataAcquisizione, codOperatore, fonte.
- La gestione degli errori SOAP (SOAP Fault) deve aggiornare il record in cons_t_notifica con not_stato = 'ERRORE' e registrare i dettagli in cons_t_notifica_errore_dett, come già descritto nella variante VAR01 di 7.1.
**Varianti**
VAR01: Se la chiamata al servizio esterno fallisce (errore HTTP o SOAP Fault), il processo aggiorna il record in cons_t_notifica impostando not_stato = ‘ERRORE’ e registra i dettagli dell'errore in cons_t_notifica_errore_dett.
**Algoritmi**
**ALG01 - Selezione record da notificare:** SELECT * FROM cons_t_notifica WHERE not_stato = 'DA_INVIARE' ORDER BY data_creazione ASC;
**ALG02 - Gestione tentativi:** [PROPOSTA] Si propone di aggiungere un contatore di tentativi in cons_t_notifica. Dopo 3 tentativi falliti, il record viene impostato su ‘ERRORE_PERMANENTE’ e non viene più processato automaticamente, richiedendo un intervento manuale.
**Condizioni d’uscita:** Il processo termina dopo aver tentato di inviare tutte le notifiche in stato ‘DA_INVIARE’.

### 7.2 BATCH-02: Notifica scadenza/annullamento informativa

**Informazioni di base**
Nome: NotificaScadenzaInformative
Periodicità: Una volta al giorno (notturno)
**Descrizione procedura:** Il processo verifica le informative la cui data di scadenza è passata e aggiorna lo stato dei consensi collegati. Invia inoltre notifiche ai cittadini quando un consenso viene annullato.
**Input:** Tabelle cons_d_informativa, cons_t_consenso
**Output:** Aggiornamento cons_t_consenso, notifiche via Notificatore Regionale
**Logica applicativa**
- Il processo seleziona tutte le informative da cons_d_informativa dove data_scadenza è passata.
- Per ogni informativa scaduta, il processo esegue la logica descritta nell'algoritmo ALG02 per chiudere i vecchi consensi e creare i nuovi record con stato SCADUTO o ANNULLATO 
- Passaggio storicizzazione: Il sistema esegue una INSERT nella tabella cons_s_consenso copiando tutti i dati del record appena chiuso in cons_t_consenso, valorizzando la FK cons_id.
- [DOC] Per ogni consenso impostato su ANNULLATO che richiede una notifica al cittadino:
- a: Il sistema invoca il servizio del Notificatore Regionale per verificare le preferenze di contatto per il cittadino (identificato da cf_cittadino) e per il modulo "Gestione Consensi". 
- b: Se il cittadino ha espresso una preferenza e ha fornito un canale di contatto (es. email), il sistema procede con l'invio.  
- c: Il sistema invia la notifica tramite il canale preferito, informando della variazione di stato del consenso.
- d: L'intera interazione (chiamata di verifica, esito, invio notifica) viene tracciata nelle tabelle di log dei servizi esterni.
-	Se il cittadino non ha espresso preferenze o canali di contatto, la notifica non viene inviata e l'operazione si considera conclusa per quel consenso.
**Gestione transazionale:**
Il processo BATCH-02 deve operare per lotti (batch_size configurabile, default: 1000 record per iterazione), eseguendo un COMMIT al termine di ogni STATO ELABORAZIONE.
Prima di processare un'informativa scaduta, il processo deve impostare un flag di lavorazione (es. aggiungere un campo stato_elaborazione con valori DA_ELABORARE/IN_ELABORAZIONE/ELABORATA nella tabella cons_d_informativa) per garantire che in caso di riavvio il processo non riprocessi record già gestiti.
**Interazione con BATCH-01:** I record inseriti in cons_t_notifica con not_stato = 'DA_INVIARE' da questo processo saranno notificati alle aziende dal BATCH-01 al successivo ciclo di esecuzione (ogni 5 minuti). Il BATCH-02 non effettua chiamate dirette agli endpoint aziendali: si limita a popolare la coda di notifica. I record di notifica verso il Notificatore Regionale (flag flag_notifica_cittadino = TRUE) saranno invece inviati direttamente da BATCH-02 (non da BATCH-01).
**Algoritmi**
- **ALG01 – Selezione consensi da elaborare**
- SELECT d_informativa_id, annulla_consensi 
- FROM cons_d_informativa 
- WHERE data_scadenza < NOW() 
- AND stato_elaborazione = 'DA_ELABORARE';
- [PROPOSTA] Per ogni informativa scaduta individuata dalla query precedente, il sistema ricerca in cons_d_informativa il record attivo (data_scadenza IS NULL o > NOW()) associato allo stesso sotto_tipo_consenso per determinare il :nuova_d_informativa_id:
- SELECT d_informativa_id AS nuova_d_informativa_id
- FROM cons_d_informativa
- WHERE sotto_tipo_consenso = :sotto_tipo_consenso_scaduta 
- AND (data_scadenza IS NULL OR data_scadenza > NOW()) 
- AND data_decorrenza <= NOW() 
- AND data_cancellazione IS NULL 
- ORDER BY data_decorrenza DESC 
- LIMIT 1
- **Per ogni informativa scaduta, il processo seleziona tutti i consensi collegati (****cons_t_consenso****) che si trovano nello stato ATTIVO o NEGATO****.**
- SELECT cons_id, tipo_stato
-     FROM cons_t_consenso
-     WHERE d_informativa_id = [ID_INFORMATIVA_SCADUTA]
-     AND tipo_stato IN (‘ATTIVO’, ‘NEGATO’);
- **ALG02 – Aggiornamento Stato Consenso:**
Per ogni cons_id individuato nel passo precedente, il sistema deve:
1.  ***Chiudere il record corrente*****:** Aggiornare il record esistente nella tabella cons_t_consenso impostando la data di fine validità.
    UPDATE cons_t_consenso
    SET data_fine = NOW(),
        data_modifica = NOW(),
        login_operazione = 'BATCH_SCADENZA_INF'
    WHERE cons_id = :ID_CONSENSO_DA_CHIUDERE
    AND data_fine IS NULL;
2.  ***Inserire il nuovo record storicizzato*****:** Creare un nuovo record nella tabella cons_t_consenso con il nuovo stato (SCADUTO o ANNULLATO in base alla logica) e tutti i dati del record precedente, aggiornando la data di creazione e acquisizione.
INSERT INTO cons_t_consenso (
    cf_cittadino,
    id_aura,
    nome,
    cognome,
    sotto_tipo_consenso,     -- NOT NULL — obbligatorio (8.4.10)
    cod_asr,
    d_informativa_id,        -- ID della NUOVA informativa
    operatore_id,
    fonte_id,
    audit_id,
    tipo_stato,
    valore_consenso,
    data_acquisizione,
    data_fine,
    login_operazione,
    uuid,
    cf_delegato,
    endp_id,
    data_creazione,
    data_modifica,
    data_cancellazione
)
SELECT
    c.cf_cittadino,
    c.id_aura,
    c.nome,
    c.cognome,
    c.sotto_tipo_consenso,   -- copiato dal record originale (stessa FK)
    c.cod_asr,
    i.d_informativa_id,      -- nuova informativa dal parametro
    c.operatore_id,
    c.fonte_id,
    c.audit_id,
    CASE WHEN i.annulla_consensi = TRUE
         THEN 'ANNULLATO'
         ELSE 'SCADUTO'
    END                      AS tipo_stato,
    c.valore_consenso,
    NOW()                    AS data_acquisizione,
    NULL                     AS data_fine,
    'BATCH-02'               AS login_operazione,
    gen_random_uuid()        AS uuid,
    c.cf_delegato,
    NULL                     AS endp_id,   -- NULL: valorizzato solo per consensi ricevuti da SIA
    NOW()                    AS data_creazione,
    NOW()                    AS data_modifica,
    NULL                     AS data_cancellazione
FROM  cons_t_consenso    c
JOIN  cons_d_informativa i ON i.d_informativa_id = :nuova_d_informativa_id
WHERE c.cons_id = :cons_id_da_chiudere;
**Note Tecniche**
sotto_tipo_consenso viene copiato direttamente da c.sotto_tipo_consenso del record originale: è lo stesso tipo di consenso, cambia solo l'informativa associata.​
d_informativa_id punta alla nuova informativa (:nuova_d_informativa_id), non all'old. 
endp_id = NULL perché i consensi inseriti/aggiornati da processi batch non hanno un endpoint di origine diretto — il campo viene valorizzato solo per i consensi ricevuti via SIA (8.3.11).​
gen_random_uuid() genera un UUID univoco per il nuovo record (funzione nativa PostgreSQL 17).
**Specifica Tecnica del Notificatore Regionale (UNP – User Notification Platform)**
Il Notificatore Regionale del CSI Piemonte è la User Notification Platform (UNP), un servizio centralizzato che espone API REST per l'invio di notifiche ai cittadini. La documentazione tecnica aggiornata delle specifiche di integrazione è disponibile al seguente indirizzo:
Il team di sviluppo deve consultare questa documentazione come riferimento primario per l'implementazione dell'integrazione.
**Canali di notifica disponibili:**

| **Canale** | **Disponibilità** | **Note** |
| --- | --- | --- |
| **email** | Disponibile | Canale principale per le notifiche al cittadino |
| **push** | Disponibile | Notifica push su applicazioni mobile |
| **IO** | Disponibile | Notifica tramite app IO (piattaforma nazionale PagoPA) |
| **mex** | Disponibile | Notifica interna all'**area riservata del portale Salute Piemonte** |
| **SMS** | Disponibile ma non utilizzato | Tecnicamente disponibile, ma non utilizzato per policy; da non implementare nella fase iniziale salvo specifica indicazione |

**Logica di selezione del canale:**

Il Notificatore gestisce internamente le preferenze di contatto del cittadino. Il sistema Gestione Consensi non deve implementare logiche di selezione del canale: deve invocare l'API UNP specificando il modulo applicativo ("Gestione Consensi") e il Codice Fiscale del destinatario; sarà l'UNP a determinare il canale/i canali preferiti del cittadino e a procedere con l'invio.
**Implicazioni per BATCH-02:**

Nella logica applicativa del BATCH-02, i passi a, b, c descritti nella procedura di notifica al cittadino devono essere implementati come chiamate REST all'API UNP. In particolare:
La verifica delle preferenze di contatto è gestita internamente dall'UNP (non è necessaria una chiamata separata di verifica).
Il sistema deve inviare al Notificatore almeno: il **Codice Fiscale del destinatario**, il **codice del modulo applicativo**, il **tipo di evento** (es. consenso annullato, scaduto) e un **testo del messaggio** o un **template predefinito**.
L'intero ciclo di chiamata (request/response) deve essere tracciato nella tabella cons_t_traccia_serv_est come da 4.1.

### 7.3 BATCH-03: Allineamento consensi per nuovi endpoint

**Informazioni di base**
Nome: AllineamentoNuoviEndpoint
Periodicità: Asincrono — viene triggerato automaticamente al salvataggio di un nuovo endpoint nel CDU-14
**Descrizione procedura:** Quando viene aggiunto un nuovo endpoint per un consenso già attivo, il nuovo sistema SIA deve ricevere lo stato attuale di tutti i consensi già espressi dai cittadini per quella tipologia. Questo batch esegue l'allineamento massivo.
**Input:** cons_r_asr_endpoint (record con stato_allineamento = 'IN_CORSO'), cons_t_consenso, cons_r_sotto_tipo_cons_asr_endpoint
**Output:** Popolamento cons_t_notifica, aggiornamento stato_allineamento = 'COMPLETATO'
**Logica applicativa**
- Il processo legge dalla tabella cons_r_asr_endpoint tutti i record con stato_allineamento = 'DA_ALLINEARE' e li imposta a 'IN_CORSO' prima di procedere con l'elaborazione.
- Per ogni endpoint in allineamento, recupera tutti i consensi attivi (data_fine IS NULL, tipo_stato IN ('ATTIVO','NEGATO')) per la sotto-tipologia di consenso associata a quell'endpoint.
- Per ogni consenso trovato, inserisce un record in cons_t_notifica con not_stato = 'DA_INVIARE' e flag_notifica_cittadino = FALSE.
- Importante: I record inseriti in cons_t_notifica da questo batch devono avere un flag o un campo che li distingua dalle notifiche ordinarie, in quanto non devono generare notifiche al cittadino (il cittadino ha già ricevuto conferma al momento dell'espressione originale). Usare flag_notifica_cittadino = FALSE.
- Al termine dell'inserimento, imposta stato_allineamento = 'COMPLETATO' nella tabella sorgente.
- Durante l'allineamento (stato_allineamento = 'IN_CORSO'), il CDU-03 e CDU-09 devono bloccare la possibilità di esprimere nuovi consensi per quell'endpoint (come già indicato nelle precondizioni dei CDU-03 e CDU-09).
- **Gestione errori: **In caso di errore nell'inserimento di una notifica, il record in errore viene salvato in cons_t_batch_errori. Il processo prosegue con i record successivi. stato_allineamento rimane IN_CORSO finché non sono stati processati tutti i consensi senza errori.
- **Algoritmi**
- **ALG01 - Selezione nuovi endpoint ****[DEDOTTO]**
Ciclo di vita stato_allineamento:
**DA_ALLINEARE**: stato iniziale al salvataggio del nuovo endpoint (CDU-14 step 6)
**IN_CORSO**: impostato da BATCH-03 all'inizio dell'elaborazione dell'endpoint
**COMPLETATO**: impostato da BATCH-03 al termine con successo
**ERRORE**: impostato da BATCH-03 se l'elaborazione termina con errori non recuperabili
- SELECT rae.endp_id, stcrae.sotto_tipo_consenso 
- FROM cons_r_asr_endpoint rae
- JOIN cons_r_sotto_tipo_cons_asr_endpoint stcrae 
- ON stcrae.asr_endpoint_id = rae.asr_endpoint_id 
- JOIN cons_t_endpoint e ON e.endp_id = rae.endp_id 
- WHERE rae.stato_allineamento = 'DA_ALLINEARE' 
- AND rae.data_cancellazione IS NULL
- **ALG02 - Creazione notifiche per allineamento ****[DEDOTTO]**
- INSERT INTO cons_t_notifica (not_stato, not_endp_url, cons_id, cf_cittadino, ...)
- SELECT 'DA_INVIARE', e.endp_url, c.cons_id, c.cf_cittadino, ...
- FROM cons_t_consenso c
- JOIN cons_r_asr_endpoint rae ON rae.cod_asr = c.cod_asr
- JOIN cons_t_endpoint e ON e.endp_id = rae.endp_id
- WHERE c.tipo_stato IN ('ATTIVO','NEGATO') 
- AND c.data_fine IS NULL 
- AND e.endp_id = :nuovo_endpoint_id 
- AND c.sotto_tipo_consenso = :sotto_tipo_consenso_del_endpoint
- Per ogni consenso clonato, il sistema inserisce un record nella tabella cons_t_notifica per il nuovo endpoint, impostando un flag specifico flag_notifica_cittadino = false per evitare che l'utente riceva una notifica per un'operazione di sistema.
**Condizioni d’uscita:** Il processo termina dopo aver elaborato tutti i nuovi endpoint.

## 8. Modello dei dati

[DOC] Il modello dei dati del nuovo applicativo Gestione Consensi è stato profondamente rivisto per supportare la nuova architettura e le funzionalità estese. Il modello logico finale, proposto dal cliente, garantisce maggiore flessibilità, normalizzazione e scalabilità [1]. 
[PROPOSTA] Si raccomanda di implementare indici sulle chiavi esterne (FK) e sui campi utilizzati frequentemente nelle clausole di ricerca (es. cf_cittadino in cons_t_consenso) per ottimizzare le performance delle query.

### 8.1 Diagramma Entità-Relazione (AS-IS)

[DOC] Di seguito è riportato il diagramma Entità-Relazione del database attualmente in produzione, come fornito dal cliente.

### 8.2 Diagramma Entità-Relazione (TO-BE)

[DOC] Di seguito è riportato il diagramma Entità-Relazione (ER) che descrive la struttura del database "TO-BE", basato sul diagramma fornito dal cliente.


### 8.3 Dizionario dati (TO-BE)

[DOC] Di seguito viene riportata la descrizione dettagliata di ciascuna entità del nuovo modello dati proposto.

### 8.3.1 cons_d_allegato_tipo

Nuova tabella. Allegati tipo consenso

| Colonna | PK/FK |
| --- | --- |
| allegato_tipo_id | PK |
| allegato_tipo_cod |  |
| allegato_tipo_desc |  |
| validita_inizio |  |
| validita_fine |  |
| data_creazione |  |
| data_modifica |  |
| utente_creazione |  |
| data_cancellazione |  |
| utente_modifica |  |
| utente_cancellazione |  |
| ruoloop_id |  |


### 8.3.2 cons_d_parametro

Nuova tabella. Setting parametri di dominio

| Colonna | PK/FK |
| --- | --- |
| param_id | PK |
| param_cod |  |
| param_desc |  |
| validita_inizio |  |
| validita_fine |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.3.3 cons_d_tipo_cons

[DOC] Tabella AS-IS mantenuta. Codifica delle tipologie di consenso.

| Colonna | PK/FK |
| --- | --- |
| tipo_consenso | PK |
| desc_tipo_cons |  |
| data_decorrenza |  |
| data_scadenza |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.3.4 cons_d_sotto_tipo_cons

[DOC] Tabella AS-IS mantenuta. Codifica delle sotto-tipologie di consenso.

| Colonna | PK/FK |
| --- | --- |
| sotto_tipo_consenso | PK |
| desc_sotto_tipo_cons |  |
| data_decorrenza |  |
| data_scadenza |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |
| tipo_consenso | FK |


### 8.3.5 cons_d_informativa

[DOC] Tabella delle informative, estesa con nuovi campi rispetto all'AS-IS.
**Decisione progettuale:** I campi online e annulla_consensi rimangono nella tabella cons_d_informativa per semplicità implementativa e per retrocompatibilità con il codice AS-IS che li legge direttamente. I record in cons_r_consenso_parametro per questi due parametri non saranno creati nel TO-BE V1.0. Il requisito par. 2.2.2.1 del documento è quindi soddisfatto tramite la tabella cons_d_informativa. Questa scelta dovrà essere rivista in una futura versione se si vorrà rendere i parametri completamente dinamici per configurazione.


| Colonna | PK/FK |
| --- | --- |
| d_informativa_id | PK |
| tipo_consenso |  |
| sotto_tipo_consenso | FK |
| pdf_informativa |  |
| data_decorrenza |  |
| data_scadenza |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |
| desc_informativa |  |
| html_informativa |  |
| online |  |
| annulla_consensi |  |


### 8.3.6 cons_r_informativa_asr

[DOC] Tabella di relazione tra informative e ASR.

| Colonna | PK/FK |
| --- | --- |
| informativa_asr_id | PK |
| d_informativa_id | FK |
| cod_asr | FK |
| valida_inizio |  |
| valida_fine |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| utente_creazione |  |
| utente_modifica |  |
| utente_cancellazione |  |
| ruoloop_id |  |


### 8.3.7 cons_r_asr_endpoint

Nuova tabella. Relazione tra ASR e endpoint.

| Colonna | PK/FK |
| --- | --- |
| asr_endpoint_id | PK |
| cod_asr | FK |
| endp_id | FK |
| valida_inizio |  |
| valida_fine |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.3.8 cons_d_asr

[DOC] Anagrafica degli Enti/Aziende Sanitarie.

| Colonna | PK/FK |
| --- | --- |
| cod_asr | PK |
| desc_asr |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.3.9 cons_t_allegato

Nuova tabella. Gestione transazionale allegati.

| Colonna | PK/FK |
| --- | --- |
| allegato_id | PK |
| file_name |  |
| file_type |  |
| file_path |  |
| allegato_tipo_id | FK |
| d_informativa_id | FK |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| utente_creazione |  |
| utente_modifica |  |
| utente_cancellazione |  |
| ruoloop_id |  |


### 8.3.10 cons_t_endpoint

[DOC] Endpoint dei sistemi informativi aziendali per la notifica.

| Colonna | PK/FK |
| --- | --- |
| endp_id | PK |
| endp_url |  |
| id_app |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |
| valida_inizio |  |
| valida_fine |  |


### 8.3.11 cons_t_consenso

[DOC] Tabella transazionale principale. Contiene i consensi espressi dai cittadini.

| Colonna | PK/FK |
| --- | --- |
| cons_id | PK |
| operatore_id | FK |
| fonte_id | FK |
| tipo_stato | FK |
| audit_id | FK |
| d_informativa_id | FK |
| cod_asr | FK |
| valore_consenso | FK |
| cf_cittadino |  |
| id_aura |  |
| nome |  |
| cognome |  |
| cf_delegato |  |
| data_acquisizione |  |
| data_fine |  |
| uuid |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |
| endp_id | FK |

**NOTA**: il campo sotto_tipo_consenso (FK → cons_d_sotto_tipo_cons, NOT NULL) è obbligatorio per il corretto funzionamento degli algoritmi CDU-03, CDU-04, BATCH-02 e BATCH-03. Vedere 8.4.10 per la definizione completa.

### 8.3.12 cons_s_consenso

[DOC] Tabella di storico dei consensi. Struttura analoga a cons_t_consenso con campi aggiuntivi.
**Nota tecnica**: Regola di popolamento: Un record viene inserito in cons_s_consenso ogni volta che un record in cons_t_consenso viene chiuso (cioè ogni volta che viene eseguito un UPDATE cons_t_consenso SET data_fine = NOW()). L'inserimento in cons_s_consenso deve essere implementato come parte dello stesso metodo/transazione che esegue la chiusura del record attivo, sia nei CDU (CDU-03 ALG02, CDU-04 ALG02, CDU-05 ALG01) sia nei batch (BATCH-02 ALG02). I campi di cons_s_consenso coincidono con quelli del record chiuso in cons_t_consenso, con l'aggiunta della FK cons_id che mantiene il collegamento al record originale.

| Colonna | PK/FK |
| --- | --- |
| conss_id | PK |
| cons_id | FK |
| operatore_id |  |
| fonte_id |  |
| tipo_stato |  |
| audit_id |  |
| d_informativa_id |  |
| cod_asr |  |
| valore_consenso |  |
| cf_cittadino |  |
| id_aura |  |
| nome |  |
| cognome |  |
| cf_delegato |  |
| data_acquisizione |  |
| data_fine |  |
| uuid |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |

**NOTA**: il campo sotto_tipo_consenso (FK → cons_d_sotto_tipo_cons, NOT NULL) è obbligatorio per il corretto funzionamento degli algoritmi CDU-03, CDU-04, BATCH-02 e BATCH-03. Vedere 8.4.10 per la definizione completa.

### 8.3.13 cons_t_notifica

[DOC] Coda delle notifiche da inviare ai sistemi esterni.

| Colonna | PK/FK |
| --- | --- |
| not_id | PK |
| not_stato |  |
| not_avvio |  |
| not_fine |  |
| not_endp_url |  |
| cons_id | FK |
| request_id |  |
| err_tipo_id | FK |
| id_aura |  |
| cf_cittadino |  |
| cf_delegato |  |
| fonte_id | FK |
| operatore_id | FK |
| tipo_stato | FK |
| d_informativa_id | FK |
| cod_asr | FK |
| valore_consenso | FK |
| data_acquisizione |  |
| data_fine |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |
| endp_id | FK |


### 8.3.14 cons_t_notifica_errore_dett

[DOC] Dettaglio degli errori relativi alle notifiche.

| Colonna | PK/FK |
| --- | --- |
| errdett_id | PK |
| errdett_cod |  |
| errdett_desc |  |
| not_id | FK |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.3.15 cons_d_errore_tipo

[DOC] Codifica dei tipi di errore.

| Colonna | PK/FK |
| --- | --- |
| err_tipo_id | PK |
| err_tipo_cod |  |
| err_tipo_desc |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.3.16 cons_d_valore_cons

[DOC] Decodifica dei possibili valori del consenso.

| Colonna | PK/FK |
| --- | --- |
| valore_consenso | PK |
| desc_consenso |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.3.17 cons_d_stato

[DOC] Decodifica degli stati del consenso.

| Colonna | PK/FK |
| --- | --- |
| tipo_stato | PK |
| desc_stato |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.3.18 cons_d_fonte

[DOC] Codifica delle fonti di acquisizione del consenso.

| Colonna | PK/FK |
| --- | --- |
| fonte_id | PK |
| fonte_cod |  |
| fonte_desc |  |
| tipo_fonte_id | FK |
| data_decorrenza |  |
| data_scadenza |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.3.19 cons_d_tipo_fonte

[DOC] Codifica dei tipi di fonte di acquisizione.

| Colonna | PK/FK |
| --- | --- |
| tipo_fonte_id | PK |
| tipofonte_cod |  |
| tipofonte_desc |  |
| data_decorrenza |  |
| data_scadenza |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.3.20 cons_d_operatore

[DOC] Codifica degli operatori.

| Colonna | PK/FK |
| --- | --- |
| operatore_id | PK |
| tipo_operatore |  |
| cod_operatore |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.3.21 cons_t_operatorebo

[DOC] Tabella degli operatori di back office.

| Colonna | PK/FK |
| --- | --- |
| operatorebo_id | PK |
| cf_operatore |  |
| operatore_id | FK |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.3.22 csi_log_audit

[DOC] Tabella di audit per la tracciatura delle operazioni.

| Colonna | PK/FK |
| --- | --- |
| audit_id | PK |
| data_ora |  |
| id_app |  |
| ip_address |  |
| utente |  |
| proprietario |  |
| ruolo |  |
| operazione |  |
| ogg_oper |  |
| key_oper |  |
| idrequest |  |
| uuid |  |
| request_payload |  |
| response_payload |  |
| esito_chiamata |  |


### 8.3.23 cons_r_sotto_tipo_cons_asr_endpoint

Nuova tabella. Relazione tra sotto tipologie di consenso ASR e endpoint

| Colonna | PK/FK |
| --- | --- |
| sotto_tipo_consenso_asr_id | PK |
| sotto_tipo_consenso | FK |
| asr_endpoint_id | FK |
| valida_inizio |  |
| valida_fine |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| utente_creazione |  |
| utente_modifica |  |
| utente_cancellazione |  |
| ruoloop_id |  |


### 8.3.24 cons_r_consenso_valore

Nuova tabella. Relazione tra sotto tipologie di consenso e valore per gestione notifiche


| Colonna | PK/FK |
| --- | --- |
| consenso_valore_id | PK |
| sotto_tipo_consenso | FK |
| valore_consenso | FK |
| validita_inizio |  |
| validita_fine |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.3.25 cons_r_consenso_parametro

Nuova tabella. Relazione tra i parametri configurabili del consenso e la sotto tipologia consenso.

| Colonna | PK/FK |
| --- | --- |
| r_cons_param_id | PK |
| sotto_tipo_consenso | FK |
| param_id | FK |
| param_val |  |
| validita_inizio |  |
| validita_fine |  |
| data_creazione |  |
| data_modifica |  |
| data_cancellazione |  |
| login_operazione |  |
| ruoloop_id |  |


### 8.4 Proposte evolutive dal Diagramma

Di seguito le proposte per ottimizzare il DB e coprire le funzionalità dei requisiti V03.
Nota per gli sviluppatori: Le proposte di questa sezione sono necessarie per la completa implementazione dei processi descritti nel documento. In particolare:
8.4.1 (cons_t_traccia_serv_est): obbligatoria per CDU-09, CDU-10, CDU-11 e §4.1
8.4.2 (estensione cons_t_notifica): obbligatoria per BATCH-01, BATCH-02, BATCH-03
8.4.3 (stato_allineamento): obbligatorio per CDU-03, CDU-09 e BATCH-03
8.4.10 Estensione cons_t_consenso e cons_s_consenso: obbligatoria per CDU-03 ALG02, CDU-04 ALG02, CDU-05 ALG01, BATCH-02 ALG02, BATCH-03 ALG02

### 8.4.1 [PROPOSTA] Nuova Tabella: cons_t_traccia_serv_est

Scopo: Tracciare tutte le chiamate in uscita verso servizi esterni (AURA, Deleghe, Notificatore, INI), come richiesto dal par. 2.9 dei requisiti.

| Colonna | PK/FK | Descrizione |
| --- | --- | --- |
| traccia_id | PK | Identificativo univoco della traccia. |
| servizio_chiamato |  | Nome del servizio esterno chiamato (es. AURA, DELEGHE). |
| operazione_chiamata |  | Nome dell'operazione/metodo specifico. |
| data_chiamata |  | Timestamp di inizio della chiamata. |
| audit_id | FK | Riferimento alla tabella di audit csi_log_audit. |
| cf_cittadino |  | Codice Fiscale dell'assistito per cui si effettua la chiamata. |
| cf_delegato |  | Eventuale CF del delegato. |
| request |  | Payload della richiesta inviata. |
| response |  | Payload della risposta ricevuta. |
| esito |  | Esito della chiamata (OK, KO). |
| errore_cod |  | Eventuale codice di errore. |
| errore_desc |  | Eventuale descrizione dell'errore. |

**Nota per gli sviluppatori**: Questa tabella è un requisito funzionale obbligatorio, non opzionale. La sua creazione è necessaria per la corretta implementazione dei CDU-09, CDU-10 e CDU-11 (ALG01) e del capitolo 4.1.

### 8.4.2 [PROPOSTA] Estensione Tabella: cons_t_notifica

Scopo: Gestire anche le notifiche verso i cittadini tramite Notificatore (par. 2.7), oltre a quelle verso gli endpoint aziendali.



| Colonna | PK/FK | Descrizione |
| --- | --- | --- |
| ... |  | (campi esistenti) |
| notificatore_uuid |  | UUID ricevuto dal Notificatore a conferma dell'avvenuto invio. Valorizzato solo se flag_notifica_cittadino = TRUE. |
| notificatore_data_invio |  | Timestamp di invio al Notificatore. |
| flag_notifica_cittadino |  | Flag BOOLEAN. Se TRUE, il record è una notifica verso il cittadino tramite Notificatore Regionale; se FALSE è una notifica verso endpoint aziendale. Necessario per BATCH-01 e BATCH-03. |
| **num_tentativi** |  | Contatore dei tentativi di invio effettuati. Default: 0. Quando raggiunge il valore configurabile MAX_TENTATIVI (default: 3), il record viene portato in stato ERRORE_PERMANENTE e non viene più processato automaticamente dal BATCH-01. |


### 8.4.3 [PROPOSTA] Estensione Tabella: cons_r_asr_endpoint

Scopo: Gestire lo stato di allineamento quando viene aggiunto un nuovo endpoint (par. 2.11 v3).

| Colonna | PK/FK | Descrizione |
| --- | --- | --- |
| ... |  | (campi esistenti) |
| stato_allineamento |  | [NUOVO] Stato del processo di allineamento per il nuovo endpoint. Valori possibili:DA_ALLINEARE, ERRORE, COMPLETATO, IN_CORSO. Default: DA_ALLINEARE. |


### 8.4.4 [PROPOSTA] Estensione Tabella: cons_s_consenso

Scopo: Aggiungere coerenza con la tabella cons_t_consenso per lo storico.

| Colonna | PK/FK | Descrizione |
| --- | --- | --- |
| ... |  | (campi esistenti) |
| endp_id | FK | [NUOVO] Riferimento all'endpoint di provenienza del consenso. |


### 8.4.5 [PROPOSTA] Spostamento campi "online" e "annulla_consensi" 

**Scopo:**** **Il documento requisiti V03 (par. 2.2.2.1) descrive online e annulla_consensi come parametri del consenso, da salvare in cons_r_consenso_parametro. Come indicato nella decisione progettuale del par. 8.3.5, nella V1.0 questi campi rimangono nella tabella cons_d_informativa per semplicità implementativa e retrocompatibilità. In una futura versione (V2.0), si valuterà lo spostamento completo verso cons_r_consenso_parametro per rendere i parametri completamente dinamici.

| Colonna | PK/FK | Descrizione |
| --- | --- | --- |
| ... |  | (campi esistenti) |
| online |  |  |
| Annulla consensi |  |  |


### 8.4.6 [PROPOSTA] Estensione Tabella: cons_d_asr

**Scopo:**** **Valori ammessi: NAZIONALE, REGIONALE, AZIENDALE. Indispensabile per la logica del CDU-12 (popolamento dinamico lista enti).

| **Colonna** | **PK/FK** | **Descrizione** |
| --- | --- | --- |
| tipo_ente |  | Tipologia dell'ente. Valori ammessi: NAZIONALE, REGIONALE, AZIENDALE. Indispensabile per la logica del CDU-12 (popolamento dinamico lista enti). |


### 8.4.7 [PROPOSTA] Nuova Tabella: cons_d_asr_destinazione

Scopo: Codifica delle tipologie di destinazione degli endpoint (es. NOTIFICA_CONSENSO, RECUPERO_STATO, CONFIGURAZIONE). Necessaria per classificare gli endpoint configurati nel CDU-14.

| **Colonna** | **PK/FK** | **Descrizione** |
| --- | --- | --- |
| destinazione_id | PK | Identificativo univoco della destinazione |
| destinazione_cod |  | Codice identificativo (es. NOTIF, QUERY, CONFIG) |
| destinazione_desc |  | Descrizione leggibile (es. "Notifica consensi", "Recupero stato") |
| data_creazione |  | Timestamp creazione |
| data_modifica |  | Timestamp ultima modifica |
| data_cancellazione |  | Timestamp cancellazione logica |
| login_operazione |  | CF operatore |
| ruoloop_id |  | ID ruolo |


### 8.4.8 [PROPOSTA] Estensione Tabella: cons_d_informativa

Scopo: gestione transazionale Batch-02

| **Colonna** | **PK/FK** | **Descrizione** |
| --- | --- | --- |
| **Stato_elaborazione** |  | **Valori ammessi: ****DA_ELABORARE/IN_ELABORAZIONE/ELABORATA** |


### 8.4.9 [PROPOSTA] Nuova Tabella: cons_t_batch_errori

Scopo: Tabella di log degli errori dei processi batch. Registra ogni eccezione non fatale incontrata durante l'esecuzione di BATCH-01, BATCH-02 e BATCH-03, permettendo il monitoraggio e il ri-processamento manuale dei record falliti senza bloccare l'intera elaborazione.

| **Colonna** | **PK/FK** | **Descrizione** |
| --- | --- | --- |
| batch_err_id | PK | Identificativo univoco dell'errore |
| batch_nome |  | Nome del processo batch che ha generato l'errore. Valori: BATCH-01, BATCH-02, BATCH-03 |
| batch_run_id |  | Identificativo dell'esecuzione del batch (es. UUID della run di Spring Batch). Permette di raggruppare tutti gli errori di una singola esecuzione |
| entity_type |  | Tipo di entità che si stava elaborando al momento dell'errore. Es. cons_t_notifica, cons_t_consenso, cons_r_asr_endpoint |
| entity_id |  | Chiave primaria del record che ha causato l'errore |
| cod_errore |  | Codice identificativo dell'errore (es. CONN_TIMEOUT, DB_CONSTRAINT, ENDPOINT_UNREACHABLE) |
| desc_errore |  | Messaggio di errore completo (stack trace o messaggio applicativo) |
| stato_gestione |  | Stato della gestione dell'errore. Valori: DA_GESTIRE, IN_GESTIONE, RISOLTO, IGNORATO. Default: DA_GESTIRE |
| data_errore |  | Timestamp in cui si è verificato l'errore |
| data_risoluzione |  | Timestamp in cui l'errore è stato risolto o ignorato (NULL se ancora da gestire) |
| login_operazione |  | CF del processo batch o dell'operatore che ha gestito l'errore |
| data_creazione |  | Timestamp di inserimento del record |
| data_modifica |  | Timestamp di ultima modifica |

**Indici suggeriti:**
idx_batch_errori_stato su (stato_gestione, batch_nome) — per estrarre rapidamente gli errori in attesa di gestione per processo
idx_batch_errori_run su (batch_run_id) — per raggruppare gli errori di una singola esecuzione

### 8.4.10 [PROPOSTA] Estensione Tabella: cons_s_consenso e cons_t_consenso

**Nota implementativa:  **Al momento dell'INSERT in cons_t_consenso, il valore di sotto_tipo_consenso deve corrispondere al sotto_tipo_consenso dell'informativa associata (cons_d_informativa.sotto_tipo_consenso per lo stesso d_informativa_id). Questa coerenza deve essere garantita a livello applicativo.

| **Colonna** | **PK/FK** | **Descrizione** |
| --- | --- | --- |
| sotto_tipo_consenso | FK → cons_d_sotto_tipo_cons | Riferimento diretto al tipo consenso. NOT NULL. Permette di filtrare i consensi per tipologia senza JOIN su cons_d_informativa. |


### 9. Requisiti Non Funzionali


### 9.1 Sicurezza

Tutte le comunicazioni tra client e server devono avvenire esclusivamente tramite HTTPS/TLS 1.2+.
I dati personali (CF, nome, cognome) non devono mai comparire nei log applicativi in chiaro; devono essere mascherati o pseudonimizzati.
Il sistema deve implementare protezione CSRF per tutte le operazioni di modifica (POST/PUT).
Conformità OWASP Top 10 verificata in fase di collaudo.

### 9.2 Scalabilità

L'applicazione deve essere progettata per la scalabilità orizzontale su Kubernetes (almeno 2 repliche attive in produzione). I servizi backend devono essere stateless.

### 9.3 Migrazione Dati

Prima del go-live è necessario eseguire una migrazione dei dati dall'ambiente AS-IS (PostgreSQL 9) verso il TO-BE (PostgreSQL 17). Al momento della stesura di questo documento, una strategia formale di migrazione non è ancora stata definita né approvata dal committente. La redazione del piano di migrazione è pertanto un'attività da pianificare e formalizzare nel documento dedicato CONSPREF-DMP (Data Migration Plan).
**Vincoli tecnici noti sulla migrazione PG9 → PG17:**
Il passaggio da PostgreSQL 9 a PostgreSQL 17 è un salto di versione maggiore significativo (8 major release). Non è possibile effettuare un aggiornamento sul posto (in-place upgrade) diretto: è necessario adottare una delle seguenti strategie, da valutare e definire nel CONSPREF-DMP:
**Strategia ****dump****/****restore****:** Export completo del database AS-IS tramite pg_dump (formato custom o plain SQL), restore sull'istanza PG17 TO-BE. Richiede una finestra di manutenzione e un piano di rollback.
**Strategia upgrade a step intermedi:** Aggiornamento progressivo attraverso versioni intermedie (es. PG9 → PG12 → PG14 → PG17) tramite pg_upgrade. Più complessa ma riduce il rischio di incompatibilità massive.
Il responsabile della redazione del CONSPREF-DMP deve essere definito formalmente dal committente CSI Piemonte prima dell'avvio della fase di sviluppo del Data Layer.
Attività da includere nel CONSPREF-DMP:
Analisi della struttura AS-IS (schema DDL, dati, stored procedure, trigger, sequence, indici).
Esecuzione dell'audit di compatibilità (vedi 9.4 Audit Compatibilità PG9→PG17 di seguito).
Strategia di migrazione scelta e motivata.
Script di migrazione dati (DDL + DML).
Piano di verifica post-migrazione (conteggio record, integrità referenziale, test funzionali).
Piano di rollback.
Finestra temporale stimata per la migrazione.

### 9.4 Audit di Compatibilità PG9 → PG17

È obbligatorio pianificare ed eseguire un'attività di audit della struttura AS-IS prima dell'avvio dello sviluppo del Data Layer TO-BE, al fine di identificare tutte le incompatibilità e le deprecazioni introdotte nelle versioni PostgreSQL successive alla 9.x.
**Aree di analisi obbligatorie:**
**Gestione delle ****Sequence****:**
In PostgreSQL 10+ le sequenze hanno cambiato il comportamento di lastval() e la gestione delle sequence temporanee.
Verificare tutti gli oggetti SERIAL e SEQUENCE presenti nello schema AS-IS e valutare la migrazione verso GENERATED AS IDENTITY (standard SQL, introdotto in PG10).
**Funzioni deprecate o modificate:**
La funzione to_timestamp() ha subito variazioni di comportamento nelle versioni intermedie.
Le funzioni date_part() e le funzioni di casting implicito tra tipi di dato sono state rese più stringenti in PG12+.
Verificare tutti gli utilizzi di queste funzioni nel DDL (trigger, view, stored procedure) e nel codice applicativo.
**Comportamento di NULL negli indici:**
PostgreSQL 15 ha modificato il comportamento di NULLS FIRST / NULLS LAST negli indici e nelle query con ORDER BY.
Verificare che tutti gli indici e le query critiche (in particolare quelle che usano ORDER BY su colonne nullable) producano i risultati attesi dopo la migrazione.
**Sintassi SQL deprecata:**
FROM ONLY e l'ereditarietà delle tabelle: verificare se la struttura AS-IS ne fa uso.
Operatori di confronto != e <>: allineamento con lo standard SQL.
Funzioni di aggregazione con ORDER BY nella form non standard.
**Estensioni ****PostgreSQL****:**
Verificare che tutte le estensioni utilizzate nel database AS-IS (es. uuid-ossp, pgcrypto, ecc.) siano disponibili e compatibili con PG17.
**Livello di isolamento delle transazioni:**
PG17 mantiene il default READ COMMITTED, ma verificare che eventuali impostazioni di default_transaction_isolation nel postgresql.conf AS-IS siano coerenti con il TO-BE.
**Output atteso dell'audit:**
Un report strutturato (da allegare o referenziare nel CONSPREF-DMP) che elenchi:
Ogni incompatibilità rilevata con la versione PG interessata che l'ha introdotta.
La correzione necessaria a livello DDL, DML o codice applicativo.
La stima dell'impatto (bassa/media/alta complessità di risoluzione).
Questa attività deve essere completata prima dell'avvio dello sviluppo del modello dati TO-BE descritto nel Capitolo 8.
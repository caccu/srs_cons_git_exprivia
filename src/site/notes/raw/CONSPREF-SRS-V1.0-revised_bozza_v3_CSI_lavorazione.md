---
{"dg-publish":true,"permalink":"/raw/conspref-srs-v1-0-revised-bozza-v3-csi-lavorazione/","dg-note-properties":{}}
---

<span id="_Toc224739626" class="anchor"></span>SPECIFICA DEI REQUISITI
DEL SISTEMA

**Sistema: Gestione Consensi**

**Codice Documento: CONSPREF-SRS-V1.0**

**VERIFICHE E APPROVAZIONI**

| REDAZIONE         | CONTROLLO  | AUTORIZZAZIONE | APPROVAZIONE | EMISSIONE |
|-------------------|------------|----------------|--------------|-----------|
| **NOME**          | **DATA**   | **NOME**       | **DATA**     | **NOME**  |
| Marco Forneris    | 02/03/2026 |                |              |           |
| *Exprivia S.p.A.* |            |                |              |           |

**STATO DELLE VARIAZIONI**

| VERS. | PARAGRAFO O PAGINA | DESCRIZIONE DELLA VARIAZIONE |
|-------|--------------------|------------------------------|
| 1.0   | Tutto il documento | Prima emissione.             |

# Sommario

[SPECIFICA DEI REQUISITI DEL SISTEMA
[1](#_Toc224739626)](#_Toc224739626)

[1. Scopo e riferimenti del documento
[4](#_Toc224739628)](#_Toc224739628)

[1.1 Scopo del documento [4](#_Toc224739629)](#_Toc224739629)

[1.2 Riferimenti [4](#_Toc224739630)](#_Toc224739630)

[1.3 Glossario [5](#_Toc224739631)](#_Toc224739631)

[2. Contesto [6](#_Toc224739632)](#_Toc224739632)

[2.1 Descrizione del Contesto [6](#_Toc224739633)](#_Toc224739633)

[2.2 Modello del contesto [7](#_Toc224739634)](#_Toc224739634)

[2.3 Profili applicativi [8](#_Toc224739635)](#_Toc224739635)

[3. Architettura [9](#_Toc224739636)](#_Toc224739636)

[3.1 Vista di sintesi [9](#_Toc224739637)](#_Toc224739637)

[3.2 Modello architetturale [10](#_Toc224739638)](#_Toc224739638)

[3.3 Componenti software [11](#_Toc224739639)](#_Toc224739639)

[3.3.1 Integrazione con l'Identity Provider GASP Salute
[<span class="insertion" author="Forneris Marco"
date="2026-05-14T14:50:00Z">13</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">12</span>](#_Toc225783458)](#_Toc225783458)

[3.4 Elenco Framework e Tecnologie [13](#_Toc225783459)](#_Toc225783459)

[3.5 Infrastruttura Cloud Native e Linee Guida di Setup
[14](#_Toc225783460)](#_Toc225783460)

[3.5.1 Architettura dell'Infrastruttura ECaaS [<span class="insertion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">15</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">14</span>](#_Toc225783461)](#_Toc225783461)

[3.5.2 Registry Immagini Docker [15](#_Toc225783462)](#_Toc225783462)

[3.5.3 Catalogo Helm Chart [16](#_Toc225783463)](#_Toc225783463)

[3.5.4 Pipeline CI/CD [16](#_Toc225783464)](#_Toc225783464)

[3.5.5 Accesso alla Piattaforma Cloud Native [<span class="insertion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">17</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">16</span>](#_Toc225783465)](#_Toc225783465)

[3.5.6 Provisioning del Database: DBaaS Nivola
[17](#_Toc225783466)](#_Toc225783466)

[4. Logging delle informazioni [18](#_Toc225783467)](#_Toc225783467)

[4.1 Tracciatura Chiamate Servizi Esterni
[19](#_Toc224739642)](#_Toc224739642)

[4.2 Specifica tecnica Integrazioni [<span class="insertion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">20</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">19</span>](#_Toc225783469)](#_Toc225783469)

[5. Requisiti di business [21](#_Toc225783470)](#_Toc225783470)

[5.1 Stati del Consenso [<span class="insertion" author="Forneris Marco"
date="2026-05-14T14:50:00Z">22</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">21</span>](#_Toc224739644)](#_Toc224739644)

[5.2 Diagramma degli stati del consenso [<span class="insertion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">23</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">22</span>](#_Toc224739645)](#_Toc224739645)

[6. Modello dei Casi d’Uso [24](#_Toc224739646)](#_Toc224739646)

[6.1 CDU-01: Accesso al servizio e selezione profilo
[<span class="insertion" author="Forneris Marco"
date="2026-05-14T14:50:00Z">26</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">25</span>](#_Toc224739647)](#_Toc224739647)

[6.2 CDU-02: Consultazione consensi rilasciati [<span class="insertion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">27</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">26</span>](#_Toc224739648)](#_Toc224739648)

[6.3 CDU-03: Rilascio nuovo consenso cittadino [<span class="insertion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">28</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">27</span>](#_Toc224739649)](#_Toc224739649)

[6.4 CDU-04: Modifica consenso espresso [<span class="insertion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">31</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">30</span>](#_Toc224739650)](#_Toc224739650)

[6.5 CDU-05: Modifica del valore di un consenso
[33](#_Toc224739651)](#_Toc224739651)

[6.6 CDU-06: Download/stampa PDF consenso [<span class="insertion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">35</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">34</span>](#_Toc224739652)](#_Toc224739652)

[6.7 CDU-07: Ricerca assistito [36](#_Toc224739653)](#_Toc224739653)

[6.8 CDU-08: Consultazione dei consensi di un assistito
[<span class="insertion" author="Forneris Marco"
date="2026-05-14T14:50:00Z">38</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">37</span>](#_Toc224739654)](#_Toc224739654)

[6.9 CDU-09: Rilascio del consenso per conto di un assistito
[38](#_Toc224739655)](#_Toc224739655)

[6.10 CDU-10: Modifica del consenso per conto di un assistito
[39](#_Toc224739656)](#_Toc224739656)

[6.11 CDU-11: Modifica del valore di un consenso per conto di un
assistito [40](#_Toc224739657)](#_Toc224739657)

[6.12 CDU-12: Gestione tipo consenso [<span class="insertion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">41</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">40</span>](#_Toc224739658)](#_Toc224739658)

[6.13 CDU-13: Gestione informativa [<span class="insertion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">44</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">43</span>](#_Toc224739659)](#_Toc224739659)

[6.14 CDU-14: Gestione ente ed endpoint [<span class="insertion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">46</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">45</span>](#_Toc224739660)](#_Toc224739660)

[6.15 CDU-15: Esposizione servizio recupero stato consenso (per
Enti/Aziende) [47](#_Toc224739661)](#_Toc224739661)

[6.16 CDU-16: Esposizione servizio di configurazione (per Enti/Aziende)
[48](#_Toc224739662)](#_Toc224739662)

[7. Processi batch [49](#_Toc224739663)](#_Toc224739663)

[7.1 BATCH-01: Notifica consensi verso aziende/enti
[49](#_Toc224739664)](#_Toc224739664)

[7.2 BATCH-02: Notifica scadenza/annullamento informativa
[50](#_Toc224739665)](#_Toc224739665)

[7.3 BATCH-03: Allineamento consensi per nuovi endpoint
[55](#_Toc224739666)](#_Toc224739666)

[8. Modello dei dati [<span class="insertion" author="Forneris Marco"
date="2026-05-14T14:50:00Z">57</span><span class="deletion"
author="Forneris Marco"
date="2026-05-14T14:50:00Z">56</span>](#_Toc224739667)](#_Toc224739667)

[8.1 Diagramma Entità-Relazione (AS-IS)
[57](#_Toc224739668)](#_Toc224739668)

[8.2 Diagramma Entità-Relazione (TO-BE)
[57](#_Toc224739669)](#_Toc224739669)

[8.3 Dizionario dati (TO-BE) [57](#_Toc224739670)](#_Toc224739670)

[8.3.1 cons_d_allegato_tipo [58](#_Toc224739671)](#_Toc224739671)

[8.3.2 cons_d_parametro [59](#_Toc224739672)](#_Toc224739672)

[8.3.3 cons_d_tipo_cons [60](#_Toc224739673)](#_Toc224739673)

[8.3.4 cons_d_sotto_tipo_cons [61](#_Toc224739674)](#_Toc224739674)

[8.3.5 cons_d_informativa [61](#_Toc224739675)](#_Toc224739675)

[8.3.6 cons_r_informativa_asr [63](#_Toc224739676)](#_Toc224739676)

[8.3.7 cons_r_asr_endpoint [64](#_Toc224739677)](#_Toc224739677)

[8.3.8 cons_d_asr [64](#_Toc224739678)](#_Toc224739678)

[8.3.9 cons_t_allegato [65](#_Toc224739679)](#_Toc224739679)

[8.3.10 cons_t_endpoint [66](#_Toc224739680)](#_Toc224739680)

[8.3.11 cons_t_consenso [67](#_Hlk224551454)](#_Hlk224551454)

[8.3.12 cons_s_consenso [68](#_Hlk224552024)](#_Hlk224552024)

[8.3.13 cons_t_notifica [70](#_Toc224739683)](#_Toc224739683)

[8.3.14 cons_t_notifica_errore_dett
[72](#_Toc224739684)](#_Toc224739684)

[8.3.15 cons_d_errore_tipo [72](#_Toc224739685)](#_Toc224739685)

[8.3.16 cons_d_valore_cons [73](#_Toc224739686)](#_Toc224739686)

[8.3.17 cons_d_stato [74](#_Toc224739687)](#_Toc224739687)

[8.3.18 cons_d_fonte [74](#_Toc224739688)](#_Toc224739688)

[8.3.19 cons_d_tipo_fonte [75](#_Toc224739689)](#_Toc224739689)

[8.3.20 cons_d_operatore [76](#_Toc224739690)](#_Toc224739690)

[8.3.21 cons_t_operatorebo [77](#_Toc224739691)](#_Toc224739691)

[8.3.22 csi_log_audit [77](#_Toc224739692)](#_Toc224739692)

[8.3.23 cons_r_sotto_tipo_cons_asr_endpoint
[78](#_Toc224739693)](#_Toc224739693)

[8.3.24 cons_r_consenso_valore [79](#_Toc224739694)](#_Toc224739694)

[8.3.25 cons_r_consenso_parametro [80](#_Toc224739695)](#_Toc224739695)

[8.4 Proposte evolutive dal Diagramma
[81](#_Toc224739696)](#_Toc224739696)

[8.4.1 \[PROPOSTA\] Nuova Tabella: cons_t_traccia_serv_est
[81](#_Toc224739697)](#_Toc224739697)

[8.4.2 \[PROPOSTA\] Estensione Tabella: cons_t_notifica
[82](#_Toc224739698)](#_Toc224739698)

[8.4.3 \[PROPOSTA\] Estensione Tabella: cons_r_asr_endpoint
[83](#_Toc224739699)](#_Toc224739699)

[8.4.4 \[PROPOSTA\] Estensione Tabella: cons_s_consenso
[83](#_Toc224739700)](#_Toc224739700)

[8.4.5 \[PROPOSTA\] Spostamento campi "online" e "annulla_consensi"
[84](#_Toc224739701)](#_Toc224739701)

[8.4.6 \[PROPOSTA\] Estensione Tabella: cons_d_asr
[84](#_Toc225783529)](#_Toc225783529)

[8.4.7 \[PROPOSTA\] Nuova Tabella: cons_d_asr_destinazione
[84](#_Toc225783530)](#_Toc225783530)

[8.4.8 \[PROPOSTA\] Estensione Tabella: cons_d_informativa
[85](#_Toc225783531)](#_Toc225783531)

[8.4.9 \[PROPOSTA\] Nuova Tabella: cons_t_batch_errori
[85](#_Toc225783532)](#_Toc225783532)

[8.4.10 \[PROPOSTA\] Estensione Tabella: cons_s_consenso e
cons_t_consenso [87](#_Toc225783533)](#_Toc225783533)

[9. Requisiti Non Funzionali [87](#_Toc225783534)](#_Toc225783534)

[9.1 Sicurezza [87](#_Toc225783535)](#_Toc225783535)

[9.2 Scalabilità [87](#_Toc225783536)](#_Toc225783536)

[9.3 Migrazione Dati [87](#_Toc225783537)](#_Toc225783537)

[9.4 Audit di Compatibilità PG9 → PG17
[88](#_Toc225783538)](#_Toc225783538)

<span id="_Toc224739628" class="anchor"></span>1. Scopo e riferimenti
del documento

<span id="_Toc224739629" class="anchor"></span>1.1 Scopo del documento

<u>\[DOC\]</u> Lo scopo del presente documento è definire i requisiti
funzionali e non funzionali per il rifacimento dell'applicativo
**Gestione Consensi** della Regione Piemonte. Il sistema ha l'obiettivo
di gestire il ciclo di vita completo dei consensi sanitari espressi dai
cittadini, in conformità con la normativa vigente, fornendo interfacce
dedicate per cittadini, operatori sanitari/amministrativi e operatori di
back office.

<u>\[DEDOTTO\]</u> Questo documento servirà come riferimento principale
per le fasi di progettazione, sviluppo, e collaudo del nuovo
applicativo, assicurando che il prodotto finale sia allineato alle
esigenze del committente e alle specifiche tecniche concordate.

<span id="_Toc224739630" class="anchor"></span>1.2 Riferimenti

| ID | Documento | Versione | Descrizione |
|----|----|----|----|
| \[1\] | CONSPREF-SRS-01-V03 - Requisiti Gestione Consensi.docx | 03 | Documento principale dei requisiti (versione aggiornata) per il rifacimento della Gestione Consensi. |
| \[2\] | Conspref_new20240806.zip | N/A | Archivio contenente la proposta di struttura del database. |
| \[3\] | piletecnologiche.pdf | N/A | Documento ufficiale CSI Piemonte sulle pile tecnologiche approvate e il loro piano di evoluzione. |
| \[4\] | P18-004-SFU-StudioFunzionale-GestioneConsensiSoL-V1.7.pdf | 1.7 | Studio Funzionale dell'applicativo Gestione Consensi AS-IS (2019). |
| \[5\] | ACC-DEL-CDU-01-V01ServiziAcquisizioneConsensi.pdf | 01 | Specifica dei Casi d'Uso dei servizi di acquisizione consensi AS-IS (2019). |
| \[6\] | Specifica-WebService_ConsensoRegionaleAziendale_v03(1).pdf | 03 | Specifica tecnica dei Web Service per l'interoperabilità AS-IS (2019). |
| \[7\] | CONSPREF-DMP (Data Migration Plan) | x | Piano di migrazione dati da PostgreSQL 9 a PostgreSQL 17 – da redigere |

<span id="_Toc224739631" class="anchor"></span>1.3 Glossario

| Termine | Significato |
|----|----|
| **AgID** | Agenzia per l’Italia Digitale. |
| **ASR** | Azienda Sanitaria Regionale. |
| **AURA** | Anagrafe Unica Regionale degli Assistiti. Sistema anagrafico di riferimento per i cittadini piemontesi. <u>\[DOC\]</u> |
| **CDU** | Caso d’Uso (Use Case). |
| **CIE** | Carta d'Identità Elettronica. <u>\[DEDOTTO\]</u> |
| **ECaaS** | Enterprise Container as a Service. Piattaforma di containerizzazione del CSI Piemonte. <u>\[DOC\]</u> |
| **FSE** | Fascicolo Sanitario Elettronico. <u>\[DOC\]</u> |
| **INI** | Infrastruttura Nazionale per l'Interoperabilità. <u>\[DEDOTTO\]</u> |
| **PUA** | Punto Unico di Accesso. Sistema di accesso centralizzato per gli operatori della PA. <u>\[DOC\]</u> |
| **ROL** | Ritiro On Line. Tipologia di consenso specifico per il ritiro online dei referti. <u>\[DOC\]</u> |
| **RUPAR/ IRIDE** | Credenziali di accesso al sistema PUA per gli operatori. <u>\[DOC\]</u> |
| **SIA** | Sistema Informativo Aziendale (di una ASR). <u>\[DOC\]</u> |
| **SIR** | Sistema Informativo Regionale. <u>\[DOC\]</u> |
| **SoL** | Servizi on Line. <u>\[DOC\]</u> |
| **SPID** | Sistema Pubblico di Identità Digitale. <u>\[DOC\]</u> |
| **SRS** | Software Requirements Specification (Specifica dei Requisiti del Sistema). |
| **SistemaTS ** | Sistema Tessera Sanitaria |
| **DBaaS ** | Database as a Service |
| **UNP ** | User Notification Platform |

<span id="_Toc224739632" class="anchor"></span>2. Contesto

<span id="_Toc224739633" class="anchor"></span>2.1 Descrizione del
Contesto

<u>\[DOC\]</u> L'applicativo Gestione Consensi si inserisce
nell'ecosistema della Sanità Elettronica della Regione Piemonte come
strumento centrale per la raccolta, la gestione e la consultazione dei
consensi espressi dagli assistiti. Il sistema è progettato per gestire
diverse tipologie di consenso, che si articolano su più livelli
\[<u>1</u>\]:

\- *Consenso Nazionale*: Ha validità su tutto il territorio nazionale e
si applica a normative centralizzate, come ad esempio il consenso alla
consultazione del Fascicolo Sanitario Elettronico (FSE), la cui gestione
è centralizzata attraverso l'Infrastruttura Nazionale per
l'Interoperabilità (INI).

\- *Consenso Regionale*: Ha validità sull'intero territorio regionale e
si applica a iniziative trasversali come la stratificazione dei dati
sanitari per la medicina d'iniziativa, la presa in carico in programmi
di gestione della cronicità o l'adesione a reti di patologia (es. rete
oncologica).

\- *Consenso Aziendale (ASR)*: Ha validità limitatamente a una specifica
Azienda Sanitaria Regionale e copre casistiche come il consenso al
trattamento dei dati personali per il Dossier Clinico, il consenso
informato per specifiche prestazioni o il consenso al Ritiro On Line
(ROL) dei referti.

<u>\[DEDOTTO\]</u> L’aggiornamento dell'applicativo mira a modernizzare
la piattaforma tecnologica, ad allinearla alle nuove linee guida di
sviluppo e sicurezza, e a introdurre le nuove funzionalità specificate
nel documento dei requisiti \[<u>1</u>\], garantendo al contempo
l'interoperabilità con i sistemi informativi aziendali (SIA) delle ASR e
con i servizi centrali della Regione.

<span id="_Toc224739634" class="anchor"></span>2.2 Modello del contesto

<u>\[DOC\]</u> I seguenti diagrammi, derivati dal documento dei
requisiti \[1\], illustrano il modello del contesto in cui opera
l'applicativo Gestione Consensi, evidenziando i principali flussi di
interazione tra gli attori e i sistemi.

**Figura 1: Flusso di espressione e notifica dal sistema regionale alle
ASR**

<img src="media/image1.png" style="width:6.29303in;height:4.27464in" />

**Figura 2: Flusso di espressione e notifica da ASR al sistema
regionale** <!-- [Forneris Marco] Nuova immagine si può aggiungere una didascalia: Consensi esprimibili anche presso LIS oltre web app cittadino e Operatore --> 

<img src="media/image3.png" style="width:6.26806in;height:2.57083in" />

<span id="_Toc224739635" class="anchor"></span>2.3 Profili applicativi

<u>\[DOC\]</u> Il sistema prevede tre profili utente principali,
ciascuno con specifiche modalità di accesso e un set definito di
funzionalità.

| Profilo | Descrizione | Modalità di Accesso |
|----|----|----|
| **Cittadino** | L'assistito della Regione Piemonte che accede al servizio per gestire i propri consensi o quelli di un soggetto per cui ha una delega attiva (es. figlio minore, tutelato). | Accesso diretto alla Web App tramite credenziali di identità digitale **SPID** o **CIE**. Non utilizza il PUA. |
| **Operatore Sanitario/Amministrativo** | Personale che opera presso i Punti di Servizio Assistito (es. sportelli ASL) e che necessita di gestire i consensi per conto dei cittadini che si recano fisicamente presso gli sportelli. | Accesso all'applicazione di Back Office tramite il **Punto Unico di Accesso (PUA)** con credenziali RUPAR/IRIDE e SPID/CIE/CNS<span class="deletion" author="Forneris Marco" date="2026-05-12T14:10:00Z">.</span> |
| **Operatore di Back Office** | Personale con privilegi amministrativi che ha il compito di configurare e manutenere le anagrafiche del sistema (tipologie di consenso, informative, enti, endpoint). | Accesso all'applicazione di Back Office tramite il **Punto Unico di Accesso (PUA)** con credenziali RUPAR/IRIDE e SPID/CIE/CNS. |

<u>\[DEDOTTO\]</u> Per gli operatori che accedono tramite PUA, il
sistema riceverà l'elenco delle funzionalità a cui l'utente è abilitato
e adatterà dinamicamente l'interfaccia utente per mostrare solo le
sezioni e le operazioni pertinenti al suo profilo.

**Gestione dei profili e ruolo del Configuratore Regionale**

L'accesso al sistema è differenziato per tipo di attore e canale
applicativo. Il Cittadino accede alla Web App pubblica tramite
autenticazione diretta con credenziali di identità digitale SPID o CIE,
gestite dal rispettivo Identity Provider nazionale. Non è previsto alcun
intermediario di profilazione per questo profilo.

L'Operatore Sanitario/Amministrativo e l'Operatore di Back Office
accedono alla Web App di Back Office tramite il Punto Unico di Accesso
(PUA) con credenziali RUPAR/IRIDE o e SPID/CIE/CNS. La profilazione
delle funzionalità disponibili è delegata al Configuratore Regionale, il
sistema centralizzato del CSI Piemonte che censisce le applicazioni e i
profili degli operatori abilitati.

Affinché la Web App di Back Office sia visibile e raggiungibile dal PUA,
l'applicazione deve essere registrata sul Configuratore come
applicazione abilitata. Devono essere creati sul Configuratore i
seguenti due profili distinti per l'applicazione Gestione Consensi
BackOffice:

- Profilo Operatore Sanitario/Amministrativo — abilita la sezione di
  gestione del consenso per conto di un assistito (CDU-07 - CDU-11).

- Profilo Operatore di Back Office — abilita le sezioni di
  configurazione delle anagrafiche: tipo consenso, informativa, ente ed
  endpoint (CDU-12 - CDU-14).

A seguito dell'autenticazione tramite PUA, il sistema invoca il servizio
**getTokenInformation2** per leggere il profilo dell'operatore
autenticato e adatta dinamicamente l'interfaccia, mostrando
esclusivamente le sezioni e le funzionalità per cui l'operatore è
abilitato. Un operatore può essere abilitato a entrambi i profili
contemporaneamente.

**NOTA IMPLEMENTATIVA** — L'integrazione con il Configuratore Regionale
e il PUA è un prerequisito infrastrutturale del progetto. Prima del
go-live è necessario:

- Registrare l'applicazione Gestione Consensi BackOffice sul
  Configuratore con i due profili sopra indicati.

- Verificare che il servizio getTokenInformation2 restituisca
  correttamente i profili abilitati per ciascun operatore.

- Implementare nel Backend la lettura dinamica del profilo ricevuto dal
  PUA per il controllo degli accessi alle API.

<span id="_Toc224739636" class="anchor"></span>3. Architettura

<span id="_Toc224739637" class="anchor"></span>3.1 Vista di sintesi

<u>\[DEDOTTO\]</u> L'architettura del nuovo applicativo **Gestione
Consensi** è concepita secondo un moderno paradigma a microservizi, con
una netta separazione tra il livello di presentazione (frontend) e il
livello di logica di business e accesso ai dati (backend). L'intera
soluzione sarà ospitata sull'infrastruttura Cloud del CSI Piemonte
(Nivola) e orchestrata tramite la piattaforma di containerizzazione
**ECaaS (Enterprise Container as a Service)**, basata su Kubernetes.

<u>\[PROPOSTA\]</u> Questa scelta architetturale garantisce scalabilità,
manutenibilità, resilienza e un'evoluzione tecnologica indipendente dei
singoli componenti, in linea con le più recenti direttive di sviluppo
\[3\].

<span id="_Toc224739638" class="anchor"></span>3.2 Modello
architetturale

<u>\[PROPOSTA\]</u> Il modello architetturale si basa su tre componenti
principali che interagiscono tra loro tramite protocolli standard.

<img src="media/image4.png" style="width:6.27321in;height:3.65518in" />

1.  **Frontend Layer**: Un'unica Single Page Application (SPA)
    sviluppata in Angular, servita da un web server Apache, che presenta
    interfacce differenziate per il profilo Cittadino e per i profili
    Operatore.

2.  **Backend Layer**: Un insieme di servizi RESTful sviluppati con
    Spring Boot 3, che implementano la logica di business e gestiscono
    le interazioni con il database e i sistemi esterni. E’ **stato
    confermato che il progetto non adotterà l'API Gateway centralizzato
    del CSI Piemonte come punto d'ingresso esterno.** L'architettura
    adotta un modello di **integrazione diretta**: le chiamate HTTP
    provenienti dal Frontend Angular vengono instradate direttamente ai
    Servizi Backend Spring Boot 3, senza intermediari gateway esterni al
    progetto. La sicurezza delle API (autenticazione e autorizzazione) è
    interamente gestita a livello applicativo tramite **Spring
    Security**, configurato come filtro sul Backend. Per i servizi
    esposti verso i sistemi SIA (CDU-15 e CDU-16), il contratto formale
    è definito tramite specifica **OpenAPI 3.x (Swagger)**, come
    descritto nella sezione seguente.

3.  **Data Layer**: Un database PostgreSQL che funge da persistence
    layer per l'intera applicazione.

<span id="_Toc224739639" class="anchor"></span>3.3 Componenti software

<u>\[DEDOTTO\]</u> I principali componenti software che costituiscono la
soluzione sono:

- **Web Application Frontend**: Realizzata come Single Page Application
  con il framework Angular. Questo componente è responsabile di tutta
  l'interazione con l'utente, della validazione dei dati di input e
  della comunicazione con i servizi backend tramite chiamate API REST.

Non è disponibile un UI Kit o una Component Library ufficiale e
centralizzata del CSI Piemonte (es. basata su Angular Material o
Bootstrap). Tuttavia, il CSI Piemonte mette a disposizione una serie
di **componenti basati su QUASAR Framework** già utilizzati in altri
applicativi dell'ecosistema regionale.

Il team di sviluppo deve adottare i **componenti QUASAR** forniti dal
CSI come riferimento per la realizzazione dell'interfaccia grafica, al
fine di garantire la maggiore coerenza possibile con gli altri
applicativi del portale Salute Piemonte. Il team deve concordare con il
referente CSI l'accesso al repository dei componenti QUASAR disponibili
prima dell'avvio della fase di sviluppo UI.

In assenza di un componente QUASAR specifico per un determinato caso
d'uso, il team può integrare componenti aggiuntivi del
framework **Quasar Framework (quasar.dev)**, avendo cura di garantire la
conformità con le **Linee Guida di Accessibilità AgID (WCAG 2.1 livello
AA).**

- **Backend API (Servizi REST)**: Sviluppati con il framework Spring
  Boot 3, questi servizi implementano tutta la logica applicativa (casi
  d'uso), gestiscono la sicurezza, l'accesso ai dati sul database
  PostgreSQL e l'orchestrazione delle chiamate verso i sistemi esterni
  (AURA, Deleghe, Notificatore, SIA).

**\[DEDOTTO\] Prerequisiti per l'avvio dei connettori e specifica
OpenAPI:**

A conferma della scelta di integrazione diretta (senza API Gateway CSI),
il contratto formale di interoperabilità con i sistemi SIA si articola
su due direttrici distinte:

- Per i servizi REST esposti da Gestione Consensi verso i SIA (CDU-15 e
  CDU-16), il team di sviluppo è responsabile della produzione della
  specifica OpenAPI 3.x (Swagger). Il documento deve essere redatto,
  versionato e consegnato ai sistemi ASR prima del go-live, per
  consentire loro l'integrazione. La specifica deve rispettare i
  contenuti minimi descritti di seguito.

- Per le chiamate uscenti di BATCH-01 verso i SIA (notifiche SOAP), il
  contratto rimane invariato: i servizi delle ASR non cambiano nel TO-BE
  e il riferimento tecnico è la
  Specifica-WebService_ConsensoRegionaleAziendale_v03.

> Il documento Swagger deve includere obbligatoriamente le seguenti
> sezioni:

- **Definizione degli Endpoint**: elenco completo delle risorse esposte,
  con URL, metodi HTTP (GET, POST, PUT, DELETE), parametri di path
  ({codice_fiscale}, {codice_ente}), parametri di query opzionali e body
  delle richieste.

- **Modelli Dati (Schemas)**: struttura dettagliata e tipizzata di tutti
  i payload di request e response in formato JSON (o XML per i servizi
  SOAP), con indicazione di tipo dato, obbligatorietà (required) e
  vincoli di validazione (es. minLength, pattern, enum).

- **Standard di Sicurezza (Security Schemes)**: specifica del meccanismo
  di autenticazione adottato per ciascun endpoint. Per i servizi REST
  esposti verso i SIA (CDU-15, CDU-16), si adotta **Bearer Token
  JWT** (OAuth2 Client Credentials), come già indicato nella specifica
  dei CDU. Per i servizi SOAP verso AURA e Deleghe, il riferimento
  rimane il WSDL di cui alla 4.2.

- **Gestione Errori**: mapping completo dei codici di stato HTTP
  restituiti per ogni scenario (200 OK, 400 Bad Request, 401
  Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error)
  e struttura standardizzata del payload di errore. **Si adotta il
  formato RFC 7807 (Problem Details for HTTP APIs)** per la risposta in
  caso di errore:\
  \`\`\`json\
  {\
  "type": "https://gestione-consensi.csi.it/errors/not-found",\
  "title": "Consenso non trovato",\
  "status": 404,\
  "detail": "Nessun consenso trovato per il CF RSSMRA80A01L219X e codice
  ROL",\
  "instance": "/api/v1/consensi/RSSMRA80A01L219X/ROL"\
  }\
  \`\`\`\
  Una volta disponibile il documento Swagger, il team di sviluppo deve:

1.  Validarne la compatibilità tecnica con lo stack Spring Boot 3.x (es.
    tramite strumenti come swagger-parser o l'import su Postman).

2.  Generare automaticamente gli stub dei controller REST
    tramite **OpenAPI Generator** (plugin
    Maven openapi-generator-maven-plugin), garantendo coerenza tra
    specifica e implementazione.

3.  Configurare **SpringDoc
    OpenAPI** (springdoc-openapi-starter-webmvc-ui) nel progetto Backend
    per esporre la documentazione Swagger UI aggiornata a ogni build,
    accessibile all'indirizzo /swagger-ui.html nei soli ambienti non
    produttivi.

**NOTA IMPLEMENTATIVA:** La specifica OpenAPI (Swagger) dei servizi
CDU-15 e CDU-16 è un documento da produrre a cura del team di sviluppo
Exprivia. Deve essere redatta prima dell'avvio dello sprint di sviluppo
di tali CDU, versionata nel repository di progetto e condivisa
formalmente con i referenti dei sistemi SIA delle ASR per consentirne
l'integrazione. Per le chiamate uscenti BATCH-01 verso i SIA (protocollo
SOAP), non è richiesta alcuna specifica aggiuntiva: il contratto AS-IS
rimane valido e invariato.

- **Database**: Un'istanza di PostgreSQL che ospita il modello dei dati
  dell'applicazione, come descritto nel Capitolo 8.

<span id="_Toc225783458" class="anchor"></span>3.3.1 Integrazione con
l'Identity Provider GASP Salute

L'autenticazione del profilo Cittadino tramite SPID e CIE non avviene
attraverso un'integrazione diretta con gli Identity Provider nazionali,
bensì tramite il servizio centralizzato del CSI Piemonte denominato GASP
Salute (Gestione Accessi e Single Sign-On per la Sanità).

GASP Salute agisce come Identity Provider federato del CSI Piemonte e si
occupa di:

- Federare le identità SPID (livelli 1, 2, 3) e CIE con i servizi del
  portale Salute Piemonte.

- Restituire all'applicazione, al termine dell'autenticazione,
  l'asserzione con gli attributi dell'utente autenticato (incluso
  il Codice Fiscale).

- Gestire la sessione utente in modo centralizzato.

Implicazioni implementative per il Frontend Angular:

- Il frontend deve implementare il flusso di redirect verso GASP Salute
  per l'autenticazione del Cittadino (analogamente a un flusso
  OAuth2/OIDC o SAML2, a seconda del protocollo esposto da GASP Salute —
  dettaglio da definire con il referente CSI in fase di design tecnico).

- Non è necessario integrare direttamente SDK degli Identity Provider
  SPID/CIE: tutta la logica di federazione è incapsulata in GASP Salute.

- Il Backend deve validare il token/asserzione ricevuta da GASP Salute
  prima di procedere con qualsiasi operazione applicativa.

- Il team deve richiedere al referente CSI Piemonte la documentazione
  tecnica aggiornata di GASP Salute (endpoint, protocollo, attributi
  restituiti) prima dell'avvio della fase di sviluppo
  dell'autenticazione.

<span id="_Toc225783459" class="anchor"></span>3.4 Elenco Framework e
Tecnologie

<u>\[DOC\]</u> In base alle indicazioni del committente e in conformità
con il documento ufficiale sulle pile tecnologiche del CSI Piemonte
\[3\], lo stack tecnologico previsto per il rifacimento dell'applicativo
è il seguente.

| Componente | Tecnologia/Framework | Versione | Stato Pila CSI (Marzo 2026) |
|----|----|----|----|
| **Infrastruttura** | Cloud CSI Nivola (ECaaS) | \- | Strategica |
| **Orchestrazione** | Kubernetes | \- | Strategica |
| **Web Server** | Apache WS k8s | 2.4 | CURRENT |
| **Framework Frontend** | Angular | 19+ | CURRENT (Stack SPA Angular2/SpringBoot/RESTEasy v.2.1.0) |
| **Linguaggio Backend** | Java | 17 | AdoptiumTemurinOpenJDK17 - CURRENT |
| **Framework Backend** | Spring Boot K8S | 3.4.10 (minimo) | CURRENT  (Stack springboot3_k8s_v1.0.0) |
| **Database** | PostgreSQL — DBaaS Nivola | 17+ (determinata dal catalogo DBaaS al momento del provisioning) | DBaaS Nivola — Scheda provisioning standard |
| **Librerie** | Open Source | Ultime stabili | Requisito per pubblicazione su Developers Italia |
| **Accessibilità** | Linee guida AgID | \- | Obbligatorio |

**Note Framework Frontend**: La versione Angular 19.x è in
stato CURRENT nel catalogo ECaaS ed è ufficialmente inclusa nello stack
applicativo Single Page Applications Angular2/SpringBoot/RESTEasy,
versione 2.1.0, adottato come riferimento per tutti i nuovi sviluppi
CSI. Non è richiesto alcun allineamento con versioni precedenti; il team
di sviluppo deve attestarsi su Angular 19.x come versione minima di
partenza, aggiornandosi alle patch di sicurezza rilasciate durante il
ciclo di sviluppo.

**Note Framework Backend:** La pila tecnologica standard e in
stato CURRENT del CSI Piemonte per i backend è identificata
come springboot3_k8s_v1.0.0. È obbligatorio attestarsi almeno alla
versione Spring Boot 3.4.10 come versione minima di rilascio, in quanto
questa versione copre le vulnerabilità note identificate nelle versioni
precedenti della linea 3.x. Il team di sviluppo deve verificare la
compatibilità delle dipendenze di terze parti con questa versione prima
dell'avvio dello sviluppo e mantenere aggiornato il pom.xml alle patch
di sicurezza rilasciate durante il ciclo di vita del progetto.

Il linguaggio backend rimane Java 17 (AdoptiumTemurin OpenJDK 17 –
CURRENT), confermato come versione LTS di riferimento dell'ecosistema
CSI.

<span id="_Toc225783460" class="anchor"></span>3.5 Infrastruttura Cloud
Native e Linee Guida di Setup

Il progetto non richiede la costruzione ex-novo di uno skeleton
applicativo. Il CSI Piemonte fornisce un processo di automation per la
generazione della struttura di progetto, della pipeline CI/CD e delle
Helm Chart di base, previa descrizione dell'architettura da parte del
team. Lo sviluppo deve essere condotto in piena conformità con le Linee
Guida Cloud Native per Fornitori v1.0.1 del CSI Piemonte, che
disciplinano l'intero ciclo di vita delle componenti containerizzate.

<span id="_Toc225783461" class="anchor"></span>3.5.1 Architettura
dell'Infrastruttura ECaaS

L'infrastruttura è basata su ECaaS (Enterprise Container as a Service),
ospitata su Nivola e orchestrata da Kubernetes. Ogni progetto è
collocato in un Namespace dedicato e isolato da un punto di vista di
rete dagli altri namespace. I componenti principali dell'infrastruttura
sono:

- IngressController: esclusivamente di tipo TRAEFIK (non è possibile
  installare IngressController differenti). Più istanze gestiscono il
  traffico proveniente da reti diverse (Internet, RUPAR, rete CSI,
  interoperabilità interna).

- Storage: volumi NFS allocati dinamicamente tramite StorageClass CSI
  Trident (NetApp). Non è possibile utilizzare storage diversi né volumi
  di tipo host.

- Monitoraggio: Prometheus per metriche e alert.

- Log: log applicativi centralizzati su stack ELK (ElasticSearch +
  LogStash + Kibana).

- Rete (CNI): Cilium (non è possibile installare CNI differenti). La
  visibilità di rete è governata da NetworkPolicy gestite centralmente.

- Deployment: tramite Helm con processo GitOps. Il cluster osserva il
  repository di Environment del progetto e, al rilevamento di variazioni
  sul branch dell'ambiente corrispondente, esegue automaticamente il
  rollout. La chart di progetto deve includere come dipendenze le chart
  CSI delle tecnologie utilizzate; non è possibile dispiegare chart
  esterne.

**Vincoli architetturali obbligatori:**

- Non è possibile installare software a livello di Cluster (es. nuovi
  IngressController); eventuali esigenze devono essere concordate in
  anticipo con l'area Architetture e Nivola Ingegneria.

- Non è possibile installare soluzioni quali **KNative**, **Istio** o
  soluzioni di Network Mesh.

- Ogni Deployment deve avere specificate le **risorse minime e massime
  richieste** al sistema (requests e limits).

- Ogni Deployment deve prevedere **health check** (livenessProbe)
  e **readiness check** (readinessProbe) con tempistiche congrue.

<span id="_Toc225783462" class="anchor"></span>3.5.2 Registry Immagini
Docker

Il cluster rigetta qualsiasi immagine proveniente dall'esterno. Tutte le
immagini utilizzate devono essere ospitate sul Registry Artifactory
aziendale e devono rientrare in uno dei seguenti registry:

| **Registry** | **Scopo** | **Endpoint** |
|----|----|----|
| docker-trusted | Immagini pubbliche ritenute adeguate, importate as-is | docker-trusted.ecosis.csi.it |
| docker-base | Immagini personalizzate CSI Piemonte per standard interni e sicurezza | docker-base.ecosis.csi.it |
| docker-projects | Immagini generate dalla pipeline CI del progetto | Artifactory progetto |

Per il progetto **Gestione Consensi**, le immagini di riferimento da
utilizzare sono:

- **Backend Spring Boot**: immagine reference/spring-boot da docker-base

- **Frontend Angular**: immagine angular da docker-base

- **Web Server**: immagine httpd_csi da docker-base

- 

Per eventuali esigenze non coperte dall'elenco corrente, è necessario
richiedere una nuova immagine scrivendo a: architetture_ai@csi.it.

Le immagini create devono includere le label standard **OpenContainers
Foundation** obbligatorie, tra
cui: org.opencontainers.image.created, org.opencontainers.image.authors, org.opencontainers.image.version, org.opencontainers.image.source, org.opencontainers.image.title, org.opencontainers.image.description.

Il Dockerfile deve essere costruito seguendo i principi di
minimalizzazione dei layer (RUN raggruppati), utilizzo di **multi-stage
build** (build Maven nello stage di build, copia del solo artefatto JAR
nello stage finale), e indicazione esplicita delle versioni di ogni
pacchetto installato per garantire la riproducibilità della build.

<span id="_Toc225783463" class="anchor"></span>3.5.3 Catalogo Helm Chart

Il dispiegamento deve essere realizzato esclusivamente tramite le Chart
CSI disponibili sul catalogo Artifactory:

| **Registry**  | **Scopo**                                                 |
|---------------|-----------------------------------------------------------|
| helm-base     | Chart base CSI, conformi all'infrastruttura ECaaS         |
| helm-projects | Chart specifiche del progetto, generate dalla pipeline CI |

Le Chart disponibili nel catalogo CSI rilevanti per questo progetto
sono: **springboot** (per il backend) e **httpd** (per il web server
Apache). La chart di progetto dovrà includere queste come dipendenze.

<span id="_Toc225783464" class="anchor"></span>3.5.4 Pipeline CI/CD

La pipeline è automatizzata tramite GitLab + Jenkins. Ad ogni push o tag
push su GitLab:

1.  Jenkins recupera il Dockerfile e il contesto di build dal
    repository.

2.  Esegue la build dell'immagine e la pubblica su Artifactory
    (docker-projects).

3.  Esegue l'analisi del Dockerfile per la conformità alle linee guida.

4.  SonarQube viene automaticamente attivato per l'analisi della qualità
    del codice (report consultabili su sonarqube.csi.it).

5.  Il processo GitOps rileva la variazione nel repository di
    Environment e procede al rollout automatico sull'ambiente
    corrispondente.

Tagging delle immagini di progetto: Il tag dell'immagine deve seguire il
versioning del progetto. Il tag assegnato su GitLab viene utilizzato
come tag dell'immagine su Artifactory.

<span id="_Toc225783465" class="anchor"></span>3.5.5 Accesso alla
Piattaforma Cloud Native

Per accedere alla piattaforma è necessaria una utenza di posta CSI. I
consulenti devono:

1.  Installare autonomamente la Rancher CLI.

2.  Scaricare il file kubeconfig dall'indirizzo fornito dal referente
    CSI.

3.  All'esecuzione di kubectl selezionare l'opzione OpenLDAPProvider e
    inserire le credenziali di posta.

La console web è accessibile
all'indirizzo: nivola-rancher2.nivolapiemonte.it (Login with OpenLDAP).

<span id="_Toc225783466" class="anchor"></span>3.5.6 Provisioning del
Database: DBaaS Nivola

E’ stato confermato che il progetto Gestione Consensi non utilizzerà
un'istanza PostgreSQL containerizzata all'interno del namespace
ECaaS (né tramite Helm Chart CSI dedicata, né tramite operatore
Kubernetes come CloudNativePG o Zalando Postgres Operator). Il cluster
ECaaS non dispone di tali operatori installati a livello cluster, né è
consentita la loro installazione autonoma da parte del fornitore, in
conformità con i vincoli architetturali descritti al 3.5.1.

Il database PostgreSQL per il progetto è erogato come servizio gestito
(DBaaS — Database as a Service) dall'infrastruttura Nivola del CSI
Piemonte, lato account Nivola, ed è quindi una risorsa esterna al
namespace ECaaS del progetto ma raggiungibile da esso tramite rete
interna Nivola.

**Modello di provisioning:**

Il provisioning dell'istanza PostgreSQL avviene tramite scheda di
provisioning standard da richiedere formalmente al team Nivola/CSI. La
scheda deve contenere le seguenti informazioni minime:

- Nome progetto

- Ambiente di destinazione (DEV / TEST / PROD) — un'istanza separata per
  ciascun ambiente

- Versione PostgreSQL richiesta (17 o versione disponibile nel catalogo
  DBaaS al momento della richiesta)

- Dimensionamento stimato: storage (GB), numero massimo di connessioni
  applicative concorrenti, RAM richiesta

- Nome del database applicativo (es. gestione_consensi)

- Utenza applicativa richiesta (es. cons_app_user) con ruoli di
  lettura/scrittura sullo schema applicativo; separata dall'utenza DBA\
  Caratteristiche operative del DBaaS Nivola:

- Il ciclo di vita del database (backup periodici, patching del motore
  PostgreSQL, high availability) è gestito interamente dal team Nivola:
  il fornitore non ha accesso diretto all'infrastruttura di storage o
  agli script di backup.

- Il team di sviluppo deve definire, in accordo con il referente
  CSI/Nivola, le politiche di retention dei backup (es. backup
  giornaliero con retention 7 giorni, settimanale con retention 4
  settimane) e gli obiettivi di ripristino (RTO e RPO) in linea con i
  requisiti di continuità operativa del progetto.

- Al termine del provisioning, Nivola fornisce al team una stringa di
  connessione JDBC nella forma:\
  \`\`\`\
  jdbc:postgresql://\<host-dbaas-nivola\>:\<porta\>/gestione_consensi\
  \`\`\`\
  **Implicazioni implementative:**

- La stringa di connessione JDBC (hostname, porta, nome database), le
  credenziali dell'utenza applicativa (username e password) e qualsiasi
  segreto di connessione al database non devono mai essere inseriti nel
  codice sorgente né nel repository Git. Devono essere iniettati a
  runtime tramite Kubernetes Secret nel deployment Spring Boot,
  referenziato nella Helm Chart di progetto come variabile
  d'ambiente SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, SPRING_DATASOURCE_PASSWORD.

- Il pool di connessioni Spring Boot (HikariCP, incluso di default in
  Spring Boot 3.x) deve essere configurato in modo coerente con il
  numero massimo di connessioni autorizzato sull'istanza DBaaS. A titolo
  indicativo, per un'istanza con limite di 100 connessioni totali e 2
  repliche del Backend in esecuzione, il maximum-pool-size di HikariCP
  non deve superare 40 connessioni per replica (lasciando margine per
  connessioni di manutenzione e monitoring).\
  \`\`\`yaml\
  \# Esempio configurazione application.yml\
  spring:\
  datasource:\
  hikari:\
  maximum-pool-size: 40\
  minimum-idle: 5\
  connection-timeout: 30000\
  idle-timeout: 600000\
  max-lifetime: 1800000\
  \`\`\`

- La Helm Chart di progetto non deve includere una dipendenza dalla
  chart postgresql del catalogo Bitnami o da chart simili: il database
  non viene deployato nel namespace. La chart deve includere
  esclusivamente la definizione del Kubernetes Secret per le credenziali
  di connessione e i riferimenti alle variabili d'ambiente nel
  Deployment del Backend.\
  **NOTA IMPLEMENTATIVA** — La richiesta della scheda di provisioning
  DBaaS Nivola è un'attività a lunga latenza (i tempi di erogazione
  dipendono dal calendario operativo del team Nivola). Il team di
  sviluppo deve avviare formalmente la richiesta prima dell'inizio dello
  sprint di sviluppo del Data Layer, per evitare blocchi durante la fase
  di sviluppo e test dell'integrazione con il database. È necessario
  richiedere almeno due istanze separate: una per l'ambiente di
  sviluppo/test (DEV) e una per la produzione (PROD).

<span id="_Toc225783467" class="anchor"></span>4. Logging delle
informazioni

<u>\[DOC\]</u> Tutte le operazioni significative eseguite dal sistema,
sia quelle avviate dagli utenti (Cittadino, Operatore) sia quelle
eseguite dai processi automatici (batch), devono essere tracciate in
modo dettagliato a fini di audit, sicurezza e monitoraggio. Il logging
deve essere implementato su più livelli.

- **Log di Audit**: <u>\[DEDOTTO\]</u> Verrà utilizzata una tabella
  dedicata, <u>csi_log_audit</u>, per registrare gli eventi di business
  critici. Per ogni evento, saranno memorizzate le seguenti
  informazioni:

  - Timestamp dell'evento.

  - Identificativo dell'utente che ha eseguito l'operazione (Codice
    Fiscale).

  - Identificativo del profilo utente (Cittadino, Operatore, Batch).

  - Codice Fiscale dell'assistito su cui si sta operando (se diverso
    dall'utente).

  - Tipo di operazione eseguita (es. RILASCIO_CONSENSO,
    GESTIONE_INFORMATIVA).

  - Esito dell'operazione (SUCCESSO, FALLIMENTO).

  - Indirizzo IP del client.

  - Eventuali dettagli o messaggi di errore.

- **Log Applicativo**: <u>\[PROPOSTA\]</u> I servizi backend produrranno
  log a livello applicativo (es. DEBUG, INFO, WARN, ERROR) utilizzando
  un framework standard come SLF4j con Logback. Questi log confluiranno
  in un sistema di centralizzazione (es. stack ELK o similare) per
  consentire analisi e monitoraggio in tempo reale dello stato di salute
  dell'applicazione.

- **Log di Accesso**: Il Web Server registrerà tutte le richieste HTTP
  in entrata, includendo l'URL richiesto, il metodo, l'indirizzo IP
  sorgente, lo user-agent e il tempo di risposta.

<u>\[DOC\]</u> Particolare attenzione sarà data alla tracciatura delle
chiamate verso i sistemi esterni (AURA, Gestione Deleghe, Notificatore,
SIA), registrando sia la richiesta inviata che la risposta ricevuta
\[1\].

<span id="_Toc224739642" class="anchor"></span>4.1 Tracciatura Chiamate
Servizi Esterni

\[DOC\] Oltre all'audit delle operazioni utente, il sistema deve
tracciare in modo granulare tutte le chiamate in uscita verso servizi
esterni, al fine di garantire la piena visibilità dei flussi di
interoperabilità e facilitare il debugging in caso di anomalie. I
servizi soggetti a questa tracciatura includono, ma non sono limitati a:
*AURA*, *Gestione Deleghe* e *Notificatore* \[<u>1</u>\].

\[PROPOSTA\] Per ogni chiamata effettuata, verranno registrate le
seguenti informazioni nella tabella dedicata
<u>cons_t_traccia_serv_est</u>:

*Data e ora* della chiamata.

*Servizio contattato* (es. AURA, DELEGHE).

*Operatore/Utente* che ha innescato la chiamata.

*Assistito* di riferimento (Codice Fiscale).

*Request*: Il payload completo inviato al servizio esterno.

*Response*: Il payload completo ricevuto dal servizio esterno.

*Esito*: L'esito della chiamata (es. 'SUCCESSO', 'FALLIMENTO').

*Errori*: Eventuali codici e messaggi di errore restituiti dal servizio.

<span id="_Toc225783469" class="anchor"></span>4.2 Specifica tecnica
Integrazioni

Il servizio AURA espone esclusivamente Web Service SOAP. Non è prevista
migrazione a REST nel contesto di questo progetto. Il backend Spring
Boot deve includere un client SOAP (si raccomanda Apache
CXF o Spring-WS, entrambi compatibili con Spring Boot 3.x).

**Meccanismo di autenticazione verso AURA:**

L'autenticazione avviene tramite WS-Security UsernameToken inserito
nell'header SOAP della richiesta. Il profilo da utilizzare
è UsernameToken con PasswordType = PasswordText (password in chiaro
nell'header SOAP, protetto da TLS a livello di trasporto).

Le credenziali (username e password) sono fornite dal gruppo di
assistenza anagrafiche del CSI Piemonte, che provvede a censirle sulla
piattaforma IRIS (Identity and Resource Integration Service) per ciascun
fruitore del servizio. Il team di sviluppo deve richiedere formalmente
tali credenziali al referente CSI prima dell'avvio dello sviluppo
dell'integrazione.

**Ottenimento WSDL:**\
I WSDL dei servizi AURA sono disponibili su richiesta. Il team deve
specificare al referente CSI l'elenco puntuale dei servizi AURA che
intende invocare (es. ricerca anagrafica, recupero dati assistito), al
fine di ricevere i relativi WSDL e gli endpoint di test/produzione. I
servizi tipicamente coinvolti nel progetto Gestione Consensi includono
almeno: ricerca assistito per CF e ricerca per dati anagrafici (nome,
cognome, data di nascita).

**Integrazione con il Servizio Gestione Deleghe**

Analogamente ad AURA, anche il servizio Gestione Deleghe espone Web
Service SOAP. Il client SOAP del backend deve gestire entrambe le
integrazioni.

Meccanismo di autenticazione verso Gestione Deleghe:\
L'autenticazione inter-servizio avviene tramite OAuth2. Il backend deve
implementare il flusso OAuth2 Client Credentials per ottenere un access
token e allegarlo alle richieste verso il servizio Deleghe. I WSDL del
servizio Deleghe sono disponibili su richiesta al referente CSI.

**Riepilogo tecnico integrazioni servizi esterni:**

| **Servizio** | **Protocollo** | **Autenticazione** | **WSDL/Specifiche** |
|----|----|----|----|
| AURA | SOAP | WS-Security UsernameToken (PasswordText) su IRIS | Disponibile su richiesta (specificare servizi) |
| Gestione Deleghe | SOAP | OAuth2 Client Credentials | Disponibile su richiesta |
| Notificatore Regionale (UNP) | REST | Da definire con referente CSI (token applicativo UNP) | Vedi 7.2 — gitlab.csi.it/user-notification-platform/unpdocumentazione |
| SIA ASR (BATCH-01) | SOAP | Come da contratto WSDL AS-IS | Specifica-WebService_ConsensoRegionaleAziendale_v03 |

**NOTA DI SICUREZZA:** Le credenziali IRIS per AURA e il client_secret
OAuth2 per Deleghe non devono mai essere inseriti nel codice sorgente né
nel repository Git. Devono essere iniettati tramite Kubernetes Secret o
tramite ConfigMap cifrata in fase di deployment, in conformità con le
linee guida di sicurezza ECaaS.

<span id="_Toc225783470" class="anchor"></span>5. Requisiti di business

<u>\[DEDOTTO\]</u> In questa sezione vengono definiti i requisiti di
business dell'applicativo, organizzati per profilo utente. Dato che il
progetto prevede un unico rilascio, non è presente una suddivisione per
fasi. La tabella seguente mappa le principali funzionalità ai profili
applicativi che possono eseguirle.

<table style="width:100%;">
<colgroup>
<col style="width: 12%" />
<col style="width: 23%" />
<col style="width: 20%" />
<col style="width: 19%" />
<col style="width: 13%" />
<col style="width: 11%" />
</colgroup>
<thead>
<tr>
<th>ID Funzione</th>
<th>Funzionalità</th>
<th style="text-align: center;">Cittadino</th>
<th style="text-align: center;">Operatore Sanitario/ Amministrativo</th>
<th style="text-align: center;">Operatore di Back Office</th>
<th style="text-align: center;">SIA/ Sistema Esterno</th>
</tr>
</thead>
<tbody>
<tr>
<td>F01</td>
<td>Accesso e selezione profilo (proprio/delegato)</td>
<td style="text-align: center;"><span class="comment-start" id="81"
data-author="Manuela BONTEMPI" data-date="2026-04-14T09:54:00Z">n.b. il
cittadino non ha un profilo, accede in un’altra web app non gestita dal
configuratore</span><span class="comment-start" id="82"
data-author="Sabina CARONI" data-date="2026-04-16T09:37:00Z">forse per
il cittadino, è stato indicato il profilo perché si prevede l'accesso
per sé stessi i per conto di un delegato</span><span
class="comment-start" id="83" data-author="Forneris Marco"
data-date="2026-05-12T14:14:00Z">Aggiungere una colonna nella tabella
“NOTE”<br />
Cittadino non è profilo applicativo del Configuratore. Accede a web app
dedicata (SPID/CIE). Profilo logico interno solo per distinguere «sé
stesso» vs «delegante» tramite pulsante Deleghe.</span>✓<span
class="comment-end" id="81"><span class="comment-end" id="82"><span
class="comment-end" id="83"></span></span></span></td>
<td style="text-align: center;">✓</td>
<td style="text-align: center;">✓</td>
<td style="text-align: center;"></td>
</tr>
<tr>
<td>F02</td>
<td>Consultazione elenco consensi</td>
<td style="text-align: center;">✓</td>
<td style="text-align: center;">✓</td>
<td style="text-align: center;"></td>
<td style="text-align: center;"></td>
</tr>
<tr>
<td>F03</td>
<td>Rilascio nuovo consenso</td>
<td style="text-align: center;">✓</td>
<td style="text-align: center;">✓</td>
<td style="text-align: center;"></td>
<td style="text-align: center;"></td>
</tr>
<tr>
<td>F04</td>
<td>Modifica consenso</td>
<td style="text-align: center;">✓</td>
<td style="text-align: center;">✓</td>
<td style="text-align: center;"></td>
<td style="text-align: center;"></td>
</tr>
<tr>
<td>F05</td>
<td>Download/Stampa PDF consenso [PROPOSTA]</td>
<td style="text-align: center;">✓</td>
<td style="text-align: center;">✓</td>
<td style="text-align: center;"></td>
<td style="text-align: center;"></td>
</tr>
<tr>
<td>F06</td>
<td>Gestione anagrafica Tipi Consenso</td>
<td style="text-align: center;"></td>
<td style="text-align: center;"></td>
<td style="text-align: center;">✓</td>
<td style="text-align: center;"></td>
</tr>
<tr>
<td>F07</td>
<td>Gestione anagrafica Informative</td>
<td style="text-align: center;"></td>
<td style="text-align: center;"></td>
<td style="text-align: center;">✓</td>
<td style="text-align: center;"></td>
</tr>
<tr>
<td>F08</td>
<td>Gestione anagrafica Enti ed Endpoint</td>
<td style="text-align: center;"></td>
<td style="text-align: center;"></td>
<td style="text-align: center;">✓</td>
<td style="text-align: center;"></td>
</tr>
<tr>
<td>F09</td>
<td>Esposizione servizio recupero stato consenso</td>
<td style="text-align: center;"></td>
<td style="text-align: center;"></td>
<td style="text-align: center;"></td>
<td style="text-align: center;">✓</td>
</tr>
<tr>
<td>F10</td>
<td>Esposizione servizio di configurazione</td>
<td style="text-align: center;"></td>
<td style="text-align: center;"></td>
<td style="text-align: center;"></td>
<td style="text-align: center;">✓</td>
</tr>
</tbody>
</table>

<span id="_Toc224739644" class="anchor"></span>5.1 Stati del Consenso

\[DOC\] Nel modulo regionale il consenso espresso dal cittadino può
assumere i seguenti stati \[1\]:

*Accettato*: Espressione positiva del consenso per un'informativa
attiva. Il cittadino può modificare il valore senza dover riaccettare
l'informativa.

*Negato*: Espressione negativa del consenso per un'informativa attiva.
Il cittadino può modificare il valore senza dover riaccettare
l'informativa.

*Scaduto*: Il consenso assume lo stato di "Scaduto" quando cambia
l'informativa del consenso e il flag annulla_consensi è impostato a
"NO". Il valore espresso dal cittadino è ancora valido ma deve essere
accettata la nuova informativa. Tale variazione *non viene notificata*
alle aziende.

*Annullato* (da riemettere per nuova informativa): Il consenso assume
questo stato quando cambia l'informativa e il flag annulla_consensi è
impostato a "SI". Tutti i consensi espressi per l'informativa precedente
vengono annullati. Il cittadino accedendo al sistema visualizzerà
l'interfaccia come se non avesse mai espresso quel consenso. Il valore
"Annullato" *viene notificato* a tutti gli endpoint delle aziende
configurate.

\[DOC\] Ogni variazione del consenso da parte del cittadino o
dall'operatore del punto assistito non prevede mai la sovrascrittura del
consenso espresso precedentemente: il record precedente viene "chiuso"
(valorizzando la data_fine) e viene inserito un nuovo record con il
nuovo valore. In questo modo si conserva la "storia" completa dei
consensi espressi \[<u>1</u>\].

\[DOC\] Nel caso che un consenso presenti un allegato all'informativa,
la modifica dell'allegato *non prevede* alcun cambio di stato dei
consensi espressi dai cittadini \[<u>1</u>\].

**NOTA TECNICA — Valori tecnici del campo tipo_stato nella
tabella cons_t_consenso:** I valori tecnici (chiave in cons_d_stato) da
utilizzare nel codice sono i seguenti: ATTIVO (consenso espresso
positivamente), NEGATO (consenso espresso
negativamente), SCADUTO, ANNULLATO.
Il <!-- [Forneris Marco] sostituire «Accettato/Negato» con «acconsento/nego» in tutta la nota tecnica 5.2. Mantenere mapping tecnico ATTIVO/NEGATO invariato Correggere in: I termini usati nell'interfaccia utente sono "acconsento" (corrisponde al valore tecnico ATTIVO) e "nego" (corrisponde al valore tecnico NEGATO). --> 
termine "Accettato" usato nell'interfaccia utente corrisponde al valore
tecnico ATTIVO. Tutti gli algoritmi dei CDU devono uniformarsi a questi
valori tecnici.

<span id="_Toc224739645" class="anchor"></span>5.2 Diagramma degli stati
del consenso

Il ciclo di vita di un consenso è rappresentato dal seguente diagramma
di stato. Ogni consenso espresso da un utente si trova in uno dei
seguenti stati, e le transizioni sono causate da azioni dell'utente o da
processi automatici (batch).

<img src="media/image5.png" style="width:6.26806in;height:3.65208in" />

La tabella seguente descrive ciascuno stato e le condizioni di
transizione:

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 24%" />
<col style="width: 42%" />
</colgroup>
<thead>
<tr>
<th><strong>Stato</strong></th>
<th><strong>Descrizione</strong></th>
<th><strong>Transizioni in uscita</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>NON_ESPRESSO</td>
<td>Il consenso non è mai stato espresso dall'utente</td>
<td>Verso ATTIVO (esprime SI) o NEGATO (esprime NO)</td>
</tr>
<tr>
<td><span class="comment-start" id="90" data-author="Manuela BONTEMPI"
data-date="2026-04-14T10:22:00Z">Può variare e passare anche a negato se
il cittadino cambia il suo consenso tramite web app citt o tramite
operatore</span><span class="comment-start" id="91"
data-author="Forneris Marco" data-date="2026-05-12T14:21:00Z">Il
diagramma mostra la transizione verso ATTIVO solo dopo accettazione
nuova informativa. DA aggiungere le transizioni:<br />
- ATTIVO → NEGATO (via web app cittadino o operatore)</span>ATTIVO<span
class="comment-end" id="90"><span class="comment-end"
id="91"></span></span></td>
<td>Il consenso è stato espresso con valore SI</td>
<td>Verso SCADUTO (scade informativa, annulla_consensi=NO), ANNULLATO
(scade informativa, annulla_consensi=SI)</td>
</tr>
<tr>
<td><span class="comment-start" id="92" data-author="Manuela BONTEMPI"
data-date="2026-04-14T10:23:00Z">Può passare anche a accettato se il
cittadino cambia il suo consenso tramite web app citt o tramite
operatore</span><span class="comment-start" id="93"
data-author="Forneris Marco"
data-date="2026-05-12T14:22:00Z"></span><span class="comment-start"
id="94" data-author="Forneris Marco" data-date="2026-05-12T14:22:00Z">Il
diagramma mostra la transizione verso NEGATO solo dopo accettazione
nuova informativa. Mancano le transizioni:<br />
- NEGATO → ATTIVO (via web app cittadino o operatore)</span>NEGATO<span
class="comment-end" id="92"><span class="comment-end" id="93"><span
class="comment-end" id="94"></span></span></span></td>
<td>Il consenso è stato espresso con valore NO</td>
<td>Verso SCADUTO (scade informativa, annulla_consensi=NO), ANNULLATO
(scade informativa, annulla_consensi=SI)</td>
</tr>
<tr>
<td>SCADUTO</td>
<td>L'informativa associata è scaduta, il valore resta valido</td>
<td>Verso ATTIVO (esprime nuovo SI) o NEGATO (esprime nuovo NO) dopo
accettazione nuova informativa</td>
</tr>
<tr>
<td>ANNULLATO</td>
<td>L'informativa è scaduta con annullamento, il consenso è nullo</td>
<td>Verso ATTIVO (esprime nuovo SI) o NEGATO (esprime nuovo NO) dopo
accettazione nuova informativa</td>
</tr>
</tbody>
</table>

<span id="_Toc224739646" class="anchor"></span>6. Modello dei Casi d’Uso

<u>\[DEDOTTO\]</u> In questo capitolo vengono descritti in dettaglio i
casi d’uso (CDU) che definiscono le interazioni tra gli attori
(Cittadino, Operatore) e il sistema **Gestione Consensi**. Ogni caso
d’uso è presentato seguendo una struttura standard che include
l'obiettivo, le precondizioni, lo scenario principale di successo, le
varianti e gli algoritmi specifici.

<u>\[DOC\]</u> Il seguente diagramma, derivato dal documento dei
requisiti \[1\], illustra i principali casi d'uso e gli attori
coinvolti.

**Figura 3: Diagramma dei Casi d'Uso principali**

<img src="media/image6.png" style="width:2.67835in;height:6.93913in" />

L'elenco completo dei casi d'uso è il seguente:

**Area Cittadino (Web App)**

- CDU-01: Accesso al servizio e selezione profilo (cittadino/delegato)

- [CDU-02: Consultazione consensi
  rilasciati](#62-cdu-02-consultazione-consensi-rilasciati)

- [CDU-03: Rilascio nuovo consenso](#63-cdu-03-rilascio-nuovo-consenso)

- [CDU-04: Modifica consenso
  espresso](#64-cdu-04-modifica-consenso-espresso)

- [CDU-05: Modifica del valore di un
  consenso](#65-cdu-05-revoca-consenso)

- [CDU-06: Download/stampa PDF
  consenso](#66-cdu-06-downloadstampa-pdf-consenso)

**Area Operatore Sanitario/Amministrativo (Assistito)**

- [CDU-07: Ricerca assistito](#67-cdu-07-ricerca-assistito)

- [CDU-08: Consultazione consensi del
  cittadino](#68-cdu-08-consultazione-consensi-del-cittadino)

- [CDU-09: Rilascio consenso per conto del
  cittadino](#69-cdu-09-rilascio-consenso-per-conto-del-cittadino)

- [CDU-10: Modifica consenso per conto del
  cittadino](#610-cdu-10-modifica-consenso-per-conto-del-cittadino)

- [CDU-11: Modifica del valore di un consenso per conto di un
  assistito](#611-cdu-11-revoca-consenso-per-conto-del-cittadino)

**Area Back Office**

- [CDU-12: Gestione tipo consenso](#612-cdu-12-gestione-tipo-consenso)

- [CDU-13: Gestione informativa](#613-cdu-13-gestione-informativa)

- CDU-14: Gestione ente ed endpoint

- CDU-15: Esposizione servizio recupero stato consenso (per
  Enti/Aziende)

- CDU-16: Esposizione servizio di configurazione (per Enti/Aziende)

<span id="_Toc224739647" class="anchor"></span>6.1 CDU-01:
Accesso <!-- [Forneris Marco] Dividere CDU-01 in due sotto-scenari espliciti: - CDU-01a (Operatore): Accesso tramite RUPAR/IRIDE/SPID. Il sistema mostra la selezione del profilo. - CDU-01b (Cittadino): Accesso tramite SPID/CIE alla web app cittadino (applicativo separato). Nessuna profilazione iniziale --> 
al servizio e selezione profilo

- **Obiettivo**: <u>\[DOC\]</u> Consentire a un utente autenticato di
  accedere al servizio e, se ha delle deleghe attive, di scegliere se
  operare per sé stesso o per conto di un suo delegante.

- **Precondizioni**: L'utente
  (Cittadino <!-- [Forneris Marco] Da dividere le precondizioni in base allo Scenario. In questo caso CDU-01b --> 
  o Operatore) deve essere in possesso di credenziali valide (SPID/CIE
  per il Cittadino, RUPAR/IRIDE o SPID/CIE/CNS per l'Operatore).

- **Scenario principale**

<table>
<colgroup>
<col style="width: 8%" />
<col style="width: 91%" />
</colgroup>
<thead>
<tr>
<th>Passo</th>
<th>Descrizione del passo</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>L'utente accede all'URL dell'applicazione.</td>
</tr>
<tr>
<td>2</td>
<td>Il sistema presenta la pagina di login. Il Cittadino seleziona
l'accesso tramite SPID/CIE, l'Operatore viene reindirizzato al PUA, link
di accesso separati per i due profili separati.</td>
</tr>
<tr>
<td>3</td>
<td>L'utente si autentica con successo tramite il sistema prescelto
(Identity Provider SPID/CIE o PUA sempre tramite RUPAR o
SPID/CIE/CNS).</td>
</tr>
<tr>
<td>4</td>
<td><u>[DOC]</u> Il sistema riceve i dati anagrafici dell'utente
(incluso il Codice Fiscale).</td>
</tr>
<tr>
<td>5</td>
<td><u>[DOC]</u> Il sistema invoca il servizio <strong>Gestione
Deleghe</strong> per verificare se l'utente autenticato ha deleghe
attive per operare per conto di altri soggetti.</td>
</tr>
<tr>
<td>6</td>
<td>Il sistema presenta una pagina di benvenuto. Se l'utente ha deleghe
attive (vedi Variante 6.1.1), <span class="comment-start" id="103"
data-author="Manuela BONTEMPI"
data-date="2026-04-14T10:32:00Z">L’attivazione delle deleghe avviene a
fronte di un click dell’utente, la web app del cittadino presenta sempre
le info dell’utente collegato. Se il cittadino vuole operare per conto
di un suo delegante clicca il pulsante “deleghe” per visualizzare tutti
gli eventuali deleganti e dall’elenco sceglie per conto di chi vuole
operare</span><span class="comment-start" id="104"
data-author="Forneris Marco" data-date="2026-05-12T14:48:00Z">riscrivere
passo deleghe: La web app del cittadino mostra sempre il cruscotto
dell'utente autenticato. Se il cittadino vuole operare per conto di un
delegante, clicca il pulsante "Deleghe", che mostra l'elenco dei
deleganti attivi. Selezionando un delegante, il sistema carica il
cruscotto consensi di quel soggetto.<br />
Pulsante «Deleghe» → elenco deleganti → selezione → cruscotto consensi
del delegante.</span>viene presentata una schermata di scelta del
profilo<span class="comment-end" id="103"><span class="comment-end"
id="104"></span></span>. Altrimenti, il sistema carica direttamente il
cruscotto personale dell'utente.</td>
</tr>
<tr>
<td>7</td>
<td>L'utente seleziona il profilo per cui operare (sé stesso o un
delegante).</td>
</tr>
<tr>
<td>8</td>
<td>Il sistema carica il cruscotto con i dati relativi al profilo
selezionato.</td>
</tr>
</tbody>
</table>

- **Varianti**

  - **6.1.1** Utente con deleghe attive (flusso di selezione profilo).

  - **6.1.2 (Autenticazione fallita)**: Deve essere gestita in accordo
    con i codici di errore e i redirect definiti da GASP Salute. In caso
    di timeout o indisponibilità di GASP Salute, il sistema deve
    mostrare una pagina di errore generica con un messaggio che inviti
    l'utente a riprovare, senza esporre dettagli tecnici dell'errore.

  - **6.1.3 (Servizio Gestione Deleghe non disponibile)**:
    <u>\[PROPOSTA\]</u> Se il servizio Gestione Deleghe non risponde o
    restituisce un errore,
    il <!-- [Forneris Marco] Aggiungere Nota implementativa: Questo scenario è già attivo in produzione. --> 
    sistema impedisce la selezione del profilo delegato, mostrando un
    messaggio di avviso. L'utente può operare solo per sé stesso.

<span id="_Toc224739648" class="anchor"></span>6.2 CDU-02: Consultazione
consensi rilasciati

- **Obiettivo**: <u>\[DOC\]</u> Fornire all'utente una visione completa
  di tutti i consensi che ha espresso, con il loro stato corrente e i
  dettagli principali.

- **Precondizioni**: L'utente deve aver completato con successo il
  CDU-01 e aver selezionato un profilo (sé stesso o un delegante).

- **Scenario principale**

| Passo | Descrizione del passo |
|----|----|
| 1 | L'utente accede al proprio cruscotto (home page del servizio). |
| 2 | <u>\[DOC\]</u> Il sistema, in base al Codice Fiscale del profilo selezionato, interroga il backend per ottenere l'elenco completo dei consensi associati. |
| 3 | Il sistema presenta l'elenco dei consensi, raggruppandoli per tipologia (es. Regionali, Aziendali) o stato. <u>\[PROPOSTA\]</u> Per ogni consenso, vengono mostrate le seguenti informazioni in una "card" riassuntiva: |

- Nome del consenso (es. "Ritiro On Line Referti", "Presa in carico
  cronicità").

- Ente/ASR di riferimento (se applicabile).

- Stato attuale (es. Accettato, Negato, Annullato).

- Data di ultima modifica/espressione.

\| 4 \| L'utente può cliccare su una singola card per visualizzare i
dettagli completi del consenso.

- **Varianti**

  - **6.2.1 (Nessun consenso espresso)**: Se l'utente non ha ancora
    espresso alcun consenso, il sistema mostra un messaggio informativo
    e un invito a esplorare i consensi disponibili per l'espressione.

<span id="_Toc224739649" class="anchor"></span>6.3 CDU-03: Rilascio
nuovo consenso cittadino

- **Obiettivo**: <u>\[DOC\]</u> Permettere all'utente di esprimere un
  nuovo consenso per una delle tipologie disponibili.

- **Precondizioni**: L'utente deve aver completato con successo il
  CDU-01. Il consenso da esprimere non deve essere già in stato
  "Accettato" o "Negato".

Gli enti/endpoint per cui è possibile esprimere il consenso non devono
essere in stato di allineamento
( <!-- [Forneris Marco] Aggiungere dopo la descrizione del flag_online check: Vedere 6.14 CDU-14 (Gestione ente ed endpoint) e ALG01 (Selezione nuovi endpoint) per la logica di selezione degli endpoint in base alla configurazione dell'ente. --> <u>stato_allineamento
= 'IN_CORSO'</u> nella tabella <u>cons_r_asr_endpoint</u>).

- **Scenario principale**

<table>
<colgroup>
<col style="width: 8%" />
<col style="width: 91%" />
</colgroup>
<thead>
<tr>
<th>Passo</th>
<th>Descrizione del passo</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Dal cruscotto, l'utente seleziona la funzionalità per rilasciare un
nuovo consenso.</td>
</tr>
<tr>
<td>2</td>
<td><span class="comment-start" id="113" data-author="Sabina CARONI"
data-date="1900-01-01T00:00:00Z">Non va bene, perché questo
significherebbe che, se ad esempio per il ROL ho già espresso i consensi
per qualche Azienda, nell'elenco non comparirebbe il consenso ROL. Il
cittadino accedendo deve visualizzare sia i consensi che ha già
espresso, sia quelli ancora da esprimere</span><span
class="comment-start" id="114" data-author="Forneris Marco"
data-date="2026-05-12T14:59:00Z">Riscrittura del requisito:<br />
Il sistema mostra tutti i tipi di consenso configurati per il cittadino,
indipendentemente dallo stato espresso. Per ogni consenso di tipo
regionale viene mostrato un singolo record con lo stato globale. Per
ogni consenso di tipo aziendale viene mostrato un record per ogni
azienda, con il relativo stato (inclusi quelli già espressi).</span>Il
sistema presenta l'elenco delle tipologie di consenso che possono essere
espresse. <u>[DEDOTTO]</u> L'elenco è filtrato per mostrare solo i
consensi per cui l'utente non ha ancora espresso una preferenza (stato
"Non Espresso" o "Annullato" a db).<span class="comment-end"
id="113"><span class="comment-end" id="114"></span></span></td>
</tr>
<tr>
<td>3</td>
<td>L'utente seleziona la tipologia di consenso di suo interesse.</td>
</tr>
<tr>
<td>4</td>
<td><u>[DOC]</u> Il sistema <span class="comment-start" id="115"
data-author="Manuela BONTEMPI" data-date="2026-04-14T11:39:00Z">La
visualizzazione dell’informativa dipende dal tipo di consenso, se c’è
un’informativa distinta per azienda il sistema deve permettere la
visualizzazione dell’informativa di ogni singola azienda</span><span
class="comment-start" id="116" data-author="Forneris Marco"
data-date="2026-05-12T15:05:00Z">Da aggiungere: Per i consensi
aziendali, se ogni azienda ha una propria informativa specifica, il
sistema deve permettere la visualizzazione dell'informativa della
singola azienda prima di raccogliere il consenso per
quell'azienda.</span>presenta <span class="comment-end" id="115"><span
class="comment-end" id="116"></span></span>il documento
dell'<strong>Informativa</strong> associata in formato PDF, rendendolo
disponibile per la <span class="comment-start" id="117"
data-author="Manuela BONTEMPI"
data-date="2026-04-14T11:44:00Z">L’interfaccia si deve comporre
dinamicamente in base ai parametri che ha il consenso (valori ammessi,
domande eventuali previste, ecc…)</span><span class="comment-start"
id="118" data-author="Forneris Marco"
data-date="2026-05-12T15:07:00Z">Aggiungere come requisito
esplicito:<br />
L'interfaccia della pagina di espressione del consenso si compone
dinamicamente in base alla configurazione del tipo di consenso: valori
ammessi, domande opzionali, flag se il campo è richiesto, ecc. I
parametri di composizione sono letti dalle tabelle di
configurazione.</span>visualizzazione<span class="comment-end"
id="117"><span class="comment-end" id="118"></span></span>, il download
e la stampa.</td>
</tr>
<tr>
<td>5</td>
<td>L'utente, dopo aver letto l'informativa, seleziona una checkbox per
confermare la "presa visione".</td>
</tr>
<tr>
<td>6</td>
<td><p><u>[DOC]</u> L'utente esprime la propria volontà selezionando
"Accetto" o "Nego".</p>
<p>[DOC] Al momento del salvataggio, il sistema opera in modo
differenziato in base alla tipologia di consenso [<u>1</u>]:<br />
<em>Consenso Regionale</em>: Il valore espresso dal cittadino viene
salvato N volte nella tabella cons_t_consenso, tante quante sono le
aziende collegate a quel consenso nella tabella cons_r_sotto_tipo,
cons_asr_endpoint. Il valore è identico per tutte le aziende. Per ogni
record salvato, il sistema inserisce N record nella tabella
cons_t_notifica, uno per ogni endpoint attivo.</p>
<p><em>Consenso Aziendale:</em> Per ogni azienda, il cittadino deve
leggere e accettare l'informativa specifica. Il valore viene salvato
singolarmente per ogni coppia consenso/ente. Ogni azienda può avere una
propria informativa.</p>
<p>[DOC] Il sistema deve anche verificare la tipologia di consenso: se
il campo flag_online è valorizzato a NO (consenso de visu), la web app
del cittadino non deve permettere la valorizzazione e deve presentare un
messaggio che indichi di recarsi presso un'azienda sanitaria/ente
[<u>1</u>].</p></td>
</tr>
<tr>
<td>7</td>
<td>L'utente conferma l'operazione.</td>
</tr>
<tr>
<td>8</td>
<td>Il sistema salva il nuovo stato del consenso nel database,
associandolo al CF del profilo, alla data/ora correnti e all'informativa
visionata.</td>
</tr>
<tr>
<td>9</td>
<td><u>[DOC]</u> Il sistema invia una notifica di avvenuto <span
class="comment-start" id="119" data-author="Manuela BONTEMPI"
data-date="2026-04-14T11:40:00Z">La notifica al cittadino o al delegato
deve essere inviato solo quando viene notificato alle aziende
confermando l’esatta comunicazione del consenso</span><span
class="comment-start" id="120" data-author="Sabina CARONI"
data-date="2026-04-16T09:59:00Z">forse bisogna chiarire che si tratta
del Notificatore di deleghe</span><span class="comment-start" id="121"
data-author="Forneris Marco" data-date="2026-05-12T15:08:00Z">Notifica
cittadino/delegato via Notificatore di Deleghe parte SOLO dopo conferma
notifica alle aziende (stato = COMPLETATO).</span>rilascio <span
class="comment-end" id="119"><span class="comment-end" id="120"><span
class="comment-end" id="121"></span></span></span>al cittadino (e al
delegante, se applicabile) tramite il <strong>Servizio
Notificatore</strong>.</td>
</tr>
<tr>
<td>10</td>
<td>Il sistema mostra un messaggio di conferma e reindirizza l'utente al
cruscotto, dove il nuovo consenso appare nell'elenco.</td>
</tr>
</tbody>
</table>

Rilascio del consenso da parte del Cittadino

**Informazioni trasmesse tra attore e sistema <u>\[DEDOTTO\]</u>**

| Nome Campo | Tipo | Modalità | Obbligatorio | Formato | Default | Criteri di validazione | Messaggio di errore |
|----|----|----|----|----|----|----|----|
| Elenco Consensi | Tabella | D | \- | \- | \- | \- | \- |
| <u>consenso_desc</u> | Stringa | D | \- | \- | \- | \- | \- |
| <u>valore_consenso</u> | Radio Button | I | Sì | (<span class="comment-start" id="122" author="Manuela BONTEMPI" date="2026-04-14T11:45:00Z">I valori sono dinamici in base al tipo di consenso da leggere nel db</span><span class="comment-start" id="123" author="Forneris Marco" date="2026-05-12T17:07:00Z">Valori consenso letti dinamicamente da DB per tipo. Composizione pagina dinamica come 6.2.</span>SI<span class="comment-end" id="122"><span class="comment-end" id="123"></span></span>, NO) | NO | Deve essere selezionato | "Selezionare un valore per il consenso" |
| <u>accettazione_informativa</u> | Checkbox | I | Sì | \- | \- | Deve essere spuntato | "È obbligatorio accettare l'informativa" |
| Bottone Conferma | Bottone | I | \- | \- | \- | \- | \- |
| sotto_tipo_consenso_id | Hidden | I/D | Sì | int | Precaricato dalla selezione | Non NULL | \- |
| d_informativa_id | Hidden | I/D | Sì | int | ID informativa corrente | Non NULL | \- |
| cf_delegato | Hidden | I/D | Condiz. | 16 car. alfanum. | CF delegante se in sessione di delega | \- | \- |

**NOTE:**

Il campo Display consenso_desc corrisponde alla colonna
desc_sotto_tipo_cons della tabella cons_d_sotto_tipo_cons.

**Legenda Modalità: I = Input utente, D = Display (output sistema), I/D
= Input con valore precaricato**

- **Varianti**

  - **6.3.1 (Consenso già espresso)**: <u>\[PROPOSTA\]</u> Se l'utente
    tenta di accedere al rilascio di un consenso per cui ha già espresso
    una preferenza (stato "Accettato" o "Negato"), il sistema lo informa
    che è possibile solo modificare la scelta esistente, e lo guida
    verso il CDU-04 o CDU-05.

**Algoritmi**

ALG01 -
Caricamento <!-- [Forneris Marco] Web app cittadino: pulsante unico «Salva». Operazioni tecniche distinte (rilascio vs modifica) gestite internamente, non esposte UI. --> 
pagina di rilascio consenso <u>\[DEDOTTO\]</u>

1.  Il sistema recupera i parametri dalla tabella
    *cons_d_sotto_tipo_cons* l'elenco dei consensi (sotto_tipo_consenso,
    desc_sotto_tipo_cons) che non sono ancora stati espressi dall'utente
    (<u>cf_cittadino</u>) o che si trovano in stato 'ANNULLATO' nella
    tabella <u>cons_t_consenso</u>.

2.  Per ciascun consenso, il sistema verifica il flag <u>online</u>
    nella tabella <u>cons_d_informativa</u> associata.

3.  Se <u>online = true</u>, il consenso è presentabile a video per
    l'espressione.

4.  Se <u>online = false</u>, il consenso viene mostrato come "non
    esprimibile online" con un messaggio che invita l'utente a recarsi
    presso un punto di servizio assistito.

5.  Il sistema popola la maschera con l'elenco dei consensi esprimibili.

ALG02 - Salvataggio nuovo consenso <u>\[DEDOTTO\]</u>

6.  Alla conferma dell'utente, il sistema esegue i seguenti controlli di
    validazione sui dati inseriti (vedi tabella "Informazioni trasmesse"
    per i dettagli).

7.  Se la validazione ha successo, il sistema procede a registrare il
    consenso nella tabella <u>cons_t_consenso</u>:

    - Crea un nuovo record in <u>cons_t_consenso</u>.

    - Valorizza i campi con i dati dell'utente (<u>cf_cittadino</u>,
      <u>id_aura</u>, <u>nome</u>, <u>cognome</u>).

    - Imposta <u>tipo_stato</u> = 'ATTIVO' se il valore è 'SI', o
      'NEGATO' se il valore è 'NO'.

    - Registra l'ID dell'informativa accettata
      (<u>d_informativa_id</u>).

    - Registra la fonte (<u>fonte_id</u> = 'CITT').

    - Imposta sotto_tipo_consenso = valore del campo
      hidden sotto_tipo_consenso_id ricevuto dalla request"

    - Popola i campi di tracciatura (<u>data_acquisizione</u>,
      <u>login_operazione</u>, <u>uuid</u>, ecc.).

    - Se il consenso è di tipo 'A' (Aziendale), crea un record per ogni
      ASR a cui l'utente appartiene.

8.  Il sistema scrive un record di audit nella tabella
    <u>csi_log_audit</u> con <u>operazione</u> = 'insert' e
    <u>ogg_oper</u> = 'cons_t_consenso'.(salvare anche l’id della
    tabella che ha subito l’insert nel campo key_oper)

9.  Il sistema inserisce un record nella tabella <u>cons_t_notifica</u>
    per ogni endpoint associato al consenso, per la successiva notifica
    tramite il BATCH-01.

<span id="_Toc224739650" class="anchor"></span>6.4 CDU-04: Modifica
consenso espresso

Distinzione CDU-04 vs CDU-05: CDU-04 gestisce i casi in cui lo stato del
consenso è SCADUTO o ANNULLATO (richiedono riaccettazione
dell'informativa) e il flusso comprende la visualizzazione e
accettazione della nuova informativa. CDU-05 è un subset di CDU-04 che
gestisce esclusivamente la modifica del valore (SI→NO o NO→SI) quando il
consenso è in stato ATTIVO o NEGATO, senza necessità di riaccettare
l'informativa. La UI dovrebbe presentare due bottoni distinti: "Modifica
Consenso" (CDU-04) e
"Cambia <!-- [Forneris Marco] Pagina modifica consenso (CDU-04) segue stesse regole composizione dinamica 6.2. --> 
Valore" (CDU-05).

- **Obiettivo**: <u>\[DOC\]</u> Consentire all'utente di modificare una
  scelta di consenso precedentemente espressa (es. da "Nego" a
  "Accetto").

La logica di modifica varia in base allo stato corrente del consenso
\[<u>1</u>\]

- **Precondizioni**: L'utente deve aver già espresso un consenso (*stato
  Accettato, Negato, Scaduto o Annullato*) per la tipologia che intende
  modificare.

- **Scenario principale**

| Stato attuale | Comportamento Web App | Azione richiesta al cittadino |
|----|----|----|
| *Accettato* | Consenso già espresso, modificabile | Il cittadino *non deve* riaccettare l'informativa, anche al variare del valore. |
| *Negato* | Consenso già espresso, modificabile | Il cittadino *non deve* riaccettare l'informativa, anche al variare del valore. |
| *Scaduto* | Consenso già espresso, modificabile, con obbligo di accettazione informativa | Il cittadino *deve* accettare la nuova informativa (anche senza variare il valore). Il sistema presenta il valore precedentemente espresso. |
| *Annullato* | Consenso "vuoto", con obbligo di accettazione informativa | Il cittadino *deve* indicare il consenso e accettare la nuova informativa. Il sistema *non* visualizza il valore precedente. |

\[DOC\] Nel caso di consenso aziendale, se anche un solo consenso del
cittadino per un'azienda ha stato "Scaduto" o "Annullato", il cittadino
dovrà riaccettare le informative \[<u>1</u>\].

Modifica <!-- [Forneris Marco] Pagina modifica consenso (CDU-04) segue stesse regole composizione dinamica 6.2. --> 
del consenso da parte del Cittadino:

**Informazioni trasmesse tra attore e sistema \[DEDOTTO\]**

| **Nome Campo** | **Tipo** | **Modalità** | **Obbl.** | **Formato** | **Default** | **Criteri di validazione** | **Messaggio di errore** |
|----|----|----|----|----|----|----|----|
| Descrizione Consenso | Stringa | D | \- | \- | \- | \- | \- |
| Stato Attuale | Stringa | D | \- | \- | \- | \- | \- |
| <u>valore_consenso</u> | Radio Button | I/D | Sì | (<span class="comment-start" id="132" author="Manuela BONTEMPI" date="2026-04-14T11:55:00Z">Dinamico</span><span class="comment-start" id="133" author="Forneris Marco" date="2026-05-12T17:14:00Z">Valori consenso letti dinamicamente da DB per tipo. Composizione pagina dinamica come 6.2.</span>SI<span class="comment-end" id="132"><span class="comment-end" id="133"></span></span>, NO) | Valore attuale | \- | "Selezionare un valore per il consenso" |
| <u>accettazione_informativa</u> | Checkbox | I | Condiz. | \- | \- | Obbligatorio se stato = SCADUTO o ANNULLATO | "È obbligatorio accettare la nuova informativa" |
| Bottone Salva | Bottone | I | \- | \- | \- | \- | \- |
| d_informativa_id | Hidden | I/D | Condiz | int |  | Obbligatorio se stato = SCADUTO o ANNULLATO | "Errore: informativa non trovata" |
| sotto_tipo_consenso_id | Hidden | I/D | Si | int | Precaricato dalla selezione | Non NULL | \- |
| cf_delegato | Hidden | I/D | Condiz | 16 car. alfanum. | CF delegante se in sessione di delega | \- | \- |

**Legenda Modalità: I = Input utente, D = Display (output sistema), I/D
= Input con valore precaricato**

**Algoritmi**

ALG01 - Caricamento pagina di modifica consenso

1.  Il sistema recupera dalla tabella <u>cons_t_consenso</u> il record
    del consenso che l'utente intende modificare, usando
    <u>cf_cittadino</u> e <u>cons_id</u>.

2.  Il sistema legge il <u>tipo_stato</u> attuale del consenso e il
    <u>d_informativa_id</u> associato.

3.  Il sistema verifica se l'informativa associata al consenso è ancora
    valida confrontando il <u>d_informativa_id</u> del consenso con la
    versione più recente in <u>cons_d_informativa</u>.

4.  In base allo stato, il sistema prepara la maschera:

    - Se stato = 'ATTIVO' o 'NEGATO': la maschera mostra il valore
      attuale e permette di cambiarlo. L'accettazione dell'informativa
      non è richiesta se non è cambiata.

    - Se stato = 'SCADUTO': la maschera mostra il valore precedente (non
      modificabile) e richiede obbligatoriamente la lettura e
      accettazione della nuova informativa prima di poter esprimere un
      nuovo valore.

    - Se stato = 'ANNULLATO': la maschera si presenta come un rilascio
      ex-novo, richiedendo obbligatoriamente la lettura e accettazione
      della nuova informativa.

Validazione Dati: Il sistema valida che tutti i campi obbligatori siano
compilati e che i valori rispettino i formati previsti.

ALG02 - Salvataggio modifica consenso

Vedi algoritmo Canonico sotto

**Storicizzazione e Aggiornamento Consenso (algoritmo canonico, valido
anche per CDU-05):**

1.  Il sistema esegue una SELECT su cons_t_consenso per trovare il
    record valido (data_fine IS NULL) per l'assistito (cf_cittadino), la
    sotto-tipologia di consenso (sotto_tipo_consenso)) e l'eventuale
    azienda (cod_asr).

2.  Il sistema esegue un UPDATE sul record trovato: imposta data_fine =
    NOW() e login_operazione con il CF dell'operatore/cittadino.

3.  Il sistema esegue una INSERT nella tabella cons_s_consenso copiando
    tutti i dati del record appena chiuso in cons_t_consenso,
    valorizzando la FK cons_id.

4.  Il sistema esegue una INSERT nella tabella cons_t_consenso con i
    nuovi
    dati: cf_cittadino, nome, cognome, id_aura, sotto_tipo_consenso, cod_asr, d_informativa_id (ID
    informativa
    accettata), tipo_stato = 'ATTIVO' o 'NEGATO', valore_consenso, data_acquisizione
    = NOW(), data_fine = NULL, login_operazione = CF
    operatore/cittadino, cf_delegato (se presente), fonte_id, endp_id =
    NULL (per i consensi inseriti da utente; valorizzato solo per
    consensi ricevuti da SIA).

5.  Il sistema scrive un record in csi_log_audit con operazione =
    'update' e ogg_oper = 'cons_t_consenso' <span class="insertion"
    author="Manuela BONTEMPI" date="2026-04-14T11:56:00Z">e</span>
    <span class="deletion" author="Manuela BONTEMPI"
    date="2026-04-14T11:56:00Z">.</span> <span class="insertion"
    author="Manuela BONTEMPI"
    date="2026-04-14T11:56:00Z">key_oper</span>

6.  Il sistema inserisce un record in cons_t_notifica per ogni endpoint
    attivo associato al sotto-tipo consenso nella
    tabella cons_r_sotto_tipo_cons_asr_endpoint (con stato_allineamento
    != 'IN_CORSO').

Notifica agli Endpoint: L’algoritmo è lo stesso descritto nel caso d’uso
*CDU-03, ALG02*. Il sistema inserisce un record in cons_t_notifica per
ogni endpoint associato.

<span id="_Toc224739651" class="anchor"></span>6.5 CDU-05:
Modifica <!-- [Forneris Marco] Per web app Cittadino, CDU-05 NON è caso d'uso separato: flusso inglobato in CDU-04. Distinzione CDU-04/05 rilevante solo per Operatore e logica interna. --> 
del valore di un consenso

- **Obiettivo**: Permettere al Cittadino di modificare il valore di un
  consenso già espresso (es. da “Accettato” a “Negato” o viceversa).

- **Precondizioni**: L’utente ha effettuato l’accesso al sistema
  (CDU-01) e ha visualizzato la lista dei suoi consensi (CDU-02).

- **Attori**: Cittadino

- **Post**-**condizioni**: Il sistema ha storicizzato la modifica del
  consenso e ha notificato il nuovo valore agli endpoint aziendali.

- **Scenario principale:**

| Passo | Descrizione del passo |
|----|----|
| 1 | L’utente seleziona un consenso dalla lista e preme il pulsante “Modifica Valore”. |
| 2 | Il sistema presenta una maschera riepilogativa con i dati del consenso e il valore attuale (“Accettato” o “Negato”). |
| 3 | L’utente seleziona il nuovo valore del consenso (l’opposto di quello attuale). |
| 4 | L’utente conferma l’operazione. |
| 5 | Il sistema esegue le validazioni formali e di coerenza. |
| 6 | Il sistema invoca l’algoritmo *ALG01 – Storicizzazione e Aggiornamento Consenso* per registrare la modifica. |
| 7 | Il sistema invoca l’algoritmo *ALG02 – Notifica agli Endpoint* per comunicare la modifica. |
| 8 | Il sistema mostra un messaggio di successo e aggiorna la lista dei consensi. |

**Informazioni trasmesse tra attore e sistema \[DEDOTTO\]**

| **Nome Campo** | **Tipo** | **Modalità** | **Obbl.** | **Formato** | **Default** | **Criteri** | **Errore** |
|----|----|----|----|----|----|----|----|
| Descrizione Consenso | Stringa | D | — | — | — | — | — |
| Valore Attuale | Stringa | D | — | (Accettato/Negato) | — | — | — |
| valore_consenso | Radio Button | I | Sì | (SI, NO) | Valore attuale | Deve essere selezionato | "Selezionare un valore" |
| Bottone Conferma | Bottone | I | — | — | — | — | — |
| sotto_tipo_consenso_id | Hidden | I/D | Sì | int | Precaricato | Non NULL | — |
| cf_delegato | Hidden | I/D | Condiz. | 16 car. alfanum. | CF delegante se presente | — | — |

**Nota:** CDU-05 non include accettazione_informativa (non richiesta, lo
stato è ATTIVO/NEGATO).

**Algoritmi**

ALG01 – Storicizzazione e Aggiornamento Consenso:

Vedi CDU-04, ALG02 — Storicizzazione e Aggiornamento Consenso.

ALG02 – Notifica agli Endpoint:

L’algoritmo è lo stesso descritto nel caso d’uso *CDU-03, ALG02*. Il
sistema inserisce un record in cons_t_notifica per ogni endpoint
associato.

<span id="_Toc224739652" class="anchor"></span>6.6 CDU-06:
Download/stampa PDF consenso

- **Obiettivo**:
  <u>\[</u><u>DOC</u> <!-- [Forneris Marco] nuovo scope CDU-06: Cittadino stampa PDF solo informativa accettata, senza firma digitale, senza valore consenso espresso. --> <u>\]</u>
  Fornire all'utente una copia PDF del consenso espresso, che attesti la
  scelta fatta e l'informativa visionata.

- **Precondizioni**: L'utente deve aver espresso almeno un consenso.

- **Scenario principale**

<table>
<colgroup>
<col style="width: 8%" />
<col style="width: 91%" />
</colgroup>
<thead>
<tr>
<th>Passo</th>
<th>Descrizione del passo</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Dal cruscotto dei consensi (CDU-02), l'utente individua il consenso
di cui desidera una copia.</td>
</tr>
<tr>
<td>2</td>
<td>L'utente seleziona l'opzione "Scarica PDF" o "Stampa".</td>
</tr>
<tr>
<td>3</td>
<td>Il sistema genera dinamicamente un documento PDF.</td>
</tr>
<tr>
<td>4</td>
<td><p>Struttura del documento PDF generato:</p>
<p>[PROPOSTA] Il PDF deve contenere:</p>
<p><strong>Intestazione:</strong> logo Regione Piemonte, titolo
"Attestazione di Consenso"</p>
<p><strong>Dati dell'assistito:</strong> Nome, Cognome, Codice Fiscale
(da cons_t_consenso: cf_cittadino, nome, cognome)</p>
<p><strong>Dati del consenso:</strong> Descrizione
(desc_sotto_tipo_cons), Data acquisizione (data_acquisizione), Valore
espresso (SI/NO), Stato</p>
<p><strong>Dati dell'informativa:</strong> Descrizione informativa
(desc_informativa), Data versione, testo HTML dell'informativa o link al
PDF allegato</p>
<p>Eventuale indicazione del delegato (cf_delegato) se l'operazione è
stata eseguita per delega</p>
<p><strong>Firma</strong> <strong>digitale del documento:</strong> il
PDF deve includere data e ora di generazione e un identificativo univoco
della stampa</p>
<p><strong>Libreria suggerita:</strong> <strong>Per la generazione
server-side usare iText 7 (licenza AGPL, compatibile con Developers
Italia) o Apache PDFBox. La generazione avviene lato backend, il
frontend riceve lo stream binario tramite Content-Type:
application/pdf.</strong></p></td>
</tr>
</tbody>
</table>

\| 4 \| Il sistema rende disponibile il PDF per il download o avvia la
funzione di stampa del browser.

**Informazioni trasmesse tra attore e sistema \[DEDOTTO\]**

| **Nome Campo** | **Tipo** | **Modalità** | **Obbl.** | **Formato** | **Default** | **Criteri** | **Errore** |
|----|----|----|----|----|----|----|----|
| cons_id | Hidden | I/D | Sì | int | Precaricato dalla selezione in CDU-02 | Non NULL | "Consenso non trovato" |
| PDF Generato | Stream binario | D | — | application/pdf | — | — | — |

**NOTA TECNICA – Contesto AS-IS / TO-BE per la Generazione PDF:**

Il CDU-06 (Download/stampa PDF consenso) è pertanto una **funzionalità
nuova introdotta nel TO-BE** dal presente progetto di rifacimento.

La firma <!-- [Forneris Marco] [PROPOSTA] da concordare -->  digitale
qualificata del PDF (eIDAS) **non è richiesta** in questa fase: il CSI
Piemonte ha confermato che non è prevista l'integrazione con un servizio
centralizzato di firma qualificata. Il documento PDF generato deve
includere unicamente la data e l'ora di generazione e un identificativo
univoco della stampa come elementi di attestazione, come già descritto
nello scenario principale del CDU-06.

**Specifica tecnica libreria di generazione PDF:**\
Per la generazione server-side del PDF, il backend deve utilizzare una
delle seguenti librerie, compatibili con lo stack Spring Boot 3.x e con
i requisiti di pubblicazione su Developers Italia (licenza open source):

- **iText 7** (licenza AGPL-3.0) – raccomandato per la ricchezza delle
  funzionalità di layout.

- **Apache PDFBox** (licenza Apache 2.0) – alternativa con licenza più
  permissiva.

La generazione avviene lato **backend**; il frontend Angular riceve lo
stream binario del PDF tramite response HTTP con Content-Type:
application/pdf e Content-Disposition: attachment;
filename="consenso\_\[CF\]\_\[data\].pdf".

<span id="_Toc224739653" class="anchor"></span>6.7 CDU-07: Ricerca
assistito

- **Obiettivo**: <u>\[DOC\]</u> Consentire a un Operatore
  Sanitario/Amministrativo di cercare e selezionare un assistito per
  poter operare sui suoi consensi.

- **Precondizioni**: L'utente deve essere un Operatore
  Sanitario/Amministrativo autenticato tramite PUA.

- **Scenario principale**

| Passo | Descrizione del passo |
|----|----|
| 1 | L'Operatore, dopo l'accesso, visualizza la maschera di ricerca assistito. |
| 2 | L'Operatore inserisce i criteri di ricerca: Codice Fiscale oppure Cognome, Nome e Data di Nascita. |
| 3 | L'Operatore avvia la ricerca. |
| 4 | <u>\[DOC\]</u> Il sistema invoca il servizio di ricerca anagrafica di **AURA** utilizzando i criteri forniti. Se non c’è output invia una richiesta di ricerca al servizio esterno <span class="comment-start" id="151" author="Sabina CARONI" date="2026-05-11T09:47:00Z">vengono richiamati FindProfiliAnagrafici e getProfiloSanitario di Aura. Nel caso il cf non venisse trovato, viene restituito il messaggio "La ricerca con il filtro fornito **non** ha prodotto risultati". Non viene eseguita alcuna ricerca su SistemaTS</span><span class="comment-start" id="152" author="Forneris Marco" date="2026-05-12T17:23:00Z">Sistema invoca FindProfiliAnagrafici + getProfiloSanitario di AURA. Se CF non trovato → messaggio «La ricerca con il filtro fornito non ha prodotto risultati». Nessuna chiamata SistemaTS.</span>SistemaTS<span class="comment-end" id="151"><span class="comment-end" id="152"></span></span>. |
| 5 | Il sistema mostra l'elenco degli assistiti trovati che corrispondono ai criteri. |
| 6 | L'Operatore seleziona l'assistito corretto dalla lista. |
| 7 | Il sistema carica il cruscotto dei consensi per l'assistito selezionato. |

**Dettaglio colonne del "Risultato Ricerca":** La tabella dei risultati
deve mostrare per ogni assistito trovato: Cognome, Nome, Codice Fiscale,
Data di Nascita, Comune di Nascita, ASR di appartenenza. Questi dati
sono quelli restituiti dalla response del servizio AURA e devono essere
sufficienti per permettere all'operatore di identificare univocamente il
paziente in caso di omonimi.

Ricerca assistito da parte dell'Operatore

**Informazioni trasmesse tra attore e sistema <u>\[DEDOTTO\]</u>**

| Nome Campo | Tipo | Modalità | Obbl. | Formato | Default | Criteri di validazione | Messaggio di errore |
|----|----|----|----|----|----|----|----|
| <u>codice_fiscale</u> | Testo | I | Condiz. | 16 car. alfanum. | \- | Validazione formale CF | "Codice Fiscale non valido" |
| <u>nome</u> | Testo | I | Condiz. | \- | \- | \- | \- |
| <u>cognome</u> | Testo | I | Condiz. | \- | \- | \- | \- |
| <u>data_nascita</u> | Data | I | Condiz. | GG/MM/AAAA | \- | \- | \- |
| Bottone Cerca | Bottone | I | \- | \- | \- | CF oppure nome+cognome+data | "Inserire almeno un criterio di ricerca" |
| Risultato Ricerca | Tabella | D | \- | \- | \- | \- | \- |

Nota: La ricerca può avvenire per Codice Fiscale (campo singolo) oppure
per combinazione nome + cognome + data di nascita. Almeno uno dei due
criteri deve essere compilato.

**Legenda Modalità: I = Input utente, D = Display (output sistema), I/D
= Input con valore precaricato**

- **Varianti**

  - **6.7.1 (Assistito non trovato)**: Se la ricerca su AURA non produce
    risultati, il sistema mostra un messaggio di errore.

  - **6.7.2 (Risultati multipli)**: Se la ricerca produce più risultati,
    l'operatore deve raffinarla o selezionare l'utente corretto in base
    ad altri dati visibili (es. indirizzo). <u>\[PROPOSTA\]</u>

<span id="_Toc224739654" class="anchor"></span>6.8 CDU-08: Consultazione
dei consensi di un assistito

| **Attributo** | **Valore** |
|----|----|
| Attore primario | Operatore Sanitario/Amministrativo |
| Breve descrizione | L'operatore, dopo aver cercato e selezionato un assistito (CDU-07), visualizza lo stato di tutti i suoi consensi |
| Precondizioni | L'operatore ha effettuato l'accesso tramite PUA. L'assistito è stato cercato e selezionato (CDU-07). |

Scenario principale <u>\[</u>DEDOTTO<u>\]</u>

La logica di visualizzazione è identica a quella del CDU-02
(Consultazione dei consensi da parte del Cittadino). Il sistema presenta
l'elenco dei consensi dell'assistito selezionato, con il relativo stato
(Attivo, Negato, Scaduto, Annullato), il valore espresso, la data di
acquisizione e l'informativa associata.

L'operatore può selezionare un consenso per visualizzarne il dettaglio
completo.

<span id="_Toc224739655" class="anchor"></span>6.9 CDU-09: Rilascio del
consenso per conto di un assistito

| **Attributo** | **Valore** |
|----|----|
| Attore primario | Operatore Sanitario/Amministrativo |
| Breve descrizione | L'operatore rilascia un nuovo consenso per conto dell'assistito |
| Precondizioni | L'operatore ha effettuato l'accesso tramite PUA. L'assistito è stato cercato e selezionato (CDU-07). Gli enti/endpoint per cui è possibile esprimere il consenso non devono essere in stato di allineamento (<u>stato_allineamento = 'IN_CORSO'</u> nella tabella <u>cons_r_asr_endpoint</u>). |

Scenario principale <u>\[</u>DEDOTTO<u>\]</u>

La logica è identica a quella del CDU-03 (Rilascio del consenso da parte
del Cittadino), con le seguenti differenze: il campo <u>fonte_id</u>
viene valorizzato con 'PASS' (Punto Assistito) e i campi
<u>login_operazione</u> e <u>ruoloop_id</u> vengono valorizzati con i
dati dell'operatore. Si applicano gli stessi Algoritmi (ALG01, ALG02) e
la stessa tabella "Informazioni trasmesse" del CDU-03.

**Per CDU-09, CDU-10, CDU-11: Rilascio, Modifica del consenso da parte
dell'Operatore\
\
Algoritmi**

ALG01 - Ricerca assistito <u>\[DOC\]</u>

1.  L'operatore inserisce il Codice Fiscale o i dati anagrafici (nome,
    cognome, data di nascita).

2.  Il sistema invia una richiesta di ricerca al servizio esterno di
    AURA.

3.  Se AURA restituisce un match, il sistema visualizza i dati
    dell'assistito.

4.  Se <!-- [Forneris Marco] Eliminare: tutti riferimenti fallback SistemaTS in 6.7 --> 
    AURA non restituisce un match, il sistema invia una richiesta di
    ricerca al servizio esterno SistemaTS.

5.  Se SistemaTS restituisce un match, il sistema visualizza i dati.

6.  Se nessun sistema restituisce risultati, viene mostrato un messaggio
    di "Assistito non trovato".

7.  Il sistema traccia la chiamata ai servizi esterni nelle tabelle di
    tracciatura (<u>cons_t_traccia_serv_est</u>).

ALG02 - Gestione consenso per conto di <u>\[DEDOTTO\]</u>

8.  Una volta selezionato l'assistito, la logica applicativa per il
    rilascio, la modifica del consenso segue esattamente gli stessi
    algoritmi descritti per i CDU-03,
    CDU-04 <!-- [Forneris Marco] Aggiungere nuovo paragrafo dopo «Scenario principale [DEDOTTO]» in 6.10 (replicare in 6.9 CDU-09 e 6.11 CDU-11): Composizione dinamica pagina operatore -Sia per il rilascio (CDU-09) che per la modifica (CDU-10, CDU-11) di un consenso per conto di un assistito, la pagina di gestione del consenso si compone dinamicamente - sulla base della configurazione del tipo di consenso, applicando le stesse regole definite per il Cittadino in CDU-02 (6.2 — requisito CSI) e CDU-04 (6.4 — requisito CSI): - Campi visualizzati derivati dalla configurazione del tipo_consenso/sotto_tipo_consenso - Valori ammessi per valore_consenso letti dinamicamente da cons_d_sotto_tipo_cons / tabelle correlate - Domande/flag opzionali presentati se previsti dalla configurazione - Informativa visualizzata per singola azienda quando il consenso è aziendale con informativa per-ente (analogo a CDU-02 — requisito CSI) - Layout dinamico identico al lato cittadino, modulo differenze sorgente: - fonte_id = 'PASS' - login_operazione + ruoloop_id valorizzati con dati Operatore Single Source of Truth: la stessa logica di rendering della pagina cittadino viene riutilizzata lato operatore. Non sono ammesse divergenze nella struttura dei campi tra interfaccia Cittadino e interfaccia Operatore per lo stesso sotto_tipo_consenso. Vincolo architetturale: motore di rendering form-consenso unico, riusato da entrambe le web app (Cittadino + Operatore/PUA). Da riflettere in 3.3 Componenti software → identificare componente «Form Renderer dinamico» condiviso. --> 
    e CDU-05.

9.  L'unica differenza è che il campo <u>fonte_id</u> nella tabella
    <u>cons_t_consenso</u> viene valorizzato con 'PASS' (Punto
    Assistito) e i campi <u>login_operazione</u> e <u>ruoloop_id</u>
    vengono valorizzati con i dati dell'operatore che sta eseguendo
    l'operazione<span class="deletion" author="Manuela BONTEMPI"
    date="2026-04-14T12:18:00Z">.</span><span class="paragraph-deletion"
    author="Manuela BONTEMPI" date="2026-04-14T12:18:00Z"></span>

<span id="_Toc224739656" class="anchor"></span>6.10 CDU-10: Modifica del
consenso per conto di un assistito

| **Attributo** | **Valore** |
|----|----|
| Attore primario | Operatore Sanitario/Amministrativo |
| Breve descrizione | L'operatore modifica un consenso esistente per conto dell'assistito |
| Precondizioni | L'operatore ha effettuato l'accesso tramite PUA. L'assistito è stato cercato e selezionato (CDU-07). |

Scenario principale <u>\[</u>DEDOTTO<u>\]</u>

La logica è identica a quella del CDU-04 (Modifica del consenso da parte
del Cittadino), con le stesse differenze indicate nel CDU-09 per quanto
riguarda la fonte e la tracciatura dell'operatore. Si applicano gli
stessi Algoritmi (ALG01, ALG02) e la stessa tabella "Informazioni
trasmesse" del CDU-04.

**Per CDU-09, CDU-10, CDU-11: Rilascio, Modifica del consenso da parte
dell'Operatore\
\
Algoritmi**

ALG01 - Ricerca assistito:

Vedi CDU-07, scenario principale. La logica di ricerca tramite
AURA/SistemaTS e la tracciatura in cons_t_traccia_serv_est sono le
medesime descritte nel CDU-07.

ALG02 - Gestione consenso per conto di <u>\[DEDOTTO\]</u>

1.  Una volta selezionato l'assistito, la logica applicativa per il
    rilascio, la modifica del consenso segue esattamente gli stessi
    algoritmi descritti per i CDU-03, CDU-04 e CDU-05.

2.  L'unica differenza è che il campo <u>fonte_id</u> nella tabella
    <u>cons_t_consenso</u> viene valorizzato con 'PASS' (Punto
    Assistito) e i campi <u>login_operazione</u> e <u>ruoloop_id</u>
    vengono valorizzati con i dati dell'operatore che sta eseguendo
    l'operazione.

<span id="_Toc224739657" class="anchor"></span>6.11 CDU-11: Modifica del
valore di un consenso per conto di un assistito

- **Obiettivo**: Permettere all’Operatore Sanitario/Amministrativo di
  modificare il valore di un consenso per conto di un assistito.

- **Precondizioni**: L’operatore ha effettuato l’accesso (CDU-01), ha
  cercato e selezionato un assistito (CDU-07) e ha visualizzato i suoi
  consensi (CDU-08).

- **Attori**: Operatore Sanitario/Amministrativo

- **Post**-**condizioni**: Il sistema ha storicizzato la modifica del
  consenso e ha notificato il nuovo valore agli endpoint aziendali.

- **Scenario principale:**

**Scenario principale**

Lo scenario ricalca quello del caso d’uso *CDU-05*, con la differenza
che ogni operazione viene eseguita dall’Operatore per conto
dell’assistito. Tutti gli algoritmi di validazione e aggiornamento sono
i medesimi.

**Per CDU-09, CDU-10, CDU-11: Rilascio, Modifica del consenso da parte
dell'Operatore\
\
Algoritmi**

ALG01 - Ricerca assistito:

Vedi CDU-07, scenario principale. La logica di ricerca tramite AURAe la
tracciatura in cons_t_traccia_serv_est sono le medesime descritte nel
CDU-07.

ALG02 - Gestione consenso per conto di <u>\[DEDOTTO\]</u>

1.  Una volta selezionato l'assistito, la logica applicativa per il
    rilascio, la modifica del consenso segue esattamente gli stessi
    algoritmi descritti per i CDU-03, CDU-04 e CDU-05.

2.  L'unica differenza è che il campo <u>fonte_id</u> nella tabella
    <u>cons_t_consenso</u> viene valorizzato con 'PASS' (Punto
    Assistito) e i campi <u>login_operazione</u> e <u>ruoloop_id</u>
    vengono valorizzati con i dati dell'operatore che sta eseguendo
    l'operazione.

<span id="_Toc224739658" class="anchor"></span>6.12 CDU-12: Gestione
tipo consenso

- **Obiettivo**: Permettere all’Operatore di Back Office di creare e
  modificare le tipologie di consenso, definendone le caratteristiche
  generali, i parametri dinamici, i valori possibili e le aziende
  associate, in base a quanto definito nel documento di requisiti \[1\].

- **Attori:** Operatore di Back Office

- **Precondizioni**: L’operatore è autenticato sul PUA con il profilo di
  Operatore di Back Office.

- **Post**-**condizioni:** Il sistema ha salvato o modificato la
  configurazione del tipo consenso e delle sue entità collegate
  (parametri, valori, associazioni enti).

- **Scenario principale**

1.  L’operatore seleziona la funzione “Gestione Tipo Consenso”.

2.  Il sistema visualizza l’elenco dei consensi esistenti, con filtri
    per “Codice Consenso” e “Tipo Consenso” (Nazionale, Regionale,
    Aziendale).

3.  L’operatore clicca su “Nuovo Tipo Consenso”.

4.  Il sistema presenta la maschera di inserimento, suddivisa in
    sezioni: “Dati Generali”, “Parametri Aggiuntivi”, “Associazione
    Enti”.

5.  L’operatore compila i Dati Generali (Codice, Descrizione, Date,
    Valori possibili).

6.  L’operatore compila i Parametri Aggiuntivi (Descrizione Estesa,
    Domanda, Testo, Online, Annulla Consensi). Questi campi sono
    dinamici e vengono letti dalla tabella <u>cons_d_parametro</u>
    \[1\].

7.  L’operatore seleziona il Tipo Consenso (Nazionale, Regionale,
    Aziendale).

8.  Il sistema, in base alla selezione, popola dinamicamente la lista
    Enti/Aziende da associare (vedi ALG01).

9.  L’operatore seleziona uno o più enti/aziende dalla lista.

10. L’operatore clicca su “Salva”.

11. Il sistema valida i dati (vedi tabella “Informazioni Trasmesse”).

12. Il sistema esegue il salvataggio del nuovo tipo consenso e di tutte
    le sue entità collegate (vedi ALG02).

13. Il sistema mostra un messaggio di successo e aggiorna l’elenco dei
    consensi.

**Informazioni trasmesse tra attore e sistema**

| **Sezione** | **Nome Campo** | **Tipo** | **Modalità** | **Obbl.** | **Formato** | **Default** | **Criteri di validazione** | **Messaggio di errore** |
|----|----|----|----|----|----|----|----|----|
| Dati Generali | Codice Consenso | Testo | I | S | Max 50 chr | \- | Univoco in <u>cons_d_sotto_tipo_cons</u> | "Codice consenso già esistente" |
|  | Descrizione Consenso | Testo | I | S | Max 255 chr | \- | \- | \- |
|  | Data Inizio Decorrenza | Data | I | S | GG/MM/AAAA | Data odierna | \- | \- |
|  | Data Fine Decorrenza | Data | I | N | GG/MM/AAAA | \- | Deve essere \> <u>validita_inizio</u> | "Data fine non valida" |
|  | Valori Possibili | Multi-Select | I/D | S | \- | \- | Almeno uno selezionato | "Selezionare almeno un valore" |
|  | fk_tipo_cons | Select | I | S | Id Numerico |  | FK valida verso cons_d_tipo_cons |  |
| Parametri Aggiuntivi | Descrizione Estesa | Text Area | I | S | \- | \- | \- | \- |
|  | Domanda da porre | Testo | I | S | Max 255 chr | \- | \- | \- |
|  | Testo aggiuntivo | Text Area | I | N | \- | \- | \- | \- |
|  | Consenso Online | Radio | I | S | SI/NO | SI | \- | \- |
|  | Annulla consensi | Radio | I | S | SI/NO | NO | \- | \- |
| Associazione Enti | Tipo Consenso | Select | I | S | Nazionale, Regionale, Aziendale | \- | \- | \- |
|  | Enti/Aziende | Multi-Select | I/D | S | \- | \- | Almeno uno selezionato | "Associare almeno un ente" |

**Legenda Modalità: I = Input utente, D = Display (output sistema), I/D
= Input con valore precaricato**

**NOTA:** I campi online e annulla_consensi in questa sezione vengono
salvati in cons_r_consenso_parametro come valori dinamici. Gli stessi
campi in CDU-13 riguardano esclusivamente la
specifica cons_d_informativa. Non sono ridondanti: un tipo consenso può
avere online=SI ma una singola informativa può avere online=NO (es.
informativa speciale de visu). In caso di conflitto, prevale il valore
dell'informativa.

**Varianti:**

Modifica tipo consenso: L’operatore seleziona un consenso esistente e
clicca “Modifica”. Il sistema presenta la maschera pre-compilata. La
modifica è limitata ai campi: Descrizione, Data fine, Flag (Online,
Annulla), e l’associazione con gli enti/aziende \[1\].

**Algoritmi:**

ALG01 – Popolamento dinamico Enti/Aziende

1.  Alla selezione del campo “Tipo Consenso”:

    - Se il valore è “Nazionale”, il sistema popola la lista
      “Enti/Aziende” con gli enti presenti in <u>cons_d_asr</u> dove
      <u>tipo_ente = 'NAZIONALE'</u>.

    - Se il valore è “Regionale”, il sistema popola la lista con gli
      enti dove <u>tipo_ente = 'REGIONALE'</u>.

    - Se il valore è “Aziendale”, il sistema popola la lista con tutti
      gli enti dove <u>tipo_ente = 'AZIENDALE'</u> e per cui esiste
      almeno un record attivo nella tabella <u>cons_r_asr_endpoint</u>
      \[1\].

ALG02 – Salvataggio del Tipo Consenso

2.  Il sistema esegue una <u>INSERT</u> nella tabella
    <u>cons_d_sotto_tipo_cons</u> con i dati generali (codice,
    descrizione, date).

    1.  Per ogni parametro aggiuntivo compilato dall’utente (Descrizione
        Estesa, Domanda, Testo, Online, Annulla), il sistema esegue una
        <u>INSERT</u> nella tabella <u>cons_r_consenso_parametro</u>,
        associando il valore al <u>sotto_tipo_consenso_id</u> appena
        creato. Il <u>param_id</u> viene recuperato dalla tabella
        <u>cons_d_parametro</u> in base al nome del campo.

    2.  Per ogni valore possibile selezionato dall’operatore (es.
        “Accettato”, “Negato”), il sistema esegue una <u>INSERT</u>
        nella tabella <u>cons_r_consenso_valore</u>, associando il
        <u>valore_consenso_id</u> al <u>sotto_tipo_consenso_id</u>.

    3.  Per ogni ente/azienda selezionato dall’utente:

        - Il sistema esegue una <u>INSERT</u> nella tabella
          <u>cons_r_sotto_tipo_cons_asr_endpoint</u> per creare
          l’associazione diretta.

        - Logica Regionale: Se il tipo consenso è “Regionale” e l’utente
          seleziona “Regione Piemonte”, il sistema itera su tutte le ASR
          appartenenti a quella regione e crea N record di associazione
          in <u>cons_r_sotto_tipo_cons_asr_endpoint</u>, uno per ogni
          ASR \[1\].

<span id="_Toc224739659" class="anchor"></span>6.13 CDU-13: Gestione
informativa

- **Obiettivo**: <u>\[DOC\]</u> Permettere a un Operatore di Back Office
  di caricare e gestire le informative sulla privacy associate a ciascun
  tipo di consenso.

- **Precondizioni**: L'utente deve essere un Operatore di Back Office
  autenticato.

- **Scenario principale**

| Passo | Descrizione del passo |
|----|----|
| 1 | L'Operatore accede alla sezione "Configurazione" e seleziona "Gestione Informative". |
| 2 | L'Operatore seleziona la tipologia di consenso a cui associare l'informativa. |
| 3 | L'Operatore carica un nuovo documento PDF per l'informativa, specificando una data di inizio e (opzionalmente) una data di fine validità. |
| 4 | <u>\[DEDOTTO\]</u> Il sistema salva il file PDF e crea una nuova versione dell'informativa nella tabella <u>cons_d_informativa</u>. |
| 5 | Il sistema salva gli allegati dell'informativa (PDF, HTML) nella tabella cons_t_allegato, associandoli all'informativa tramite d_informativa_id e classificandoli per tipo tramite allegato_tipo_id (FK verso cons_d_allegato_tipo). |
| 6 | \[DOC\] La pubblicazione di una nuova informativa (impostando una data di scadenza a quella precedente) attiva il processo BATCH-02, che aggiornerà lo stato dei consensi a "Scaduto" o "Annullato" in base al valore del flag annulla_consensi associato \[1\]. |

**Algoritmi**

ALG01 - Creazione/Modifica Informativa

1.  L'operatore di Back Office compila i campi della maschera (codice,
    descrizione, testo HTML, date di validità, flag <u>online</u> e
    <u>annulla_consensi</u>).

2.  Il sistema salva o aggiorna il record nella tabella
    <u>cons_d_informativa</u>.

3.  Se viene caricato un nuovo PDF, il sistema lo salva in un'area di
    storage dedicata e memorizza il percorso nel campo
    <u>pdf_informativa</u>.

ALG02 - Logica di scadenza/annullamento consensi

**Nota architetturale:** L'algoritmo ALG02 descrive la logica di
business eseguita dal BATCH-02. Il CDU-13 (step 6) si limita a
triggerare il processo: alla pubblicazione di una nuova informativa
(salvataggio con data_scadenza valorizzata sulla precedente), il backend
del CDU-13 inserisce un messaggio/flag che segnala al BATCH-02 di
eseguire la prossima elaborazione. Non eseguire questa logica in modo
sincrono nel service del CDU-13, poiché potrebbe impattare un numero
elevato di record e causare timeout della richiesta HTTP. Tutta la
logica è delegata al BATCH-02 che la esegue in modo asincrono.

1\. L'operatore imposta una data di scadenza all'informativa e salva.

2\. Il sistema legge il valore del flag annulla_consensi direttamente
dalla tabella cons_d_informativa per l'informativa in scadenza.

3\. Per ogni cons_t_consenso attivo (data_fine IS NULL) legato
all'informativa in scadenza:

Il sistema esegue un UPDATE impostando data_fine = NOW().

*Se "Annulla consensi" = SI*:

Il sistema esegue una INSERT in cons_t_consenso con i dati del consenso
precedente ma con tipo_stato = 'ANNULLATO' e data_fine = NULL.

Il sistema inserisce un record in cons_t_notifica per notificare
l'annullamento.

*Se "Annulla consensi" = NO*:

Il sistema esegue una INSERT in cons_t_consenso con i dati del consenso
precedente ma con tipo_stato = 'SCADUTO' e data_fine = NULL.

**Informazioni trasmesse tra attore e sistema <u>\[DEDOTTO\]</u>**

| **Nome Campo** | **Tipo** | **Modalità** | **Obbl.** | **Formato** | **Default** | **Criteri di validazione** | **Messaggio di errore** |
|----|----|----|----|----|----|----|----|
| <u>desc_informativa</u> | Testo | I | Sì | \- | \- | \- | "Descrizione obbligatoria" |
| <u>html_informativa</u> | Area Testo | I | Sì | HTML | \- | \- | "Testo informativa obbligatorio" |
| <u>pdf_informativa</u> | File Upload | I | No | .pdf | \- | \- | \- |
| <u>data_decorrenza</u> | Data | I | Sì | GG/MM/AAAA | Data odierna | \- | "Data decorrenza obbligatoria" |
| <u>data_scadenza</u> | Data | I | No | GG/MM/AAAA | \- | Deve essere \> <u>data_decorrenza</u> | "Data scadenza non valida" |
| <u>online</u> | Checkbox | I | No | \- | Selezionato | \- | \- |
| <u>annulla_consensi</u> | Checkbox | I | No | \- | Non selezionato | \- | \- |
| Bottone Salva | Bottone | I | \- | \- | \- | \- | \- |
| sotto_tipo_consenso | Select | I | SI | Id numerico |  | FK valida verso cons_d_sotto_tipo_cons | "Selezionare il tipo di consenso associato" |

**Legenda Modalità: I = Input utente, D = Display (output sistema), I/D
= Input con valore precaricato**

<span id="_Toc224739660" class="anchor"></span>6.14 CDU-14: Gestione
ente ed endpoint

- **Obiettivo**: <u>\[DOC\]</u> Permettere a un Operatore di Back Office
  di gestire l'anagrafica degli enti (ASR) e dei relativi endpoint a cui
  notificare le variazioni dei consensi.

- **Precondizioni**: L'utente deve essere un Operatore di Back Office
  autenticato.

- **Scenario principale**

| Passo | Descrizione del passo |
|----|----|
| 1 | L'Operatore accede alla sezione "Configurazione" e seleziona "Gestione Enti ed Endpoint". |
| 2 | Il sistema mostra l'elenco degli enti (ASR) configurati. |
| 3 | L'Operatore può aggiungere un nuovo ente o modificarne uno esistente. |
| 4 | Per ogni ente, l'Operatore può configurare uno o più endpoint di servizio (URL), specificando a quale tipologia di consenso sono associati. |
| 5 | <u>\[DEDOTTO\]</u> Il sistema salva le configurazioni nelle tabelle <u>cons_d_asr</u>, <u>cons_t_endpoint</u> e nelle relative tabelle di relazione. |
| 6 | <u>\[DOC\]</u> L'aggiunta di un nuovo endpoint per un consenso già attivo attiverà il processo batch (BATCH-03) per l'allineamento massivo dei consensi esistenti verso il nuovo sistema. |
| 7 | Salvataggio endpoint: al salvataggio il campo stato_allineamento viene impostato a DA_ALLINEARE |

Informazioni trasmesse tra attore e sistema - Maschera Ente \[DEDOTTO\]

| Nome Campo | Tipo | Modalità | Obbl. | Formato | Default | Criteri di validazione | Messaggio di errore |
|----|----|----|----|----|----|----|----|
| cod_asr | Testo | I | Sì | Max 10 chr | \- | Univoco in cons_d_asr | "Codice ente già esistente" |
| desc_asr | Testo | I | Sì | Max 255 chr | \- | \- | "Descrizione obbligatoria" |
| Bottone Salva | Bottone | I | \- | \- | \- | \- | \- |
| tipo_ente | Select | I | SI | NAZIONALE / REGIONALE / AZIENDALE |  |  |  |
| data_creazione | Data | D | \- | GG/MM/AAAA | \- | \- | \- |
| data_cancellazione | Data | I | NO | GG/MM/AAAA | \- | \- | \- |

Informazioni trasmesse tra attore e sistema - Maschera Endpoint
\[DEDOTTO\]

| Nome Campo | Tipo | Modalità | Obbl. | Formato | Default | Criteri di validazione | Messaggio di errore |
|----|----|----|----|----|----|----|----|
| endp_url | Testo | I | Sì | URL valida (https://) | \- | Formato URL valido | "URL non valido" |
| cod_asr | Select | I/D | Sì | \- | \- | FK valida verso cons_d_asr | "Selezionare un ente" |
| sotto_tipo_consenso | Select (Multi) | I | Sì | \- | \- | FK valida verso cons_d_sotto_tipo_cons | “Selezionare almeno un tipo consenso" |
| destinazione_id | Select | I | No | \- | \- | FK valida verso cons_d_asr_destinazione | "Selezionare una destinazione" |
| valida_inizio | Data | I | SI | GG/MM/AAAA | \- | *≤ valida_fine se valorizzata* | "Data inizio obbligatoria" |
| valida_fine | Data | I | NO | GG/MM/AAAA | \- | Deve essere \> valida_inizio | "Data fine non valida" |
| stato_allineamento | Display | D | \- | \- | DA_ALLINEARE | Sola lettura (IN_CORSO / COMPLETATO / DA_ALLINEARE /ERRORE) | \- |
| Bottone Salva | Bottone | I | \- | \- | \- | \- | \- |

**Legenda Modalità: I = Input utente, D = Display (output sistema), I/D
= Input con valore precaricato**

<span id="_Toc224739661" class="anchor"></span>6.15 CDU-15: Esposizione
servizio recupero stato consenso (per Enti/Aziende)

**Attore primario**: Sistema Informativo Aziendale (SIA).

**Obiettivo**: \[DOC\] Fornire un servizio REST sicuro e performante che
permetta a un sistema esterno (es. un'applicazione di un'ASR) di
verificare lo stato di un consenso per un dato cittadino \[<u>1</u>\].

**Precondizioni:** Il sistema chiamante deve essere autenticato e
autorizzato a invocare il servizio.

**Scenario principale:**

1\. Il sistema esterno (client) invia una richiesta GET all'endpoint
/api/v1/consensi/stato fornendo come parametri codice_fiscale,
codice_consenso e codice_ente.

2\. Il sistema Gestione Consensi valida la richiesta e i parametri.

3\. Recupera dalla tabella cons_t_consenso l'ultimo stato valido del
consenso per l'assistito e l'ente specificati.

4\. Recupera le informazioni sull'informativa associata da
cons_d_informativa.

5\. Il sistema risponde con un oggetto JSON contenente: valore_consenso,
data_espressione, stato_consenso, informativa (con versione, date
validità), data_inizio_validita_consenso, data_fine_validita_consenso.

**Specifiche tecniche API:**

GET
/api/v1/consensi/stato?codice_fiscale={cf}&codice_consenso={cod}&codice_ente={ente}

Autenticazione: Bearer Token (JWT) rilasciato dall'Authorization Server
del CSI Piemonte. Il token deve includere il client_id del sistema SIA
chiamante.

**Response 200 OK:**

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

**Codici di risposta:** 200 OK, 400 Bad Request (parametri
mancanti/malformati), 401 Unauthorized, 403 Forbidden (ente non
autorizzato a leggere quel consenso), 404 Not Found (consenso non
trovato per l'assistito), 500 Internal Server Error.

<span id="_Toc224739662" class="anchor"></span>6.16 CDU-16: Esposizione
servizio di configurazione (per
Enti/Aziende <!-- [Forneris Marco] Punti da chiarire con CSI:  - URL esatto AS CSI Piemonte produzione/test - Algoritmo firma JWT (RS256? ES256?) + endpoint JWKS pubblicazione chiavi - Procedura onboarding nuovo SIA (chi crea client_id, chi popola mapping ente) - TTL token raccomandato - Esistenza scope predefiniti CSI o liberi a definire dal progetto - Politica revoca compromesso credenziali (rotation, blacklist) --> )

**Attore primario**: Sistema Informativo Aziendale (SIA).

**Obiettivo:** \[DOC\] Fornire un servizio REST che esponga le
configurazioni attive (consensi, informative, endpoint) per un dato
ente, permettendo ai sistemi esterni di allinearsi dinamicamente
\[<u>1</u>\].

**Precondizioni:** Il sistema chiamante deve essere autenticato e
autorizzato.

**Scenario principale:**

1\. Il sistema esterno (client) invia una richiesta GET all'endpoint
/api/v1/configurazione/{codice_ente}.

2\. Il sistema Gestione Consensi valida la richiesta.

3\. Recupera dal database l'elenco dei consensi attivi per l'ente
specificato.

4\. Per ogni consenso, recupera l'informativa attiva e gli endpoint di
notifica configurati.

5\. Il sistema risponde con un oggetto JSON strutturato contenente
l'elenco dei consensi, ognuno con i dettagli dell'informativa e degli
endpoint associati.

**Specifiche tecniche API:**

GET /api/v1/configurazione/{codice_ente}

**Autenticazione:** medesima di CDU-15 (Bearer Token JWT).

**Response 200 OK:**

{

"codice_ente": "010",

"consensi_attivi": \[

{

"codice_consenso": "ROL",

"descrizione": "Ritiro On Line Referti",

"tipo": "AZIENDALE",

"informativa": {

"id": 42,

"data_decorrenza": "2024-06-01"

},

"endpoints_notifica": \[

{

"endp_id": 5,

"endp_url": "https://sia.asl01.piemonte.it/ws/consensi"

}

\] }\]}

<span id="_Toc224739663" class="anchor"></span>7. Processi batch

<u>\[DOC\]</u> Il sistema prevede l'esecuzione di processi batch
periodici per gestire attività asincrone e massive, garantendo
l'allineamento dei dati tra il sistema centrale e i sistemi periferici,
e mantenendo informati i cittadini. \[1\]

<span id="_Toc224739664" class="anchor"></span>7.1 BATCH-01: Notifica
consensi verso aziende/enti

- **Informazioni di base**

  - Nome: NotificaConsensi

  - Periodicità: Ogni 5 minuti

- **Descrizione procedura:** Il processo batch notifica ai sistemi
  esterni (endpoint) le variazioni dei consensi (nuovi, modificati).

- **Input:** Tabella <u>cons_t_notifica</u>

- **Output:** Chiamate ai Web Service degli endpoint, aggiornamento
  <u>cons_t_notifica</u>

- **Logica applicativa**

  1.  Il processo seleziona tutti i record dalla tabella
      <u>cons_t_notifica</u> con <u>not_stato</u> = ‘DA_INVIARE’.

  2.  Per ogni record, costruisce il messaggio SOAP di notifica
      (Acquisizione) contenente i dati del consenso.

  3.  Invia la notifica all'URL specificato in <u>not_endp_url</u>.

  4.  Per ogni notifica inviata con successo all'azienda, il sistema
      inserisce un record nella tabella delle notifiche verso il
      cittadino per informarlo dell'avvenuta comunicazione del suo
      consenso all'azienda X.

**Nota per gli sviluppatori:** Confermato da CSI: i sistemi informativi
aziendali (SIA) delle ASR che ricevono le notifiche del BATCH-01
mantengono gli endpoint SOAP esistenti e non sono previste migrazioni a
REST/JSON nel TO-BE. I contratti WSDL e gli endpoint AS-IS descritti nel
documento di
riferimento \[6\] (*Specifica-WebService_ConsensoRegionaleAziendale_v03*)
rimangono validi e devono essere rispettati.

Di conseguenza, il backend Spring Boot deve includere un client SOAP per
la comunicazione con i SIA delle ASR. Si raccomanda l'utilizzo di Apache
CXF (integrazione nativa con Spring Boot 3.x
tramite cxf-spring-boot-starter-jaxws) oppure
di Spring-WS (spring-ws-core). La scelta del framework SOAP client deve
essere consolidata nella fase di progettazione tecnica.

Il payload del messaggio SOAP di notifica deve essere compatibile con
l'operazione Acquisizione definita nel WSDL di riferimento e deve
includere obbligatoriamente i
campi: codFiscale, codAsr, codConsenso, valConsenso (SI/NO), dataAcquisizione, codOperatore, fonte.

La gestione degli errori SOAP (SOAP Fault) deve aggiornare il record
in cons_t_notifica con not_stato = 'ERRORE' e registrare i dettagli
in cons_t_notifica_errore_dett, come già descritto nella variante VAR01
di 7.1.

- **Varianti**

  - VAR01: Se la chiamata al servizio esterno fallisce (errore HTTP o
    SOAP Fault), il processo aggiorna il record in
    <u>cons_t_notifica</u> impostando <u>not_stato</u> = ‘ERRORE’ e
    registra i dettagli dell'errore in
    <u>cons_t_notifica_errore_dett</u>.

- **Algoritmi**

  - **ALG01 - Selezione record da notificare:** <u>SELECT \* FROM
    cons_t_notifica WHERE not_stato = 'DA_INVIARE' ORDER BY
    data_creazione ASC;</u>

  - **ALG02 - Gestione tentativi:** <u>\[PROPOSTA\]</u> Si propone di
    aggiungere un contatore di tentativi in <u>cons_t_notifica</u>. Dopo
    3 tentativi falliti, il record viene impostato su
    ‘ERRORE_PERMANENTE’ e non viene più processato automaticamente,
    richiedendo un intervento manuale.

- **Condizioni d’uscita:** Il processo termina dopo aver tentato di
  inviare tutte le notifiche in stato ‘DA_INVIARE’.

<span id="_Toc224739665" class="anchor"></span>7.2 BATCH-02: Notifica
scadenza/annullamento informativa

- **Informazioni di base**

  - Nome: NotificaScadenzaInformative

  - Periodicità: Una volta al giorno (notturno)

- **Descrizione procedura:** Il processo verifica le informative la cui
  data di scadenza è passata e aggiorna lo stato dei consensi collegati.
  Invia inoltre notifiche ai cittadini quando un consenso viene
  annullato.

- **Input:** Tabelle <u>cons_d_informativa</u>, <u>cons_t_consenso</u>

- **Output:** Aggiornamento <u>cons_t_consenso</u>, notifiche via
  Notificatore Regionale

- **Logica applicativa**

<!-- -->

- Il processo seleziona tutte le informative da
  <u>cons_d_informativa</u> dove <u>data_scadenza</u> è passata.

- Per ogni informativa scaduta, il processo esegue la logica descritta
  nell'algoritmo ALG02 per chiudere i vecchi consensi e creare i nuovi
  record con stato SCADUTO o ANNULLATO

- Passaggio storicizzazione: Il sistema esegue una INSERT nella tabella
  cons_s_consenso copiando tutti i dati del record appena chiuso in
  cons_t_consenso, valorizzando la FK cons_id.

- \[DOC\] Per ogni consenso impostato su ANNULLATO che richiede una
  notifica al cittadino:

> a: Il sistema invoca il servizio del Notificatore Regionale per
> verificare le preferenze di contatto per il cittadino (identificato da
> <u>cf_cittadino</u>) e per il modulo "Gestione Consensi".
>
> b: Se il cittadino ha espresso una preferenza e ha fornito un canale
> di contatto (es. email), il sistema procede con l'invio.
>
> c: Il sistema invia la notifica tramite il canale preferito,
> informando della variazione di stato del consenso.
>
> d: L'intera interazione (chiamata di verifica, esito, invio notifica)
> viene tracciata nelle tabelle di log dei servizi esterni.
>
> \- Se il cittadino non ha espresso preferenze o canali di contatto, la
> notifica non viene inviata e l'operazione si considera conclusa per
> quel consenso.
>
> **Gestione transazionale:**
>
> Il processo BATCH-02 deve operare per lotti (batch_size configurabile,
> default: 1000 record per iterazione), eseguendo un COMMIT al termine
> di ogni STATO ELABORAZIONE.
>
> Prima di processare un'informativa scaduta, il processo deve impostare
> un flag di lavorazione (es. aggiungere un campo stato_elaborazione con
> valori DA_ELABORARE/IN_ELABORAZIONE/ELABORATA nella tabella
> cons_d_informativa) per garantire che in caso di riavvio il processo
> non riprocessi record già gestiti.

**Interazione con BATCH-01:** I record inseriti
in cons_t_notifica con not_stato = 'DA_INVIARE' da questo processo
saranno notificati alle aziende dal BATCH-01 al successivo ciclo di
esecuzione
(ogni <!-- [Forneris Marco] Aggiungere tabella transizioni stato per cons_t_notifica e cons_t_batch. Nota scheduling: Schedulazione BATCH-01 ogni 5 minuti gestita con SELECT FOR UPDATE SKIP LOCKED su cons_t_notifica per prevenire sovrapposizioni. Sostituisce scheduling AS-IS a 30 minuti. --> 
5 minuti). Il BATCH-02 non effettua chiamate dirette agli endpoint
aziendali: si limita a popolare la coda di notifica. I record di
notifica verso il Notificatore Regionale (flag flag_notifica_cittadino =
TRUE) saranno invece inviati direttamente da BATCH-02 (non da BATCH-01).

- **Algoritmi**

> **ALG01 – Selezione consensi da elaborare**
>
> SELECT d_informativa_id, annulla_consensi
>
> FROM cons_d_informativa
>
> WHERE data_scadenza \< NOW()
>
> AND stato_elaborazione = 'DA_ELABORARE';
>
> \[PROPOSTA\] Per ogni informativa scaduta individuata dalla query
> precedente, il sistema ricerca in cons_d_informativa il record attivo
> (data_scadenza IS NULL o \> NOW()) associato allo stesso
> sotto_tipo_consenso
> per <!-- [Forneris Marco] ...per determinare il valore di :nuova_d_informativa_id: --> 
> determinare il :nuova_d_informativa_id:
>
> SELECT d_informativa_id AS nuova_d_informativa_id
>
> FROM cons_d_informativa
>
> WHERE sotto_tipo_consenso = :sotto_tipo_consenso_scaduta
>
> AND (data_scadenza IS NULL OR data_scadenza \> NOW())
>
> AND data_decorrenza \<= NOW()
>
> AND data_cancellazione IS NULL
>
> ORDER BY data_decorrenza DESC
>
> LIMIT 1
>
> **Per ogni informativa scaduta, il processo seleziona tutti i consensi
> collegati (cons_t_consenso) che si trovano nello stato ATTIVO o
> NEGATO.**
>
> SELECT cons_id, tipo_stato
>
> FROM cons_t_consenso
>
> WHERE d_informativa_id = \[ID_INFORMATIVA_SCADUTA\]
>
> AND tipo_stato IN (‘ATTIVO’, ‘NEGATO’);

**ALG02 – Aggiornamento Stato Consenso:**

Per ogni cons_id individuato nel passo precedente, il sistema deve:

1\. ***Chiudere il record corrente*:** Aggiornare il record esistente
nella tabella cons_t_consenso impostando la data di fine validità.

UPDATE cons_t_consenso

SET data_fine = NOW(),

data_modifica = NOW(),

login_operazione = 'BATCH_SCADENZA_INF'

WHERE cons_id = :ID_CONSENSO_DA_CHIUDERE

AND data_fine IS NULL;

2\. ***Inserire il nuovo record storicizzato*:** Creare un nuovo record
nella tabella cons_t_consenso con il nuovo stato (SCADUTO o ANNULLATO in
base alla logica) e tutti i dati del record precedente, aggiornando la
data di creazione e acquisizione.

INSERT INTO cons_t_consenso (

cf_cittadino,

id_aura,

nome,

cognome,

sotto_tipo_consenso, -- NOT NULL — obbligatorio (8.4.10)

cod_asr,

d_informativa_id, -- ID della NUOVA informativa

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

c.sotto_tipo_consenso, -- copiato dal record originale (stessa FK)

c.cod_asr,

i.d_informativa_id, -- nuova informativa dal parametro

c.operatore_id,

c.fonte_id,

c.audit_id,

CASE WHEN i.annulla_consensi = TRUE

THEN 'ANNULLATO'

ELSE 'SCADUTO'

END AS tipo_stato,

c.valore_consenso,

NOW() AS data_acquisizione,

NULL AS data_fine,

'BATCH-02' AS login_operazione,

gen_random_uuid() AS uuid,

c.cf_delegato,

NULL AS endp_id, -- NULL: valorizzato solo per consensi ricevuti da SIA

NOW() AS data_creazione,

NOW() AS data_modifica,

NULL AS data_cancellazione

FROM cons_t_consenso c

JOIN cons_d_informativa i ON i.d_informativa_id =
:nuova_d_informativa_id

WHERE c.cons_id = :cons_id_da_chiudere;

**Note Tecniche**

- sotto_tipo_consenso viene copiato direttamente
  da c.sotto_tipo_consenso del record originale: è lo stesso tipo di
  consenso, cambia solo l'informativa associata.​

- d_informativa_id punta alla nuova informativa
  (:nuova_d_informativa_id), non all'old.

- endp_id <!-- [Sabina CARONI] da approfondire e verificare meglio --> 
  = NULL perché i consensi inseriti/aggiornati da processi batch non
  hanno un endpoint di origine diretto — il campo viene valorizzato solo
  per i consensi ricevuti via SIA (8.3.11).​

- gen_random_uuid() genera un UUID univoco per il nuovo record (funzione
  nativa PostgreSQL 17).

**Specifica Tecnica del Notificatore Regionale (UNP – User Notification
Platform)**

Il Notificatore Regionale del CSI Piemonte è la User Notification
Platform (UNP), un servizio centralizzato che espone API REST per
l'invio di notifiche ai cittadini. La documentazione tecnica aggiornata
delle specifiche di integrazione è disponibile al seguente indirizzo:

<https://gitlab.csi.it/user-notification-platform/unpdocumentazione/-/blob/master/documentazione%20fornitori/NOTIFY-specifiche.md?ref_type=heads>

Il team di sviluppo deve consultare questa documentazione come
riferimento primario per l'implementazione dell'integrazione.

**Canali di notifica disponibili:**

| **Canale** | **Disponibilità** | **Note** |
|----|----|----|
| **email** | Disponibile | Canale principale per le notifiche al cittadino |
| **push** | Disponibile | Notifica push su applicazioni mobile |
| **IO** | Disponibile | Notifica tramite app IO (piattaforma nazionale PagoPA) |
| **mex** | Disponibile | Notifica interna all'**area riservata del portale Salute Piemonte** |
| **SMS** | Disponibile ma non utilizzato | Tecnicamente disponibile, ma non utilizzato per policy; da non implementare nella fase iniziale salvo specifica indicazione |

**Logica di selezione del canale:**

Il Notificatore gestisce internamente le preferenze di contatto del
cittadino. Il sistema Gestione Consensi non deve implementare logiche di
selezione del canale: deve invocare l'API UNP specificando il modulo
applicativo ("Gestione Consensi") e il Codice Fiscale del destinatario;
sarà l'UNP a determinare il canale/i canali preferiti del cittadino e a
procedere con l'invio.

**Implicazioni per BATCH-02:**

Nella logica applicativa del BATCH-02, i passi a, b, c descritti nella
procedura di notifica al cittadino devono essere implementati come
chiamate REST all'API UNP. In particolare:

- La verifica delle preferenze di contatto è gestita internamente
  dall'UNP (non è necessaria una chiamata separata di verifica).

- Il sistema deve inviare al Notificatore almeno: il **Codice Fiscale
  del destinatario**, il **codice del modulo applicativo**, il **tipo di
  evento** (es. consenso annullato, scaduto) e un **testo del
  messaggio** o un **template predefinito**.

- L'intero ciclo di chiamata (request/response) deve essere tracciato
  nella tabella cons_t_traccia_serv_est come da 4.1.

<span id="_Toc224739666" class="anchor"></span>7.3 BATCH-03:
Allineamento consensi per nuovi endpoint

- **Informazioni di base**

  - Nome: AllineamentoNuoviEndpoint

  - Periodicità: Asincrono — viene triggerato
    automaticamente <!-- [Forneris Marco] Proposta soluzione semplice e indolore: CDU-17 PULL — Snapshot consensi per allineamento endpoint. Sistema regionale espone endpoint REST paginato (GET /api/v1/consensi/snapshot) SIA pulla autonomamente, alla cadenza che preferisce, finché next_cursor è null Zero push, zero cons_t_notifica popolata in massa, zero downtime Riusa modello sicurezza CDU-15/16 (OAuth2 CC + JWT + tabella cons_t_client_ente) Si cambia la logica del BATCH-03 potrebbe andare? --> 
    al salvataggio di un nuovo endpoint nel CDU-14

- **Descrizione procedura:** Quando viene aggiunto un nuovo endpoint per
  un consenso già attivo, il nuovo sistema SIA deve ricevere lo stato
  attuale di tutti i consensi già espressi dai cittadini per quella
  tipologia. Questo batch esegue l'allineamento massivo.

- **Input:** cons_r_asr_endpoint (record con stato_allineamento =
  'IN_CORSO'), cons_t_consenso, cons_r_sotto_tipo_cons_asr_endpoint

- **Output:** Popolamento cons_t_notifica,
  aggiornamento stato_allineamento = 'COMPLETATO'

- **Logica applicativa**

> Il processo legge dalla tabella <u>cons_r_asr_endpoint</u> tutti i
> record con <u>stato_allineamento</u> = 'DA_ALLINEARE' e li imposta a
> 'IN_CORSO' prima di procedere con l'elaborazione.
>
> Per ogni endpoint in allineamento, recupera tutti i consensi attivi
> (data_fine IS NULL, tipo_stato IN ('ATTIVO','NEGATO')) per la
> sotto-tipologia di consenso associata a quell'endpoint.
>
> Per ogni consenso trovato, inserisce un record in cons_t_notifica con
> not_stato = 'DA_INVIARE' e flag_notifica_cittadino = FALSE.
>
> Importante: I record inseriti in cons_t_notifica da questo batch
> devono avere un flag o un campo che li distingua dalle notifiche
> ordinarie, in quanto non devono generare notifiche al cittadino (il
> cittadino ha già ricevuto conferma al momento dell'espressione
> originale). Usare flag_notifica_cittadino = FALSE.
>
> Al termine dell'inserimento, imposta stato_allineamento = 'COMPLETATO'
> nella tabella sorgente.
>
> Durante l'allineamento (stato_allineamento = 'IN_CORSO'), il CDU-03 e
> CDU-09 devono bloccare la possibilità di esprimere nuovi consensi per
> quell'endpoint (come già indicato nelle precondizioni dei CDU-03 e
> CDU-09).
>
> **Gestione errori:** In caso di errore nell'inserimento di una
> notifica, il record in errore viene salvato in cons_t_batch_errori. Il
> processo prosegue con i record successivi. stato_allineamento rimane
> IN_CORSO finché non sono stati processati tutti i consensi senza
> errori.
>
> **Algoritmi**
>
> **ALG01 - Selezione nuovi endpoint <u>\[DEDOTTO\]</u>**
>
> Ciclo di vita stato_allineamento:
>
> **DA_ALLINEARE**: stato iniziale al salvataggio del nuovo endpoint
> (CDU-14 step 6)
>
> **IN_CORSO**: impostato da BATCH-03 all'inizio dell'elaborazione
> dell'endpoint
>
> **COMPLETATO**: impostato da BATCH-03 al termine con successo
>
> **ERRORE**: impostato da BATCH-03 se l'elaborazione termina con errori
> non recuperabili
>
> SELECT rae.endp_id, stcrae.sotto_tipo_consenso
>
> FROM cons_r_asr_endpoint rae
>
> JOIN cons_r_sotto_tipo_cons_asr_endpoint stcrae
>
> ON stcrae.asr_endpoint_id = rae.asr_endpoint_id
>
> JOIN cons_t_endpoint e ON e.endp_id = rae.endp_id
>
> WHERE rae.stato_allineamento = 'DA_ALLINEARE'
>
> AND rae.data_cancellazione IS NULL
>
> **ALG02 - Creazione notifiche per allineamento <u>\[DEDOTTO\]</u>**
>
> INSERT INTO cons_t_notifica (not_stato, not_endp_url, cons_id,
> cf_cittadino, ...)
>
> SELECT 'DA_INVIARE', e.endp_url, c.cons_id, c.cf_cittadino, ...
>
> FROM cons_t_consenso c
>
> JOIN cons_r_asr_endpoint rae ON rae.cod_asr = c.cod_asr
>
> JOIN cons_t_endpoint e ON e.endp_id = rae.endp_id
>
> WHERE c.tipo_stato IN ('ATTIVO','NEGATO')
>
> AND c.data_fine IS NULL
>
> AND e.endp_id = :nuovo_endpoint_id
>
> AND c.sotto_tipo_consenso = :sotto_tipo_consenso_del_endpoint
>
> Per ogni consenso clonato, il sistema inserisce un record nella
> tabella cons_t_notifica per il nuovo endpoint, impostando un flag
> specifico flag_notifica_cittadino = false per evitare che l'utente
> riceva una notifica per un'operazione di sistema.

- **Condizioni d’uscita:** Il processo termina dopo aver elaborato tutti
  i nuovi endpoint.

<span id="_Toc224739667" class="anchor"></span>8. Modello dei dati

\[DOC\] Il modello dei dati del nuovo applicativo Gestione Consensi è
stato profondamente rivisto per supportare la nuova architettura e le
funzionalità estese. Il modello logico finale, proposto dal cliente,
garantisce maggiore flessibilità, normalizzazione e scalabilità \[1\].

\[PROPOSTA\] Si raccomanda di implementare indici sulle chiavi esterne
(FK) e sui campi utilizzati frequentemente nelle clausole di ricerca
(es. cf_cittadino in cons_t_consenso) per ottimizzare le performance
delle query.

<span id="_Toc224739668" class="anchor"></span>8.1 Diagramma
Entità-Relazione (AS-IS)

\[DOC\] Di seguito è riportato il diagramma Entità-Relazione del
database attualmente in produzione, come fornito dal cliente.

<img src="media/image9.png" style="width:6.64583in;height:4.60347in" />

<span id="_Toc224739669" class="anchor"></span>8.2 Diagramma
Entità-Relazione (TO-BE)

\[DOC\] Di seguito è riportato il diagramma Entità-Relazione (ER) che
descrive la struttura del database "TO-BE", basato sul diagramma fornito
dal cliente.

<span id="_Toc224739670" class="anchor"></span>8.3 Dizionario dati
(TO-BE)

\[DOC\] Di seguito viene riportata la descrizione dettagliata di
ciascuna entità del nuovo modello dati proposto.

<img src="media/image10.png" style="width:6.73958in;height:6.12468in" />

<span id="_Toc224739671" class="anchor"></span>8.3.1
cons_d_allegato_tipo

Nuova tabella. Allegati tipo consenso

| Colonna              | PK/FK |
|----------------------|-------|
| allegato_tipo_id     | PK    |
| allegato_tipo_cod    |       |
| allegato_tipo_desc   |       |
| validita_inizio      |       |
| validita_fine        |       |
| data_creazione       |       |
| data_modifica        |       |
| utente_creazione     |       |
| data_cancellazione   |       |
| utente_modifica      |       |
| utente_cancellazione |       |
| ruoloop_id           |       |

<span id="_Toc224739672" class="anchor"></span>8.3.2 cons_d_parametro

Nuova tabella. Setting parametri di dominio

| Colonna            | PK/FK |
|--------------------|-------|
| param_id           | PK    |
| param_cod          |       |
| param_desc         |       |
| validita_inizio    |       |
| validita_fine      |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |

<span id="_Toc224739673" class="anchor"></span>8.3.3 cons_d_tipo_cons

\[DOC\] Tabella AS-IS mantenuta. Codifica delle tipologie di consenso.

| Colonna            | PK/FK |
|--------------------|-------|
| tipo_consenso      | PK    |
| desc_tipo_cons     |       |
| data_decorrenza    |       |
| data_scadenza      |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |

<span id="_Toc224739674" class="anchor"></span>8.3.4
cons_d_sotto_tipo_cons

\[DOC\] Tabella AS-IS mantenuta. Codifica delle sotto-tipologie di
consenso.

| Colonna              | PK/FK |
|----------------------|-------|
| sotto_tipo_consenso  | PK    |
| desc_sotto_tipo_cons |       |
| data_decorrenza      |       |
| data_scadenza        |       |
| data_creazione       |       |
| data_modifica        |       |
| data_cancellazione   |       |
| login_operazione     |       |
| ruoloop_id           |       |
| tipo_consenso        | FK    |

<span id="_Toc224739675" class="anchor"></span>8.3.5 cons_d_informativa

\[DOC\] Tabella delle informative, estesa con nuovi campi rispetto
all'AS-IS.

**Decisione progettuale:** I campi online e annulla_consensi rimangono
nella tabella cons_d_informativa per semplicità implementativa e per
retrocompatibilità con il codice AS-IS che li legge direttamente. I
record in cons_r_consenso_parametro per questi due parametri non saranno
creati nel TO-BE V1.0. Il requisito par. 2.2.2.1 del documento è quindi
soddisfatto tramite la tabella cons_d_informativa. Questa scelta dovrà
essere rivista in una futura versione se si vorrà rendere i parametri
completamente dinamici per configurazione.

| Colonna             | PK/FK |
|---------------------|-------|
| d_informativa_id    | PK    |
| tipo_consenso       |       |
| sotto_tipo_consenso | FK    |
| pdf_informativa     |       |
| data_decorrenza     |       |
| data_scadenza       |       |
| data_creazione      |       |
| data_modifica       |       |
| data_cancellazione  |       |
| login_operazione    |       |
| ruoloop_id          |       |
| desc_informativa    |       |
| html_informativa    |       |
| online              |       |
| annulla_consensi    |       |

<span id="_Toc224739676" class="anchor"></span>8.3.6
cons_r_informativa_asr

\[DOC\] Tabella di relazione tra informative e ASR.

| Colonna              | PK/FK |
|----------------------|-------|
| informativa_asr_id   | PK    |
| d_informativa_id     | FK    |
| cod_asr              | FK    |
| valida_inizio        |       |
| valida_fine          |       |
| data_creazione       |       |
| data_modifica        |       |
| data_cancellazione   |       |
| login_operazione     |       |
| utente_creazione     |       |
| utente_modifica      |       |
| utente_cancellazione |       |
| ruoloop_id           |       |

<span id="_Toc224739677" class="anchor"></span>8.3.7 cons_r_asr_endpoint

Nuova tabella. Relazione tra ASR e endpoint.

| Colonna            | PK/FK |
|--------------------|-------|
| asr_endpoint_id    | PK    |
| cod_asr            | FK    |
| endp_id            | FK    |
| valida_inizio      |       |
| valida_fine        |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |

<span id="_Toc224739678" class="anchor"></span>8.3.8 cons_d_asr

\[DOC\] Anagrafica degli Enti/Aziende Sanitarie.

| Colonna            | PK/FK |
|--------------------|-------|
| cod_asr            | PK    |
| desc_asr           |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |

<span id="_Toc224739679" class="anchor"></span>8.3.9 cons_t_allegato

Nuova tabella. Gestione transazionale allegati.

| Colonna              | PK/FK |
|----------------------|-------|
| allegato_id          | PK    |
| file_name            |       |
| file_type            |       |
| file_path            |       |
| allegato_tipo_id     | FK    |
| d_informativa_id     | FK    |
| data_creazione       |       |
| data_modifica        |       |
| data_cancellazione   |       |
| utente_creazione     |       |
| utente_modifica      |       |
| utente_cancellazione |       |
| ruoloop_id           |       |

<span id="_Toc224739680" class="anchor"></span>8.3.10 cons_t_endpoint

\[DOC\] Endpoint dei sistemi informativi aziendali per la notifica.

| Colonna            | PK/FK |
|--------------------|-------|
| endp_id            | PK    |
| endp_url           |       |
| id_app             |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |
| valida_inizio      |       |
| valida_fine        |       |

<span id="_Hlk224551454" class="anchor"></span>8.3.11 cons_t_consenso

<u>\[DOC\]</u> Tabella transazionale principale. Contiene i consensi
espressi dai cittadini.

| Colonna            | PK/FK |
|--------------------|-------|
| cons_id            | PK    |
| operatore_id       | FK    |
| fonte_id           | FK    |
| tipo_stato         | FK    |
| audit_id           | FK    |
| d_informativa_id   | FK    |
| cod_asr            | FK    |
| valore_consenso    | FK    |
| cf_cittadino       |       |
| id_aura            |       |
| nome               |       |
| cognome            |       |
| cf_delegato        |       |
| data_acquisizione  |       |
| data_fine          |       |
| uuid               |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |
| endp_id            | FK    |

**NOTA**: il campo sotto_tipo_consenso (FK → cons_d_sotto_tipo_cons, NOT
NULL) è obbligatorio per il corretto funzionamento degli algoritmi
CDU-03, CDU-04, BATCH-02 e BATCH-03. Vedere 8.4.10 per la definizione
completa.

<span id="_Hlk224552024" class="anchor"></span>8.3.12 cons_s_consenso

<u>\[DOC\]</u> Tabella di storico dei consensi. Struttura analoga a
<u>cons_t_consenso</u> con campi aggiuntivi.

**Nota tecnica**: Regola di popolamento: Un record viene inserito in
cons_s_consenso ogni volta che un record in cons_t_consenso viene chiuso
(cioè ogni volta che viene eseguito un UPDATE cons_t_consenso SET
data_fine = NOW()). L'inserimento in cons_s_consenso deve essere
implementato come parte dello stesso metodo/transazione che esegue la
chiusura del record attivo, sia nei CDU (CDU-03 ALG02, CDU-04 ALG02,
CDU-05 ALG01) sia nei batch (BATCH-02 ALG02). I campi di cons_s_consenso
coincidono con quelli del record chiuso in cons_t_consenso, con
l'aggiunta della FK cons_id che mantiene il collegamento al record
originale.

| Colonna            | PK/FK |
|--------------------|-------|
| conss_id           | PK    |
| cons_id            | FK    |
| operatore_id       |       |
| fonte_id           |       |
| tipo_stato         |       |
| audit_id           |       |
| d_informativa_id   |       |
| cod_asr            |       |
| valore_consenso    |       |
| cf_cittadino       |       |
| id_aura            |       |
| nome               |       |
| cognome            |       |
| cf_delegato        |       |
| data_acquisizione  |       |
| data_fine          |       |
| uuid               |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |

**NOTA**: il campo sotto_tipo_consenso (FK → cons_d_sotto_tipo_cons, NOT
NULL) è obbligatorio per il corretto funzionamento degli algoritmi
CDU-03, CDU-04, BATCH-02 e BATCH-03. Vedere 8.4.10 per la definizione
completa.

<span id="_Toc224739683" class="anchor"></span>8.3.13 cons_t_notifica

<u>\[DOC\]</u> Coda delle notifiche da inviare ai sistemi esterni.

| Colonna            | PK/FK |
|--------------------|-------|
| not_id             | PK    |
| not_stato          |       |
| not_avvio          |       |
| not_fine           |       |
| not_endp_url       |       |
| cons_id            | FK    |
| request_id         |       |
| err_tipo_id        | FK    |
| id_aura            |       |
| cf_cittadino       |       |
| cf_delegato        |       |
| fonte_id           | FK    |
| operatore_id       | FK    |
| tipo_stato         | FK    |
| d_informativa_id   | FK    |
| cod_asr            | FK    |
| valore_consenso    | FK    |
| data_acquisizione  |       |
| data_fine          |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |
| endp_id            | FK    |

<span id="_Toc224739684" class="anchor"></span>8.3.14
cons_t_notifica_errore_dett

<u>\[DOC\]</u> Dettaglio degli errori relativi alle notifiche.

| Colonna            | PK/FK |
|--------------------|-------|
| errdett_id         | PK    |
| errdett_cod        |       |
| errdett_desc       |       |
| not_id             | FK    |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |

<span id="_Toc224739685" class="anchor"></span>8.3.15 cons_d_errore_tipo

<u>\[DOC\]</u> Codifica dei tipi di errore.

| Colonna            | PK/FK |
|--------------------|-------|
| err_tipo_id        | PK    |
| err_tipo_cod       |       |
| err_tipo_desc      |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |

<span id="_Toc224739686" class="anchor"></span>8.3.16 cons_d_valore_cons

<u>\[DOC\]</u> Decodifica dei possibili valori del consenso.

| Colonna            | PK/FK |
|--------------------|-------|
| valore_consenso    | PK    |
| desc_consenso      |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |

<span id="_Toc224739687" class="anchor"></span>8.3.17 cons_d_stato

<u>\[DOC\]</u> Decodifica degli stati del consenso.

| Colonna            | PK/FK |
|--------------------|-------|
| tipo_stato         | PK    |
| desc_stato         |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |

<span id="_Toc224739688" class="anchor"></span>8.3.18 cons_d_fonte

<u>\[DOC\]</u> Codifica delle fonti di acquisizione del consenso.

| Colonna            | PK/FK |
|--------------------|-------|
| fonte_id           | PK    |
| fonte_cod          |       |
| fonte_desc         |       |
| tipo_fonte_id      | FK    |
| data_decorrenza    |       |
| data_scadenza      |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |

<span id="_Toc224739689" class="anchor"></span>8.3.19 cons_d_tipo_fonte

<u>\[DOC\]</u> Codifica dei tipi di fonte di acquisizione.

| Colonna            | PK/FK |
|--------------------|-------|
| tipo_fonte_id      | PK    |
| tipofonte_cod      |       |
| tipofonte_desc     |       |
| data_decorrenza    |       |
| data_scadenza      |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |

<span id="_Toc224739690" class="anchor"></span>8.3.20 cons_d_operatore

<u>\[DOC\]</u> Codifica degli operatori.

| Colonna            | PK/FK |
|--------------------|-------|
| operatore_id       | PK    |
| tipo_operatore     |       |
| cod_operatore      |       |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |

<span id="_Toc224739691" class="anchor"></span>8.3.21 cons_t_operatorebo

<u>\[DOC\]</u> Tabella degli operatori di back office.

| Colonna            | PK/FK |
|--------------------|-------|
| operatorebo_id     | PK    |
| cf_operatore       |       |
| operatore_id       | FK    |
| data_creazione     |       |
| data_modifica      |       |
| data_cancellazione |       |
| login_operazione   |       |
| ruoloop_id         |       |

<span id="_Toc224739692" class="anchor"></span>8.3.22 csi_log_audit

<u>\[DOC\]</u> Tabella di audit per la tracciatura delle operazioni.

| Colonna          | PK/FK |
|------------------|-------|
| audit_id         | PK    |
| data_ora         |       |
| id_app           |       |
| ip_address       |       |
| utente           |       |
| proprietario     |       |
| ruolo            |       |
| operazione       |       |
| ogg_oper         |       |
| key_oper         |       |
| idrequest        |       |
| uuid             |       |
| request_payload  |       |
| response_payload |       |
| esito_chiamata   |       |

<span id="_Toc224739693" class="anchor"></span>8.3.23
cons_r_sotto_tipo_cons_asr_endpoint

Nuova tabella. Relazione tra sotto tipologie di consenso ASR e endpoint

| Colonna                    | PK/FK |
|----------------------------|-------|
| sotto_tipo_consenso_asr_id | PK    |
| sotto_tipo_consenso        | FK    |
| asr_endpoint_id            | FK    |
| valida_inizio              |       |
| valida_fine                |       |
| data_creazione             |       |
| data_modifica              |       |
| data_cancellazione         |       |
| utente_creazione           |       |
| utente_modifica            |       |
| utente_cancellazione       |       |
| ruoloop_id                 |       |

<span id="_Toc224739694" class="anchor"></span>8.3.24
cons_r_consenso_valore

Nuova tabella. Relazione tra sotto tipologie di consenso e valore per
gestione notifiche

| Colonna             | PK/FK |
|---------------------|-------|
| consenso_valore_id  | PK    |
| sotto_tipo_consenso | FK    |
| valore_consenso     | FK    |
| validita_inizio     |       |
| validita_fine       |       |
| data_creazione      |       |
| data_modifica       |       |
| data_cancellazione  |       |
| login_operazione    |       |
| ruoloop_id          |       |

<span id="_Toc224739695" class="anchor"></span>8.3.25
cons_r_consenso_parametro

Nuova tabella. Relazione tra i parametri configurabili del consenso e la
sotto tipologia consenso.

| Colonna             | PK/FK |
|---------------------|-------|
| r_cons_param_id     | PK    |
| sotto_tipo_consenso | FK    |
| param_id            | FK    |
| param_val           |       |
| validita_inizio     |       |
| validita_fine       |       |
| data_creazione      |       |
| data_modifica       |       |
| data_cancellazione  |       |
| login_operazione    |       |
| ruoloop_id          |       |

<span id="_Toc224739696" class="anchor"></span>8.4 Proposte evolutive
dal Diagramma

Di seguito le proposte per ottimizzare il DB e coprire le funzionalità
dei requisiti V03.

Nota per gli sviluppatori: Le proposte di questa sezione sono necessarie
per la completa implementazione dei processi descritti nel documento. In
particolare:

8.4.1 (cons_t_traccia_serv_est): obbligatoria per CDU-09, CDU-10, CDU-11
e §4.1

8.4.2 (estensione cons_t_notifica): obbligatoria per BATCH-01, BATCH-02,
BATCH-03

8.4.3 (stato_allineamento): obbligatorio per CDU-03, CDU-09 e BATCH-03

8.4.10 Estensione cons_t_consenso e cons_s_consenso: obbligatoria per
CDU-03 ALG02, CDU-04 ALG02, CDU-05 ALG01, BATCH-02 ALG02, BATCH-03 ALG02

<span id="_Toc224739697" class="anchor"></span>8.4.1 \[PROPOSTA\] Nuova
Tabella: <u>cons_t_traccia_serv_est</u>

**Scopo**: Tracciare tutte le chiamate in uscita verso servizi esterni
(AURA, Deleghe, Notificatore, INI), come richiesto dal par. 2.9 dei
requisiti.

| Colonna | PK/FK | Descrizione |
|----|----|----|
| traccia_id | PK | Identificativo univoco della traccia. |
| servizio_chiamato |  | Nome del servizio esterno chiamato (es. AURA, DELEGHE). |
| operazione_chiamata |  | Nome dell'operazione/metodo specifico. |
| data_chiamata |  | Timestamp di inizio della chiamata. |
| audit_id | FK | Riferimento alla tabella di audit <u>csi_log_audit</u>. |
| cf_cittadino |  | Codice Fiscale dell'assistito per cui si effettua la chiamata. |
| cf_delegato |  | Eventuale CF del delegato. |
| request |  | Payload della richiesta inviata. |
| response |  | Payload della risposta ricevuta. |
| esito |  | Esito della chiamata (OK, KO). |
| errore_cod |  | Eventuale codice di errore. |
| errore_desc |  | Eventuale descrizione dell'errore. |

**Nota per gli sviluppatori**: Questa tabella è un requisito funzionale
obbligatorio, non opzionale. La sua creazione è necessaria per la
corretta implementazione dei CDU-09, CDU-10 e CDU-11 (ALG01) e del
capitolo 4.1.

<span id="_Toc224739698" class="anchor"></span>8.4.2 \[PROPOSTA\]
Estensione Tabella: <u>cons_t_notifica</u>

**Scopo**: Gestire anche le notifiche verso i cittadini tramite
Notificatore (par. 2.7), oltre a quelle verso gli endpoint aziendali.

| Colonna | PK/FK | Descrizione |
|----|----|----|
| ... |  | (campi esistenti) |
| **notificatore_uuid** |  | UUID ricevuto dal Notificatore a conferma dell'avvenuto invio. Valorizzato solo se flag_notifica_cittadino = TRUE. |
| **notificatore_data_invio** |  | Timestamp di invio al Notificatore. |
| **flag_notifica_cittadino** |  | Flag BOOLEAN. Se TRUE, il record è una notifica verso il cittadino tramite Notificatore Regionale; se FALSE è una notifica verso endpoint aziendale. Necessario per BATCH-01 e BATCH-03. |
| **num_tentativi** |  | Contatore dei tentativi di invio effettuati. Default: 0. Quando raggiunge il valore configurabile MAX_TENTATIVI (default: 3), il record viene portato in stato ERRORE_PERMANENTE e non viene più processato automaticamente dal BATCH-01. |

<span id="_Toc224739699" class="anchor"></span>8.4.3 \[PROPOSTA\]
Estensione Tabella: <u>cons_r_asr_endpoint</u>

**Scopo**: Gestire lo stato di allineamento quando viene aggiunto un
nuovo endpoint (par. 2.11 v3).

| Colonna | PK/FK | Descrizione |
|----|----|----|
| ... |  | (campi esistenti) |
| **stato_allineamento** |  | **\[NUOVO\]** Stato del processo di allineamento per il nuovo endpoint. Valori possibili:<u>DA_ALLINEARE, ERRORE, COMPLETATO</u>, <u>IN_CORSO</u>. Default: <u>DA_ALLINEARE</u>. |

<span id="_Toc224739700" class="anchor"></span>8.4.4 \[PROPOSTA\]
Estensione Tabella: <u>cons_s_consenso</u>

**Scopo**: Aggiungere coerenza con la tabella <u>cons_t_consenso</u> per
lo storico.

| Colonna | PK/FK | Descrizione |
|----|----|----|
| ... |  | (campi esistenti) |
| **endp_id** | **FK** | **\[NUOVO\]** Riferimento all'endpoint di provenienza del consenso. |

<span id="_Toc224739701" class="anchor"></span>8.4.5 \[PROPOSTA\]
Spostamento campi "online" e "annulla_consensi"

**Scopo:** Il documento requisiti V03 (par. 2.2.2.1) descrive
<u>online</u> e <u>annulla_consensi</u> come parametri del consenso, da
salvare in <u>cons_r_consenso_parametro</u>. Come indicato nella
decisione progettuale del par. 8.3.5, nella V1.0 questi campi rimangono
nella tabella <u>cons_d_informativa</u> per semplicità implementativa e
retrocompatibilità. In una futura versione (V2.0), si valuterà lo
spostamento completo verso <u>cons_r_consenso_parametro</u> per rendere
i parametri completamente dinamici.

| Colonna              | PK/FK | Descrizione       |
|----------------------|-------|-------------------|
| ...                  |       | (campi esistenti) |
| **online**           |       |                   |
| **Annulla consensi** |       |                   |

<span id="_Toc225783529" class="anchor"></span>8.4.6 \[PROPOSTA\]
Estensione Tabella: <u>cons_d_asr</u>

**Scopo:** Valori ammessi: NAZIONALE, REGIONALE, AZIENDALE.
Indispensabile per la logica del CDU-12 (popolamento dinamico lista
enti).

| **Colonna** | **PK/FK** | **Descrizione** |
|----|----|----|
| tipo_ente |  | Tipologia dell'ente. Valori ammessi: NAZIONALE, REGIONALE, AZIENDALE. Indispensabile per la logica del CDU-12 (popolamento dinamico lista enti). |

<span id="_Toc225783530" class="anchor"></span>8.4.7 \[PROPOSTA\] Nuova
Tabella: <u>cons_d_asr_destinazione</u>

Scopo: Codifica delle tipologie di destinazione degli endpoint (es.
NOTIFICA_CONSENSO, RECUPERO_STATO, CONFIGURAZIONE). Necessaria per
classificare gli endpoint configurati nel CDU-14.

| **Colonna** | **PK/FK** | **Descrizione** |
|----|----|----|
| destinazione_id | PK | Identificativo univoco della destinazione |
| destinazione_cod |  | Codice identificativo (es. NOTIF, QUERY, CONFIG) |
| destinazione_desc |  | Descrizione leggibile (es. "Notifica consensi", "Recupero stato") |
| data_creazione |  | Timestamp creazione |
| data_modifica |  | Timestamp ultima modifica |
| data_cancellazione |  | Timestamp cancellazione logica |
| login_operazione |  | CF operatore |
| ruoloop_id |  | ID ruolo |

<span id="_Toc225783531" class="anchor"></span>8.4.8 \[PROPOSTA\]
Estensione Tabella: <u>cons_d_informativa</u>

Scopo: gestione transazionale Batch-02

| **Colonna** | **PK/FK** | **Descrizione** |
|----|----|----|
| **Stato_elaborazione** |  | **Valori ammessi: DA_ELABORARE/IN_ELABORAZIONE/ELABORATA** |

<span id="_Toc225783532" class="anchor"></span>8.4.9 \[PROPOSTA\] Nuova
Tabella: cons_t_batch_errori

Scopo: Tabella di log degli errori dei processi batch. Registra ogni
eccezione non fatale incontrata durante l'esecuzione di BATCH-01,
BATCH-02 e BATCH-03, permettendo il monitoraggio e il ri-processamento
manuale dei record falliti senza bloccare l'intera elaborazione.

| **Colonna** | **PK/FK** | **Descrizione** |
|----|----|----|
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

idx_batch_errori_stato su (stato_gestione, batch_nome) — per estrarre
rapidamente gli errori in attesa di gestione per processo

idx_batch_errori_run su (batch_run_id) — per raggruppare gli errori di
una singola esecuzione

<span id="_Toc225783533" class="anchor"></span>8.4.10 \[PROPOSTA\]
Estensione Tabella: cons_s_consenso e cons_t_consenso

**Nota implementativa:** Al momento dell'INSERT in cons_t_consenso, il
valore di sotto_tipo_consenso deve corrispondere
al sotto_tipo_consenso dell'informativa associata
(cons_d_informativa.sotto_tipo_consenso per lo stesso d_informativa_id).
Questa coerenza deve essere garantita a livello applicativo.

| **Colonna** | **PK/FK** | **Descrizione** |
|----|----|----|
| sotto_tipo_consenso | FK → cons_d_sotto_tipo_cons | Riferimento diretto al tipo consenso. NOT NULL. Permette di filtrare i consensi per tipologia senza JOIN su cons_d_informativa. |

<span id="_Toc225783534" class="anchor"></span>9. Requisiti Non
Funzionali

<span id="_Toc225783535" class="anchor"></span>9.1 Sicurezza

- Tutte le comunicazioni tra client e server devono avvenire
  esclusivamente tramite HTTPS/TLS 1.2+.

- I dati personali (CF, nome, cognome) non devono mai comparire nei log
  applicativi in chiaro; devono essere mascherati o pseudonimizzati.

- Il sistema deve implementare protezione CSRF per tutte le operazioni
  di modifica (POST/PUT).

- Conformità OWASP Top 10 verificata in fase di collaudo.

<span id="_Toc225783536" class="anchor"></span>9.2 Scalabilità

- L'applicazione deve essere progettata per la scalabilità orizzontale
  su Kubernetes (almeno 2 repliche attive in produzione). I servizi
  backend devono essere stateless.

<span id="_Toc225783537" class="anchor"></span>9.3 Migrazione Dati

Prima del go-live è necessario eseguire una migrazione dei dati
dall'ambiente AS-IS (PostgreSQL 9) verso il TO-BE (PostgreSQL 17). Al
momento della stesura di questo documento, una strategia formale di
migrazione non è ancora stata definita né approvata dal committente. La
redazione del piano di migrazione è pertanto un'attività da pianificare
e formalizzare nel documento dedicato CONSPREF-DMP (Data Migration
Plan).

**Vincoli tecnici noti sulla migrazione PG9 → PG17:**

Il passaggio da PostgreSQL 9 a PostgreSQL 17 è un salto di versione
maggiore significativo (8 major release). Non è possibile effettuare un
aggiornamento sul posto (in-place upgrade) diretto: è necessario
adottare una delle seguenti strategie, da valutare e definire nel
CONSPREF-DMP:

- **Strategia dump/restore:** Export completo del database AS-IS
  tramite pg_dump (formato custom o plain SQL), restore sull'istanza
  PG17 TO-BE. Richiede una finestra di manutenzione e un piano di
  rollback.

- **Strategia upgrade a step intermedi:** Aggiornamento progressivo
  attraverso versioni intermedie (es. PG9 → PG12 → PG14 → PG17)
  tramite pg_upgrade. Più complessa ma riduce il rischio di
  incompatibilità massive.

Il responsabile della redazione del CONSPREF-DMP deve essere definito
formalmente dal committente CSI Piemonte prima dell'avvio della fase di
sviluppo del Data Layer.

Attività da includere nel CONSPREF-DMP:

- Analisi della struttura AS-IS (schema DDL, dati, stored procedure,
  trigger, sequence, indici).

- Esecuzione dell'audit di compatibilità (vedi 9.4 Audit Compatibilità
  PG9→PG17 di seguito).

- Strategia di migrazione scelta e motivata.

- Script di migrazione dati (DDL + DML).

- Piano di verifica post-migrazione (conteggio record, integrità
  referenziale, test funzionali).

- Piano di rollback.

- Finestra temporale stimata per la migrazione.

<span id="_Toc225783538" class="anchor"></span>9.4 Audit di
Compatibilità PG9 → PG17

È obbligatorio pianificare ed eseguire un'attività di audit della
struttura AS-IS prima dell'avvio dello sviluppo del Data Layer TO-BE, al
fine di identificare tutte le incompatibilità e le deprecazioni
introdotte nelle versioni PostgreSQL successive alla 9.x.

**Aree di analisi obbligatorie:**

1.  **Gestione delle Sequence:**

    - In PostgreSQL 10+ le sequenze hanno cambiato il comportamento
      di lastval() e la gestione delle sequence temporanee.

    - Verificare tutti gli oggetti SERIAL e SEQUENCE presenti nello
      schema AS-IS e valutare la migrazione verso GENERATED AS
      IDENTITY (standard SQL, introdotto in PG10).

2.  **Funzioni deprecate o modificate:**

    - La funzione to_timestamp() ha subito variazioni di comportamento
      nelle versioni intermedie.

    - Le funzioni date_part() e le funzioni di casting implicito tra
      tipi di dato sono state rese più stringenti in PG12+.

    - Verificare tutti gli utilizzi di queste funzioni nel DDL (trigger,
      view, stored procedure) e nel codice applicativo.

3.  **Comportamento di NULL negli indici:**

    - PostgreSQL 15 ha modificato il comportamento di NULLS FIRST /
      NULLS LAST negli indici e nelle query con ORDER BY.

    - Verificare che tutti gli indici e le query critiche (in
      particolare quelle che usano ORDER BY su colonne nullable)
      producano i risultati attesi dopo la migrazione.

4.  **Sintassi SQL deprecata:**

    - FROM ONLY e l'ereditarietà delle tabelle: verificare se la
      struttura AS-IS ne fa uso.

    - Operatori di confronto != e \<\>: allineamento con lo standard
      SQL.

    - Funzioni di aggregazione con ORDER BY nella form non standard.

5.  **Estensioni PostgreSQL:**

    - Verificare che tutte le estensioni utilizzate nel database AS-IS
      (es. uuid-ossp, pgcrypto, ecc.) siano disponibili e compatibili
      con PG17.

6.  **Livello di isolamento delle transazioni:**

    - PG17 mantiene il default READ COMMITTED, ma verificare che
      eventuali impostazioni
      di default_transaction_isolation nel postgresql.conf AS-IS siano
      coerenti con il TO-BE.

**Output atteso dell'audit:**\
Un report strutturato (da allegare o referenziare nel CONSPREF-DMP) che
elenchi:

- Ogni incompatibilità rilevata con la versione PG interessata che l'ha
  introdotta.

- La correzione necessaria a livello DDL, DML o codice applicativo.

- La stima dell'impatto (bassa/media/alta complessità di risoluzione).

Questa attività deve essere completata prima dell'avvio dello
sviluppo del modello dati TO-BE descritto nel Capitolo 8.

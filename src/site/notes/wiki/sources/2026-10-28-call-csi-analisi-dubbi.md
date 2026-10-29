---
{"dg-publish":true,"permalink":"/wiki/sources/2026-10-28-call-csi-analisi-dubbi/","title":"Call CSI 28/10/2026 — analisi dubbi su architettura e servizi","tags":["csi","call","architettura","api-manager","jwt","profili","scaduto","form-dinamico","fe-08","inf-05"],"dg-note-properties":{"title":"Call CSI 28/10/2026 — analisi dubbi su architettura e servizi","aliases":["Call CSI 28/10/2026 — analisi dubbi su architettura e servizi"],"type":"source","tags":["csi","call","architettura","api-manager","jwt","profili","scaduto","form-dinamico","fe-08","inf-05"],"created":"2026-10-28","updated":"2026-10-28","sources":["2026-10-28-call-csi-analisi-dubbi"],"related":["[[csi-piemonte|CSI Piemonte]]","[[2026-10-27-revisione-be-slide-domande|Revisione dev BE di slide e domande CSI (27/10/2026)]]","[[2026-10-21-riscontro-dev-deployment-to-be|Riscontro dev sul deployment TO-BE]]","[[architettura-iaas|Architettura IaaS]]","[[composizione-dinamica-form-consenso|Composizione dinamica del form di consenso]]","[[ciclo-vita-consenso|Ciclo di vita del consenso]]","[[analysis-2026-05-14-punti-aperti-csi|Punti Aperti CSI]]"]}}
---


# Call CSI 28/10/2026 — analisi dubbi su architettura e servizi

**Fonte:** `presentazione/CSI Piemonte - Consensi_ Analisi dubbi_call_28_10_2026.md`, trascrizione automatica della call (65 minuti). Sintesi di lavoro: `presentazione/Sintesi_call_CSI_28_10_2026.md`. La trascrizione contiene errori di riconoscimento: «USDL» = WSDL, «AP manager» = API Manager, «GVT/JVT» = JWT, «giallo» = livello APISAN, «G boss» = JBoss.

**Presenti.** [[wiki/entities/csi-piemonte\|CSI]]: Tommaso Ruggiero, Gaia Bourlot, Manuela Bontempi, Sabina Caroni. Team di sviluppo ([[wiki/entities/exprivia\|Exprivia]]): Donato Palmieri, Boris Minardo Incitti, Henri Molla, Roberto Bruno, Marco Forneris («Relatore 1» nella trascrizione).

> ⚠️ **In attesa di approvazione CSI:** il disegno TO-BE semplificato (senza API Manager) è una proposta di Exprivia emersa dalla call, non ancora approvata da CSI. I punti che lo riguardano sono segnati «architettura» nelle tabelle sotto; wiki e SRS non sono ancora stati allineati su di essi.

## Servizi

| Servizio | Cosa è stato detto | Impatto |
|---|---|---|
| Verso le aziende (SOAP `ConsprefService`, SRV-03/04) | Blindati: stessa firma, stessi dati, nemmeno un tag in più; compatibili con Spring Boot 3.4. Mutual authentication con certificati. Impatto zero | Coerente con il [[wiki/sources/2026-09-25-riscontro-csi-domande-sviluppo\|riscontro CSI del 25/09]] (`ConsprefService` SOAP mantenuto) |
| Verso il cittadino (`ConsensoBeService` via APISAN) | XML ampliabile mantenendo la firma ([[wiki/docs/adr/ADR-025-contratto-cittadino-soap-consensobeservice\|ADR-025]]). Il passaggio a REST richiede di contrattare con il gruppo APISAN (swagger e tempo), fuori dal perimetro di Tommaso e Gaia | Resta SOAP |
| Interni di backoffice | Il team è libero: REST, firma stabilita da noi | — |
| API Manager (APIMBBONE) | Da togliere dal disegno: oggi nessun fruitore esterno, l'unico B2B è con le aziende via certificati. Niente OAuth2 né token APIM. Le API si progettano esponibili in futuro (swagger ridotto) ma non ora | **Architettura**: tocca [[wiki/docs/adr/ADR-004-no-api-gateway\|ADR-004]], [[wiki/docs/adr/ADR-005-sicurezza-cdu-15-16\|ADR-005]], [[wiki/concepts/sicurezza-cdu-15-16\|sicurezza-cdu-15-16]] |
| CDU-15, 16, 17 | Servizi interni; l'API Manager serve solo se un'azienda cambiasse un consenso dall'esterno, cosa che non può avvenire (cambiano solo PUA o cittadino, che non è esterno). CDU-17 per CSI è un caso d'uso dell'operatore di backoffice aziendale (PUA e schermate), servizi lasciati aperti per un uso futuro | **Architettura**. Passaggio sul CDU-17 poco chiaro nella trascrizione (54:18-54:25) |
| Autenticazione | JWT tra Angular/BFF e servizi REST di backoffice, come i REST attuali. APISAN → backend in basic authentication: i server di backend non sono visibili dall'esterno. Il diagramma di sicurezza deve indicare dove serve il JWT, anche lato cittadino | **Architettura** |

## Infrastruttura

- Si toglie JBoss su CentOS e si passa a Spring Boot su Oracle Linux. Le regole di rete verso AURA e gli altri sistemi restano le stesse; le verifica CSI (Tommaso e Maurizio), il sistemista migra la macchina. Se un `telnet` non risponde, si segnala a CSI.
- Si resta in Nivola, nessun passaggio a logiche cloud. INF-05 si semplifica; su ingresso TLS e gestione dei segreti la trascrizione non dà risposta.
- PUA/Shibboleth: credenziali nell'header, CSI si fida. LCCE: solo un nuovo endpoint, parametri identici.
- Tutti i punti di questa sezione sono **architettura** (disegno [[wiki/concepts/architettura-iaas\|IaaS]] e INF-05).

## Profili

Due ruoli di backoffice: **operatore di sportello** (punto assistito, fa ciò che farebbe il cittadino) e **profilo di configurazione** (assistenza CSI: consensi, informative, allegati, endpoint). Quindi non «profilo unico» ([[wiki/docs/adr/ADR-010-cdu-01-split\|ADR-010]], ID-02). Manuela può crearlo in test nel configuratore; il nome lo definisce CSI.

## Form dinamico (FE-08)

Confermato da Manuela come requisito CSI ([[wiki/concepts/composizione-dinamica-form-consenso\|composizione-dinamica-form-consenso]]): una tabella `parametri` per consenso (descrizione, descrizione estesa, testo aggiuntivo, domanda, valori ammessi, tipo consenso, enti) compone la maschera. Dinamico anche il numero di campi, e cambia tra consenso aziendale e regionale. Si configura con CDU-12. Servono JSON chiave-valore e REST (in XML non si può). Boris chiede 1-2 pagine di documento tecnico con regole, campi e tabella. È il punto a maggior rischio e sarà il fulcro della prossima riunione.

## SCADUTO e ANNULLATO

- AS-IS: verso le aziende esistono solo SÌ e NO.
- I consensi permanenti (ritiro referti online, «CP roll») non hanno data di fine e al massimo diventano NO: mai SCADUTO né ANNULLATO.
- I nuovi consensi avranno scadenza dell'informativa (ciclo di vita completo, [[wiki/concepts/ciclo-vita-consenso\|ciclo-vita-consenso]], [[wiki/docs/adr/ADR-016-scaduto-async-batch-02\|ADR-016]]).
- La propagazione verso terzi non è nel perimetro: gli endpoint attuali riguardano solo il consenso permanente. Nelle aziende si stanno inserendo «concertatori del consenso» con una loro logica di propagazione, ancora poco chiara a CSI.

## Prossimi passi concordati

- Marco ridisegna l'architettura più semplice, la mostra a Tommaso, rivede presentazione e domande, poi invia; diagramma di sicurezza con il JWT.
- CSI propone riunioni settimanali da 20 minuti; risposte per iscritto o in un'altra call.
- Tommaso e Gaia contrattano con APISAN le modifiche ai servizi del cittadino.

## Dubbi aperti sulla trascrizione

- **CDU-17:** servizi per i SIA via API o solo operatore di backoffice? Resta o si elimina?
- **CPROL:** nella call sembra il consenso permanente del ritiro referti; il glossario del deck lo definisce «informativa generale». Da verificare.
- **Endpoint:** Gaia dice che gli operatori ASL «raccolgono gli endpoint»; chi li gestisce?
- **INF-05:** ingresso TLS e gestione dei segreti non trattati.

## Stato dell'allineamento

| Area | Stato |
|---|---|
| Diagramma TO-BE | Aggiornato in `CONSPREF-deployment-TO-BE.html` (senza API Manager); in attesa di approvazione CSI |
| Form dinamico | Wiki e deck già allineati il 28/10 ([[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|analysis-2026-05-14-punti-aperti-csi]], FE-08); **ADR e documento scritti il 29/10/2026**: [[wiki/docs/adr/ADR-026-form-dinamico-catalogo-campi\|ADR-026]] (proposta, catalogo di campi tipizzati) e `presentazione/Specifica-tecnica_form-dinamico_2026-10-29.docx` per Boris; da condividere e far confermare a CSI sul modello dati; SRS non ancora allineata |
| Profili | **Recepiti il 28/10/2026**: SRS rev. 1.24 (§2.3 e riferimenti), ADR-010, ADR-021, [[wiki/concepts/gestione-consensi-applicativo\|gestione-consensi-applicativo]], [[wiki/concepts/sistemi-esterni-integrati\|sistemi-esterni-integrati]], tracker (ID-02). Deck glossario (slide 4, 9, 43, 60, 61) e `domande-csi.js` (docx rigenerato) allineati; SRS rev. 1.24 include anche gli attori di CDU-07÷CDU-11 (profilo operatore di sportello) |
| SCADUTO/consensi permanenti | **Recepiti il 28/10/2026** come nota: SRS rev. 1.25 (§5.1), [[wiki/docs/adr/ADR-016-scaduto-async-batch-02\|ADR-016]], [[wiki/concepts/ciclo-vita-consenso\|ciclo-vita-consenso]], tracker (BAT-03 → «risposta a voce»). Nessuna modifica agli algoritmi. CPROL = informativa generale del consenso permanente, non scade (dubbio sul glossario risolto) |
| API Manager, CDU-15/16/17, autenticazione, INF-05 | Da recepire dopo l'approvazione CSI |

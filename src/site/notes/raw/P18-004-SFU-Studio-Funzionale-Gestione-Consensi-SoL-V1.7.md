---
{"dg-publish":true,"permalink":"/raw/p18-004-sfu-studio-funzionale-gestione-consensi-so-l-v1-7/","dg-note-properties":{}}
---

FSE – SOL REGIONE
PIEMONTE
G C
ESTIONE ONSENSI
S E
ANITÀ LETTRONICA
Studio funzionale
Febbraio 2019

---

NUOVI SERVIZI ON LINE SALUTE –
SERVIZIO “GESTIONE CONSENSI” Pag. 1 di 14
STUDIO FUNZIONALE
Versione
VERIFICHE E APPROVAZIONI
VERSIONE REDAZIONE CONTROLLO AUTORIZZAZIONE
APPROVAZIONE EMISSIONE
NOME DATA NOME DATA NOME DATA
1.0 O. Medeot, 16/01/2019
L. Cosmi
STATO DELLE VARIAZIONI
VERSIONE PARAGRAFO O DESCRIZIONE DELLA VARIAZIONE
PAGINA
1.0 Tutto il documento Versione iniziale
p18-004-sfu- studio funzionale - gestione consensi sol - v1.7_pb.docx USO: INTERNO CSI

| VERSIONE | REDAZIONE |  | CONTROLLO APPROVAZIONE |  | AUTORIZZAZIONE EMISSIONE |  |
| --- | --- | --- | --- | --- | --- | --- |
|  | NOME | DATA | NOME | DATA | NOME | DATA |
| 1.0 | O. Medeot, L. Cosmi | 16/01/2019 |  |  |  |  |

| VERSIONE | PARAGRAFO O PAGINA | DESCRIZIONE DELLA VARIAZIONE |
| --- | --- | --- |
| 1.0 | Tutto il documento | Versione iniziale |

---

NUOVI SERVIZI ON LINE SALUTE –
SERVIZIO “GESTIONE CONSENSI” Pag. 2 di 14
STUDIO FUNZIONALE
SOMMARIO
1. SCOPO E RIFERIMENTI DEL DOCUMENTO ...........................................................3
1.1. SCOPO DEL DOCUMENTO ................................................................................................3
1.2. RIFERIMENTI ..................................................................................................................3
1.3. GLOSSARIO ....................................................................................................................4
2. SITUAZIONE ATTUALE E NORMATIVA ...................................................................5
3. QUADRO GENERALE DELLE TIPOLOGIE DI RICHIESTE GESTITE ................6
4. MODALITÀ DI ACCESSO AL SERVIZIO E PARAMETRIZZAZIONE .................8
4.1. HOME DEL SERVIZIO ......................................................................................................8
5. CASO D’USO 1 – RILASCIO DI UN CONSENSO SUL SERVIZIO ON LINE DA
PARTE DI UN CITTADINO .....................................................................................................9
6. CASO D’USO 2 - REVOCA DI UN CONSENSO RILASCIATO SUL SERVIZIO
ON LINE DA PARTE DI UN CITTADINO ............................................................................9
7. CASO D’USO 3 – CONSULTAZIONE DEI CONSENSI RILASCIATI SUL
SERVIZIO ON LINE DA PARTE DI UN CITTADINO .....................................................10
8. CASO D’USO 4 – RILASCIO DI UN CONSENSO SUL SERVIZIO ON LINE DA
PARTE DI UN OPERATORE SERVIZIO ASSISTITO/FARMACIA
CONVENZIONATA PER CONTO DI UN CITTADINO....................................................11
9. CASO D’USO 5 – REVOCA DI UN CONSENSO SUL SERVIZIO ON LINE DA
PARTE DI UN OPERATORE SERVIZIO ASSISTITO/FARMACIA
CONVENZIONATA PER CONTO DI UN CITTADINO....................................................12
10. CASO D’USO 6 – CONSULTAZIONE DEI CONSENSI RILASCIATI SUL
SERVIZIO ON LINE DA PARTE DI UN OPERATORE SERVIZIO
ASSISTITO/FARMACIA CONVENZIONATA ...................................................................12
11. INTEROPERABILITÀ ................................................................................................13
12. ELENCO DELLE NOTIFICHE .................................................................................13
p18-004-sfu- studio funzionale - gestione consensi sol - v1.7_pb.docx USO: INTERNO CSI

---

NUOVI SERVIZI ON LINE SALUTE –
SERVIZIO “GESTIONE CONSENSI” Pag. 3 di 14
STUDIO FUNZIONALE
1. Scopo e riferimenti del documento
1.1. Scopo del documento
Definire i dettagli dei requisiti di business del sistema. Il presente documento parte dalla bozza
di piano di progetto condiviso con la Regione Piemonte (rif. [A2]) e specifica meglio quanto
esposto.
Basi di partenza sono i documenti di specifica dei requisiti [A6], [A7] e [A8] e i documenti
collegati che costituiscono i requisiti dell’analisi dove il presente documento non si sostituisca.
1.2. Riferimenti
Codice Descrizione Posizione
[A1] DPCM 178 del settembre 2015 – emesso in http://www.gazzettaufficiale.it/eli/id/2015
data 11 novembre 2015 /11/11/15G00192/sg
[A2] Richiesta della Regione Piemonte Assessorato
Sanità prot. n. 14570/A1412A del 4.7.2017,
avente ad oggetto: “D.G.R. 19-4900 del
20/4/2017: Fascicolo Sanitario Elettronico e
Servizi on-Line (FSE-SoL). Trasmissione
versione iniziale del piano di progetto
preliminare e richiesta di PTE”
[A3] Nota Garante 0020885 del 12/06/2017
[A4] Provvedimento del 13 marzo 2014 – doc. web
n. 3041470
[A5] Provvedimento del 9 novembre 2005 – doc.
web n. 1191411
[A6] REG-004-V13-VdI-Acceleratori Servizi on
line Salute - Indice.doc
[A7] REG-004-V08-REQ-Gestione deleghe -
Servizi on line Salute - VERSIONE
CONDIVISA REGIONE.doc
[A8] FSE-RDB-01-V04- cons perm - referti non
scaricati - rec preg
p18-004-sfu- studio funzionale - gestione consensi sol - v1.7_pb.docx USO: INTERNO CSI

| Codice | Descrizione | Posizione |
| --- | --- | --- |
| [A1] | DPCM 178 del settembre 2015 – emesso in data 11 novembre 2015 | http://www.gazzettaufficiale.it/eli/id/2015 /11/11/15G00192/sg |
| [A2] | Richiesta della Regione Piemonte Assessorato Sanità prot. n. 14570/A1412A del 4.7.2017, avente ad oggetto: “D.G.R. 19-4900 del 20/4/2017: Fascicolo Sanitario Elettronico e Servizi on-Line (FSE-SoL). Trasmissione versione iniziale del piano di progetto preliminare e richiesta di PTE” |  |
| [A3] | Nota Garante 0020885 del 12/06/2017 |  |
| [A4] | Provvedimento del 13 marzo 2014 – doc. web n. 3041470 |  |
| [A5] | Provvedimento del 9 novembre 2005 – doc. web n. 1191411 |  |
| [A6] | REG-004-V13-VdI-Acceleratori Servizi on line Salute - Indice.doc |  |
| [A7] | REG-004-V08-REQ-Gestione deleghe - Servizi on line Salute - VERSIONE CONDIVISA REGIONE.doc |  |
| [A8] | FSE-RDB-01-V04- cons perm - referti non scaricati - rec preg |  |

---

NUOVI SERVIZI ON LINE SALUTE –
SERVIZIO “GESTIONE CONSENSI” Pag. 4 di 14
STUDIO FUNZIONALE
1.3. Glossario
Termine Significato
MEF Ministero delle Economia e delle Finanze
MMG Medico di medicina generale
AGID Agenzia per l’Italia Digitale - http://www.agid.gov.it
ASR Azienda sanitaria regionale
FSE il Fascicolo Sanitario Elettronico, di cui all’articolo 12 del decreto
legge 18 ottobre 2012, n. 179, convertito, con modificazioni, dalla
Legge 17 dicembre 2012, n. 221, come modificato dall’articolo 1,
comma 382 della Legge 11 dicembre 2016, n. 232 (Bilancio di
previsione dello Stato per l'anno finanziario 2017 e bilancio
pluriennale per il triennio 2017-2019)
STS o Sistema TS Sistema informativo realizzato dal Ministero dell’Economia e delle
Finanze in attuazione di quanto disposto dall'articolo 50 del
decreto-legge 30 settembre 2003, n. 269, convertito, con
modificazioni, dalla legge 24 novembre 2003, n. 326
GDPR Regolamento Generale sulla Protezione dei Dati
MEF Ministero delle Economia e delle Finanze
MMG Medico di medicina generale
p18-004-sfu- studio funzionale - gestione consensi sol - v1.7_pb.docx USO: INTERNO CSI

| Termine | Significato |
| --- | --- |
| MEF | Ministero delle Economia e delle Finanze |
| MMG | Medico di medicina generale |
| AGID | Agenzia per l’Italia Digitale - http://www.agid.gov.it |
| ASR | Azienda sanitaria regionale |
| FSE | il Fascicolo Sanitario Elettronico, di cui all’articolo 12 del decreto legge 18 ottobre 2012, n. 179, convertito, con modificazioni, dalla Legge 17 dicembre 2012, n. 221, come modificato dall’articolo 1, comma 382 della Legge 11 dicembre 2016, n. 232 (Bilancio di previsione dello Stato per l'anno finanziario 2017 e bilancio pluriennale per il triennio 2017-2019) |
| STS o Sistema TS | Sistema informativo realizzato dal Ministero dell’Economia e delle Finanze in attuazione di quanto disposto dall'articolo 50 del decreto-legge 30 settembre 2003, n. 269, convertito, con modificazioni, dalla legge 24 novembre 2003, n. 326 |
| GDPR | Regolamento Generale sulla Protezione dei Dati |
| MEF | Ministero delle Economia e delle Finanze |
| MMG | Medico di medicina generale |

---

NUOVI SERVIZI ON LINE SALUTE –
SERVIZIO “GESTIONE CONSENSI” Pag. 5 di 14
STUDIO FUNZIONALE
2. Situazione attuale e normativa
Dal 2014 in Regione Piemonte è disponibile ed utilizzata la piattaforma di FSE, ovvero l’insieme
degli strumenti informatico-informativi che rendono possibile fornire servizi e informazioni ai
cittadini e agli operatori sanitari. Tra i punti di azione per l’attuazione del Fascicolo sanitario
elettronico tramite i fondi nazionali POR-FESR la Regione Piemonte intende promuovere un
piano strategico di diffusione del Fascicolo sanitario elettronico e dei Servizi on line, in linea con
i principi e le strategie promossi da AgID nell’ambito della “Strategia per la Crescita Digitale
2014-2020”. In questo ambito, si rende necessario un approfondimento sul tema della gestione
delle "consensi regionali” incluso tra i nuovi servizi on line sanità.
L’informazione e il consenso sono strumenti per la partecipazione consapevole dell’individuo
alle decisioni che lo riguardano. L’espressione “consenso informato” si riferisce alla
manifestazione di volontà con cui un soggetto accetta o rifiuta di essere sottoposto ad un
trattamento o, comunque, ad un atto medico a lui prospettato nel contesto di una relazione di
cura, nonché di essere informato sulla sua condizione clinica (diagnosi e prognosi) e sugli
interventi diagnostico terapeutici praticabili (natura, benefici, ma anche rischi e complicanze
prevedibili e possibili alternative) forniti dai curanti. Il consenso informato si inserisce, pertanto,
nel percorso di malattia di un paziente in diversi possibili scenari, che non sono prevedibili a
priori e sono destinati ad aumentare.
Esistono diverse tipologie di consenso, e diversi soggetti / Enti a cui lo stesso può essere
rilasciato da un cittadino. In particolare si possono distinguere:
1. il consenso espresso a livello nazionale,
2. il consenso espresso a livello regionale;
3. il consenso espresso a livello aziendale (ASR).
Le tematiche relative al consenso a livello nazionale (ad esempio consenso all’alimentazione
del FSE, consenso al recupero del pregresso e consenso alla consultazione) non sono oggetto
del presente studio.
I consensi di interesse regionale possono essere ad esempio i seguenti:
• consenso alla stratificazione dei dati sanitari ai fini della medicina di iniziativa;
• consenso alla presa in carico per in programmi di gestione cronicità/ disease
management;
• consenso alla presa in carico in programmi/servizi di telemedicina;
• consenso alla presa in carico ad una Rete di patologia, ad esempio quella oncologica;
• consenso informato progressivo nelle cure palliative;
• partecipazione a uno studio sperimentale.
I consensi di interesse aziendale sono numerosi e diversificati (ad esempio: adesione a
sperimentazioni cliniche, utilizzo dati sanitari per sperimentazioni di tipo clinico locali, adesione
a PDTA/percorsi aziendali, …). Un consenso di particolare rilevanza è quello relativo al ritiro
on line dei referti, definito come “consenso permanente ROL” (cfr. [8]).
p18-004-sfu- studio funzionale - gestione consensi sol - v1.7_pb.docx USO: INTERNO CSI

---

NUOVI SERVIZI ON LINE SALUTE –
SERVIZIO “GESTIONE CONSENSI” Pag. 6 di 14
STUDIO FUNZIONALE
Il consenso ROL viene raccolto quando (in alternativa) il cittadino:
• si presenta ad uno degli sportelli predisposti dalle Aziende Sanitarie regionali, oppure;
• si presenta ad uno degli sportelli dei punti Servizio Assistito;
• rilascia il consenso ad un servizio/sistema dipartimentale della ASR che produce il
referto, ad es. radiologia/RIS, laboratorio analisi/LIS, servizio di anatomia patologica/CC
anatomia patologica;
• utilizza direttamente il servizio on line “Gestione Consensi”.
Il perimetro progettuale prevede di realizzare due componenti distinte:
• una componente “Gestione dei consensi” regionale, parte del Sistema Informativo
Regionale, su cui opereranno, secondo opportune profilazioni, vari profili di operatori (ASR,
Regione, MMG, il Cittadino, operatore farmacia ecc..) per visualizzare, registrare e
modificare il/i consenso/i prestato/i;
• “n” moduli aziendali di gestione del consenso aziendale, parte dei Sistemi Informativi delle
ASR; si tratta in questo caso più propriamente di componenti di interoperabilità tra il SIA e
il modulo “Gestione dei consensi” centralizzato, che servono per la raccolta del consenso a
livello locale e accesso all’informazione sul consenso prestato a livello locale (di singolo
dipartimentale: LIS, RIS, ecc). Tra questi citiamo per rilevanza il “consenso permanente
ROL”
Le ASR dovranno integrare i dipartimentali aziendali con il modulo di “gestione dei consensi”
centralizzato realizzando n moduli aziendali di interoperabilità con il livello regionale secondo
opportuni standard di interoperabilità, che saranno definiti dal gruppo di lavoro tecnico CSI
Piemonte, e che consentiranno di operare secondo un processo multi-livello secondo cui, di
norma, il consenso è raccolto e gestito presso un’Azienda Sanitaria/ dipartimentale ed
eventualmente gestito/comunicato a livello di Regione; è comunque previsto come vedremo
anche una gestione del consenso direttamente sul livello centrale, soprattutto per azione diretta
del cittadino, che si propaga verso il livello locale/ASR.
Le componenti di gestione del consenso devono:
• tracciare tutte le operazioni a livello di back-end e le chiamate ai servizi effettuate all’interno
dei casi d’uso descritti nel seguito;
• tracciare i dati del delegato che ha effettuato le operazioni sul servizio on line per conto del
delegante (verificare la possibilità di attivare l’audit nel back end).
3. Quadro generale delle tipologie di richieste gestite
Di seguito si elencano le tipologie di rilascio del consenso da parte del cittadino che saranno
gestite dal sistema, su cui saranno modellati i casi d’uso:
• on line sul servizio di “Gestione del Consenso”. In questo caso d’uso il cittadino accede al
servizio on line da un proprio device (smartphone, tablet, pc) e visualizza e inserisce in
autonomia le dichiarazioni di consenso per le tipologie (NB: solo per le tipologie che non
richiedono un riconoscimento de visu, come per esempio il consenso alla stratificazione
(regionale) o il “consenso permanente ROL” - aziendale). Il consenso di tipo regionale viene
p18-004-sfu- studio funzionale - gestione consensi sol - v1.7_pb.docx USO: INTERNO CSI

---

NUOVI SERVIZI ON LINE SALUTE –
SERVIZIO “GESTIONE CONSENSI” Pag. 7 di 14
STUDIO FUNZIONALE
rilasciato con valore per l’intera Regione Piemonte mentre per il consenso aziendale la
dichiarazione avrà valore solo per una ASL specifica (NB: il cittadino sarà chiamato a
dichiararlo, con la scelta “rilascio per singola ASL” o “rilascio per tutte le ASL”);
• de visu presso un Punto Servizio assistito/Farmacia convenzionata. Il cittadino si reca
presso un Punto Servizio Assistito/Farmacia convenzionata per rilasciare il proprio consenso
nei casi in cui è previsto un riconoscimento de visu o l’apposizione di una firma autografa su
un documento. Potrà inoltre richiedere all’operatore di inserire a suo nome i consensi
regionali o aziendali desiderati; l’operatore effettuerà le operazioni in nome e per conto del
cittadino e riceverà e archivierà le copie cartacee sottoscritte e firmate dal cittadino;
• de visu presso uno sportello ASL. Il cittadino si reca presso uno sportello ASL per rilasciare
il proprio consenso regionale o aziendale desiderato, unicamente per il servizio/tipologia di
consenso gestito; l’operatore di sportello registra il consenso direttamente sul dipartimentale;
l’informazione viene di qui propagata a livello centrale attraverso i servizi di interoperabilità
predisposti (es. ROL).
Come per gli altri servizi on line sanità i cittadini che vorranno fruire del servizio on line di
Gestione dei Consensi dovranno avere prima aperto il proprio Fascicolo Sanitario Elettronico
(richiamo al modulo di Arruolamento al Fascicolo).
Il sistema fornisce inoltre una serie di servizi trasversali:
1) riepilogo dei dati dell’assistito e dei consensi rilasciati;
2) opzione di download e stampa del consenso rilasciato;
3) gestione delle notifiche, tramite la componente di sistema Notificatore Regionale, in
particolare nei seguenti casi:
• modifica di un consenso in essere;
• rilascio o revoca di un nuovo consenso;
• rilascio o revoca di un consenso da parte di un delegato per conto di un delegante;
4) propagazione delle notifiche da/per il livello locale tramite i servizi di interoperabilità con
i dipartimentali delle ASL;
p18-004-sfu- studio funzionale - gestione consensi sol - v1.7_pb.docx USO: INTERNO CSI

---

NUOVI SERVIZI ON LINE SALUTE –
SERVIZIO “GESTIONE CONSENSI” Pag. 8 di 14
STUDIO FUNZIONALE
4. Modalità di accesso al servizio e parametrizzazione
Il sistema richiede l’accesso autenticato del cittadino con più possibilità:
• sul portale on line “La mia salute” con credenziali SPID (o Sistema Piemonte se ancora
attivo) e accesso alla voce “Gestione Consensi”;
• dalla sezione “Salute” del portale “Sistema Piemonte”, selezionando la voce “Gestione
Consensi” e autenticandosi con credenziali SPID (o Sistema Piemonte se ancora attivo);
• l’accesso diretto al servizio attraverso un motore di ricerca. In questo caso viene richiamata
direttamente la maschera di presentazione del servizio “Gestione Consensi” e il link di
accesso (SPID o Sistema Piemonte).
Inserite le credenziali ed autenticato secondo le regole definite da SPID (o Sistema Piemonte), il
cittadino autorizza l’invio di alcuni dati al fornitore dei servizi. Il sistema richiama il modulo di
“Preferenze” del Notificatore e quindi il servizio di arruolamento al FSE nei casi previsti (vedi
REG-004-VX.X-SFU- Studio Funzionale Arruolamento - Servizi on line Salute). Il servizio
richiama poi il servizio di delega (vedi REG-004-VX.X-SFU- Studio Funzionale Gestione
deleghe - Servizi on line Salute).
Se sono state inserite delle deleghe per il cittadino che si è collegato, il sistema visualizza una
maschera dove l’utente potrà scegliere se operare per sé stesso o per uno dei suoi deleganti.
Gli accessi e le operazioni eseguite da un delegato a nome di un delegante, vengono notificate
dal servizio “Notificatore” in tempo reale al delegante.
L’operatore ASL/Punto Unico Assistito/Farmacia accede al servizio di front-office di “Gestione
consensi” attraverso le credenziali RUPAR IRIDE.
4.1. Home del servizio
La home del servizio Gestione Consensi presenta due sezioni:
• “I miei consensi”, riporta l’elenco dei consensi attivi associati in quel momento all’assistito
e consente l’inserimento di un nuovo consenso;
Il frontend identifica sempre il nominativo dell’utente che ha fatto l’accesso sulla
piattaforma; un banner bene evidenziato compare se l’utente sta operando a nome di un
delegante.
Di seguito vengono descritti i diversi casi d’uso per il cittadino e per l’operatore amministrativo
di front-office del Servizio assistito.
p18-004-sfu- studio funzionale - gestione consensi sol - v1.7_pb.docx USO: INTERNO CSI

---

NUOVI SERVIZI ON LINE SALUTE –
SERVIZIO “GESTIONE CONSENSI” Pag. 9 di 14
STUDIO FUNZIONALE
5. Caso d’uso 1 – Rilascio di un consenso sul servizio on line da parte di un
cittadino
Il caso d’uso prevede che un cittadino adulto si colleghi al servizio on line di “Gestione del
Consenso” con le credenziali SPID per inserire un nuovo consenso.
La maschera Home del servizio “Gestione Consensi” presenta di default la sezione “I miei
consensi” con l’elenco degli eventuali consensi già rilasciati per quell’assistito. In caso di delega,
saranno riportati i dati ed i consensi del delegante adulto o del minore/tutelato per il quale si sta
operando.
Il cittadino seleziona la funzionalità di rilascio di un nuovo consenso “Nuovo consenso”, che
avvia un workflow di inserimento.
Nel primo step il work flow propone l’elenco delle tipologie di consenso che possono essere
gestite on line in base ai parametri del sistema.
Il cittadino seleziona il consenso per il quale intende presentare il rilascio.
Il Sistema verifica che non sia presente un consenso dello stesso tipo in stato “attivo”. Alla
selezione della tipologia di consenso da parte del cittadino (es. consenso alla stratificazione), il
sistema apre in formato PDF il relativo documento “Informativa” (scaricabile e stampabile),
consentendo al cittadino di prenderne visione e, successivamente, visualizza il flag di presa
visione. Il cittadino seleziona il flag di presa visione e conferma la scelta.
Nel caso di consensi di tipo aziendale, il cittadino seleziona la ASL per la quale intende rilasciare
il consenso. Un flag “seleziona/deseleziona tutte” permette di selezionare/deselezionare tutte le
ASL elencate. Se selezionate tutte, il cittadino potrà comunque deselezionare le singole ASL da
escludere.
Alla conferma, il servizio salva i dati nel database e invia una notifica al cittadino di avvenuto
rilascio del consenso. In caso di delega, la notifica viene inviata anche al delegante. Nella mail
inviata vengono riportati i dettagli del consenso ed il link al servizio per la consultazione del
consenso inserito.
La componente “Gestione dei consensi” regionale attraverso un servizio del “WebAPIsLayer-
GestioneConsensi” invierà una notifica di inserimento di un nuovo consenso ai moduli aziendali
collegati (direttamente o tramite eventuale componenti centralizzate di gestione del consenso
ASR, a seconda dei modelli adottati) e da qui utilizzata per le opportune autorizzazioni a
procedere con la prestazione a livello di dipartimentale.
Lo stesso processo avviene se il consenso viene espresso dal cittadino presso la ASL con
riferimento alla componente regionale di “Gestione del consenso”, affinché l’informazione sia
correttamente allineata in modalità sincrona.
6. Caso d’uso 2 - Revoca di un consenso rilasciato sul servizio on line da parte
di un cittadino
Il caso d’uso descrive i passaggi necessari per un cittadino che decida di revocare il consenso
rilasciato in precedenza, per sé stesso, per un delegante o per un minore, sul servizio applicativo
on line.
Il cittadino accede al servizio “Gestione dei consensi” regionale dopo avere effettuato l’accesso
p18-004-sfu- studio funzionale - gestione consensi sol - v1.7_pb.docx USO: INTERNO CSI

---

NUOVI SERVIZI ON LINE SALUTE –
SERVIZIO “GESTIONE CONSENSI” Pag. 10 di 14
STUDIO FUNZIONALE
secondo le modalità sopra descritte (cfr. 4). Nella sezione “I miei consensi” sono presenti la card
dei consensi rilasciati in precedenza e vengono visualizzati i seguenti dettagli:
• il nome del trattamento/consenso
• la data di decorrenza
• lo stato (“Attivo”)
Il tasto “PDF” permette di scaricare e stampare il pdf del consenso rilasciato (il file scaricato
deve essere conforme alla versione sottoscritta).
La funzione “Revoca” attiva un work flow di revoca del consenso.
Il cittadino che intenda revocare il consenso, seleziona la funzione “Revoca”. Il tasto “Indietro”
riporta alla maschera precedente. Il tasto conferma porta alla maschera successiva che comunica
l’esito positivo della revoca. Il tasto funzione “Esci” torna alla home del servizio.
Alla conferma, il servizio salva la data di revoca nel database e invia una notifica al cittadino di
avvenuta espressione del consenso. In caso di delega, la notifica viene inviata al delegante.
La componente “Gestione dei consensi” regionale attraverso un servizio del “WebAPIsLayer-
GestioneConsensi” invierà una notifica di modifica di un nuovo consenso ai moduli aziendali
collegati (direttamente o tramite eventuale componenti centralizzate di gestione del consenso
ASR, a seconda dei modelli adottati) e da qui utilizzata per le opportune autorizzazioni a
procedere con la prestazione a livello di dipartimentale.
Lo stesso processo avviene se il consenso viene modificato dal cittadino presso la ASL con
riferimento alla componente regionale di “Gestione del consenso”, affinché l’informazione sia
correttamente allineata.
7. Caso d’uso 3 – Consultazione dei consensi rilasciati sul servizio on line da
parte di un cittadino
La consultazione dei consensi attivi inseriti, dal cittadino sono visibili nella sezione iniziale. Il
cittadino visualizza l’elenco dei consensi rilasciati, può consultarne i dettagli, revocare il
consenso.
Attraverso l’apposita funzione presente nella card della pratica, è possibile visualizzare e
scaricare il .pdf del consenso rilasciato.
La funzione “Revoca” permette di revocare il consenso rilasciato in precedenza.
p18-004-sfu- studio funzionale - gestione consensi sol - v1.7_pb.docx USO: INTERNO CSI

---

NUOVI SERVIZI ON LINE SALUTE –
SERVIZIO “GESTIONE CONSENSI” Pag. 11 di 14
STUDIO FUNZIONALE
8. Caso d’uso 4 – Rilascio di un consenso sul servizio on line da parte di un
operatore Servizio Assistito/Farmacia convenzionata per conto di un
cittadino
Il caso d’uso prevede che un cittadino adulto si rechi presso un Servizio Assistito Salute
all’interno delle Aziende Sanitarie/ Farmacia convenzionata per farsi identificare de visu e
rilasciare un consenso a un determinato trattamento.
L’amministrativo del Servizio Assistito accede al sistema con credenziali RUPAR IRIDE, viene
riconosciuto come utente di front office ed accede alla home del servizio “Gestione Consensi”.
In primo piano compare la maschera di ricerca del cittadino per C.F. oppure cognome, nome e
data di nascita.
Alla selezione di un assistito, il sistema accede alla sezione “Consensi del cittadino” che presenta
l’elenco degli eventuali consensi rilasciati in precedenza dall’assistito.
Nel primo step il work flow propone l’elenco di tutte le tipologie di consenso che possono essere
rilasciate (online o de visu ). L’operatore seleziona dall’elenco il tipo di trattamento per il quale
deve essere rilasciato il consenso (es. consenso permanente ROL), apre in formato PDF il relativo
documento di Informativa, lo stampa, lo sottopone al cittadino che ne prende visione e lo firma;
successivamente, richiede al cittadino il consenso a proseguire e, quindi, a selezionare per suo
conto il flag di presa visione.
Il tasto “Indietro” riporta alla maschera precedente. Si procede con la funzione “Conferma”: il
sistema verifica che non sia presente un consenso dello stesso tipo in stato “attivo” e completa il
workflow con la maschera di riepilogo che comunica l’esito positivo del rilascio.
Il tasto funzione “Esci” torna alla home del servizio.
Alla conferma, il servizio salva i dati nel database e, se presenti le “preferenze” del cittadino nel
sistema1, invia una notifica al cittadino di avvenuto rilascio del consenso. In caso di delega, la
notifica viene inviata al delegante. Nella mail inviata vengono riportati i dettagli del consenso.
L’operatore di sportello conserva la copia controfirmata del documento di consenso informato.
Come nei casi di inserimento/modifica di consenso precedenti la componente “Gestione dei
consensi” regionale attraverso un servizio del “WebAPIsLayer-GestioneConsensi” invierà una
notifica di inserimento ai moduli aziendali collegati (direttamente o tramite eventuale
componenti centralizzate di gestione del consenso ASR, a seconda dei modelli adottati) e da qui
utilizzata per le opportune autorizzazioni a procedere con la prestazione a livello di
dipartimentale.
1 Un cittadino che abbia effettuato un accesso ad uno dei servizi on line disponibili, deve indicare le preferenze di notifica (e-mail. sms, push)
che saranno poi valide per ogni servizio.
p18-004-sfu- studio funzionale - gestione consensi sol - v1.7_pb.docx USO: INTERNO CSI

---

NUOVI SERVIZI ON LINE SALUTE –
SERVIZIO “GESTIONE CONSENSI” Pag. 12 di 14
STUDIO FUNZIONALE
9. Caso d’uso 5 – Revoca di un consenso sul servizio on line da parte di un
operatore Servizio Assistito/Farmacia convenzionata per conto di un
cittadino
Il caso d’uso prevede che un cittadino adulto si rechi presso un Servizio Assistito Salute
all’interno delle Aziende Sanitarie/operatore di Farmacia per revocare un consenso inserito in
precedenza.
L’amministrativo del Servizio Assistito accede al sistema con credenziali RUPAR IRIDE, viene
riconosciuto come utente di front office ed accede alla home del servizio “Gestione Consensi”.
In primo piano compare la maschera di ricerca del cittadino per C.F. oppure cognome, nome e
data di nascita.
Alla selezione di un assistito, il sistema accede alla sezione “Consensi del cittadino” che presenta
l’elenco degli eventuali consensi rilasciati in precedenza dall’assistito.
Il tasto “PDF” permette di scaricare e stampare il pdf del consenso rilasciato (cfr. cap. 11).
Il tasto funzione “Revoca” presente nella card attiva un work flow di revoca del consenso. Il
tasto “Indietro” riporta alla maschera precedente. Il tasto conferma porta alla maschera
successiva che comunica l’esito positivo della revoca. Il tasto funzione “Esci” torna alla home
del servizio.
Alla conferma, il servizio salva la data di revoca nel database e invia una notifica al cittadino di
avvenuto revoca del consenso. In caso di delega, la notifica viene inviata anche al delegante.
Il consenso revocato viene visualizzato come revocato.
10. Caso d’uso 6 – Consultazione dei consensi rilasciati sul servizio on line da
parte di un operatore Servizio Assistito/Farmacia convenzionata
L’elenco dei consensi rilasciati e revocati dal cittadino sono rispettivamente consultabili nelle
sezioni “Consensi del cittadino”.
L’operatore del Servizio Assistito accede alla sezione “Consensi del cittadino” secondo le
modalità sopra descritte (cfr. cap. 8) e consulta per conto del cittadino i consensi rilasciati in
stato “attivo”.
Attraverso l’apposita funzione presente nella card della pratica, è possibile visualizzare e
scaricare il .pdf del consenso rilasciato.
p18-004-sfu- studio funzionale - gestione consensi sol - v1.7_pb.docx USO: INTERNO CSI

---

NUOVI SERVIZI ON LINE SALUTE –
SERVIZIO “GESTIONE CONSENSI” Pag. 13 di 14
STUDIO FUNZIONALE
11. Interoperabilità
Il sistema espone servizi secondo specifiche che fornite alle ASR per l’integrazione dei SIA che
richiedono la gestione del consenso. Il servizio sarà inoltre integrato nell’ambito dei SoL-
Sistema Salute, richiamabile dagli altri servizi verticali.
I dati relativi al consenso raccolti mediante la piattaforma regionale saranno propagati a tutte le
Aziende che avranno integrato i propri sistemi dipartimentali. Allo stesso modo la piattaforma
regionale riceverà le informazioni riferite all’espressione del consenso e raccolte dai sistemi
aziendali.
Le operazioni di trasmissione e ricezione ( in modalità sincrona/asincrona) saranno evidenti al
cittadino in quanto la registrazione del dato relativo al consenso avverrà solo nel momento in cui
si avrà il ritorno positivo dai sistemi remoti. Fino ad allora il cittadino rileverà la pratica in stato
pending che così resterà fino alla conclusione con buon esito del ciclo trasmissivo.
12. Elenco delle notifiche
Devono essere gestite le seguenti notifiche (secondo le preferenze e le modalità indicate sul
servizio “Notificatore”, divise per tipologia (moltiplicazione per ogni servizio on line):
NOTIFICHE AL CITTADINO:
- Inserimento di un nuovo consenso;
- Proposta di inserimento di un nuovo consenso a suo nome (vedi notifica attiva);
- Revoca del consenso;
- Revoca del consenso d’ufficio (decadenza a causa di nuova normativa).
NOTIFICHE AL DELEGANTE:
- Inserimento di un nuovo consenso;
- Revoca del consenso.
p18-004-sfu- studio funzionale - gestione consensi sol - v1.7_pb.docx USO: INTERNO CSI
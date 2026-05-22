---
{"dg-publish":true,"permalink":"/raw/specifica-web-service-consenso-regionale-aziendale-v03-1-4/","dg-note-properties":{}}
---

MODULO REGIONALE GESTIONE CONSENSI
SPECIFICA DEI SERVIZI ACQUISIZIONE-
REVOCA E NOTIFICA CONSENSO
Modulo Regionale Gestione dei Consensi
Specifica dei servizi Acquisizione-Revoca
E Notifica Consenso
Versione 03
STATO DELLE VARIAZIONI
VERSIONE PARAGRAFO O DESCRIZIONE DELLA VARIAZIONE
PAGINA
V01 Tutto il documento Versione iniziale del documento
V02a Par. 3.3, 4.3, 5.3, 6.3 Aggiunta tag <idAura>
Par. 3.3, 4.3, 5.3, 6.3 Aggiunta tag <codiceServizio>
Cap. 9 Aggiunta tracciato allineamento massivo
Cap. 11 Aggiunta Sequence Diagram
Par. 2.3, Cap 10 Revisione criteri di sicurezza
Cap. 8 Aggiunta Servizio VerificaServizio
V02b Par 4.6 Aggiornata tabella codici esito:aggiuntoavvisoed errori inerenti ad Id_Aura
V02c Par. 6.6 Correzione codice errore
Par. 3.4, 4.4, 5.4, 6.4 Correzione tag codiceTipoFonte
V03 Par. 3.3, 3.5, 4.3, 4.5, Revisione nome campi e namespace XML
5.3, 5.5, 6.3, 6.5, 8.3,
8.5
Specifica- Uso esterno
WebService_ConsensoRegionaleAziendale_ Giugno 2019
v03.docx
Pag. 1 di 45

| VERSIONE | PARAGRAFO O PAGINA | DESCRIZIONE DELLA VARIAZIONE |
| --- | --- | --- |
| V01 | Tutto il documento | Versione iniziale del documento |
| V02a | Par. 3.3, 4.3, 5.3, 6.3 Par. 3.3, 4.3, 5.3, 6.3 Cap. 9 Cap. 11 Par. 2.3, Cap 10 Cap. 8 | Aggiunta tag <idAura> Aggiunta tag <codiceServizio> Aggiunta tracciato allineamento massivo Aggiunta Sequence Diagram Revisione criteri di sicurezza Aggiunta Servizio VerificaServizio |
| V02b | Par 4.6 | Aggiornata tabella codici esito:aggiuntoavvisoed errori inerenti ad Id_Aura |
| V02c | Par. 6.6 Par. 3.4, 4.4, 5.4, 6.4 | Correzione codice errore Correzione tag codiceTipoFonte |
| V03 | Par. 3.3, 3.5, 4.3, 4.5, 5.3, 5.5, 6.3, 6.5, 8.3, 8.5 | Revisione nome campi e namespace XML |

---

MODULO REGIONALE GESTIONE CONSENSI
SPECIFICA DEI SERVIZI ACQUISIZIONE-
REVOCA E NOTIFICA CONSENSO
Indice generale
1. Scopo e riferimenti del documento 4
1.1 Scopo del documento 4
1.2 Riferimenti 4
1.3 Glossario 4
2. Specifiche tecniche e di comunicazione 4
2.1 Specifiche funzionali 4
2.2 Protocolli di comunicazione 5
2.3 Sicurezza del servizio 6
Servizi esposti verso le ASR 6
Servizi esposti dalle ASR 6
3. Servizio <SRV-01>: AcquisizioneConsenso 7
3.1 Obiettivi 7
3.2 Fruitori 7
3.3 Struttura XML del messaggio di “request” 7
3.4 Descrizione Tag del messaggio di “request” 8
3.5 Struttura XML del messaggio di “response” 12
3.6 Descrizione Tag del messaggio di “response” 13
Tabella Codici esito 14
4. Servizio <SRV-02>: RevocaConsenso 16
4.1 Obiettivi 16
4.2 Fruitori 16
4.3 Struttura XML del messaggio di “request” 16
4.4 Descrizione Tag del messaggio di “request” 17
4.5 Struttura XML del messaggio di “response” 21
4.6 Descrizione Tag del messaggio di “response” 21
Tabella Codici esito ed esito 22
5. Servizio <SRV-03>: NotificaAcquisizioneConsenso 24
5.1 Obiettivi 24
5.2 Fruitori 24
5.3 Struttura XML del messaggio di “request” 24
5.4 Descrizione Tag del messaggio di “request” 25
5.5 Struttura XML del messaggio di “response” 28
5.6 Descrizione Tag del messaggio di “response” 29
Tabella CodEsito ed Esito 30
6. Servizio <SRV-04>: NotificaRevocaConsenso 31
6.1 Obiettivi 31
6.2 Fruitori 31
6.3 Struttura XML del messaggio di “request” 31
Specifica- Uso esterno
WebService_ConsensoRegionaleAziendale_ Giugno 2019
v03.docx
Pag. 2 di 45

---

MODULO REGIONALE GESTIONE CONSENSI
SPECIFICA DEI SERVIZI ACQUISIZIONE-
REVOCA E NOTIFICA CONSENSO
6.4 Descrizione Tag del messaggio di “request” 32
6.5 Struttura XML del messaggio di “response” 35
6.6 Descrizione Tag del messaggio di “response” 36
Tabella CodEsito ed Esito 37
7. Codici di errori 37
7.1 Esiti 37
7.2 TipoErrore 38
8. Servizio <SRV-05>: VerificaServizio 38
8.1 Obiettivi 38
8.2 Fruitori 38
8.3 Struttura XML del messaggio di “request” 38
8.4 Descrizione Tag del messaggio di “request” 39
8.5 Struttura XML del messaggio di “response” 39
8.6 Descrizione Tag del messaggio di “response” 40
9. Allineamento massivo (pregresso) 41
9.1 Obiettivi 41
9.2 Struttura del tracciato 41
9.3 Descrizione dei campi 41
10. Requisiti di sicurezza 41
10.1 Servizi esposti verso le ASR 41
10.2 Servizi esposti dalle ASR 42
10.3 Servizi interni 42
11. Sequence Diagram 43
11.1 Espressione consenso da WebApp Cittadino 43
11.2 Espressione consenso da dipartimentale in ASR con MAGC 44
11.3 Espressione consenso da dipartimentale in ASR senza MAGC 45
Specifica- Uso esterno
WebService_ConsensoRegionaleAziendale_ Giugno 2019
v03.docx
Pag. 3 di 45

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 4 di 45
REVOCA E NOTIFICA CONSENSO
1. Scopo e riferimenti del documento
1.1 Scopo del documento
Lo scopo del documento è fornire le specifiche dei requisiti di dettaglio che descrivono il funzionamento atteso, le
caratteristiche e le modalità di utilizzo, dei servizi esposti per:
- Acquisizione di un consenso regionale/aziendale
- Revoca di un consenso regionale/aziendale
- Notifica dell’acquisizione del consenso regionale/aziendale alle ASR
- Notifica della revoca del consenso regionale/aziendale alle ASR
1.2 Riferimenti
[SRS_LINEE_DCE]
Linee_guida_gestione_DCE_V4.pdf, o versioni successive
(Linee guida per la gestione di un Documento Clinico Elettronico)
1.3 Glossario
Scopo del paragrafo è descrivere acronimi o termini utilizzati nel presente documento:
ASR Aziende Sanitarie Regionali
Web app Web Application
LIS Laboratorio analisi nell’ambito di una ASR
RIS Laboratorio radiologia nell’ambito di una ASR
2. Specifiche tecniche e di comunicazione
Scopo del capitolo è descrivere le peculiarità tecniche e funzionali relative all’acquisizione, la revoca e la notifica di
un consenso regionale o aziendale. In particolare il primo caso reale di consenso da gestire è il Consenso Permanente
ROL, che è un tipo di consenso a livello Aziendale (quindi viene espresso per la singola ASR)
Successivamente verranno definiti i protocolli implementati e le modalità di autenticazione ai fini di rendere la
comunicazione sicura.
2.1 Specifiche funzionali
Il consenso permanente al ritiro on line è definito come la preferenza del cittadino di adottare la modalità elettronica

| ASR | Aziende Sanitarie Regionali |
| --- | --- |
| Web app | Web Application |
| LIS | Laboratorio analisi nell’ambito di una ASR |
| RIS | Laboratorio radiologia nell’ambito di una ASR |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 5 di 45
REVOCA E NOTIFICA CONSENSO
per il ritiro dei referti delle prestazioni sanitarie che vengono erogate presso le aziende sanitarie della Regione
Piemonte.
L’assistito resta naturalmente libero di scegliere, al momento dell’accettazione, di esprimere le modalità di ricezione
del referto in maniera tradizionale oppure on line indipendentemente dalla preferenza espressa per il consenso
permanente.
Inoltre, la scelta espressa per la singola prestazione in fase di accettazione rimane non modificabile e indipendente
dalla preferenza del consenso permanente.
L’assistito potrà modificare la preferenza del consenso permanente ogni volta che lo vorrà.
I canali attraverso cui il cittadino può esprimere il consenso sono:
- Web app per il Cittadino (afferisce al Modulo Regionale Gestione Consensi);
- Web app per il Punto Assistito (afferisce al Modulo Regionale Gestione Consensi);
- Web app per il LIS, RIS o di altro sistema della ASR.
La preferenza dell’assistito viene raccolta all’interno del Modulo Regionale Gestione Consensi
indipendentemente dal canale utilizzato.
Il consenso permanente espresso attraverso la web app disponibile al cittadino o la webapp del Punto Assistito deve
essere notificato (in modo asincrono, per non gravare sui tempi di attesa) a tutte le ASR per le quali in cittadino ha
espresso tale consenso. Analogamente il consenso permanente espresso tramite web app del LIS, o di altro sistema
informativo della ASR, deve essere notificato al Modulo Regionale Gestione Consensi (da ASR a Modulo Regionale
Gestione Consensi l’allineamento è richiesto in modo sincrono)
NOTA BENE: Dal punto di vista pratico il consenso permanente al ritiro referti, altro non è che un primo
esempio pratico di consenso del tipo aziendale.
Per maggiori dettagli sulle logiche generali del processo di scelta del consenso permanente fare riferimento al
documento [SRS_LINEE_DCE].
Il presente documento si occupa di descrivere i servizi di notifica alle ASR dell’acquisizione e revoca consenso
espresso dal cittadino attraverso la web app disponibile al cittadino o la webapp del Punto Assistito.
2.2 Protocolli di comunicazione
Gli standard di comunicazione adottati sono conformi alle specifiche e raccomandazioni emanate dal World Wide
Web Consortium (W3C) per la famiglia di protocolli XML, SOAP e WSDL, per quanto riguarda le architetture Web
e per le tecnologie basate su Web Services.
Il protocollo SOAP da utilizzare è la versione 1.2.

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 6 di 45
REVOCA E NOTIFICA CONSENSO
2.3 Sicurezza del servizio
Nel presente capitolo sono specificati i requisiti di sicurezza.
Servizi esposti verso le ASR
I servizi esposti da CSI alle ASR dovranno rispettare le stesse caratteristiche adottate ad esempio nel contesto del
Fascicolo Regionale. Tali servizi dovranno rispondere allo standard Webservice SOAP e dovranno essere esposti in
HTTPS, con autenticazione WS-Security (profile: Sign and Encrypt - X509 Authentication con Timestamp).
Il sistema dovrà autorizzare all’utilizzo dei servizi SOAP solo i client Autorizzati (ogni ASR avrà un certificato per
ogni sistema).
Il certificato usato sarà quello già previsto dal servizio SOAP di alimentazione del FSE: RegistraEpisodio3
Dovrà essere verificato che il certificato utilizzato corrisponda al sistema associato, tale associazione dovrà essere
gestita da configurazione sul database.
Dovrà essere possibile gestire nei periodi di rinnovo dei certificati la possibilità di accettare le chiamate
contemporaneamente sia dal precedente certificato sia da quello rinnovato, sino alla scadenza del precedente
certificato.
Servizi esposti dalle ASR
Per i servizi in uscita, ossia quelli che dovranno esporre le ASR per ricevere le notifiche, dovrà essere gestito in
maniera parametrica il timeout alla chiamata.
Il sistema dovrà chiamare i servizi esposti dalle ASR applicando la sicurezza SSL Client Authentication con stesso
certificato indipendentemente dall’ASR contattata.
Il sistema dovrà gestire l’elenco dei certificati server affidabili che contatta (truststore del HTTPS).
Dovranno essere tracciati tutti i messaggi relative alle chiamate in uscita e le relative risposte ricevute nella loro forma
originale, senza alterazioni o trasformazioni adoperate dalle piattaforme di middleware.
I messaggi in uscita (e le relative risposte) dato che non contengono informazioni soggette a trattamenti speciali,
potranno essere tracciati in chiaro.
Il sistema dovrà essere implementato in maniera tale che i malfunzionamenti o i rallentamenti dei sistemi dell’ASR
non causino il degrado delle prestazioni del sistema stesso.

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 7 di 45
REVOCA E NOTIFICA CONSENSO
3. Servizio <SRV-01>: AcquisizioneConsenso
3.1 Obiettivi
In questo capitolo è descritta la struttura dei messaggi inviati e restituiti dal servizio di Acquisizione del consenso. Sia
per il messaggio di Request che di Response sono riportate le strutture XML dei messaggi e le informazioni relative
per ogni tag.
3.2 Fruitori
I fruitori del servizio sono:
- CSI Piemonte:
o Web app per il Cittadino (afferisce al Modulo Regionale Gestione Consensi);
o Web app per il Punto Assistito (afferisce al Modulo Regionale Gestione Consensi);
- ASR
3.3 Struttura XML del messaggio di “request”
Nel presente paragrafo è riportata la struttura XML del messaggio inviato per l’acquisizione di un consenso.
E’ possibile acquisire sia consensi regionali che aziendali. Al momento il consenso permanente è un primo esempio
di consenso aziendale.
Ogni riga mostra un tag e la relativa numerosità, ovvero il numero di volte per il quale lo stesso tag può essere
ripetuto. Si precisa che la posizione del tag non deve essere alterata.
Tag XML Nume
rosi
tà
<soap:Envelope 1..1
xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
xmlns:con="http://consprefbe.csi.it/”>
<soap:Body> 1..1
<con:acquisizioneConsensoRichiesta> 1..1
<requestId>?</requestId> 1..1
<codiceServizio>?</codiceServizio> 1..1
<cfRichiedente>?</cfRichiedente> 1..1
<idAura>?</idAura> 1..1
<cfDelegato>?</cfDelegato> 0..1
<operatore> 0..1
<con:tipoOperatore>?</con:tipoOperatore> 1..1

| Tag XML | Nume rosi tà |
| --- | --- |
| <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:con="http://consprefbe.csi.it/”> | 1..1 |
| <soap:Body> | 1..1 |
| <con:acquisizioneConsensoRichiesta> | 1..1 |
| <requestId>?</requestId> | 1..1 |
| <codiceServizio>?</codiceServizio> | 1..1 |
| <cfRichiedente>?</cfRichiedente> | 1..1 |
| <idAura>?</idAura> | 1..1 |
| <cfDelegato>?</cfDelegato> | 0..1 |
| <operatore> | 0..1 |
| <con:tipoOperatore>?</con:tipoOperatore> | 1..1 |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 8 di 45
REVOCA E NOTIFICA CONSENSO
<con:codiceOperatore>?</con:codiceOperatore> 1..1
</operatore>
<fonte> 1..1
<con:codiceTipoFonte>?</con:codiceTipoFonte> 1..1
<con:codiceFonte>?</con:codiceFonte> 1..1
</fonte>
<dataAcquisizione>?</dataAcquisizione>
<codiceTipoConsenso>?</codiceTipoConsenso> 1..1
<codiceSottotipoConsenso>?</codiceSottotipoConsenso> 1..1
1..1
<descrizioneSottotipoConsenso>?</descrizioneSottotipoConse
nso>
<elencoConsensi> 1..1
<consenso> 1..N
<valoreConsenso>?</valoreConsenso> 1..1
<asr> 0..1
<codice>?</codice> 1..1
</asr>
</consenso>
</elencoConsensi>
</con:acquisizioneConsensoRichiesta>
</soap:Body>
</soap:Envelope>
3.4 Descrizione Tag del messaggio di “request”
Di seguito sono descritti i tag che costituiscono la parte variabile del messaggio, ovvero quelli presenti all’interno
del tag “request”.
requestId
Descrizione Corrisponde all‘identificativo univoco all’interno del sistema inviante generata dal
chiamante utile per la tracciatura della richiesta.
Obbligatorio SI
Note Di tipo UUID (identificativo univoco universale)
codiceServizio
Descrizione Corrisponde all’identificativo univocodell’applicativo inviante.
Obbligatorio SI

| <con:codiceOperatore>?</con:codiceOperatore> | 1..1 |
| --- | --- |
| </operatore> |  |
| <fonte> | 1..1 |
| <con:codiceTipoFonte>?</con:codiceTipoFonte> | 1..1 |
| <con:codiceFonte>?</con:codiceFonte> | 1..1 |
| </fonte> |  |
| <dataAcquisizione>?</dataAcquisizione> |  |
| <codiceTipoConsenso>?</codiceTipoConsenso> | 1..1 |
| <codiceSottotipoConsenso>?</codiceSottotipoConsenso> | 1..1 |
| <descrizioneSottotipoConsenso>?</descrizioneSottotipoConse nso> | 1..1 |
| <elencoConsensi> | 1..1 |
| <consenso> | 1..N |
| <valoreConsenso>?</valoreConsenso> | 1..1 |
| <asr> | 0..1 |
| <codice>?</codice> | 1..1 |
| </asr> |  |
| </consenso> |  |
| </elencoConsensi> |  |
| </con:acquisizioneConsensoRichiesta> |  |
| </soap:Body> |  |
| </soap:Envelope> |  |

| Descrizione | Corrisponde all‘identificativo univoco all’interno del sistema inviante generata dal chiamante utile per la tracciatura della richiesta. |
| --- | --- |
| Obbligatorio | SI |
| Note | Di tipo UUID (identificativo univoco universale) |

| Descrizione | Corrisponde all’identificativo univocodell’applicativo inviante. |
| --- | --- |
| Obbligatorio | SI |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 9 di 45
REVOCA E NOTIFICA CONSENSO
Note Il codice deve essere concordato con CSI
cfRichiedente
Descrizione Corrisponde al Codice Fiscale del cittadino che ha espresso il consenso.
Obbligatorio SI
Note
idAura
Descrizione Corrisponde all’Identificativo AURA del cittadino che ha espresso il consenso.
Obbligatorio SI
Note
cfDelegato
Descrizione Corrisponde al Codice Fiscale della persona delegata dal Cittadino per conferire il consenso
Obbligatorio NO
Note
operatore
Descrizione Identifica l’operatore del Punto Assistito che ha effettuato l’operazione di acquisizione
consenso da parte del cittadino
Obbligatorio NO
Note
tipoOperatore (operatore)
Descrizione Identifica la tipologia di operatore che ha effettuato l’operazione di acquisizione consenso
Obbligatorio SI se il tag “codiceOperatore” è valorizzato
Note
codiceOperatore (operatore)
Descrizione Identifica il codice identificativo dell’operatore che ha effettuato l’operazione di
acquisizione consenso
Obbligatorio SI se il tag “tipoOperatore” è valorizzato

| Descrizione | Corrisponde al Codice Fiscale del cittadino che ha espresso il consenso. |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Corrisponde all’Identificativo AURA del cittadino che ha espresso il consenso. |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Corrisponde al Codice Fiscale della persona delegata dal Cittadino per conferire il consenso |
| --- | --- |
| Obbligatorio | NO |
| Note |  |

| Descrizione | Identifica l’operatore del Punto Assistito che ha effettuato l’operazione di acquisizione consenso da parte del cittadino |
| --- | --- |
| Obbligatorio | NO |
| Note |  |

| Descrizione | Identifica la tipologia di operatore che ha effettuato l’operazione di acquisizione consenso |
| --- | --- |
| Obbligatorio | SI se il tag “codiceOperatore” è valorizzato |
| Note |  |

| Descrizione | Identifica il codice identificativo dell’operatore che ha effettuato l’operazione di acquisizione consenso |
| --- | --- |
| Obbligatorio | SI se il tag “tipoOperatore” è valorizzato |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 10 di 45
REVOCA E NOTIFICA CONSENSO
Note
fonte
Descrizione Identifica la fonte di acquisizione del consenso
Obbligatorio SI
Note
codiceTipoFonte
Descrizione Identifica il codice univoco della tipo fonte di acquisizione del consenso
Obbligatorio SI
Note I possibili codici del tipo fonte possono essere:
- Fonte Cittadino (codice tipo = CITT)
- Fonte Punto Assistito (codice tipo = PASS)
- Fonte Sistema centralizzato ASR (codice tipo = ASR)
- Fonte LIS di una ASR (codice tipo = LIS)
- Fonte Radiologia di una ASR (codice tipo = RIS)
codiceFonte
Descrizione Identifica il codice univoco della fonte di acquisizione del consenso
Obbligatorio SI
Note I possibili codici della fonte possono essere i seguenti:
- WA_CITT: se il codiceTipoFonte è CITT
- WA_PASS: se il codiceTipoFonte è PASS
- Codice dell’ASR: codice ISTAT dell’ASR sprovvisto del codice regione (es: 301)
se il codiceTipoFonte è ASR
- Codice dell’ASR: codice ISTAT dell’ASR sprovvisto del codice regione (es: 301)
di appartenenza del LIS se il codiceTipoFonte è LIS
- Codice dell’ASR: codice ISTAT dell’ASR sprovvisto del codice regione (es: 301)
di appartenenza del RIS se il codiceTipoFonte è RIS
dataAcquisizione
Descrizione Corrisponde alla data di acquisizione del consenso
Obbligatorio SI
Note La data è espressa nel formato timestamp contenente la data e ora (yyyymmddhhmmss)
codiceTipoConsenso
Descrizione Identifica la tipologia del consenso

| Descrizione | Identifica la fonte di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Identifica il codice univoco della tipo fonte di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | I possibili codici del tipo fonte possono essere: - Fonte Cittadino (codice tipo = CITT) - Fonte Punto Assistito (codice tipo = PASS) - Fonte Sistema centralizzato ASR (codice tipo = ASR) - Fonte LIS di una ASR (codice tipo = LIS) - Fonte Radiologia di una ASR (codice tipo = RIS) |

| Descrizione | Identifica il codice univoco della fonte di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | I possibili codici della fonte possono essere i seguenti: - WA_CITT: se il codiceTipoFonte è CITT - WA_PASS: se il codiceTipoFonte è PASS - Codice dell’ASR: codice ISTAT dell’ASR sprovvisto del codice regione (es: 301) se il codiceTipoFonte è ASR - Codice dell’ASR: codice ISTAT dell’ASR sprovvisto del codice regione (es: 301) di appartenenza del LIS se il codiceTipoFonte è LIS - Codice dell’ASR: codice ISTAT dell’ASR sprovvisto del codice regione (es: 301) di appartenenza del RIS se il codiceTipoFonte è RIS |

| Descrizione | Corrisponde alla data di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | La data è espressa nel formato timestamp contenente la data e ora (yyyymmddhhmmss) |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 11 di 45
REVOCA E NOTIFICA CONSENSO
Obbligatorio SI
Note Può assumere i seguenti valori:
- A: aziendale
- R: regionale
codiceSottotipoConsenso
Descrizione Identifica la sottotipologia del consenso
Obbligatorio SI
Note Può assumere al momento il seguente valore:
- CPROL: Consenso Permanente al ROL
descrizioneSottotipoConsenso
Descrizione Corrisponde alla sottotipologia del consenso
Obbligatorio SI
Note Se il codiceSottotipoConsenso = ‘CPROL’ la descrizione corrisponde a “Consenso
Permanente ROL”
elencoConsensi
Descrizione Corrisponde all’elencodei consensi espressi dal cittadino
Obbligatorio SI
Note
consenso
Descrizione Identifica il consenso espresso dal cittadino comprensivo di valore e ASR a cui si riferisce il
cosnenso
Obbligatorio SI
Note
valoreConsenso (consenso)
Descrizione Corrisponde al valore del consenso espresso dal cittadino
Obbligatorio SI
Note Può assumere i seguenti valori:

| Obbligatorio | SI |
| --- | --- |
| Note | Può assumere i seguenti valori: - A: aziendale - R: regionale |

| Descrizione | Identifica la sottotipologia del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | Può assumere al momento il seguente valore: - CPROL: Consenso Permanente al ROL |

| Descrizione | Corrisponde alla sottotipologia del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | Se il codiceSottotipoConsenso = ‘CPROL’ la descrizione corrisponde a “Consenso Permanente ROL” |

| Descrizione | Corrisponde all’elencodei consensi espressi dal cittadino |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Identifica il consenso espresso dal cittadino comprensivo di valore e ASR a cui si riferisce il cosnenso |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Corrisponde al valore del consenso espresso dal cittadino |
| --- | --- |
| Obbligatorio | SI |
| Note | Può assumere i seguenti valori: |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 12 di 45
REVOCA E NOTIFICA CONSENSO
- SI
- NO
- NE: non espresso
asr (consenso)
Descrizione Corrisponde all’ASR a cui è specificato il consenso indicato dal cittadino, identificata con il
codice ISTAT
Obbligatorio SI, solo se il consenso è di tipo Aziendale (codiceTipoConsenso = A)
Note
codice (asr)
Descrizione Identifica il codice ASR a cui si riferisce il consenso
Obbligatorio SI
Note Il tracciato utilizza il codice ISTAT dell’ASR sprovvisto del codice regione (es: 301
corrisponde all’ASR TO 1)
3.5 Struttura XML del messaggio di “response”
Nel presente paragrafo è riportata la struttura XML del messaggio restituito all’acquisizione di un consenso.
Come per la struttura della request, ogni riga mostra un tag e la relativa numerosità, ovvero il numero di volte per il
quale lo stesso tag può essere ripetuto. Si precisa che la posizione del tag non deve essere alterata.
Tag XML Nume
rosi
tà
<soap:Envelope 1..1
xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
xmlns:con="http://consprefbe.csi.it/”>
<soap:Header/>
<soap:Body> 1..1
<con:acquisizioneConsensoRicevuta> 1..1
<con:esito>?</con:esito> 1..1
<con:elencoErrori> 0..1
<con:errore> 1..N

| Descrizione | Corrisponde all’ASR a cui è specificato il consenso indicato dal cittadino, identificata con il codice ISTAT |
| --- | --- |
| Obbligatorio | SI, solo se il consenso è di tipo Aziendale (codiceTipoConsenso = A) |
| Note |  |

| Descrizione | Identifica il codice ASR a cui si riferisce il consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | Il tracciato utilizza il codice ISTAT dell’ASR sprovvisto del codice regione (es: 301 corrisponde all’ASR TO 1) |

| Tag XML | Nume rosi tà |
| --- | --- |
| <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:con="http://consprefbe.csi.it/”> | 1..1 |
| <soap:Header/> |  |
| <soap:Body> | 1..1 |
| <con:acquisizioneConsensoRicevuta> | 1..1 |
| <con:esito>?</con:esito> | 1..1 |
| <con:elencoErrori> | 0..1 |
| <con:errore> | 1..N |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 13 di 45
REVOCA E NOTIFICA CONSENSO
<con:codEsito>?</con:codEsito> 1..1
<con:esito>?</con:esito> 1..1
<con:tipoErrore>?</con:tipoErrore> 1..1
</con:errore>
</con:elencoErrori>
</con:acquisizioneConsensoRicevuta>
</soap:Body>
</soap:Envelope>
3.6 Descrizione Tag del messaggio di “response”
Di seguito sono descritti i tag che costituiscono la parte variabile del messaggio, ovvero quelli presenti all’interno
del tag “request”
esito
Descrizione Esito relativo all’acquisizione del consenso da parte del Modulo Regionale Gestione
Consensi o da parte delle ASR, fruitori del servizio.
Verrà riportata l’indicazione di “errore bloccante” se il fruitore ha rilevato un errore
bloccante che ha impedito allo stesso di acquisire l’informazione comunicata.
Verrà riportata l’indicazione di “avviso (non bloccante)” se il fruitore ha rilevato al più un
avviso non bloccante che non ha impedito allo stesso di acquisire l’informazione
comunicata.
Verrà riportata l’indicazione di “nessun errore o avviso” se il fruitore è riuscito ad acquisire
i dati del consenso senza rilevare né errori né avvisi (in questo caso non dovrà essere
presente la componente elencoErrori sotto descritta).
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo 7.1
elencoErrori
Descrizione Corrisponde alla lista di errori ottenuti
Obbligatorio Si solo nei casi specifici
Note
codEsito (elencoErrori)
Descrizione Corrisponde al codice dell’errore/avviso
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo 0

| <con:codEsito>?</con:codEsito> | 1..1 |
| --- | --- |
| <con:esito>?</con:esito> | 1..1 |
| <con:tipoErrore>?</con:tipoErrore> | 1..1 |
| </con:errore> |  |
| </con:elencoErrori> |  |
| </con:acquisizioneConsensoRicevuta> |  |
| </soap:Body> |  |
| </soap:Envelope> |  |

| Descrizione | Esito relativo all’acquisizione del consenso da parte del Modulo Regionale Gestione Consensi o da parte delle ASR, fruitori del servizio. Verrà riportata l’indicazione di “errore bloccante” se il fruitore ha rilevato un errore bloccante che ha impedito allo stesso di acquisire l’informazione comunicata. Verrà riportata l’indicazione di “avviso (non bloccante)” se il fruitore ha rilevato al più un avviso non bloccante che non ha impedito allo stesso di acquisire l’informazione comunicata. Verrà riportata l’indicazione di “nessun errore o avviso” se il fruitore è riuscito ad acquisire i dati del consenso senza rilevare né errori né avvisi (in questo caso non dovrà essere presente la componente elencoErrori sotto descritta). |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo 7.1 |

| Descrizione | Corrisponde alla lista di errori ottenuti |
| --- | --- |
| Obbligatorio | Si solo nei casi specifici |
| Note |  |

| Descrizione | Corrisponde al codice dell’errore/avviso |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo 0 |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 14 di 45
REVOCA E NOTIFICA CONSENSO
esito (elencoErrori)
Descrizione Corrisponde alla descrizione dell’errore sollevato
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo 0
tipoErrore (elencoErrori)
Descrizione Corrisponde alla tipologia di errore della notifica
Obbligatorio SI solo se l’ASR non è riuscita ad acquisire la notifica
Note I valori ammessi sono riportati nel paragrafo 7.2
Tabella Codici esito
Codice Descrizione Tipo errore
ERR_0001 Il codice fiscale del Richiedente è obbligatorio Bloccante
ERR_0002 Il codice fiscale del Richiedente non è corretto Bloccante
ERR_0003 Il codice fiscale del Richiedente non è presente Bloccante
ERR_0004 Il codice fiscale del Delegato non è corretto Bloccante
ERR_0005 Il codice fiscale del Delegato non corrisponde ad un delegato della Bloccante
persona richiedente
ERR_0006 Il tipo operatore è obbligatorio Bloccante
ERR_0007 Il codice dell’operatore è obbligatorio Bloccante
ERR_0008 Il tipo operatore non è valido Bloccante
ERR_0009 Il codice dell’operatore non è valido Bloccante
ERR_0010 Il codice tipo fonte è obbligatorio Bloccante
ERR_0011 Il codice fonte è obbligatorio Bloccante
ERR_0012 Il codice tipo fonte non è valido Bloccante
ERR_0013 Il codice fonte non è valido Bloccante
ERR_0014 La data acquisizione è obbligatoria Bloccante
ERR_0015 La data acquisizione non è corretta. Il formato deve essere Bloccante
yyyymmddhhmmss

| Descrizione | Corrisponde alla descrizione dell’errore sollevato |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo 0 |

| Descrizione | Corrisponde alla tipologia di errore della notifica |
| --- | --- |
| Obbligatorio | SI solo se l’ASR non è riuscita ad acquisire la notifica |
| Note | I valori ammessi sono riportati nel paragrafo 7.2 |

| Codice | Descrizione | Tipo errore |
| --- | --- | --- |
| ERR_0001 | Il codice fiscale del Richiedente è obbligatorio | Bloccante |
| ERR_0002 | Il codice fiscale del Richiedente non è corretto | Bloccante |
| ERR_0003 | Il codice fiscale del Richiedente non è presente | Bloccante |
| ERR_0004 | Il codice fiscale del Delegato non è corretto | Bloccante |
| ERR_0005 | Il codice fiscale del Delegato non corrisponde ad un delegato della persona richiedente | Bloccante |
| ERR_0006 | Il tipo operatore è obbligatorio | Bloccante |
| ERR_0007 | Il codice dell’operatore è obbligatorio | Bloccante |
| ERR_0008 | Il tipo operatore non è valido | Bloccante |
| ERR_0009 | Il codice dell’operatore non è valido | Bloccante |
| ERR_0010 | Il codice tipo fonte è obbligatorio | Bloccante |
| ERR_0011 | Il codice fonte è obbligatorio | Bloccante |
| ERR_0012 | Il codice tipo fonte non è valido | Bloccante |
| ERR_0013 | Il codice fonte non è valido | Bloccante |
| ERR_0014 | La data acquisizione è obbligatoria | Bloccante |
| ERR_0015 | La data acquisizione non è corretta. Il formato deve essere yyyymmddhhmmss | Bloccante |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 15 di 45
REVOCA E NOTIFICA CONSENSO
ERR_0016 Il codice tipo consenso è obbligatorio Bloccante
ERR_0017 Il codice tipo consenso non è valido Bloccante
ERR_0018 Il codice sottotipo consenso è obbligatorio Bloccante
ERR_0019 Il codice sottotipo consenso non è valido Bloccante
ERR_0020 La descrizione sottotipo consenso è obbligatoria Bloccante
ERR_0021 La descrizione sottotipo consenso non è valida Bloccante
ERR_0022 Il valore consenso è obbligatorio Bloccante
ERR_0023 Il valore consenso non è valido Bloccante
ERR_0024 Il codice ASR è obbligatorio Bloccante
ERR_0025 il codice ASR non è valido Bloccante
ERR_0026 Il codice ASR non deve essere valorizzato per un consenso Bloccante
Regionale (codTipoConsenso = R)
ERR_0027 ID_AURA obbligatorio Bloccante
ERR_0028 ID_AURA e cf non corrispondono Bloccante

| ERR_0016 | Il codice tipo consenso è obbligatorio | Bloccante |
| --- | --- | --- |
| ERR_0017 | Il codice tipo consenso non è valido | Bloccante |
| ERR_0018 | Il codice sottotipo consenso è obbligatorio | Bloccante |
| ERR_0019 | Il codice sottotipo consenso non è valido | Bloccante |
| ERR_0020 | La descrizione sottotipo consenso è obbligatoria | Bloccante |
| ERR_0021 | La descrizione sottotipo consenso non è valida | Bloccante |
| ERR_0022 | Il valore consenso è obbligatorio | Bloccante |
| ERR_0023 | Il valore consenso non è valido | Bloccante |
| ERR_0024 | Il codice ASR è obbligatorio | Bloccante |
| ERR_0025 | il codice ASR non è valido | Bloccante |
| ERR_0026 | Il codice ASR non deve essere valorizzato per un consenso Regionale (codTipoConsenso = R) | Bloccante |
| ERR_0027 | ID_AURA obbligatorio | Bloccante |
| ERR_0028 | ID_AURA e cf non corrispondono | Bloccante |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 16 di 45
REVOCA E NOTIFICA CONSENSO
4. Servizio <SRV-02>: RevocaConsenso
4.1 Obiettivi
In questo capitolo è descritta la struttura dei messaggi inviati e restituiti dal servizio di Revoca del consenso. Sia per
il messaggio di Request che di Response sono riportate le strutture XML dei messaggi e le informazioni relative per
ogni tag.
4.2 Fruitori
I fruitori del servizio sono:
- CSI Piemonte:
o Web app per il Cittadino (afferisce al Modulo Regionale Gestione Consensi);
o Web app per il Punto Assistito (afferisce al Modulo Regionale Gestione Consensi);
- ASR
4.3 Struttura XML del messaggio di “request”
Nel presente paragrafo è riportata la struttura XML del messaggio inviato per la revoca di un consenso.
E’ possibile revocare sia consensi regionali che aziendali. Al momento il consenso permanente è un primo esempio
di consenso aziendale.
Ogni riga mostra un tag e la relativa numerosità, ovvero il numero di volte per il quale lo stesso tag può essere
ripetuto. Si precisa che la posizione del tag non deve essere alterata.
Tag XML Nume
rosi
tà
<soap:Envelope 1..1
xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
xmlns:con="http://consprefbe.csi.it/”>
<soap:Header/>
<soap:Body> 1..1
<con:revocaConsensoRichiesta> 1..1
<requestId>?</requestId> 1..1
<codiceServizio>?</codiceServizio> 1..1
<cfRichiedente>?</cfRichiedente> 1..1
<idAura>?</idAura> 1..1
<cfDelegato>?</cfDelegato> 0..1

| Tag XML | Nume rosi tà |
| --- | --- |
| <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:con="http://consprefbe.csi.it/”> | 1..1 |
| <soap:Header/> |  |
| <soap:Body> | 1..1 |
| <con:revocaConsensoRichiesta> | 1..1 |
| <requestId>?</requestId> | 1..1 |
| <codiceServizio>?</codiceServizio> | 1..1 |
| <cfRichiedente>?</cfRichiedente> | 1..1 |
| <idAura>?</idAura> | 1..1 |
| <cfDelegato>?</cfDelegato> | 0..1 |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 17 di 45
REVOCA E NOTIFICA CONSENSO
<operatore> 0..1
<tipoOperatore>?</tipoOperatore> 1..1
<codiceOperatore>?</codiceOperatore> 1..1
</operatore>
<fonte> 1..1
<codiceTipoFonte>?</codiceTipoFonte> 1..1
<codiceFonte>?</codiceFonte> 1..1
</fonte>
<dataAcquisizione>?</dataAcquisizione>
<codiceTipoConsenso>?</codiceTipoConsenso> 1..1
<codiceSottotipoConsenso>?</codiceSottotipoConsenso> 1..1
1..1
<descrizioneSottotipoConsenso>?</descrizioneSottotipoConse
nso>
<elencoAsr> 1..1
<asr> 1..N
<codice>?</codice> 1..1
</asr>
</elencoAsr>
</con:revocaConsensoRichiesta>
</soap:Body>
</soap:Envelope>
4.4 Descrizione Tag del messaggio di “request”
Di seguito sono descritti i tag che costituiscono la parte variabile del messaggio, ovvero quelli presenti all’interno
del tag “request”.
requestId
Descrizione Corrisponde all‘identificativo univoco all’interno del sistema inviante generata dal
chiamante utile per la tracciatura della richiesta.
Obbligatorio SI
Note
codiceServizio
Descrizione Corrisponde all’identificativo univocodell’applicativo inviante.

| <operatore> | 0..1 |
| --- | --- |
| <tipoOperatore>?</tipoOperatore> | 1..1 |
| <codiceOperatore>?</codiceOperatore> | 1..1 |
| </operatore> |  |
| <fonte> | 1..1 |
| <codiceTipoFonte>?</codiceTipoFonte> | 1..1 |
| <codiceFonte>?</codiceFonte> | 1..1 |
| </fonte> |  |
| <dataAcquisizione>?</dataAcquisizione> |  |
| <codiceTipoConsenso>?</codiceTipoConsenso> | 1..1 |
| <codiceSottotipoConsenso>?</codiceSottotipoConsenso> | 1..1 |
| <descrizioneSottotipoConsenso>?</descrizioneSottotipoConse nso> | 1..1 |
| <elencoAsr> | 1..1 |
| <asr> | 1..N |
| <codice>?</codice> | 1..1 |
| </asr> |  |
| </elencoAsr> |  |
| </con:revocaConsensoRichiesta> |  |
| </soap:Body> |  |
| </soap:Envelope> |  |

| Descrizione | Corrisponde all‘identificativo univoco all’interno del sistema inviante generata dal chiamante utile per la tracciatura della richiesta. |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 18 di 45
REVOCA E NOTIFICA CONSENSO
Obbligatorio SI
Note
cfRichiedente
Descrizione Corrisponde al Codice Fiscale del cittadino che ha espressola revoca del consenso.
Obbligatorio SI
Note
idAura
Descrizione Corrisponde all’Identificativo AURA del cittadino che ha espresso il consenso.
Obbligatorio SI
Note
cfDelegato
Descrizione Corrisponde al Codice Fiscale della persona delegata dal Cittadino per revocare il consenso
Obbligatorio NO
Note
operatore
Descrizione Identifica l’operatore del Punto Assistito che ha effettuato l’operazione di revoca del
consenso da parte del cittadino
Obbligatorio NO
Note
tipoOperatore (operatore)
Descrizione Identifica la tipologia di operatore che ha effettuato l’operazione di revoca del consenso
Obbligatorio SI se il tag “codiceOperatore” è valorizzato
Note
codiceOperatore (operatore)
Descrizione Identifica il codice identificativo dell’operatore che ha effettuato l’operazione di revoca del
consenso
Obbligatorio SI se il tag “tipoOperatore” è valorizzato

| Obbligatorio | SI |
| --- | --- |
| Note |  |

| Descrizione | Corrisponde al Codice Fiscale del cittadino che ha espressola revoca del consenso. |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Corrisponde all’Identificativo AURA del cittadino che ha espresso il consenso. |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Corrisponde al Codice Fiscale della persona delegata dal Cittadino per revocare il consenso |
| --- | --- |
| Obbligatorio | NO |
| Note |  |

| Descrizione | Identifica l’operatore del Punto Assistito che ha effettuato l’operazione di revoca del consenso da parte del cittadino |
| --- | --- |
| Obbligatorio | NO |
| Note |  |

| Descrizione | Identifica la tipologia di operatore che ha effettuato l’operazione di revoca del consenso |
| --- | --- |
| Obbligatorio | SI se il tag “codiceOperatore” è valorizzato |
| Note |  |

| Descrizione | Identifica il codice identificativo dell’operatore che ha effettuato l’operazione di revoca del consenso |
| --- | --- |
| Obbligatorio | SI se il tag “tipoOperatore” è valorizzato |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 19 di 45
REVOCA E NOTIFICA CONSENSO
Note
fonte
Descrizione Identifica la fonte di acquisizione del consenso
Obbligatorio SI
Note
codiceTipoFonte
Descrizione Identifica il codice univoco della tipo fonte di acquisizione del consenso
Obbligatorio SI
Note I possibili codici del tipo fonte possono essere:
- Fonte Cittadino (codice tipo = CITT)
- Fonte Punto Assistito (codice tipo = PASS)
- Fonte Sistema centralizzato ASR (codice tipo = ASR)
- Fonte LIS di una ASR (codice tipo = LIS)
- Fonte Radiologia di una ASR (codice tipo = RIS)
codiceFonte
Descrizione Identifica il codice univoco della fonte di acquisizione del consenso
Obbligatorio SI
Note I possibili codici della fonte possono essere i seguenti:
- WA_CITT: se il codiceTipoFonte è CITT
- WA_PASS: se il codiceTipoFonte è PASS
- Codice dell’ASR: codice ISTAT dell’ASR sprovvisto del codice regione (es: 301)
se il codiceTipoFonte è ASR
- Codice dell’ASR: codice ISTAT dell’ASR sprovvisto del codice regione (es: 301)
di appartenenza del LIS se il codiceTipoFonte è LIS
- Codice dell’ASR: codice ISTAT dell’ASR sprovvisto del codice regione (es: 301)
di appartenenza del RIS se il codiceTipoFonte è RIS
dataAcquisizione
Descrizione Corrisponde alla data di acquisizione della revoca delconsenso
Obbligatorio SI
Note La data è espressa nel formato timestamp contenente la data e ora (yyyymmddhhmmss)
codiceTipoConsenso
Descrizione Identifica la tipologia del consenso

| Descrizione | Identifica la fonte di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Identifica il codice univoco della tipo fonte di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | I possibili codici del tipo fonte possono essere: - Fonte Cittadino (codice tipo = CITT) - Fonte Punto Assistito (codice tipo = PASS) - Fonte Sistema centralizzato ASR (codice tipo = ASR) - Fonte LIS di una ASR (codice tipo = LIS) - Fonte Radiologia di una ASR (codice tipo = RIS) |

| Descrizione | Identifica il codice univoco della fonte di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | I possibili codici della fonte possono essere i seguenti: - WA_CITT: se il codiceTipoFonte è CITT - WA_PASS: se il codiceTipoFonte è PASS - Codice dell’ASR: codice ISTAT dell’ASR sprovvisto del codice regione (es: 301) se il codiceTipoFonte è ASR - Codice dell’ASR: codice ISTAT dell’ASR sprovvisto del codice regione (es: 301) di appartenenza del LIS se il codiceTipoFonte è LIS - Codice dell’ASR: codice ISTAT dell’ASR sprovvisto del codice regione (es: 301) di appartenenza del RIS se il codiceTipoFonte è RIS |

| Descrizione | Corrisponde alla data di acquisizione della revoca delconsenso |
| --- | --- |
| Obbligatorio | SI |
| Note | La data è espressa nel formato timestamp contenente la data e ora (yyyymmddhhmmss) |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 20 di 45
REVOCA E NOTIFICA CONSENSO
Obbligatorio SI
Note Può assumere i seguenti valori:
- A: aziendale
- R: regionale
codiceSottotipoConsenso
Descrizione Identifica la sottotipologia del consenso
Obbligatorio SI
Note Può assumere al momento il seguente valore:
- CPROL: Consenso Permanente al ROL
descrizioneSottotipoConsenso
Descrizione Corrisponde alla sottotipologiadel consenso
Obbligatorio SI
Note Se il codiceSottotipoConsenso = ‘CPROL’ la descrizione corrisponde a “Consenso
Permanente ROL”
elencoAsr
Descrizione Identifica l’elenco delle ASR per cui il cittadino ha richiesto la revoca del consenso
Obbligatorio SI
Note
asr
Descrizione Corrisponde all’ASR a cui si riferisce la revoca del consenso
Obbligatorio SI, solo il consenso è di tipo aziendale (codiceTipoConsenso = A)
Note
codice (asr)
Descrizione Identifica il codice ASR a cui si riferiscelarevoca del consenso
Obbligatorio SI, solo il consenso è di tipo aziendale (codiceTipoConsenso = A)
Note Il tracciato utilizza il codice ISTAT dell’ASR sprovvisto del codice regione (es: 301
corrisponde all’ASR TO 1)

| Obbligatorio | SI |
| --- | --- |
| Note | Può assumere i seguenti valori: - A: aziendale - R: regionale |

| Descrizione | Identifica la sottotipologia del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | Può assumere al momento il seguente valore: - CPROL: Consenso Permanente al ROL |

| Descrizione | Corrisponde alla sottotipologiadel consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | Se il codiceSottotipoConsenso = ‘CPROL’ la descrizione corrisponde a “Consenso Permanente ROL” |

| Descrizione | Identifica l’elenco delle ASR per cui il cittadino ha richiesto la revoca del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Corrisponde all’ASR a cui si riferisce la revoca del consenso |
| --- | --- |
| Obbligatorio | SI, solo il consenso è di tipo aziendale (codiceTipoConsenso = A) |
| Note |  |

| Descrizione | Identifica il codice ASR a cui si riferiscelarevoca del consenso |
| --- | --- |
| Obbligatorio | SI, solo il consenso è di tipo aziendale (codiceTipoConsenso = A) |
| Note | Il tracciato utilizza il codice ISTAT dell’ASR sprovvisto del codice regione (es: 301 corrisponde all’ASR TO 1) |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 21 di 45
REVOCA E NOTIFICA CONSENSO
4.5 Struttura XML del messaggio di “response”
Nel presente paragrafo è riportata la struttura XML del messaggio restituito alla revoca di un consenso.
Come per la struttura della request, ogni riga mostra un tag e la relativa numerosità, ovvero il numero di volte per il
quale lo stesso tag può essere ripetuto. Si precisa che la posizione del tag non deve essere alterata.
Tag XML Nume
rosi
tà
<soap:Envelope 1..1
xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
xmlns:con="http://consprefbe.csi.it/”>
<soap:Header/>
<soap:Body> 1..1
<con: revocaConsensoRicevuta> 1..1
<con:esito>?</con:esito> 1..1
<con:elencoErrori> 0..1
<con:errore> 1..N
<con:codEsito>?</con:codEsito> 1..1
<con:esito>?</con:esito> 1..1
<con:tipoErrore>?</con:tipoErrore> 1..1
</con:errore>
</con:elencoErrori>
</con:revocaConsensoRicevuta>
</soap:Body>
</soap:Envelope>
4.6 Descrizione Tag del messaggio di “response”
Di seguito sono descritti i tag che costituiscono la parte variabile del messaggio, ovvero quelli presenti all’interno
del tag “request”
esito
Descrizione Esito relativo alla revoca del consenso da parte del Modulo Regionale Gestione Consensi o
da parte delle ASR, fruitori del servizio

| Tag XML | Nume rosi tà |
| --- | --- |
| <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:con="http://consprefbe.csi.it/”> | 1..1 |
| <soap:Header/> |  |
| <soap:Body> | 1..1 |
| <con: revocaConsensoRicevuta> | 1..1 |
| <con:esito>?</con:esito> | 1..1 |
| <con:elencoErrori> | 0..1 |
| <con:errore> | 1..N |
| <con:codEsito>?</con:codEsito> | 1..1 |
| <con:esito>?</con:esito> | 1..1 |
| <con:tipoErrore>?</con:tipoErrore> | 1..1 |
| </con:errore> |  |
| </con:elencoErrori> |  |
| </con:revocaConsensoRicevuta> |  |
| </soap:Body> |  |
| </soap:Envelope> |  |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 22 di 45
REVOCA E NOTIFICA CONSENSO
Verrà riportata l’indicazione di “errore bloccante” se il fruitore ha rilevato un errore
bloccante che ha impedito allo stesso di acquisire l’informazione comunicata.
Verrà riportata l’indicazione di “avviso (non bloccante)” il fruitore ha rilevato al più un
avviso non bloccante che non ha impedito allo stesso di acquisire l’informazione
comunicata.
Verrà riportata l’indicazione di “nessun errore o avviso” il fruitore è riuscito ad acquisire i
dati del consenso senza rilevare né errori né avvisi (in questo caso non dovrà essere
presente la componente elencoErrori sotto descritta).
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo 7.1
elencoErrori
Descrizione Corrisponde alla lista di errori ottenuti
Obbligatorio Si solo nei casi specifici
Note
codEsito (elencoErrori)
Descrizione Corrisponde al codice dell’errore/avviso
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo 0
esito (elencoErrori)
Descrizione Corrisponde alla descrizione dell’errore sollevato
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo 0
tipoErrore (elencoErrori)
Descrizione Corrisponde alla tipologia di errore della notifica
Obbligatorio SI solo se l’ASR non è riuscita ad acquisire la notifica
Note I valori ammessi sono riportati nel paragrafo 7.2
Tabella Codici esito ed esito
In questo paragrafo sono riportati i codici degli esiti e le relative descrizioni

|  | Verrà riportata l’indicazione di “errore bloccante” se il fruitore ha rilevato un errore bloccante che ha impedito allo stesso di acquisire l’informazione comunicata. Verrà riportata l’indicazione di “avviso (non bloccante)” il fruitore ha rilevato al più un avviso non bloccante che non ha impedito allo stesso di acquisire l’informazione comunicata. Verrà riportata l’indicazione di “nessun errore o avviso” il fruitore è riuscito ad acquisire i dati del consenso senza rilevare né errori né avvisi (in questo caso non dovrà essere presente la componente elencoErrori sotto descritta). |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo 7.1 |

| Descrizione | Corrisponde alla lista di errori ottenuti |
| --- | --- |
| Obbligatorio | Si solo nei casi specifici |
| Note |  |

| Descrizione | Corrisponde al codice dell’errore/avviso |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo 0 |

| Descrizione | Corrisponde alla descrizione dell’errore sollevato |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo 0 |

| Descrizione | Corrisponde alla tipologia di errore della notifica |
| --- | --- |
| Obbligatorio | SI solo se l’ASR non è riuscita ad acquisire la notifica |
| Note | I valori ammessi sono riportati nel paragrafo 7.2 |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 23 di 45
REVOCA E NOTIFICA CONSENSO
Codice Descrizione Tipo errore
ERR_0001 Il codice fiscale del Richiedente è obbligatorio Bloccante
ERR_0002 Il codice fiscale del Richiedente non è corretto Bloccante
ERR_0003 Il codice fiscale del Richiedente non è presente Bloccante
ERR_0004 Il codice fiscale del Delegato non è corretto Bloccante
ERR_0005 Il codice fiscale del Delegato non corrisponde ad un delegato della Bloccante
persona richiedente
ERR_0006 Il tipo operatore è obbligatorio Bloccante
ERR_0007 Il codice dell’operatore è obbligatorio Bloccante
ERR_0008 Il tipo operatore non è valido Bloccante
ERR_0009 Il codice dell’operatore non è valido Bloccante
ERR_0010 Il codice tipo fonte è obbligatorio Bloccante
ERR_0011 Il codice fonte è obbligatorio Bloccante
ERR_0012 Il codice tipo fonte non è valido Bloccante
ERR_0013 Il codice fonte non è valido Bloccante
ERR_0014 La data acquisizione è obbligatoria Bloccante
ERR_0015 La data acquisizione non è corretta. Il formato deve essere Bloccante
yyyymmddhhmmss
ERR_0016 Il codice tipo consenso è obbligatorio Bloccante
ERR_0017 Il codice tipo consenso non è valido Bloccante
ERR_0018 Il codice sottotipo consenso è obbligatorio Bloccante
ERR_0019 Il codice sottotipo consenso non è valido Bloccante
ERR_0020 La descrizione sottotipo consenso è obbligatoria Bloccante
ERR_0021 La descrizione sottotipo consenso non è valida Bloccante
ERR_0024 Il codice ASR è obbligatorio Bloccante
ERR_0025 Il codice ASR non è valido Bloccante
ERR_0027 ID_AURA obbligatorio Bloccante
ERR_0028 ID_AURA e cf non corrispondono Bloccante
AVV_0001 Non è stato trovato nessun consenso da revocare Avviso

| Codice | Descrizione | Tipo errore |
| --- | --- | --- |
| ERR_0001 | Il codice fiscale del Richiedente è obbligatorio | Bloccante |
| ERR_0002 | Il codice fiscale del Richiedente non è corretto | Bloccante |
| ERR_0003 | Il codice fiscale del Richiedente non è presente | Bloccante |
| ERR_0004 | Il codice fiscale del Delegato non è corretto | Bloccante |
| ERR_0005 | Il codice fiscale del Delegato non corrisponde ad un delegato della persona richiedente | Bloccante |
| ERR_0006 | Il tipo operatore è obbligatorio | Bloccante |
| ERR_0007 | Il codice dell’operatore è obbligatorio | Bloccante |
| ERR_0008 | Il tipo operatore non è valido | Bloccante |
| ERR_0009 | Il codice dell’operatore non è valido | Bloccante |
| ERR_0010 | Il codice tipo fonte è obbligatorio | Bloccante |
| ERR_0011 | Il codice fonte è obbligatorio | Bloccante |
| ERR_0012 | Il codice tipo fonte non è valido | Bloccante |
| ERR_0013 | Il codice fonte non è valido | Bloccante |
| ERR_0014 | La data acquisizione è obbligatoria | Bloccante |
| ERR_0015 | La data acquisizione non è corretta. Il formato deve essere yyyymmddhhmmss | Bloccante |
| ERR_0016 | Il codice tipo consenso è obbligatorio | Bloccante |
| ERR_0017 | Il codice tipo consenso non è valido | Bloccante |
| ERR_0018 | Il codice sottotipo consenso è obbligatorio | Bloccante |
| ERR_0019 | Il codice sottotipo consenso non è valido | Bloccante |
| ERR_0020 | La descrizione sottotipo consenso è obbligatoria | Bloccante |
| ERR_0021 | La descrizione sottotipo consenso non è valida | Bloccante |
| ERR_0024 | Il codice ASR è obbligatorio | Bloccante |
| ERR_0025 | Il codice ASR non è valido | Bloccante |
| ERR_0027 | ID_AURA obbligatorio | Bloccante |
| ERR_0028 | ID_AURA e cf non corrispondono | Bloccante |
| AVV_0001 | Non è stato trovato nessun consenso da revocare | Avviso |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 24 di 45
REVOCA E NOTIFICA CONSENSO
5. Servizio <SRV-03>: NotificaAcquisizioneConsenso
5.1 Obiettivi
In questo capitolo è descritta la struttura dei messaggi inviati e restituiti dal servizio di Notifica acquisizione del
consenso esposto dall’ASR. Sia per il messaggio di Request che di Response sono riportate le strutture XML dei
messaggi e le informazioni relative per ogni tag.
5.2 Fruitori
Il fruitore del servizio è:
- CSI Piemonte
5.3 Struttura XML del messaggio di “request”
Nel presente paragrafo è riportata la struttura XML del messaggio inviato dal Modulo Regionale Gestione Consensi
alle ASR.
Ogni riga mostra un tag e la relativa numerosità, ovvero il numero di volte per il quale lo stesso tag può essere
ripetuto. Si precisa che la posizione del tag non deve essere alterata.
Tag XML Nume
rosi
tà
<soap:Envelope 1..1
xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
xmlns:con="http://consprefbe.csi.it/”>
<soap:Header/>
<soap:Body> 1..1
<con:notificaAcquisizioneConsensoRichiesta> 1..1
<requestId>?</requestId> 1..1
<codiceServizio>?</codiceServizio> 1..1
<cfRichiedente>?</cfRichiedente> 1..1
<idAura>?</idAura> 1..1
<cfDelegato>?</cfDelegato> 0..1
<operatore> 0..1
<con:tipoOperatore>?</con:tipoOperatore> 1..1
<con:codiceOperatore>?</con:codiceOperatore> 1..1
</operatore>
<fonte> 1..1

| Tag XML | Nume rosi tà |
| --- | --- |
| <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:con="http://consprefbe.csi.it/”> | 1..1 |
| <soap:Header/> |  |
| <soap:Body> | 1..1 |
| <con:notificaAcquisizioneConsensoRichiesta> | 1..1 |
| <requestId>?</requestId> | 1..1 |
| <codiceServizio>?</codiceServizio> | 1..1 |
| <cfRichiedente>?</cfRichiedente> | 1..1 |
| <idAura>?</idAura> | 1..1 |
| <cfDelegato>?</cfDelegato> | 0..1 |
| <operatore> | 0..1 |
| <con:tipoOperatore>?</con:tipoOperatore> | 1..1 |
| <con:codiceOperatore>?</con:codiceOperatore> | 1..1 |
| </operatore> |  |
| <fonte> | 1..1 |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 25 di 45
REVOCA E NOTIFICA CONSENSO
<con:codiceTipoFonte>?</con:codiceTipoFonte> 1..1
<con:codiceFonte>?</con:codiceFonte> 1..1
</fonte>
<dataAcquisizione></dataAcquisizione> 1..1
<codiceTipoConsenso>?</codiceTipoConsenso> 1..1
<codiceSottotipoConsenso>?</codiceSottotipoConsenso> 1..1
<descrizioneSottotipoConsenso>?</descrizioneSottotipoConse 1..1
nso>
<valoreConsenso>?</valoreConsenso> 1..1
<asr> 0..1
<con:codice>?</con:codice> 1..1
</asr>
</con:notificaAcquisizioneConsensoRichiesta>
</soap:Body>
</soap:Envelope>
5.4 Descrizione Tag del messaggio di “request”
Di seguito sono descritti i tag che costituiscono la parte variabile del messaggio, ovvero quelli presenti all’interno
del tag “request”.
requestId
Descrizione Corrisponde all‘identificativo univoco all’interno del sistema inviante generata dal
chiamante utile per la tracciatura della richiesta.
Obbligatorio SI
Note Utilizzato per risalire ad eventuali errori generati durante l’invio
codiceServizio
Descrizione Corrisponde all’identificativo univocodell’applicativo inviante.
Obbligatorio SI
Note
cfRichiedente
Descrizione Corrisponde al Codice Fiscale del cittadino che ha espresso il consenso.
Obbligatorio SI

| <con:codiceTipoFonte>?</con:codiceTipoFonte> | 1..1 |
| --- | --- |
| <con:codiceFonte>?</con:codiceFonte> | 1..1 |
| </fonte> |  |
| <dataAcquisizione></dataAcquisizione> | 1..1 |
| <codiceTipoConsenso>?</codiceTipoConsenso> | 1..1 |
| <codiceSottotipoConsenso>?</codiceSottotipoConsenso> | 1..1 |
| <descrizioneSottotipoConsenso>?</descrizioneSottotipoConse nso> | 1..1 |
| <valoreConsenso>?</valoreConsenso> | 1..1 |
| <asr> | 0..1 |
| <con:codice>?</con:codice> | 1..1 |
| </asr> |  |
| </con:notificaAcquisizioneConsensoRichiesta> |  |
| </soap:Body> |  |
| </soap:Envelope> |  |

| Descrizione | Corrisponde all‘identificativo univoco all’interno del sistema inviante generata dal chiamante utile per la tracciatura della richiesta. |
| --- | --- |
| Obbligatorio | SI |
| Note | Utilizzato per risalire ad eventuali errori generati durante l’invio |

| Descrizione | Corrisponde all’identificativo univocodell’applicativo inviante. |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Corrisponde al Codice Fiscale del cittadino che ha espresso il consenso. |
| --- | --- |
| Obbligatorio | SI |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 26 di 45
REVOCA E NOTIFICA CONSENSO
Note
idAura
Descrizione Corrisponde all’Identificativo AURA del cittadino che ha espresso il consenso.
Obbligatorio SI
Note
cfDelegato
Descrizione Corrisponde al Codice Fiscale della persona delegata dal Cittadino per conferire il consenso
Obbligatorio NO
Note
operatore
Descrizione Identifica l’operatore del Punto Assistito che ha effettuato l’operazione di acquisizione
consenso da parte del cittadino
Obbligatorio NO
Note
tipoOperatore (operatore)
Descrizione Identifica la tipologia di operatore che ha effettuato l’operazione di acquisizione consenso
Obbligatorio SI se il tag “codiceOperatore” è valorizzato
Note
codiceOperatore (operatore)
Descrizione Identifica il codice identificativo dell’operatore che ha effettuato l’operazione di
acquisizione consenso
Obbligatorio SI se il tag “tipoOperatore” è valorizzato
Note
fonte
Descrizione Identifica la fonte di acquisizione del consenso
Obbligatorio SI
Note

| Descrizione | Corrisponde all’Identificativo AURA del cittadino che ha espresso il consenso. |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Corrisponde al Codice Fiscale della persona delegata dal Cittadino per conferire il consenso |
| --- | --- |
| Obbligatorio | NO |
| Note |  |

| Descrizione | Identifica l’operatore del Punto Assistito che ha effettuato l’operazione di acquisizione consenso da parte del cittadino |
| --- | --- |
| Obbligatorio | NO |
| Note |  |

| Descrizione | Identifica la tipologia di operatore che ha effettuato l’operazione di acquisizione consenso |
| --- | --- |
| Obbligatorio | SI se il tag “codiceOperatore” è valorizzato |
| Note |  |

| Descrizione | Identifica il codice identificativo dell’operatore che ha effettuato l’operazione di acquisizione consenso |
| --- | --- |
| Obbligatorio | SI se il tag “tipoOperatore” è valorizzato |
| Note |  |

| Descrizione | Identifica la fonte di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 27 di 45
REVOCA E NOTIFICA CONSENSO
codiceTipoFonte
Descrizione Identifica il codice univoco della tipo fonte di acquisizione del consenso
Obbligatorio SI
Note I possibili codici del tipo fonte possono essere:
- Fonte Cittadino (codice tipo = CITT)
- Fonte Punto Assistito (codice tipo = PASS)
codiceFonte
Descrizione Identifica il codice univoco della fonte di acquisizione del consenso
Obbligatorio SI
Note I possibili codici della fonte possono essere i seguenti:
- WA_CITT: se il codiceTipoFonte è CITT
- WA_PASS: se il codiceTipoFonte è PASS
dataAcquisizione
Descrizione Corrisponde alla data di acquisizione del consenso
Obbligatorio SI
Note La data è espressa nel formato timestamp contenente la data e ora (yyyymmddhhmmss)
codiceTipoConsenso
Descrizione Identifica la tipologia del consenso
Obbligatorio SI
Note Può assumere i seguenti valori:
- A: aziendale
- R: regionale
codiceSottotipoConsenso
Descrizione Identifica la sottotipologia del consenso
Obbligatorio SI
Note Può assumere al momento il seguente valore:
- CPROL: Consenso Permanente al ROL
descrizioneSottotipoConsenso
Descrizione Corrisponde alla sottotipologia del consenso

| Descrizione | Identifica il codice univoco della tipo fonte di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | I possibili codici del tipo fonte possono essere: - Fonte Cittadino (codice tipo = CITT) - Fonte Punto Assistito (codice tipo = PASS) |

| Descrizione | Identifica il codice univoco della fonte di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | I possibili codici della fonte possono essere i seguenti: - WA_CITT: se il codiceTipoFonte è CITT - WA_PASS: se il codiceTipoFonte è PASS |

| Descrizione | Corrisponde alla data di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | La data è espressa nel formato timestamp contenente la data e ora (yyyymmddhhmmss) |

| Descrizione | Identifica la tipologia del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | Può assumere i seguenti valori: - A: aziendale - R: regionale |

| Descrizione | Identifica la sottotipologia del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | Può assumere al momento il seguente valore: - CPROL: Consenso Permanente al ROL |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 28 di 45
REVOCA E NOTIFICA CONSENSO
Obbligatorio SI
Note Se il codiceSottotipoConsenso = ‘CPROL’ la descrizione corrisponde a “Consenso
Permanente ROL”
valoreConsenso
Descrizione Corrispondono al valoredel consenso espresso dal cittadino
Obbligatorio SI
Note Può assumere i seguenti valori:
- SI
- NO
asr
Descrizione Corrisponde all’ASR destinataria del consenso indicato dal cittadino
Obbligatorio SI, solo il consenso è di tipo aziendale (codiceTipoConsenso = A)
Note
codice (asr)
Descrizione Identifica il codice ASRa cui si riferisce il consenso
Obbligatorio SI, solo il consenso è di tipo aziendale (codiceTipoConsenso = A)
Note Il tracciato utilizza il codice ISTAT dell’ASR sprovvisto del codice regione (es: 301
corrisponde all’ASR TO 1)
5.5 Struttura XML del messaggio di “response”
Nel presente paragrafo è riportata la struttura XML del messaggio restituito al Modulo Regionale Gestione Consensi.
Come per la struttura della request, ogni riga mostra un tag e la relativa numerosità, ovvero il numero di volte per il
quale lo stesso tag può essere ripetuto. Si precisa che la posizione del tag non deve essere alterata.
Tag XML Nume
rosi
tà
<soap:Envelope 1..1
xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
xmlns:con="http://consprefbe.csi.it/”>

| Obbligatorio | SI |
| --- | --- |
| Note | Se il codiceSottotipoConsenso = ‘CPROL’ la descrizione corrisponde a “Consenso Permanente ROL” |

| Descrizione | Corrispondono al valoredel consenso espresso dal cittadino |
| --- | --- |
| Obbligatorio | SI |
| Note | Può assumere i seguenti valori: - SI - NO |

| Descrizione | Corrisponde all’ASR destinataria del consenso indicato dal cittadino |
| --- | --- |
| Obbligatorio | SI, solo il consenso è di tipo aziendale (codiceTipoConsenso = A) |
| Note |  |

| Descrizione | Identifica il codice ASRa cui si riferisce il consenso |
| --- | --- |
| Obbligatorio | SI, solo il consenso è di tipo aziendale (codiceTipoConsenso = A) |
| Note | Il tracciato utilizza il codice ISTAT dell’ASR sprovvisto del codice regione (es: 301 corrisponde all’ASR TO 1) |

| Tag XML | Nume rosi tà |
| --- | --- |
| <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:con="http://consprefbe.csi.it/”> | 1..1 |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 29 di 45
REVOCA E NOTIFICA CONSENSO
<soap:Header/>
<soap:Body> 1..1
<con:notificaAcquisizioneConsensoRicevuta> 1..1
<con:esito>?</con:esito> 1..1
<con:elencoErrori> 0..1
<con:errore> 1..N
<con:codEsito>?</con:codEsito> 1..1
<con:esito>?</con:esito> 1..1
<con:tipoErrore>?</con:tipoErrore> 1..1
</con:errore>
</con:elencoErrori>
</con:notificaAcquisizioneConsensoRicevuta>
</soap:Body>
</soap:Envelope>
5.6 Descrizione Tag del messaggio di “response”
Di seguito sono descritti i tag che costituiscono la parte variabile del messaggio, ovvero quelli presenti all’interno
del tag “request”
esito
Descrizione Esito relativo all’acquisizione della notifica da parte dell’Azienda.
Verrà riportata l’indicazione di “errore bloccante” se il sistema informativo della Azienda
ha rilevato un errore bloccante che ha impedito allo stesso di acquisire l’informazione
comunicata.
Verrà riportata l’indicazione di “avviso (non bloccante)” se il sistema informativo della
Azienda ha rilevato al più un avviso non bloccante che non ha impedito allo stesso di
acquisire l’informazione comunicata.
Verrà riportata l’indicazione di “nessun errore o avviso” se il sistema informativo della
Azienda è riuscita ad acquisire i dati del consenso senza rilevare né errori né avvisi (in
questo caso non dovrà essere presente la componente elencoErrori sotto descritta).
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo7.1
elencoErrori
Descrizione Corrisponde alla lista di errori ottenuti come risposta dall’ASR
Obbligatorio Si solo nei casi specifici
Note Valorizzato solo se l’ASR non è riuscita ad acquisire la notificao per un eventuale errore di

| <soap:Header/> |  |
| --- | --- |
| <soap:Body> | 1..1 |
| <con:notificaAcquisizioneConsensoRicevuta> | 1..1 |
| <con:esito>?</con:esito> | 1..1 |
| <con:elencoErrori> | 0..1 |
| <con:errore> | 1..N |
| <con:codEsito>?</con:codEsito> | 1..1 |
| <con:esito>?</con:esito> | 1..1 |
| <con:tipoErrore>?</con:tipoErrore> | 1..1 |
| </con:errore> |  |
| </con:elencoErrori> |  |
| </con:notificaAcquisizioneConsensoRicevuta> |  |
| </soap:Body> |  |
| </soap:Envelope> |  |

| Descrizione | Esito relativo all’acquisizione della notifica da parte dell’Azienda. Verrà riportata l’indicazione di “errore bloccante” se il sistema informativo della Azienda ha rilevato un errore bloccante che ha impedito allo stesso di acquisire l’informazione comunicata. Verrà riportata l’indicazione di “avviso (non bloccante)” se il sistema informativo della Azienda ha rilevato al più un avviso non bloccante che non ha impedito allo stesso di acquisire l’informazione comunicata. Verrà riportata l’indicazione di “nessun errore o avviso” se il sistema informativo della Azienda è riuscita ad acquisire i dati del consenso senza rilevare né errori né avvisi (in questo caso non dovrà essere presente la componente elencoErrori sotto descritta). |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo7.1 |

| Descrizione | Corrisponde alla lista di errori ottenuti come risposta dall’ASR |
| --- | --- |
| Obbligatorio | Si solo nei casi specifici |
| Note | Valorizzato solo se l’ASR non è riuscita ad acquisire la notificao per un eventuale errore di |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 30 di 45
REVOCA E NOTIFICA CONSENSO
“avviso” che non ha impedito l’acquisizione della notifica
codEsito (elencoErrori)
Descrizione Corrisponde al codice dell’errore/avviso
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo 00
Il codice di errore ASR_ER_100 dovrà essere restituito dall’ASR solo nel caso in cui non sia
andata a buon fine l’acquisizione della notificada parte dell’ASR.
esito (elencoErrori)
Descrizione Corrisponde alla descrizione dell’erroresollevato
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo 00
tipoErrore (elencoErrori)
Descrizione Corrisponde alla tipologia di errore della notifica
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo7.2
Tabella CodEsito ed Esito
Codice Descrizione Tipo errore
ASR_ER_100 Errore nell’acquisizione della notifica Bloccante

| Descrizione | Corrisponde al codice dell’errore/avviso |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo 00 Il codice di errore ASR_ER_100 dovrà essere restituito dall’ASR solo nel caso in cui non sia andata a buon fine l’acquisizione della notificada parte dell’ASR. |

| Descrizione | Corrisponde alla descrizione dell’erroresollevato |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo 00 |

| Descrizione | Corrisponde alla tipologia di errore della notifica |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo7.2 |

| Codice | Descrizione | Tipo errore |
| --- | --- | --- |
| ASR_ER_100 | Errore nell’acquisizione della notifica | Bloccante |
|  |  |  |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 31 di 45
REVOCA E NOTIFICA CONSENSO
6. Servizio <SRV-04>: NotificaRevocaConsenso
6.1 Obiettivi
In questo capitolo è descritta la struttura dei messaggi inviati e restituiti dal servizio di Notifica Revoca del consenso
esposto dall’ASR. Sia per il messaggio di Request che di Response sono riportate le strutture XML dei messaggi e le
informazioni relative per ogni tag.
6.2 Fruitori
Il fruitore del servizio è:
- CSI Piemonte
6.3 Struttura XML del messaggio di “request”
Nel presente paragrafo è riportata la struttura XML del messaggio inviato dal Modulo Regionale Gestione Consensi.
Ogni riga mostra un tag e la relativa numerosità, ovvero il numero di volte per il quale lo stesso tag può essere ripetuto.
Si precisa che la posizione del tag non deve essere alterata.
Tag XML Nume
rosi
tà
<soap:Envelope 1..1
xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
xmlns:con="http://consprefbe.csi.it/”>
<soap:Header/>
<soap:Body> 1..1
<con:notificaRevocaConsensoRichiesta> 1..1
<requestId>?</requestId> 1..1
<codiceServizio>?</codiceServizio> 1..1
<cfRichiedente>?</cfRichiedente> 1..1
<idAura>?</idAura> 1..1
<cfDelegato>?</cfDelegato> 0..1
<operatore> 0..1
<con:tipoOperatore>?</con:tipoOperatore> 1..1
<con:codiceOperatore>?</con:codiceOperatore> 1..1
<operatore>
<fonte> 1..1
<con:codiceTipoFonte>?</con:codiceTipoFonte> 1..1

| Tag XML | Nume rosi tà |
| --- | --- |
| <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:con="http://consprefbe.csi.it/”> | 1..1 |
| <soap:Header/> |  |
| <soap:Body> | 1..1 |
| <con:notificaRevocaConsensoRichiesta> | 1..1 |
| <requestId>?</requestId> | 1..1 |
| <codiceServizio>?</codiceServizio> | 1..1 |
| <cfRichiedente>?</cfRichiedente> | 1..1 |
| <idAura>?</idAura> | 1..1 |
| <cfDelegato>?</cfDelegato> | 0..1 |
| <operatore> | 0..1 |
| <con:tipoOperatore>?</con:tipoOperatore> | 1..1 |
| <con:codiceOperatore>?</con:codiceOperatore> | 1..1 |
| <operatore> |  |
| <fonte> | 1..1 |
| <con:codiceTipoFonte>?</con:codiceTipoFonte> | 1..1 |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 32 di 45
REVOCA E NOTIFICA CONSENSO
<con:codiceFonte>?</con:codiceFonte> 1..1
</fonte>
<dataAcquisizione></dataAcquisizione>
<codiceTipoConsenso>?</codiceTipoConsenso> 1..1
<codiceSottotipoConsenso>?</codiceSottotipoConsenso> 1..1
<descrizioneSottotipoConsenso>?</descrizioneSottotipoConse 1..1
nso>
<asr> 0..1
<con:codice>?</con:codice> 1..1
</asr>
</con:notificaRevocaConsensoRichiesta>
</soap:Body>
</soap:Envelope>
6.4 Descrizione Tag del messaggio di “request”
Di seguito sono descritti i tag che costituiscono la parte variabile del messaggio, ovvero quelli presenti all’interno
del tag “request”.
requestId
Descrizione Corrisponde all‘identificativo univoco all’interno del sistema inviante generata dal
chiamante utile per la tracciatura dellarichiesta.
Obbligatorio SI
Note Utilizzato per risalire ad eventuali errori generati durante l’invio
codiceServizio
Descrizione Corrisponde all’identificativo univocodell’applicativo inviante.
Obbligatorio SI
Note
cfRichiedente
Descrizione Corrisponde al Codice Fiscale del cittadino che ha revocatoil consenso.
Obbligatorio SI
Note

| <con:codiceFonte>?</con:codiceFonte> | 1..1 |
| --- | --- |
| </fonte> |  |
| <dataAcquisizione></dataAcquisizione> |  |
| <codiceTipoConsenso>?</codiceTipoConsenso> | 1..1 |
| <codiceSottotipoConsenso>?</codiceSottotipoConsenso> | 1..1 |
| <descrizioneSottotipoConsenso>?</descrizioneSottotipoConse nso> | 1..1 |
| <asr> | 0..1 |
| <con:codice>?</con:codice> | 1..1 |
| </asr> |  |
| </con:notificaRevocaConsensoRichiesta> |  |
| </soap:Body> |  |
| </soap:Envelope> |  |

| Descrizione | Corrisponde all‘identificativo univoco all’interno del sistema inviante generata dal chiamante utile per la tracciatura dellarichiesta. |
| --- | --- |
| Obbligatorio | SI |
| Note | Utilizzato per risalire ad eventuali errori generati durante l’invio |

| Descrizione | Corrisponde all’identificativo univocodell’applicativo inviante. |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Corrisponde al Codice Fiscale del cittadino che ha revocatoil consenso. |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 33 di 45
REVOCA E NOTIFICA CONSENSO
idAura
Descrizione Corrisponde all’Identificativo AURA del cittadino che ha espresso il consenso.
Obbligatorio SI
Note
cfDelegato
Descrizione Corrisponde al Codice Fiscale della persona delegata dal Cittadino per revocare il consenso
Obbligatorio NO
Note
operatore
Descrizione Identifica l’operatore del Punto Assistito che ha effettuato l’operazione di revoca consenso
da parte del cittadino
Obbligatorio NO
Note
tipoOperatore (operatore)
Descrizione Identifica la tipologia di operatore che ha effettuato l’operazione di revoca consenso
Obbligatorio SI se il tag “codiceOperatore” è valorizzato
Note
codiceOperatore (operatore)
Descrizione Identifica il codice identificativo dell’operatore che ha effettuato l’operazione di revoca
consenso
Obbligatorio SI se il tag “tipoOperatore” è valorizzato
Note
fonte
Descrizione Identifica la fonte di acquisizione del consenso
Obbligatorio SI
Note

| Descrizione | Corrisponde all’Identificativo AURA del cittadino che ha espresso il consenso. |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Corrisponde al Codice Fiscale della persona delegata dal Cittadino per revocare il consenso |
| --- | --- |
| Obbligatorio | NO |
| Note |  |

| Descrizione | Identifica l’operatore del Punto Assistito che ha effettuato l’operazione di revoca consenso da parte del cittadino |
| --- | --- |
| Obbligatorio | NO |
| Note |  |

| Descrizione | Identifica la tipologia di operatore che ha effettuato l’operazione di revoca consenso |
| --- | --- |
| Obbligatorio | SI se il tag “codiceOperatore” è valorizzato |
| Note |  |

| Descrizione | Identifica il codice identificativo dell’operatore che ha effettuato l’operazione di revoca consenso |
| --- | --- |
| Obbligatorio | SI se il tag “tipoOperatore” è valorizzato |
| Note |  |

| Descrizione | Identifica la fonte di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 34 di 45
REVOCA E NOTIFICA CONSENSO
codiceTipoFonte
Descrizione Identifica il codice univoco della tipo fonte di acquisizione del consenso
Obbligatorio SI
Note I possibili codici del tipo fonte possono essere:
- Fonte Cittadino (codice tipo = CITT)
- Fonte Punto Assistito (codice tipo = PASS)
codiceFonte
Descrizione Identifica il codice univoco della fonte di acquisizione del consenso
Obbligatorio SI
Note I possibili codici della fonte possono essere i seguenti:
- WA_CITT: se il codiceTipoFonte è CITT
- WA_PASS: se il codiceTipoFonte è PASS
dataAcquisizione
Descrizione Corrisponde alla data di acquisizione della revoca del consenso
Obbligatorio SI
Note La data è espressa nel formato timestamp contenente la data e ora (yyyymmddhhmmss)
codiceTipoConsenso
Descrizione Identifica la tipologia del consenso
Obbligatorio SI
Note Può assumere i seguenti valori:
- A: aziendale
- R: regionale
codiceSottotipoConsenso
Descrizione Identifica la sottotipologia del consenso
Obbligatorio SI
Note Può assumere al momento il seguente valore:
- CPROL: Consenso Permanente al ROL
descrizioneSottotipoConsenso
Descrizione Corrisponde alla sottotipologia del consenso

| Descrizione | Identifica il codice univoco della tipo fonte di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | I possibili codici del tipo fonte possono essere: - Fonte Cittadino (codice tipo = CITT) - Fonte Punto Assistito (codice tipo = PASS) |

| Descrizione | Identifica il codice univoco della fonte di acquisizione del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | I possibili codici della fonte possono essere i seguenti: - WA_CITT: se il codiceTipoFonte è CITT - WA_PASS: se il codiceTipoFonte è PASS |

| Descrizione | Corrisponde alla data di acquisizione della revoca del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | La data è espressa nel formato timestamp contenente la data e ora (yyyymmddhhmmss) |

| Descrizione | Identifica la tipologia del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | Può assumere i seguenti valori: - A: aziendale - R: regionale |

| Descrizione | Identifica la sottotipologia del consenso |
| --- | --- |
| Obbligatorio | SI |
| Note | Può assumere al momento il seguente valore: - CPROL: Consenso Permanente al ROL |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 35 di 45
REVOCA E NOTIFICA CONSENSO
Obbligatorio SI
Note Se il codiceSottotipoConsenso = ‘CPROL’ la descrizione corrisponde a “Consenso
Permanente ROL”
asr
Descrizione Corrisponde all’ASR destinataria della revoca delconsenso indicato dal cittadino
Obbligatorio SI, solo il consenso è di tipo aziendale (codiceTipoConsenso = A)
Note
codice (asr)
Descrizione Identifica il codice ASR a cui si riferiscela revoca delconsenso
Obbligatorio SI, solo il consenso è di tipo aziendale (codiceTipoConsenso = A)
Note Il tracciato utilizza il codice ISTAT dell’ASR sprovvisto del codice regione (es: 301
corrisponde all’ASR TO 1)
6.5 Struttura XML del messaggio di “response”
Nel presente paragrafo è riportata la struttura XML del messaggio restituito al Modulo Regionale Gestione Consensi.
Come per la struttura della request, ogni riga mostra un tag e la relativa numerosità, ovvero il numero di volte per il
quale lo stesso tag può essere ripetuto. Si precisa che la posizione del tag non deve essere alterata.
Tag XML Nume
rosi
tà
<soap:Envelope 1..1
xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
xmlns:con="http://consprefbe.csi.it/”>
<soap:Header/>
<soap:Body> 1..1
<con:notificaRevocaConsensoRicevuta> 1..1
</con:esito>?</con:esito> 1..1
</con:elencoErrori> 0..1
<con:errore> 1..N
<con:codEsito>?</con:codEsito> 1..1

| Obbligatorio | SI |
| --- | --- |
| Note | Se il codiceSottotipoConsenso = ‘CPROL’ la descrizione corrisponde a “Consenso Permanente ROL” |

| Descrizione | Corrisponde all’ASR destinataria della revoca delconsenso indicato dal cittadino |
| --- | --- |
| Obbligatorio | SI, solo il consenso è di tipo aziendale (codiceTipoConsenso = A) |
| Note |  |

| Descrizione | Identifica il codice ASR a cui si riferiscela revoca delconsenso |
| --- | --- |
| Obbligatorio | SI, solo il consenso è di tipo aziendale (codiceTipoConsenso = A) |
| Note | Il tracciato utilizza il codice ISTAT dell’ASR sprovvisto del codice regione (es: 301 corrisponde all’ASR TO 1) |

| Tag XML | Nume rosi tà |
| --- | --- |
| <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:con="http://consprefbe.csi.it/”> | 1..1 |
| <soap:Header/> |  |
| <soap:Body> | 1..1 |
| <con:notificaRevocaConsensoRicevuta> | 1..1 |
| </con:esito>?</con:esito> | 1..1 |
| </con:elencoErrori> | 0..1 |
| <con:errore> | 1..N |
| <con:codEsito>?</con:codEsito> | 1..1 |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 36 di 45
REVOCA E NOTIFICA CONSENSO
<con:esito>?</con:esito> 1..1
<con:tipoErrore>?</con:tipoErrore> 1..1
</con:errore>
</con:elencoErrori>
</con:notificaRevocaConsensoRicevuta>
</soap:Body>
</soap:Envelope>
6.6 Descrizione Tag del messaggio di “response”
Di seguito sono descritti i tag che costituiscono la parte variabile del messaggio, ovvero quelli presenti all’interno
del tag “request”
esito
Descrizione Esito relativo all’acquisizione della notifica da parte dell’Azienda.
Verrà riportata l’indicazione di “errore bloccante” se il sistema informativo della Azienda
ha rilevato un errore bloccante che ha impedito allo stesso di acquisire l’informazione
comunicata.
Verrà riportata l’indicazione di “avviso (non bloccante)” se il sistema informativo della
Azienda ha rilevato al più un avviso non bloccante che non ha impedito allo stesso di
acquisire l’informazione comunicata.
Verrà riportata l’indicazione di “nessun errore o avviso” se il sistema informativo della
Azienda è riuscita ad acquisire i dati del consenso senza rilevare né errori né avvisi (in
questo caso non dovrà essere presente la componente elencoErrori sotto descritta).
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo 7.1
elencoErrori
Descrizione Corrisponde alla lista di errori ottenuti come risposta dall’ASR
Obbligatorio Si solo nei casi specifici
Note Valorizzato solo se l’ASR non è riuscita ad acquisire la notifica o per un eventuale errore di
“avviso” che non ha impedito l’acquisizione della notifica
codEsito (elencoErrori)
Descrizione Corrisponde al codice dell’errore/avviso
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo 0

| <con:esito>?</con:esito> | 1..1 |
| --- | --- |
| <con:tipoErrore>?</con:tipoErrore> | 1..1 |
| </con:errore> |  |
| </con:elencoErrori> |  |
| </con:notificaRevocaConsensoRicevuta> |  |
| </soap:Body> |  |
| </soap:Envelope> |  |

| Descrizione | Esito relativo all’acquisizione della notifica da parte dell’Azienda. Verrà riportata l’indicazione di “errore bloccante” se il sistema informativo della Azienda ha rilevato un errore bloccante che ha impedito allo stesso di acquisire l’informazione comunicata. Verrà riportata l’indicazione di “avviso (non bloccante)” se il sistema informativo della Azienda ha rilevato al più un avviso non bloccante che non ha impedito allo stesso di acquisire l’informazione comunicata. Verrà riportata l’indicazione di “nessun errore o avviso” se il sistema informativo della Azienda è riuscita ad acquisire i dati del consenso senza rilevare né errori né avvisi (in questo caso non dovrà essere presente la componente elencoErrori sotto descritta). |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo 7.1 |

| Descrizione | Corrisponde alla lista di errori ottenuti come risposta dall’ASR |
| --- | --- |
| Obbligatorio | Si solo nei casi specifici |
| Note | Valorizzato solo se l’ASR non è riuscita ad acquisire la notifica o per un eventuale errore di “avviso” che non ha impedito l’acquisizione della notifica |

| Descrizione | Corrisponde al codice dell’errore/avviso |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo 0 |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 37 di 45
REVOCA E NOTIFICA CONSENSO
Il codice di errore ASR_ER_100 dovrà essere restituito dall’ASR solo nel caso in cui non sia
andata a buon fine l’acquisizione della notifica da parte dell’ASR.
esito (elencoErrori)
Descrizione Corrisponde alla descrizione dell’errore sollevato
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo 0
tipoErrore (elencoErrori)
Descrizione Corrisponde alla tipologia di errore della notifica
Obbligatorio SI solo se l’ASR non è riuscita ad acquisire la notifica
Note I valori ammessi sono riportati nel paragrafo 7.2
Tabella CodEsito ed Esito
Codice Descrizione Tipo errore
ASR_ER_100 Errore nell’acquisizione della notifica Bloccante
7. Codici di errori
In questo capitolo sono elencate le codifiche degli errori ammessi.
7.1 Esiti
Codice Descrizione
0000 Nessun errore o avviso
0001 Avviso (non bloccante)
9999 Errore (bloccante)

| Descrizione | Corrisponde alla descrizione dell’errore sollevato |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo 0 |

| Descrizione | Corrisponde alla tipologia di errore della notifica |
| --- | --- |
| Obbligatorio | SI solo se l’ASR non è riuscita ad acquisire la notifica |
| Note | I valori ammessi sono riportati nel paragrafo 7.2 |

| Codice | Descrizione | Tipo errore |
| --- | --- | --- |
| ASR_ER_100 | Errore nell’acquisizione della notifica | Bloccante |
|  |  |  |

| Codice | Descrizione |
| --- | --- |
| 0000 | Nessun errore o avviso |
| 0001 | Avviso (non bloccante) |
| 9999 | Errore (bloccante) |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 38 di 45
REVOCA E NOTIFICA CONSENSO
7.2 TipoErrore
Codice Descrizione
Successo Nessun errore o avviso
Avviso Avviso (non bloccante)
Bloccante Errore (bloccante)
8. Servizio <SRV-05>: VerificaServizio
8.1 Obiettivi
In questo capitolo è descritta la struttura dei messaggi inviati e restituiti dal servizio di Verifica del Servizio.
Tale servizio deve essere implementato sia dal sistema regionale che dalle ASR. Sia per il messaggio di Request che
di Response sono riportate le strutture XML dei messaggi e le informazioni relative per ogni tag.
8.2 Fruitori
I fruitori del servizio sono:
- CSI Piemonte:
- ASR
8.3 Struttura XML del messaggio di “request”
Nel presente paragrafo è riportata la struttura XML del messaggio inviato per la verifica del servizio
Ogni riga mostra un tag e la relativa numerosità, ovvero il numero di volte per il quale lo stesso tag può essere
ripetuto. Si precisa che la posizione del tag non deve essere alterata.
Tag XML Nume
rosi
tà
<soap:Envelope 1..1
xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
xmlns:con="http://consprefbe.csi.it/”>
<soap:Header/>
<soap:Body> 1..1

| Codice | Descrizione |
| --- | --- |
| Successo | Nessun errore o avviso |
| Avviso | Avviso (non bloccante) |
| Bloccante | Errore (bloccante) |

| Tag XML | Nume rosi tà |
| --- | --- |
| <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:con="http://consprefbe.csi.it/”> | 1..1 |
| <soap:Header/> |  |
| <soap:Body> | 1..1 |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 39 di 45
REVOCA E NOTIFICA CONSENSO
<con:verificaServizio> 1..1
<requestId>?</requestId> 1..1
<codiceServizio>?</codiceServizio> 1..1
</con:verificaServizio>
</soap:Body>
</soap:Envelope>
8.4 Descrizione Tag del messaggio di “request”
Di seguito sono descritti i tag che costituiscono la parte variabile del messaggio, ovvero quelli presenti all’interno
del tag “request”.
requestId
Descrizione Corrisponde all‘identificativo univoco all’interno del sistema inviante generata dal
chiamante utile per la tracciatura della richiesta.
Obbligatorio SI
Note Di tipo UUID (identificativo univoco universale)
codiceServizio
Descrizione Corrisponde all’identificativo univocodell’applicativo inviante.
Obbligatorio SI
Note Il codice deve essere concordato con CSI
8.5 Struttura XML del messaggio di “response”
Nel presente paragrafo è riportata la struttura XML del messaggio restituito all’acquisizione di un consenso.
Come per la struttura della request, ogni riga mostra un tag e la relativa numerosità, ovvero il numero di volte per il
quale lo stesso tag può essere ripetuto. Si precisa che la posizione del tag non deve essere alterata.
Tag XML Nume
rosi
tà
<soap:Envelope 1..1
xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
xmlns:con="http://consprefbe.csi.it/”>

| <con:verificaServizio> | 1..1 |
| --- | --- |
| <requestId>?</requestId> | 1..1 |
| <codiceServizio>?</codiceServizio> | 1..1 |
| </con:verificaServizio> |  |
| </soap:Body> |  |
| </soap:Envelope> |  |

| Descrizione | Corrisponde all‘identificativo univoco all’interno del sistema inviante generata dal chiamante utile per la tracciatura della richiesta. |
| --- | --- |
| Obbligatorio | SI |
| Note | Di tipo UUID (identificativo univoco universale) |

| Descrizione | Corrisponde all’identificativo univocodell’applicativo inviante. |
| --- | --- |
| Obbligatorio | SI |
| Note | Il codice deve essere concordato con CSI |

| Tag XML | Nume rosi tà |
| --- | --- |
| <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:con="http://consprefbe.csi.it/”> | 1..1 |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 40 di 45
REVOCA E NOTIFICA CONSENSO
<soap:Header/>
<soap:Body> 1..1
<con:verificaServizioRicevuta> 1..1
<con:esito>?</con:esito> 1..1
<con:codiceServizio>?</con:codiceServizio> 1..1
<con:versione>?</con:versione > 1..1
<con:timestamp>?</con:timestamp > 1..1
</con:verificaServizioRicevuta>
</soap:Body>
</soap:Envelope>
8.6 Descrizione Tag del messaggio di “response”
Di seguito sono descritti i tag che costituiscono la parte variabile del messaggio, ovvero quelli presenti all’interno
del tag “request”
esito
Descrizione Esito relativo al riconoscimento del servizio chiamante
Obbligatorio SI
Note I valori ammessi sono riportati nel paragrafo 7.1 (ad oggi non necessario avviso 0001)
codiceServizio
Descrizione Codice del Servizio ricevente
Obbligatorio SI
Note
versione
Descrizione Corrisponde alla versione del wsdl implementato
Obbligatorio SI
Note Ad oggi 1.0
timestamp
Descrizione Corrisponde al timestamp del sistema chiamato
Obbligatorio SI
Note Deve essere generato con lo stesso algoritmo utilizzato per il campo dataAcquisizione(utile

| <soap:Header/> |  |
| --- | --- |
| <soap:Body> | 1..1 |
| <con:verificaServizioRicevuta> | 1..1 |
| <con:esito>?</con:esito> | 1..1 |
| <con:codiceServizio>?</con:codiceServizio> | 1..1 |
| <con:versione>?</con:versione > | 1..1 |
| <con:timestamp>?</con:timestamp > | 1..1 |
| </con:verificaServizioRicevuta> |  |
| </soap:Body> |  |
| </soap:Envelope> |  |

| Descrizione | Esito relativo al riconoscimento del servizio chiamante |
| --- | --- |
| Obbligatorio | SI |
| Note | I valori ammessi sono riportati nel paragrafo 7.1 (ad oggi non necessario avviso 0001) |

| Descrizione | Codice del Servizio ricevente |
| --- | --- |
| Obbligatorio | SI |
| Note |  |

| Descrizione | Corrisponde alla versione del wsdl implementato |
| --- | --- |
| Obbligatorio | SI |
| Note | Ad oggi 1.0 |

| Descrizione | Corrisponde al timestamp del sistema chiamato |
| --- | --- |
| Obbligatorio | SI |
| Note | Deve essere generato con lo stesso algoritmo utilizzato per il campo dataAcquisizione(utile |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 41 di 45
REVOCA E NOTIFICA CONSENSO
per verifica del fuso orario)
9. Allineamento massivo (pregresso)
9.1 Obiettivi
In questo capitolo è descritta la struttura del tracciato CSV fornito da CSI Piemonte, su richiesta dell’ASR, allo scopo
di riallineare l’elenco dei consensi, forniti all’interno della stessa Azienda, nel Gestore dei consensi aziendale o nel
singolo dipartimentale.
Tale scarico da parte di CSI Piemonte potrà essere richiesto esclusivamente a seguito di una nuova installazione (di
gestore consensi o nuovo dipartimentale) successivo all’avvio del Modulo Regionale di Gestione Consensi.
9.2 Struttura del tracciato
Il tracciato verrà fornito in un unico file testuale, con separatore di campo, descritto di seguito:
<cfRichiedente>;<idAura>;<dataAcquisizione>;<codiceTipoConsenso>;<codiceSottotipoConsenso>;<valor
eConsenso>;<codiceASR>;
9.3 Descrizione dei campi
Nome campo Descrizione
cfRichiedente Corrisponde al Codice Fiscale del cittadino che ha revocato il consenso.
idAura Corrisponde all’Identificativo AURA del cittadino che ha espresso il consenso.
dataAcquisizione Corrisponde alla data di acquisizione della revoca del consenso.
codiceTipoConsenso Identifica la tipologia del consenso.
codiceSottotipoConsenso Identifica la sottotipologia del consenso.
codiceASR Identifica il codice ASR a cui si riferisce la revoca del consenso.
10. Requisiti di sicurezza
10.1 Servizi esposti verso le ASR
I servizi esposti da CSI alle ASR dovranno rispettare le stesse caratteristiche adottate ad esempio nel contesto del
Fascicolo Regionale. Tali servizi dovranno rispondere allo standard Webservice SOAP e dovranno essere esposti in
HTTPS, con autenticazione WS-Security (profile: Sign and Encrypt - X509 Authentication con Timestamp).
Il sistema dovrà autorizzare all’utilizzo dei servizi SOAP solo i client Autorizzati (ogni ASR avrà un certificato per
ogni sistema).
Il certificato usato sarà quello già previsto dal servizio SOAP di alimentazione del FSE: RegistraEpisodio3
Dovrà essere verificato che il certificato utilizzato corrisponda al sistema associato, tale associazione dovrà essere
gestita da configurazione sul database.

| Nome campo | Descrizione |
| --- | --- |
| cfRichiedente | Corrisponde al Codice Fiscale del cittadino che ha revocato il consenso. |
| idAura | Corrisponde all’Identificativo AURA del cittadino che ha espresso il consenso. |
| dataAcquisizione | Corrisponde alla data di acquisizione della revoca del consenso. |
| codiceTipoConsenso | Identifica la tipologia del consenso. |
| codiceSottotipoConsenso | Identifica la sottotipologia del consenso. |
| codiceASR | Identifica il codice ASR a cui si riferisce la revoca del consenso. |

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 42 di 45
REVOCA E NOTIFICA CONSENSO
Dovrà essere possibile gestire nei periodi di rinnovo dei certificati la possibilità di accettare le chiamate
contemporaneamente sia dal precedente certificato sia da quello rinnovato, sino alla scadenza del precedente
certificato.
10.2 Servizi esposti dalle ASR
Per i servizi in uscita, ossia quelli che dovranno esporre le ASR per ricevere le notifiche, dovrà essere gestito in
maniera parametrica il timeout alla chiamata.
Il sistema dovrà chiamare i servizi esposti dalle ASR applicando la sicurezza SSL Client Authentication con stesso
certificato indipendentemente dall’ASR contattata.
Il sistema dovrà gestire l’elenco dei certificati server affidabili che contatta (truststore del HTTPS).
Dovranno essere tracciati tutti i messaggi relative alle chiamate in uscita e le relative risposte ricevute nella loro forma
originale, senza alterazioni o trasformazioni adoperate dalle piattaforme di middleware.
I messaggi in uscita (e le relative risposte) dato che non contengono informazioni soggette a trattamenti speciali,
potranno essere tracciati in chiaro.
Il sistema dovrà essere implementato in maniera tale che i malfunzionamenti o i rallentamenti dei sistemi dell’ASR
non causino il degrado delle prestazioni del sistema stesso.
10.3 Servizi interni
I servizi SOAP interni al sistema, dovranno implementare la basic authentication.
Fare riferimento alle linee guida di sviluppo per maggiori dettagli.

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 43 di 45
REVOCA E NOTIFICA CONSENSO
11. Sequence Diagram
In questo capitolo vengono riportati alcuni casi d’uso rappresentati mediante diagrammi di sequenza.
Si precisa che il comportamento all’interno dell’ASR (dispatch fra MAGC e dipartimentali) è riportato a titolo
meramente esemplificativo e non vincolante.
La responsabilità del MRGC si limita alla notifica (verso l’ASR) degli end-point a cui l’ASR si è sottoscritta.
In presenza di MAGC, il Modulo Regionale provvederà a notificare esclusivamente al Modulo Aziendale Gestione
Consensi e sarà responsabilità di quest’ultimo notificare ai propri dipartimentali.
Abbreviazioni utilizzate:
MRGC: Modulo Regionale Gestione Consensi
MAGC: Modulo Aziendale Gestione Consensi
11.1 Espressione consenso da WebApp Cittadino

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 44 di 45
REVOCA E NOTIFICA CONSENSO
11.2 Espressione consenso da dipartimentale in ASR con MAGC

---

MODULO REGIONALE GESTIONE CONSENSI
Specifica-
WebService_ConsensoRegional
SPECIFICA DEI SERVIZI ACQUISIZIONE- eAziendale_v03.docx
Pag. 45 di 45
REVOCA E NOTIFICA CONSENSO
11.3 Espressione consenso da dipartimentale in ASR senza MAGC
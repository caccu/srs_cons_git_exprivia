---
{"dg-publish":true,"permalink":"/raw/acc-del-cdu-01-v01-servizi-acquisizione-consensi-2/","dg-note-properties":{}}
---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 1 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
FASCICOLO SANITARIO ELETTRONICO
Modulo Gestione Consensi
LOTTO1
Servizio Gestione Consensi
VERIFICHE E APPROVAZIONI
CONTROLLO AUTORIZZAZIONE
VERS. REDAZIONE APPROVAZIONE EMISSIONE
NOME DATA NOME DATA NOME DATA
01 CELORIA 20/03/2019
STATO DELLE VARIAZIONI
VERS. PARAGRAFO O DESCRIZIONE DELLA VARIAZIONE
PAGINA
01 Intero documento Versione iniziale
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

| VERS. | REDAZIONE |  | CONTROLLO APPROVAZIONE |  |  |  |  | AUTORIZZAZIONE EMISSIONE |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | NOME | DATA | NOME |  | DATA |  |  | NOME | DATA |
| 01 |  |  |  |  |  |  |  | CELORIA | 20/03/2019 |
|  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |

| VERS. | PARAGRAFO O PAGINA | DESCRIZIONE DELLA VARIAZIONE |
| --- | --- | --- |
| 01 | Intero documento | Versione iniziale |
|  |  |  |
|  |  |  |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 2 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
INDICE
1. Scopo e riferimenti del documento 3
1.1 Scopo del documento 3
1.2 Riferimenti 3
2. Servizio Gestione Consensi 4
2.1 Obiettivi 4
2.1.1 Descrizione del servizio 4
2.2 Modalità di richiamo 4
2.3 Descrizione dell’interfaccia del servizio 5
2.3.1 Operazione DA01:acquisizioneConsenso (acquisizioneConsensoService) 5
2.3.2 Operazione DA02:revocaConsenso (revocaConsensoService) 10
2.3.3 Operazione DA03:consultazioneConsenso (consultazioneConsensoService) 15
2.3.4 Operazione DA03:consultazioneInformativa (consultazioneInformativaConsensoService) 20
2.4 Algoritmi e servizi per i controlli 24
2.4.1 Struttura DataBase 24
2.4.2 Errori 25
2.4.3 Audit 26
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 3 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
1. Scopo e riferimenti del documento
1.1 Scopo del documento
Questo documento contiene il dettaglio dei requisiti che il servizio GESTIONE CONSENSI dovrà soddisfare per
essere accettato dal committente.
Destinatari del documento sono tutti i partecipanti al gruppo di progetto.
1.2 Riferimenti
Num. Riferimento Descrizione
[1] FSE – SoL Regione Piemonte
“GESTIONE DELEGHE
E CONSENSI
SANITÀ ELETTRONICA”
[2] AURA--SER-01-V18-Ricerca Profilo
Anagrafico
[3]
[4]
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

|  | Num. |  |  | Riferimento |  |  | Descrizione |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [1] |  |  | FSE – SoL Regione Piemonte “GESTIONE DELEGHE E CONSENSI SANITÀ ELETTRONICA” |  |  |  |  |  |
| [2] |  |  | AURA--SER-01-V18-Ricerca Profilo Anagrafico |  |  |  |  |  |
| [3] |  |  |  |  |  |  |  |  |
| [4] |  |  |  |  |  |  |  |  |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 4 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
2. Servizio Gestione Consensi
2.1 Obiettivi
2.1.1 Descrizione del servizio
Il servizio consente di gestire il ciclo di vita dei consensi (Acquisizione, Revoca, etc. ) di un cittadino piemontese.
La registrazione del consenso del cittadino avviene attraverso un applicativo verticale presso ASR.
La totalità dei consensi deve essere raccolta all’ interno del Modulo Regionale Gestione Consensi.
2.2 Modalità di richiamo
Il servizio viene richiesto in modalità sincrona dai canali web app per il cittadino e per il punto assistito al modulo
Regionale Gestione Consensi, mentre viene richiamato in modalità asincrona da Modulo Generale Gestione
Consensi a tutte le ASR.
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 5 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
2.3 Descrizione dell’interfaccia del servizio
2.3.1 Operazione DA01:acquisizioneConsenso (acquisizioneConsensoService)
2.3.1.1 Descrizione dell’operazione
Consente ai cittadini piemontesi di attivare un consenso permanente ROL o altro tipo di consenso o di attivare il
delegato di un cittadino piemontese al servizio permanente ROL o altro.
2.3.1.2 Dettaglio passi Operazione
Descrizione dei passi:
1. Log: chiamata servizio
All’attivazione del servizio vengono tracciate le informazioni di inizio elaborazione nella tabella dei log
(csi_log_audit).
2. Controllo formale e di merito sui campi di input:
Codice fiscale richiedente:
il codice fiscale del cittadino richiedente deve essere valorizzato diversamente impostare esito ko e
codice di errore 0001 su risposta (ved. Tabella riepilogativa errori)
eseguire i controlli formali sul campo se errato esito ko e errore 0017
se i controlli vengono superati con il codice fiscale del cittadino richiedente accedere ad AURA:
• per trovato si acquisiscono i campi nome , cognome e id_aura (idProfiloAnagrafico) e si passa
al controllo successivo
• per non trovato impostare esito ko e codice di errore 0002 su risposta (ved. Tabella riepilogativa
errori)
Codice fiscale delegato: il campo non è obbligatorio, quindi solo se valorizzato deve essere diverso dal codice
fiscale richiedente altrimenti esito ko e codice errore 0018, eseguire i controlli sintattici del campo codice
fiscale se non vengono superati esito ko e codice di errore 0003 su risposta (ved. Tabella riepilogativa errori)
Operatore (codice e tipo):i campi non sono obbligatori, se valorizzati però devono nessere chiave della
tabella CONS_D_OPERATORE da cui acquisire il campo operatore _id, per non trovato impostare esito ko
e codice di errore 0004 su risposta (ved. Tabella riepilogativa errori).
Fonte: (codice tipo fonte e codice fonte) campi obbligatori:
• se non valorizzati impostare esito ko e codice errore 0013
• Accedere in tabella CONS_D_TIPO_FONTE con key = codiceTipoFonte per non trovato
impostare esito ko e codice di errore 0007 su risposta, per trovato acquisire tipo_fonte_id.
• Accedere alla tabella CONS_D_FONTE con chiave tipo_fonte_id e fonte_cod = codiceFonte
per trovato acquisire il campo fonte_id per non trovato impostare esito ko e codice di errore
0008 su risposta.
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 6 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
Data acquisizione: campo obbligatorio, se non valorizzato impostare esito ko e codice di errore 0005 su
risposta.
Se valorizzato verificare la correttezza sintattica del campo se i controlli non vengono superati impostare
esito ko e codice di errore 0006 su risposta.
Codice Tipo consenso: campo obbligatorio se non valorizzato impostare esito ko e codice di errore 0009 su
risposta.
Verificare che il campo tipo consenso sia una chiave della tabella CONS_D_TIPO_CONS per non trovato
impostare esito ko e codice di errore 0011 su risposta.
Codice Sottotipo consenso: campo obbligatorio se non valorizzato impostare esito ko e codice di errore
0010 su risposta.
Verificare che il campo sottotipo consenso sia una chiave della tabella CONS_D_SOTTO_TIPO_CONS per
non trovato impostare esito ko e codice di errore 0012 su risposta.
Descrizione sotto tipo consenso il campo viene trasmesso nell’ acquisizione consenso ma su di esso non si
effettua nessun controllo.
A questo punto verificata la correttezza formale e di merito dei campi presenti sulla richiesta si analizzano i
consensi dati, quindi scorrere la tabella ricevuta dei consensi e per ogni elemento presente nell’ array elenco
consensi verifico:
• che il codice ASR sia valorizzato se il codiceTipoConsenso è = ‘A’ diversamente impostare
esito ko e codice di errore 0014 su risposta, nel caso di codiceTipoConsenso = ‘R’ ci sarà una
sola occorrenza e il codice ASR sarà un codice di convenzione.
(se il consenzo è aziendale e la fonte è un asr almeno uno dei consensi dati deve essere riferito alla
stessa ASR indicata come fonte )
• scandire l’ array dei consensi e verificare se almeno un codice asr(i) coincide con il codice
fonte, per corrispondenza non trovata segnalare esito ko e codice errore 0015 su riposta
• se il codiceTipoConsenso = ‘A’ e il codiceTipoFonte = ‘ASR’
se codiceFonte è diverso da codice (n) /codice asr dell’ elemento di array trattato/
impostare esito ko e codice di errore 0015 su risposta
• Ricerca dei dati dell’ informativa di riferimento:
accesso tabella CONS_D_INFORMATIVA con key tipo_consenso, sotto_tipo consenso e
data_decorrenza maggiore per trovato acquisire i campi informativa_id e pdf_informativa
per non trovato impostare esito ko e codice di errore 0016 su risposta.
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 7 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
AGGIORNAMENTO BASE DATI:
N.B. se il consenso è regionale si richiede che l’ array delle asr contenga un solo elemento con il riferimento ad un asr
generica.
Accedere tabella consensi CONS_T_CONSENSO con informativa_id, codiceFiscaleCittadino, fonte_id e
stato attivo se:
• non trovato inserimento in tabella cons_t_consenso dopo aver impostato i campi come descritto
nell’ interfaccia di risposta
• trovato
o se valoreConsenso = valore_consenso di cons_t_consenso , non si esegue nessuna
azione
o diversamente .
▪ Se valoreConsenso = ‘NE’ ed è diverso da cons_t_consenso impostare esito
ko e codice di errore E01 su risposta.
▪ diversamente eseguire:
o aggiornamento dell’ occorrenza trovata su tabella cons_t_consenso dopo
aver impostato la data fine validità alla data del gg e tipo_stato =
‘scaduto”
o inserimento in tabella cons_t_consenso del nuovo consenso acquisito
dopo aver impostato i campi come descritto nell’ interfaccia di risposta.
3. Componi risposta
Il servizio restituisce la risposta di successo in caso di esito positivo, oppure di fallimento in caso di esito
negativo.
4. Risposta
Il servizio invia la risposta al fruitore.
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 8 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 9 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
2.3.1.3 Interfaccia di richiamo (input) acquisizione consenso
Informazione di input Livello Obbligatorio Tipologia Denominazione
attributo (Sì/No) Campo DB
cfRichiedente 1 Si TEXT
cfDelegato 1 No TEXT
tipoOperatore 1 Si TEXT
codiceOperatore 1 Si TEXT
codiceTipoFonte 1 Sì TEXT
codiceFonte 1 Sì TEXT
dataAcquisizione 1 Sì TIMESTAMP
codiceTipoConsenso 1 Sì TEXT
codiceSottotipoConsenso 1 Sì TEXT
descrizioneSottotipoConsenso 1 Sì TEXT
elencoConsensi 1 Sì
valoreConsenso(n) 2 Sì TEXT
CodiceASR(n) 2 Sì TEXT
2.3.1.4 Interfaccia di risposta (output) acquisizione consenso
Informazione di output Livello Obbligatorio Tipologia Denominazione
attributo (Sì/No) Campo DB
Errori 1 No INTEGER err_id
Esito 1 Si TEXT n.a.
Errori.codice 2 No TEXT err_cod
Consenso.idConsenso 2 Sì TEXT cons_id
Consenso.codiceFiscale.Cittadino 2 Sì TEXT cf_cittadino
Consenso.nomeCittadino 3 Sì TEXT
Consenso.cognomeCittadino 3 Sì TEXT
Consenso.idAURA 3 Sì TEXT
Consenso.codiceFiscale.Delegato 3 No TEXT cfdelegato
Consenso.dataAcquisizione 3 Sì TIMESTAMP data_acquisizione
Consenso.id_operatore 3 Sì TEXT Operatore_id
Consenso.codiceFonte 3 Sì TEXT
Consenso.data_creazione 3 Sì TIMESTAMP data_del momento
Consenso.loginOperazione 3 No TEXT Codice fiscale del
richiedente
Consenso.fonte_id 3 Sì INTEGER Fonte_id
Consenso.audit_id 3 Si INTEGER Audit_id
Consenso.tipoStato 4 Sì TEXT Tipo_stato
Consenso.valoreConsenso 5 Si TEXT Valore_consenso
Consenso.dataFineValidita 3 No TIMESTAMP
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

| Informazione di input | Livello attributo | Obbligatorio (Sì/No) | Tipologia | Denominazione Campo DB |
| --- | --- | --- | --- | --- |
| cfRichiedente | 1 | Si | TEXT |  |
| cfDelegato | 1 | No | TEXT |  |
| tipoOperatore | 1 | Si | TEXT |  |
| codiceOperatore | 1 | Si | TEXT |  |
| codiceTipoFonte | 1 | Sì | TEXT |  |
| codiceFonte | 1 | Sì | TEXT |  |
| dataAcquisizione | 1 | Sì | TIMESTAMP |  |
| codiceTipoConsenso | 1 | Sì | TEXT |  |
| codiceSottotipoConsenso | 1 | Sì | TEXT |  |
| descrizioneSottotipoConsenso | 1 | Sì | TEXT |  |
| elencoConsensi | 1 | Sì |  |  |
| valoreConsenso(n) | 2 | Sì | TEXT |  |
| CodiceASR(n) | 2 | Sì | TEXT |  |
|  |  |  |  |  |

| Informazione di output | Livello attributo | Obbligatorio (Sì/No) | Tipologia | Denominazione Campo DB |
| --- | --- | --- | --- | --- |
| Errori | 1 | No | INTEGER | err_id |
| Esito | 1 | Si | TEXT | n.a. |
| Errori.codice | 2 | No | TEXT | err_cod |
| Consenso.idConsenso | 2 | Sì | TEXT | cons_id |
| Consenso.codiceFiscale.Cittadino | 2 | Sì | TEXT | cf_cittadino |
| Consenso.nomeCittadino | 3 | Sì | TEXT |  |
| Consenso.cognomeCittadino | 3 | Sì | TEXT |  |
| Consenso.idAURA | 3 | Sì | TEXT |  |
| Consenso.codiceFiscale.Delegato | 3 | No | TEXT | cfdelegato |
| Consenso.dataAcquisizione | 3 | Sì | TIMESTAMP | data_acquisizione |
| Consenso.id_operatore | 3 | Sì | TEXT | Operatore_id |
| Consenso.codiceFonte | 3 | Sì | TEXT |  |
| Consenso.data_creazione | 3 | Sì | TIMESTAMP | data_del momento |
| Consenso.loginOperazione | 3 | No | TEXT | Codice fiscale del richiedente |
| Consenso.fonte_id | 3 | Sì | INTEGER | Fonte_id |
| Consenso.audit_id | 3 | Si | INTEGER | Audit_id |
| Consenso.tipoStato | 4 | Sì | TEXT | Tipo_stato |
| Consenso.valoreConsenso | 5 | Si | TEXT | Valore_consenso |
| Consenso.dataFineValidita | 3 | No | TIMESTAMP |  |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 10 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
2.3.2 Operazione DA02:revocaConsenso (revocaConsensoService)
2.3.2.1 Descrizione dell’operazione
Consente ai cittadini piemontesi di revocare un consenso permanente ROL o altro tipo di consenso. Il consenso
revocato può essere a livello regionale o aziendale, in questo caso deve essere indicata l’ ASR di riferimento.
2.3.2.2 Dettaglio passi Operazione
Descrizione dei passi:
1. Log: chiamata servizio
All’attivazione del servizio vengono tracciate le informazioni di inizio elaborazione nella tabella dei log
(csi_log_audit).
2. Controllo formale e di merito sui campi di input:
Codice fiscale richiedente:
il codice fiscale del cittadino richiedente deve essere valorizzato diversamente impostare esito ko e
codice di errore 0001 su risposta (ved. Tabella riepilogativa errori)
eseguire i controlli formali sul campo se errato esito ko e errore 0017
se i controlli vengono superati con il codice fiscale del cittadino richiedente accedere ad AURA:
• per trovato si acquisiscono i campi nome , cognome e id_aura (idProfiloAnagrafico)e si passa
al controllo successivo
• per non trovato impostare esito ko e codice di errore 0002 su risposta (ved. Tabella riepilogativa
errori)
Codice fiscale delegato: il campo non è obbligatorio, quindi solo se valorizzato deve essere diverso dal codice
fiscale richiedente, eseguire i controlli sintattici del campo codice fiscale se non vengono superati esito ko e
codice di errore 0003 su risposta (ved. Tabella riepilogativa errori)
Operatore (codice e tipo):i campi non sono obbligatori, se valorizzati però devono nessere chiave della
tabella CONS_D_OPERATORE da cui acquisire il campo operatore _id, per non trovato impostare esito ko
e codice di errore 0004 su risposta (ved. Tabella riepilogativa errori).
Fonte: (codice tipo fonte e codice fonte) campi obbligatori:
• se non valorizzati impostare esito ko e codice errore 0013
• Accedere in tabella CONS_D_TIPO_FONTE con key = codiceTipoFonte per non trovato
impostare esito ko e codice di errore 0007 su risposta, per trovato acquisire tipo_fonte_id.
• Accedere alla tabella CONS_D_FONTE con chiave tipo_fonte_id e fonte_cod = codiceFonte
per trovato acquisire il campo fonte_id per non trovato impostare esito ko e codice di errore
0008 su risposta.
Data acquisizione: campo obbligatorio, se non valorizzato impostare esito ko e codice di errore 0005 su
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 11 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
risposta.
Se valorizzato verificare la correttezza sintattica del campo se i controlli non vengono superati impostare
esito ko e codice di errore 0006 su risposta.
Codice Tipo consenso: campo obbligatorio se non valorizzato impostare esito ko e codice di errore 0009 su
risposta.
Verificare che il campo tipo consenso sia una chiave della tabella CONS_D_TIPO_CONS per non trovato
impostare esito ko e codice di errore 0011 su risposta.
Codice Sottotipo consenso: campo obbligatorio se non valorizzato impostare esito ko e codice di errore
0010 su risposta.
Verificare che il campo sottotipo consenso sia una chiave della tabella CONS_D_SOTTO_TIPO_CONS per
non trovato impostare esito ko e codice di errore 0012 su risposta.
Descrizione sotto tipo consenso il campo viene trasmesso nell’ acquisizione revoca consenso ma su di esso
non si effettua nessun controllo.
A questo punto verificata la correttezza formale e di merito dei campi presenti sulla richiesta si analizzano i
consensi dati, quindi scorrere la tabella ricevuta dei consensi e per ogni elemento presente nell’ array elenco
consensi verifico:
• che il codice ASR sia valorizzato se il codiceTipoConsenso è = ‘A’ diversamente impostare
esito ko e codice di errore 0014 su risposta, nel caso di codiceTipoConsenso = ‘R’ ci sarà una
sola occorrenza e il codice ASR sarà un codice di convenzione.
(se il consenzo è aziendale e la fonte è un asr il consenso deve essere riferito alla stessa ASR)
• se il codiceTipoConsenso = ‘A’ e il codiceTipoFonte = ‘ASR’
se codiceFonte è diverso da codice (n) /codice asr dell’ elemento di array trattato/
impostare esito ko e codice di errore 0015 su risposta
• Ricerca dei dati dell’ informativa di riferimento:
accesso tabella CONS_D_INFORMATIVA con key tipo_consenso, sotto_tipo consenso e
data_decorrenza maggiore per trovato acquisire i campi informativa_id e pdf_informativa
per non trovato impostare esito ko e codice di errore 0016 su risposta.
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 12 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
AGGIORNAMENTO BASE DATI:
N.B. se la revoca è regionale si richiede che l’ array delle asr contenga un solo elemento con il riferimento ad un asr
generica.
Accedere tabella consensi CONS_T_CONSENSO con informativa_id, codiceFiscaleCittadino, fonte_id, ,
cod_asr e stato attivo
per trovato:
• aggiornamento dell’ occorrenza trovata su tabella cons_t_consenso dopo avere impostato la
data fine validità alla data del gg e tipo stato = ‘scaduto’
• inserimento in tabella cons_t_consenso dell’ occorrenza di revoca dopo aver impostato i campi
come descritto nell’ interfaccia di risposta
per non trovato impostare esito ko e codice di errore E10 su risposta
3. Componi risposta
Il servizio restituisce la risposta di successo in caso di esito positivo, oppure di fallimento in caso di esito
negativo.
4. Risposta
Il servizio invia la risposta al fruitore.
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 13 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 14 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
2.3.2.3 Interfaccia di richiamo (input) revoca consenso
Informazione di input Livello Obbligatorio Tipologia Denominazione
attributo (Sì/No) Campo DB
cfRichiedente 1 Si TEXT
cfDelegato 1 No TEXT
tipoOperatore 1 Si TEXT
codiceOperatore 1 Si TEXT
codiceTipoFonte 1 Sì TEXT
codiceFonte 1 Sì TEXT
dataAcquisizione 1 Sì TIMESTAMP
codiceTipoConsenso 1 Sì TEXT
codiceSottotipoConsenso 1 Sì TEXT
descrizioneSottotipoConsenso 1 Sì TEXT
elencoConsensi 1 Sì
CodiceASR(n) 2 Sì TEXT
2.3.2.4 Interfaccia di risposta (output) revoca consenso
Informazione di output Livello Obbligatorio Tipologia Denominazione
attributo (Sì/No) Campo DB
Errori 1 No INTEGER err_id
Esito 1 Si TEXT n.a.
Errori.codice 2 No TEXT err_cod
Consenso.idConsenso 2 Sì TEXT cons_id
Consenso.codiceFiscale.Cittadino 2 Sì TEXT cf_cittadino
Consenso.nomeCittadino 3 Sì TEXT
Consenso.cognomeCittadino 3 Sì TEXT
Consenso.idAURA 3 Sì TEXT
Consenso.codiceFiscale.Delegato 3 No TEXT cfdelegato
Consenso.dataAcquisizione 3 Sì TIMESTAMP data_acquisizione
Consenso.id_operatore 3 Sì TEXT Operatore_id
Consenso.codiceFonte 3 Sì TEXT
Consenso.data_creazione 3 Sì TIMESTAMP data_del momento
Consenso.loginOperazione 3 No TEXT Codice fiscale del
richiedente
Consenso.fonte_id 3 Sì INTEGER Fonte_id
Consenso.audit_id 3 Si INTEGER Audit_id
Consenso.tipoStato 4 Sì TEXT Tipo_stato
Consenso.valoreConsenso 5 Si TEXT NE
Consenso.dataFineValidita 3 No TIMESTAMP
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

| Informazione di input | Livello attributo | Obbligatorio (Sì/No) | Tipologia | Denominazione Campo DB |
| --- | --- | --- | --- | --- |
| cfRichiedente | 1 | Si | TEXT |  |
| cfDelegato | 1 | No | TEXT |  |
| tipoOperatore | 1 | Si | TEXT |  |
| codiceOperatore | 1 | Si | TEXT |  |
| codiceTipoFonte | 1 | Sì | TEXT |  |
| codiceFonte | 1 | Sì | TEXT |  |
| dataAcquisizione | 1 | Sì | TIMESTAMP |  |
| codiceTipoConsenso | 1 | Sì | TEXT |  |
| codiceSottotipoConsenso | 1 | Sì | TEXT |  |
| descrizioneSottotipoConsenso | 1 | Sì | TEXT |  |
| elencoConsensi | 1 | Sì |  |  |
| CodiceASR(n) | 2 | Sì | TEXT |  |
|  |  |  |  |  |

| Informazione di output | Livello attributo | Obbligatorio (Sì/No) | Tipologia | Denominazione Campo DB |
| --- | --- | --- | --- | --- |
| Errori | 1 | No | INTEGER | err_id |
| Esito | 1 | Si | TEXT | n.a. |
| Errori.codice | 2 | No | TEXT | err_cod |
| Consenso.idConsenso | 2 | Sì | TEXT | cons_id |
| Consenso.codiceFiscale.Cittadino | 2 | Sì | TEXT | cf_cittadino |
| Consenso.nomeCittadino | 3 | Sì | TEXT |  |
| Consenso.cognomeCittadino | 3 | Sì | TEXT |  |
| Consenso.idAURA | 3 | Sì | TEXT |  |
| Consenso.codiceFiscale.Delegato | 3 | No | TEXT | cfdelegato |
| Consenso.dataAcquisizione | 3 | Sì | TIMESTAMP | data_acquisizione |
| Consenso.id_operatore | 3 | Sì | TEXT | Operatore_id |
| Consenso.codiceFonte | 3 | Sì | TEXT |  |
| Consenso.data_creazione | 3 | Sì | TIMESTAMP | data_del momento |
| Consenso.loginOperazione | 3 | No | TEXT | Codice fiscale del richiedente |
| Consenso.fonte_id | 3 | Sì | INTEGER | Fonte_id |
| Consenso.audit_id | 3 | Si | INTEGER | Audit_id |
| Consenso.tipoStato | 4 | Sì | TEXT | Tipo_stato |
| Consenso.valoreConsenso | 5 | Si | TEXT | NE |
| Consenso.dataFineValidita | 3 | No | TIMESTAMP |  |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 15 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
2.3.3 Operazione DA03:consultazioneConsenso (consultazioneConsensoService)
2.3.3.1 Descrizione dell’operazione
Consente ai cittadini piemontesi di visualizzare la situazione attuale dei consensi che hanno dato (sia attivi che
revocati).
2.3.3.2 Dettaglio passi Operazione
Descrizione dei passi:
1. Log: chiamata servizio
All’attivazione del servizio vengono tracciate le informazioni di inizio elaborazione nella tabella dei log
(csi_log_audit).
2. Controllo formale e di merito sui campi di input:
Codice fiscale richiedente:
il codice fiscale del cittadino richiedente deve essere valorizzato diversamente impostare esito ko e
codice di errore 0001 su risposta (ved. Tabella riepilogativa errori)
con il codice fiscale del cittadino richiedente accedere ad AURA:
• per trovato si passa al controllo successivo
• per non trovato impostare esito ko e codice di errore 0002 su risposta (ved. Tabella riepilogativa
errori)
Codice fiscale delegato: il campo non è obbligatorio, quindi solo se valorizzato deve essere diverso dal codice
fiscale richiedente, eseguire i controlli sintattici del campo codice fiscale se non vengono superati esito ko e
codice di errore 0003 su risposta (ved. Tabella riepilogativa errori)
Operatore (codice e tipo):i campi non sono obbligatori, se valorizzati però devono nessere chiave della
tabella CONS_D_OPERATORE per non trovato impostare esito ko e codice di errore 0004 su risposta (ved.
Tabella riepilogativa errori).
Fonte: (codice tipo fonte e codice fonte) campi obbligatori:
• se non valorizzati impostare esito ko e codice errore 0013
• Accedere in tabella CONS_D_TIPO_FONTE con key = codiceTipoFonte per non trovato impostare
esito ko e codice di errore 0007 su risposta, per trovato acquisire tipo_fonte_id.
• Accedere alla tabella CONS_D_FONTE con chiave tipo_fonte_id e fonte_cod = codiceFonte per
trovato acquisire il campo fonte_desc per non trovato impostare esito ko e codice di errore 0008 su
risposta.
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 16 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
Data acquisizione: campo obbligatorio, se non valorizzato impostare esito ko e codice di errore 0005 su
risposta.
Se valorizzato verificare la correttezza sintattica del campo se i controlli non vengono superati impostare
esito ko e codice di errore 0006 su risposta.
Codice Tipo consenso: campo obbligatorio se non valorizzato impostare esito ko e codice di errore 0009 su
risposta.
Verificare che il campo tipo consenso sia una chiave della tabella CONS_D_TIPO_CONS per non trovato
impostare esito ko e codice di errore 0011 su risposta.
Codice Sottotipo consenso: campo obbligatorio se non valorizzato impostare esito ko e codice di errore
0010 su risposta.
Verificare che il campo sottotipo consenso sia una chiave della tabella CONS_D_SOTTO_TIPO_CONS per
trovato acquisire il campo desc_sotto_tipo_cons , per non trovato impostare esito ko e codice di errore 0012
su risposta.
Descrizione sotto tipo consenso il campo viene trasmesso in fase di richiesta consultazione consenso ma su
di esso non si effettua nessun controllo, il dato di output sarà il campo desc_sotto_tipo_cons della tabella
CONS_D_SOTTO_TIPO_CONS.
A questo punto verificata la correttezza formale e di merito dei campi presenti sulla richiesta si accede al db
per acquisire tutti i consensi o le revoche e trasmetterle sul tracciato xml di output.
Ricerca consensi e compilazione dell’ array elenco consensi dell’ xml:
• Ricerca dei dati dell’ informativa di riferimento:
accesso tabella CONS_D_INFORMATIVA con key tipo_consenso, sotto_tipo consenso e
data_decorrenza maggiore per trovato acquisire i campi informativa_id e pdf_informativa,
data_decorrenza, data_scadenza per non trovato impostare esito ko e codice di errore 0016 su
risposta.
• Accedere tabella consensi CONS_T_CONSENSO con informativa_id, codiceFiscaleCittadino,
dataAcquisizione maggiore e acquisire per ogni occorrenza trovata cod_asr, valore consenso,
data_acquisizione, tipo_stato, fonte_id, operatore_id, cf_delegato.
• Completare i dati mancanti acquisendo le seguenti informazioni:
a. Da cons_d_operatore con key operatore_id acquisire tipo_operatore e cod_operatore
b. Da cons_d_fonte con key fonte_id acquisire fonte_cod, fonte_desc e tipo_fonte_id,
c. con tipo_fonte_id accesso tabella cons_d_tipo_fonte per acquisire tipofonte_cod.
d. da con cons_d_asr con key = cos_asr acquisire desc_asr
e. da cons_d_stato con key tipo_stato acquisire desc_stato.
• Per ogni occorrenza trovata e completata di tutte le sue informazioni è possibile scrivere un elemento
dell’ array consensi come indicato nell’ interfaccia di risposta.
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 17 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
3. Componi risposta
Il servizio restituisce la risposta di successo in caso di esito positivo, oppure di fallimento in caso di esito
negativo.
4. Risposta
Il servizio invia la risposta al fruitore.
Log chiamata di servizio
Verifica parametri di input
Composizione risposta
negativa
Composizione risposta
positiva
Restituzione messaggio di
errore
Risposta
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 18 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
1.1.1.3 Interfaccia di richiamo (input) consultazione consenso
Informazione di input Livello Obbligatorio Tipologia Denominazione
attributo (Sì/No) Campo DB
cfRichiedente 1 Si TEXT
cfDelegato 1 No TEXT
tipoOperatore 1 No TEXT
codiceOperatore 1 No TEXT
codiceTipoFonte 1 Sì TEXT
codiceFonte 1 Sì TEXT
dataRichiesta 1 Sì TIMESTAMP
codiceTipoConsenso 1 Sì TEXT
codiceSottotipoConsenso 1 Sì TEXT
descrizioneSottotipoConsenso 1 Sì TEXT
1.1.1.4 Interfaccia di risposta (output) consultazione consenso
Informazione di output Livello Obbligat Tipologia Denominazione Campo DB
attributo orio
(Sì/No)
Errori 1 No INTEGER err_id
Esito 1 Si TEXT n.a.
Errori.codice 2 No TEXT err_cod
elencoConsensi 1
consenso 2
ASR 3 Sì TEXT Cons_t_consenso.cod_asr
Descrizione_asr 3 Sì TEXT Cons_d_asr.desc_asr
codiceTipoFonte 3 Sì TEXT Cons_d_tipo_fonte.tipofonte_cod
codiceFonte 3 Si TEXT Cond_d_fonte.fonte_cod
descrizione 3 Sì TEXT Cons_d_fonte.fonte_desc
cfDelegato 3 Sì TEXT Cons_t_consenso.cf_delegato
TipoOperatore 3 Sì TEXT Cons_d_operatore.tipo_operatore
codiceOperatore 3 Sì TEXT Cons_d_operatore.cod_operatore
codiceSottoTipoConsenso 3 Sì TEXT Cons_d_informativa.sotto_tipo_consenso
descrizioneSottoTipoConsenso 3 Sì TEXT Cons_sotto_tipo_cons
DataAcquisizione 3 Sì TEXT Cons_t_consenso.data_acquisizione
dataRevoca 3 Si TIMESTAMP ????
dataRilascioConsensoAttivo 3 Sì TIMESTAMP ??????
valoreConsenso 3 Si TEXT Cons_t_consenso.valore_consenso
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

| Informazione di input | Livello attributo | Obbligatorio (Sì/No) | Tipologia | Denominazione Campo DB |
| --- | --- | --- | --- | --- |
| cfRichiedente | 1 | Si | TEXT |  |
| cfDelegato | 1 | No | TEXT |  |
| tipoOperatore | 1 | No | TEXT |  |
| codiceOperatore | 1 | No | TEXT |  |
| codiceTipoFonte | 1 | Sì | TEXT |  |
| codiceFonte | 1 | Sì | TEXT |  |
| dataRichiesta | 1 | Sì | TIMESTAMP |  |
| codiceTipoConsenso | 1 | Sì | TEXT |  |
| codiceSottotipoConsenso | 1 | Sì | TEXT |  |
| descrizioneSottotipoConsenso | 1 | Sì | TEXT |  |
|  |  |  |  |  |

| Informazione di output | Livello attributo | Obbligat orio (Sì/No) | Tipologia | Denominazione Campo DB |
| --- | --- | --- | --- | --- |
| Errori | 1 | No | INTEGER | err_id |
| Esito | 1 | Si | TEXT | n.a. |
| Errori.codice | 2 | No | TEXT | err_cod |
| elencoConsensi | 1 |  |  |  |
| consenso | 2 |  |  |  |
| ASR | 3 | Sì | TEXT | Cons_t_consenso.cod_asr |
| Descrizione_asr | 3 | Sì | TEXT | Cons_d_asr.desc_asr |
| codiceTipoFonte | 3 | Sì | TEXT | Cons_d_tipo_fonte.tipofonte_cod |
| codiceFonte | 3 | Si | TEXT | Cond_d_fonte.fonte_cod |
| descrizione | 3 | Sì | TEXT | Cons_d_fonte.fonte_desc |
| cfDelegato | 3 | Sì | TEXT | Cons_t_consenso.cf_delegato |
| TipoOperatore | 3 | Sì | TEXT | Cons_d_operatore.tipo_operatore |
| codiceOperatore | 3 | Sì | TEXT | Cons_d_operatore.cod_operatore |
| codiceSottoTipoConsenso | 3 | Sì | TEXT | Cons_d_informativa.sotto_tipo_consenso |
| descrizioneSottoTipoConsenso | 3 | Sì | TEXT | Cons_sotto_tipo_cons |
| DataAcquisizione | 3 | Sì | TEXT | Cons_t_consenso.data_acquisizione |
| dataRevoca | 3 | Si | TIMESTAMP | ???? |
| dataRilascioConsensoAttivo | 3 | Sì | TIMESTAMP | ?????? |
| valoreConsenso | 3 | Si | TEXT | Cons_t_consenso.valore_consenso |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 19 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
Informazione di output Livello Obbligat Tipologia Denominazione Campo DB
attributo orio
(Sì/No)
statoConsenso 3 Si TEXT Cons_d_stato.desc_stato
CausaleRevoca 3 Si TEXT ?????
informativaPDF 3 Si TEXT Cons_d_informativa.pdf_informativa
dataInizioValidità 3 Sì TIMESTAMP Cons_d_informativa.data_decorrenza
dataFineValidità 3 Sì TIMESTAMP Cons_d_informativa.data_scadenza
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

| Informazione di output | Livello attributo | Obbligat orio (Sì/No) | Tipologia | Denominazione Campo DB |
| --- | --- | --- | --- | --- |
| statoConsenso | 3 | Si | TEXT | Cons_d_stato.desc_stato |
| CausaleRevoca | 3 | Si | TEXT | ????? |
| informativaPDF | 3 | Si | TEXT | Cons_d_informativa.pdf_informativa |
| dataInizioValidità | 3 | Sì | TIMESTAMP | Cons_d_informativa.data_decorrenza |
| dataFineValidità | 3 | Sì | TIMESTAMP | Cons_d_informativa.data_scadenza |
|  |  |  |  |  |
|  |  |  |  |  |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 20 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
2.3.4 Operazione DA03:consultazioneInformativa (consultazioneInformativaConsensoService)
2.3.4.1 Descrizione dell’operazione
Consente ai cittadini piemontesi di visualizzare la situazione attuale dei consensi che hanno dato (sia attivi che
revocati).
2.3.4.2 Dettaglio passi Operazione
Descrizione dei passi:
3. Log: chiamata servizio
All’attivazione del servizio vengono tracciate le informazioni di inizio elaborazione nella tabella dei log
(csi_log_audit).
4. Controllo formale e di merito sui campi di input:
Data acquisizione: campo obbligatorio, se non valorizzato impostare esito ko e codice di errore 0005 su
risposta.
Se valorizzato verificare la correttezza sintattica del campo se i controlli non vengono superati impostare
esito ko e codice di errore 0006 su risposta.
Codice Tipo consenso: campo obbligatorio se non valorizzato impostare esito ko e codice di errore 0009 su
risposta.
Verificare che il campo tipo consenso sia una chiave della tabella CONS_D_TIPO_CONS per non trovato
impostare esito ko e codice di errore 0011 su risposta.
Codice Sottotipo consenso: campo obbligatorio se non valorizzato impostare esito ko e codice di errore
0010 su risposta.
Verificare che il campo sottotipo consenso sia una chiave della tabella CONS_D_SOTTO_TIPO_CONS per
trovato acquisire il campo desc_sotto_tipo_cons , per non trovato impostare esito ko e codice di errore 0012
su risposta.
A questo punto verificata la correttezza formale e di merito dei campi presenti sulla richiesta si accede al db
per acquisire tutti i consensi o le revoche e trasmetterle sul tracciato xml di output.
Ricerca consensi e compilazione dell’ array elenco consensi dell’ xml:
• Ricerca dei dati dell’ informativa di riferimento:
accesso tabella CONS_D_INFORMATIVA con key tipo_consenso, sotto_tipo consenso e
data_scadenza non valorizzata o con data_scadenza maggiore della data di acquisizione.
Per l’ occorrenza trovata acquisire i campi pdf_informativa, data_decorrenza, data_scadenza per
non trovato impostare esito ko e codice di errore E10 su risposta.
• Per l’ occorrenza trovata è possibile comporre i dati di output come indicato nell’ interfaccia di risposta.
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 21 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
3. Componi risposta
Il servizio restituisce la risposta di successo in caso di esito positivo, oppure di fallimento in caso di esito
negativo.
4. Risposta
Il servizio invia la risposta al fruitore.
Log chiamata di servizio
Verifica parametri di input
Composizione risposta
negativa
Composizione risposta
positiva
Restituzione messaggio di
errore
Risposta
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 22 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
1.1.1.3 Interfaccia di richiamo (input) consultazione consenso
Informazione di input Livello Obbligatorio Tipologia Denominazione
attributo (Sì/No) Campo DB
dataRichiesta 1 Sì TIMESTAMP
codiceTipoConsenso 1 Sì TEXT
codiceSottotipoConsenso 1 Sì TEXT
1.1.1.4 Interfaccia di risposta (output) consultazione consenso
Informazione di output Livello Obbligato Tipologia Denominazione Campo DB
attributo rio (Sì/No)
Errori 1 No INTEGER err_id
Esito 1 Si TEXT n.a.
Errori.codice 2 No TEXT err_cod
informativaPDF 3 Si TEXT Cons_d_informativa.pdf_informativa
dataInizioValidità 3 Sì TIMESTAMP Cons_d_informativa.data_decorrenza
dataFineValidità 3 Sì TIMESTAMP Cons_d_informativa.data_scadenza
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

| Informazione di input | Livello attributo | Obbligatorio (Sì/No) | Tipologia | Denominazione Campo DB |
| --- | --- | --- | --- | --- |
| dataRichiesta | 1 | Sì | TIMESTAMP |  |
| codiceTipoConsenso | 1 | Sì | TEXT |  |
| codiceSottotipoConsenso | 1 | Sì | TEXT |  |
|  |  |  |  |  |

| Informazione di output | Livello attributo | Obbligato rio (Sì/No) | Tipologia | Denominazione Campo DB |
| --- | --- | --- | --- | --- |
| Errori | 1 | No | INTEGER | err_id |
| Esito | 1 | Si | TEXT | n.a. |
| Errori.codice | 2 | No | TEXT | err_cod |
| informativaPDF | 3 | Si | TEXT | Cons_d_informativa.pdf_informativa |
| dataInizioValidità | 3 | Sì | TIMESTAMP | Cons_d_informativa.data_decorrenza |
| dataFineValidità | 3 | Sì | TIMESTAMP | Cons_d_informativa.data_scadenza |
|  |  |  |  |  |
|  |  |  |  |  |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 23 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 24 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
2.4 Algoritmi e servizi per i controlli
2.4.1 Struttura DataBase
Di seguito una rappresentazione della struttura del DataBase del modulo Gestione Consensi
Per una migliore comprensione dello logica di composizione del DataBase, di seguito si riporta una descrizione
sintetica delle relative tabelle.
Tabella Descrizione
Contiene tutti i possibili valori che può
Cons_d_valore_cons
assumere in campo consenso (SI, NO, NE)
Contiene tutti i possibili valori che può
Cons_d_stato assumere in campo stato del consenso
(ATTIVO, REVOCATO, SCADUTO,…)
Contiene la codifica dei codici e tipo
operatore. Al momento contiene solo un
Cons_d_operatore
codice fittizio. La tabella è stata creata per
eventuali sviluppi futuri del controllo della
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

|  | Tabella |  |  | Descrizione |  |
| --- | --- | --- | --- | --- | --- |
| Cons_d_valore_cons |  |  | Contiene tutti i possibili valori che può assumere in campo consenso (SI, NO, NE) |  |  |
| Cons_d_stato |  |  | Contiene tutti i possibili valori che può assumere in campo stato del consenso (ATTIVO, REVOCATO, SCADUTO,…) |  |  |
| Cons_d_operatore |  |  | Contiene la codifica dei codici e tipo operatore. Al momento contiene solo un codice fittizio. La tabella è stata creata per eventuali sviluppi futuri del controllo della |  |  |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 25 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
profilatura
Contiene i consensi, revoche dei cittadini
Cons_t_consenso della regione Piemonte che hanno utilizzato
il servizio consensi regionale.
Contiene l’ abbinamento codice tipo fonte e
Cons_d_fonte
ASR in ambito regionale.
Contiene la codifica di tutti i tipi fonte
Cons_d_tipo_fonte
esistenti.
Contiene i dati dell’ informativa riferiti ad
Cons_d_informativa
ogni asr, tipo e sottotipo consenso.
Contiene la codifica di tutti i sottotipi di
Cons_d_sotto_tipo_cons
consenso esistenti (ROL….)
Contiene la codifica di tutti i tipi di
Cons_d_tipo_cons
consensi esistenti (A, R)
Cons_d_asr Contiene tutte le codifiche delle ASR
Csi_log_audit Contiene tutte informazioni di log
2.4.2 Errori
Di seguito una tabella riepilogativa degli errori.
ID Errore Descrizione
Errore restituito quando in input non è
0001 Codice fiscale non valorizzato
valorizzato il codice fiscale.
Errore restituito quando su AURA l’
Codice fiscale non presente in
0002 accesso per codice fiscale ha esito
anagrafica
negativo.
Errore restituito quando il codice fiscale
Impostare correttamente il codice
0003 del delegato non è presente su AURA e
fiscale del delegato
non ha superato i controlli sintattici
Errore restituito quando il codice e il
0004 Codice operatore errato tipo operatore non trova rispondenza in
tabella cons_d_operatore
Errore restituito quando sulla richiesta
0005 Impostare data acquisizione non è valorizzato il campo data
acquisizione
Errore restituito quando la data
Impostare correttamente data
0006 acquisizione non è valorizzata in un
acquisizione
formato corretto
Impostare correttamente Codice tipo Errore restituito quando il codice tipo
0007
fonte fonte non trova corrispondenza in
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

|  | profilatura |
| --- | --- |
| Cons_t_consenso | Contiene i consensi, revoche dei cittadini della regione Piemonte che hanno utilizzato il servizio consensi regionale. |
| Cons_d_fonte | Contiene l’ abbinamento codice tipo fonte e ASR in ambito regionale. |
| Cons_d_tipo_fonte | Contiene la codifica di tutti i tipi fonte esistenti. |
| Cons_d_informativa | Contiene i dati dell’ informativa riferiti ad ogni asr, tipo e sottotipo consenso. |
| Cons_d_sotto_tipo_cons | Contiene la codifica di tutti i sottotipi di consenso esistenti (ROL….) |
| Cons_d_tipo_cons | Contiene la codifica di tutti i tipi di consensi esistenti (A, R) |
| Cons_d_asr | Contiene tutte le codifiche delle ASR |
| Csi_log_audit | Contiene tutte informazioni di log |

|  | ID |  |  | Errore |  |  | Descrizione |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0001 |  |  | Codice fiscale non valorizzato |  |  | Errore restituito quando in input non è valorizzato il codice fiscale. |  |  |
| 0002 |  |  | Codice fiscale non presente in anagrafica |  |  | Errore restituito quando su AURA l’ accesso per codice fiscale ha esito negativo. |  |  |
| 0003 |  |  | Impostare correttamente il codice fiscale del delegato |  |  | Errore restituito quando il codice fiscale del delegato non è presente su AURA e non ha superato i controlli sintattici |  |  |
| 0004 |  |  | Codice operatore errato |  |  | Errore restituito quando il codice e il tipo operatore non trova rispondenza in tabella cons_d_operatore |  |  |
| 0005 |  |  | Impostare data acquisizione |  |  | Errore restituito quando sulla richiesta non è valorizzato il campo data acquisizione |  |  |
| 0006 |  |  | Impostare correttamente data acquisizione |  |  | Errore restituito quando la data acquisizione non è valorizzata in un formato corretto |  |  |
| 0007 |  |  | Impostare correttamente Codice tipo fonte |  |  | Errore restituito quando il codice tipo fonte non trova corrispondenza in |  |  |

---

ACC-DEL-
FASCICOLO SANITARIO ELETTRONICO
CDU-01
Modulo Gestione Consensi – Consenso permenente ROL
Servizio Gestione Consensi Pag. 26 di 26
DIREZIONE SVILUPPO E
GESTIONE SOLUZIONI E
PRODOTTI
tabella codice tipo fonte
Errore restituito quando la chiave
0008 Impostare correttamente il codice fonte (codice fonte e il codice tipo fonte) non
è presente in tabella cons_d_fonte
Impostare il campo codice tipo Errore restituito quando il codice tipo
0009
consenso consenso non è stato valorizzato
Errore restituito quando il codice
Impostare il campo codice sottotipo
0010 sottotipo consenso non è stato
consenso
valorizzato
Errore restituito quando la key tipo
Impostare correttamente il tipo
0011 consenso non è presente in tabella
consenso
cons_d_tipo_cons
Errore restituito quando la key sottotipo
Impostare correttamente il sottotipo
0012 consenso non è presente in tabella
consenso
cons_d_sotto_tipo_cons
Impostare codice tipo fonte e codice Errore restituito quando i campi fonte e
0013
fonte codice fonte non sono valorizzati
Errore restituito quando il codice ASR
0014 Codice ASR non valorizzato
non è valorizzato
Errore restituito quando un consenso
Consenso rifiutato azienda : codice(n)
0015 aziendale con fonte ASR è riferito ad
diverso da fonte : codiceTipoFonte
una azienda diversa
Errore restituito quando non esiste l’
0016 Informativa non presente informativa per il consenso asr,
tipo_consenso_sotto_tipo_consenso.
Non è possibile inserire un consesnso Errore restituito quando si acquisisce un
0017 con valore NE se esiste già un consenso consenso con valore NE ed esiste già un
con valore SI o NO. consenso con valore SI o NO.
Non è possibile inserire la revoca per l’ Errore restituito quando arriva una
0018 asr = ‘asr ‘ perché non presente un revoca ma non è riferita a nesdsun
consenso precedente consenso.
della delega (es. il servizio di pagamento ticket online può essere delegabile dal gg/mm/aaaa al gg/mm/aaaa).
2.4.3 Audit
Tabella di riferimento: CSI_LOG_AUDIT
Eventi da tracciare conseguentemente all’ acquisizione di un’ operazione in ambito della gestione dei consensi.
ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi.docx uso: CSI-Piemonte

| DIREZIONE SVILUPPO E |
| --- |
| GESTIONE SOLUZIONI E |

|  |  | tabella codice tipo fonte |
| --- | --- | --- |
| 0008 | Impostare correttamente il codice fonte | Errore restituito quando la chiave (codice fonte e il codice tipo fonte) non è presente in tabella cons_d_fonte |
| 0009 | Impostare il campo codice tipo consenso | Errore restituito quando il codice tipo consenso non è stato valorizzato |
| 0010 | Impostare il campo codice sottotipo consenso | Errore restituito quando il codice sottotipo consenso non è stato valorizzato |
| 0011 | Impostare correttamente il tipo consenso | Errore restituito quando la key tipo consenso non è presente in tabella cons_d_tipo_cons |
| 0012 | Impostare correttamente il sottotipo consenso | Errore restituito quando la key sottotipo consenso non è presente in tabella cons_d_sotto_tipo_cons |
| 0013 | Impostare codice tipo fonte e codice fonte | Errore restituito quando i campi fonte e codice fonte non sono valorizzati |
| 0014 | Codice ASR non valorizzato | Errore restituito quando il codice ASR non è valorizzato |
| 0015 | Consenso rifiutato azienda : codice(n) diverso da fonte : codiceTipoFonte | Errore restituito quando un consenso aziendale con fonte ASR è riferito ad una azienda diversa |
| 0016 | Informativa non presente | Errore restituito quando non esiste l’ informativa per il consenso asr, tipo_consenso_sotto_tipo_consenso. |
| 0017 | Non è possibile inserire un consesnso con valore NE se esiste già un consenso con valore SI o NO. | Errore restituito quando si acquisisce un consenso con valore NE ed esiste già un consenso con valore SI o NO. |
| 0018 | Non è possibile inserire la revoca per l’ asr = ‘asr ‘ perché non presente un consenso precedente | Errore restituito quando arriva una revoca ma non è riferita a nesdsun consenso. |
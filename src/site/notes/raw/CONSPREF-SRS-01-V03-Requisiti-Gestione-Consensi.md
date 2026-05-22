---
{"dg-publish":true,"permalink":"/raw/conspref-srs-01-v03-requisiti-gestione-consensi/","dg-note-properties":{}}
---


# Gestione Consensi 


VERIFICHE E APPROVAZIONI

| vers | REDAZIONE | REDAZIONE | CONTROLLO APPROVAZIONE | CONTROLLO APPROVAZIONE | AUTORIZZAZIONE EMISSIONE | AUTORIZZAZIONE EMISSIONE |
| --- | --- | --- | --- | --- | --- | --- |
|  | NOME | DATA | NOME | DATA | NOME | DATA |
| V01 | Bontempi | 01/09/2023 |  |  |  |  |

STATO DELLE variazioni

| vers | PARAGRAFO O PAGINA | DESCRIZIONE DELLA VARIAZIONE |
| --- | --- | --- |
| V01 | Intero documento | Prima stesura |

INDICE

# Scopo e riferimenti del documento

Scopo del presente documento è elencare i requisiti funzionali che devono essere implementati nell’ambito della revisione dell’applicazione Gestione dei consensi.

## Riferimenti

[A] REG-004-V22-REQ-Gestione deleghe e consensi - Sanità Elettronica.pdf
[B] A14_PTE_Acceleratori Gestione Deleghe II parte e Consensi.pdf

# Gestione dei consensi 


## Obiettivo e finalità 

L’applicazione Gestione Consensi messa a disposizione dei cittadini deve permettere l’acquisizione dei consensi espressi dai cittadini adulti per ogni tipologia di consenso previsto.
In particolare, si possono distinguere tre tipi di consenso:
- il consenso espresso a livello nazionale, 
- il consenso espresso a livello regionale; 
- il consenso espresso a livello aziendale (ASR).
Il livello **nazionale** è per esempio quello del consenso all’apertura del FSE: come previsto dalla normativa nazionale, la gestione del consenso al fascicolo verrà, infatti, centralizzata attraverso INI. 
I consensi di portata **regionale** possono essere ad esempio i seguenti: 
- consenso alla stratificazione; 
- consenso alla presa in carico della cronicità; 
- consenso alla presa in carico della telemedicina; 
- consenso alla presa in carico ad una rete, ad esempio quella oncologica; 
- consenso informato progressivo nelle cure palliative; 
- partecipazione a uno studio sperimentale; 
- ecc.
Infine, il livello **aziendale** (ASR) riguarda, invece, i consensi espressi nell’ambito interno alle Aziende Sanitarie e che riguardano per esempio i seguenti casi: 
- consenso al trattamento dei dati personali; 
- consenso alla costituzione del Dossier Clinico aziendale; 
- consenso informato all’erogazione di prestazioni sanitarie; 
- consenso al ritiro dei referti on line;
- ecc.
In base alle tipologie di consenso il cittadino esprime il proprio consenso a livello regionale se il consenso è di tipo regionale (esprime un consenso valido per tutte le aziende sanitarie), altrimenti per un consenso aziendale, il cittadino deve esprimere un consenso distinto per ogni azienda sanitaria.
Per quanto riguarda l’informativa, inoltre, la tipologia dei consensi determina se il cittadino deve leggere e accettare una sola informativa a livello regionale o nazionale oppure accettare eventualmente un’informativa per ogni azienda sanitaria.
I consensi espressi dai cittadini sono da notificare a tutte le aziende che prevedono l’acquisizione di quel consenso; pertanto, sono da prevedere due moduli distinti che dovranno colloquiare tra loro: 
- un “**Modulo Regionale di Gestione Consensi**”, parte del Sistema Informativo Regionale; 
- “n” moduli aziendali di gestione del consenso, parte dei Sistemi Informativi delle ASR.
Il modulo regionale di Gestione del Consenso è costituito da una componente di frontend e da una componente di backoffice. 
La componente di frontend, rivolta al cittadino e pubblicata come servizio on line nell’ambito dell’ecosistema dei servizi digitali della sanità, permetterà al cittadino stesso di gestire in autonomia su un proprio device (smartphone, tablet, pc) alcune tipologie di consenso che non richiedono un riconoscimento de visu, come per esempio il consenso alla stratificazione. 
La componente di backoffice, rivolta a operatori di Punto Assistito, permetterà di acquisire i consensi che richiedono un riconoscimento de visu con l’apposizione su un documento di una firma autografa da parte del cittadino che rilascia il consenso o esprimere un consenso on line per conto di un cittadino che non può agire autonomamente.
Inoltre, la componente di backoffice permetterà, a determinati operatori, di gestire le tipologie di consensi, le relative informative e gli enti/aziende che dovranno acquisire il consenso e i relativi endpoint per le notifiche di tale acquisizione.
Il modulo regionale e i moduli aziendali di gestione del consenso dovranno “colloquiare” tra loro in modo che i valori dei consensi espressi dai cittadini siano allineanti. L’acquisizione del consenso tramite la web app del cittadino e del punto assistito viene inviata, tramite servizi agli end point delle aziende in modo che acquisiscano il valore del consenso espresso dal cittadino e alimentino la propria base dati.
Analogamente, se un cittadino si reca presso un’azienda sanitaria ed esprime un consenso che verrà salvato sul gestionale aziendale, l’azienda sanitaria dovrà inviare il valore del consenso espresso dal cittadino in modo da alimentare il sistema regionale che provvederà a notificare il valore del consenso ricevuto a tutti gli endpoint della stessa azienda sanitaria.
Quindi, il sistema regionale deve permettere: 
- ad un cittadino adulto di: 
- inserire autonomamente, per sé stesso o come delegato, un nuovo consenso ad un determinato trattamento; 
- gestire e revocare autonomamente, per sé stesso o come delegato, un consenso inserito precedentemente;
- ad un operatore di un Punto Assistito di: 
- inserire un nuovo consenso ad un determinato trattamento richiesto da un assistito piemontese; 
- gestire e revocare un consenso già inserito, di un assistito piemontese
Nel modulo regionale il consenso espresso dal cittadino può assumere i seguenti stati:
- Accettato: espressione positiva del consenso per un’informativa attiva 
- Negato: espressione negativa del consenso per un’informativa attiva
- Scaduto: il consenso assume lo stato di “Scaduto” quando cambia l’informativa del consenso (il valore espresso dal cittadino è ancora valido ma deve essere accettata la nuova informativa)
- Annullato (da riemettere per nuova informativa): il consenso assume questo stato quando si decide che per un determinato consenso, al cambio dell’informativa, tutti i consensi espressi dai cittadini per l’informativa precedente vengono annullati (campo Flag annulla consenso della tabella Consensi)
N.B. ogni variazione del consenso da parte del cittadino o dall’operatore del punto assistito non prevede mai la sovrascrittura del consenso espresso precedentemente, in questo modo si conserverà la “storia” dei consensi espressi dai cittadini.
- Nel caso un consenso presenti un allegato all’informativa, la modifica dell’allegato non prevede alcun cambio di stato dei consensi espressi dai cittadini; mentre, con il variare dell’informativa il sistema procederà ad annullare o a far “scadere” il consenso in base al valore “flag annulla consenso” della tabella Consensi
- Nel caso in cui il consenso assuma lo stato di “Scaduto” tale variazione non verrà notificata alle aziende in quanto il valore del consenso resta comunque valido pur facendo riferimento ad un’informativa scaduta. 
- Nel caso in cui, invece, il consenso assuma lo stato “Annullato”, il sistema notificherà tale variazione alle aziende in quanto il consenso espresso dal cittadino non ha più valore.
Il sistema di Gestione del Consenso, sia lato cittadino che lato punto assistito, sarà parametrizzabile, così da poter gestire in modo incrementale i consensi che di volta in volta si renderanno necessari.

## Configurazione consensi

Affinché la web app del cittadino e la web app del punto assistito possano visualizzare tutti i consensi esprimibili dal cittadino è necessario effettuare il popolamento della base dati di tutte le seguenti informazioni:
- Tipi di consensi 
- Enti/aziende per cui è necessario esprimere un consenso 
- Informativa che adotta ogni ente/azienda per ogni consenso
- Endpoint a cui notificare i consensi espressi dai cittadini
Tale configurazione deve essere possibile effettuarla tramite la componente di backoffice dedicata agli operatori di backoffice.
L’accesso alla web app Gestione Consensi degli Operatori avviene con credenziali Rupar accedendo dal Punto Unico di Accesso (PUA). Nel PUA, una volta effettuato l’accesso con le proprie credenziali, l’operatore sceglierà ruolo e collocazione e poi potrà cliccare il pulsante che lo reindirizzerà sulla web app di Gestione Consensi BackOffice.

### Configurazione backoffice su Configuratore

La web app Gestione Consensi BackOffice deve essere configurata come Applicazione sul Configuratore affinché vengano censiti gli operatori dei punti assistiti e sia quindi visualizzabile il pulsante “Gestione Consensi BackOffice” nell’interfaccia del PUA.
La web app di backoffice deve presentare le seguenti funzionalità per gestire:
- i consensi da parte di un cittadino
- le tipologie di consensi dando la possibilità quindi di inserire/modificare un tipo consenso
- le informative dando la possibilità di inserire, modificare o far decadere un’informativa
- gli enti per cui è possibile esprimere un consenso
- gli endpoint degli enti a cui è necessario notificare un consenso di un cittadino.
Le funzionalità espresse devono essere configurate sul Configuratore in modo che la web app di backoffice attivi o meno le funzionalità per cui è stato abilitato un operatore.
Sarà necessario, quindi, creare due profili all’interno del Configuratore per l’applicazione Gestione Consensi BackOffice:
- Profilo Operatore Sanitario/Amministrativo che presenterà la funzionalità di gestione consenso per conto di un cittadino
- Profilo Operatore di Back Office che presenterà le funzionalità di gestione tipo consenso, gestione informativa, gestione ente e gestione endpoint.
Quando un operatore effettuerà l’accesso alla web app Gestione Consensi BackOffice il sistema dovrà verificare l’abilitazione dell’operatore (leggendo la risposta ottenuta dal servizio getTokenInformation2) e in base al profilo dell’operatore attiverà o meno le sezioni a lui dedicate; se la profilazione prevede il profilo Operatore Sanitario/Amministrativo il sistema presenterà la sezione di gestione del consenso per conto di un cittadino, se invece la profilazione prevede il profilo Operatore di Back Office il sistema presenterà la gestione di tipo consenso, informativa, ente e endpoint.
N.B. un operatore potrebbe avere una profilazione che comprenda entrambe i profili.

### Gestione Consensi BackOffice – profilo Operatore BackOffice

La web app Gestione Consensi Backoffice deve dare la possibilità, agli utenti profilati con Profilo di Operatore di BackOffice, di:
- Inserire/modificare una tipologia di consenso 
- Inserire/modificare un’informativa e relativo allegato
- Inserire un ente/azienda
- Inserire/modificare endpoint
Di seguito vengono descritte le funzionalità della web app backoffice per la “compilazione” della base dati utile per le web app cittadino e punto assistito della Gestione dei Consensi.

#### Gestione tipo consenso

Il sistema deve permettere all’operatore le seguenti operazioni:
- Inserimento nuovo tipo consenso
- Modificare un tipo consenso 
L’operatore accedendo al sistema può visualizzare tutti i tipi consensi esistenti e decidere se inserirne uno nuovo o modificare uno esistente. L’elenco dei consensi può essere filtrato per i seguenti campi:
- Consenso 
- Tipologia di consenso (nazionale, regionale, aziendale)
L’inserimento di una nuova tipologia di consenso prevede l’inserimento dei seguenti campi (potranno essere presente dei campi aggiuntivi, oltre a quelli generali; i campi aggiuntivi dovranno essere letti dal db leggendo dalla tabella Cons_d_parametro il nome del parametro che corrisponderà alla label del campo (*)):
- Codice consenso (campo obbligatorio - generale): il valore verrà salvato nella tabella cons_d_sotto_tipo_cons.sotto_tipo_consenso
- Descrizione consenso (campo obbligatorio - generale): label descrittiva del consenso da presentare nell’interfaccia della web app cittadino e punto assistito; il valore verrà salvato nella tabella cons_d_sotto_tipo_cons
- Descrizione estesa del consenso (campo obbligatorio – aggiuntivo da leggere nella tabella parametro): descrizione testuale del consenso da presentare nell’interfaccia della web app cittadino e punto assistito; il valore verrà salvato nella tabella cons_r_consenso_parametro per l’fk consenso
- Data inizio decorrenza consenso (campo obbligatorio - generale); il valore verrà salvato nella tabella cons_d_sotto_tipo_cons
- Data fine consenso (campo non obbligatorio – generale): data di fine validità del consenso che verrà salvato nella tabella cons_d_sotto_tipo_cons
- Domanda da porre al cittadino per far esprimere il consenso (campo obbligatorio – aggiuntivo letto da parametro): testo da presentare nell’interfaccia del cittadino o del punto assistito; questo valore verrà salvato nella tabella cons_r_consenso_parametro per l’fk consenso
- Valori che può assumere un consenso (campo obbligatorio – generale i valori verranno letti dalla tabella cons_d_valore_cons): valori letti dalla tabella di decodifica con la possibilità di sceglierne più di uno (es. Si, No, Non espresso, ecc.); l’elenco dei valori verrà salvato nella tabella cons_r_consenso_valore per l’fk consenso.
- Testo aggiuntivo (campo non obbligatorio, aggiuntivo letto da parametro): testo aggiuntivo da visualizzare nell’interfaccia della web app cittadino e punto assistito; il valore verrà salvato nella tabella cons_r_consenso_parametro per l’fk consensoDefinire se è un consenso on line o de visu (campo obbligatorio – aggiuntivo letto da parametro); il valore verrà salvato nella tabella cons_r_consenso_parametro per l’fk consenso (nel diagramma è legato all’informativa)
- Definire se al variare dell’informativa tutti i consensi già espressi da un cittadino dovranno essere annullati o meno (campo obbligatorio – aggiuntivo letto da parametro); il valore verrà salvato nella tabella cons_r_consenso_parametro per l’fk consenso (nel diagramma è legato all’informativa)
- Tipo consenso scegliendo tra nazionale, regionale, aziendale (campo obbligatorio - generale); il valore verrà salvato nella tabella cons_d_tipo_cons
- Scegliere quali sono gli enti/aziende per cui è necessario attivare quel consenso (campo obbligatorio - generale); il sistema deve visualizzare l’elenco degli enti in base alla tipologia del consenso, se per es. è un consenso di tipo regionale si visualizzerà solo l’ente regione, se invece si sta salvando un consenso aziendale si presenteranno tutti gli enti di tipo aziendale (per es le ASR). L’elenco da visualizzare, oltre alla tipologia di ente, dovrà contenere solo gli enti per cui esistano degli endpoint attivi, questa informazione si deve leggere nella tabella cons_r_asr_endpoint. al momento del salvataggio il legame tra consenso ed enti deve essere salvato nella tabella cons_r_sotto_tipo_cons_asr_endpoint.(si potrebbe gestire un parent nella tabella ente, e se il consenso è di tipo regionale visualizza il valore per cui il parent è null, se il consenso è di tipo aziendale presenta tutti i record con parent = regione piemonte; per quanto riguarda il salvataggio se di tipo regionale salverà n record quanti sono i record con il parent della regione piemonte, se di tipo aziendale salverà solo i record scelti dall’operatore)
(*) nella tabella dei parametri verrà specificato per ogni valore la tipologia di campo in modo che l’interfaccia, sia del cittadino che del punto assistito, sia modulabile in base al consenso in funzione dei suoi parametri. Per es. verranno gestite le seguenti tipologie:
- campo testo
- text area
- radio button con valori SI/NO
- campi flag
L’elenco degli enti di un consenso deve essere filtrato in base alla tipologia di consenso:
- Se il consenso è di tipo nazionale il sistema visualizzerà solo gli enti di tipo nazionale
- Se il consenso è di tipo regionale il sistema visualizzerà solo gli enti di tipo regionale
- Se il consenso è di tipo aziendale il sistema visualizzerà solo gli enti di tipo aziendale
Al salvataggio il sistema deve salvare l’inserimento del consenso e il legame tra il consenso e gli enti/aziende che “utilizzano” tale consenso. 
Nel caso in cui si stia inserendo un consenso di tipo regionale il sistema salverà il legame tra il consenso e tutte le aziende appartenenti all’ente di tipo regionale scelto (per es. tutte le aziende sanitarie della regione Piemonte).
Per un consenso di tipo aziendale l’utente potrà scegliere per quali aziende può associare il consenso.
Il sistema, quindi, effettuerà il salvataggio nelle seguenti tabelle:
- cons_d_sotto_tipo_cons
- cons_r_sotto_tipo_cons_asr_endpoint (un record per ogni azienda)
- cons_r_consenso_valore
Di seguito si riporta un’interfaccia di esempio per la creazione di un consenso.
Se il consenso è di tipo aziendale deve comparire il parametro di informativa unica per tutte le aziende  se si decide di lasciare la possibilità di scegliere 1 informativa per tutte le aziende e un’informativa per ogni azienda
La modifica di un consenso prevede la possibilità di variare i seguenti campi:
- Descrizione consenso
- Consenso on line/consenso de visu (nel diagramma legato all’informativa?)
- Data fine del consenso 
- Flag “Annulla i consensi” al variare dell’informativa
- Eliminazione di un’ente/azienda per il consenso che si sta modificando 
- Eliminazione di un endpoint associato.
- La modifica del consenso prevede i seguenti scenari:
- Nel caso in cui venga settata la data di fine validità al consenso tutti i legami attivi tra consenso ed ente/azienda/enpoint verranno chiusi  (cons_d_sotto_tipo_cons e cons_r_sotto_tipo_cons_asr_endpoint) .
- Nel caso in cui venga eliminato un’ente/azienda/endpoint dal consenso il sistema setterà la data di fine validità al legame tra consenso/azienda/endpoint (cons_r_sotto_tipo_cons_asr_endpoint) e.
Nel caso in cui venga chiuso un consenso verrà chiusa anche l’informativa valida associata e quindi di conseguenza la chiusura dell’informativa provvederà alla chiusura dei consensi espressi (vedi capitolo gestione informativa) 
Ogni operazione effettuata dall’operatore deve essere tracciata sia come log di audit sia in ogni tabella che verrà incrementata/aggiornata salvando la data dell’operazione e il codice fiscale dell’operatore che sta effettuando il salvataggio. 
N.B. il consenso sarà visibile nella web app del cittadino e del punto assistito solo quando ci sarà anche un’informativa di riferimento attiva.

#### Gestione informativa  

L’operatore di backoffice può gestire le informative dei consensi. L’operatore potrà visualizzare le informative esistenti e potrà modificare o inserire delle nuove informative.
L’operatore potrà visualizzare l’elenco delle informative esistenti e decidere se inserire una nuova informativa o modificare una esistente. L’elenco potrà essere filtrato per:
- Descrizione informativa
- Descrizione consenso 
- Ente/azienda 
L’inserimento di una nuova informativa prevede l’inserimento dei seguenti campi:
- Codice informativa (campo obbligatorio)
- Descrizione informativa (campo obbligatorio)
- Il consenso di riferimento (campo obbligatorio) (toglierei il tipo consenso)
- Ente/azienda di riferimento (campo obbligatorio). Il sistema deve visualizzare tutti gli enti/aziende per cui esista il legame con il consenso attivo e che abbia un endpoint attivo leggendo dalla tabella cons_r_sotto_tipo_cons_asr_endpoint.
- Data di decorrenza dell’informativa (campo obbligatorio)
- File in formato pdf dell’informativa (campo obbligatorio)
Eventuale allegato all’informativa 
Il sistema in base al tipo di consenso scelto compila l’elenco degli enti/azienda nel seguente modo:
- Se il consenso è di tipo regionale presenta l’elenco degli enti di tipo regionale per cui esiste il legame per il consenso scelto (N.B. se è stata scelta la Regione Piemonte il legame tra consenso e azienda è presente per tutte le aziende appartenente alla regione ma nell’elenco non è necessario far visualizzare tutte le aziende visto che l’operatore dovrà caricare una sola informativa per il consenso scelto)
- Se il consenso è di tipo aziendale il sistema deve popolare l’elenco delle aziende per cui esiste un legame attivo per il consenso scelto. Deve essere, inoltre, possibile associare una stessa informativa a più aziende.
Nel caso in cui non esistano enti/aziende associate al consenso scelto il sistema deve presentare opportuno messaggio di errore specificando che è necessario prima associare almeno un ente al consenso.
Il salvataggio dell’informativa prevede il salvataggio nelle seguenti tabelle:
- Informativa (cons_d_informativa)
- Allegati nel caso in cui venga caricato un allegato (cons_t_allegato)
- Legame tra informativa ed Ente  nel caso in cui venga scelto l’ente regionale è necessario salvare il legame tra l’informativa e tutte le aziende dell’ente regionale scelto associate al consenso, nel caso di consenso aziendale si salveranno solo le aziende scelte dall’operatore. Il legame tra informativa ed ente si dovrà salvare nella tabella cons_r_informativa_asr
Di seguito si riporta un’interfaccia di esempio di inserimento informativa.
Decidere se anche annullaconsensi o online devono essere legati al consenso o all’informativa  no sono legati al consenso, da togliere dal diagramma
Se informativa unica per tutte le aziende verrà caricato un solo file e l’elenco delle aziende sarà compilato con tutte le aziende per cui esiste un endpoint attivo per quel consenso 
N.B. Può esistere una sola informativa valida per un consenso e un’ente/azienda. Al momento del salvataggio il sistema deve verificare che non esista già un’informativa valida per el’nte scelto per l’fk_sotto_tipo_consenso; nel caso in cui esista il sistema deve presentare opportuno messaggio e non effettuare il salvataggio.
La modifica di un’informativa può prevedere:
- L’inserimento di una data di scadenza all’informativa
- Eliminazione di un’azienda
- Aggiunta azienda
- Modifica dell’allegato dell’informativa
La modifica dell’informativa prevede vari scenari:
- Nel caso in cui venga settata una data di scadenza all’informativa il sistema dovrà adeguare tutti i consensi già espressi nel seguente modo:
- Verificare il valore “annulla i consensi al variare dell’informativa” del consenso dell’informativa:
- Se il consenso ha il valore “annulla consensi” = SI il sistemadovrà: 
- settare la data di fine validità a tutti i consensi espressi (tabella cons_t_consenso) e validi relativi all’informativa che si sta modificando. Nel campo del codice fiscale di chi ha effettuato l’operazione deve essere salvato un valore relativo all’operazione;
- inserire un nuovo record nella tabella dei consensi espressi (cons_t_consenso) con lo stato “Annullato” (il valore del consenso espresso precedentemente resta invariato) e senza la data fine validità (unico record valido). Nel campo del codice fiscale di chi ha effettuato l’operazione deve essere salvato un valore relativo al all’operazione;
- inserire i record nella tabella delle notifiche in modo da notificare a tutti gli endpoint degli enti/aziende il valore annullato del consenso 
- se il consenso ha il valore “annulla consensi” = NO il sistema dovrà:
- settare la data di fine validità a tutti i consensi espressi (tabella cons_t_consenso) e validi relativi all’informativa che si sta modificando. Nel campo del codice fiscale di chi ha effettuato l’operazione deve essere salvato un valore relativo all’operazione;
- inserire un nuovo record nella tabella dei consensi espressi con lo stato “Scaduto” (il valore del consenso espresso precedentemente resta invariato) e senza la data fine validità (unico record valido). Nel campo del codice fiscale di chi ha effettuato l’operazione deve essere salvato un valore relativo all’operazione;
- Nel caso in cui venga eliminata un’azienda, quindi, viene settata la data fine nella tabella di legame tra informativa e /ente (cons_r_informativa_asr) il sistema dovrà adeguare tutti i consensi già espressi nel seguente modo:
- Verificare il valore “annulla i consensi al variare dell’informativa” del consenso dell’informativa:
- Se il consenso ha il valore “annulla consensi” = SI un il sistema dovrà: 
- settare la data di fine validità ai consensi espressi (tabella cons_t_consenso) e validi relativi all’informativa e all’ente/azienda che si sta modificando. Nel campo del codice fiscale di chi ha effettuato l’operazione deve essere salvato un valore relativo all’operazione; 
- inserire un nuovo record nella tabella dei consensi espressi con lo stato “Annullato” (il valore del consenso espresso precedentemente resta invariato) e senza la data fine validità (unico record valido). Nel campo del codice fiscale di chi ha effettuato l’operazione deve essere salvato un valore relativo all’operazione;
- inserire i record nella tabella delle notifiche in modo da notificare a tutti gli endpoint degli enti/aziende il valore annullato del consenso 
- se il consenso ha il valore “annulla consensi” = NO il sistema dovrà:
- settare la data di fine validità ai consensi espressi (tabella cons_t_consenso) e validi relativi all’informativa e all’ente/azienda. Nel campo del codice fiscale di chi ha effettuato l’operazione deve essere salvato un valore relativo all’operazione;
- inserire un nuovo record nella tabella dei consensi espressi con lo stato “Scaduto” (il valore del consenso espresso precedentemente resta invariato) e senza la data fine validità (unico record valido). Nel campo del codice fiscale di chi ha effettuato l’operazione deve essere salvato un valore relativo all’operazione;
- Nel caso in cui venga modificato l’allegato dell’informativa il sistema procederà a salvare il nuovo allegato rendendo non più valido l’allegato precedente. La modifica dell’allegato dell’informativa non prevede nessuna modifica all’espressione dei consensi dei cittadini.
Il sistema deve effettuare giornalmente i controlli sulle date di scadenza delle informativa ed eventualmente chiudere i consensi come indicato sopra.

#### Gestione ente ed endpoint

Un operatore con profilo BackOffice potrà anche gestire gli enti che potranno ricevere i valori dei consensi espressi dai cittadini.
L’operatore potrà visualizzare tutti gli enti inseriti ed effettuare l’inserimento di nuovi enti.
Nel caso di inserimento sono previsti i seguenti campi:
- Codice ente (campo obbligatorio) cons_d_asr (cambierei nome perché non è detto che siano solo asr, potranno esserci anche enti regionali o nazionali)
- Descrizione ente (campo obbligatorio)
- Tipo ente (nazionale, regionale, aziendale) (campo obbligatorio) manca nel diagramma
- Enti associati (il sistema presenta l’elenco degli enti di grado inferiore in base al tipo di ente scelto; per es. per enti di tipo regionale l’elenco degli enti associati saranno di tipo aziendale) manca la cardinalità
- Data inizio (campo obbligatorio) manca
- Endpoint (è possibile indicare anche più endpoint) (campo obbligatorio) cons_t_endpoint e cons_r_asr_endpoint
La modifica dell’ente può prevedere la modifica dei seguenti campi:
- Descrizione ente cons_d_asr
- Data fine validità 
- Eliminazione dell’endpoint cons_d_asr
La modifica di un ente prevede i seguenti scenari:
- A fronte dell’impostazione della data fine validità dell’ente il sistema deve impostare:
- la data fine validità a tutti gli endpoint dell’ente eliminato cons_r_asr_endpont 
- la data fine validità a tutti i legami tra consensoEnte ed endpoint cons_r_sotto_tipo_cons_asr_endpoint
- la data fine validità a tutte le informative legati al consenso/ente cons_r_informativa_asr
- se viene eliminato un endpoint il sistema dovrà settare la data fine validità all’endpoint dell’ente ma dovrà anche settare la data fine validità a tutti i legami tra consensoEnte ed endpoint cons_r_asr_endpont e cons_r_sotto_tipo_cons_asr_endpoint
In entrambi gli scenari sia la web app del cittadino che la web app del punto assistito non visualizzeranno più il consenso dell’ente/endpoint appena eliminato.
Di seguito si riporta un esempio di interfaccia di inserimento ente.

## Web app Cittadino Gestione Consensi 

La web app rivolta al cittadino deve presentare tutti i possibili consensi che il cittadino può esprimere e per cui esistano:
- degli enti con endpoint validi e
- un’informativa valida per gli enti del consenso
Il sistema deve essere in grado di “compilare” l’interfaccia rispetto ai valori presenti sul data base presentando in maschera l’elenco dei consensi e dando la possibilità al cittadino di gestire ogni consenso.
L’interfaccia deve essere in grado di comporre l’elenco dei consensi leggendo i consensi che hanno:
- degli enti attivi e
- un’informativa attiva per gli enti per cui esistano dei legami con endpoint attivi 
il sistema deve visualizzare tutti i consensi per cui esistano degli endpoint attivi (cons_r_sotto_tipo_cons_asr_endpoint) e per cui esista un’informativa attiva per gli enti degli endpoint (cons_d_sotto_tipo_cons, cons_d_informativa, cons_r_informativa_asr)
per ogni consenso deve popolare l’interfaccia leggendo:
- descrizione del consenso
- descrizione estesa del consenso
N.B. il consenso della Piattaforma del Fascicolo Sanitario non è oggetto di questo documento e non “appartiene” alla web app Gestione Consensi.
Si deve eliminare dall’attuale interfaccia:
- la visualizzazione del valore del consenso espresso
- il numero delle aziende attive per quel consenso 
- link dell’informativa 
Cliccando sul pulsante “Gestisci” il sistema presenta le informazioni relative al consenso visualizzando:
- i valori che può esprimere il cittadino (cons_r_consenso_valore)
- gli enti per cui è attivo quel consenso (cons_r_informativa_asr)
- l’informativa valida specifica in formato html (cons_d_informativa)
- eventuale allegato dell’informativa (cons_t_allegato)
Alla pressione del pulsante “gestisci” il sistema deve verificare la tipologia di consenso; nel caso in cui per un determinato consenso il campo flag_online sia valorizzato a NO (quindi vuole dire che è un consenso de visu) il sistema non deve permettere la valorizzazione del consenso al cittadino tramite web app ma dovrà presentare un messaggio che indichi di andare presso un’azienda sanitaria/ente ad esprimere il consenso.
- Il sistema deve essere in grado di comporre la maschera leggendo le informazioni dal db del consenso che il cittadino vuole esprimere leggendo (è necessario leggere anche la tabella dei parametri per comporre la pagina):
- descrizione consenso 
- descrizione estesa consenso
- testo aggiuntivo
- domanda da porre al cittadino
- i valori che può assumere il consenso
- il tipo di consenso (nazionale, regionale ed aziendale)
- enti per cui è associato questo consenso 
- informativa attiva
- il valore del consenso espresso dal cittadino nel caso in cui sia già stato espresso
- lo stato del consenso espresso dal cittadino 
A seconda delle tipologie di consensi il sistema deve presentare l’interfaccia diversa; in particolare, possono verificarsi i seguenti casi:
- **consenso di tipo regionale**  il sistema deve dare la possibilità all’assistito di esprimere il consenso (uno solo!) e visualizzare una sola informativa da accettare. 
- Il valore espresso dal cittadino sarà salvato n volte quante sono le aziende collegate a quel consenso, quindi per es. per un consenso di tipo regionale il sistema dovrà salvare n record nella tabella ConsensiEspressi (cons_t_consenso) quanti sono i record validi presenti nella tabella cons_r_sotto_tipo_cons_asr_endpoint. Il valore espresso dal cittadino ovviamente sarà uguale per tutte le aziende.
- Il valore espresso dal cittadino sarà poi notificato a tutte le aziende attive configurate per quel consenso e che abbiano un endpoint attivo (anche se il cittadino esprime un solo consenso, il sistema al momento del salvataggio per ogni record salvato in ConsensiEspressi (cons_t_consenso) salverà n record nella tabella Notifica (cons_t_notifica) in questo modo verrà notificato il valore del consenso a tutte le aziende configurate, per esempio, per un consenso regionale il valore espresso dal cittadino viene notificato a tutte le aziende sanitarie configurate e a tutti gli endpoint delle aziende)
- Di seguito si riporta un esempio di interfaccia di un consenso di tipo regionale.
- **consenso di tipo ****aziendale**  per un consenso di tipo aziendale può verificarsi che ogni azienda assuma una propria informativa, quindi, il sistema deve dare la possibilità al cittadino di visualizzare tutte le informative delle aziende.
- Il cittadino dovrà, quindi, per ogni consenso espresso, leggere tutte le informative e accettarle per proseguire nel salvataggio.
- Di seguito si riporta un esempio di interfaccia di un consenso di tipo aziendale.
- Se informativa unica deve comparire l’elenco delle aziende per cui è attivo l’endpoint con il file dell’informativa al fondo valida per tutti e unico check per dichiarare di aver letto informativa
- Se informativa diversa per ogni aziende il check della presa visione sarà all’interno della singola informativa cliccando su ogni singola azienda, si deve anche evidenziare qual è l’informativa che riporta lo stato scaduto 
- N.B. Il consenso che verrà espresso in quel momento sarà legato espressamente a quell’ente/azienda con l’informativa attiva in quel momento e verrà notificata all’endpoint attivo in quel momento.
- Nel caso in cui un cittadino voglia modificare il consenso espresso si potranno verificare i seguenti casi:
- se il consenso ha uno stato “**a****ccettato**” o “**negato**”, il cittadino potrà modificare la sua scelta senza dover riaccettare l’informativa
- se il consenso ha uno stato “**scaduto**” il cittadino dovrà nuovamente leggere e accettare l’informativa visualizzata nella maschera ma il sistema presenterà il valore precedentemente valorizzato dal cittadino per l’informativa precedente che potrà essere modificato
- se il consenso ha uno stato “**annullato**” il cittadino dovrà riesprimere il consenso e leggere e accettare la nuova informativa. Il sistema non visualizzerà il valore del consenso già espresso per l’informativa precedente.
Prevedere messaggio da presentare al cittadino per spiegare le informative scadute e annullate
Nel caso di consenso aziendale se anche un solo consenso del cittadino abbia un valore tra scaduto e annullato il cittadino dovrà riaccettare le informative. 
Si riporta un riassunto delle possibili casistiche:

| Valore consenso | Web app | Attività del cittadino |
| --- | --- | --- |
| Non ancora espresso dal cittadino | Consenso “vuoto” e obbligatorietà dell’accettazione dell’informativa | Il cittadino dovrà indicare il suo consenso e accettare l’informativa con il salvataggio delle informazioni. |
| Accettato | Consenso già espresso dal cittadino e modificabile | Il cittadino non dovrà accettare l’informativa anche al variare del valore del consenso |
| Negato | Consenso già espresso dal cittadino e modificabile | Il cittadino non dovrà accettare informativa anche al variare del valore del consenso |
| Scaduto | Consenso già espresso dal cittadino e modificabile e obbligatorietà dell’accettazione dell’informativa | Il cittadino dovrà accettare l’informativa con il salvataggio delle informazioni (anche senza variare il valore del consenso) |
| Annullato | Consenso “vuoto” anche se già espresso per un’informativa precedente e obbligatorietà dell’accettazione dell’informativa | Il cittadino dovrà indicare il suo consenso e accettare l’informativa con il salvataggio delle informazioni. |

- L’inserimento di un consenso da parte di un cittadino prevede l’inserimento di un record nella tabella (cons_t_consenso) per il cittadino con indicazione di:
- codice fiscale, nome, cognome e id aura del cittadino  cons_t_consenso
- data espressione consenso  cons_t_consenso
- identificativo dell’ente/azienda per cui è stato espresso il consenso codasr in cons_t_consenso
- identificativo dell’informativa per cui è stato espresso il consenso informativa in cons_t_consenso
- stato del consenso (accettato o negato) tipostato in t_consenso
- valore del consenso espresso dal cittadino (SI/NO) valore in informativa in cons_t_consenso
- codice fiscale di chi ha effettuato l’operazione loginoperazione in t_consenso
- codice fiscale dell’eventuale delegato che ha salvato il consenso cf delegato in cons_t_consenso
- la fonte del salvataggio del consenso (web app cittadino) fonte_id in cons_t_consenso
- endp_id
Per ogni consenso espresso, il sistema dovrà  effettuare inserimento nella tabella delle notifiche di tanti record quanti sono i consensi espressi 
Ogni volta che il cittadino cambia un consenso il sistema deve “chiudere” l’unico record valido (data fine validità vuota) settando la data fine validità del record trovato e inserire un nuovo record con il valore espresso dal cittadino e la nuova data di espressione del consenso (data fine validità vuota).
In questo modo per ogni cittadino e ogni consenso si ha la storia delle espressioni dei consensi con l’indicazione di quando è avvenuta la variazione e da chi è stata eseguita.

## Punto Assistito Salute Gestione Consensi

Il back office della Gestione Consensi, oltre alle funzionalità previste per gli operatori di profilo BackOffice (vedi paragrafo 2.2.2), darà la possibilità agli operatori sanitari, abilitati con profilo Operatore Sanitario/Amministrativo, di esprimere un consenso da parte di un cittadino che non è autonomo.
Accedendo alla web app Gestione Consensi BackOffice con profilazione Operatore Sanitario/Amministrativo il sistema prevede la ricerca di un cittadino che vuole esprimere un consenso.
L’operatore può cercare l’assistito per:
- Codice fiscale
- Nome, cognome e data di nascita
Il sistema effettua la ricerca dell’assistito su AURA e SistemaTS e visualizza i dati dell’assistito; una volta scelto l’assistito, il sistema presenta tutti i consensi che può esprimere l’assistito e dà la possibilità di filtrare l’elenco dei consensi per:
- tipo consenso
- date (tutti, ultimo mese, ultimi 6 mesi, ultimi 5 anni)
- stato (gli stati previsti sono: “accettato”, “negato”, “scaduto”, “annullato”)
- aziende/enti
il sistema visualizza solo l’ultimo valore espresso dal cittadino per ogni consenso (solo quello valido)
La logica di visualizzazione elenco di consensi “attivi” deve essere la medesima a quella della web app cittadino, quindi, l’elenco dei consensi sarà composto da tutti i consensi che presentano degli enti/aziende che abbiano un’informativa valida.
Analogamente alla web app cittadino, per ogni consenso il sistema deve visualizzare i possibili enti/aziende per cui è possibile esprimere un consenso e l’informativa valida di ogni ente (nel caso in cui ogni ente abbia la sua informativa).
La visualizzazione delle informative e l’attivazione dei possibili valori che può assumere il consenso e l’obbligatorietà dell’accettazione dell’informativa nella maschera del backoffice deve seguire la stessa logica descritta per la web app del cittadino. 	
Anche nella web app del punto assistito, ogni variazione di consenso espressa dal cittadino da parte dell’operatore dovrà essere comunicata all’azienda/ente specifico e tracciata allo stesso modo in cui avviene nella web app del cittadino.

## Deleghe 

Il sistema di Gestione Consensi deve prevedere la possibilità di esprimere un consenso da parte di un delegato di un assistito. 
Il sistema tramite il servizio esposto di Gestione Deleghe verificherà la correttezza nella delega e solo se l’utente collegato è un delegato dell’assistito può procedere con l’espressione del consenso, scegliendo nella sezione dei deleganti, il delegante per cui esprimere il consenso.
Tutte le chiamate verso il servizio di deleghe devono essere tracciate con request, response, esito ed eventuali errori (vedi paragrafo “Tracciatura chiamate servizi esterni”).

## Notifiche verso le aziende/ente

Il sistema deve prevedere l’invio dei valori dei consensi espressi dai cittadini per ogni ente/azienda.
Un batch verifica i consensi da notificare alle aziende e contatta le aziende agli endpoint configurati tramite servizi.
All’avvenuto invio alle aziende viene notificato al cittadino l’invio del consenso alle aziende tramite Notificatore.
È necessario prevedere la scrittura delle chiamate verso le aziende tracciando request, response,mancano) esito ed eventuali errori.
Il batch tuttora presente deve essere adeguato ai requisiti espressi in questo documento effettuando i salvataggi delle informazioni mancanti.
Per quanto riguarda le chiamate ricevute dalle aziende sanitarie per la propagazione dei consensi dei cittadini verso il modulo regionale devono essere tracciate nelle tabelle di scambio dei messaggi.

## Notifiche verso i cittadini

Il sistema deve prevedere un sistema di notifica ai cittadini nel caso in cui un’informativa di un consenso espresso venga modificata. Quindi, quando viene modificata un’informativa che comporti una scadenza o un annullamento di un consenso espresso si deve prevedere un batch che notifichi ad ogni cittadino la scadenza dell’informativa e l’azione necessaria nell’espressione del consenso.
Il batch deve verificare, per ogni cittadino, la presenza sul Notificatore della preferenza per il modulo Gestione Consensi e del relativo contatto per la ricezione delle notifiche.
Il cittadino riceverà la notifica solo se ha espresso la preferenza per il modulo Gestione Consensi e ha indicato i contatti per ricevere la notifica.
Tale notifica deve essere tracciata nella tabella dei Messaggi (vedi paragrafo Tracciatura chiamate servizi esterni) con request, response, esito e relativi errori.
E’, inoltre, necessario modificare l’attuale comportamento delle notifiche al cittadino, sul data base deve essere tracciato per ogni notifica se è stato inoltrato al notificatore o meno e tracciarla come notificata nella tabella delle notifiche.

## Nuovi Servizi esposti per Aziende/Enti

Si deve prevedere un servizio esposto verso l’esterno usufruibile dalle aziende/enti che a fronte di un codice fiscale di un assistito e un consenso il servizio restituisca almeno:
- Valore del consenso espresso per l’azienda/ente chiamante
- Data di espressione del consenso 
- Stato del consenso 
- Informativa del consenso espresso per l’azienda/ente chiamante
- data inizio e fine validità del consenso 
- data inizio e fine validità dell’informativa dell’azienda/ente chiamante
Oltre a questo servizio sarà necessario creare anche un servizio che esponga, a fronte di una chiamata da parte di un ente, le seguenti informazioni:
- l’elenco dei consensi attivi per l’ente/azienda chiamante e le relative informazioni del consenso
- l’informativa attiva per il consenso e l’azienda chiamante e le relative informazioni dell’informativa
- gli endpoint attivi per ogni consenso e relative informazioni

## Tracciatura chiamate servizi esterni

Il sistema deve tracciare tutte le chiamate effettuate verso servizi esterni quali:
- **Aura** per il recupero delle informazioni degli assistiti
- **Deleghe** per il recupero dei deleganti/delegati di un assistito
- **Notificatore **per l’invio delle notifiche ai cittadini
Per quanto riguarda la chiamata al servizio di arruolamento del Fascicolo per il consenso alla consultazione viene effettuato il controllo sul consenso dell’assistito all’interno della web app Gestione Consensi ma non è possibile tracciare la chiamata in quanto la chiamata è effettuata dalle interfacce del sistema salute Piemonte.
Per ogni servizio chiamato il sistema dovrà tracciare almeno:
- Data della chiamata al servizio
- Servizio contattato
- Operatore che sta effettuando la chiamata
- Assistito per cui viene effettuata la chiamata
- Eventuale delegato dell’assistito 
- Request 
- Response
- Esito della chiamata
- Eventuali errori

## Audit

Tutte le operazioni effettuate dal cittadino o da un operatore del Punto Assistito devono essere tracciate come log di audit in modo da ricostruire tutte le operazioni effettuate per l’espressione o revoca di un consenso.
Analogamente, le operazioni effettuate da un operatore di backoffice devono essere tracciate come log di audit per ricostruire tutte le operazioni di gestione tipo consenso/informativa/ente/endpoint.

## Batch per nuovi endpoint per consensi già espressi 

Nel caso in cui: un’azienda abbia attivato solo un endpoint per un consenso (per es. solo il LIS), il cittadino esprime questo consenso, il sistema notifica il valore del consenso all’endpoint, tempo dopo l’azienda attiva anche altri endpoint il sistema deve essere in grado di notificare il valore del consenso già espresso dal cittadino anche ai nuovi endpoint. il sistema, quindi, deve clonare il consenso del cittadino espresso per il primo endpoint della stessa azienda anche per il nuovo endpoint; una volta clonato il consenso il sistema procederà a notificare il consenso del cittadino ai nuovi endpoint. in questo caso è necessario però non inviare la notifica al cittadino che non è a conoscenza degli endpoint delle aziende, quindi, è necessario salvare nella tab delle notifiche che la notifica non è da inviare al cittadino (è necessario tracciare tutte le date in modo da risalire ad eventi di questo genere).
Si è deciso che in queste situazioni è necessario 
- Inibire l'espressione di nuovi consensi verso azienda (il cittadino, finchè il nuovo endpoint non ha effettuato tutto l’allineamento rispetto ai valori dei consensi espressi dai cittadini, non potrà esprimere nuovamente il consenso per quell’azienda perché sarà disattivato (da capire come rendere disattivo il consenso nella web app del cittadino e del punto assistito)
- inviare al nuovo end-point l'ultimo consenso per ogni cittadino senza inviare la notifica 
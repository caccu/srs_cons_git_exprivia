---
{"dg-publish":true,"permalink":"/raw/csi-progetto-consensi-modello-dizionario-dati-3/","dg-note-properties":{}}
---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 1 di 16
Progetto Consensi
Modello - Dizionario Dati
Versione 01
VERIFICHE E APPROVAZIONI
CONTROLLO AUTORIZZAZIONE
VERS. REDAZIONE APPROVAZIONE EMISSIONE
NOME DATA NOME DATA NOME DATA
1 MARCELLO 08/04/2019
FRINCO
STATO DELLE VARIAZIONI
VERS. PARAGRAFO O DESCRIZIONE DELLA VARIAZIONE
PAGINA

| VERS. | REDAZIONE |  | CONTROLLO APPROVAZIONE |  | AUTORIZZAZIONE EMISSIONE |  |
| --- | --- | --- | --- | --- | --- | --- |
|  | NOME | DATA | NOME | DATA | NOME | DATA |
| 1 | MARCELLO FRINCO | 08/04/2019 |  |  |  |  |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |

| VERS. | PARAGRAFO O PAGINA | DESCRIZIONE DELLA VARIAZIONE |
| --- | --- | --- |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 2 di 16
INDICE
1. Scopo e riferimenti del documento 4
1.1 Scopo del documento 4
1.2 Riferimenti 4
2. Descrizione generale del modello 4
2.1 Razionali per l’organizzazione del modello in package 5
3. Descrizione delle entità del modello 5
3.1 Cons_t_consenso 5
3.1.1 Attributi dell'entità 5
3.1.2 Relazioni 6
3.1.2.1 Elenco relazioni dell’entità cons_t_consenso 6
3.2 Cons_s_consenso 6
3.2.1 Attributi dell'entità 7
3.2.2 Relazioni 7
3.2.2.1 Elenco relazioni dell’entità cons_s_consenso 7
3.3 Csi_log_audit 7
3.3.1 Attributi dell'entità 8
3.3.2 Relazioni 8
3.3.2.1 Elenco relazioni dell’entità csi_log_audit 8
3.4 Cons_d_valore_consenso 8
3.4.1 Attributi dell'entità 9
3.4.2 Relazioni 9
3.4.2.1 Elenco relazioni dell’entità cons_d_valore_consenso 9
3.5 Cons_d_asr 9
3.5.1 Attributi dell'entità 9
3.5.2 Relazioni 10
3.5.2.1 Elenco relazioni dell’entità cons_d_asr 10
3.6 Cons_d_operatore 10
3.6.1 Attributi dell'entità 10
3.6.2 Relazioni 10
3.6.2.1 Elenco relazioni dell’entità cons_d_operatore 10
3.7 Cons_d_stato 10
3.7.1 Attributi dell'entità 11
3.7.2 Relazioni 11
3.7.2.1 Elenco relazioni dell’entità cons_d_stato 11
3.8 Cons_d_fonte 11
3.8.1 Attributi dell'entità 11
3.8.2 Relazioni 12
3.8.2.1 Elenco relazioni dell’entità cons_d_fonte 12
3.9 Cons_d_tipo_fonte 12
3.9.1 Attributi dell'entità 13
3.9.2 Relazioni 13
3.9.2.1 Elenco relazioni dell’entità cons_d_tipo_fonte 13
3.10 Cons_d_informativa 13
3.10.1 Attributi dell'entità 14
3.10.2 Relazioni 14
3.10.2.1 Elenco relazioni dell’entità cons_d_informativa 14
3.11 Cons_d_sotto_tipo_cons 14

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 3 di 16
3.11.1 Attributi dell'entità 15
3.11.2 Relazioni 15
3.11.2.1 Elenco relazioni dell’entità cons_d_sotto_tipo_cons 15
3.12 Cons_d_tipo_cons 15
3.12.1 Attributi dell'entità 16
3.12.2 Relazioni 16
3.12.2.1 Elenco relazioni dell’entità cons_d_tipo_cons 16

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 4 di 16
1. Scopo e riferimenti del documento
1.1 Scopo del documento
Questo documento contiene il dizionario dati del progetto di gestione dei consensi.
Destinatari del documento sono tutti i partecipanti al gruppo di progetto.
1.2 Riferimenti
Num. Riferimento Descrizione
2. Descrizione generale del modello
Nel seguente documento vengono descritte le entità del modello relativo alla base dati
dell’applicativo CONSENSI.

|  | Num. |  |  | Riferimento |  |  | Descrizione |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 5 di 16
2.1 Razionali per l’organizzazione del modello in package
Il modello contiene 12 entità:
2 di business (di cui 1 di storico)
1 di log
9 tabelle di dominio
3. Descrizione delle entità del modello
3.1 Cons_t_consenso
Descrizione Contiene i consensi espressi
Specializzazione di
Storicizzazione SI
Vincoli di integrità
Regole di modalità di
accesso e visibilità
Volumi attesi Tbd
Note
3.1.1 Attributi dell'entità

|  | Descrizione |  | Contiene i consensi espressi |
| --- | --- | --- | --- |
|  | Specializzazione di |  |  |
|  | Storicizzazione |  | SI |
|  | Vincoli di integrità |  |  |
|  | Regole di modalità di |  |  |
|  | accesso e visibilità |  |  |
|  | Volumi attesi |  | Tbd |
|  | Note |  |  |

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 6 di 16
3.1.2 Relazioni
3.1.2.1 Elenco relazioni dell’entità cons_t_consenso
3.2 Cons_s_consenso
Descrizione Conterrà i consensi espressi storicizzati (al momento non popolata)
Specializzazione di
Storicizzazione NO
Vincoli di integrità
Regole di modalità di
accesso e visibilità
Volumi attesi Tbd
Note

|  | Descrizione |  | Conterrà i consensi espressi storicizzati (al momento non popolata) |
| --- | --- | --- | --- |
|  | Specializzazione di |  |  |
|  | Storicizzazione |  | NO |
|  | Vincoli di integrità |  |  |
|  | Regole di modalità di |  |  |
|  | accesso e visibilità |  |  |
|  | Volumi attesi |  | Tbd |
|  | Note |  |  |

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 7 di 16
3.2.1 Attributi dell'entità
3.2.2 Relazioni
3.2.2.1 Elenco relazioni dell’entità cons_s_consenso
Non esistono relazioni per la tabella di storico (che al momento non verrà utilizzata).
3.3 Csi_log_audit
Descrizione Conterrà i log degli accessi/operazioni effettuate
Specializzazione di
Storicizzazione NO
Vincoli di integrità
Regole di modalità di
accesso e visibilità
Volumi attesi Tbd
Note

|  | Descrizione |  | Conterrà i log degli accessi/operazioni effettuate |
| --- | --- | --- | --- |
|  | Specializzazione di |  |  |
|  | Storicizzazione |  | NO |
|  | Vincoli di integrità |  |  |
|  | Regole di modalità di |  |  |
|  | accesso e visibilità |  |  |
|  | Volumi attesi |  | Tbd |
|  | Note |  |  |

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 8 di 16
3.3.1 Attributi dell'entità
3.3.2 Relazioni
3.3.2.1 Elenco relazioni dell’entità csi_log_audit
3.4 Cons_d_valore_consenso
Descrizione Tabella di dominio che contiene i valori esprimibili di consenso
Specializzazione di
Storicizzazione No
Vincoli di integrità
Regole di modalità di
accesso e visibilità
Volumi attesi Tbd
Note

|  | Descrizione |  | Tabella di dominio che contiene i valori esprimibili di consenso |
| --- | --- | --- | --- |
|  | Specializzazione di |  |  |
|  | Storicizzazione |  | No |
|  | Vincoli di integrità |  |  |
|  | Regole di modalità di |  |  |
|  | accesso e visibilità |  |  |
|  | Volumi attesi |  | Tbd |
|  | Note |  |  |

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 9 di 16
3.4.1 Attributi dell'entità
3.4.2 Relazioni
3.4.2.1 Elenco relazioni dell’entità cons_d_valore_consenso
3.5 Cons_d_asr
Descrizione Tabella di dominio che contiene le asr
Specializzazione di
Storicizzazione No
Vincoli di integrità
Regole di modalità di
accesso e visibilità
Volumi attesi Tbd
Note
3.5.1 Attributi dell'entità

|  | Descrizione |  | Tabella di dominio che contiene le asr |
| --- | --- | --- | --- |
|  | Specializzazione di |  |  |
|  | Storicizzazione |  | No |
|  | Vincoli di integrità |  |  |
|  | Regole di modalità di |  |  |
|  | accesso e visibilità |  |  |
|  | Volumi attesi |  | Tbd |
|  | Note |  |  |

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 10 di 16
3.5.2 Relazioni
3.5.2.1 Elenco relazioni dell’entità cons_d_asr
3.6 Cons_d_operatore
Descrizione Tabella di dominio che contiene gli operatori
Specializzazione di
Storicizzazione No
Vincoli di integrità
Regole di modalità di
accesso e visibilità
Volumi attesi Tbd
Note
3.6.1 Attributi dell'entità
3.6.2 Relazioni
3.6.2.1 Elenco relazioni dell’entità cons_d_operatore
3.7 Cons_d_stato
Descrizione Tabella di dominio che contiene gli stati
Specializzazione di
Storicizzazione No
Vincoli di integrità
Regole di modalità di
accesso e visibilità
Volumi attesi Tbd

|  | Descrizione |  | Tabella di dominio che contiene gli operatori |
| --- | --- | --- | --- |
|  | Specializzazione di |  |  |
|  | Storicizzazione |  | No |
|  | Vincoli di integrità |  |  |
|  | Regole di modalità di |  |  |
|  | accesso e visibilità |  |  |
|  | Volumi attesi |  | Tbd |
|  | Note |  |  |

|  | Descrizione |  | Tabella di dominio che contiene gli stati |
| --- | --- | --- | --- |
|  | Specializzazione di |  |  |
|  | Storicizzazione |  | No |
|  | Vincoli di integrità |  |  |
|  | Regole di modalità di |  |  |
|  | accesso e visibilità |  |  |
|  | Volumi attesi |  | Tbd |

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 11 di 16
Note
3.7.1 Attributi dell'entità
3.7.2 Relazioni
3.7.2.1 Elenco relazioni dell’entità cons_d_stato
3.8 Cons_d_fonte
Descrizione Tabella di dominio che contiene le fonti
Specializzazione di
Storicizzazione No
Vincoli di integrità
Regole di modalità di
accesso e visibilità
Volumi attesi Tbd
Note
3.8.1 Attributi dell'entità

|  | Descrizione |  | Tabella di dominio che contiene le fonti |
| --- | --- | --- | --- |
|  | Specializzazione di |  |  |
|  | Storicizzazione |  | No |
|  | Vincoli di integrità |  |  |
|  | Regole di modalità di |  |  |
|  | accesso e visibilità |  |  |
|  | Volumi attesi |  | Tbd |
|  | Note |  |  |

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 12 di 16
3.8.2 Relazioni
3.8.2.1 Elenco relazioni dell’entità cons_d_fonte
3.9 Cons_d_tipo_fonte
Descrizione Tabella di dominio che contiene le tipologie di fonti
Specializzazione di
Storicizzazione No
Vincoli di integrità
Regole di modalità di
accesso e visibilità
Volumi attesi Tbd
Note

|  | Descrizione |  | Tabella di dominio che contiene le tipologie di fonti |
| --- | --- | --- | --- |
|  | Specializzazione di |  |  |
|  | Storicizzazione |  | No |
|  | Vincoli di integrità |  |  |
|  | Regole di modalità di |  |  |
|  | accesso e visibilità |  |  |
|  | Volumi attesi |  | Tbd |
|  | Note |  |  |

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 13 di 16
3.9.1 Attributi dell'entità
3.9.2 Relazioni
3.9.2.1 Elenco relazioni dell’entità cons_d_tipo_fonte
3.10 Cons_d_informativa
Descrizione Tabella di dominio che contiene l’elenco delle informative per tipo e sottotipo
consenso
Specializzazione di
Storicizzazione No
Vincoli di integrità
Regole di modalità di
accesso e visibilità
Volumi attesi Tbd
Note

| Descrizione |  |  | Tabella di dominio che contiene l’elenco delle informative per tipo e sottotipo consenso |
| --- | --- | --- | --- |
|  | Specializzazione di |  |  |
|  | Storicizzazione |  | No |
|  | Vincoli di integrità |  |  |
|  | Regole di modalità di |  |  |
|  | accesso e visibilità |  |  |
|  | Volumi attesi |  | Tbd |
|  | Note |  |  |

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 14 di 16
3.10.1 Attributi dell'entità
3.10.2 Relazioni
3.10.2.1 Elenco relazioni dell’entità cons_d_informativa
3.11 Cons_d_sotto_tipo_cons
Descrizione Tabella di dominio che contiene i sottotipi di consenso
Specializzazione di
Storicizzazione No
Vincoli di integrità
Regole di modalità di
accesso e visibilità
Volumi attesi Tbd
Note

|  | Descrizione |  | Tabella di dominio che contiene i sottotipi di consenso |
| --- | --- | --- | --- |
|  | Specializzazione di |  |  |
|  | Storicizzazione |  | No |
|  | Vincoli di integrità |  |  |
|  | Regole di modalità di |  |  |
|  | accesso e visibilità |  |  |
|  | Volumi attesi |  | Tbd |
|  | Note |  |  |

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 15 di 16
3.11.1 Attributi dell'entità
3.11.2 Relazioni
3.11.2.1 Elenco relazioni dell’entità cons_d_sotto_tipo_cons
3.12 Cons_d_tipo_cons
Descrizione Tabella di dominio che contiene l’elenco dei tipi di consenso
Specializzazione di
Storicizzazione No
Vincoli di integrità
Regole di modalità di
accesso e visibilità
Volumi attesi Tbd
Note

|  | Descrizione |  | Tabella di dominio che contiene l’elenco dei tipi di consenso |
| --- | --- | --- | --- |
|  | Specializzazione di |  |  |
|  | Storicizzazione |  | No |
|  | Vincoli di integrità |  |  |
|  | Regole di modalità di |  |  |
|  | accesso e visibilità |  |  |
|  | Volumi attesi |  | Tbd |
|  | Note |  |  |

---

CONSENSI
CODICE_DOC
MODELLO - DIZIONARIO DATI
Pag. 16 di 16
3.12.1 Attributi dell'entità
3.12.2 Relazioni
3.12.2.1 Elenco relazioni dell’entità cons_d_tipo_cons
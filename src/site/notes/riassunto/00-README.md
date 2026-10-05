---
{"dg-publish":true,"permalink":"/riassunto/00-readme/","dg-note-properties":{}}
---

# Riassunto tecnico-funzionale dei CDU — Gestione Consensi (CONSPREF)

Aggiornato al 05/10/2026. Fonte principale: `CONSPREF-SRS-V1.0-revised_v10.md` (rev. 1.9), integrata con ADR-001÷023, riscontro CSI del 25/09/2026, ricognizione endpoint AS-IS del 22/09/2026 e risposta al team FE sul Form Renderer del 01/10/2026.

Lo scopo di questa cartella è pratico: leggendo un file si deve capire **cosa fa il caso d'uso** e **come va sviluppato**. Per il dettaglio normativo resta valido l'SRS: qui ogni file rimanda ai paragrafi di riferimento.

---

## 1. Il sistema in due righe

Gestione Consensi è il sistema regionale (Regione Piemonte, gestito da CSI) che raccoglie e conserva i consensi sanitari degli assistiti: nazionali (es. FSE), regionali (es. presa in carico cronicità) e aziendali (es. Ritiro On Line referti di una singola ASR). Ogni variazione viene storicizzata e notificata ai Sistemi Informativi Aziendali (SIA) delle ASR.

Il progetto è un **rifacimento**: stesso dominio, nuovo stack (Angular 19 + Spring Boot 3.4.10+ / Java 17 + PostgreSQL 18 su IaaS Nivola), nuove funzioni di configurazione e nuove API verso i SIA.

## 2. Perimetro di sviluppo (ADR-021, precisato 22/09/2026 e 25/09/2026)

- **Si sviluppa un solo frontend: la Webapp Operatore**, a cui si accede dal PUA con profilo unico Operatore.
- La **Webapp Cittadino** esiste già, è separata e non si tocca. Il **backend però è unico**: va rifatto anche per i servizi che usa la Webapp Cittadino, senza cambiarne il contratto (iso-funzionalità).
- Gestione Deleghe è **fuori perimetro**: il backend non la chiama, riceve solo il CF del delegato (`cf_delegato`) e lo registra.
- GASP Salute (SPID/CIE del cittadino): niente nuova progettazione, ma il backend non deve rompere l'autenticazione della Webapp Cittadino.

### Mappa dei CDU

| CDU | Nome | FE (Webapp Operatore) | BE | File |
|---|---|---|---|---|
| CDU-01a | Accesso operatore da PUA | ✅ | ✅ | [CDU-01a](CDU-01a-accesso-operatore.md) |
| CDU-01b, 02, 03, 04 | Area Cittadino | ❌ | ✅ iso-funzionalità | [BE Cittadino](BE-cittadino-CDU-01b-02-03-04.md) |
| CDU-05 | Modifica valore (operatore) | coincide con CDU-11 | ✅ | [CDU-05/11](CDU-05-CDU-11-modifica-valore.md) |
| CDU-06 | Scarico informativa | ✅ (solo lato operatore, da CDU-08) | ✅ unico servizio per Op. e Citt. | [CDU-06](CDU-06-scarico-informativa.md) |
| CDU-07 | Ricerca assistito (AURA) | ✅ | ✅ | [CDU-07](CDU-07-ricerca-assistito.md) |
| CDU-08 | Consultazione consensi assistito | ✅ | ✅ | [CDU-08](CDU-08-consultazione-consensi.md) |
| CDU-09 | Rilascio consenso per conto | ✅ | ✅ | [CDU-09](CDU-09-rilascio-consenso.md) |
| CDU-10 | Modifica consenso per conto | ✅ | ✅ | [CDU-10](CDU-10-modifica-consenso.md) |
| CDU-11 | Modifica valore per conto | ✅ | ✅ | [CDU-05/11](CDU-05-CDU-11-modifica-valore.md) |
| CDU-12 | Gestione tipo consenso | ✅ (Back Office) | ✅ | [CDU-12](CDU-12-gestione-tipo-consenso.md) |
| CDU-13 | Gestione informativa | ✅ (Back Office) | ✅ | [CDU-13](CDU-13-gestione-informativa.md) |
| CDU-14 | Gestione enti ed endpoint | ✅ (Back Office) | ✅ + API per aziende via APIM | [CDU-14](CDU-14-gestione-ente-endpoint.md) |
| CDU-15 | API stato consenso per SIA | — | ✅ | [CDU-15](CDU-15-api-stato-consenso.md) |
| CDU-16 | API configurazione per SIA | — | ✅ | [CDU-16](CDU-16-api-configurazione.md) |
| CDU-17 | Snapshot PULL per allineamento | — | ✅ | [CDU-17](CDU-17-snapshot-pull.md) |
| BATCH-01 | Notifica consensi alle aziende | — | ✅ | [BATCH-01](BATCH-01-notifica-consensi.md) |
| BATCH-02 | Scadenza/annullamento informativa | — | ✅ | [BATCH-02](BATCH-02-scadenza-informativa.md) |
| §7.4 | Manutenzione endpoint ASR (start/stop) | messaggio di indisponibilità | ✅ | [Manutenzione](MANUTENZIONE-endpoint-asr.md) |
| BATCH-03 | Allineamento push | **rimosso**, sostituito da CDU-17 | — | — |

**Lista FE Operatore da stimare:** 01a, 06, 07, 08, 09, 10, 11, 12, 13, 14 (CDU-05 lato operatore è la stessa maschera di CDU-11).

## 3. Componenti trasversali

Prima dei singoli CDU conviene leggere [TRASV-componenti-comuni.md](TRASV-componenti-comuni.md). Contiene i pezzi riusati da più casi d'uso:

- motore di **storicizzazione** del consenso (mai UPDATE in place);
- **coda di notifica** `cons_t_notifica` alimentata dai CDU e svuotata da BATCH-01;
- **audit** (`csi_log_audit`) e **tracciatura servizi esterni** (`cons_t_traccia_serv_est`);
- sicurezza: sessione PUA per la webapp, API Manager APIMBBONE per i SIA;
- client SOAP (Apache CXF) verso AURA e SIA; servizio SOAP in ingresso `/services/ConsprefService` da mantenere;
- errori RFC 7807;
- **Form Renderer** dinamico per CDU-09/10/11;
- colonne nuove da creare in migrazione.

## 4. Ordine di sviluppo consigliato

L'ordine segue le dipendenze reali tra i pezzi.

1. **Fondamenta**: schema DB TO-BE e script di migrazione (colonne nuove: `online`, `annulla_consensi`, `stato_elaborazione` su `cons_d_informativa`; `tipo_ente` su `cons_d_asr`; `stato_allineamento` su `cons_r_asr_endpoint`; tabelle nuove come `cons_r_consenso_valore` popolata SI/NO, `cons_t_traccia_serv_est`, `cons_t_batch_errori`, `cons_d_asr_destinazione`), audit, gestione errori, sicurezza PUA.
2. **CDU-01a** (accesso) e **CDU-07** (ricerca AURA): senza questi non si entra nella webapp.
3. **CDU-08** (elenco consensi) e **CDU-06** (scarico informativa).
4. **Motore di storicizzazione + coda notifiche**, poi **CDU-11/05** (il più semplice dei tre form), quindi **CDU-09** e **CDU-10** sul Form Renderer.
5. **BATCH-01** (consuma la coda creata al punto 4).
6. **Back Office**: CDU-12 → CDU-13 → CDU-14 (CDU-12 popola le tabelle che il Form Renderer legge).
7. **BATCH-02** (scatta dalle informative gestite in CDU-13).
8. **API SIA**: OpenAPI di CDU-15/16/17 prima del codice, poi implementazione dietro APIMBBONE; CDU-17 e manutenzione endpoint dipendono dallo `stato_allineamento` di CDU-14.
9. **Backend area Cittadino** a iso-funzionalità, in parallelo, appena CSI fornisce l'elenco delle interfacce usate dalla Webapp Cittadino.

## 5. Punti aperti trasversali (da tenere d'occhio)

| Punto | Impatto | Stato |
|---|---|---|
| Elenco interfacce usate dalla Webapp Cittadino sul BE | Senza, l'iso-funzionalità del BE Cittadino non è verificabile | Richiesto a CSI |
| DEV-04: codici HTTP 502/409/503 per errori esterni/DB | Contratto errori FE e integrazioni | In verifica CSI |
| DEV-05: BE raggiungibile solo dal Gateway APIMBBONE (trust sugli header) | Sicurezza CDU-15/16/17 | Conferma architetti CSI |
| DEV-01: `modifyToRevoked` AS-IS e regola di esclusione aziende con endpoint dismessi (ASR 904 da ripristinare) | CDU-08/09, elenco ASR | Parziale |
| Valore effettivo di `fonte_id` per il Punto Assistito (`PASS` etichetta logica, es. `WA_PASS` nel DB AS-IS) | CDU-09/10/11 | Da verificare su `cons_d_fonte` |
| Operazione WSDL esatta per BATCH-01 (SRV-03 / SRV-04) | BATCH-01 | Conferma CSI |
| 5 regole di business del Form Renderer (domande multiple, online=NO lato operatore, default radio, una o più aziende per salvataggio, HTML nei parametri) | CDU-09/10/11 | Da inviare a CSI |
| Stato `IN_MANUTENZIONE` e modello dati start/stop | Manutenzione endpoint | Da dettagliare in progettazione |
| Infrastruttura IaaS: ingress/TLS, segreti, scaling | Deploy | Aperto con CSI |

---
{"dg-publish":true,"permalink":"/wiki/sources/2019-05-01-specifica-ws-consenso-regionale-aziendale-v02c/","title":"Specifica servizi Acquisizione-Revoca e Notifica Consenso v02c (CPROL)","tags":["soap","webservice","as-is","cprol","consprefservice","srv-03","srv-04","sicurezza","asr"],"dg-note-properties":{"title":"Specifica servizi Acquisizione-Revoca e Notifica Consenso v02c (CPROL)","aliases":["Specifica WebService ConsensoRegionaleAziendale v02c","Documento CPROL"],"type":"source","tags":["soap","webservice","as-is","cprol","consprefservice","srv-03","srv-04","sicurezza","asr"],"created":"2026-11-06","updated":"2026-11-06","sources":[],"related":["[[2019-06-01-webservice-consenso-regionale-v03|Specifica WebService v03 (pagina da citazioni SRS)]]","[[2026-11-05-call-csi-analisi-dubbi|Call CSI 05/11/2026]]","[[sistemi-esterni-integrati|Sistemi Esterni Integrati]]","[[ciclo-vita-consenso|Ciclo di Vita del Consenso]]","[[batch-processes|Processi Batch]]"]}}
---


# Specifica servizi Acquisizione-Revoca e Notifica Consenso v02c

**File:** `raw/Specifica-WebService_ConsensoRegionaleAziendale_v02.md` + `.pdf` (diagrammi di sequenza a pag. 43-45)
**Autore:** CSI Piemonte · **Data:** maggio 2019 · **Uso:** esterno
**Ricevuto:** 05/11/2026, è il «documento CPROL» promesso da CSI nella [[wiki/sources/2026-11-05-call-csi-analisi-dubbi\|call del 05/11]] (ST-07).
**Versione:** v02c. L'SRS cita la v03 (giugno 2019), che non abbiamo: vedi [[wiki/sources/2019-06-01-webservice-consenso-regionale-v03\|2019-06-01-webservice-consenso-regionale-v03]].

## Di cosa parla

- Contratto SOAP 1.2 tra il Modulo Regionale Gestione Consensi (MRGC, cioè CONSPREF) e le ASR.
- Primo e unico consenso reale: **CPROL**, «Consenso Permanente al ROL», cioè il ritiro dei referti online. È un consenso **aziendale**: il cittadino lo esprime per ogni singola ASR.
- La scelta fatta per la singola prestazione all'accettazione resta indipendente dal consenso permanente.
- Canali: Webapp Cittadino, Webapp Punto Assistito, LIS/RIS o altri sistemi dell'ASR.
- Il consenso dato dal cittadino o dal Punto Assistito si notifica alle ASR in modo **asincrono**. Quello dato da un sistema dell'ASR arriva al regionale in modo **sincrono**.

## Servizi

- **SRV-01 AcquisizioneConsenso**: ASR, Webapp Cittadino e Punto Assistito → regionale. `elencoConsensi` 1..N, ogni consenso ha un valore e, se aziendale, la sua ASR.
- **SRV-02 RevocaConsenso**: stessi chiamanti; `elencoAsr` 1..N. Se non c'è nulla da revocare risponde con l'avviso AVV_0001.
- **SRV-03 NotificaAcquisizioneConsenso**: regionale → ASR, esposto dall'ASR. Valore solo SI o NO.
- **SRV-04 NotificaRevocaConsenso**: regionale → ASR, esposto dall'ASR. Nell'XML il primo campo si chiama `identificativoNotifica`, nella descrizione `requestId`.
- **SRV-05 VerificaServizio**: implementato sia dal regionale sia dalle ASR. Risponde con esito, codice servizio, versione del WSDL (1.0) e timestamp, utile a controllare il fuso orario.
- Namespace nel documento: `http://conspref.csi.it`.

## Campi principali (SRV-01)

- `requestId` (UUID) e `codiceServizio`, l'applicativo chiamante: il codice va concordato con CSI.
- `cfRichiedente` e `idAura`, entrambi obbligatori. Se non corrispondono: ERR_0028.
- `cfDelegato` e `operatore` (tipo e codice), facoltativi.
- `fonte`:
  - tipo `CITT`, `PASS`, `ASR`, `LIS`, `RIS`;
  - codice `WA_CITT`, `WA_PASS`, oppure il codice ISTAT dell'ASR senza codice regione (es. 301 = ASL TO1).
- `dataAcquisizione` nel formato `yyyymmddhhmmss`.
- `codiceTipoConsenso`: `A` aziendale, `R` regionale. Con `R` il codice ASR **non** va valorizzato (ERR_0026).
- `codiceSottotipoConsenso`: per ora solo `CPROL`, con descrizione «Consenso Permanente ROL».
- `valoreConsenso`: `SI`, `NO`, `NE` (non espresso). Nelle notifiche SRV-03 solo `SI` e `NO`.

## Esiti

- Esito: `0000` nessun errore, `0001` avviso, `9999` errore bloccante.
- Errori di SRV-01/02: da ERR_0001 a ERR_0028 (in SRV-02 mancano ERR_0022, 0023 e 0026), più AVV_0001.
- Le ASR, per le notifiche, rispondono solo con `ASR_ER_100` quando non sono riuscite ad acquisire la notifica.

## Sicurezza (§2.3 e §10)

- **Servizi esposti da CSI alle ASR (SRV-01/02, ConsprefService):**
  - HTTPS con **WS-Security**, profilo Sign and Encrypt, X509 con timestamp;
  - un certificato per ogni sistema ASR, lo stesso dell'alimentazione FSE (RegistraEpisodio3);
  - l'associazione tra certificato e sistema è configurata nel DB;
  - durante il rinnovo sono accettati sia il certificato vecchio sia quello nuovo.
- **Servizi esposti dalle ASR (SRV-03/04, chiamati da CSI):**
  - **SSL Client Authentication** (mutual TLS) con **un solo certificato**, uguale per tutte le ASR;
  - truststore dei server ASR, timeout parametrico;
  - tutti i messaggi e le risposte sono tracciati in chiaro, nella forma originale;
  - un'ASR lenta o guasta non deve degradare il sistema.
- **Servizi interni:** basic authentication.

> ⚠️ **Conflict:** questa specifica assegna WS-Security X509 ai servizi in ingresso (ConsprefService) e il mutual TLS alle chiamate in uscita verso le ASR. La pagina [[wiki/sources/2019-06-01-webservice-consenso-regionale-v03\|2019-06-01-webservice-consenso-regionale-v03]] e altre pagine della wiki riportano l'opposto, e [[wiki/docs/adr/ADR-027-architettura-senza-api-manager\|ADR-027]] parla di «mutual TLS come per ConsprefService». Da verificare con CSI la configurazione reale di oggi (ST-11). Unresolved.

## Notifiche e diagrammi di sequenza (cap. 11)

- CSI è responsabile solo di notificare gli endpoint a cui l'ASR si è iscritta. Quello che succede dentro l'ASR è solo un esempio.
- **11.1, dalla Webapp Cittadino:** SRV-01 per ASR1 e ASR2. Il regionale notifica il MAGC di ASR1, che inoltra a LIS e RIS, e direttamente il LIS di ASR2, che non ha MAGC.
- **11.2, dal LIS di un'ASR con MAGC:** il LIS manda al MAGC, il MAGC manda al regionale (SRV-01). Il regionale **rinotifica il MAGC**, che inoltra a RIS e anche al LIS di partenza.
- **11.3, dal LIS di un'ASR senza MAGC:** il LIS manda al regionale. Il regionale notifica **anche il LIS di partenza** e il RIS.
- Se un'ASR ha il modulo aziendale (MAGC), il regionale notifica solo quello.

> ⚠️ **Da chiarire con CSI:** §2.1 e i tipi fonte di SRV-03/04 (solo CITT e PASS) dicono che si notificano solo i consensi arrivati da cittadino o Punto Assistito. I diagrammi 11.2 e 11.3 notificano anche quelli arrivati da un sistema dell'ASR. Nella call del 05/11 CSI (Sabina) ha detto che la notifica parte se c'è l'endpoint, da qualunque canale.

## Allineamento massivo (cap. 9)

- File CSV fornito da CSI **su richiesta dell'ASR**, solo dopo una nuova installazione (nuovo gestore aziendale o nuovo dipartimentale).
- Tracciato: `cfRichiedente;idAura;dataAcquisizione;codiceTipoConsenso;codiceSottotipoConsenso;valoreConsenso;codiceASR;`
- Non è un servizio. Nel TO-BE lo sostituisce lo snapshot di CDU-17 ([[wiki/concepts/alternativa-batch-03-pull\|alternativa-batch-03-pull]]).

---
{"dg-publish":true,"permalink":"/wiki/sources/2026-09-25-riscontro-csi-domande-sviluppo/","title":"Riscontro CSI alle domande di sviluppo (mail 24-25/09/2026)","tags":["csi-piemonte","sviluppo","informativa","deleghe","soap","errori-http","sicurezza","cdu-06","perimetro"],"dg-note-properties":{"title":"Riscontro CSI alle domande di sviluppo (mail 24-25/09/2026)","aliases":["Riscontro CSI alle domande di sviluppo (mail 24-25/09/2026)","Riscontro CSI domande sviluppo"],"type":"source","tags":["csi-piemonte","sviluppo","informativa","deleghe","soap","errori-http","sicurezza","cdu-06","perimetro"],"created":"2026-09-25","updated":"2026-09-25","sources":[],"related":["[[analysis-2026-05-14-punti-aperti-csi|Punti Aperti CSI — Tracker Unificato]]","[[2026-09-22-ricognizione-endpoint-as-is|Ricognizione endpoint AS-IS — riscontro sviluppo]]","[[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]]","[[sicurezza-cdu-15-16|Sicurezza CDU-15-16 — Modello Autorizzazione per Ente]]","[[wiki/docs/adr/ADR-020-lis-integrazione-be-esistente\|ADR-020]]","[[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]]","[[wiki/docs/adr/ADR-022-cdu-06-scarico-informativa-operatore\|ADR-022]]"]}}
---


# Riscontro CSI alle domande di sviluppo (mail 24-25/09/2026)

**Domande:** mail di Marco Forneris (Exprivia) a [[wiki/entities/csi-piemonte\|CSI Piemonte]], sera del 24/09/2026. Raccoglie sei domande poste dal team di sviluppo durante la costruzione del backend.
**Risposta:** mail di CSI Piemonte, mattina del 25/09/2026. È dichiarata *«un primo riscontro»*: su due punti (4 e 5) CSI si riserva una verifica prima di chiudere.

I punti sono tracciati come **DEV-01÷DEV-06** in [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI]] §9.

---

## Sintesi

| # | Tema | Risposta CSI | Stato |
|---|---|---|---|
| DEV-01 | Servizi `/informativa/*` chiamati dal frontend | Ripristinare l'ASR 904 (San Luigi). Rivedere la logica di esclusione delle aziende che hanno dismesso endpoint. Adeguare il FE ai servizi del nuovo BE, se compatibile con i requisiti | 🟡 **Parziale:** `modifyToRevoked` senza risposta, regola di esclusione da definire |
| DEV-02 | Gestione Deleghe (BE-02) | Non è in questo perimetro. Il servizio riceve il CF del delegato che opera per il cittadino | ✅ **Chiuso** |
| DEV-03 | SOAP in ingresso `/services/ConsprefService` | Va mantenuto, per compatibilità con le integrazioni SOAP esistenti | ✅ **Chiuso:** resta SOAP, accesso da sbloccare |
| DEV-04 | Codici HTTP per errori esterni (502/409/503) | Classificazione coerente, ma da verificare l'impatto su FE e integrazioni prima di confermare | 🟡 **In verifica CSI** |
| DEV-05 | JWT validato dall'API Manager, backend in trust | Allineato all'architettura abituale. Conferma formale richiesta agli architetti. Le aziende federate restano sulla canalità esistente | 🟡 **In verifica CSI** (conferma architetti) |
| DEV-06 | Download/stampa PDF (CDU-06) | Il sistema deve prevedere lo scarico dell'informativa sia per il cittadino sia per l'operatore di BO | ✅ **Chiuso:** nasce [[wiki/docs/adr/ADR-022-cdu-06-scarico-informativa-operatore\|ADR-022]] |

---

## Dettaglio per punto

### DEV-01 — Servizi "informativa" richiesti dal frontend

**Domanda.** Il frontend Operatore AS-IS chiama `/informativa/find`, `/informativa/get-asl-list` e `/informativa/update` (baseline in [[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|Ricognizione endpoint AS-IS]]). Nel vecchio sistema questi servizi elencano tutte le informative e, per ciascuna, raccolgono i consensi di ogni ASR. Nel nuovo backend il modello è diverso. Nel codice ci sono due comportamenti non documentati:
- in salvataggio, il passo `modifyToRevoked` porta il consenso a "revocato" prima di salvare;
- nell'elenco ASR, l'**ASR 904 (San Luigi)** è esclusa, con un commento che la indica come "modifica temporanea".

Proposta Exprivia: adattare il frontend ai servizi del nuovo backend anziché ricostruire la logica del vecchio.

**Risposta CSI.**
- L'azienda **San Luigi va ripristinata**: l'esclusione hard-coded dell'ASR 904 decade.
- Va **rivista la logica di esclusione delle aziende che hanno dismesso degli endpoint**. L'esclusione non deve più dipendere da un codice ASR scritto nel codice, ma dallo stato degli endpoint dell'azienda.
- **Proposta accolta con riserva:** adeguare il frontend ai servizi del nuovo backend, *«qualora risulti compatibile con i requisiti funzionali»*.

**Residuo aperto.**
- `modifyToRevoked` non ha avuto risposta: va richiesta di nuovo, oppure chiusa con una decisione interna documentata.
- La regola di esclusione "azienda con endpoint dismessi" va definita. Come si riconosce un endpoint dismesso? Serve lo stato endpoint gestito da CDU-14? L'esclusione si applica se tutti gli endpoint sono dismessi o ne basta uno? Riguarda solo l'elenco ASR o anche la raccolta consensi?
- Adeguare il FE ai servizi nuovi rompe la baseline di iso-funzionalità del FE Operatore della ricognizione del 22/09. Il riferimento diventano i requisiti funzionali SRS, non il contratto AS-IS. I servizi `/informativa/*` restano comunque da non rompere se li consuma anche la Webapp Cittadino (elenco richiesto a CSI, [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]] §Open issues).

### DEV-02 — Gestione Deleghe (BE-02)

**Domanda.** Il WSDL `DelegheCittadiniService` è solo un file nella cartella `docs` del vecchio progetto: nessuna classe generata, nessun riferimento nel build. L'integrazione **non è mai stata realizzata** nel codice AS-IS. Con questo si risolve anche la domanda di dettaglio aperta il 22/09 (stub JAX-WS inutilizzati oppure file isolato): era un file isolato.

**Risposta CSI.**
- La gestione delle Deleghe **non è in questo perimetro**.
- Il servizio **riceverà il CF del delegato** che sta operando per il cittadino.

**Lettura.** Il backend **non interroga** Gestione Deleghe. La verifica della delega avviene a monte, e al backend arriva solo il CF del delegato come dato di input. Si chiude così il conflict aperto il 22/09 in [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] §Gestione Deleghe: non c'è integrazione da migrare né da costruire. **BE-02 esce dal backlog di integrazione**; al suo posto resta l'accettazione del campo `cf_delegato` sul servizio.

**Residuo (non bloccante).** Serve un dettaglio di contratto: quale servizio riceve il CF del delegato, con quale nome di campo, e se il backend lo deve persistere (tracciabilità di chi ha operato).

### DEV-03 — Servizio SOAP in ingresso `/services/ConsprefService`

**Domanda.** Il nuovo backend mantiene l'endpoint SOAP come nell'AS-IS, ma con la configurazione di sicurezza attuale il chiamante riceverebbe accesso negato. Chi lo usa? Deve restare SOAP?

**Risposta CSI.** Il servizio **va mantenuto** per garantire la compatibilità con le integrazioni SOAP esistenti.

**Conseguenze.**
- Resta **SOAP**, con **contratto invariato**. Va **sbloccato l'accesso** nella configurazione di sicurezza del nuovo backend, con un meccanismo di autenticazione equivalente a quello AS-IS (da verificare sul sorgente: certificati X509 per ASR, secondo [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] §Stato approvvigionamento).
- **Risponde alla lacuna L1** di [[wiki/docs/adr/ADR-020-lis-integrazione-be-esistente\|ADR-020]]: un endpoint SOAP esposto in ingresso esiste. È plausibilmente l'implementazione dei servizi della [[wiki/sources/2019-06-01-webservice-consenso-regionale-v03\|specifica v03]] (namespace `http://consprefbe.csi.it/`). Rafforza l'ipotesi di ADR-020 che LIS/RIS siano fruitori di questo canale. Per confermarla resta la verifica su `fonte_id`.

### DEV-04 — Errori dovuti a sistemi esterni

**Proposta Exprivia.** Oggi un guasto di AURA, di un'ASR o del database restituisce un generico 500. Proposta di distinguere:
- sistema esterno non raggiungibile (AURA, ASR, UNP) → **502**;
- vincolo di database violato → **409**;
- database non disponibile → **503**.

**Risposta CSI.** Classificazione **tecnicamente coerente**; migliora la gestione degli errori lato client. **Prima della conferma definitiva** va verificato l'impatto sul frontend e sulle integrazioni esistenti.

**Stato.** Aperto, in verifica. Il perimetro della verifica non è simmetrico:
- il **FE Operatore** lo costruiamo noi, quindi l'impatto è sotto il nostro controllo;
- la **Webapp Cittadino** (FE fuori perimetro, contratto da preservare) e le **integrazioni SOAP** (DEV-03) sono vincolate all'AS-IS. Lì cambiare i codici HTTP significa cambiare il contratto.

Un'ipotesi che tiene insieme le due cose: applicare la nuova classificazione ai soli servizi REST nuovi e a quelli consumati dal FE Operatore, e lasciare invariato il comportamento sui contratti AS-IS. Da proporre a CSI. Il formato del corpo di errore resta quello di [[wiki/docs/adr/ADR-018-rfc-7807-error-response\|ADR-018]] (RFC 7807).

### DEV-05 — Sicurezza dei servizi verso i SIA (CDU-15/16)

**Domanda.** L'SRS prevede un JWT (OAuth2). Il backend delega la validazione del token al gateway API Manager e si fida delle informazioni che il gateway inoltra (`codice_ente` ecc.). È corretto, a condizione che il backend sia raggiungibile solo dal gateway?

**Risposta CSI.**
- L'approccio (JWT validato dall'API Manager, backend raggiungibile **esclusivamente** tramite gateway) è **allineato all'architettura normalmente adottata**.
- CSI chiederà comunque una **conferma formale agli architetti di riferimento** prima di considerare chiuso il punto.
- CSI ribadisce che **le aziende oggi federate devono continuare a usare la canalità esistente**.

**Lettura.** Il modello è già quello di [[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15-16]] (call 20/07/2026). Il vincolo *«backend raggiungibile solo via gateway»* diventa **requisito infrastrutturale esplicito**, da verificare in fase di deploy su IaaS (segregazione di rete, nessuna esposizione diretta).

La frase sulle aziende federate va letta insieme a DEV-03: le ASR già integrate oggi **non vengono migrate** ai nuovi servizi REST via API Manager e continuano sul canale AS-IS (SOAP). Il nuovo canale REST (CDU-15/16/17) **si affianca** a quello esistente senza sostituirlo. Il backend espone quindi due canali in parallelo verso le aziende, con due modelli di sicurezza distinti.

> ⚠️ **Da confermare con CSI:** che "federate" indichi le aziende integrate sul canale SOAP `ConsprefService`, e che nessuna di esse debba passare a REST nel perimetro V1.0.

### DEV-06 — Download/stampa PDF (CDU-06)

**Domanda (già in sospeso).** Nell'SRS il CDU-06 compare tra le funzioni dell'Area Cittadino, fuori dal nostro sviluppo. Serve che l'operatore scarichi o stampi il PDF per conto dell'assistito?

**Risposta CSI.** Il sistema deve prevedere lo **scarico dell'informativa sia per il cittadino sia per l'operatore di BO**.

**Conseguenze** (formalizzate in [[wiki/docs/adr/ADR-022-cdu-06-scarico-informativa-operatore\|ADR-022]]):
- l'oggetto è l'**informativa**, non un'attestazione del consenso (coerente con lo scope ridotto di [[wiki/docs/adr/ADR-019-cdu-06-pdf-scope-ridotto\|ADR-019]]);
- **lato Operatore:** nuova funzione di **frontend** nella Webapp Operatore, quindi in perimetro di sviluppo. L'"operatore di BO" è il **profilo unico Operatore** (call 06/08/2026);
- **lato Cittadino:** frontend fuori perimetro, ma il servizio backend di scarico va garantito ([[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]] §Precisazione 22/09/2026);
- un **servizio backend unico** serve entrambi i consumatori. Il contratto AS-IS `Informativa` espone già il campo `pdf_informativa` ([[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|ricognizione]]): lo scarico può poggiare sul PDF già memorizzato, senza generazione.

CSI non si è espresso su dove collocare la funzione nell'SRS (proposta Exprivia: tra le funzioni Operatore, CDU-09/10).

---

## Impatti sulla wiki

| Pagina | Aggiornamento |
|---|---|
| [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI]] | Nuova §9 DEV-01÷06; INT-02 annotato |
| [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] | §Gestione Deleghe: conflict chiuso, fuori perimetro; mappa integrazioni e tabella approvvigionamento |
| [[wiki/docs/adr/ADR-020-lis-integrazione-be-esistente\|ADR-020]] | L1 risolta: `ConsprefService` SOAP esposto e da mantenere |
| [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]] | Open issue Deleghe chiuso; CDU-06 rientra in parte nel FE Operatore (rinvio ad ADR-022) |
| [[wiki/docs/adr/ADR-022-cdu-06-scarico-informativa-operatore\|ADR-022]] | **Nuovo** |
| [[wiki/docs/adr/ADR-019-cdu-06-pdf-scope-ridotto\|ADR-019]] | Nota: lo scope "solo informativa" torna attuale tramite ADR-022 |
| [[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15-16]] | Trust boundary sul gateway: in conferma formale; canalità esistente per le aziende federate |
| [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi - Applicativo]] | CDU-06 esteso all'Operatore |
| [[wiki/analyses/analysis-gap-as-is-to-be\|Gap AS-IS → TO-BE]] | Riga CDU-06 |
| [[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|Ricognizione endpoint AS-IS]] | Punti aperti Deleghe e L1 evasi |

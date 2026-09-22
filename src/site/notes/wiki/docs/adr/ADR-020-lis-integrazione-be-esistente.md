---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-020-lis-integrazione-be-esistente/","title":"LIS/RIS — integrazione BE esistente, non terzo canale di acquisizione","tags":["lis","ris","canali-acquisizione","int-03","integrazione"],"dg-note-properties":{"adr":20,"title":"LIS/RIS — integrazione BE esistente, non terzo canale di acquisizione","status":"accepted","date":"2026-08-06","deciders":["CSI Piemonte","Exprivia"],"supersedes":[17],"superseded-by":[],"tags":["lis","ris","canali-acquisizione","int-03","integrazione"],"related_wiki":["[[Gestione Consensi - Applicativo]]","[[Sistemi Esterni Integrati]]","[[wiki/docs/adr/ADR-017-lis-terzo-canale\|ADR-017-lis-terzo-canale]]","[[ADR-021-perimetro-solo-operatore]]","[[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|Ricognizione endpoint AS-IS — riscontro sviluppo]]","[[2019-06-01-webservice-consenso-regionale-v03|Specifica WebService ConsensoRegionaleAziendale v03 (AS-IS)]]"],"sources":["Call CSI 06/08/2026","2026-09-22-ricognizione-endpoint-as-is"]}}
---


# ADR-020: LIS/RIS — integrazione BE esistente, non terzo canale di acquisizione

## Status

`accepted` — chiarimento CSI in call 06/08/2026. Chiude INT-03. Supersede [[wiki/docs/adr/ADR-017-lis-terzo-canale\|ADR-017]].

## Context

[[wiki/docs/adr/ADR-017-lis-terzo-canale\|ADR-017]] (14/05/2026) aveva introdotto LIS come **terzo canale di acquisizione consensi**, distinto da Webapp Cittadino e Webapp Operatore, sulla base della risposta CSI a MF3R1/MF4R1: "Consensi esprimibili anche presso LIS oltre webapp cittadino e Operatore". L'acronimo LIS non era mai stato sciolto formalmente (punto aperto INT-03), e la wiki aveva modellato l'ipotesi di un canale UI dedicato con profilo operatore LIS, `fonte_id` proprio e possibile riuso del Form Renderer SSoT.

In call CSI del 06/08/2026, il cliente ha chiarito il punto:

> Sui nuovi sviluppi (funzionali e non funzionali) **non esiste un terzo canale di acquisizione consensi**. L'acquisizione presso LIS (e analogamente presso sistemi come RIS) **avviene tramite un'integrazione BE già presente sul codice sorgente** AS-IS. È solo da **controllare e migrare al nuovo stack**.

Questo ribalta l'assunzione architetturale di ADR-017: LIS non è un nuovo punto di accesso (UI/webapp) da progettare, ma un'integrazione backend **già esistente e funzionante** nel sistema AS-IS, che il progetto TO-BE deve verificare e portare sul nuovo stack (Spring Boot 3 / [[wiki/concepts/migrazione-postgres-9-17\|PostgreSQL 18]]), non reinventare.

## Decision

- **Nessun terzo canale di acquisizione UI.** I canali restano **due**: Webapp Cittadino (SPID/CIE) e Webapp Operatore (PUA).
- **LIS (e sistemi analoghi come RIS)** acquisiscono/inviano consensi tramite un'**integrazione BE preesistente nel codice sorgente AS-IS** — verosimilmente un servizio/endpoint già invocato dal sistema laboratorio verso il backend Gestione Consensi, analogo nello spirito a SIA ASR ([[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]]) ma **da individuare nel codice AS-IS**, non da specificare ex-novo.
- **Attività TO-BE:** individuare nel sorgente AS-IS il punto di integrazione LIS, verificarne il contratto (protocollo, payload, `fonte_id` già in uso), e migrarlo al nuovo stack — **non** progettare un nuovo canale, un nuovo profilo operatore o un nuovo endpoint.
- **Composizione dinamica del Form Renderer ([[wiki/docs/adr/ADR-008-ssot-form-renderer\|ADR-008-ssot-form-renderer]]):** il riuso del Form Renderer per un ipotetico "operatore LIS" **non si applica** — l'acquisizione LIS non passa dalla webapp/Form Renderer, ma dall'integrazione BE esistente.
- **`fonte_id`:** se l'integrazione AS-IS scrive già un valore `fonte_id` distinto per LIS (es. `LIS`), tale valore **resta valido come dato storico/AS-IS da preservare in migrazione** — non è un valore introdotto dal nuovo Form Renderer SSoT.

## Consequences

### Positive
- Elimina lavoro di progettazione non necessario (nuovo canale UI, nuovo profilo operatore, nuovo endpoint) — l'integrazione esiste già
- Riduce superficie di test: 2 canali UI (non 3), l'integrazione LIS è verifica/migrazione, non nuova build
- Chiude INT-03 senza bisogno di sciogliere formalmente l'acronimo LIS come prerequisito bloccante — resta utile da chiarire ma non blocca più la progettazione

### Negative
- Richiede **individuare nel codice sorgente AS-IS** il punto di integrazione LIS (attività di reverse engineering, non prevista come tale finché non si accede al repo/DB AS-IS — dipende da [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|INT-04 accesso repo QUASAR/AS-IS]] e dall'audit DDL Sprint 0)
- Finché l'integrazione non è individuata, restano ignoti: protocollo (SOAP/REST/altro), formato payload, eventuali vincoli di sicurezza specifici da migrare
- Documentazione SRS §1/§2 (diagramma di contesto) da **correggere**: torna a 2 canali di acquisizione, non 3 — passo indietro rispetto a quanto già eventualmente recepito in SRS v6

### Neutral
- Il diagramma di contesto SRS mostrerà comunque LIS come sistema esterno integrato (analogamente a SIA ASR), ma **non** come canale di acquisizione UI

## Riscontro AS-IS (22/09/2026) — integrazione non rilevata

La ricognizione del team di sviluppo Exprivia sul sorgente AS-IS consegnato (`consprefbe`, `consprefboweb`, `consprefbowcl`, `consprefdb`, `consprefnotifica`), dichiarata **esaustiva e non limitata ai soli endpoint REST**, **non riporta alcuna integrazione riconducibile a LIS/RIS**. Dettaglio in [[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|Ricognizione endpoint AS-IS — riscontro sviluppo]].

Le uniche interfacce segnalate sono `CittadiniApi` e `InformativaApi` (REST, [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|Webapp Operatore]]); `consprefnotifica` risulta solo client SOAP in uscita; `consprefbe` conterrebbe un solo WAR e un solo EJB jar.

> ⚠️ **Due lacune, non una sola conclusione.** Il riscontro è in tensione con questo ADR, ma **non lo smentisce ancora**: la stessa ricognizione omette anche i servizi SOAP che sappiamo esposti da `consprefbe`, il che indebolisce l'inferenza "non riportato ⇒ non esiste".

| # | Lacuna | Perché è rilevante qui |
|---|---|---|
| **L1** | **Nessun endpoint SOAP esposto segnalato.** La [[wiki/sources/2019-06-01-webservice-consenso-regionale-v03\|Specifica WebService ConsensoRegionaleAziendale v03]] documenta cinque servizi SOAP (SRV-01÷05) esposti dal modulo regionale verso i SIA delle ASR, con namespace `http://consprefbe.csi.it/` — **proprio l'artefatto esaminato**. Le [[wiki/sources/2019-03-20-acc-del-cdu-01-servizi-acquisizione\|specifiche ACC-DEL-CDU-01]] descrivono i corrispondenti servizi di acquisizione inbound (DA01÷DA03) | Se quei servizi non sono stati rilevati pur esistendo, la ricognizione ha un **punto cieco sul lato SOAP inbound** — che è esattamente dove ci aspettiamo di trovare l'integrazione LIS |
| **L2** | **Nessuna integrazione LIS/RIS rilevata**, contro quanto CSI ha dichiarato in call il 06/08/2026 | O l'integrazione non esiste nel materiale consegnato (e CSI va riaperto), o non è stata cercata nella forma giusta (vedi ipotesi sotto) |

### Ipotesi di lavoro: L1 e L2 sono lo stesso punto cieco

Questo ADR ipotizzava che l'acquisizione LIS avvenga tramite un servizio *«analogo nello spirito a SIA ASR»*. Se i servizi SOAP inbound **SRV-01 `AcquisizioneConsenso`** e **SRV-02 `RevocaConsenso`** sono effettivamente esposti da `consprefbe`, l'ipotesi più economica è che **LIS e RIS siano fruitori di quello stesso canale**, non titolari di un'integrazione dedicata — distinti a valle dal solo `fonte_id`, non da un endpoint proprio.

Sotto questa lettura il mancato rilevamento non contraddice ADR-020: cercando un'*integrazione LIS* non si trova nulla, perché non esiste come componente a sé — esiste come **uso del canale SOAP ASR da parte di un fruitore diverso**.

**Verifica che discrimina l'ipotesi:** interrogare il DB AS-IS (`consprefdb`) sui valori distinti di `fonte_id` effettivamente presenti sui consensi storici. Un valore riconducibile a laboratorio/reparto, distinto da quelli di webapp e SIA ASR, conferma il canale e ne identifica il fruitore senza bisogno di trovare codice dedicato.

### Stato

`accepted` **confermato, con verifica pendente.** Il riscontro non è sufficiente a superare la dichiarazione esplicita di CSI del 06/08/2026. Nessuna revisione della decisione finché le due domande di §Open issues non sono evase.

> 📌 Per scelta dell'utente, entrambe le lacune **non sono state incluse nella risposta al fornitore del 22/09/2026** — materiale per la call o per una comunicazione successiva.

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| Mantenere il modello ADR-017 (LIS come canale UI dedicato) | Contraddetto esplicitamente da CSI in call 06/08/2026: l'integrazione esiste già, costruire un canale UI sarebbe lavoro duplicato e non richiesto |
| Trattare LIS come completamente fuori scope | Errato: resta un'integrazione da verificare e migrare — non va ignorata, va solo ridimensionata da "nuovo canale" a "migrazione integrazione esistente" |

## Open issues

- Individuare nel codice sorgente AS-IS il punto di integrazione LIS (protocollo, payload, `fonte_id`) — dipende da accesso repo/DB AS-IS (vedi [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI]] INT-04, TECH-01)
  ⚠️ **Non rilevata dalla ricognizione del 22/09/2026** — vedi §Riscontro AS-IS. Attività ora articolata nei tre punti seguenti
- 🆕 **[Exprivia] L1 — chiedere conferma sull'assenza di endpoint SOAP esposti** in `consprefbe`: né JAX-WS né WSDL pubblicati per SRV-01÷05, a fronte della [[wiki/sources/2019-06-01-webservice-consenso-regionale-v03\|specifica v03]] che li documenta sullo stesso namespace `http://consprefbe.csi.it/`. **Domanda dirimente**, perché è il punto cieco più probabile della ricognizione
- 🆕 **[Exprivia] L2 — chiedere conferma sull'assenza di acquisizione da sistemi di reparto**: endpoint, job schedulato, lettura su tabella di appoggio, o valore di `fonte_id` diverso da quelli della webapp
- 🆕 **[Exprivia/DB] Verifica che discrimina l'ipotesi:** estrarre da `consprefdb` i valori distinti di `fonte_id` sui consensi storici. Identifica i fruitori reali del canale di acquisizione senza dipendere dal ritrovamento di codice dedicato
- 🆕 **[CSI] Se L1 e L2 tornano entrambe negative:** riaprire il punto con CSI: l'integrazione dichiarata il 06/08/2026 non è nel materiale consegnato. In quel caso decadrebbe il presupposto di questo ADR e l'acquisizione LIS tornerebbe **sviluppo nuovo**, con impatto su stime e perimetro
- Verificare se sistemi analoghi (es. RIS) usano lo stesso meccanismo di integrazione o uno distinto
- Correggere SRS §1/§2 diagramma di contesto: 2 canali di acquisizione UI, non 3 — **allineamento SRS da fare solo dopo conferma esplicita utente** (vedi log)

## References

- [[wiki/docs/adr/ADR-017-lis-terzo-canale\|ADR-017-lis-terzo-canale]] — decisione superata da questo ADR
- [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] §LIS
- [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi - Applicativo]] §Canali di acquisizione
- [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI — Tracker Unificato]] INT-03 (chiuso da questa decisione)
- Correlato: [[wiki/docs/adr/ADR-008-ssot-form-renderer\|ADR-008-ssot-form-renderer]] SSoT Form Renderer (non applicabile a LIS), [[wiki/docs/adr/ADR-014-apache-cxf-soap-client\|ADR-014-apache-cxf-soap-client]] client SOAP (possibile protocollo dell'integrazione AS-IS, da verificare)

---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-021-perimetro-solo-operatore/","title":"Perimetro progetto ridotto a Webapp Operatore — Webapp Cittadino esclusa","tags":["perimetro","scope","webapp-operatore","webapp-cittadino"],"dg-note-properties":{"adr":21,"title":"Perimetro progetto ridotto a Webapp Operatore — Webapp Cittadino esclusa","status":"accepted","date":"2026-08-06","deciders":["CSI Piemonte","Exprivia"],"supersedes":[11,19],"superseded-by":[],"tags":["perimetro","scope","webapp-operatore","webapp-cittadino"],"related_wiki":["[[Gestione Consensi - Applicativo]]","[[GASP Salute]]","[[composizione-dinamica-form-consenso|Composizione Dinamica Form Consenso]]","[[wiki/docs/adr/ADR-010-cdu-01-split\|ADR-010-cdu-01-split]]","[[wiki/docs/adr/ADR-008-ssot-form-renderer\|ADR-008-ssot-form-renderer]]","[[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|Ricognizione endpoint AS-IS — riscontro sviluppo]]"],"sources":["Call CSI 06/08/2026","2026-09-22-ricognizione-endpoint-as-is"]}}
---


# ADR-021: Perimetro progetto ridotto a Webapp Operatore — Webapp Cittadino esclusa

## Status

`accepted` — chiarimento CSI in call 06/08/2026. Supersede [[wiki/docs/adr/ADR-011-merge-cdu-04-05-cittadino\|ADR-011]] e [[wiki/docs/adr/ADR-019-cdu-06-pdf-scope-ridotto\|ADR-019]].

> 🔴 **Precisazione 22/09/2026 — l'esclusione riguarda il solo frontend.**
>
> Origine: domanda dello sviluppatore sulla nota di scope di CDU-02 ("l'esclusione è solo FE o FE+BE?"). Risposta del committente:
>
> - Webapp Cittadino e Webapp Operatore sono **due applicazioni distinte**, raggiungibili da **due link diversi**. Non sono due aree della stessa app.
> - Questo progetto sviluppa **esclusivamente la Webapp Operatore** (frontend).
> - **Il backend è unico e serve entrambe le webapp.** Viene rifatto da questo progetto e **deve restare compatibile con la Webapp Cittadino esistente**, che continua a girare invariata sul backend nuovo.
> - La Webapp Cittadino non subisce interventi funzionali da parte nostra.
>
> **Lettura corretta di "fuori dal perimetro di sviluppo" in questo ADR e in tutte le pagine che lo citano:** *fuori perimetro il frontend; il backend corrispondente resta in perimetro come migrazione a **iso-funzionalità** (stesso contratto, stesso comportamento).*
>
> Conseguenza operativa: i CDU marcati ❌ OUT (CDU-01b, CDU-02, CDU-03, CDU-04, CDU-06) **non producono lavoro di frontend**, ma i servizi ed endpoint backend che li servono **vanno migrati sul nuovo stack senza alterarne il contratto**.

## Context

Finora la wiki e l'SRS in lavorazione hanno modellato il sistema TO-BE come **due webapp** equivalenti in scope di sviluppo:
- **Webapp Cittadino** (SPID/CIE via [[wiki/concepts/gasp-salute\|GASP Salute]]) — CDU-01b, CDU-02, CDU-03, CDU-04, CDU-06
- **Webapp Operatore** (PUA/RUPAR/IRIDE) — CDU-01a, CDU-05, CDU-07÷CDU-14

Su questa base erano state prese decisioni architetturali che assumevano entrambe le webapp come deliverable di questo progetto: split CDU-01a/01b ([[wiki/docs/adr/ADR-010-cdu-01-split\|ADR-010]]), SSoT Form Renderer condiviso Citt+Op ([[wiki/docs/adr/ADR-008-ssot-form-renderer\|ADR-008]]), UX cittadino semplificata con pulsante unico ([[wiki/docs/adr/ADR-011-merge-cdu-04-05-cittadino\|ADR-011]]), download PDF informativa lato cittadino ([[wiki/docs/adr/ADR-019-cdu-06-pdf-scope-ridotto\|ADR-019]]).

In call CSI del 06/08/2026, il cliente ha chiarito che **i progetti in gestione non sono due ma uno solo**: la **Webapp Operatore**. La Webapp Cittadino **esiste** ma **non è un deliverable di questo progetto** — resta fuori dalla gestione di questi nuovi sviluppi (chi la gestisce, se e quando verrà aggiornata, non è di nostra competenza in questo engagement).

## Decision

- **In scope di sviluppo:** Webapp Operatore — CDU-01a, CDU-05, CDU-07÷CDU-14 (area Operatore + Back Office), CDU-15÷CDU-17 (API per SIA, machine-to-machine).
- **Fuori scope di sviluppo — frontend:** Webapp Cittadino — CDU-01b, CDU-02, CDU-03, CDU-04, CDU-06. L'applicazione esiste, è separata (link distinto) e non viene costruita né aggiornata da questo progetto.
- **In scope — backend di quegli stessi CDU** (precisazione 22/09/2026): il BE è unico e serve entrambe le webapp; i servizi/endpoint dietro CDU-01b, CDU-02, CDU-03, CDU-04, CDU-06 vanno migrati sul nuovo stack **a iso-funzionalità**, senza alterare il contratto consumato dalla Webapp Cittadino.
- ~~**[[wiki/concepts/gasp-salute\|GASP Salute]] fuori scope tecnico:** era l'IdP per l'accesso diretto del cittadino (SPID/CIE); senza CDU-01b da costruire, non c'è integrazione GASP da progettare in questo progetto.~~
  **Corretto 22/09/2026:** non c'è **frontend** cittadino da costruire, ma la Webapp Cittadino continua ad autenticarsi via GASP Salute contro il backend nuovo. L'integrazione **lato BE** resta quindi in perimetro come migrazione a iso-funzionalità. Non c'è nuova progettazione GASP; c'è da non romperla. Vedi [[wiki/concepts/gasp-salute\|GASP Salute]].
- **[[wiki/docs/adr/ADR-011-merge-cdu-04-05-cittadino\|ADR-011]] e [[wiki/docs/adr/ADR-019-cdu-06-pdf-scope-ridotto\|ADR-019]] superseded:** trattano esclusivamente funzionalità cittadino (UX pulsante unico, download PDF) — interamente fuori dal perimetro di questo progetto. Restano come registro storico della decisione originaria.
- **[[wiki/docs/adr/ADR-010-cdu-01-split\|ADR-010]] resta `accepted`, non superseded:** la distinzione tecnica CDU-01a/01b resta corretta concettualmente; annotato che solo CDU-01a è in scope di sviluppo.
- **[[wiki/docs/adr/ADR-008-ssot-form-renderer\|ADR-008]] resta `accepted`, non superseded:** il pattern Form Renderer resta valido per la Webapp Operatore; la motivazione "riuso Citt+Op" non è più applicabile in questo progetto — se la Webapp Cittadino esistente userà lo stesso renderer non è verifica/garanzia di questo progetto.

## Consequences

### Positive
- Perimetro di sviluppo frontend chiaro: 1 webapp, non 2 — riduce ambiguità su cosa va costruito
- Elimina lavoro di progettazione non necessario: ~~integrazione GASP/SAML2~~ (vedi correzione 22/09/2026 — resta da migrare, non da progettare), UX cittadino dedicata, download PDF cittadino
- CDU-15÷17 (API SIA) e area Operatore/Back Office restano interamente validi e prioritari

### Negative
- Documentazione SRS §1/§2 (diagramma di contesto), §3 (profili), catalogo CDU **da correggere** per riflettere il perimetro ridotto — **allineamento SRS rimandato**, da eseguire solo dopo conferma esplicita dell'utente
- Decisioni pregresse (ADR-010, ADR-008) restano tecnicamente valide ma la loro applicabilità pratica in questo progetto si riduce (solo metà del loro contesto originario è ancora costruito da noi)
- ~~Rischio di confusione se la Webapp Cittadino esistente diverge nel tempo dal modello dati/API che il backend Operatore/SIA implementa — non è nostro compito verificarlo, ma va tenuto presente~~
  **Riformulato 22/09/2026:** non è un rischio di divergenza futura ma un **vincolo di progetto**. Il backend nuovo deve esporre alla Webapp Cittadino lo stesso contratto di oggi; la verifica è nostra. Mitigazione: estrarre dall'AS-IS l'elenco degli endpoint invocati dalla Webapp Cittadino (path, metodo, formato richiesta/risposta) e usarlo come riferimento di non-regressione in design e collaudo
- Il perimetro **di sviluppo** (1 frontend) non coincide con il perimetro **di responsabilità tecnica** (backend intero, 2 consumatori). Da tenere distinto in stime, piano di test e comunicazione al team

### Neutral
- Nessun impatto sul modello dati backend (`cons_t_consenso`, storicizzazione, batch) — channel-agnostic, resta valido per entrambe le webapp indipendentemente da chi costruisce i frontend

## Riscontro AS-IS (22/09/2026)

Ricognizione del team di sviluppo Exprivia sul sorgente AS-IS consegnato (`consprefbe`, `consprefboweb`, `consprefbowcl`, `consprefdb`, `consprefnotifica`), dichiarata esaustiva e non limitata ai soli endpoint REST. Dettaglio in [[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|Ricognizione endpoint AS-IS — riscontro sviluppo]].

**Esito:**

| Riscontro | Conseguenza su questo ADR |
|---|---|
| Le uniche interfacce REST sono `CittadiniApi` e `InformativaApi`, esposte da `consprefboweb` e consumate dal frontend Angular `consprefbowcl` | Quel contratto è **interamente al servizio della Webapp Operatore**. Diventa la **baseline di iso-funzionalità** per l'unico frontend in perimetro |
| `CittadiniApiServiceImpl.login()` verifica il profilo e restituisce `403` a chi non è operatore; le route (`cittadino/:fiscalCode/consensi`) e la UI ("Cerca il dichiarante tramite Codice Fiscale") descrivono un operatore che cerca un assistito | Conferma indipendente della premessa di questo ADR: **`consprefbowcl` è la Webapp Operatore**, non quella del Cittadino |
| `consprefbe` (EAR) contiene un solo WAR e un solo EJB jar, senza altre webapp incluse | Nel materiale consegnato **non è presente la Webapp Cittadino**. Coerente con il perimetro: l'applicazione è in carico a CSI e non è un deliverable di questo progetto |
| `consprefnotifica` non espone endpoint in ingresso — è solo client SOAP verso un servizio esterno | Nessun contratto in ingresso da preservare su questo modulo |

> ✅ **Nessuna anomalia.** L'assenza del sorgente cittadino conferma il perimetro, non lo contraddice. Sposta però l'onere: il contratto di non-regressione verso la Webapp Cittadino **non è ricavabile dal sorgente in nostro possesso** e va richiesto a CSI (vedi §Open issues).

> 🔴 **Conseguenza sul protocollo dei servizi lato cittadino (CDU-02).** La ricognizione **non ha rilevato endpoint SOAP in ingresso** sul perimetro esaminato: non esiste quindi un "contratto SOAP AS-IS" associato ai flussi cittadino da mantenere. Si aggiunga che [[wiki/concepts/gasp-salute\|GASP Salute]] è un IdP e **non effettua chiamate applicative al backend** — il chiamante è la Webapp Cittadino, a sessione già stabilita. **Indirizzo dato al fornitore il 22/09/2026: esporre i servizi come REST**, coerentemente con il nuovo stack; SOAP solo dove imposto da contratto esterno già scritto. Un eventuale adapter di compatibilità si valuta solo se l'elenco richiesto a CSI rivelasse un'interfaccia diversa.

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| Mantenere entrambe le webapp in scope, aspettando ulteriore conferma | Contraddetto esplicitamente da CSI in call 06/08/2026 — il perimetro è chiaro, non serve attendere |
| Cancellare interamente ADR-010/ADR-008 | Errato: restano tecnicamente corretti per la parte Operatore; solo la parte "riuso con Citt" perde rilevanza pratica |

## Open issues

- Correggere SRS §1/§2/§3 e catalogo CDU per riflettere il perimetro (solo dopo conferma utente). **Da recepire anche la precisazione FE/BE del 22/09/2026**: le note di scope inserite nell'SRS il 06/08/2026 dicono "fuori dal perimetro di sviluppo" senza distinguere frontend da backend, ed è esattamente l'ambiguità che ha generato la domanda dello sviluppatore
- ~~Verificare se il modello dati/API esposto dal backend Operatore/SIA deve restare compatibile con la Webapp Cittadino esistente (proprietà/contratto non chiarito in questa call)~~
  ✅ **Chiuso 22/09/2026:** **sì, deve restare compatibile.** La Webapp Cittadino continua a girare sul backend nuovo senza modifiche funzionali. Il contratto che consuma oggi va preservato.
- 🔄 **Aperto — riassegnato a CSI (22/09/2026):** produrre l'elenco delle interfacce che la Webapp Cittadino invoca oggi sul backend (path, metodo, protocollo, formato richiesta/risposta), come riferimento di non-regressione per design e collaudo del nuovo BE.
  Originariamente richiesto al team di sviluppo Exprivia. **Riassegnato al committente** dopo il riscontro del 22/09/2026 (vedi §Riscontro AS-IS): il sorgente della Webapp Cittadino **non fa parte della consegna**, ed è coerente che non ne faccia parte — l'applicazione è in carico a CSI e non è un deliverable di questo progetto. Il contratto che essa consuma non è quindi ricavabile per reverse engineering dal materiale in possesso del fornitore: va richiesto a chi la gestisce.
  ⚠️ **Rischio se non evaso:** il backend nuovo può essere consegnato a iso-funzionalità **verificata solo rispetto alla Webapp Operatore**; la compatibilità verso la Webapp Cittadino resta un rischio non coperto da collaudo.
- 🆕 **Da verificare:** perimetro esatto delle integrazioni BE che la Webapp Cittadino attiva indirettamente — [[wiki/concepts/gasp-salute\|GASP Salute]] (autenticazione SPID/CIE) e [[wiki/concepts/sistemi-esterni-integrati\|Gestione Deleghe]] (`getDelegantiService`). Entrambe risultano lato backend, quindi coperte dal vincolo di compatibilità; da confermare sul sorgente AS-IS.
  ⚠️ **Parzialmente smentito dal riscontro 22/09/2026** per Gestione Deleghe: il WSDL è presente ma **nessun client lo implementa**. Vedi [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] §Gestione Deleghe

## References

- [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi - Applicativo]] §Canali di acquisizione, §Profili utente
- [[wiki/concepts/gasp-salute\|GASP Salute]] (fuori scope tecnico)
- [[wiki/docs/adr/ADR-010-cdu-01-split\|ADR-010-cdu-01-split]] (resta accepted, nota di scope)
- [[wiki/docs/adr/ADR-008-ssot-form-renderer\|ADR-008-ssot-form-renderer]] (resta accepted, nota di scope)
- [[wiki/docs/adr/ADR-011-merge-cdu-04-05-cittadino\|ADR-011-merge-cdu-04-05-cittadino]], [[wiki/docs/adr/ADR-019-cdu-06-pdf-scope-ridotto\|ADR-019-cdu-06-pdf-scope-ridotto]] — superseded da questo ADR

---
{"dg-publish":true,"permalink":"/wiki/sources/2026-09-22-ricognizione-endpoint-as-is/","title":"Ricognizione endpoint AS-IS — riscontro sviluppo","tags":["as-is","endpoint","rest","contratto","baseline","iso-funzionalita","deleghe","perimetro","non-regressione"],"dg-note-properties":{"title":"Ricognizione endpoint AS-IS — riscontro sviluppo","aliases":["Ricognizione endpoint AS-IS — riscontro sviluppo","Ricognizione endpoint AS-IS"],"type":"source","tags":["as-is","endpoint","rest","contratto","baseline","iso-funzionalita","deleghe","perimetro","non-regressione"],"created":"2026-09-22","updated":"2026-09-22","sources":[],"related":["[[ADR-021-perimetro-solo-operatore|ADR-021 — Perimetro solo Operatore]]","[[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]]","[[gestione-consensi-applicativo|Gestione Consensi - Applicativo]]","[[wiki/concepts/gasp-salute\|GASP Salute]]","[[2019-06-01-webservice-consenso-regionale-v03|Specifica WebService ConsensoRegionaleAziendale v03 (AS-IS)]]","[[analysis-gap-as-is-to-be|Gap AS-IS → TO-BE]]"]}}
---


# Ricognizione endpoint AS-IS — riscontro sviluppo

**Origine:** comunicazione del team di sviluppo Exprivia, 22/09/2026.
**Richiesta a monte:** produrre dall'AS-IS l'elenco degli endpoint oggi invocati, come riferimento di non-regressione — open issue aperto in [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]] il 22/09/2026.
**Perimetro esaminato:** `consprefbe`, `consprefboweb`, `consprefbowcl`, `consprefdb`, `consprefnotifica`.
**Metodo dichiarato:** controllo esaustivo, non limitato ai soli endpoint REST.

---

## Contratto REST verificato — Webapp Operatore

Interfacce `CittadiniApi` e `InformativaApi`, esposte da `consprefboweb`, consumate dal frontend Angular `consprefbowcl`.

> ✅ **Questa è la baseline di iso-funzionalità del solo frontend in perimetro** ([[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]]). Il backend TO-BE deve riprodurne il comportamento.

| Endpoint | Metodo | Richiesta | Risposta |
|---|---|---|---|
| `/cittadino/login` | GET | — (CF letto dalla sessione IRIDE) | `Login { responseServizio, codiceFiscaleOperatore }` |
| `/cittadino/find/{cf}` · `/cittadino/find` (per nome/cognome/data nascita) | GET | path / header | lista `Cittadino { id_aura, codice_fiscale, cognome, nome, data_nascita, sesso, comune_nascita, asl }` |
| `/cittadino/token/{token}` | GET | path token | 200 / 403 — `getTokenInformation2`, risoluzione profilo operatore dopo PUA |
| `/cittadino/removeFromSession` | GET | — | 200 |
| `/informativa/find/{cf}/{cfOperatore}` (+ variante con `informativaId`) | GET | path | `Informativa { id_informativa, desc_informativa, html_informativa, tipo_consenso, sotto_tipo_consenso, pdf_informativa, data_decorrenza, data_scadenza, consenso_list: Consenso[] }` |
| `/informativa/update/{cf}/{cfOperatore}` | PUT | body `Informativa` | `Informativa` aggiornata |
| `/informativa/get-asl-list/{cfOperatore}` | GET | path | lista ASL/ASR |
| `/informativa/get-sotto-tipo-services{cf}` | GET | path | lista sotto-tipi di consenso |

### Osservazioni sul contratto

- **Naming fuorviante:** il prefisso `/cittadino` **non** indica servizi per il cittadino. È l'operatore che opera *su* un cittadino: `cfOperatore` compare esplicitamente nella signature di quasi tutte le operazioni `/informativa`. Da non confondere in fase di design TO-BE.
- **Sessione IRIDE:** `/cittadino/login` non riceve credenziali — legge il CF dalla sessione già stabilita. L'autenticazione operatore è delegata a monte (PUA / RUPAR / IRIDE), coerentemente con [[wiki/concepts/gasp-salute\|GASP Salute]] §Relazione con altri sistemi di autenticazione.
- **`/cittadino/token/{token}` → `getTokenInformation2`:** risoluzione del profilo operatore a valle di PUA.
- **Superficie di scrittura minima:** una sola operazione non idempotente (`PUT /informativa/update/...`). Tutto il resto è lettura.
- **Refuso nel path:** `get-sotto-tipo-services{cf}` è privo dello slash separatore — riportato come da comunicazione originale, da verificare sul sorgente.

---

## Evidenze sul profilo dell'applicazione

Il codice conferma che `consprefbowcl` è la **Webapp Operatore**, non quella del Cittadino:

```java
// CittadiniApiServiceImpl.login()
boolean operataoreValdido = citizenService.isOperator(cf);
if (operataoreValdido) { login.setResponseServizio("200"); }
else { login.setResponseServizio("403"); }   // rifiuta chi non è operatore
```

A supporto, sul frontend: route `cittadino/:fiscalCode/consensi` e componente di ricerca *"Cerca il dichiarante tramite Codice Fiscale"* — descrivono un operatore che cerca un assistito, non un accesso diretto del cittadino.

---

## Assenze rilevate

| Riscontro | Lettura |
|---|---|
| `consprefbe` (EAR) contiene **un solo WAR e un solo EJB jar**, senza altre webapp incluse | Nel materiale consegnato **non è presente la Webapp Cittadino**. Coerente con il perimetro: è in carico a [[wiki/entities/csi-piemonte\|CSI Piemonte]], non è un deliverable di questo progetto |
| `consprefnotifica` **non espone endpoint in ingresso** — è solo client SOAP verso servizio esterno | Nessun contratto inbound da preservare su questo modulo |
| **Nessun endpoint SOAP in ingresso** segnalato sul perimetro esaminato | Non esiste un contratto SOAP AS-IS associato ai flussi cittadino. Vedi §Conseguenza su CDU-02 |

> ⚠️ **Da verificare — non coperto esplicitamente dal riscontro.** La [[wiki/sources/2019-06-01-webservice-consenso-regionale-v03\|Specifica WebService ConsensoRegionaleAziendale v03]] descrive cinque servizi SOAP (SRV-01÷05) esposti dal modulo regionale verso i SIA delle ASR, namespace `http://consprefbe.csi.it/` — quindi proprio sull'artefatto esaminato. La ricognizione, pur dichiarata non limitata al REST, non li menziona. Analogamente non compare l'integrazione LIS/RIS che [[wiki/docs/adr/ADR-020-lis-integrazione-be-esistente\|ADR-020]] dichiara già presente nel sorgente AS-IS. Entrambi i punti sono backend, quindi **in perimetro**. Domanda non ancora posta al fornitore alla data di questa pagina — tracciata in [[wiki/docs/adr/ADR-020-lis-integrazione-be-esistente\|ADR-020]] §Riscontro AS-IS come lacune **L1** (SOAP esposti) e **L2** (acquisizione da sistemi di reparto), con l'ipotesi che siano lo stesso punto cieco.

---

## Flusso Deleghe — WSDL senza client

Nel repo `consprefboweb` è presente il contratto WSDL `DelegheCittadiniService` (`getDeleganti`, `getDelegati`, `saveDelegati`, …), ma **nessuna classe del codice lo implementa: non esiste un client verso quel servizio**.

Conseguenza indicata dal fornitore: se il flusso Deleghe è in perimetro, per questa parte **non c'è comportamento AS-IS da preservare** — sarebbe sviluppo nuovo, non migrazione a iso-funzionalità.

> ⚠️ **In conflitto con quanto dichiarato da CSI** (call 20/07/2026 INT-02, riconfermato 06/08/2026: *«già integrata, non c'è nulla da fare»*). Conflict tracciato in [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] §Gestione Deleghe. Da verificare con CSI; nessuno sviluppo sul flusso fino a chiarimento.

---

## Conseguenza su CDU-02 — protocollo

Il fornitore ha chiesto se la chiamata in ingresso *"da GASP Salute"* debba arrivare come SOAP (per mantenere il contratto AS-IS) o come REST.

**La domanda poggia su un presupposto da correggere:** [[wiki/concepts/gasp-salute\|GASP Salute]] è un Identity Provider federato (SAML2 via Shibboleth SP in reverse proxy) e **non effettua chiamate applicative al backend**. Autentica il cittadino e passa l'identità come attributi di sessione. Il chiamante dei servizi è l'**applicazione Cittadino**, a sessione già stabilita. Non esiste quindi una "chiamata in ingresso da GASP", né un contratto SOAP AS-IS associato a questo flusso — lo conferma la ricognizione stessa, che non ha rilevato endpoint SOAP in ingresso.

**Risposta data il 22/09/2026:** esporre il servizio come **REST**, coerentemente con il nuovo stack. Il SOAP resta solo dove imposto da un contratto esterno già scritto (servizi verso i SIA delle ASR, client verso Gestione Deleghe e Notificatore). Se l'elenco richiesto a CSI rivelasse un'interfaccia diversa consumata oggi dalla Webapp Cittadino, si valuterà un adapter di compatibilità — non cambia l'indirizzo di progettazione.

---

## Impatti sulla wiki

| Pagina | Aggiornamento |
|---|---|
| [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]] | Nuova §Riscontro AS-IS; open issue "elenco endpoint Webapp Cittadino" **riassegnato a CSI** (il sorgente cittadino non è in consegna, per perimetro) |
| [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] | Conflict block su §Gestione Deleghe (CSI "già integrato" vs WSDL senza client) |
| [[wiki/docs/adr/ADR-020-lis-integrazione-be-esistente\|ADR-020]] | Nuova §Riscontro AS-IS: lacune **L1** (SOAP esposti non segnalati) e **L2** (LIS/RIS non rilevata), ipotesi che siano lo stesso punto cieco, verifica su `fonte_id`. ADR confermato `accepted` con verifica pendente |

---

## Punti aperti generati

- **[CSI]** Elenco delle interfacce invocate dalla Webapp Cittadino sul backend — path, metodo, protocollo, formato richiesta/risposta. Riferimento di non-regressione. Senza, la iso-funzionalità è verificabile **solo verso la Webapp Operatore**
- **[Exprivia]** Il WSDL `DelegheCittadiniService` è accompagnato da classi stub JAX-WS inutilizzate (integrazione dismessa) o è file isolato (mai realizzata)?
- **[Exprivia] L1** — Conferma sull'assenza di endpoint SOAP esposti verso i SIA delle ASR in `consprefbe` — cfr. [[wiki/sources/2019-06-01-webservice-consenso-regionale-v03\|specifica v03]], namespace `http://consprefbe.csi.it/`
- **[Exprivia] L2** — Conferma sull'assenza dell'integrazione LIS/RIS — cfr. [[wiki/docs/adr/ADR-020-lis-integrazione-be-esistente\|ADR-020]]
- **[Exprivia/DB]** Valori distinti di `fonte_id` sui consensi storici in `consprefdb` — identifica i fruitori reali del canale di acquisizione senza dipendere dal ritrovamento di codice dedicato. Verifica che discrimina l'ipotesi "L1 e L2 sono lo stesso punto cieco" ([[wiki/docs/adr/ADR-020-lis-integrazione-be-esistente\|ADR-020]] §Riscontro AS-IS)

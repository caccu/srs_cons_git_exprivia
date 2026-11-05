---
{"dg-publish":true,"permalink":"/wiki/sources/2026-11-05-call-csi-analisi-dubbi/","title":"Call CSI 05/11/2026 — analisi dubbi su logica comune e stati del consenso","tags":["csi","call","macchina-a-stati","swagger","consensobeservice","consprefservice","non-espresso","storico",999,"notifiche"],"dg-note-properties":{"title":"Call CSI 05/11/2026 — analisi dubbi su logica comune e stati del consenso","aliases":["Call CSI 05/11/2026 — analisi dubbi su logica comune e stati del consenso"],"type":"source","tags":["csi","call","macchina-a-stati","swagger","consensobeservice","consprefservice","non-espresso","storico",999,"notifiche"],"created":"2026-11-05","updated":"2026-11-05","sources":["2026-11-05-call-csi-analisi-dubbi"],"related":["[[csi-piemonte|CSI Piemonte]]","[[2026-10-28-call-csi-analisi-dubbi|Call CSI 28/10/2026 — analisi dubbi su architettura e servizi]]","[[ciclo-vita-consenso|Ciclo di vita del consenso]]","[[wiki/docs/adr/ADR-025-contratto-cittadino-soap-consensobeservice\|ADR-025]]","[[sistemi-esterni-integrati|Sistemi Esterni Integrati]]","[[alternativa-batch-03-pull|Alternativa BATCH-03 — PULL CDU-17]]","[[notificatore-unp|Notificatore UNP]]","[[wiki/concepts/batch-processes\|Processi Batch]]"]}}
---


# Call CSI 05/11/2026 — analisi dubbi su logica comune e stati del consenso

**Fonte:** `presentazione/CSI Piemonte - Consensi_ Analisi dubbi_call_05_11_2026.md`, trascrizione automatica della call (60 minuti). Sintesi di lavoro: `presentazione/Sintesi_call_CSI_05_11_2026.md`. Presentazione usata: `presentazione/CONSPREF-componenti-condivisi_call-CSI_2026-11-05.pptx`.

La trascrizione contiene errori di riconoscimento:
- «Relatore 1» = Marco Forneris;
- «USDL»/«VSDL» = WSDL, «JVT» = JWT;
- «Watch it»/«wacit» = WA_CITT, il codice fonte della Webapp Cittadino (WA_PASS = Punto Assistito);
- «CP roll»/«chip roll» = CPROL;
- «Con Speed service»/«consenso B service» = `ConsensoBeService`;
- «QD»/«CUD» = CDU, «esis» = AS-IS;
- «giallo» = adattatore APISAN.

**Presenti.**
- [[wiki/entities/csi-piemonte\|CSI]]: Tommaso Ruggiero, Gaia Bourlot, Sabina Caroni.
- Fornitore ([[wiki/entities/exprivia\|Exprivia]] e team di sviluppo): Marco Forneris, Donato Palmieri, Henri Molla, Roberto Bruno, Marie Christine Giuliano.

> ⚠️ **Indicazioni emerse a voce, non decisioni scritte.** La macchina a stati TO-BE è da definire nell'incontro tecnico, dopo lo swagger del back office. Wiki e SRS si allineano solo sui punti confermati.

**In una riga.** CSI vuole una sola logica per cittadino e operatore. Prima chiede lo swagger REST del back office e una mini interfaccia: da lì stima quanto costa adattare il canale del cittadino e si definisce la macchina a stati TO-BE.

## 1. Logica comune, ConsensoBeService e ConsprefService

- **Architettura confermata:** stessi server e stesso database della [[wiki/sources/2026-10-28-call-csi-analisi-dubbi\|call del 28/10]], nessun API Manager (Tommaso: «Sì»). Chiude l'attesa di approvazione del disegno TO-BE semplificato.
- **Una sola logica per cittadino e operatore: è il desiderata di CSI** (Tommaso). Due logiche vogliono dire più codice, test complicati e interfacce che si comportano in modo diverso. L'impatto è sulla macchina a stati.
- **`ConsprefService` non si tocca:** il WSDL è fermo e conosciuto. La sua logica va adattata alla nuova macchina a stati senza cambiare il contratto. Conferma la decisione 4 della presentazione.
- **`ConsensoBeService`: si parte dal back office.**
  - Il fornitore disegna lo swagger REST del back office: Angular, servizi, JWT.
  - CSI valuta quanto la logica del cittadino si «cala» su quei servizi. Gli attori sono due: WA_CITT (cittadino) e operatore di back office.
  - Senza swagger CSI non può stimare l'adattamento, né chiedere una risorsa per il canale del cittadino.
- **Opzioni ancora aperte** (incidono su [[wiki/docs/adr/ADR-025-contratto-cittadino-soap-consensobeservice\|ADR-025]]):
  - **ConsensoBeService in pensione:** il cittadino usa gli stessi REST con JWT del back office;
  - **adattare il SOAP:** se l'impatto è di circa 6 campi;
  - **contratto invariato:** si adattano solo i DAO di persistenza.
- **SOAP che chiama REST:** si può con un adattatore, ma costa. Va scritto se i REST danno un vantaggio netto, e portato ai tavoli.
- **Le 24 differenze** tra i motori vanno tolte, «altrimenti alta entropia» (Tommaso).
- **L'interfaccia del cittadino** oggi riporta alcuni stati in modo non coerente: è un'occasione per rivedere la logica.

## 2. Azienda 999 ed endpoint

- **La 999 è un'azienda di test senza endpoint,** forse la prima creata.
- **È anche il modello del futuro:** CSI creerà consensi e informative nuovi, anche regionali, senza endpoint. Il centro stella li raccoglie e non li inoltra.
- **Gli endpoint sono opzionali.** Senza endpoint il consenso non entra nello scarico CDU-17 ([[wiki/concepts/alternativa-batch-03-pull\|PULL CDU-17]]).
- **La notifica alle aziende dipende dall'endpoint, non dal canale:** parte solo se l'endpoint c'è, sia che il consenso arrivi dal cittadino sia dall'operatore (Sabina).
- **CPROL** (ritiro referti online, consenso aziendale) è oggi l'unico consenso gestito ed è il legacy. CSI invierà per mail un documento interno sul suo funzionamento.

## 3. Più record sullo stesso consenso

- **Non ci sono due record in vigore:** vale sempre l'ultimo. Il precedente passa a S e resta come storia.
- **Sul record chiuso non si aggiorna chi ha agito:** resta l'autore originale. Sabina propone di mantenerlo così nel TO-BE.
- La fonte (es. WA_CITT) e il CF di chi agisce sono comunque tracciati.

## 4. Stati AS-IS e codice S

- **Diagramma AS-IS della presentazione confermato** da Sabina e Tommaso: nessun consenso → A/NO o A/SI, A/NO → A/SI, A/SI → R/NO, R/NO → A/SI.
- **Il codice S ha due significati:** l'etichetta ufficiale è «scaduto», ma il legacy lo usa per chiudere il record precedente.
- **Direzione emersa:**
  - S diventa **STORICO**: si cambia la descrizione o si sposta su un'altra tabella;
  - **SCADUTO vero** diventa uno stato nuovo, forse più d'uno: per termine, per cessazione, per scadenza dell'informativa. Sabina pensa che resti nella stessa tabella;
  - **ANNULLATO** è legato al flag `annulla_consensi` dell'informativa.
- **Approfondimento:** un'ora tra Marco, Sabina e Manuela Bontempi su SCADUTO, ANNULLATO e `annulla_consensi`.

## 5. NON ESPRESSO

- È nella decodifica, ma nel DB non ci sono record. È lo stato di partenza: dopo un sì o un no non ci si torna.
- **Domanda aperta, da decidere al fornitore:** serve come record nel DB o basta l'assenza del record?
  - Esempio di Tommaso: consenso regionale per le aziende A, B e C, espresso solo per A e B.
  - Caso analogo: un'azienda aggiunta dopo che il cittadino si è espresso.
- **Posizione emersa:** non esprimersi per scelta e non sapere che l'azienda c'era hanno lo stesso risultato, «non espresso». Va comunque mostrato. Diverso è il «no» voluto.
- **Tipi di consenso futuri:** nazionale, regionale, aziendale. Possibile il consenso alla sperimentazione (Città della Salute). Per questo le interfacce sono dinamiche.

## 6. Primo «no» e «revocato»

- **Chiamare «revocato» un primo «no» è sbagliato** (Tommaso): chi non ha mai detto sì non ha revocato. Oggi succederebbe se il primo «no» del cittadino fosse salvato come R/NO. È un baco da chiudere.
- **A/NO si può portare a «sì»** (Sabina): a video conta il valore, quindi A/NO si vede come «negato» e si può portare a «sì». L'hanno provato la mattina stessa. Questo contesta la frase della slide TO-BE «A/NO letto come ATTIVO, non si può portare a sì», che descrive il motore ALG02: da verificare insieme.
- **TO-BE voluto:**
  - il primo «no» è un negato e si può portare a «sì»;
  - «revocato» è solo il passaggio da sì a no, tracciando chi l'ha fatto;
  - il ciclo di vita deve dire perché un consenso è diventato no e se era nato no;
  - resta l'unione stato + valore.
- **Due notifiche distinte.** Sulla slide TO-BE Tommaso si riferiva alla notifica al cittadino ([[wiki/entities/notificatore-unp\|notificatore UNP]]). Le notifiche alle aziende sono SRV-03 (acquisizione) e SRV-04 (revoca), inviate da BATCH-01 ([[wiki/concepts/batch-processes\|Processi Batch]]). Nella macchina a stati vanno indicate separate.

## 7. Costi e perimetro

- **Marie Christine Giuliano:** teme lavoro in più, perché le risorse sono a saturazione. Verifica con il team.
- **Gaia Bourlot:** è nel perimetro, gli stati sono già nell'SRS.
- **Tommaso:** è una semplificazione, perché si toglie una parte del WSDL e la si porta sui REST già in sviluppo.
- **Dopo la call:** lo sviluppatore entra lunedì; l'analista proposto non è stato accettato da CSI.

## Prossimi passi

- **Fornitore:** swagger REST del back office e una mini interfaccia di base per il prossimo incontro.
- **Macchina a stati TO-BE:** prima versione da proporre, con NON ESPRESSO, ATTIVO, NEGATO, REVOCATO, STORICO, SCADUTO e ANNULLATO. Poi un incontro tecnico con CSI.
- **Marco, Sabina e Manuela:** un'ora su SCADUTO, ANNULLATO e `annulla_consensi`.
- **CSI:** documento CPROL per mail; con swagger e stima, tavolo con l'interfaccia del cittadino.
- **Prova a video su A/NO,** in gruppo ridotto.

## Impatto sulle decisioni della presentazione

- **Decisione 1, consenso regionale 999 o un record per azienda (DEV-07):** non decisa. È emerso che i consensi senza endpoint saranno normali.
- **Decisione 2, CONSPREFBO nell'audit, e domande 8-12:** non discusse.
- **Decisione 3, A/NO portato a «sì»:** nella sostanza sì, con la distinzione tra negato e revocato.
- **Decisione 4, ConsprefService come oggi:** confermata.

## Dubbi sulla trascrizione

- **«costpref service e costpref Bia service, 2 WSDL fermi»:** Tommaso apre poi a rivedere `ConsensoBeService`. Il secondo servizio citato è questo?
- **«la 999 è esattamente come dovrai sviluppare tu, anzi forse puoi usare anche lo stesso»:** vuol dire usare la 999 per i consensi regionali senza endpoint? Incide su DEV-07.
- **Marie Christine Giuliano:** il ruolo esatto lato fornitore non risulta dalla trascrizione.

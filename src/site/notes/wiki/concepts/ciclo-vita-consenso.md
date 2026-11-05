---
{"dg-publish":true,"permalink":"/wiki/concepts/ciclo-vita-consenso/","title":"Ciclo di Vita del Consenso","tags":["macchina-a-stati","consenso","business-logic","gestione-consensi","terminologia-ui","mf9","mf11","mf14"],"dg-note-properties":{"title":"Ciclo di Vita del Consenso","aliases":["Ciclo di Vita del Consenso"],"type":"concept","tags":["macchina-a-stati","consenso","business-logic","gestione-consensi","terminologia-ui","mf9","mf11","mf14"],"created":"2026-05-05","updated":"2026-09-22","sources":["2026-03-02-conspref-srs-v1-revised","2023-09-01-conspref-srs-01-v03"],"related":["[[Gestione Consensi - Applicativo]]","[[2026-03-02-conspref-srs-v1-revised|CONSPREF-SRS-V1.0 revised bozza v2]]","[[wiki/concepts/composizione-dinamica-form-consenso\|Composizione Dinamica Form Consenso — Single Source of Truth]]","[[analysis-2026-05-14-risposte-mf-srs-v3]]"]}}
---


# Ciclo di Vita del Consenso

Macchina a stati che governa ogni consenso espresso nel sistema [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi - Applicativo]]. **Channel-agnostic** — la macchina a stati backend resta valida indipendentemente da quale webapp è in scope di sviluppo.

> 🔴 **Perimetro progetto (call CSI 06/08/2026, [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]]):** questo progetto sviluppa **solo la Webapp Operatore**. Le righe/riferimenti "Citt" sotto restano come contesto (la macchina a stati è la stessa), ma non descrivono un deliverable di questo progetto.

> 🆕 **Ambito di SCADUTO e ANNULLATO ([[wiki/sources/2026-10-28-call-csi-analisi-dubbi\|call CSI 28/10/2026]]):** verso le aziende il contratto AS-IS (`ConsprefService`, SRV-03/04) conosce solo **SÌ e NO** e non cambia, quindi nessuno stato nuovo viene comunicato alle aziende. Il **consenso permanente al ritiro referti online** (informativa generale CPROL) non ha data di fine e al massimo diventa NO: mai SCADUTO né ANNULLATO. Il ciclo di vita completo vale per i **nuovi consensi** (scadenza dell'informativa). L'invio a sistemi terzi e i servizi di divulgazione sono **fuori perimetro**. Risposta data a voce: conferma scritta di CSI in corso (BAT-03). SRS rev. 1.25.

---

## Terminologia UI vs tecnica (MF9R8 — SRS v3)

| Termine UI (acconsento/nego) | Valore tecnico DB | Codice in API REST |
|---|---|---|
| "acconsento" | `ATTIVO` | `"valore_consenso": "SI"` (+ `"stato_consenso": "ATTIVO"`) |
| "nego" | `NEGATO` | `"valore_consenso": "NO"` (+ `"stato_consenso": "NEGATO"`) |

> ⚠️ I termini visibili all'utente nell'interfaccia sono **"acconsento"** e **"nego"** (decisione MF9R8). I termini tecnici `ATTIVO`/`NEGATO` restano invariati a livello DB, API e tracciatura. Sostituire ogni occorrenza "Accettato/Negato" nelle UI mockup e documentazione utente.

---

## Diagramma degli stati (aggiornato MF11/MF14)

```
NON_ESPRESSO
    │
    ├─→ ATTIVO (valore=SI, UI="acconsento")
    │       ▲
    │       │  ◄────────────┐
    │       │   (modifica   │  cambio diretto via webapp citt o operatore
    │       │    valore)    │  (CDU-04/05 — no nuova informativa richiesta)
    │       ▼               │
    └─→ NEGATO (valore=NO, UI="nego") ─┘
         │
         ├─[informativa scaduta, annulla_consensi=NO]─→ SCADUTO
         └─[informativa scaduta, annulla_consensi=SI]─→ ANNULLATO
                    │
                    ├─→ ATTIVO (nuova espressione con riaccettazione informativa)
                    └─→ NEGATO (nuova espressione con riaccettazione informativa)
```

**Transizioni dirette ATTIVO ↔ NEGATO (MF11R10 + MF14R12):**
- ATTIVO → NEGATO: cambio valore via webapp cittadino (❌ fuori scope, CDU-04) o operatore (✅ in scope, CDU-05/CDU-11). Nessuna riaccettazione informativa richiesta finché l'informativa è quella corrente.
- NEGATO → ATTIVO: simmetrica.

> 🆕 **Primo «no» e «revocato» (call CSI 05/11/2026, indicazione a voce):**
> - **AS-IS:** il primo «no» del cittadino è salvato come A/NO (stato attivo, valore NO). A video conta il valore: si vede come «negato» e si può portare a «sì». L'ha verificato Sabina la mattina del 05/11.
> - **R/NO** nella decodifica significa «revocato». Se il primo «no» venisse salvato come R/NO, il cittadino lo vedrebbe «revocato» senza aver mai detto sì: CSI lo considera un baco da chiudere.
> - **TO-BE voluto:**
>   - il primo «no» è NEGATO e si può portare a «sì»;
>   - REVOCATO è solo il passaggio da sì a no, tracciando chi l'ha fatto (cittadino o operatore);
>   - il ciclo di vita deve dire se il consenso era nato «no» o lo è diventato;
>   - resta l'unione stato + valore (`cons_d_stato`, `cons_d_valore`).
> - **Da verificare:** il motore TO-BE (ALG02) legge oggi A/NO come ATTIVO e rifiuta il passaggio a «sì» (differenza 2). Va allineato. Prova a video in gruppo ridotto.
>
> Fonte: [[wiki/sources/2026-11-05-call-csi-analisi-dubbi\|2026-11-05-call-csi-analisi-dubbi]].

---

## Semantica degli stati

| Stato (tecnico) | UI label | Significato | Notifica ASR? |
|---|---|---|---|
| `NON_ESPRESSO` | (vuoto / "non espresso") | Mai espresso | No |
| `ATTIVO` | "acconsento" | Espresso con SI | Sì (al cambiamento) |
| `NEGATO` | "nego" | Espresso con NO | Sì (al cambiamento) |
| `SCADUTO` | "scaduto" | Informativa cambiata, annulla=NO, valore ancora valido | **No** |
| `ANNULLATO` | "annullato" | Informativa cambiata, annulla=SI, consenso nullo | **Sì** |

> 🆕 **NON ESPRESSO: record o assenza di record? (call CSI 05/11/2026, da decidere al fornitore)**
> - Oggi è nella decodifica, ma nel DB non ci sono record con questo stato. È lo stato di partenza: dopo un sì o un no non ci si torna.
> - **Casi da gestire:**
>   - consenso regionale per le aziende A, B e C, espresso solo per A e B;
>   - azienda aggiunta dopo che il cittadino si è già espresso.
> - **Posizione emersa:** non esprimersi per scelta e non sapere che l'azienda c'era hanno lo stesso risultato, «non espresso». Diverso è il «no» voluto.
> - In ogni caso il «non espresso» va mostrato: se non è un record, va ricavato dall'assenza (outer join sulle aziende del consenso).
> - **Da decidere:**
>   - se scriverlo come record (per esempio come valore di default nel JSON, subito ricoperto);
>   - oppure lasciarlo come stato iniziale implicito, senza record. In questo caso la macchina a stati resta più semplice (Tommaso).
>
> Fonte: [[wiki/sources/2026-11-05-call-csi-analisi-dubbi\|2026-11-05-call-csi-analisi-dubbi]].

> 🆕 **Chiarimenti dev BE (27/10/2026, SRS §5.1 rev. 1.20)** ([[wiki/sources/2026-10-27-revisione-be-slide-domande\|2026-10-27-revisione-be-slide-domande]]):
> - **`SCADUTO` ha due significati**, distinti solo da `data_fine`. *Record chiuso* (`data_fine` valorizzata): "record superato", come nell'AS-IS, impostato a ogni variazione per compatibilità con i canali SOAP legacy (`ConsprefService`, `ConsensoBeService`), che considerano corrente ogni record A/R senza guardare la data di fine. *Record aperto* (`data_fine` nulla), creato solo da BATCH-02: SCADUTO TO-BE, consenso vigente da riaccettare.
> - **Regola:** il consenso vigente è sempre e solo quello con `data_fine` nulla. CDU-15 e CDU-17 filtrano su `data_fine IS NULL`.
> - **`ANNULLATO` resta aperto per design** (`data_fine` nulla): è lo stato corrente da cui si riesprime il consenso (CDU-09/10), ma copia il valore del record precedente, quindi non è un consenso valido.
> - **Inserimento su SCADUTO/ANNULLATO** (qualsiasi canale): chiude sempre il record e crea il nuovo sull'informativa corrente, anche a valore invariato (l'inserimento è la riaccettazione, CDU-10). "Stesso valore, nessuna azione" vale solo per ATTIVO/NEGATO.
> - **Snapshot CDU-17:** restituisce ATTIVO, NEGATO e SCADUTO; non ANNULLATO.

> 🆕 **Call CSI 05/11/2026, indicazione a voce da confermare nella macchina a stati TO-BE:** CSI riconosce il doppio significato di S come un problema da risolvere.
> - **S su un record chiuso diventa STORICO:** si cambia la descrizione oppure il record si sposta in una tabella storica. È la chiusura di un record superato, non una scadenza.
> - **SCADUTO resta solo per la scadenza vera,** forse con più tipi: per termine, per cessazione, per scadenza dell'informativa. Secondo Sabina resta nella stessa tabella, perché si agisce ancora su quei record.
> - **ANNULLATO** resta lo stato legato al flag `annulla_consensi` dell'informativa.
>
> Da approfondire in un'ora tra Marco, Sabina e Manuela, poi nell'incontro tecnico sugli stati. Fino ad allora vale la regola del 27/10: il consenso in vigore è il record con `data_fine` nulla. Fonte: [[wiki/sources/2026-11-05-call-csi-analisi-dubbi\|2026-11-05-call-csi-analisi-dubbi]].

---

## Regola fondamentale — No sovrascrittura

**Ogni variazione NON sovrascrive il record precedente.**
- Record esistente: `UPDATE data_fine = NOW()`
- Copia storica: `INSERT in cons_s_consenso`
- Nuovo stato: `INSERT in cons_t_consenso`

Garantisce storia completa degli atti di consenso. Vale anche per le transizioni dirette ATTIVO↔NEGATO: si chiude il record corrente e si inserisce un nuovo record con il nuovo valore.

> 🆕 **Call CSI 05/11/2026:**
> - **Non ci sono due record in vigore sullo stesso consenso:** vale sempre l'ultimo. Il caso tipico è il cittadino che si esprime allo sportello e subito dopo cambia idea online. Il record precedente si chiude (oggi con S) e resta come storia: si tengono entrambe le registrazioni.
> - **Sul record chiuso non si aggiorna chi ha agito:** resta l'autore originale. Se lo si sovrascrivesse, sembrerebbe che anche il valore precedente l'avesse dato chi ha fatto la modifica. CSI (Sabina) propone di mantenerlo così nel TO-BE.
> - **Chi ha fatto la nuova scrittura** è tracciato sul nuovo record, con il codice fonte (`WA_CITT` Webapp Cittadino, `WA_PASS` Punto Assistito, codice ISTAT per aziende e LIS) e il CF.
>
> Fonte: [[wiki/sources/2026-11-05-call-csi-analisi-dubbi\|2026-11-05-call-csi-analisi-dubbi]].

---

## Logica CDU (aggiornata MF45)

| CDU | Stato di partenza | Azione | Richiede riaccettazione informativa? | Lato | Scope sviluppo |
|---|---|---|---|---|---|
| CDU-03 | NON_ESPRESSO | Rilascio | **Sì** — lettura + checkbox presa visione | Citt (❌ OUT) + Op (via CDU-09, ✅ IN) | Parziale — solo Op |
| CDU-04 | SCADUTO | Modifica con riaccettazione | **Sì** — nuova informativa | Citt (❌ OUT) + Op (via CDU-10, ✅ IN) | Parziale — solo Op |
| CDU-04 | ANNULLATO | Modifica come rilascio ex-novo | **Sì** — come rilascio ex-novo | Citt (❌ OUT) + Op (via CDU-10, ✅ IN) | Parziale — solo Op |
| CDU-04 | ATTIVO / NEGATO | Cambio valore (UI cittadino inglobata in CDU-04 — MF45) | **No** | Citt | ❌ **OUT** (interamente cittadino) |
| CDU-05 | ATTIVO o NEGATO | Cambio valore | **No** | **Solo Op** | ✅ **IN** |
| CDU-09/10/11 | qualsiasi | Equivalenti operatore di CDU-03/04/05 | Variabile | Op | ✅ **IN** — unico canale in scope |

> **Nota MF45R44 (storico):** lato **webapp Cittadino**, CDU-05 NON è caso d'uso separato — il flusso "cambio valore" è inglobato in CDU-04 (pulsante unico "Salva", decisione [[wiki/docs/adr/ADR-011-merge-cdu-04-05-cittadino\|ADR-011]], **superseded**). La distinzione CDU-04/CDU-05 è rilevante solo lato **Operatore** (in scope) e per la logica interna di tracciatura.
>
> 🔴 **Perimetro (06/08/2026, precisato 22/09/2026):** le righe "Citt" sono fuori perimetro **come frontend** — [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]]. Solo CDU-09/10/11 (Operatore) producono interfaccia da costruire. La **logica di ciclo di vita descritta in quelle righe resta in perimetro lato backend**: il BE è unico, serve anche la Webapp Cittadino, e va migrato a iso-funzionalità.

---

## Trigger batch

| Evento | Batch | Risultato |
|---|---|---|
| Nuovo consenso espresso o variazione | → record in `cons_t_notifica` | [[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] BATCH-01 invia alle ASR ogni 5 min (con `SELECT FOR UPDATE SKIP LOCKED`) |
| Informativa scaduta | BATCH-02 | Consensi → SCADUTO o ANNULLATO (SQL canonico in [[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] MF66) |
| Nuovo endpoint configurato | ~~BATCH-03 push~~ → **PULL CDU-17** | Allineamento on-demand via [[wiki/concepts/alternativa-batch-03-pull\|Alternativa BATCH-03 — PULL CDU-17 (centro stella)]] |

---

## Consenso aziendale — caso speciale CDU-04

> 🆕 **Tipi di consenso (call CSI 05/11/2026):** in futuro i tipi possibili sono nazionale, regionale e aziendale. Oggi esiste solo CPROL (aziendale). Possibile il consenso alla sperimentazione (Città della Salute). Fonte: [[wiki/sources/2026-11-05-call-csi-analisi-dubbi\|2026-11-05-call-csi-analisi-dubbi]].

Se anche solo **1 consenso** di un cittadino per un'ASR è SCADUTO o ANNULLATO → il cittadino deve riaccettare le informative di **tutte** le ASR per quel tipo consenso.

**Visualizzazione informativa per azienda (MF28R27):** quando il consenso aziendale ha informativa specifica per ente, l'UI deve consentire la visualizzazione dell'informativa della singola azienda **prima** della raccolta del consenso per quell'azienda. Vedi [[wiki/concepts/composizione-dinamica-form-consenso\|Composizione Dinamica Form Consenso — Single Source of Truth]] §2.3.

---

## ADR correlati

| ADR | Decisione |
|---|---|
| [ADR-015](ADR-015-storicizzazione-immutabile.md) | Storicizzazione immutabile (no sovrascrittura) |
| [ADR-016](ADR-016-scaduto-async-batch-02.md) | Stato SCADUTO async via BATCH-02 |
| [ADR-011](ADR-011-merge-cdu-04-05-cittadino.md) | Merge CDU-04/05 lato Cittadino (transizioni dirette ATTIVO↔NEGATO) — **superseded** da ADR-021 |
| [ADR-021](ADR-021-perimetro-solo-operatore.md) | Perimetro progetto: solo Webapp Operatore |

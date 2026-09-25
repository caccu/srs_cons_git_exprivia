---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-022-cdu-06-scarico-informativa-operatore/","title":"CDU-06 — scarico informativa anche per l'Operatore","tags":["cdu-06","informativa","pdf","perimetro","webapp-operatore"],"dg-note-properties":{"adr":22,"title":"CDU-06 — scarico informativa anche per l'Operatore","status":"accepted","date":"2026-09-25","deciders":["CSI Piemonte","Exprivia"],"supersedes":[],"superseded-by":[],"tags":["cdu-06","informativa","pdf","perimetro","webapp-operatore"],"related_wiki":["[[wiki/docs/adr/ADR-019-cdu-06-pdf-scope-ridotto\|ADR-019-cdu-06-pdf-scope-ridotto]]","[[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021-perimetro-solo-operatore]]","[[Gestione Consensi - Applicativo]]","[[2026-09-25-riscontro-csi-domande-sviluppo|Riscontro CSI alle domande di sviluppo (mail 24-25/09/2026)]]","[[2026-09-22-ricognizione-endpoint-as-is|Ricognizione endpoint AS-IS — riscontro sviluppo]]"],"sources":["2026-09-25-riscontro-csi-domande-sviluppo"]}}
---


# ADR-022: CDU-06 — scarico informativa anche per l'Operatore

## Status

`accepted`: risposta CSI del 25/09/2026 (punto DEV-06). Non supersede [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]]; ne corregge l'applicazione a un singolo CDU.

## Context

Il CDU-06 ("Download/stampa PDF") nasce come funzione dell'Area Cittadino. [[wiki/docs/adr/ADR-019-cdu-06-pdf-scope-ridotto\|ADR-019]] (14/05/2026) ne aveva ridotto lo scope alla **sola informativa accettata**: niente firma digitale, niente valore del consenso espresso. [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]] (06/08/2026) ha poi escluso dal perimetro di sviluppo il frontend della Webapp Cittadino. Con quella decisione ADR-019 è stato marcato superseded e il CDU-06 è rimasto senza consumatore sviluppato da noi. La precisazione del 22/09/2026 ha lasciato in perimetro il solo servizio backend.

Restava in sospeso una domanda: l'operatore deve poter scaricare o stampare il PDF per conto dell'assistito? Riproposta a CSI nella mail del 24/09/2026.

Risposta CSI del 25/09/2026:

> Il sistema deve prevedere lo scarico dell'informativa sia per il cittadino che per l'operatore di BO.

## Decision

- **Oggetto:** lo scarico riguarda l'**informativa** (il documento), non un'attestazione del consenso. Resta valido lo scope ridotto di ADR-019: niente firma, niente valore del consenso.
- **Operatore: in perimetro, frontend incluso.** La Webapp Operatore offre lo scarico/stampa dell'informativa per l'assistito. L'"operatore di BO" della risposta CSI è il **profilo unico Operatore** (call 06/08/2026): nessun profilo nuovo.
- **Cittadino: solo backend.** Il frontend cittadino resta fuori perimetro ([[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]]), ma il servizio di scarico che la Webapp Cittadino usa va garantito sul backend nuovo.
- **Servizio backend unico** per i due consumatori, con autorizzazione diversa: sessione PUA per l'operatore, sessione GASP per il cittadino.
- **Sorgente del PDF:** il contratto AS-IS `Informativa` espone già `pdf_informativa` ([[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|ricognizione 22/09/2026]]). Ipotesi preferita: servire il PDF già memorizzato, senza generazione server-side. Da verificare sul modello dati.

## Consequences

### Positive
- Chiude l'ultima domanda sospesa su CDU-06.
- Nessun nuovo motore di generazione PDF, se regge l'ipotesi `pdf_informativa`.
- Un solo servizio per due consumatori.

### Negative
- **Nuovo lavoro di frontend** nella Webapp Operatore, non previsto dopo ADR-021: va aggiunto al backlog FE e stimato.
- **SRS da riallineare.** Il CDU-06 oggi è catalogato nell'Area Cittadino, marcato ❌ OUT. Proposta Exprivia (mail 24/09): collocare la funzione tra quelle Operatore (CDU-09/10). CSI non si è espresso sulla collocazione.

### Neutral
- ADR-019 resta superseded come decisione di perimetro. Il suo contenuto funzionale (sola informativa, niente firma) torna però di riferimento tramite questo ADR.

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| Nessuno scarico lato Operatore | Escluso da CSI il 25/09/2026 |
| PDF di attestazione del consenso (struttura ricca, bozza SRS v3) | Già scartato da ADR-019; la risposta CSI parla di informativa |

## Open issues

- Collocazione nell'SRS: CDU-06 esteso a due attori oppure funzione dentro CDU-09/10. Allineamento SRS solo dopo conferma utente.
- Verificare che `pdf_informativa` sia valorizzato per tutte le informative attive; in caso contrario serve una regola di fallback.
- Scarico dell'informativa in vigore o anche di versioni storiche/scadute? Da chiarire se l'operatore consulta consensi espressi su informative non più attive.
- Voce di backlog FE Operatore da creare in `Backlog-Funzionalita-FE-BE_CONSPREF`.

## References

- [[wiki/docs/adr/ADR-019-cdu-06-pdf-scope-ridotto\|ADR-019-cdu-06-pdf-scope-ridotto]]: scope funzionale d'origine
- [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021-perimetro-solo-operatore]]: perimetro FE/BE
- [[wiki/sources/2026-09-25-riscontro-csi-domande-sviluppo\|Riscontro CSI 25/09/2026]] §DEV-06
- [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI]] §9 DEV-06

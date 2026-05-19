---
{"dg-publish":true,"permalink":"/docs/adr/adr-019-cdu-06-pdf-scope-ridotto/","title":"CDU-06 PDF — scope ridotto a sola informativa accettata, no firma, no valore consenso","tags":["cdu-06","pdf","informativa","mf47","scope","ux-cittadino"],"dg-note-properties":{"adr":19,"title":"CDU-06 PDF — scope ridotto a sola informativa accettata, no firma, no valore consenso","status":"accepted","date":"2026-05-14","deciders":["Marco Forneris","Exprivia"],"supersedes":[],"superseded-by":[],"tags":["cdu-06","pdf","informativa","mf47","scope","ux-cittadino"],"related_wiki":["[[Gestione Consensi - Applicativo\|Gestione Consensi - Applicativo]]","[[wiki/concepts/informativa\|Informativa Consenso]]","[[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|Risposte MF SRS v3]]"],"sources":["[[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|Risposte MF SRS v3]] MF47R46, MF49R48, MF51R50"]}}
---


# ADR-019: CDU-06 PDF scope ridotto

## Status

`accepted` — decisione MF47R46 sulla revisione SRS v3. Struttura PDF ulteriore marcata `[PROPOSTA]` (MF49R48, MF51R50).

## Context

Bozza SRS v3 prevedeva CDU-06 come "Download PDF attestazione consenso" con struttura ricca:
- Informativa accettata (testo)
- Valore consenso espresso (SI/NO)
- Firma digitale (eIDAS o equivalente)

Discussione cliente:
- **Firma eIDAS non richiesta** (Q&A CSI #13)
- L'attestazione del valore consenso espresso non è il valore informativo principale per il cittadino — il vero scopo del download è avere copia dell'informativa accettata, per archivio personale
- Struttura ricca complica scope e tempi (firma digitale = integrazione esterna)

## Decision

CDU-06 ha **scope ridotto**:

- Cittadino stampa PDF della **sola informativa accettata**
- **Senza** firma digitale
- **Senza** valore consenso espresso
- Struttura ulteriore (eventuali sezioni aggiuntive, layout) → marcata `[PROPOSTA]` da concordare con CSI in iterazione successiva

Lato Operatore: nessun caso d'uso analogo nel TO-BE (l'operatore non scarica PDF per conto dell'assistito).

## Consequences

### Positive
- Scope chiaro e implementabile in fase 1
- Niente integrazione firma digitale → niente dipendenza esterna su servizi eIDAS
- Niente disclosure valore consenso in PDF → riduce rischio data leak in caso di stampa condivisa
- Allineamento con UX cittadino [[ADR-011\|ADR-011]] (pulsante unico Salva, no esposizione tecnicalità)

### Negative
- "Attestazione consenso completo" (valore + informativa + firma) **non disponibile**: cittadino vuole prova legale → soluzione esterna (es. richiesta presso ASR)
- Eventuale richiesta futura "PDF attestazione completo" → nuovo CDU, non extension di CDU-06

### Neutral
- Generazione PDF lato backend Spring Boot (libreria standard, es. Apache PDFBox o iText)
- Struttura specifica `[PROPOSTA]` da iterare con CSI

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| PDF completo con firma eIDAS | Q&A CSI #13: firma non richiesta; complica scope sprint 1 |
| PDF con valore consenso ma no firma | Esposizione valore in stampa non desiderata; cliente ha esplicitamente escluso (MF47R46) |
| Niente CDU-06 | Cliente richiede stampa informativa per archivio cittadino |

## Open issues

- GOV-02 (tracker [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI]] §8): validazione `[PROPOSTA]` struttura PDF (MF49R48, MF51R50) prima di Sprint 2

## References

- [[Gestione Consensi - Applicativo\|Gestione Consensi - Applicativo]] §Area Cittadino (CDU-06)
- [[wiki/concepts/informativa\|Informativa Consenso]]
- [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|Risposte MF SRS v3]] tema D (MF47R46, MF49R48, MF51R50)
- Correlato: [[ADR-011\|ADR-011]] merge CDU-04/05 (UX cittadino semplificata), [[ADR-015\|ADR-015]] storicizzazione (download non altera storico)

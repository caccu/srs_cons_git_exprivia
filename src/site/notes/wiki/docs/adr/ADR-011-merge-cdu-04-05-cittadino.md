---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-011-merge-cdu-04-05-cittadino/","title":"Merge CDU-04/CDU-05 lato Cittadino con pulsante unico Salva","tags":["cdu-04","cdu-05","ux","cittadino","mf37","mf45","ssot"],"dg-note-properties":{"adr":11,"title":"Merge CDU-04/CDU-05 lato Cittadino con pulsante unico Salva","status":"accepted","date":"2026-05-14","deciders":["Marco Forneris","Exprivia"],"supersedes":[],"superseded-by":[],"tags":["cdu-04","cdu-05","ux","cittadino","mf37","mf45","ssot"],"related_wiki":["[[wiki/concepts/composizione-dinamica-form-consenso\|Composizione Dinamica Form Consenso]]","[[Gestione Consensi - Applicativo\|Gestione Consensi - Applicativo]]","[[wiki/concepts/ciclo-vita-consenso\|Ciclo di Vita del Consenso]]"],"sources":["[[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|Risposte MF SRS v3]] MF37R36, MF45R44"]}}
---


# ADR-011: Merge CDU-04/CDU-05 lato Cittadino — pulsante unico "Salva"

## Status

`accepted` — decisione MF37R36 + MF45R44 sulla revisione SRS v3.

## Context

L'SRS bozza v2 distingueva:
- **CDU-04 Modifica consenso** — modifica con riaccettazione informativa (es. da SCADUTO)
- **CDU-05 Cambio valore consenso** — cambio diretto ATTIVO↔NEGATO senza nuova informativa

Razionalmente la distinzione **è tecnicamente corretta** (riaccettazione informativa sì/no è un branch logico distinto). Ma esposta in UI cittadino genera confusione: il cittadino non distingue "modifica" da "cambio valore" — vuole solo salvare la sua scelta corrente.

Razionale per la decisione (MB38, MB44):
- Cittadino UX: "Modifica" e "Cambio valore" sono concetti tecnici, non utente
- Pulsanti distinti producono indecisione (quale clicco?)
- Distinzione resta rilevante solo lato Operatore (UI dedicata) e lato logica backend (tracciatura, riaccettazione informativa)

## Decision

**Webapp Cittadino** (CDU-04/CDU-05):
- **Pulsante unico «Salva»** (MF37R36)
- Operazioni tecniche distinte (rilascio CDU-03 / modifica CDU-04 / cambio valore CDU-05) gestite **internamente** dal backend, **non esposte UI**
- **CDU-05 NON è caso d'uso separato lato Cittadino** (MF45R44) — flusso "cambio valore" inglobato in CDU-04

**Webapp Operatore** (CDU-10/CDU-11):
- Distinzione CDU-04/CDU-05 → CDU-10/CDU-11 **resta UI distinta** (casistiche operative diverse)
- Tracciatura backend distinta

Macchina a stati ([[wiki/concepts/ciclo-vita-consenso\|Ciclo di Vita del Consenso]]):
- Transizioni dirette ATTIVO↔NEGATO ammesse senza riaccettazione informativa (MF11R10 + MF14R12) — implementate dal backend al click "Salva"

## Consequences

### Positive
- UX cittadino semplificata: una sola azione esplicita
- Coerenza con [[ADR-008\|ADR-008]] SSoT Form Renderer (pulsante unico abilitato dal renderer dinamico)
- Tracciatura interna preserva la distinzione (analytics, audit)

### Negative
- Logica backend più articolata: deve discriminare rilascio/modifica/cambio-valore in funzione dello stato di partenza del consenso
- Documentazione SRS deve chiarire la divergenza UX Cittadino vs Operatore (rischio incomprensione lettura)

### Neutral
- Lato Operatore comportamento invariato (CDU-05 separato, riaccettazione esplicita)

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| Mantenere CDU-04 + CDU-05 distinti lato cittadino | UX confusa; cliente ha esplicitamente richiesto pulsante unico (MF37R36) |
| Wizard multi-step | Eccessivo per il caso d'uso; tasso di abbandono atteso alto |

## References

- [[wiki/concepts/composizione-dinamica-form-consenso\|Composizione Dinamica Form Consenso]] §3
- [[wiki/concepts/ciclo-vita-consenso\|Ciclo di Vita del Consenso]] §Logica CDU
- [[Gestione Consensi - Applicativo\|Gestione Consensi - Applicativo]] §Area Cittadino
- [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|Risposte MF SRS v3]] MF37R36, MF45R44
- Correlato: [[ADR-008\|ADR-008]] SSoT Form Renderer (abilita pulsante unico), [[ADR-010\|ADR-010]] CDU-01 split (separazione webapp)

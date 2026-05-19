---
{"dg-publish":true,"permalink":"/docs/adr/adr-018-rfc-7807-error-response/","title":"RFC 7807 (application/problem+json) come standard error response","tags":["rfc-7807","error-handling","rest","api","standard"],"dg-note-properties":{"adr":18,"title":"RFC 7807 (application/problem+json) come standard error response","status":"accepted","date":"2026-03-02","deciders":["CSI Piemonte","Exprivia"],"supersedes":[],"superseded-by":[],"tags":["rfc-7807","error-handling","rest","api","standard"],"related_wiki":["[[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15/16]]","[[wiki/analyses/analysis-2026-05-06-openapi-cdu-15-16\|OpenAPI CDU-15/16]]"],"sources":["[[wiki/sources/2026-03-02-conspref-srs-v1-revised\|CONSPREF-SRS-V1.0 revised bozza v2]] §4.x"]}}
---


# ADR-018: RFC 7807 come standard error response

## Status

`accepted` — adottato in SRS §4.x per tutti gli endpoint REST.

## Context

Gli endpoint REST esposti (CDU-15, CDU-16, eventuale CDU-17 da [[ADR-006\|ADR-006]]) devono produrre risposte di errore consistenti, machine-readable e auto-documentate. Senza standard:

- Ogni endpoint genera payload di errore con shape diversa
- I SIA implementano parser custom per ogni messaggio
- Mancanza di campi standard per tracciare l'errore (type URI, instance)

## Decision

Tutte le risposte 4xx/5xx degli endpoint REST seguono **RFC 7807** (Problem Details for HTTP APIs) con content-type `application/problem+json`.

Schema minimo:

```json
{
  "type": "https://gestioneconsensi.csi.piemonte.it/errors/not-found",
  "title": "Not Found",
  "status": 404,
  "detail": "Nessun consenso trovato per i parametri specificati.",
  "instance": "/api/v1/consensi/stato"
}
```

Campi:
- `type` (URI): identifica il tipo di errore (link a documentazione interna)
- `title` (string): titolo umano, invariante per tipo
- `status` (int): HTTP status code (duplica header per leggibilità)
- `detail` (string): dettaglio specifico dell'istanza
- `instance` (URI): path della request che ha generato l'errore

Estensioni ammesse: campi custom (es. `params_hash`, `trace_id`) per supporto debug.

## Consequences

### Positive
- Standard internazionale → SIA possono usare parser RFC 7807 esistenti
- Shape uniforme su tutti gli endpoint → documentazione OpenAPI più pulita
- `type` URI estensibile per nuovi tipi di errore senza breaking change

### Negative
- Backend Spring Boot deve mappare ogni eccezione applicativa a `ProblemDetail` (Spring 6 ha `ProblemDetail` nativo)
- Documentazione OpenAPI ha schema response error duplicato su ogni endpoint (può essere riusato via `$ref`)

### Neutral
- Spring Boot 3 supporta nativamente `ProblemDetail` (zero dipendenze esterne)

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| Shape custom `{ error: ..., message: ... }` | Niente standard; SIA devono parsing custom |
| JSON:API errors | Più orientato a CRUD risorse; sovradimensionato per il caso d'uso |
| Niente formato standardizzato | Inaccettabile: SRS richiede consistenza |

## References

- [[wiki/sources/2026-03-02-conspref-srs-v1-revised\|CONSPREF-SRS-V1.0 revised bozza v2]] §4.x
- [[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15/16]] §HTTP status codes
- [[wiki/analyses/analysis-2026-05-06-openapi-cdu-15-16\|OpenAPI CDU-15/16]] §Gestione errori
- RFC 7807 — https://datatracker.ietf.org/doc/html/rfc7807
- Correlato: [[ADR-005\|ADR-005]] sicurezza CDU-15/16 (4xx/5xx usano RFC 7807)

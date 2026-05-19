---
{"dg-publish":true,"permalink":"/docs/adr/adr-001-stack-tecnologico/","title":"Stack tecnologico applicativo (Spring Boot 3 + Java 17 + Angular 19 + PostgreSQL 17)","tags":["stack","spring-boot","java","angular","postgresql"],"dg-note-properties":{"adr":1,"title":"Stack tecnologico applicativo (Spring Boot 3 + Java 17 + Angular 19 + PostgreSQL 17)","status":"accepted","date":"2026-03-02","deciders":["CSI Piemonte","Exprivia"],"supersedes":[],"superseded-by":[],"tags":["stack","spring-boot","java","angular","postgresql"],"related_wiki":["[[wiki/concepts/stack-tecnologico-applicativo\|Stack Tecnologico Applicativo]]","[[wiki/sources/2026-03-12-pile-tecnologiche-csi\|Pile Tecnologiche CSI Piemonte]]","[[architettura-ecaas|Architettura ECaaS]]"],"sources":["[[wiki/sources/2026-03-02-domande-srs-csi-v02\|Domande SRS Consensi — Revisione CSI V02]] Q&A #2, #5, #10","[[2026-03-02-conspref-srs-v1-revised|CONSPREF-SRS-V1.0 revised bozza v2]] §3"]}}
---


# ADR-001: Stack tecnologico applicativo

## Status

`accepted` — confermato da CSI in Q&A V02 e formalizzato in SRS bozza v2 §3.

## Context

Rifacimento applicativo Gestione Consensi richiede uno stack moderno allineato alle pile tecnologiche correnti di CSI Piemonte. AS-IS gira su PostgreSQL 9 (RETIRED) con stack legacy non documentato. Vincoli:

- Pile CSI hanno classificazione CURRENT/DEPRECATED/RETIRED — solo CURRENT ammesso per nuovi progetti
- Stack target deve essere supportato dalla piattaforma [[wiki/concepts/architettura-ecaas\|ECaaS Nivola]] (Helm chart + immagini Artifactory CSI)
- Java LTS richiesto dalla policy CSI

## Decision

Lo stack TO-BE è:

| Layer | Tecnologia | Versione |
|---|---|---|
| Frontend SPA | Angular | 19.x |
| Frontend UI library | QUASAR CSI | v2.1.0 |
| Web Server | Apache HTTPD (`httpd_csi` docker-base) | — |
| Backend | Spring Boot | 3.4.10+ |
| Linguaggio | Java | 17 LTS |
| Sicurezza | Spring Security | 6.x |
| Database | PostgreSQL | 17 (DBaaS Nivola) |

## Consequences

### Positive
- Conformità totale a Pile CSI CURRENT
- Spring Boot 3 abilita Jakarta EE 10, Java 17 LTS, native image (futuro)
- Angular 19 + QUASAR CSI library garantiscono riuso UI cross-applicativo sanità Piemonte
- PostgreSQL 17 abilita features sfruttate dal TO-BE: `SELECT FOR UPDATE SKIP LOCKED`, `gen_random_uuid()` nativa, MERGE statement

### Negative
- Migrazione PG9 → PG17 obbligatoria con salto di 8 major release (vedi [[ADR-013\|ADR-013]])
- Spring Boot 3 incompatible con Java 8/11 — niente backport possibile
- QUASAR CSI library richiede accesso repo CSI (dipendenza esterna)

### Neutral
- Build/deploy gestiti da automation CSI (no skeleton ex-novo richiesto)

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| Spring Boot 2.7 + Java 11 | RETIRED da CSI; End-of-OSS-support raggiunto |
| React + Vite | Non in Pile CSI CURRENT; nessuna libreria component CSI |
| Quarkus | Non in Pile CSI; ECaaS standardizzato su Spring Boot |
| Node.js backend | Fuori scope policy CSI per progetti sanità |

## References

- [[wiki/sources/2026-03-02-domande-srs-csi-v02\|Domande SRS Consensi — Revisione CSI V02]] — Q&A #2 (Angular), #5 (Spring Boot 3.4.10+), #10 (PostgreSQL 17 DBaaS)
- [[wiki/sources/2026-03-12-pile-tecnologiche-csi\|Pile Tecnologiche CSI Piemonte]]
- [[wiki/concepts/stack-tecnologico-applicativo\|Stack Tecnologico Applicativo]]
- Correlato: [[ADR-002\|ADR-002]] piattaforma ECaaS, [[ADR-013\|ADR-013]] migrazione PG

---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-003-dbaas-nivola/","title":"Database PostgreSQL su DBaaS Nivola, esterno al namespace ECaaS","tags":["database","postgresql","dbaas","nivola","infrastruttura"],"dg-note-properties":{"adr":3,"title":"Database PostgreSQL su DBaaS Nivola, esterno al namespace ECaaS","status":"accepted","date":"2026-03-02","deciders":["CSI Piemonte"],"supersedes":[],"superseded-by":[],"tags":["database","postgresql","dbaas","nivola","infrastruttura"],"related_wiki":["[[wiki/concepts/architettura-iaas\|Architettura IaaS]]","[[stack-tecnologico-applicativo|Stack Tecnologico Applicativo]]","[[migrazione-postgres-9-17|Migrazione PostgreSQL 9 → 17]]"],"sources":["[[wiki/sources/2026-03-02-domande-srs-csi-v02\|Domande SRS Consensi — Revisione CSI V02]] Q&A #10"]}}
---


# ADR-003: DBaaS Nivola, esterno al namespace ECaaS

## Status

`accepted` — confermato da CSI in Q&A V02 #10.

## Context

Decisione su dove erogare PostgreSQL: dentro il pod K8s del namespace applicativo, oppure come servizio gestito esterno. Considerazioni:

- Persistenza dati critica per consensi sanitari (no perdita ammessa)
- Backup, patching, alta disponibilità richiesti da policy CSI
- Tenant isolation a livello DB per progetti sanità
- Capacità operativa: il team Exprivia non ha mandato di gestire DB

## Decision

PostgreSQL 17 viene erogato da **DBaaS Nivola** (servizio gestito CSI), esterno al namespace ECaaS dell'applicativo.

- Provisioning via scheda formale a Nivola (alta latenza)
- Backup, patching, HA gestiti da Nivola
- Credenziali consegnate via K8s Secret → variabili env Spring; **mai nel codice sorgente**
- HikariCP pool: `max-pool-size ≤ 40/replica` (istanza 100 conn max, 2 repliche)

## Consequences

### Positive
- Backup/HA/patching out-of-the-box (no carico operativo team applicativo)
- Tenant isolation gestita da Nivola
- Compliance e audit DB centralizzati

### Negative
- **Latenza provisioning alta** — bloccante per Sprint 1 se DEV non pronto giorno 1 (rischio R2 in [[wiki/analyses/analysis-2026-05-06-checklist-avvio-progetto\|Checklist Avvio Progetto]])
- DEV e PROD provisioning richiedono richieste formali separate
- Niente PG-extension custom installabili dall'app (vincolo Nivola)
- HikariCP pool size limitato dal max connessioni concesse da Nivola

### Neutral
- Migrazione PG9→PG17 deve passare per dump/restore (vedi [[wiki/docs/adr/ADR-013-migrazione-pg-dump-restore\|ADR-013-migrazione-pg-dump-restore]]) — niente accesso filesystem diretto

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| PostgreSQL in pod K8s | Persistenza problematica, no HA out-of-box, backup non garantiti |
| StatefulSet con PVC | Vincoli ECaaS impediscono storage non-NFS per dati critici |
| Cloud RDS esterno | Fuori policy CSI sanità (dati devono restare in Nivola) |

## References

- [[wiki/sources/2026-03-02-domande-srs-csi-v02\|Domande SRS Consensi — Revisione CSI V02]] Q&A #10
- [[wiki/concepts/architettura-iaas\|Architettura IaaS]] §DBaaS Nivola
- Correlato: [[wiki/docs/adr/ADR-002-piattaforma-ecaas\|ADR-002-piattaforma-ecaas]] piattaforma ECaaS, [[wiki/docs/adr/ADR-013-migrazione-pg-dump-restore\|ADR-013-migrazione-pg-dump-restore]] migrazione, [[wiki/analyses/conspref-dmp-tracker\|CONSPREF-DMP — Tracker Piano Migrazione Dati]]

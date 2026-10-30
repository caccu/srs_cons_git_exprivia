---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-007-batch-01-5min-skip-locked/","title":"BATCH-01 scheduling 5 min con SELECT FOR UPDATE SKIP LOCKED","tags":["batch","batch-01","skip-locked","concorrenza","scheduling","mf64","postgresql"],"dg-note-properties":{"adr":7,"title":"BATCH-01 scheduling 5 min con SELECT FOR UPDATE SKIP LOCKED","status":"accepted","date":"2026-05-14","deciders":["Marco Forneris","Exprivia"],"supersedes":[],"superseded-by":[],"tags":["batch","batch-01","skip-locked","concorrenza","scheduling","mf64","postgresql"],"related_wiki":["[[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]]","[[ciclo-vita-consenso|Ciclo di Vita del Consenso]]","[[Sistemi Esterni Integrati]]"],"sources":["[[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|Risposte MF SRS v3]] MF64R63","[[wiki/sources/2019-06-01-webservice-consenso-regionale-v03\|Specifica WebService ConsensoRegionaleAziendale v03 (AS-IS)]]"]}}
---


# ADR-007: BATCH-01 — scheduling 5 min con SKIP LOCKED

## Status

`accepted` — decisione MF64R63 sulla revisione SRS v3.

## Context

L'AS-IS prevedeva uno scheduling di **30 minuti** per la consegna delle notifiche di acquisizione consensi al SIA delle ASR. La motivazione storica era evitare sovrapposizione fra esecuzioni successive in caso di esecuzione lunga.

Limiti AS-IS:
- Latenza di notifica al SIA fino a 30 minuti → impatta SLA percepito
- Lock di tabella tradizionale rischia di bloccare run successive
- In ambiente multi-pod K8s ([[wiki/docs/adr/ADR-002-piattaforma-ecaas\|ADR-002-piattaforma-ecaas]]), più istanze BATCH-01 potrebbero girare in parallelo e generare duplicati o conflitti

> 🔄 **21/10/2026:** con IaaS il caso concreto è `rconsprefbe` su due VM, con i batch al suo interno. Il team BE estende lo stesso schema `SKIP LOCKED` a **BATCH-02** (presa in carico dell'informativa, battito per lotto, ripresa dopo 120 minuti senza battito, notifiche al cittadino una alla volta). Dettaglio in [[wiki/concepts/batch-processes\|Processi Batch]] §Esecuzione su più nodi.

PostgreSQL 18 ([[wiki/docs/adr/ADR-001-stack-tecnologico\|ADR-001-stack-tecnologico]], [[wiki/docs/adr/ADR-003-dbaas-nivola\|ADR-003-dbaas-nivola]]) supporta nativamente `SELECT FOR UPDATE SKIP LOCKED` — feature che consente lettura concorrente senza collisioni (disponibile fin da PG9.5).

## Decision

BATCH-01 viene riprogettato:

- **Scheduling: ogni 5 minuti** (sostituisce 30 min AS-IS)
- **Concorrenza:** `SELECT FOR UPDATE SKIP LOCKED` su `cons_t_notifica` per consentire esecuzione parallela sicura multi-pod
- Pattern SQL:

```sql
SELECT n.not_id, n.cf_cittadino, n.codice_consenso, n.endp_url, ...
FROM cons_t_notifica n
WHERE n.not_stato = 'DA_INVIARE'
  AND n.data_cancellazione IS NULL
ORDER BY n.data_creazione
LIMIT :batch_size
FOR UPDATE SKIP LOCKED;
```

- Macchina a stati `cons_t_notifica`: `DA_INVIARE` → `IN_INVIO` → `INVIATO` / `ERRORE` → `IN_INVIO` (retry) / `FALLITO_DEFINITIVO`
- Contratto WSDL outbound SOAP invariato (SRV-03 NotificaAcquisizioneConsenso, AS-IS)

> ⚠️ **Conflict (27/10/2026):** questo ADR prevede il retry (`ERRORE` → `IN_INVIO`) e `FALLITO_DEFINITIVO`; il dev BE ([[wiki/sources/2026-10-27-revisione-be-slide-domande\|2026-10-27-revisione-be-slide-domande]]) riferisce che il codice **non ritenta**, come il vecchio sistema (slide 35 e 46 della presentazione). *Decisione Exprivia 30/10/2026 (BE-26, dev BE):* si applica l'SRS (ALG02, §8.4.2): `ERRORE` viene ripreso a ogni ciclo del batch (5 minuti, nessun backoff) finché `num_tentativi < MAX_TENTATIVI` (default 3, configurabile), poi `ERRORE_PERMANENTE` con riporto manuale a `DA_INVIARE` (procedura operativa). Le notifiche non tentate per manutenzione dell'azienda (§7.4) non contano come tentativo. L'avviso al cittadino resta fermo con notifiche in `ERRORE_PERMANENTE`. Conferma di CSI richiesta (domanda n. 23, EXP-06); fino alla risposta si sviluppa così.
>
> ⚠️ **Rischio al passaggio in produzione (27/10/2026):** il vecchio batch inviava i consensi senza riga di notifica; il nuovo invia solo ciò che trova in coda (`DA_INVIARE`). I consensi registrati dal vecchio sistema poco prima del passaggio e non ancora inviati andrebbero persi (63 su DEV: 49 acquisizioni, 14 revoche). Proposta: negli script di migrazione, una notifica `DA_INVIARE` per ciascuno (domanda 16 a CSI; alternativa: ultimo giro del vecchio batch).

## Consequences

### Positive
- Latenza notifica al SIA ridotta da 30 min → max 5 min
- Multi-pod safe nativo: nessuna sovrapposizione, niente duplicati
- Niente lock pessimistico di tabella — solo lock sui record presi
- Pattern dichiarativo, manutenibile

### Negative
- **Rischio aperto BAT-01:** ambiguità SRS §7.1 su quale operazione WSDL usare (SRV-01 inbound vs SRV-03 outbound) — vedi [[wiki/concepts/batch-processes\|Processi Batch]] §RISCHIO CRITICO. Da confermare con CSI prima implementazione
- Tuning `batch_size` necessario per bilanciare throughput vs lock contention
- Retry con backoff: parametri da definire (PROPOSTA SRS §7.1)

### Neutral
- Dipendenza forte da PostgreSQL ≥ 9.5 (SKIP LOCKED nativo, presente in PG18)

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| Mantenere 30 min + lock tabella | Latenza inaccettabile per SLA TO-BE; lock tabella problematico multi-pod |
| Cron singleton (HA leader election) | Complica deploy, aggiunge dipendenza esterna (etcd/ZK), niente parallelismo orizzontale |
| Queue esterna (RabbitMQ/Kafka) | Aggiunge nuovo middleware; vincoli ECaaS impediscono install Cluster-level |

## Open issues

- BAT-01: conferma scritta CSI su operazione WSDL (SRV-01 vs SRV-03) prima implementazione
- BATCH-02 scheduling preciso (vedi [[wiki/docs/adr/ADR-016-scaduto-async-batch-02\|ADR-016-scaduto-async-batch-02]])

## References

- [[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]]
- [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|Risposte MF SRS v3]] MF64R63
- [[wiki/sources/2019-06-01-webservice-consenso-regionale-v03\|Specifica WebService ConsensoRegionaleAziendale v03 (AS-IS)]]
- Correlato: [[wiki/docs/adr/ADR-001-stack-tecnologico\|ADR-001-stack-tecnologico]] stack (PG18 SKIP LOCKED nativo), [[wiki/docs/adr/ADR-006-batch-03-pull-cdu-17\|ADR-006-batch-03-pull-cdu-17]] CDU-17 PULL sostituisce BATCH-03, [[wiki/docs/adr/ADR-014-apache-cxf-soap-client\|ADR-014-apache-cxf-soap-client]] Apache CXF client SOAP, [[wiki/docs/adr/ADR-016-scaduto-async-batch-02\|ADR-016-scaduto-async-batch-02]] stato SCADUTO async

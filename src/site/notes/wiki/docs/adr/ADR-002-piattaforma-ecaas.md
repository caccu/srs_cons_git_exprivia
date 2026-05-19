---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-002-piattaforma-ecaas/","title":"Piattaforma ECaaS Kubernetes Nivola con vincoli operativi","tags":["infrastruttura","kubernetes","ecaas","nivola","traefik","cilium","vincoli"],"dg-note-properties":{"adr":2,"title":"Piattaforma ECaaS Kubernetes Nivola con vincoli operativi","status":"accepted","date":"2026-03-02","deciders":["CSI Piemonte"],"supersedes":[],"superseded-by":[],"tags":["infrastruttura","kubernetes","ecaas","nivola","traefik","cilium","vincoli"],"related_wiki":["[[wiki/concepts/architettura-ecaas\|Architettura ECaaS]]","[[wiki/sources/2019-06-01-linea-guida-fornitori-cloud-native\|Linee Guida Cloud Native per Fornitori v1.0.1]]","[[stack-tecnologico-applicativo|Stack Tecnologico Applicativo]]"],"sources":["[[wiki/sources/2026-03-02-conspref-srs-v1-revised\|CONSPREF-SRS-V1.0 revised bozza v2]] §3.5","[[2019-06-01-linea-guida-fornitori-cloud-native|Linee Guida Cloud Native v1.0.1]]"]}}
---


# ADR-002: Piattaforma ECaaS Kubernetes Nivola

## Status

`accepted` — vincoli formalizzati da CSI nelle Linee Guida Cloud Native v1.0.1; SRS §3.5 pienamente conforme.

## Context

L'applicativo deve girare sulla piattaforma standard CSI per il sanitario. ECaaS (Enterprise Container as a Service) è la piattaforma Kubernetes/Nivola che ospita tutti i progetti sanità Piemonte. Vincoli stretti su rete, storage, ingress, monitoring e registry sono imposti dalla policy CSI per garantire uniformità operativa, sicurezza e governance multi-tenant.

## Decision

Adottare ECaaS Kubernetes Nivola con vincoli vincolanti:

| Componente | Tecnologia (l'unica ammessa) |
|---|---|
| Orchestrazione | Kubernetes (ECaaS), namespace isolato per progetto |
| Ingress Controller | **TRAEFIK** (esclusivo) |
| CNI | **Cilium** (esclusivo, NetworkPolicy centralizzate) |
| Storage | NFS via StorageClass CSI Trident (NetApp) |
| Monitoraggio | Prometheus |
| Log | Stack ELK (ElasticSearch + LogStash + Kibana) |
| Deploy | Helm + GitOps (rollout automatico su tag GitLab) |
| Registry immagini | Artifactory CSI (`docker-trusted`, `docker-base`, `docker-projects`) |

Vincoli obbligatori per ogni Deployment:
- `resources.requests` + `resources.limits` (no burst illimitato)
- `livenessProbe` + `readinessProbe`
- Helm chart solo da `helm-base` / `helm-projects` CSI
- Niente immagini esterne ad Artifactory CSI

## Consequences

### Positive
- Uniformità operativa cross-progetto sanità
- Monitoring/logging centralizzati (Prometheus + ELK già disponibili)
- TLS termination + WAF gestiti dalla piattaforma → meno codice applicativo
- GitOps deploy riproducibile e auditabile

### Negative
- **No installazioni Cluster-level** — niente KNative, Istio, service mesh, operatori custom
- Dipendenza totale dall'Artifactory CSI per immagini base
- Latenza alta per provisioning DBaaS (vedi [[ADR-003\|ADR-003]])
- Vincolato a Helm chart CSI — niente Kustomize o template alternativi
- Migrazione tooling esterno → CSI può richiedere mesi

### Neutral
- Accesso piattaforma via Rancher CLI + console nivola-rancher2.nivolapiemonte.it (OpenLDAP)
- Utenze CSI richieste per consulenti Exprivia

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| Cloud pubblico (AWS/Azure) | Fuori policy CSI sanità; dati sensibili devono restare in Nivola |
| OpenShift on-premise | Non disponibile in ecosistema CSI Piemonte |
| Bare metal / VM legacy | RETIRED — CSI ha già migrato la maggior parte degli applicativi sanità a ECaaS |

## References

- [[wiki/sources/2019-06-01-linea-guida-fornitori-cloud-native\|Linee Guida Cloud Native per Fornitori v1.0.1]]
- [[wiki/concepts/architettura-ecaas\|Architettura ECaaS]]
- [[wiki/sources/2026-03-02-conspref-srs-v1-revised\|CONSPREF-SRS-V1.0 revised bozza v2]] §3.5
- Correlato: [[ADR-001\|ADR-001]] stack, [[ADR-003\|ADR-003]] DBaaS Nivola

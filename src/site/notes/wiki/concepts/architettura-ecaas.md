---
{"dg-publish":true,"permalink":"/wiki/concepts/architettura-ecaas/","title":"Architettura ECaaS","tags":["infrastruttura","kubernetes","cloud","ecaas","nivola","csi-piemonte"],"dg-note-properties":{"title":"Architettura ECaaS","aliases":["Architettura ECaaS"],"type":"concept","tags":["infrastruttura","kubernetes","cloud","ecaas","nivola","csi-piemonte"],"created":"2026-05-05","updated":"2026-05-14","sources":["2026-03-02-conspref-srs-v1-revised","2026-03-12-pile-tecnologiche-csi"],"related":["[[CSI Piemonte]]","[[2026-03-12-pile-tecnologiche-csi|Pile Tecnologiche CSI Piemonte]]","[[Gestione Consensi - Applicativo]]"]}}
---


# Architettura ECaaS (Enterprise Container as a Service)

Piattaforma cloud [[wiki/entities/csi-piemonte\|CSI Piemonte]] basata su Kubernetes/Nivola. Ospita il progetto [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi - Applicativo]].

---

## Componenti infrastrutturali

| Componente | Tecnologia | Note |
|---|---|---|
| Orchestrazione | Kubernetes (ECaaS) | Ogni progetto in namespace isolato |
| IngressController | **TRAEFIK** (solo questo) | No altri IngressController |
| Storage | NFS via StorageClass CSI Trident (NetApp) | No host volumes |
| Monitoraggio | Prometheus | Metriche e alert |
| Log | Stack ELK (ElasticSearch + LogStash + Kibana) | Log centralizzati |
| CNI | Cilium | NetworkPolicy gestite centralmente |
| Deploy | Helm + GitOps | Rollout automatico al tag push GitLab |
| Registry immagini | Artifactory CSI | Solo docker-trusted, docker-base, docker-projects |

---

## Vincoli architetturali obbligatori

- **No** KNative, Istio, network mesh
- **No** installazioni software a livello Cluster
- **No** immagini esterne ad Artifactory CSI
- Ogni Deployment: `resources.requests` e `resources.limits` obbligatori
- Ogni Deployment: `livenessProbe` e `readinessProbe` obbligatori
- Helm chart: solo dipendenze da chart CSI (helm-base, helm-projects)

---

## Registry immagini per il progetto

| Registry | Scopo |
|---|---|
| docker-trusted | Immagini pubbliche validate, as-is |
| docker-base | Immagini customizzate CSI (httpd_csi, angular, spring-boot) |
| docker-projects | Immagini build del progetto |

**Immagini di riferimento progetto:**
- Backend: `reference/spring-boot` (docker-base)
- Frontend: `angular` (docker-base)
- Web Server: `httpd_csi` (docker-base)

---

## Pipeline CI/CD

```
Push/Tag GitLab → Jenkins build → Dockerfile analisi → 
Artifactory push → SonarQube analisi → GitOps rollout
```

---

## DBaaS Nivola (database)

Il DB è **esterno al namespace ECaaS** — erogato come servizio gestito da Nivola.
- Provisioning via scheda formale a Nivola (alta latenza)
- Backup, patching, HA: gestiti da Nivola
- Credenziali: mai nel codice → K8s Secret → variabili env Spring
- HikariCP: max-pool-size ≤ 40/replica (istanza 100 conn max, 2 repliche)

---

## Accesso alla piattaforma

- Utenza CSI richiesta per consulenti Exprivia
- Rancher CLI + kubeconfig da referente CSI
- Console web: nivola-rancher2.nivolapiemonte.it (OpenLDAP)

---

## Diagramma di alto livello (Mermaid)

```mermaid
graph TD
    WC[Web App Cittadino] --> AW[Apache WS k8s]
    WO[Web App Operatore] --> AW
    AW --> SGC[Servizio Gestione Consensi Spring Boot]
    AW --> SC[Servizio Configurazione Spring Boot]
    SGC --> PG[(PostgreSQL DBaaS Nivola)]
    SC --> PG
    SGC --> AURA[AURA - SOAP]
    SGC --> GD[Gestione Deleghe - SOAP]
    SGC --> NOT[Notificatore UNP - REST]
    SGC --> SIA[SIA ASR - SOAP/REST]
```

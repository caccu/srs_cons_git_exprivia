---
{"dg-publish":true,"permalink":"/wiki/sources/2019-06-01-linea-guida-fornitori-cloud-native/","title":"Linee Guida Cloud Native per Fornitori v1.0.1","tags":["infrastruttura","ecaas","docker","helm","kubernetes","csi-piemonte","vincoli"],"dg-note-properties":{"title":"Linee Guida Cloud Native per Fornitori v1.0.1","aliases":["Linee Guida Cloud Native per Fornitori v1.0.1"],"type":"source","tags":["infrastruttura","ecaas","docker","helm","kubernetes","csi-piemonte","vincoli"],"created":"2026-05-05","updated":"2026-05-05","sources":[],"related":["[[Architettura ECaaS]]","[[CSI Piemonte]]","[[2026-03-02-conspref-srs-v1-revised|CONSPREF-SRS-V1.0 revised bozza v2]]"]}}
---


# Linee Guida Cloud Native per Fornitori v1.0.1

**Documento:** Linea-Guida-Fornitori-v1.0.1_cloud.md
**Emittente:** [[wiki/entities/csi-piemonte\|CSI Piemonte]] — Area Architetture/DevOps
**Rilevanza:** Documento normativo vincolante per tutti i fornitori ECaaS, incluso [[wiki/entities/exprivia\|Exprivia S.p.A.]]

---

## Risultato verifica SRS

> ✅ La sezione 3.5 dell'SRS (CONSPREF-SRS-V1.0) recepisce correttamente e completamente tutte le prescrizioni di questo documento. Nessun vincolo omesso.

---

## Infrastruttura [[wiki/concepts/architettura-ecaas\|ECaaS]] — Riepilogo vincoli

Tutti i vincoli confermano il §3.5 dell'SRS:

| Componente | Vincolo |
|---|---|
| IngressController | Solo **TRAEFIK** — no altri tipi |
| Storage | Solo NFS via StorageClass CSI Trident — no host volumes |
| CNI | Solo **Cilium** — no altri CNI |
| Monitoraggio | Prometheus |
| Log | Stack ELK |
| Deploy | Helm + GitOps — chart esterne non ammesse |
| Immagini | Solo da registry Artifactory CSI — cluster rigetta immagini esterne |
| Software cluster | No installazioni autonome (KNative, Istio, nuovi IngressController) |
| Deployment | resources.requests + limits obbligatori + livenessProbe + readinessProbe |

---

## Registry immagini

| Registry | Scopo | Autori |
|---|---|---|
| docker-trusted | Immagini pubbliche as-is approvate | Area Architetture/DevOps |
| docker-base | Immagini CSI customizzate (standard interni/sicurezza) | Area Architetture/DevOps + aree specifiche |
| docker-projects | Immagini da CI del progetto | CI automation, controllo team progetto |

**Per nuove immagini base:** scrivere a architetture_ai@csi.it

### Immagini docker-base rilevanti per [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi]]

| Immagine | Uso |
|---|---|
| `reference/spring-boot` | Backend Spring Boot |
| `angular` | Frontend Angular |
| `httpd_csi` | Web Server Apache |
| `maven` | Build Maven (stage di build multi-stage) |

---

## Linee guida Dockerfile

1. Raggruppare RUN — no layer eccessivi
2. Eliminare artefatti temporanei nello stesso RUN che li crea
3. **Multi-stage build** — build Maven in stage build, copia solo JAR in stage finale
4. Variabili d'ambiente per configurazione — immagine usabile sia con `docker run` sia da Helm
5. **Label OpenContainers obbligatorie** su ogni immagine

### Label obbligatorie
```
org.opencontainers.image.created
org.opencontainers.image.authors
org.opencontainers.image.url
org.opencontainers.image.source
org.opencontainers.image.version
org.opencontainers.image.revision
org.opencontainers.image.vendor
org.opencontainers.image.licenses
org.opencontainers.image.title
org.opencontainers.image.description
```

---

## Pipeline CI/CD e tagging

- Webhook GitLab → Jenkins → build immagine → Artifactory push
- Branching mode: `REPO_BRANCH_MODE_ACTIVE=true` in `csi.props`
- Tag GitLab = tag immagine Artifactory (versioning del progetto)
- Push su `master` in modalità branching: ignorato (nessuna immagine generata)

---

## Helm Chart

- Dispiegamento solo tramite **Chart CSI** (helm-base, helm-projects)
- Chart di progetto include come dipendenze le chart CSI delle tecnologie usate
- Per [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi]]: `springboot` (backend) + `httpd` (web server)
- No chart Bitnami o esterne
- Il DB (DBaaS Nivola) non è in una chart — K8s Secret per credenziali

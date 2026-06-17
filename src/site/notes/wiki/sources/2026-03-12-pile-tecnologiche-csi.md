---
{"dg-publish":true,"permalink":"/wiki/sources/2026-03-12-pile-tecnologiche-csi/","title":"Pile Tecnologiche CSI Piemonte","tags":["tecnologia","csi-piemonte","stack","kubernetes","postgresql","springboot"],"dg-note-properties":{"title":"Pile Tecnologiche CSI Piemonte","aliases":["Pile Tecnologiche CSI Piemonte"],"type":"source","tags":["tecnologia","csi-piemonte","stack","kubernetes","postgresql","springboot"],"created":"2026-05-05","updated":"2026-05-05","sources":[],"related":["[[CSI Piemonte]]","[[Architettura IaaS]]","[[2026-03-02-conspref-srs-v1-revised|CONSPREF-SRS-V1.0 revised bozza v2]]"]}}
---


# Pile Tecnologiche CSI Piemonte

**Fonte:** kbt.csi.it — export del 12/03/2026
**Rilevanza:** Vincola le scelte tecnologiche del progetto Gestione Consensi

---

## Stack rilevanti per il progetto

### Backend (ECaaS)
| Pila | Versione | Stato (mar 2026) |
|---|---|---|
| springboot_k8s 3 | v1.0.0 | **CURRENT** ✅ |
| springboot_k8s 2 | v1.0.0 | RETIRED ❌ |
| AdoptiumTemurinOpenJDK17 | v1.0.0 | **CURRENT** ✅ |

### Database (ECaaS/Nivola)
| Pila | Stato |
|---|---|
| PostgreSQL 17-community | **CURRENT** (da dic 2025) ✅ |
| PostgreSQL 15-community | CURRENT ✅ |
| PostgreSQL 14-community | CURRENT ✅ |
| PostgreSQL 12.4-community | RETIRED (nov 2025) ❌ |
| PostgreSQL 9.6-community | RETIRED (nov 2024) ❌ |

### Web Server (ECaaS)
| Pila | Stato |
|---|---|
| Apache WS 2.4_k8s | **CURRENT** ✅ |

### Frontend
Angular non è listato esplicitamente come pila CSI, ma la risposta Q&A CSI conferma: **Angular v19.x CURRENT** nello stack SPA Angular2/springboot/Resteasy v2.1.0.

---

## Implicazioni per il progetto

1. **PostgreSQL 17** è CURRENT → scelta del TO-BE allineata
2. **PostgreSQL 9** usato nell'AS-IS è RETIRED dal nov 2024 → migrazione urgente e necessaria
3. **Spring Boot 3 k8s** è CURRENT → Spring Boot 3.4.10+ corretto
4. **Java 17** CURRENT → conforme

---

## Note
- PostgreSQL 14 va in DEPRECATED il 12/11/2026 — rilevante per pianificazione futura
- PostgreSQL 15 va in DEPRECATED il 11/11/2027
- Wildfly 23_ol va in DEPRECATED set 2026 — non rilevante per questo progetto

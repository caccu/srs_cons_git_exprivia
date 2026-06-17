---
{"dg-publish":true,"permalink":"/wiki/sources/2026-05-05-mermaid-architettura/","title":"Diagramma Architettura Sistema — Mermaid","tags":["architettura","mermaid","diagramma","to-be","frontend","backend"],"dg-note-properties":{"title":"Diagramma Architettura Sistema — Mermaid","aliases":["Diagramma Architettura Sistema — Mermaid"],"type":"source","tags":["architettura","mermaid","diagramma","to-be","frontend","backend"],"created":"2026-05-05","updated":"2026-06-17","sources":[],"related":["[[Architettura IaaS]]","[[Gestione Consensi - Applicativo]]","[[Sistemi Esterni Integrati]]","[[GASP Salute]]"]}}
---


# Diagramma Architettura Sistema (Mermaid.txt)

**File:** `raw/Mermaid.txt`
**Formato:** Mermaid graph TD
**Rilevanza:** Diagramma architetturale ufficiale del sistema TO-BE. Fonte visuale del contratto architetturale concordato con [[wiki/entities/csi-piemonte\|CSI Piemonte]].

---

## Contenuto del diagramma

```mermaid
graph TD
    subgraph BROWSER["Browser Utente"]
        WC["Web App (Cittadino)"]
        WO["Web App (Operatore)"]
    end

    subgraph INFRA["Cloud CSI Nivola (IaaS)"]
        subgraph FL["Frontend Layer"]
            AW["Apache Web Server\n(immagine: httpd_csi · docker-base)"]
        end
        subgraph BL["Backend Layer"]
            AG["API Gateway"]
            subgraph SB["Servizi Backend (Spring Boot 3)"]
                SGC["Servizio Gestione Consensi"]
                SC["Servizio Configurazione"]
            end
        end
        subgraph DL["Data Layer"]
            PG[("PostgreSQL DB")]
        end
    end

    subgraph SE["Sistemi Esterni"]
        GASP["GASP Salute\n(SPID/CIE)"]
        AURA["AURA"]
        GD["Gestione Deleghe"]
        NOT["Notificatore"]
        SIA["SIA ASR\n(1 azienda : n sistemi)"]
        CR["Configuratore Regionale\n(PUA / IRIDE)"]
    end

    WC --> AW
    WO --> AW
    AW --> AG
    AG --> SGC
    AG --> SC
    SGC --> PG
    SC --> PG
    SGC --> AURA
    SGC --> GD
    SGC --> NOT
    SGC --> SIA
    WC -. "Autenticazione SPID/CIE" .-> GASP
    WO -. "Profilazione gestita da PUA / Configuratore" .-> CR

    style AW fill:#e8f4f8,stroke:#2c6e9e,color:#000
    style PG fill:#e8f4f8,stroke:#2c6e9e,color:#000
    style CR fill:#f0f0f0,stroke:#555,color:#000
    style GASP fill:#f0f0f0,stroke:#555,color:#000
    style INFRA fill:#f5f9ff,stroke:#2c6e9e
    style SE fill:#f9f9f9,stroke:#888
    style BROWSER fill:#fff,stroke:#333
```

---

## Note di interpretazione

- **Due servizi backend separati:** Servizio Gestione Consensi (logica CDU) e Servizio Configurazione (parametri/informative) — coerente con SRS §4. Vedi [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi - Applicativo]].
- **GASP Salute** — nodo separato da CR. Il cittadino accede via **SPID/CIE** direttamente tramite [[wiki/concepts/gasp-salute\|GASP Salute]], senza transitare dal Configuratore Regionale (verbale 11/06/2026).
- **CR (Configuratore Regionale / PUA / IRIDE)** — esclusivamente per profilazione operatori. Linee tratteggiate = dipendenza esterna, non chiamata diretta applicativa.
- **SIA ASR** — relazione **1 azienda : n sistemi** (verbale 11/06/2026). Un'ASR può avere più sistemi SIA; se uno è in manutenzione, CSI interrompe l'invio verso tutti. Vedi [[wiki/concepts/batch-processes\|Processi Batch]] §Gestione Manutenzione ASR.
- **Infrastruttura [[wiki/concepts/architettura-iaas\|Architettura IaaS]]:** ambiente IaaS Nivola (non ECaaS/Kubernetes) per tutti gli ambienti (verbale 11/06/2026).

> ⚠️ **Conflict — API Gateway:** Il diagramma mantiene il nodo "AG" tra Apache e Spring Boot. L'SRS §3.4 (confermato da CSI nel Q&A #6) specifica che **non è previsto un API Gateway separato** per l'AS-IS — Spring Security gestisce autenticazione/autorizzazione. Per il TO-BE, il verbale 11/06/2026 introduce **API Manager CSI** per nuovi fruitori esterni. Il nodo AG potrebbe rappresentare questo API Manager TO-BE. Da chiarire con [[wiki/entities/csi-piemonte\|CSI Piemonte]] nella prossima revisione architetturale.

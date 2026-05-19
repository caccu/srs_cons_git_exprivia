---
{"dg-publish":true,"permalink":"/wiki/concepts/gasp-salute/","title":"GASP Salute","tags":["autenticazione","idp","spid","cie","sso","csi-piemonte","rischio-critico"],"dg-note-properties":{"title":"GASP Salute","aliases":["GASP Salute"],"type":"concept","tags":["autenticazione","idp","spid","cie","sso","csi-piemonte","rischio-critico"],"created":"2026-05-05","updated":"2026-05-14","sources":["2026-03-02-conspref-srs-v1-revised","2026-03-02-domande-srs-csi-v02","2026-03-12-pile-tecnologiche-csi"],"related":["[[CSI Piemonte]]","[[Gestione Consensi - Applicativo]]","[[Architettura ECaaS]]","[[wiki/analyses/valutazione-qualita-srs-consensi|Valutazione Qualità SRS — Gestione Consensi]]"]}}
---


# GASP Salute

Identity Provider (IdP) federato gestito da [[wiki/entities/csi-piemonte\|CSI Piemonte]]. Fornisce autenticazione SSO per cittadini sulla piattaforma Sanità Elettronica Regione Piemonte tramite SPID e CIE.

---

## Ruolo nel progetto

Tutti i CDU Cittadino (CDU-01 ÷ CDU-06) in [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi - Applicativo]] dipendono da GASP Salute per l'autenticazione. Nessuna autenticazione diretta nell'applicativo — tutto delegato a GASP. Blocco di CDU-01 equivale a blocco dell'intera area Cittadino.

---

## Rischio critico aperto — protocollo non definito

| Aspetto               | Stato                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------- |
| Protocollo            | **OIDC o SAML2 — non ancora scelto**                                                      |
| Responsabilità scelta | [[wiki/entities/csi-piemonte\|CSI Piemonte]] (referente GASP)                                           |
| Impatto se SAML2      | Libreria aggiuntiva Spring Security SAML2, configurazione keystores, maggiore complessità |
| Impatto se OIDC       | Più semplice — Spring Security OAuth2/OIDC nativo, nessuna dipendenza aggiuntiva          |
| Azione richiesta      | Documentazione tecnica GASP da richiedere **Sprint 0 giorno 1**                           |
|                       |                                                                                           |

> ⚠️ GASP Salute è il **Blocco critico #1** prima del lancio sprint. Senza protocollo definito, CDU-01 non può essere progettato né implementato. Vedi [[wiki/analyses/valutazione-qualita-srs-consensi\|Valutazione Qualità SRS — Gestione Consensi]] §RISCHIO CRITICO 2.

---

## Come appare nell'SRS e nei documenti

- **SRS §3.2:** "L'autenticazione avverrà tramite GASP Salute a seconda del protocollo esposto (OIDC/SAML2) — dettaglio da definire con referente CSI in fase di design tecnico"
- **Domande CSI V02:** confermato che GASP Salute è l'IdP, protocollo non specificato
- **Diagramma Mermaid:** `WC -. "Autenticazione gestita da GASP Salute" .-> CR` (linea tratteggiata = dipendenza esterna)
- **Pile tecnologiche CSI:** GASP Salute non catalogato direttamente — componente infrastrutturale CSI

---

## Integrazione tecnica (scenari possibili)

| Aspetto | Scenario OIDC | Scenario SAML2 |
|---|---|---|
| Dipendenza Spring | `spring-boot-starter-oauth2-client` | `spring-security-saml2-service-provider` |
| Flow | Authorization Code PKCE | SAML2 POST binding |
| Token | JWT / access_token | SAML Assertion XML |
| Configurazione | `spring.security.oauth2.client.*` | Keystore + IdP metadata XML |
| Complessità | Bassa | Media-Alta |

---

## Relazione con altri sistemi di autenticazione

| Sistema             | Profilo                            | IdP                                                  |
| ------------------- | ---------------------------------- | ---------------------------------------------------- |
| GASP Salute         | Cittadino (SPID/CIE)               | Esterno a [[wiki/concepts/architettura-ecaas\|Architettura ECaaS]] |
| PUA / RUPAR / IRIDE | Operatore Sanitario/Amministrativo | Gestito da [[wiki/entities/csi-piemonte\|CSI Piemonte]]            |
| OAuth2 Bearer JWT   | SIA Aziendale (CDU-15/16)          | Gestito internamente                                 |

---

## ADR correlati

| ADR | Decisione |
|---|---|
| [ADR-010](../../docs/adr/ADR-010-cdu-01-split.md) | Split CDU-01 in CDU-01a Operatore + CDU-01b Cittadino (CDU-01b dipende da GASP) |

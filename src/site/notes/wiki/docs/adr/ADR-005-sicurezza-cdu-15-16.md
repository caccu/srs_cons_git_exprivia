---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-005-sicurezza-cdu-15-16/","title":"Sicurezza CDU-15/16 — OAuth2 Client Credentials + JWT + autorizzazione per ente a 3 livelli","tags":["sicurezza","cdu-15","cdu-16","oauth2","jwt","multi-tenancy","spring-security","tr30","tr58"],"dg-note-properties":{"adr":5,"title":"Sicurezza CDU-15/16 — OAuth2 Client Credentials + JWT + autorizzazione per ente a 3 livelli","status":"accepted","date":"2026-05-14","deciders":["Marco Forneris","CSI Piemonte","Exprivia"],"supersedes":[],"superseded-by":[],"tags":["sicurezza","cdu-15","cdu-16","oauth2","jwt","multi-tenancy","spring-security","tr30","tr58"],"related_wiki":["[[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15/16 — Modello Autorizzazione per Ente]]","[[wiki/analyses/analysis-2026-05-06-openapi-cdu-15-16\|OpenAPI CDU-15/16]]","[[Sistemi Esterni Integrati]]"],"sources":["[[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|Risposte MF — Revisione SRS v3 lavorazione]] MF59-62R58 (ex TR30/TR58)","[[2026-03-02-conspref-srs-v1-revised|CONSPREF-SRS-V1.0 revised bozza v2]] §6.15–§6.16"]}}
---


# ADR-005: Modello sicurezza CDU-15/16 — autorizzazione per ente a 3 livelli

## Status

`accepted` — risposta tecnica autoritativa MF59-62R58 (ex commento TR30/TR58) sulla revisione SRS bozza v3.

## Context

Il cliente CSI/Regione ha posto il quesito **TR30/TR58**:
> "Si richiede di dettagliare meglio il comportamento del WS e la security (come si lega la possibilità di vedere unicamente i propri ws, passiamo dal API manager?)"

I CDU-15 (stato consenso per CF) e CDU-16 (configurazione per ente) sono REST esposti verso i SIA delle ASR. Vincolo critico di multi-tenancy: ogni SIA deve vedere **solo i propri** consensi e configurazioni — mai quelli di altre ASR. Il modello deve resistere a:
- Token forgiati o scaduti
- Manipolazione del `codice_ente` nei parametri request
- Bug nei filter applicativi
- Credenziali compromesse

Dato [[ADR-004\|ADR-004]] (no API Gateway), tutta la sicurezza è applicativa.

## Decision

Modello di sicurezza a **3 livelli di difesa**:

**Livello A — Identità del client (firma JWT)**
- OAuth2 Client Credentials flow contro Authorization Server CSI Piemonte
- JWT firmato (RS256/ES256), validato dal backend via chiave pubblica JWKS
- Claim `client_id`, `iss`, `aud`, `exp` validati su ogni richiesta

**Livello B — Mapping `client_id` → `codice_ente` autorizzato**
- Tabella applicativa `cons_t_client_ente` (nuova in SRS §8) lega ogni `client_id` a **uno e un solo** `codice_ente`
- Filter Spring Security custom `EnteAuthorizationFilter` confronta `codice_ente` request vs autorizzato → 403 in caso di mismatch
- Mapping in tabella (non claim JWT) per consentire revoca senza riemissione token e supporto futuro a ruoli speciali

**Livello C — Filtro query (defense in depth)**
- Tutte le repository query CDU-15/16 forzano `WHERE codice_ente = :authorizedEnte` preso dal SecurityContext, **mai dal parametro request**
- Anche se filter B fosse bypassato per bug, la query non leakerà dati di altri enti

Componenti aggiuntivi:
- Rate limit applicativo via `bucket4j` (default 60 req/min per client)
- Audit log JSON strutturato con `client_id`, `codice_ente_requested`, `codice_ente_authorized`, `outcome`, `latency_ms`, `trace_id` (CF mai loggato in chiaro)
- Errori RFC 7807 ([[ADR-018\|ADR-018]])

## Consequences

### Positive
- Isolamento dati per ente garantito da 3 controlli indipendenti
- Revoca client senza dover riemettere token (basta `data_revoca` in tabella)
- Audit log granulare per investigazione breach
- Pattern riusabile per [[ADR-006\|ADR-006]] CDU-17 PULL

### Negative
- Nuova tabella `cons_t_client_ente` da popolare e mantenere in onboarding SIA
- Procedura onboarding SIA da concordare con CSI (chi crea `client_id`, chi popola mapping)
- Rate limit applicativo deve essere monitorato in operations
- Cross-tenant E2E test obbligatorio (client A → ente B → atteso 403)

### Neutral
- Aggiunge componente `EnteAuthorizationFilter` a SRS §3.3

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| Solo JWT con claim `codice_ente` embedded | Niente revoca senza riemissione; niente audit storico mapping; meno flessibile per ruoli speciali futuri |
| API Manager CSI come gatekeeper | Escluso da [[ADR-004\|ADR-004]]; modello multi-tenant per ente non standard APIM |
| mTLS per ente | Onboarding complesso (rotation certificati per ogni SIA), niente flessibilità scope OAuth |

## Open issues

Domande aperte verso CSI (tracker [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI]] §2):
- SEC-01: URL AS CSI Piemonte (DEV/PROD)
- SEC-02: Algoritmo firma JWT + endpoint JWKS
- SEC-03: Procedura onboarding SIA
- SEC-04: TTL token + politica refresh
- SEC-05: Scope OAuth predefiniti CSI o liberi
- SEC-06: Politica revoca credenziali compromesse

## References

- [[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15/16 — Modello Autorizzazione per Ente]] (concept completo con pseudocodice filter e matrice attacchi)
- [[wiki/analyses/analysis-2026-05-06-openapi-cdu-15-16\|OpenAPI CDU-15/16]]
- [[wiki/analyses/analysis-2026-05-14-risposte-mf-srs-v3\|Risposte MF — Revisione SRS v3 lavorazione]] MF59-62R58
- Correlato: [[ADR-004\|ADR-004]] no API Gateway, [[ADR-006\|ADR-006]] CDU-17 PULL riusa stesso pattern, [[ADR-018\|ADR-018]] RFC 7807

---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-004-no-api-gateway/","title":"No API Gateway/Manager CSI — sicurezza interamente applicativa via Spring Security","tags":["sicurezza","api-gateway","spring-security","architettura","no-apim"],"dg-note-properties":{"adr":4,"title":"No API Gateway/Manager CSI — sicurezza interamente applicativa via Spring Security","status":"accepted","date":"2026-03-02","deciders":["CSI Piemonte","Exprivia"],"supersedes":[],"superseded-by":[],"tags":["sicurezza","api-gateway","spring-security","architettura","no-apim"],"related_wiki":["[[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15/16 — Modello Autorizzazione per Ente]]","[[architettura-ecaas|Architettura ECaaS]]","[[analysis-2026-05-06-openapi-cdu-15-16|OpenAPI CDU-15/16]]"],"sources":["[[wiki/sources/2026-03-02-domande-srs-csi-v02\|Domande SRS Consensi — Revisione CSI V02]] Q&A #6","[[wiki/sources/2026-03-02-conspref-srs-v1-revised\|CONSPREF-SRS-V1.0 revised bozza v2]] §3.2"]}}
---


# ADR-004: No API Gateway, security applicativa via Spring Security

## Status

`accepted` — confermato in Q&A V02 #6, formalizzato in SRS v3 §3.2.

## Context

CSI Piemonte dispone di un API Manager centralizzato che molti progetti usano come punto di ingresso (auth, throttling, audit). Per Gestione Consensi è stato chiesto se attraversare l'APIM o gestire la security a livello applicativo.

Forze in campo:
- APIM centralizzato semplifica operations ma aggiunge un hop, dipendenza esterna e configurazioni distribuite
- L'applicativo ha già Spring Security 6 (Spring Boot 3) che gestisce nativamente OAuth2/JWT
- Il modello di autorizzazione **per ente** richiesto da CDU-15/16 (un SIA vede solo i propri consensi) è specifico e non standard — difficile da implementare puramente lato APIM

## Decision

L'applicativo **non attraversa l'API Gateway/Manager centralizzato del CSI Piemonte**. Le chiamate HTTP sono instradate direttamente ai Servizi Backend Spring Boot 3 dall'Ingress Kubernetes ECaaS. La sicurezza (autenticazione + autorizzazione) è interamente gestita a livello applicativo tramite Spring Security.

Conseguenza diretta: tutte le funzioni tipicamente APIM vengono ripiegate nell'app:

| Funzione APIM                     | Componente applicativo TO-BE                                                   |
| --------------------------------- | ------------------------------------------------------------------------------ |
| Autenticazione (token validation) | Spring Security + nimbus-jose-jwt                                              |
| Autorizzazione granulare per ente | Filter custom `EnteAuthorizationFilter` (vedi [[wiki/docs/adr/ADR-005-sicurezza-cdu-15-16\|ADR-005-sicurezza-cdu-15-16]]) |
| Rate limiting / throttling        | `bucket4j` o `resilience4j-ratelimiter`                                        |
| Audit log strutturato             | Logger applicativo JSON                                                        |
| Quota per client                  | Tabella DB + filter                                                            |

TLS termination e WAF restano sull'Ingress ECaaS / layer rete CSI.

## Consequences

### Positive
- Modello autorizzazione complesso (per `codice_ente`) implementabile nativamente
- Niente dipendenza esterna su APIM CSI per i deploy
- Audit log direttamente accessibile dall'app, contestualizzato
- Zero latenza extra di hop APIM

### Negative
- Rate limiting e quota ora a carico dell'applicativo — più codice da scrivere e testare
- Niente baseline security gratuita (audit/rate limit comuni) — tutto da implementare/configurare
- Operations deve monitorare il rate limit applicativo, non APIM centralizzato

### Neutral
- Decisione architetturale di forte impatto su tutti i CDU REST (15, 16, eventuale 17)

## Alternatives considered

| Alternativa                                     | Motivo scarto                                                                                                                           |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Attraversamento APIM CSI                        | Modello autorizzazione per `codice_ente` non standard; dipendenza esterna su risorsa condivisa CSI; difficoltà a propagare claim custom |
| API Gateway open-source self-hosted (Kong, Tyk) | Vincoli ECaaS impediscono install Cluster-level (vedi [[wiki/docs/adr/ADR-002-piattaforma-ecaas\|ADR-002-piattaforma-ecaas]])                                                    |

## References

- [[wiki/sources/2026-03-02-domande-srs-csi-v02\|Domande SRS Consensi — Revisione CSI V02]] Q&A #6
- [[wiki/sources/2026-03-02-conspref-srs-v1-revised\|CONSPREF-SRS-V1.0 revised bozza v2]] §3.2
- [[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15/16 — Modello Autorizzazione per Ente]]
- Correlato: [[wiki/docs/adr/ADR-005-sicurezza-cdu-15-16\|ADR-005-sicurezza-cdu-15-16]] sicurezza CDU-15/16 (decisione conseguente)

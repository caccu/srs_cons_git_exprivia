---
{"dg-publish":true,"permalink":"/docs/adr/adr-014-apache-cxf-soap-client/","title":"Apache CXF come client SOAP (compatibile Spring Boot 3)","tags":["soap","client","apache-cxf","integrazione","aura","batch-01","deleghe"],"dg-note-properties":{"adr":14,"title":"Apache CXF come client SOAP (compatibile Spring Boot 3)","status":"accepted","date":"2026-03-02","deciders":["CSI Piemonte","Exprivia"],"supersedes":[],"superseded-by":[],"tags":["soap","client","apache-cxf","integrazione","aura","batch-01","deleghe"],"related_wiki":["[[Sistemi Esterni Integrati|Sistemi Esterni Integrati]]","[[wiki/concepts/batch-processes|Processi Batch — BATCH-01, BATCH-02, BATCH-03]]","[[wiki/concepts/stack-tecnologico-applicativo|Stack Tecnologico Applicativo]]"],"sources":["[[wiki/sources/2026-03-02-domande-srs-csi-v02|Domande SRS Consensi — Revisione CSI V02]] Q&A #9"]}}
---


# ADR-014: Apache CXF come client SOAP

## Status

`accepted` — confermato in Q&A V02 #9 come libreria compatibile con stack Spring Boot 3 + Java 17.

## Context

Tre integrazioni richiedono client SOAP:
- **AURA** (FindProfiliAnagrafici, getProfiloSanitario) — WS-Security UsernameToken IRIS
- **Gestione Deleghe** — OAuth2 Client Credentials
- **SIA ASR outbound** (BATCH-01) — WS-Security X509, contratto WSDL AS-IS invariato ([[wiki/sources/2019-06-01-webservice-consenso-regionale-v03\|2019-06-01-webservice-consenso-regionale-v03]])

Spring Boot 3 + Java 17 hanno migrato a Jakarta EE (namespace `jakarta.*`). Le librerie SOAP devono supportare il nuovo namespace, escludendo molte versioni legacy di Apache CXF, JAX-WS RI o Spring-WS.

## Decision

Adottare **Apache CXF** come client SOAP per tutte e tre le integrazioni.

Motivi:
- Compatibile Spring Boot 3 + Jakarta EE 10 (versioni recenti)
- Supporto completo WS-Security (UsernameToken + X509) richiesto da AURA e SIA
- Generazione stub da WSDL via `cxf-codegen-plugin` Maven
- Integrazione Spring Boot via `cxf-spring-boot-starter-jaxws`

Alternativa esplicitamente menzionata in Q&A CSI #9: **Spring-WS** (anch'essa compatibile). In caso di vincoli specifici scoperti durante implementazione (es. interoperability con WSDL legacy specifico), Spring-WS può essere usato senza ritrattare l'architettura.

## Consequences

### Positive
- Tutte e tre le integrazioni con un singolo stack client
- WS-Security supportato out-of-the-box (UsernameToken IRIS, X509)
- Stub generati da WSDL → niente parsing XML manuale
- Compatibilità Jakarta EE 10 (richiesta da [[ADR-001\|ADR-001]])

### Negative
- Apache CXF è verbose nella configurazione (interceptor, security policy)
- Logging WS-Security richiede attenzione (no secrets in log)
- Dipendenza pesante (vs client REST nativo)

### Neutral
- Approvvigionamento WSDL AURA, Gestione Deleghe da CSI ancora ❌ (Sprint 0)
- Certificati X509 per ogni ASR da richiedere (Sprint 0)

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| **Spring-WS** | Equivalente funzionalmente; resta opzione fallback (Q&A CSI #9). Preferenza CXF per coverage WS-Security più completa |
| **JAX-WS RI** | Non più mantenuto attivamente; dubbi su compatibilità Jakarta EE 10 |
| **WebClient + parsing XML manuale** | Rinuncia a WSDL contract-first; reinventa WS-Security a mano; rischio errori |

## References

- [[wiki/sources/2026-03-02-domande-srs-csi-v02\|Domande SRS Consensi — Revisione CSI V02]] Q&A #9
- [[Sistemi Esterni Integrati\|Sistemi Esterni Integrati]] (AURA, Gestione Deleghe, SIA ASR outbound)
- [[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] (BATCH-01 client SOAP)
- [[wiki/concepts/stack-tecnologico-applicativo\|Stack Tecnologico Applicativo]] §Backend
- Correlato: [[ADR-001\|ADR-001]] stack Spring Boot 3, [[ADR-007\|ADR-007]] BATCH-01 uso CXF

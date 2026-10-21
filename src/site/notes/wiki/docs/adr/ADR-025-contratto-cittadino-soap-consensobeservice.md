---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-025-contratto-cittadino-soap-consensobeservice/","title":"Contratto Webapp Cittadino — SOAP ConsensoBeService preservato","tags":["webapp-cittadino","apisan","soap","iso-funzionalita","rconsprefbe"],"dg-note-properties":{"adr":25,"title":"Contratto Webapp Cittadino — SOAP ConsensoBeService preservato","status":"accepted","date":"2026-10-21","deciders":["Exprivia (Marco Forneris, team di sviluppo BE)"],"supersedes":[],"superseded-by":[],"tags":["webapp-cittadino","apisan","soap","iso-funzionalita","rconsprefbe"],"related_wiki":["[[ADR-021-perimetro-solo-operatore]]","[[sistemi-esterni-integrati|Sistemi Esterni Integrati]]","[[wiki/sources/2026-10-21-riscontro-dev-deployment-to-be\|Riscontro dev sul deployment TO-BE]]","[[2026-09-22-ricognizione-endpoint-as-is|Ricognizione endpoint AS-IS]]"],"sources":["2026-10-21-riscontro-dev-deployment-to-be"]}}
---


# ADR-025: Contratto Webapp Cittadino — SOAP ConsensoBeService preservato

## Status

`accepted`: decisione Exprivia del 21/10/2026, su evidenze del team di sviluppo BE. Discende dal vincolo di compatibilità di [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]]. Corregge l'indicazione del 22/09/2026 di esporre i servizi cittadino in REST. Recepito in SRS `revised_v10` rev. 1.14 (§4.2: riga nel riepilogo integrazioni e «Nota contratto Web App Cittadino»).

## Context

[[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]] impone che il backend nuovo resti compatibile con la Webapp Cittadino esistente, che non viene modificata. Il contratto da preservare non era noto: la [[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|ricognizione del 22/09/2026]] copriva le API REST del Back Office (`consprefboweb`) e non aveva trovato servizi cittadino. Su quella base il 22/09 era stato indicato di esporre CDU-02 in REST, con un eventuale adapter (INT-06 chiesto a CSI).

Il 21/10/2026 il team BE ha verificato che la Webapp Cittadino (SANSOL) non passa dal Back Office: chiama direttamente `consprefbe-web` tramite **APISAN** (prodotto CSI, lato server di SANSOL). Le evidenze sono quattro:

1. lo schema AS-IS di CSI ([[wiki/sources/2026-10-21-deployment-diagram-as-is-csi\|deployment diagram]]): APISAN chiama `consprefbe-web` (HTTP:80);
2. il codice di `consprefbe`: `consprefbe-web` espone solo due servizi SOAP, `ConsprefService` e `ConsensoBeService`, e nessuna risorsa REST;
3. l'audit del legacy (`csi_log_audit`, dati di TEST): circa 41.000 chiamate con `id_app = SANSOL` dal 2019 a luglio 2026, sulle operazioni di `ConsensoBeService` (consulta consenso, informativa, codifiche, notifiche, inserisci e modifica);
4. il WSDL di `ConsensoBeService` su TEST, con 10 operazioni.

Posizione nel sorgente `consprefbe` (dev BE, 21/10/2026):

| Elemento | Percorso |
|---|---|
| Contratto | `src/main/java/itf/it/csi/conspref/consprefbe/ws/ConsensoBeService.java` |
| Implementazione | `src/main/java/web/it/csi/conspref/consprefbe/ws/be/ConsensoBeServiceImpl.java` |
| Logica delle operazioni | `src/main/java/web/it/csi/conspref/consprefbe/service/be/` |
| Sicurezza e percorso di esposizione | `src/main/webapp/web/WEB-INF/web.xml` |

## Sicurezza e identità (dev BE, 21/10/2026)

- Nessuna integrazione GASP, Shibboleth o SAML in `consprefbe`: nel `web.xml` c'è solo la **basic authentication** del servizio.
- L'autenticazione SPID/CIE del cittadino si chiude su SANSOL/APISAN.
- Nella richiesta SOAP il backend riceve il codice del servizio chiamante (SANSOL), il CF dell'utente autenticato e i CF di cittadino ed eventuale delegato. Nessun token né header Shibboleth.
- Il CF viene verificato su [[wiki/concepts/sistemi-esterni-integrati\|AURA]].
- Nel TO-BE resta uguale.

## Decision

- Il contratto verso la Webapp Cittadino è il **SOAP `ConsensoBeService`**, esposto da `rconsprefbe` con lo stesso WSDL (10 operazioni), raggiunto tramite APISAN.
- Il WSDL su TEST e le operazioni rilevate nell'audit sono il riferimento di non-regressione per design e collaudo.
- `ConsprefService` (SOAP, ASR federate, DEV-03) resta un servizio distinto, anch'esso mantenuto.
- Nessuna versione REST dei servizi cittadino in V1.0.

## Consequences

### Positive
- La compatibilità verso la Webapp Cittadino diventa verificabile: c'è un contratto scritto (WSDL) e un profilo d'uso reale (audit).
- Chiude la parte principale di INT-06 e INT-08 senza attendere l'elenco da CSI.

### Negative
- `rconsprefbe` deve esporre SOAP oltre a REST (stack JAX-WS/CXF lato server, vedi [[wiki/docs/adr/ADR-014-apache-cxf-soap-client\|ADR-014]] per il lato client).
- Nell'AS-IS APISAN chiama in HTTP:80 senza bilanciatore: il canale TO-BE va ridefinito con CSI (TLS, bilanciamento, INF-05) senza cambiare il contratto.

### Neutral
- L'audit usa dati di TEST: il profilo d'uso di produzione può differire nei volumi, non nelle operazioni.

## Alternatives considered

| Alternativa | Motivo scarto |
|---|---|
| Servizi cittadino in REST (indicazione 22/09/2026) | La Webapp Cittadino non viene modificata e oggi parla SOAP: romperebbe il vincolo di ADR-021 |
| REST nuovo + adapter SOAP davanti | Doppia superficie da mantenere per nessun consumatore REST in V1.0 |

## Open issues

- Nell'AS-IS anche il Back Office `consprefboweb` leggeva i dati da `ConsensoBeService` (dev BE, 21/10/2026); nel TO-BE il BFF usa i REST interni di `rconsprefbe`, quindi SANSOL resta l'unico consumatore noto.
- Conferma CSI che APISAN/SANSOL sia l'unico consumatore esterno di `ConsensoBeService` e che il WSDL di TEST coincida con quello di produzione.
- Canale TO-BE APISAN → `rconsprefbe` (TLS, bilanciatore): INF-05.

## References

- [[wiki/sources/2026-10-21-riscontro-dev-deployment-to-be\|Riscontro dev sul deployment TO-BE]] §Approfondimento
- [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]] — vincolo di compatibilità
- Tracker: INT-06, INT-08 in [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI]]

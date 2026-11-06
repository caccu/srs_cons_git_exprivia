---
{"dg-publish":true,"permalink":"/wiki/docs/adr/adr-027-architettura-senza-api-manager/","title":"Architettura TO-BE senza API Manager — autenticazione per canale","tags":["sicurezza","architettura","api-manager","jwt","mutual-tls","cdu-15","cdu-16","cdu-17"],"dg-note-properties":{"adr":27,"title":"Architettura TO-BE senza API Manager — autenticazione per canale","status":"accepted","date":"2026-11-05","deciders":["CSI Piemonte (Tommaso Ruggiero)","Exprivia (Marco Forneris, team di sviluppo)"],"supersedes":["ADR-004","ADR-005"],"superseded-by":[],"tags":["sicurezza","architettura","api-manager","jwt","mutual-tls","cdu-15","cdu-16","cdu-17"],"related_wiki":["[[2026-10-28-call-csi-analisi-dubbi|Call CSI 28/10/2026]]","[[2026-11-05-call-csi-analisi-dubbi|Call CSI 05/11/2026]]","[[sicurezza-cdu-15-16|Sicurezza CDU-15/16]]","[[alternativa-batch-03-pull|Alternativa BATCH-03 — PULL CDU-17]]","[[sistemi-esterni-integrati|Sistemi Esterni Integrati]]","[[architettura-iaas|Architettura IaaS]]"],"sources":["2026-10-28-call-csi-analisi-dubbi","2026-11-05-call-csi-analisi-dubbi"]}}
---


# ADR-027: Architettura TO-BE senza API Manager — autenticazione per canale

## Status

`accepted`: proposta di Exprivia nella call CSI del 28/10/2026, approvata da CSI nella call del 05/11/2026 (Tommaso Ruggiero: «Nessun API Manager. Mi confermate?» «Sì»). Supersede [[wiki/docs/adr/ADR-004-no-api-gateway\|ADR-004]] (già parzialmente superato dal verbale dell'11/06/2026) e [[wiki/docs/adr/ADR-005-sicurezza-cdu-15-16\|ADR-005]] (OAuth2 tramite API Manager).

## Context

- Dal verbale dell'11/06/2026 i fruitori TO-BE dovevano passare dall'API Manager CSI (APIMBBONE): token OAuth2 `client_credentials`, gateway con rate limiting, codice fiscale ed ente inoltrati in header ([[wiki/docs/adr/ADR-005-sicurezza-cdu-15-16\|ADR-005]], [[wiki/concepts/sicurezza-cdu-15-16\|sicurezza-cdu-15-16]]).
- Nella [[wiki/sources/2026-10-28-call-csi-analisi-dubbi\|call del 28/10/2026]] CSI ha rilevato che oggi non ci sono fruitori esterni. L'unico B2B è con le aziende, via SOAP con certificati.
- Nella stessa call CDU-15, CDU-16 e CDU-17 sono stati considerati servizi interni. L'API Manager servirebbe solo se un'azienda cambiasse un consenso dall'esterno, cosa che non avviene: cambiano solo PUA (operatore) e cittadino.
- Nella [[wiki/sources/2026-11-05-call-csi-analisi-dubbi\|call del 05/11/2026]] CSI ha confermato il disegno: stessi server e stesso database, nessun API Manager.

## Decision

**Nessun API Manager e nessun OAuth2 nel TO-BE V1.0.** Autenticazione per canale:

- **Webapp Operatore:** Angular e BFF (`rconsprefboweb`). Login via IRIDE/Shibboleth, abilitazione LCCE. Tra BFF e backend si usa un JWT interno.
- **Webapp Cittadino:** SANSOL chiama il backend tramite APISAN in basic authentication. I server di backend non sono visibili dall'esterno. Il contratto resta quello di [[wiki/docs/adr/ADR-025-contratto-cittadino-soap-consensobeservice\|ADR-025]], ora in revisione.
- **Aziende e laboratori:** SOAP `ConsprefService` con certificati, come oggi: WS-Security X509 con firma del messaggio e timestamp (specifica v02c e codice, verifica del team di sviluppo del 06/11/2026). ~~mutual TLS~~. Le notifiche SRV-03/SRV-04 sono inviate da BATCH-01.
- **Regole di rete:** a carico di CSI.

Casi d'uso coinvolti:

- **CDU-15 e CDU-16:** i servizi restano nel codice e non sono esposti in V1.0.
- **CDU-17 (proposta Exprivia del 06/11/2026, da confermare con CSI, ST-11):** l'operatore avvia l'allineamento da CDU-14 e da lì gestisce tutto il percorso. Scarica lo snapshot e lo consegna all'azienda. Dopo la conferma dell'azienda, fuori dal sistema, registra la fine dell'allineamento (passo 8). Oggi succede lo stesso con il CSV su richiesta ([[wiki/sources/2019-05-01-specifica-ws-consenso-regionale-aziendale-v02c\|specifica v02c]], cap. 9). I servizi REST per i SIA (download e conferma) restano nel codice ma **non sono esposti in V1.0**, come CDU-15 e CDU-16 (opzioni A+D).
  - ~~Il batch del SIA scarica lo snapshot e conferma la fine in mutual TLS, come per `ConsprefService` (decisione dedotta).~~ Superato: `ConsprefService` non usa il mutual TLS (vedi Conflict sotto).
  - Se CSI chiede che i SIA chiamino direttamente, serve un nuovo ADR. Bisognerà scegliere il meccanismo, dove termina il TLS e come legare il certificato al codice dell'azienda. Stima del team di sviluppo: 3-5 giorni, esclusa la configurazione infrastrutturale di CSI.
- **Servizi sugli endpoint** (inserimento, modifica, eliminazione): usati solo dalla webapp (CDU-14).
- **Manutenzione di un'azienda** (`IN_MANUTENZIONE`, BE-25): proposta Exprivia del 06/11/2026, da confermare con CSI (ST-11). La imposta e la toglie **solo l'operatore** da CDU-14 (BE-25b), su richiesta dell'azienda. Il servizio REST per l'azienda resta nel codice ma non è esposto in V1.0. ~~L'azienda la dichiara in mutual TLS, sullo stesso canale di CDU-17 (decisione dedotta).~~

> ⚠️ **Conflict (06/11/2026):** il [[wiki/sources/2019-05-01-specifica-ws-consenso-regionale-aziendale-v02c\|documento CPROL v02c]] (§2.3 e §10) dice che `ConsprefService` (SRV-01/02) è protetto con **WS-Security X509** (Sign and Encrypt sul messaggio SOAP, un certificato per ogni sistema ASR, associato al sistema nel DB). Il **mutual TLS**, con un solo certificato, lo usa invece CSI per chiamare le ASR (SRV-03/04). Nella [[wiki/sources/2026-10-28-call-csi-analisi-dubbi\|call del 28/10]] CSI ha detto solo «SOAP con certificati». Quindi «mutual TLS come per `ConsprefService`» (aziende, CDU-17, manutenzione) non trova conferma nel documento.
> - **Verifica del team di sviluppo sul codice, legacy e nuovo (06/11/2026):**
>   - `ConsprefService` verifica firma XML e timestamp con un keystore (in produzione `TrustedCAKeyStore.jks`). Non legge nessun certificato client TLS. Il `web.xml` prevede solo BASIC, per `ConsensoBeService`.
>   - **Non esiste un legame tra certificato e azienda**, nemmeno nel legacy: è accettata qualunque firma valida per il keystore. Questo contraddice la specifica §2.3.
>   - Anche le notifiche verso le aziende (SRV-03/04) sono **firmate**, non in mutual TLS come dice la specifica. Nel legacy c'è una configurazione di mutual TLS che il client delle notifiche non usa. Dai sorgenti non si vede se l'infrastruttura imposta un certificato client a livello di JVM.
>   - Nel notificatore legacy, l'alias del certificato di firma di produzione è `cert_test_2024` (nei profili cert/tst `cert_demo20`).
>   - ⚠️ **Sicurezza:** nel nuovo backend i REST di CDU-17 e manutenzione non hanno né certificato né token. Prendono il codice ente dall'header dell'API Manager, che senza API Manager nessuno imposta. Esposti così, chiunque raggiunga la rete potrebbe agire su qualunque ente. Per questo non si espongono in V1.0 (vedi CDU-17 e manutenzione sopra).
> - **Da chiedere a CSI (ST-11):**
>   - in V1.0 i SIA devono chiamare CDU-17 o la manutenzione, o basta l'operatore (proposta A+D)?
>   - in produzione `ConsprefService` chiede anche il certificato client TLS, per esempio su un proxy o sul bilanciatore?
>   - nelle notifiche in uscita il certificato client TLS è impostato a livello di JVM o di server?
>   - `cert_test_2024` è il certificato giusto per la produzione?
>   - il legame tra certificato e azienda manca anche nell'AS-IS: è un rischio accettato o va aggiunto?
> Unresolved.

## Consequences

- Le API si progettano «esponibili in futuro», con uno swagger ridotto. L'apertura a fruitori esterni richiede un nuovo ADR, che sceglierà il meccanismo: API Manager, certificati o altro.
- **Non si fanno:**
  - integrazione con APIMBBONE e sottoscrizioni;
  - token OAuth2;
  - header inoltrati dal gateway;
  - la tabella `cons_t_client_ente`.
- L'isolamento per ente resta solo dove un servizio lo richiede (filtro su `codice_ente`).
- Rate limiting e throttling applicativi (bucket4j, resilience4j) non sono richiesti in V1.0: non ci sono fruitori esterni.
- Da allineare: [[wiki/concepts/sicurezza-cdu-15-16\|sicurezza-cdu-15-16]], [[wiki/analyses/analysis-2026-05-06-openapi-cdu-15-16\|analysis-2026-05-06-openapi-cdu-15-16]], [[wiki/concepts/alternativa-batch-03-pull\|alternativa-batch-03-pull]] §3.6, [[wiki/docs/adr/ADR-006-batch-03-pull-cdu-17\|ADR-006]], [[wiki/docs/adr/ADR-024-cdu-14-destinazione-endpoint\|ADR-024]], tracker dei punti aperti (API-06, BE-25, PULL-09, SEC-01÷06) e SRS (§3.2, §6.15-6.17, §7.4, §8.4.11).

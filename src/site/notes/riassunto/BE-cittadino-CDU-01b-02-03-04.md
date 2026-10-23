---
{"dg-publish":true,"permalink":"/riassunto/be-cittadino-cdu-01b-02-03-04/","dg-note-properties":{}}
---

# Backend area Cittadino — CDU-01b, CDU-02, CDU-03, CDU-04 (e CDU-06 lato cittadino)

**Perimetro:** FE ❌ (la Webapp Cittadino esiste, non si tocca) · BE ✅ da migrare **a iso-funzionalità** — Riferimenti: SRS v10 §4.2 (nota contratto Web App Cittadino), §6.1÷6.4, §6.6; ADR-010, ADR-021 (precisazione 22/09/2026), ADR-022, **ADR-025**; riscontro CSI 25/09/2026; risposte al dev BE del 22/10/2026 (BE-11÷BE-15).

## Cosa significa per lo sviluppo

Il backend è **unico**: serve la Webapp Operatore (nuova) e la Webapp Cittadino (esistente, SANSOL). La Webapp Cittadino non passa dal Back Office: chiama direttamente il backend tramite **APISAN** (prodotto CSI, lato server di SANSOL) sul servizio **SOAP `ConsensoBeService`** (ADR-025, 21/10/2026).

Il contratto da preservare è quindi il **WSDL di `ConsensoBeService`**, esposto da `rconsprefbe` senza modifiche. Non c'è interfaccia da progettare e non c'è una versione REST dei servizi cittadino in V1.0.

Le regole di business coincidono con quelle dei CDU operatore, che le riusano. Cambia solo la tracciatura (`fonte_id` cittadino, `login_operazione` = CF dell'utente autenticato, `cf_delegato` se in delega).

## Il contratto `ConsensoBeService`

- WSDL di TEST: **10 operazioni**. Un'undicesima, `inserisciInformativa`, è commentata anche nel legacy.
- Dall'audit del legacy (`csi_log_audit`, dati di TEST, ~41.000 chiamate `id_app = SANSOL` dal 2019) SANSOL ne usa **9**: consulta consenso, informativa, codifiche, notifiche, inserisci, modifica. Non usa `consultaProfilo`, chiamata solo dal Back Office AS-IS (BE-12).
- Si espone comunque il WSDL completo: è il riferimento di non regressione per design e collaudo.
- `ConsprefService` (SOAP, aziende federate e LIS) è un servizio distinto, anch'esso mantenuto (DEV-03).

## I quattro CDU in breve

| CDU | Cosa fa lato cittadino | Equivalente operatore | Logica BE |
|---|---|---|---|
| **01b** Accesso | SPID/CIE tramite GASP Salute, che si chiude su SANSOL/APISAN. Il cittadino può operare per sé o per un delegante | CDU-01a | Nessuna integrazione GASP, Shibboleth o SAML nel backend: solo **basic authentication** del servizio. Nella richiesta SOAP arrivano il codice del chiamante (SANSOL), il CF dell'utente autenticato e i CF di cittadino ed eventuale delegato. Il CF è verificato su AURA |
| **02** Consultazione | Cruscotto dei propri consensi | CDU-08 | Stesso dominio del cruscotto operatore. Il BE restituisce quello che restituisce il legacy (lista piatta): il raggruppamento è del FE cittadino (BE-15) |
| **03** Rilascio | Nuovo consenso con presa visione dell'informativa. Se `online = false` non è esprimibile online | CDU-09 | ALG01/ALG02 identici a CDU-09, con la fonte del canale cittadino. Avviso al cittadino dopo `COMPLETATO`: vedi INT-10 |
| **04** Modifica | Cambio valore e riespressione dopo SCADUTO/ANNULLATO | CDU-10 + CDU-11 | Operazioni di modifica di `ConsensoBeService` sull'algoritmo canonico di storicizzazione. Il comportamento dei pulsanti è della Webapp Cittadino, fuori perimetro |
| **06** Scarico informativa | Informativa del consenso | CDU-06 (operatore) | Stesso servizio di dominio; lato cittadino passa da `ConsensoBeService` |

## Vincoli da rispettare

- **Contratto invariato** verso la Webapp Cittadino, errori compresi: la classificazione 502/409/503 (DEV-04) non si applica a questi servizi.
- **Deleghe fuori perimetro**: il BE non chiama Gestione Deleghe e non verifica la delega (verificata a monte). Riceve il CF del delegato nella richiesta SOAP e lo registra in `cons_t_consenso.cf_delegato` (DEV-02, BE-13). Il nome del campo è quello del WSDL.
- Flag `verificaAura` di `consultaConsensoBe`: il legacy non lo legge mai e verifica **sempre** su AURA. Il nuovo servizio mantiene il campo e lo stesso comportamento (BE-14).
- Stesse regole di blocco dei CDU operatore (endpoint `IN_CORSO` o `IN_MANUTENZIONE`) e stessa scrittura della coda notifiche.
- Il motore di storicizzazione, la coda notifiche e i dati del form (`valori_ammessi`, parametri) sono **gli stessi** dei CDU operatore: nessuna duplicazione di logica.

## Come svilupparlo

1. Esporre `ConsensoBeService` da `rconsprefbe` con lo stesso WSDL (stack JAX-WS/CXF lato server).
2. Implementare le operazioni delegando ai service di dominio comuni (consultazione, storicizzazione, informativa).
3. Configurare la basic authentication del servizio come nell'AS-IS.
4. Test di non regressione sul WSDL di TEST e sulle operazioni rilevate nell'audit.

## Punti aperti

- Conferma CSI che APISAN/SANSOL sia l'unico consumatore esterno di `ConsensoBeService` e che il WSDL di TEST coincida con quello di produzione (INT-06/INT-08).
- Canale TO-BE APISAN → `rconsprefbe`: oggi HTTP:80 senza bilanciatore, da ridefinire con CSI per TLS e bilanciamento (INF-05).
- Avviso al cittadino dopo `COMPLETATO`: Notificatore di Deleghe = `notify-mb`? (INT-10).
- Valore AS-IS di `fonte_id` per il canale cittadino.

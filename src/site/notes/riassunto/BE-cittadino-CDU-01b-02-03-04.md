---
{"dg-publish":true,"permalink":"/riassunto/be-cittadino-cdu-01b-02-03-04/","dg-note-properties":{}}
---

# Backend area Cittadino — CDU-01b, CDU-02, CDU-03, CDU-04 (e CDU-06 lato cittadino)

**Perimetro:** FE ❌ (la Webapp Cittadino esiste, non si tocca) · BE ✅ da migrare **a iso-funzionalità** — Riferimenti: SRS v10 §6.1÷6.4, §6.6; ADR-010, ADR-011 (superseded), ADR-021 (precisazione 22/09/2026), ADR-022; riscontro CSI 25/09/2026.

## Cosa significa per lo sviluppo

Il backend è **unico**: serve la Webapp Operatore (nuova) e la Webapp Cittadino (esistente). I servizi che la Webapp Cittadino chiama oggi vanno riscritti sul nuovo stack **senza cambiarne il contratto** (path, metodi, formati, codici di risposta). Non c'è interfaccia da progettare. C'è da non rompere niente.

Le regole di business coincidono con quelle dei CDU operatore, che le riusano. Cambia solo la tracciatura (`fonte_id` cittadino, `login_operazione` = CF cittadino, `cf_delegato` se in delega).

## I quattro CDU in breve

| CDU | Cosa fa lato cittadino | Equivalente operatore | Logica BE |
|---|---|---|---|
| **01b** Accesso | Cittadino autenticato via SPID/CIE tramite **GASP Salute** (SAML2, Shibboleth SP in reverse proxy che passa l'identità al BE in header). Può operare per sé o per un delegante | CDU-01a | Il BE consuma l'identità propagata dallo SP e ne verifica integrità e presenza (modalità da concordare con CSI). **Deleghe fuori perimetro**: il BE non chiama Gestione Deleghe, riceve in input il CF del delegato (`cf_delegato`) e lo registra |
| **02** Consultazione | Cruscotto dei propri consensi (card per consenso: nome, ente, stato, data) | CDU-08 | Stessa query del cruscotto operatore, filtrata sul CF del profilo selezionato |
| **03** Rilascio | Nuovo consenso con presa visione dell'informativa. Se `online = false` non è esprimibile online: il cittadino deve andare a uno sportello | CDU-09 | ALG01/ALG02 identici a CDU-09, con `fonte_id = CITT`. Notifica cittadino/delegato via Notificatore di Deleghe dopo COMPLETATO |
| **04** Modifica | Pulsante unico **"Salva"**: gestisce sia il cambio valore (ATTIVO/NEGATO, senza riaccettazione) sia la riespressione (SCADUTO/ANNULLATO, con nuova informativa) | CDU-10 + CDU-11 | Algoritmo canonico di storicizzazione. Il BE distingue internamente rilascio, modifica e cambio valore |
| **06** Scarico informativa | Download del PDF dell'informativa | CDU-06 (operatore) | Stesso servizio BE, autorizzazione con identità cittadino |

## Vincoli da rispettare

- **Contratto invariato** verso la Webapp Cittadino. Errori compresi: la nuova classificazione 502/409/503 (DEV-04) non va applicata a questi servizi se cambia il contratto.
- **GASP Salute**: nessuna nuova progettazione, ma l'autenticazione del cittadino contro il nuovo BE deve continuare a funzionare. Metadata SP di test già ricevuti (host `tst-consprefbo-spid.isan.csi.it`). Restano da definire gli header/attributi propagati.
- Stesse regole di blocco (allineamento `IN_CORSO`, manutenzione ASR) e stessa scrittura della coda notifiche.
- Il motore di storicizzazione, la coda notifiche e il Form Renderer lato dati (`valori_ammessi`, parametri) sono **gli stessi** dei CDU operatore: nessuna duplicazione di logica.

## Come svilupparlo

1. **Bloccante**: ottenere da CSI l'**elenco delle interfacce** che la Webapp Cittadino invoca oggi sul backend (path, metodo, protocollo, formato richiesta/risposta). Il sorgente della Webapp Cittadino non è nella consegna AS-IS, quindi senza questo elenco l'iso-funzionalità non è verificabile.
2. Realizzare un **layer di adattamento** (controller dedicati) che espone quei contratti e delega ai service di dominio comuni (storicizzazione, consultazione, scarico PDF).
3. Implementare la verifica dell'identità propagata dallo Shibboleth SP e la gestione di `cf_delegato` in input.
4. Test di non regressione contrattuale (es. contract test o confronto delle risposte AS-IS/TO-BE in pre-produzione).

## Punti aperti

- Elenco interfacce Webapp Cittadino (richiesto a CSI).
- Header/attributi propagati dallo SP e meccanismo di fiducia.
- Nome del campo e servizio che riceve `cf_delegato` (residuo DEV-02).
- Valore AS-IS di `fonte_id` per il canale cittadino.

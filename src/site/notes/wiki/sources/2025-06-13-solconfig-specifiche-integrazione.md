---
{"dg-publish":true,"permalink":"/wiki/sources/2025-06-13-solconfig-specifiche-integrazione/","title":"SOLCONFIG — Specifiche di integrazione del Configuratore (SDI-01 V07)","tags":["configuratore","solconfig","pua","lcce","shibboleth","profili","gettokeninformation2","csi-piemonte"],"dg-note-properties":{"title":"SOLCONFIG — Specifiche di integrazione del Configuratore (SDI-01 V07)","aliases":["SOLCONFIG — Specifiche di integrazione del Configuratore (SDI-01 V07)"],"type":"source","tags":["configuratore","solconfig","pua","lcce","shibboleth","profili","gettokeninformation2","csi-piemonte"],"created":"2026-11-18","updated":"2026-11-18","sources":["2025-06-13-solconfig-specifiche-integrazione"],"related":["[[sistemi-esterni-integrati|Sistemi Esterni Integrati]]","[[wiki/docs/adr/ADR-027-architettura-senza-api-manager\|ADR-027]]","[[analysis-2026-05-14-punti-aperti-csi|Punti Aperti CSI]]","[[wiki/entities/csi-piemonte\|CSI Piemonte]]"]}}
---


# SOLCONFIG — Specifiche di integrazione del Configuratore (SDI-01 V07)

**File:** cartella `raw/Solconfig - Specifiche di integrazione/`, ricevuta da [[wiki/entities/csi-piemonte\|CSI Piemonte]] il 18/11/2026:
- `SOLCONFIG--SDI-01-V07-Specifiche di integrazione.pdf` (CSI, V07 del 13/06/2025);
- `SOLCONFIG-TD-01-V01-consensi.xlsx`: registrazione attuale di CONSPREF sul Configuratore;
- `TemplateRichiestaIntegrazioneConConfiguratore_v02.xlsx`: modulo per chiedere l'integrazione o un nuovo profilo;
- `LG_APIMBBONE-APIStore_Sottoscrizione_V2.0.4.pdf`: sottoscrizione all'API Manager, che serve solo agli applicativi esterni al CSI.

## Flusso di accesso dell'operatore

1. L'operatore entra dal PUA, protetto da Shibboleth (community Rupar Piemonte/WRUP o SPID/GASPRP_SALUTE). Il PUA legge le sue configurazioni dal Configuratore e gli fa scegliere ruolo, collocazione e applicazione.
2. Il PUA chiede al Configuratore un token e reindirizza alla URL dell'applicazione con il parametro `token` (HTTP GET).
3. L'applicazione, protetta da Shibboleth, verifica il token con il REST `/login/token-information2` o con il SOAP `getTokenInformation2` (`TokenInformationService`). Il token è valido per un tempo limitato e si usa una sola volta.
4. La risposta contiene nome, cognome, codice fiscale, ruolo, collocazione con `codiceAzienda`, e le funzionalità abilitate con il profilo (`codiceFunzionalitaPadre`). L'applicazione deve verificare che il CF coincida con quello dell'header Shibboleth.

## Dettagli tecnici

- Integrazione server-to-server, con le credenziali nella configurazione dell'applicazione. Basic auth; HTTP nel perimetro CSI, HTTPS da rete RUPAR.
- Per gli applicativi esterni al CSI lo stesso servizio è esposto tramite API Manager. CONSPREF è interno, quindi non lo usa ([[wiki/docs/adr/ADR-027-architettura-senza-api-manager\|ADR-027]]).
- SOAP, richiesta: `token`, `applicazione` (codice dell'applicazione), `ipBrowser` (IP del browser dell'operatore). Risposta: `esito` SUCCESSO o FALLIMENTO, `richiedente`, `funzionalitaAbilitate`, `parametriLogin`.
- Errori: `AUTH_ER_601` token non valido o scaduto; `AUTH_ER_602` IP diverso da quello del login; `AUTH_ER_606` applicazione diversa; `AUTH_ER_609` applicazione non abilitata alla base dati LoginCCE; `AUTH_ER_603`÷`605` parametro mancante.
- REST: header `Shib-Identita-CodiceFiscale`, `X-Request-Id`, `X-Forwarded-For`, `X-Codice-Servizio`, `Token`; errori 400, 401, 404, 500, 502 con JSON di dettaglio.
- Collaudo: CSI fornisce indirizzi, credenziali e utenti di prova; il fruitore produce un piano di test (PDT) con data, richiesta, risposta e schermata della prima pagina.

## Registrazione attuale di CONSPREF (SOLCONFIG-TD-01-V01)

- Applicativo `CONSPREF` «Gestione consensi e preferenze»; capo progetto Marco Frassinesi, analista Sabina Caroni.
- URL di produzione `https://consprefbo-pa.isan.csi.it/consprefboweb/`, di test `https://tst-consprefbo-pua.isan.csi.it/consprefboweb`; bottone sul PUA; tutte le aziende.
- Un solo profilo: `CONSPREF_WA` «Profilo Consensi», funzionalità `CONSPREF_FUNZ` «Inserisce e modifica consenso permanente al ROL». Dati anagrafici in lettura; dati amministrativi e di consenso in lettura e scrittura.
- Ruoli: Operatore Amministrativo e Operatore CSI.
- Nel foglio delle funzionalità il codice è `CONSPREF_WA`, nel foglio dei profili `CONSPREF_FUNZ`: incongruenza da allineare nella nuova richiesta.

## Impatto sul progetto

- LCCE = Configuratore: confermato (INT-09).
- Il profilo arriva in `funzionalitaAbilitate` (ST-16); il profilo di configurazione va chiesto con il template v02 (ID-02).
- `codiceAzienda` è sempre valorizzato (ST-15, chiuso).
- Da recepire: `ipBrowser` dal BFF al backend e confronto obbligatorio del CF.
- Diagramma aggiornato: `CONSPREF-deployment-TO-BE.html` (18/11/2026).

---
{"dg-publish":true,"permalink":"/wiki/sources/2026-10-21-riscontro-dev-deployment-to-be/","title":"Riscontro dev sul deployment TO-BE","tags":["to-be","deployment","team-sviluppo","bff","apisan","angular","notificatore"],"dg-note-properties":{"title":"Riscontro dev sul deployment TO-BE","aliases":["Riscontro dev sul deployment TO-BE"],"type":"source","tags":["to-be","deployment","team-sviluppo","bff","apisan","angular","notificatore"],"created":"2026-10-21","updated":"2026-10-21","sources":["2026-10-21-riscontro-dev-deployment-to-be"],"related":["[[2026-10-21-deployment-diagram-as-is-csi|Deployment diagram AS-IS CONSPREF (CSI)]]","[[architettura-iaas|Architettura IaaS]]","[[sistemi-esterni-integrati|Sistemi Esterni Integrati]]","[[ADR-001-stack-tecnologico|ADR-001]]","[[wiki/docs/adr/ADR-012-notificatore-deleghe-post-completato\|ADR-012]]"]}}
---


# Riscontro dev sul deployment TO-BE

**Fonte:** messaggio del team di sviluppo Exprivia del 21/10/2026, in risposta al diagramma `CONSPREF-deployment-TO-BE.html` (root del progetto, sorgente `CONSPREF-deployment-TO-BE.architecture.json`). Confronto con il codice.

---

## Correzioni indicate

| # | Correzione | Esito in wiki |
|---|---|---|
| 1 | Due applicazioni backend: BFF del Back Office `rconsprefboweb` (riceve il FE, autentica l'operatore con PUA/IRIDE) e backend `rconsprefbe`, chiamato dal BFF con REST interni. Due nodi nel deploy | Recepito nel diagramma. Coerente con l'AS-IS (`consprefboweb` / `consprefbe`, [[wiki/sources/2026-10-21-deployment-diagram-as-is-csi\|deployment CSI]]) |
| 2 | La Webapp Cittadino passa oggi da **APISAN** (prodotto CSI, lato server di SANSOL) e usa il **SOAP `ConsensoBeService`**, non REST. Nel TO-BE va ripristinato con lo stesso contratto | Recepito come riscontro parziale di INT-08. ⚠️ In conflitto con la [[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|ricognizione del 22/09/2026]]: serve l'evidenza nel sorgente |
| 3 | Manca la freccia batch → SIA ASR: BATCH-01 notifica le aziende in SOAP | Recepito |
| 4 | I batch girano dentro `rconsprefbe`, non in un nodo separato | Recepito. Con più nodi, BATCH-01 è protetto da `SKIP LOCKED` ([[wiki/docs/adr/ADR-007-batch-01-5min-skip-locked\|ADR-007]]); per BATCH-02 va garantita l'esecuzione su un solo nodo |
| 5 | PUA/LCCE si collega al BFF, non al backend | Recepito. Coerente con l'AS-IS e con INT-09 |
| 6 | Il FE è su **Angular 21** | Recepito in [[wiki/docs/adr/ADR-001-stack-tecnologico\|ADR-001]], [[wiki/concepts/stack-tecnologico-applicativo\|Stack Tecnologico]] e SRS rev. 1.13. Migrazione confermata dagli sviluppatori |
| 7 | Uscite **SMTP** e **webhook** verso i SIA (CDU-14). Del Notificatore oggi c'è solo **UNP** | SMTP/webhook recepiti (SRS §6.14 passo 6, [[wiki/docs/adr/ADR-024-cdu-14-destinazione-endpoint\|ADR-024]]). «Solo UNP» ⚠️ in conflitto con CSI 06/08/2026 → INT-10 |

---

## Approfondimento (risposta del dev BE, 21/10/2026)

Richiesta di evidenze sui punti 2 e 7.

**Punto 2 — `ConsensoBeService`.** La ricognizione del 22/09 copriva le API REST del Back Office (`consprefboweb`). SANSOL non passa dal Back Office: chiama direttamente `consprefbe`. Fonti:
1. lo schema AS-IS di CSI: APISAN chiama `consprefbe-web` ([[wiki/sources/2026-10-21-deployment-diagram-as-is-csi\|deployment diagram]]);
2. il codice di `consprefbe`: `consprefbe-web` espone solo due servizi SOAP, `ConsprefService` e `ConsensoBeService`, nessuna risorsa REST;
3. l'audit del legacy (`csi_log_audit`, dati di TEST): circa 41.000 chiamate con `id_app = SANSOL` dal 2019 a luglio 2026, sulle operazioni di `ConsensoBeService` (consulta consenso, informativa, codifiche, notifiche, inserisci e modifica);
4. il WSDL di `ConsensoBeService` su TEST, 10 operazioni.

Esito: il contratto cittadino da preservare è SOAP. Conflict con la ricognizione risolto (perimetro diverso). Decisione in [[wiki/docs/adr/ADR-025-contratto-cittadino-soap-consensobeservice\|ADR-025]].

**Punto 7 — Notificatore.** «Solo UNP» si riferiva al **codice nuovo**: oggi c'è solo il client UNP di BATCH-02; l'avviso al cittadino dopo l'acquisizione non è ancora sviluppato. Nel **legacy** c'è un solo notificatore, `notify.csi.it/notify-mb`, chiamato «Notificatore Regionale», con documentazione UNP. Lo usa `consprefnotifica` per confermare al cittadino l'invio alle aziende. Non esiste un client separato per un «Notificatore di Deleghe». Il conflict con [[wiki/docs/adr/ADR-012-notificatore-deleghe-post-completato\|ADR-012]] resta, riformulato: il Notificatore di Deleghe è lo stesso `notify-mb` o un servizio diverso? (INT-10, da chiedere a CSI).

**AURA e accesso al DB del BFF** (seconda risposta, 21/10/2026):
- **AURA:** nel TO-BE la chiama solo `rconsprefbe`. Il BFF non ha un client AURA: per la ricerca dell'assistito chiama il backend. Nell'AS-IS invece `consprefboweb` aveva un suo client AURA.
- **DB:** `rconsprefboweb` non accede al DB, parla solo con `rconsprefbe` via REST interni. Anche nell'AS-IS il codice di `consprefboweb` non ha accessi diretti al DB: c'è solo una stringa JDBC nei file di configurazione di dev e collaudo (non in produzione), con ogni probabilità un residuo. I dati passavano da `consprefbe` tramite `ConsensoBeService`.
- Conseguenza: nell'AS-IS `ConsensoBeService` aveva due consumatori, SANSOL (via APISAN) e il Back Office `consprefboweb`. Nel TO-BE il Back Office passa ai REST interni del BFF, quindi SANSOL resta l'unico consumatore noto ([[wiki/docs/adr/ADR-025-contratto-cittadino-soap-consensobeservice\|ADR-025]]).
- Il [[wiki/sources/2026-10-21-deployment-diagram-as-is-csi\|deployment AS-IS di CSI]] disegna un accesso JDBC anche da `consprefboweb`: dal codice non risulta.

---

## Aperti

- **INT-08 / INT-06:** solo conferma CSI (unico consumatore `ConsensoBeService`, WSDL TEST = PROD). Vedi [[wiki/docs/adr/ADR-025-contratto-cittadino-soap-consensobeservice\|ADR-025]].
- **INT-10:** il Notificatore di Deleghe di ADR-012 coincide con `notify.csi.it/notify-mb` («Notificatore Regionale», documentazione UNP)?
- ~~**BATCH-02 su più nodi:** meccanismo di esecuzione singola (lock o nodo designato).~~ ✅ **Chiuso 21/10/2026:** entrambi i nodi eseguono i batch, coordinati con `SKIP LOCKED`, battito per lotto e ripresa dopo 120 minuti. Vedi [[wiki/concepts/batch-processes\|Processi Batch]] §Esecuzione su più nodi.
- Il SOAP in ingresso `ConsprefService` per le ASR federate (DEV-03) non è disegnato nel diagramma TO-BE.

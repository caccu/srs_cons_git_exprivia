---
{"dg-publish":true,"permalink":"/riassunto/cdu-14-gestione-ente-endpoint/","dg-note-properties":{}}
---

# CDU-14 — Gestione enti ed endpoint (Back Office + API per le aziende)

**Perimetro:** FE ✅ · BE ✅ — Riferimenti: SRS v10 §6.14, §6.17, §7.4, §8.3.7, §8.3.8, §8.3.10, §8.3.23, §8.4.3, §8.4.6, §8.4.7; ADR-006; ADR-027. ⛔ Snapshot (CDU-17) e manutenzione (§7.4) fuori dal flusso di sviluppo V1.0 (risposte CSI del 27/11/2026, ST-11 chiuso).

## Cosa fa

Gestisce l'anagrafica degli **enti** (ASR, enti nazionali e regionali) e dei loro **endpoint**, cioè gli URL dei SIA a cui il sistema notifica le variazioni dei consensi. Per ogni endpoint si indica per quali sotto-tipi di consenso è attivo.

Quando si aggiunge un nuovo endpoint, il nuovo SIA va **allineato** con i consensi esistenti. Il sistema non fa push massivi. In **V1.0** l'allineamento non si sviluppa: il pregresso lo migra l'ASR fuori linea, come oggi, e CSI fa un export della base dati se l'azienda non può recuperarlo (risposte CSI del 27/11/2026, [CDU-17](CDU-17-snapshot-pull.md)).

**Esposizione** (ADR-027, niente API Manager):
- le operazioni su enti ed endpoint (inserimento, modifica, eliminazione) si fanno **solo dalla webapp Operatore**;
- le **aziende** in V1.0 non chiamano nessun servizio: allineamento (CDU-17) e manutenzione (§7.4) sono fuori dal flusso di sviluppo V1.0 (27/11). I due `PATCH` per le aziende restano nel codice ma non sono esposti.

## Precondizioni

Operatore di configurazione autenticato (webapp, sessione PUA; tra BFF e backend chiave condivisa). In V1.0 nessun limite per azienda: vede tutti gli enti. L'accesso è negato se i requisiti di accesso non corrispondono ai profili dedicati a CONSPREF provenienti dal Configuratore (24/11/2026; codici dei profili da CSI, ID-02, ST-16). In V1.0 nessuna chiamata dai SIA.

## Flusso (webapp)

1. "Configurazione" → "Gestione Enti ed Endpoint" → elenco enti.
2. Nuovo ente o modifica di uno esistente.
3. Per l'ente, uno o più endpoint: URL, sotto-tipi associati, destinazione, validità.
4. Salvataggio in `cons_d_asr`, `cons_t_endpoint`, `cons_r_asr_endpoint`, `cons_r_sotto_tipo_cons_asr_endpoint`.
5. ~~La creazione di un endpoint imposta `stato_allineamento = DA_ALLINEARE`. La modifica non cambia lo stato (scelta esplicita: un endpoint COMPLETATO che cambia URL o destinazione resta COMPLETATO, riallineamento manuale se serve).~~ fuori V1.0 (27/11).
6. Nuovo endpoint: avviso all'azienda **solo via email** in V1.0 (parametro = `EMAIL`, proposta). Il webhook richiede che il SIA esponga un REST, quindi lavoro per le ASR: non si usa in V1.0.
7. ~~Endpoint `DA_ALLINEARE`: pulsante «Scarica snapshot» (CDU-17). Il sistema restituisce il CSV e segna l'endpoint `COMPLETATO`.~~ fuori V1.0 (27/11).
8. ~~Endpoint attivo: pulsante «Manutenzione» (`IN_MANUTENZIONE` / `ATTIVO`, §7.4), su richiesta dell'azienda.~~ fuori V1.0 (27/11).

## Campi

**Ente**

| Campo | Obbl. | Validazione |
|---|---|---|
| cod_asr | sì | max 10, univoco ("Codice ente già esistente") |
| desc_asr | sì | max 255 |
| tipo_ente | sì | NAZIONALE / REGIONALE / AZIENDALE (**colonna nuova**) |
| data_creazione | display | |
| data_cancellazione | no | cancellazione logica |

**Endpoint**

| Campo | Obbl. | Validazione |
|---|---|---|
| endp_url | sì | URL https valido ("URL non valido") |
| cod_asr | sì | FK `cons_d_asr` |
| sotto_tipo_consenso | sì | multi, FK `cons_d_sotto_tipo_cons` |
| destinazione_id | no | FK `cons_d_asr_destinazione`: `NOTIFICA_CONSENSO` (default, anche se vuoto) o `WEBHOOK_ALLINEAMENTO` (ADR-024) |
| valida_inizio | sì | < valida_fine |
| valida_fine | no | > valida_inizio; fine esclusiva (fine al 30/10 = valido fino al 29/10) |
| stato_allineamento | display | ~~DA_ALLINEARE / IN_CORSO / COMPLETATO / ERRORE (sola lettura)~~ non in V1.0 (27/11) |

## Logica di backend

- Salvataggio ente: INSERT/UPDATE `cons_d_asr` (+ audit).
- Salvataggio endpoint (transazione unica):
  1. INSERT/UPDATE `cons_t_endpoint` (`endp_url`, validità);
  2. INSERT `cons_r_asr_endpoint` (`cod_asr`, `endp_id`, validità, ~~`stato_allineamento = 'DA_ALLINEARE'`~~ (non in V1.0));
  3. per ogni sotto-tipo: INSERT `cons_r_sotto_tipo_cons_asr_endpoint`;
  4. alla creazione di un endpoint `NOTIFICA_CONSENSO`, o quando un endpoint di quel tipo già esistente viene associato a un ente (caso CDU-17; non in modifica): avviso out-of-band «nuovo endpoint da allineare» in base al parametro di canale, tracciato in `cons_t_traccia_serv_est` (dettaglio sotto).
- Eliminazione: logica (`valida_fine` / `data_cancellazione`), non fisica. Gli endpoint dismessi escludono l'azienda dagli elenchi. Regola provvisoria: azienda visibile con almeno un endpoint attivo (BE-16); DEV-01 da confermare con CSI.
- Destinazione (ADR-024): solo gli endpoint `NOTIFICA_CONSENSO` (o senza destinazione) ricevono le notifiche e partecipano all'allineamento. L'URL del webhook out-of-band è un endpoint `WEBHOOK_ALLINEAMENTO` dell'ente, senza `stato_allineamento`; se manca, il webhook non parte e l'errore va in `cons_t_traccia_serv_est`.
- Avviso «nuovo endpoint da allineare», comportamento del codice (riscontro del dev BE, 12/11/2026):
  - e-mail: va all'indirizzo del campo facoltativo `notifica_email` dell'endpoint. Mittente `noreply@consensi.piemonte.it` (provvisorio: va in configurazione; server SMTP e mittente di produzione in carico a CSI, BE-24), oggetto «CONSPREF - Nuovo endpoint da allineare (endp_id N)». L'esito (accettata dal server SMTP o errore) va in `cons_t_traccia_serv_est`;
  - webhook: parte solo se l'ente ha anche un endpoint `WEBHOOK_ALLINEAMENTO`;
  - con il vecchio predefinito `ENTRAMBI`: senza indirizzo non partiva nulla e non si tracciava nulla; senza endpoint webhook si tracciava ogni volta l'errore «webhook assente»;
  - con `EMAIL` (V1.0): il webhook non parte in nessun caso e l'errore «webhook assente» sparisce; senza indirizzo l'avviso non parte e si traccia l'errore «e-mail assente»;
  - l'endpoint `WEBHOOK_ALLINEAMENTO` di prova sul DEV non va portato negli ambienti successivi.
- Disattivazione ente (requisito CSI V03, SRS rev. 1.12 §6.14): la fine validità si propaga a `cons_r_asr_endpoint`, `cons_r_sotto_tipo_cons_asr_endpoint` e `cons_r_informativa_asr`; l'eliminazione di un endpoint chiude anche i suoi legami. Blocchi su modifica/disattivazione: da chiedere a CSI (DEV-12).
- Effetti su altri CDU: ~~CDU-09/10/11 non generano notifiche verso endpoint `IN_CORSO` e bloccano l'acquisizione per i sotto-tipi associati all'endpoint finché l'allineamento è in corso.~~ (nessun blocco di allineamento in V1.0, 27/11). BATCH-01 legge l'URL di destinazione.

## Servizi per allineamento e manutenzione (⛔ fuori V1.0 dal 27/11)

> ⛔ Fuori dal flusso di sviluppo V1.0 (risposte CSI del 27/11/2026); le rotte sotto restano come storia.

- `GET /internal/v1/backoffice/endpoint/{endpId}/snapshot` → un solo CSV con tutti i consensi associati all'endpoint (CDU-17; ammesso da `DA_ALLINEARE` e `ERRORE`; stesso schema delle altre rotte di CDU-14, da fare).
- `PATCH /internal/v1/backoffice/endpoint/{endpId}/stato` (manutenzione, §7.4; su dev dal 12/11/2026).
- Le rotte per le aziende (`/api/v1/endpoints/...`) restano nel codice, non esposte, per un eventuale uso futuro dei SIA.
- `PATCH .../stato-allineamento` non serve in V1.0: COMPLETATO lo imposta lo scaricamento.
- ⚠️ Il BFF passa al backend, con la chiave condivisa, solo il CF dell'operatore **dopo il login** (al login passa anche token e `ipBrowser` per LCCE, INT-09). L'ente è quello dell'endpoint scelto dall'operatore. Per l'operatore non c'è filtro sull'ente, perché lavora su tutte le aziende. Il filtro su `codice_ente` resta solo sulle rotte delle aziende (`/api/v1`), non esposte. Gli `X-APIM-*` non si scartano: senza la chiave condivisa la richiesta è rifiutata tutta con 401; con la chiave vengono letti come arrivano, quindi la chiave resta solo al BFF (rischio ST-14). Il CRUD degli endpoint resta solo nella webapp. Vanno descritti nell'OpenAPI (PULL-09).
- Scenario futuro, con i due `PATCH` chiamati dal SIA: richiede sviluppo da parte delle ASR, non previsto.

## Come svilupparlo

**Backend**
- Service di dominio unico per enti/endpoint. In V1.0 un solo controller: webapp tramite BFF (sessione PUA, chiave condivisa). Il controller per le aziende resta nel codice, non esposto.
- Parametro di configurazione del backend per il canale di notifica (EMAIL | WEBHOOK | ENTRAMBI), unico per tutti e non scelto dall'operatore: nel codice il predefinito era `ENTRAMBI`, in V1.0 passa a `EMAIL` (confermato al dev BE il 12/11/2026). Anche il mittente dell'e-mail sta in configurazione.
- Migrazione: colonne `tipo_ente`, `stato_allineamento`, `cons_t_endpoint.destinazione_id`; tabella `cons_d_asr_destinazione` con seed (`NOTIFICA_CONSENSO`, `WEBHOOK_ALLINEAMENTO`); endpoint AS-IS valorizzati a `NOTIFICA_CONSENSO`. Le associazioni degli endpoint del vecchio sistema (`cons_r_asr_endpoint` e `cons_r_sotto_tipo_cons_asr_endpoint`) le crea lo script di migrazione:
  - `stato_allineamento = COMPLETATO`, perché ricevevano già tutti i consensi e senza COMPLETATO BATCH-01 non li notificherebbe;
  - solo CPROL (TELEMED dopo DEV-08);
  - utente di creazione `MIGRAZIONE_ENDP_LEGACY`;
  - corrispondenza endpoint → azienda presa dal DB di ogni ambiente;
  - gli endpoint cancellati si saltano.
  (Script del dev BE, provato su DEV il 12/11/2026.)

**Frontend**
- Lista enti → dettaglio ente con elenco endpoint; form ente; form endpoint con multi-select dei sotto-tipi; badge `stato_allineamento` in sola lettura.
- ~~Pulsanti «Scarica snapshot» (solo endpoint `DA_ALLINEARE`) e «Manutenzione» (inizio e fine).~~ Fuori V1.0 (27/11).

## Dipendenze

CDU-12 (sotto-tipi); CDU-17 e §7.4 consumano lo stato; BATCH-01 consuma gli URL.

## Punti aperti

- Webhook verso i SIA: solo scenario futuro (richiede sviluppo da parte delle ASR). In V1.0 solo email, all'indirizzo `notifica_email` dell'endpoint (facoltativo come da SRS rev. 1.26; destinatario confermato da CSI il 23/11/2026; CSI annuncia una modifica della tabella dei contatti per endpoint, ST-19). L'URL del webhook resta configurabile come endpoint `WEBHOOK_ALLINEAMENTO` (ADR-024).
- ~~Blocchi su modifica/disattivazione di ente ed endpoint (DEV-12).~~ Chiuso il 23/11/2026: nessun blocco (risposta CSI).
- ~~Destinatari della notifica "endpoint aggiunto" quando l'azienda non ha ancora altri endpoint.~~ Chiuso il 23/11/2026: `notifica_email` del nuovo endpoint, confermato da CSI. ST-19 (27/11): la struttura della tabella dei contatti per endpoint è a carico di Exprivia, il resto a carico di CSI.
- Formalizzazione di `IN_MANUTENZIONE`: SRS rev. 1.18 (§7.4) lo separa da `stato_allineamento`, con orientamento a colonna di stato dedicata; il dettaglio resta alla progettazione. ⏸ Manutenzione fuori V1.0 dal 27/11.
- **A-01** ✅ Fatto dal 12/11 (dev BE, 24/11/2026): dell'ente si modificano descrizione e data di fine. API di aggiornamento ente (§6.14 passo 3) assente dall'OpenAPI 0.2-DRAFT. Campi modificabili recepiti in SRS rev. 1.27 dal requisito CSI V03: descrizione ente, data fine validità, eliminazione endpoint; codice, tipo ente e data creazione in sola lettura. Resta al BE la definizione dell'API. Il mockup rev. 12 (pag. 31) lascia modificabile il tipo ente (N-09): deciso il 29/10/2026 che resta in sola lettura, il FE allinea la schermata.
- **A-02** E-mail di avviso dell'endpoint: recepita in SRS rev. 1.26 (campo facoltativo `notifica_email` nella maschera Endpoint e in `cons_t_endpoint`). ✅ Dal 12/11 l'e-mail dell'endpoint si può cancellare (dev BE, 24/11/2026). Destinatari dell'avviso: confermati da CSI il 23/11/2026 (ST-19 sulla tabella dei contatti).

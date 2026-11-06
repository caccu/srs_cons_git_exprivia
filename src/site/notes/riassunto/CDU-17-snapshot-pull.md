---
{"dg-publish":true,"permalink":"/riassunto/cdu-17-snapshot-pull/","dg-note-properties":{}}
---

# CDU-17 — Snapshot consensi per allineamento endpoint (PULL)

**Perimetro:** solo BE ✅ (+ visualizzazione dello stato nella webapp, CDU-14) — Riferimenti: SRS v10 §6.17, §7.3, §8.4.3; ADR-006 (accepted, confermato dal committente il 20/07/2026); ADR-027 (senza API Manager; **proposta A+D del 06/11/2026**: in V1.0 solo operatore, REST per i SIA nel codice ma non esposti, da confermare con CSI, ST-11); `CDU-17_diagramma-sequenza.md`.

## Cosa fa

Quando un'azienda aggiunge un **nuovo endpoint**, il nuovo sistema deve ricevere tutti i consensi esistenti. Invece di un push massivo dal centro (il vecchio BATCH-03, **rimosso**), è il **SIA a scaricarli a pagine** (PULL), secondo il modello "centro stella": il centro espone i dati, la periferia si allinea. In **V1.0** il pull lo fa l'**operatore di back office aziendale** dalla webapp (CDU-14): scarica lo snapshot in un file e l'azienda lo carica nel suo SIA. Lo scaricamento automatico dal SIA è lo scenario futuro (flusso sotto, non esposto).

Durante l'allineamento l'acquisizione di nuovi consensi per quel sotto-tipo è **bloccata**, così lo snapshot resta coerente.

## Innesco e precondizioni

- Un operatore registra il nuovo endpoint dalla webapp (CDU-14, tramite BFF) → `stato_allineamento = DA_ALLINEARE`.
- **V1.0:** l'operatore di back office aziendale avvia lo scaricamento da CDU-14. L'ente si ricava dall'abilitazione dell'operatore (LCCE), non da un parametro: da verificare che l'abilitazione LCCE sia per azienda.
- **Scenario futuro:** il SIA riceve la notifica out-of-band (email e/o webhook, PULL-02) e si collega su un canale autenticato da definire con un nuovo ADR. ⚠️ Richiede uno sviluppo da parte delle ASR (un client per il nuovo servizio), **oggi non previsto**: le ASR non devono adeguarsi. ~~Mutual TLS (decisione dedotta).~~ Superato: `ConsprefService` usa la firma WS-Security (verifica sul codice del 06/11/2026).

## Flusso V1.0 (operatore)

1. Operatore → BFF → `GET /api/v1/endpoints/{endp_id}/snapshot?codice_consenso=` (CDU-14).
2. Il sistema verifica che l'endpoint sia dell'azienda dell'operatore e in `DA_ALLINEARE` (altrimenti 403 o 409).
3. Imposta `IN_CORSO` e **blocca** CDU-03/CDU-09 per il `sotto_tipo_consenso`, con le stesse regole di sotto (aziendali solo per l'azienda, regionali per tutti).
4. Genera lo snapshot dei consensi **attivi** dell'azienda e lo restituisce come file in streaming.
5. A fine generazione imposta `COMPLETATO` e sblocca: il blocco dura solo il tempo della generazione. Se va in errore imposta `ERRORE` e sblocca.
6. Da `COMPLETATO` BATCH-01 notifica i nuovi consensi anche al nuovo endpoint.
7. L'azienda carica il file nel suo SIA, fuori dal sistema. Non c'è conferma di fine allineamento.

## Flusso scenario futuro (SIA chiamante, non esposto in V1.0)

1. SIA → `PATCH /api/v1/endpoints/{endp_id}/stato-allineamento` `{stato: IN_CORSO}`.
2. Il sistema imposta `cons_r_asr_endpoint.stato_allineamento = 'IN_CORSO'` e **blocca** CDU-03/CDU-09 (e di fatto ogni nuova acquisizione) per quel `sotto_tipo_consenso`: i consensi aziendali solo per l'azienda in allineamento, i regionali per tutti, perché finiscono anche nello snapshot dell'azienda (SRS rev. 1.28, decisione 02/11/2026; prima il codice bloccava il sotto-tipo per tutte le aziende). Il blocco è obbligatorio: la variante watermark senza blocco **non** è stata adottata.
3. SIA chiama in loop `GET /api/v1/consensi/snapshot?codice_ente=&codice_consenso=&cursor=&page_size=`.
4. Il sistema restituisce una pagina di consensi **attivi** con `next_cursor`. A ogni chiamata verifica che il SIA legga solo il proprio ente.
5. Fine del loop quando `has_more = false`.
6. SIA → `PATCH .../stato-allineamento` `{stato: COMPLETATO}`.
7. Il sistema imposta `COMPLETATO` e sblocca le acquisizioni.
8. Il SIA comunica alla webapp `COMPLETATO` e i dati dell'ultimo invio riuscito, sulla stessa canalità PULL-02. La webapp aggiorna lo stato visibile all'operatore.

## Contratto

**V1.0 (webapp, tramite BFF; da inserire nello swagger, PULL-09):**

```
GET /api/v1/endpoints/{endp_id}/snapshot?codice_consenso={sotto_tipo}
→ 200 text/csv (streaming) · 403 endpoint di un'altra azienda · 404 · 409 endpoint non DA_ALLINEARE
```

Formato: **identico** al tracciato dell'allineamento massivo AS-IS (specifica v02c, cap. 9), così l'azienda carica il file come oggi, senza adeguamenti: `cfRichiedente;idAura;dataAcquisizione;codiceTipoConsenso;codiceSottotipoConsenso;valoreConsenso;codiceASR;` Separatore, ordine dei campi, codifica e intestazione da verificare su un file di esempio di CSI (ST-11).

**Scenario futuro (nel codice, non esposto in V1.0):**

```
GET /api/v1/consensi/snapshot
    ?codice_ente={ente}&codice_consenso={sotto_tipo}
    &cursor={base64}&page_size={1..5000, default 1000}&since={ISO-8601, opzionale}
→ { "items": [...], "next_cursor": "...", "has_more": true, "snapshot_taken_at": "..." }

PATCH /api/v1/endpoints/{endp_id}/stato-allineamento   { "stato": "IN_CORSO" | "COMPLETATO" }
```

- Paginazione **cursor-based opaca**, niente offset: `next_cursor` = base64 del `cons_id` dell'ultimo elemento. Query: `WHERE cons_id > :last ORDER BY cons_id LIMIT :n`.
- Codici: 200, 400 (cursor non valido o parametri mancanti), 401, 403, 404 (endpoint inesistente), **409** (allineamento già COMPLETATO), 500.
- Nessun rate limit in V1.0; da rivalutare se lo snapshot rallenta gli altri servizi.

## Logica di backend

- **Snapshot Service** (Spring Boot): query sui record di `cons_t_consenso` con `data_fine IS NULL` e stato ATTIVO/NEGATO, filtrati per `cod_asr = :authorizedEnte` e `sotto_tipo_consenso`, ordinati per `cons_id`. Indice su (`sotto_tipo_consenso`, `cod_asr`, `cons_id`).
- **Gestione dello stato** di `cons_r_asr_endpoint`: transizioni ammesse DA_ALLINEARE → IN_CORSO → COMPLETATO, ERRORE in caso di problemi; 409 se già COMPLETATO. Il PATCH verifica che l'endpoint appartenga all'ente del chiamante.
- **Blocco acquisizioni**: CDU-09/10/11 (e il BE cittadino) controllano prima di salvare che nessun endpoint del sotto-tipo sia `IN_CORSO`: per un consenso aziendale si guarda solo l'azienda del consenso, per un regionale tutte. In quel caso errore applicativo e, nella webapp, form disabilitato (`regole.bloccato_allineamento`).
- **Sicurezza V1.0:** ente dall'abilitazione dell'operatore (sessione PUA, JWT interno), `WHERE` sull'ente.
- ⚠️ **REST per i SIA (scenario futuro):** oggi `EnteAuthorizationFilter` si fida dell'header dell'API Manager per il codice ente. Senza API Manager nessuno lo imposta: **non esporli** finché un nuovo ADR non definisce autenticazione e legame tra credenziale e azienda (rischio ST-14).
- Audit strutturato di ogni pagina richiesta.
- SCADUTO non compare nello snapshot, che espone solo i consensi attivi. Il canale asincrono per comunicare SCADUTO ai SIA è un tema aperto (BAT-03).

## Come svilupparlo

1. Estendere l'OpenAPI con snapshot e PATCH stato-allineamento (e con i CRUD endpoint di CDU-14).
2. Implementare lo Snapshot Service con test di paginazione: cursore stabile, ultima pagina, `page_size` fuori range → 400.
3. Implementare la macchina a stati e il controllo di blocco come componente comune richiamato dai servizi di salvataggio.
4. Nella webapp (CDU-14): mostrare lo `stato_allineamento` e il pulsante «Scarica snapshot» per gli endpoint `DA_ALLINEARE`. ~~ricevere il passo 8~~ (solo scenario futuro).

## Dipendenze

CDU-14 (creazione endpoint, stato, pulsante di scaricamento); abilitazione LCCE per azienda (da verificare). Scenario futuro: canale autenticato per i SIA (nuovo ADR, ST-11), webhook/email PULL-02 (contratto CSI).

## Punti aperti

- Semantica del parametro `since` (delta) e uso per l'eventuale allineamento incrementale.
- Contratto del canale PULL-02 per il passo 8: solo scenario futuro. In V1.0 l'azienda viene avvisata con un'email quando l'endpoint è `DA_ALLINEARE` (proposta del 06/11/2026; niente webhook, che richiederebbe sviluppo da parte delle ASR).
- Timeout di un allineamento rimasto `IN_CORSO`: in V1.0 il blocco dura solo la generazione; serve comunque lo sblocco se il processo si interrompe (`ERRORE`).
- Canale per comunicare ai SIA lo stato SCADUTO (BAT-03, call CSI pending).
- Formato del file V1.0: identico al CSV dell'allineamento massivo AS-IS (cap. 9); file di esempio da chiedere a CSI (ST-11).
- Alternativa automatica da proporre a CSI: reinvio dei consensi attivi al nuovo endpoint con SRV-03 tramite BATCH-01. Nessun lavoro per le ASR, ma è un push massivo, contrario alla scelta del 20/07 (ADR-006).
- ~~Mutual TLS deciso (dedotto da ADR-027).~~ Proposta A+D da confermare con CSI (ST-11).

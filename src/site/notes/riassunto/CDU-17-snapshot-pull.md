---
{"dg-publish":true,"permalink":"/riassunto/cdu-17-snapshot-pull/","dg-note-properties":{}}
---

# CDU-17 — Snapshot consensi per allineamento endpoint (PULL)

**Perimetro:** solo BE ✅ (+ visualizzazione dello stato nella webapp, CDU-14) — Riferimenti: SRS v10 §6.17, §7.3, §8.4.3; ADR-006 (accepted, confermato dal committente il 20/07/2026); `CDU-17_diagramma-sequenza.md`.

## Cosa fa

Quando un'azienda aggiunge un **nuovo endpoint** a un consenso già attivo, il nuovo sistema deve ricevere tutti i consensi esistenti. Invece di un push massivo dal centro (il vecchio BATCH-03, **rimosso**), è il **SIA a scaricarli a pagine** (PULL), secondo il modello "centro stella": il centro espone i dati, la periferia si allinea.

Durante l'allineamento l'acquisizione di nuovi consensi per quel sotto-tipo è **bloccata**, così lo snapshot resta coerente.

## Innesco e precondizioni

- Un operatore registra il nuovo endpoint dalla webapp (CDU-14, chiamata diretta senza APIM) → `stato_allineamento = DA_ALLINEARE`.
- Il SIA riceve la notifica out-of-band (email e/o webhook, PULL-02).
- Il SIA è autenticato su APIMBBONE con scope **`consensi:snapshot`**.

## Flusso

1. SIA → `PATCH /api/v1/endpoints/{endp_id}/stato-allineamento` `{stato: IN_CORSO}`.
2. Il sistema imposta `cons_r_asr_endpoint.stato_allineamento = 'IN_CORSO'` e **blocca** CDU-03/CDU-09 (e di fatto ogni nuova acquisizione) per quel `sotto_tipo_consenso`. Il blocco è obbligatorio: la variante watermark senza blocco **non** è stata adottata.
3. SIA chiama in loop `GET /api/v1/consensi/snapshot?codice_ente=&codice_consenso=&cursor=&page_size=`.
4. Il sistema restituisce una pagina di consensi **attivi** con `next_cursor`. A ogni chiamata verifica che il SIA legga solo il proprio ente.
5. Fine del loop quando `has_more = false`.
6. SIA → `PATCH .../stato-allineamento` `{stato: COMPLETATO}`.
7. Il sistema imposta `COMPLETATO` e sblocca le acquisizioni.
8. Il SIA comunica alla webapp `COMPLETATO` e i dati dell'ultimo invio riuscito, sulla stessa canalità PULL-02. La webapp aggiorna lo stato visibile all'operatore.

## Contratto

```
GET /api/v1/consensi/snapshot
    ?codice_ente={ente}&codice_consenso={sotto_tipo}
    &cursor={base64}&page_size={1..5000, default 1000}&since={ISO-8601, opzionale}
→ { "items": [...], "next_cursor": "...", "has_more": true, "snapshot_taken_at": "..." }

PATCH /api/v1/endpoints/{endp_id}/stato-allineamento   { "stato": "IN_CORSO" | "COMPLETATO" }
```

- Paginazione **cursor-based opaca**, niente offset: `next_cursor` = base64 del `cons_id` dell'ultimo elemento. Query: `WHERE cons_id > :last ORDER BY cons_id LIMIT :n`.
- Codici: 200, 400 (cursor non valido o parametri mancanti), 401, 403, 404 (endpoint inesistente), **409** (allineamento già COMPLETATO), 429, 500.
- Rate limit dedicato su `/snapshot` (es. 600 req/min) configurato su APIMBBONE, per non degradare CDU-15.

## Logica di backend

- **Snapshot Service** (Spring Boot): query sui record di `cons_t_consenso` con `data_fine IS NULL` e stato ATTIVO/NEGATO, filtrati per `cod_asr = :authorizedEnte` e `sotto_tipo_consenso`, ordinati per `cons_id`. Indice su (`sotto_tipo_consenso`, `cod_asr`, `cons_id`).
- **Gestione dello stato** di `cons_r_asr_endpoint`: transizioni ammesse DA_ALLINEARE → IN_CORSO → COMPLETATO, ERRORE in caso di problemi; 409 se già COMPLETATO. Il PATCH verifica che l'endpoint appartenga all'ente del chiamante.
- **Blocco acquisizioni**: CDU-09/10/11 (e il BE cittadino) controllano prima di salvare che nessun endpoint del sotto-tipo/azienda sia `IN_CORSO`. In quel caso errore applicativo e, nella webapp, form disabilitato (`regole.bloccato_allineamento`).
- Sicurezza identica a CDU-15/16 (`EnteAuthorizationFilter` esteso al caller CDU-17, `WHERE` sull'ente).
- Audit strutturato di ogni pagina richiesta.
- SCADUTO non compare nello snapshot, che espone solo i consensi attivi. Il canale asincrono per comunicare SCADUTO ai SIA è un tema aperto (BAT-03).

## Come svilupparlo

1. Estendere l'OpenAPI con snapshot e PATCH stato-allineamento (e con i CRUD endpoint di CDU-14).
2. Implementare lo Snapshot Service con test di paginazione: cursore stabile, ultima pagina, `page_size` fuori range → 400.
3. Implementare la macchina a stati e il controllo di blocco come componente comune richiamato dai servizi di salvataggio.
4. Nella webapp (CDU-14): mostrare lo `stato_allineamento` e ricevere il passo 8.

## Dipendenze

CDU-14 (creazione endpoint, stato); APIMBBONE (scope, rate limit); webhook/email PULL-02 (contratto CSI).

## Punti aperti

- Semantica del parametro `since` (delta) e uso per l'eventuale allineamento incrementale.
- Contratto del canale PULL-02 per il passo 8 (come il SIA comunica COMPLETATO alla webapp).
- Timeout di un allineamento rimasto `IN_CORSO` (sblocco manuale o automatico?).
- Canale per comunicare ai SIA lo stato SCADUTO (BAT-03, call CSI pending).

---
{"dg-publish":true,"permalink":"/riassunto/cdu-15-api-stato-consenso/","dg-note-properties":{}}
---

# CDU-15 — API di recupero stato consenso (per i SIA)

**Perimetro:** solo BE ✅ (machine-to-machine) — Riferimenti: SRS v10 §3.3 (OpenAPI), §6.15, §6.16 "Modello di sicurezza"; ADR-027 (supersede ADR-004 e ADR-005), ADR-018; `wiki/analyses/openapi-cdu-15-16-v0.1.yaml` (bozza v0.1).

> ⏸ **Non esposto in V1.0** (ADR-027, call CSI 05/11/2026: niente API Manager). Il servizio si sviluppa nel backend ma i SIA non lo chiamano. Le parti su APIMBBONE, token, Gateway e rate limit non si applicano. Se in futuro verrà esposto, un nuovo ADR deciderà l'autenticazione.

## Cosa fa

Un servizio REST che permette al sistema informativo di un'ASR di chiedere: *"qual è lo stato del consenso X per il cittadino Y presso il mio ente?"*. Risponde con valore, stato, date e informativa di riferimento.

## Attore e precondizioni

SIA dell'ASR. In V1.0 il servizio non è esposto; l'autenticazione sarà definita se verrà aperto (nuovo ADR).

## Contratto

```
GET /api/v1/consensi/stato?codice_fiscale={cf}&codice_consenso={cod}&codice_ente={ente}
Autenticazione: da definire se esposto (ADR-027)
```

Risposta 200:

```json
{
  "codice_fiscale": "RSSMRA80A01L219X",
  "codice_consenso": "ROL",
  "codice_ente": "010",
  "stato_consenso": "ATTIVO",
  "valore_consenso": "SI",
  "data_espressione": "2025-01-15T10:30:00Z",
  "data_inizio_validita_consenso": "2025-01-15",
  "data_fine_validita_consenso": null,
  "informativa": { "id": 42, "data_decorrenza": "2024-06-01", "data_scadenza": null }
}
```

Codici: 200, 400 (parametri mancanti/malformati), 401, 403 (ente non autorizzato), 404 (consenso non trovato), 429, 500. Tutti gli errori in **RFC 7807** `application/problem+json`.

## Logica di backend

1. Validazione dei parametri (CF formale, codice consenso esistente).
2. **Autorizzazione per ente**: `EnteAuthorizationFilter` confronta `codice_ente` della query con l'ente del chiamante autenticato (da definire se il servizio verrà esposto) → 403 se diversi.
3. Query sul record valido di `cons_t_consenso` (`data_fine IS NULL`) per `cf_cittadino` + sotto-tipo (da `codice_consenso`) + `cod_asr`, **sempre con `WHERE cod_asr = :authorizedEnte`** (ente del chiamante autenticato, mai dal parametro).
4. Join con `cons_d_informativa` per i dati dell'informativa.
5. Risposta. Audit strutturato (identificativo del chiamante, ente richiesto/autorizzato, esito, latenza, `trace_id`) **senza CF in chiaro**.

Mapping da chiarire:
- `codice_consenso` → `sotto_tipo_consenso` (codice in `cons_d_sotto_tipo_cons`);
- `codice_ente` → `cod_asr`;
- Versione dell'informativa: **nessun campo `versione`** (decisione 06/10/2026). Ogni versione è una riga di `cons_d_informativa`; il SIA la identifica con `informativa.id` (`d_informativa_id`) e la colloca nel tempo con `data_decorrenza`/`data_scadenza`. Rimosso anche dall'esempio di SRS §6.15 (rev. 1.10).

Semantica: SCADUTO nel TO-BE indica il **record corrente** con informativa scaduta. Nell'AS-IS lo stesso nome indicava un record superato. Va documentato nell'OpenAPI e comunicato ai SIA.

## Come svilupparlo

1. **Prima l'OpenAPI 3.x**, che è un deliverable Exprivia: endpoint, schemi con vincoli, mappa errori. Va condivisa con le ASR se il servizio verrà esposto. Esiste una bozza v0.1 (non esposta in V1.0, con un commento in testa nel file YAML).
2. Generare gli stub con `openapi-generator-maven-plugin`; SpringDoc per la Swagger UI nei soli ambienti non produttivi.
3. Implementare filtro di sicurezza, repository con clausola ente obbligatoria e mapper RFC 7807.
4. Niente rate limiting applicativo in V1.0.
5. Requisito infrastrutturale: in V1.0 il servizio non è raggiungibile dai SIA.

## Dipendenze

Dati di CDU-09/10/11.

## Punti aperti

- ⏸ **Sospesi (ADR-027):** URL dei server, header del Gateway, conferma DEV-05, sottoscrizione APIM.
- **SLA (TODO-M4 / API-04):** tempo di risposta e throughput target non definiti (prima della UAT).
- Comportamento per i consensi regionali: `codice_ente` resta obbligatorio, visto che il regionale è salvato per ASR?

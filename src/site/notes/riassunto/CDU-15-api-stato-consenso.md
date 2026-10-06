---
{"dg-publish":true,"permalink":"/riassunto/cdu-15-api-stato-consenso/","dg-note-properties":{}}
---

# CDU-15 — API di recupero stato consenso (per i SIA)

**Perimetro:** solo BE ✅ (machine-to-machine) — Riferimenti: SRS v10 §3.3 (OpenAPI), §6.15, §6.16 "Modello di sicurezza"; ADR-004, ADR-005, ADR-018; `wiki/analyses/openapi-cdu-15-16-v0.1.yaml` (bozza v0.1, riallineata ad APIMBBONE il 06/10/2026).

## Cosa fa

Un servizio REST che permette al sistema informativo di un'ASR di chiedere: *"qual è lo stato del consenso X per il cittadino Y presso il mio ente?"*. Risponde con valore, stato, date e informativa di riferimento.

## Attore e precondizioni

SIA dell'ASR, autenticato e autorizzato su **APIMBBONE** (OAuth2 `client_credentials`), che chiama attraverso l'API Gateway.

## Contratto

```
GET /api/v1/consensi/stato?codice_fiscale={cf}&codice_consenso={cod}&codice_ente={ente}
Authorization: Bearer <token APIMBBONE>
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
  "informativa": { "id": 42, "versione": "3.1", "data_decorrenza": "2024-06-01", "data_scadenza": null }
}
```

Codici: 200, 400 (parametri mancanti/malformati), 401, 403 (ente non autorizzato), 404 (consenso non trovato), 429, 500. Tutti gli errori in **RFC 7807** `application/problem+json`.

## Logica di backend

1. Validazione dei parametri (CF formale, codice consenso esistente).
2. **Autorizzazione per ente**: `EnteAuthorizationFilter` confronta `codice_ente` della query con quello inoltrato dal Gateway → 403 se diversi.
3. Query sul record valido di `cons_t_consenso` (`data_fine IS NULL`) per `cf_cittadino` + sotto-tipo (da `codice_consenso`) + `cod_asr`, **sempre con `WHERE cod_asr = :authorizedEnte`** (ente preso dal Gateway, mai dal parametro).
4. Join con `cons_d_informativa` per i dati dell'informativa.
5. Risposta. Audit strutturato (`client_id`, ente richiesto/autorizzato, esito, latenza, `trace_id`) **senza CF in chiaro**.

Mapping da chiarire:
- `codice_consenso` → `sotto_tipo_consenso` (codice in `cons_d_sotto_tipo_cons`);
- `codice_ente` → `cod_asr`;
- `versione` dell'informativa: nel modello TO-BE non c'è una colonna `versione`, va decisa la fonte (vedi CDU-13).

Semantica: SCADUTO nel TO-BE indica il **record corrente** con informativa scaduta. Nell'AS-IS lo stesso nome indicava un record superato. Va documentato nell'OpenAPI e comunicato ai SIA.

## Come svilupparlo

1. **Prima l'OpenAPI 3.x**, che è un deliverable Exprivia: endpoint, schemi con vincoli, security scheme Bearer, mappa errori. Va condivisa con le ASR prima del go-live e serve per la sottoscrizione su APIMBBONE. Esiste una bozza v0.1, già riallineata al modello APIMBBONE (chiusi i TBD su Authorization Server, JWKS e scope); restano aperti SLA, URL dei server, nomi degli header e lista ASR.
2. Generare gli stub con `openapi-generator-maven-plugin`; SpringDoc per la Swagger UI nei soli ambienti non produttivi.
3. Implementare filtro di sicurezza, repository con clausola ente obbligatoria e mapper RFC 7807.
4. Niente rate limiting applicativo: lo fa l'API Manager. Niente validazione JWKS: la fa il Gateway.
5. Requisito infrastrutturale: backend REST raggiungibile **solo** dal Gateway (segregazione di rete su IaaS).

## Dipendenze

APIMBBONE (sottoscrizione, header inoltrati: nome esatto dell'header `codice_ente`), dati di CDU-09/10/11.

## Punti aperti

- Chiusi M1, M2 e parte di M4 della bozza OpenAPI v0.1: Authorization Server, JWKS, scope e rate limit passano ad APIMBBONE (call CSI 20/07/2026). La bozza YAML è stata riallineata il 06/10/2026.
- **SLA (TODO-M4 / API-04):** tempo di risposta e throughput target non definiti (prima della UAT).
- **URL dei server DEV/PROD** (placeholder nella bozza) e **lista ASR / `client_id` per ambiente** (TODO-M5, differito).
- Conferma formale degli architetti CSI sul modello di trust (DEV-05).
- Nome e formato degli header inoltrati dal Gateway.
- Comportamento per i consensi regionali: `codice_ente` resta obbligatorio, visto che il regionale è salvato per ASR?

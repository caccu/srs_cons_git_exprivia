---
{"dg-publish":true,"permalink":"/riassunto/cdu-16-api-configurazione/","dg-note-properties":{}}
---

# CDU-16 — API di configurazione (per i SIA)

**Perimetro:** solo BE ✅ — Riferimenti: SRS v10 §6.16; ADR-005, ADR-018; bozza OpenAPI v0.1.

## Cosa fa

Restituisce al SIA di un ente la **configurazione attiva** che lo riguarda: quali consensi gestire, con quale informativa corrente e su quali endpoint riceverà le notifiche. Serve ai sistemi aziendali per allinearsi da soli alla configurazione regionale.

## Contratto

```
GET /api/v1/configurazione/{codice_ente}
Authorization: Bearer <token APIMBBONE>
```

```json
{
  "codice_ente": "010",
  "consensi_attivi": [
    {
      "codice_consenso": "ROL",
      "descrizione": "Ritiro On Line Referti",
      "tipo": "AZIENDALE",
      "informativa": { "id": 42, "data_decorrenza": "2024-06-01" },
      "endpoints_notifica": [ { "endp_id": 5, "endp_url": "https://sia.asl01.piemonte.it/ws/consensi" } ]
    }
  ]
}
```

Codici: 200, 401, 403 (ente non autorizzato), 404 (nessuna configurazione per l'ente), 429, 500 — RFC 7807.

## Logica di backend

1. `EnteAuthorizationFilter`: `{codice_ente}` del path = ente inoltrato dal Gateway, altrimenti 403.
2. Sotto-tipi attivi per l'ente: `cons_r_sotto_tipo_cons_asr_endpoint` ↔ `cons_r_asr_endpoint` (`cod_asr = :authorizedEnte`, validità attiva) ↔ `cons_d_sotto_tipo_cons` (decorrenza/scadenza valide) ↔ `cons_d_tipo_cons` (per `tipo`).
3. Per ciascuno: **informativa corrente** (stessa regola di CDU-10/13, considerando `cons_r_informativa_asr` per gli aziendali) ed **endpoint di notifica** attivi (`cons_t_endpoint`, eventualmente filtrati per `destinazione` = notifica).
4. Audit strutturato senza dati personali.

## Esposizione e sicurezza

Identica a CDU-15: token emesso e validato da APIMBBONE, rate limit sul Traffic Manager, isolamento per ente nel backend. Le aziende già federate restano sul SOAP AS-IS: il REST si affianca.

## Come svilupparlo

Stesso modulo "API SIA" di CDU-15 e CDU-17 (stesso filtro, stesso error handler, stessa OpenAPI). Prima la specifica, poi gli stub generati, poi la query. Valutare una cache breve: la configurazione cambia raramente.

## Dipendenze

Configurazione prodotta da CDU-12/13/14.

## Punti aperti

- Chiusi M1, M2 e parte di M4 della bozza OpenAPI v0.1: Authorization Server, JWKS, scope e rate limit passano ad APIMBBONE (call CSI 20/07/2026). La bozza YAML è stata riallineata il 06/10/2026.
- **Paginazione (TODO-M3 / API-03):** ancora da decidere se serve. Il cursor-based della SRS v10 riguarda CDU-17, non CDU-16. Va stimato il volume tipico di consensi attivi per ente.
- **SLA (TODO-M4 / API-04):** tempo di risposta e throughput target non definiti (prima della UAT).
- **URL dei server DEV/PROD:** quelli della bozza sono placeholder; dipendono dall'URL dell'istanza CONSPREF e dalla pubblicazione su APIMBBONE.
- **Nome esatto degli header** inoltrati dal Gateway (`codice_ente`): da documentare nel YAML.
- **Lista ASR e `client_id` per ambiente (TODO-M5 / API-05):** differito, non vincolante (call 20/07).
- Conferma formale degli architetti CSI sul modello di trust negli header del Gateway (DEV-05, mail 25/09/2026).
- Gli endpoint con `stato_allineamento ≠ COMPLETATO` o in manutenzione vanno esposti? Con quale indicazione?
- Per gli enti `REGIONALE`/`NAZIONALE`, cosa restituire?

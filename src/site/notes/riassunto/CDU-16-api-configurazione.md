---
{"dg-publish":true,"permalink":"/riassunto/cdu-16-api-configurazione/","dg-note-properties":{}}
---

# CDU-16 — API di configurazione (per i SIA)

**Perimetro:** solo BE ✅ — Riferimenti: SRS v10 §6.16; ADR-027 (supersede ADR-005), ADR-018; bozza OpenAPI v0.1.

> ⏸ **Non esposto in V1.0** (ADR-027, call CSI 05/11/2026: niente API Manager). Il servizio si sviluppa nel backend ma i SIA non lo chiamano. Se in futuro verrà esposto, un nuovo ADR deciderà l'autenticazione.

## Cosa fa

Restituisce al SIA di un ente la **configurazione attiva** che lo riguarda: quali consensi gestire, con quale informativa corrente e su quali endpoint riceverà le notifiche. Serve ai sistemi aziendali per allinearsi da soli alla configurazione regionale.

## Contratto

```
GET /api/v1/configurazione/{codice_ente}
Autenticazione: da definire se esposto (ADR-027)
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

1. `EnteAuthorizationFilter`: `{codice_ente}` del path = ente del chiamante autenticato (da definire se esposto), altrimenti 403.
2. Sotto-tipi attivi per l'ente: `cons_r_sotto_tipo_cons_asr_endpoint` ↔ `cons_r_asr_endpoint` (`cod_asr = :authorizedEnte`, validità attiva) ↔ `cons_d_sotto_tipo_cons` (decorrenza/scadenza valide) ↔ `cons_d_tipo_cons` (per `tipo`).
3. Per ciascuno: **informativa corrente** (stessa regola di CDU-10/13, considerando `cons_r_informativa_asr` per gli aziendali) ed **endpoint di notifica** attivi (`cons_t_endpoint` con destinazione `NOTIFICA_CONSENSO` o non valorizzata, ADR-024).
4. Audit strutturato senza dati personali.

## Esposizione e sicurezza

Non esposto in V1.0 (ADR-027). Isolamento per ente nel backend. Le aziende già federate restano sul SOAP AS-IS.

## Come svilupparlo

Stesso modulo "API SIA" di CDU-15 e CDU-17 (stesso filtro, stesso error handler, stessa OpenAPI). Prima la specifica, poi gli stub generati, poi la query. Valutare una cache breve: la configurazione cambia raramente.

## Dipendenze

Configurazione prodotta da CDU-12/13/14.

## Punti aperti

- ⏸ **Sospesi (ADR-027):** URL dei server, header del Gateway, lista ASR e `client_id`, conferma DEV-05, sottoscrizione APIM.
- **Paginazione (TODO-M3 / API-03):** ancora da decidere se serve. Il cursor-based della SRS v10 riguarda CDU-17, non CDU-16. Va stimato il volume tipico di consensi attivi per ente.
- **SLA (TODO-M4 / API-04):** tempo di risposta e throughput target non definiti (prima della UAT).
- Gli endpoint con `stato_allineamento ≠ COMPLETATO` o in manutenzione vanno esposti? Con quale indicazione?
- Per gli enti `REGIONALE`/`NAZIONALE`, cosa restituire?

---
{"dg-publish":true,"permalink":"/backup/riassunto-manutenzione-endpoint-asr-pre-lint-2026-10-30/","dg-note-properties":{}}
---

# Manutenzione endpoint ASR (start/stop servizi) — SRS §7.4

**Perimetro:** BE ✅ + messaggio di indisponibilità nella webapp — Riferimenti: SRS v10 §7.4, §6.17; verbale CSI 11/06/2026 (punto 5), call 20/07/2026; `Manutenzione-endpoint_diagramma-sequenza.md`.

## Cosa fa

Permette a un'ASR di dichiarare che il proprio sistema è **in manutenzione**. Per tutta la finestra il sistema regionale:
- **sospende le notifiche** (BATCH-01/BATCH-02) verso i sistemi di quell'azienda;
- **blocca l'acquisizione** di consensi per quell'azienda (CDU-09, CDU-03);
- mostra nella webapp un **messaggio di indisponibilità** per i servizi di quell'ASR.

Non è un CDU numerato ed è distinto da CDU-17: non c'è un nuovo endpoint da allineare. L'inizio e la fine li segnala l'ASR.

## Flusso

1. Il SIA, autenticato su APIMBBONE, chiama `PATCH /api/v1/endpoints/{endp_id}/stato` con `stato = IN_MANUTENZIONE`.
2. Il sistema blocca l'acquisizione per l'azienda, sospende le notifiche verso i suoi sistemi e segnala il blocco alla webapp.
3. Alla fine il SIA dichiara la ripresa (`stato = COMPLETATO`) e comunica i dati dell'ultimo invio riuscito. Il sistema sblocca, riprende le notifiche (i record rimasti in coda partono al ciclo successivo di BATCH-01) e segnala la ripresa alla webapp.

## Come svilupparlo

- **Modello dati:** SRS rev. 1.18 (§7.4) separa `IN_MANUTENZIONE` e `PATCH .../stato` da `stato_allineamento` e dal `PATCH .../stato-allineamento` di CDU-17. Orientamento: colonna di stato dedicata dell'endpoint; il dettaglio resta alla progettazione (decisione Exprivia, non CSI: BE-17).
- Effetto sulle acquisizioni (proposta Exprivia, BE-17): stesso blocco della precondizione `IN_CORSO` di CDU-09, esteso a CDU-10/11; consultazione CDU-08 libera.
- Servizio di dominio "disponibilità azienda" interrogato da:
  - servizi di salvataggio consenso → errore di indisponibilità;
  - BATCH-01/02 → salto dei record dell'azienda, lasciati `DA_INVIARE`;
  - CDU-08/Form Renderer → azioni disabilitate e messaggio.
- API esposta via APIMBBONE con sicurezza per ente (solo i propri endpoint). Equivalente diretto dalla webapp per l'operatore, senza API Manager.
- Estendere l'OpenAPI (CDU-15/16/17) o definire un CDU dedicato. Il punto è ancora aperto.
- Audit e tracciatura di ogni cambio di stato.

## Punti aperti

- Esposizione: rientra nello swagger CDU-17 insieme ai servizi endpoint (PULL-09).
- Granularità: manutenzione per endpoint o per intera azienda? La spec parla di tutti i sistemi dell'azienda, ma il PATCH è per endpoint.
- Uso dei "dati dell'ultimo invio" comunicati dal SIA alla ripresa (eventuale reinvio?).

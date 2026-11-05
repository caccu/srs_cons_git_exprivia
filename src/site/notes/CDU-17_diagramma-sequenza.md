---
{"dg-publish":true,"permalink":"/cdu-17-diagramma-sequenza/","dg-note-properties":{}}
---

# CDU-17 — Diagramma di sequenza (allineamento consensi in modalità PULL)

**Scopo:** descrivere il funzionamento del **CDU-17**, il caso d'uso che sostituisce **BATCH-03**. Quando un operatore di **Back Office** registra un nuovo endpoint per un'azienda che ha **già almeno un altro endpoint attivo** (es. RIS attivo, si attiva un LIS → serve allineamento dei consensi), non è più il sistema regionale a "spingere" (push) i consensi: è il **SIA della ASR** che li **scarica** (pull) da un servizio REST paginato ("centro stella").

> **Aggiornamento call CSI 20/07/2026 (rifacimento CDU-17):**
> - Attore = **operatore con profilo Back Office** sulla **web app Gestione Consensi** (accesso da **PUA**).
> - **Variante B (watermark/no-blocco) ELIMINATA**: il blocco temporaneo delle acquisizioni è **obbligatorio** (unica modalità) per garantire uno snapshot coerente.
> - 🆕 **Senza API Manager ([[wiki/docs/adr/ADR-027-architettura-senza-api-manager\|ADR-027]], 05/11/2026):** il SIA chiama il sistema regionale in **mutual TLS**, come per `ConsprefService`, su un servizio separato (decisione dedotta da ADR-027; certificati da concordare con CSI, ST-11). Le operazioni della web app passano dal BFF con JWT interno.
> - **Nuovo passo 5**: a chiusura, il SIA **comunica alla webapp lo stato COMPLETATO e i dati dell'ultimo invio andato a buon fine**, tramite la **stessa canalità di PULL-02**.
> - **Canale notifica PULL-02 (deciso 20/07/2026):** si mantengono **entrambe** le modalità — **email e/o webhook** — selezionabili via **parametro di configurazione** (solo email / solo webhook / entrambi). Con il **webhook** il SIA deve **esporre un servizio REST**, il cui **contratto, firma e sicurezza sono forniti da CSI**.
> - I servizi di inserimento, modifica ed eliminazione endpoint si usano **solo dalla web app** (CDU-14). Alle aziende sono esposti solo il cambio di stato di allineamento e la manutenzione.
> - Scenario di **manutenzione endpoint** (senza inserimento di nuovo endpoint) trattato a parte: [[Manutenzione-endpoint_diagramma-sequenza\|Manutenzione endpoint — Diagramma di sequenza]].

> Nota: CDU-17 è una **proposta tecnica** (rif. TR34/TR68, ADR-006); il rifacimento 20/07/2026 recepisce le indicazioni del committente.

---

## Diagramma

```mermaid
sequenceDiagram
    autonumber
    actor OP as Operatore Back Office<br/>(web app, accesso da PUA)
    participant GC as Gestione Consensi<br/>(sistema regionale + web app)
    participant SIA as SIA (ASR) — chiamante

    Note over OP,SIA: Precondizione: l'azienda ha già ≥1 endpoint attivo (es. RIS), si attiva un nuovo endpoint (es. LIS) → serve allineamento

    rect rgb(245,245,243)
    Note over OP,GC: Fase 0 — Registrazione nuovo endpoint (CDU-14) — web app, tramite BFF
    OP->>GC: Registra nuovo endpoint per un consenso attivo
    GC->>GC: cons_r_asr_endpoint.stato_allineamento = DA_ALLINEARE
    GC-->>SIA: Notifica "out-of-band" (PULL-02)<br/>{codice_ente, endp_id, codice_consenso}
    Note over GC,SIA: PULL-02 configurabile: email e/o webhook. Se webhook, il SIA espone un endpoint REST (contratto/firma/sicurezza forniti da CSI)
    end

    rect rgb(245,245,243)
    Note over SIA,GC: Fase 1 — Connessione in mutual TLS (certificato dell'azienda, decisione dedotta da ADR-027)
    end

    rect rgb(245,245,243)
    Note over SIA,GC: Fase 2 — Avvio allineamento (blocco obbligatorio)
    SIA->>GC: PATCH /endpoints/{endp_id}/stato-allineamento { IN_CORSO }
    GC->>GC: IN_CORSO · blocca CDU-03 / CDU-09 per il sotto_tipo<br/>(snapshot coerente — Variante B eliminata)
    end

    rect rgb(234,241,251)
    Note over SIA,GC: Fase 3 — Recupero snapshot (ciclo paginato)
    loop finché has_more = true
        SIA->>GC: GET /consensi/snapshot?codice_ente&codice_consenso&cursor&page_size<br/>(mutual TLS)
        GC->>GC: EnteAuthorizationFilter: verifica ente del chiamante (identificazione da definire con CSI) → 403 se non autorizzato
        GC-->>SIA: 200 { items[], next_cursor, has_more }
        SIA->>SIA: elabora e salva i consensi in locale
    end
    end

    rect rgb(245,245,243)
    Note over SIA,GC: Fase 4 — Chiusura
    SIA->>GC: PATCH /endpoints/{endp_id}/stato-allineamento { COMPLETATO }
    GC->>GC: COMPLETATO · sblocca CDU-03 / CDU-09
    GC-->>SIA: 200 OK
    end

    rect rgb(232,245,233)
    Note over SIA,GC: Fase 5 — Notifica esito alla webapp (nuovo, canalità PULL-02)
    SIA-->>GC: Comunica alla webapp COMPLETATO<br/>+ dati ultimo invio andato a buon fine
    GC->>GC: Aggiorna stato visibile all'operatore Back Office
    end
```

---

## I passi, in parole semplici

0. **Registrazione (Back Office).** Un operatore con **profilo Back Office**, sulla web app Gestione Consensi (accesso da **PUA**), aggiunge un nuovo endpoint per una ASR (CDU-14). Il sistema segna quell'endpoint come **DA_ALLINEARE** e avvisa il SIA che c'è da fare l'allineamento (notifica "fuori banda"). La notifica può essere via **email e/o webhook** (configurabile con apposito parametro); con il **webhook** il SIA espone un endpoint REST il cui **contratto è fornito da CSI**. *Questa operazione passa dal BFF della web app.*
1. **Connessione.** Il SIA si collega in **mutual TLS** con il certificato dell'azienda, come per `ConsprefService` (decisione dedotta da ADR-027).
2. **Avvio.** Il SIA dichiara "sto iniziando" (**IN_CORSO**). Per avere una "foto" coerente, il sistema **blocca temporaneamente** i nuovi consensi di quel tipo. *(Unica modalità — la variante watermark senza blocco è stata eliminata.)*
3. **Scaricamento a pagine.** Il SIA chiama ripetutamente `GET /consensi/snapshot` passando un **cursore**; a ogni chiamata riceve una pagina di consensi + il cursore per la successiva, finché **`has_more = false`**. A ogni chiamata il sistema verifica che il SIA stia leggendo **solo i dati del proprio ente**.
4. **Chiusura.** Il SIA dichiara **COMPLETATO**; il sistema sblocca le acquisizioni e l'allineamento è concluso.
5. **Notifica esito alla webapp.** Il SIA **comunica alla webapp lo stato COMPLETATO e i dati dell'ultimo invio andato a buon fine**, tramite la **stessa canalità di PULL-02**. La webapp aggiorna lo stato visibile all'operatore.

---

## Servizi esposti alle aziende (mutual TLS, decisione dedotta da ADR-027)

Alle aziende sono esposti solo `PATCH /endpoints/{endp_id}/stato-allineamento` (CDU-17, questo diagramma) e `PATCH /endpoints/{endp_id}/stato` (manutenzione: [[Manutenzione-endpoint_diagramma-sequenza\|Manutenzione endpoint]]), in mutual TLS (decisione dedotta da ADR-027; certificati da concordare con CSI, ST-11). Il CRUD degli endpoint (inserimento, modifica, eliminazione) resta solo nella web app (CDU-14).

---

## Punti d'interazione — stato dopo la call 20/07/2026

| #   | Punto                       | Esito                                                                                                     | Rif.    |
| --- | --------------------------- | --------------------------------------------------------------------------------------------------------- | ------- |
| A   | **Capacità del SIA**        | ✅ Chiamate REST attive confermate (PULL-08); canale: mutual TLS (decisione dedotta da ADR-027, ST-11) | PULL-08 |
| B   | **Canale di notifica**      | ✅ **Deciso:** email **e/o** webhook, via parametro di configurazione (solo email / solo webhook / entrambi). Con webhook il SIA espone un endpoint REST (contratto/firma/sicurezza forniti da CSI) | PULL-02 |
| C   | **Coerenza dello snapshot** | ✅ **Blocco obbligatorio** durante il pull (Variante A). **Variante B watermark ELIMINATA**               | PULL-01 |
| D   | **Conferma completamento**  | PATCH di conferma idempotente                                                                              | PULL-07 |
| E   | **Dimensione pagina**       | `page_size` max e tarabilità per ASR da precisare                                                          | PULL-04 |

---

*Riferimenti wiki: [[wiki/concepts/alternativa-batch-03-pull\|Alternativa BATCH-03 — PULL CDU-17]] · [[wiki/docs/adr/ADR-027-architettura-senza-api-manager\|ADR-027]] · [[Manutenzione-endpoint_diagramma-sequenza\|Manutenzione endpoint]] · [[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15/16]] · SRS §6.17. Dettaglio punti aperti: [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Tracker punti aperti CSI]] §3.*

---
{"dg-publish":true,"permalink":"/cdu-17-diagramma-sequenza/","dg-note-properties":{}}
---

# CDU-17 — Diagramma di sequenza (allineamento consensi in modalità PULL)

**Scopo:** descrivere il funzionamento del **CDU-17**, il caso d'uso che sostituisce **BATCH-03**. Quando l'**operatore di configurazione** registra un nuovo endpoint per un'azienda che ha **già almeno un altro endpoint attivo** (es. RIS attivo, si attiva un LIS → serve allineamento dei consensi), non è più il sistema regionale a "spingere" (push) i consensi: è **l'azienda** che li **scarica** (pull) dal sistema regionale ("centro stella"). In **V1.0** lo scaricamento lo fa l'**operatore di configurazione** dalla web app, che lavora su tutte le aziende; lo scaricamento automatico dal **SIA** è lo scenario futuro, descritto più sotto.

> ⛔ **Fuori dal flusso di sviluppo V1.0 ([[wiki/sources/2026-11-27-risposte-csi-riscontro-stati-cdu17\|risposte CSI del 27/11/2026]]):** CSI non chiede lo sviluppo dell'allineamento di un nuovo endpoint. Il pregresso lo migrano le ASR fuori linea, come oggi, e CSI fa un export della base dati se un'azienda non può recuperarlo. Escono lo snapshot (pulsante «Scarica snapshot» in CDU-14, CSV, stati DA_ALLINEARE, IN_CORSO e COMPLETATO, blocco delle acquisizioni) e la manutenzione dell'endpoint ([[Manutenzione-endpoint_diagramma-sequenza\|Manutenzione endpoint]], BE-25 e BE-25b pending). Resta la gestione del nuovo endpoint da back office (CDU-14). ST-11 è chiuso; restano aperte le domande sui certificati. I diagrammi e il testo sotto restano come storia.

> **Aggiornamento call CSI 20/07/2026 (rifacimento CDU-17):**
> - Attore = **operatore con profilo Back Office** sulla **web app Gestione Consensi** (accesso da **PUA**).
> - **Variante B (watermark/no-blocco) ELIMINATA**: il blocco temporaneo delle acquisizioni è **obbligatorio** (unica modalità) per garantire uno snapshot coerente.
> - 🆕 **Proposta A+D (06/11/2026, da confermare con CSI, ST-11):** in V1.0 fa tutto l'operatore di configurazione dalla web app (BFF, chiave condivisa). I servizi REST per il SIA restano nel codice ma **non sono esposti** ([[wiki/docs/adr/ADR-027-architettura-senza-api-manager\|ADR-027]]). Il centro stella resta: il dato esce solo dal sistema regionale e l'azienda va a prenderselo. ~~Il SIA chiama in mutual TLS, come per `ConsprefService` (decisione dedotta).~~ Superato: `ConsprefService` usa la firma WS-Security, non il mutual TLS.
> - **Nuovo passo 5**: a chiusura, il SIA **comunica alla webapp lo stato COMPLETATO e i dati dell'ultimo invio andato a buon fine**, tramite la **stessa canalità di PULL-02**. 🆕 Solo scenario futuro: in V1.0 l'endpoint è COMPLETATO allo scaricamento, senza conferma (06/11/2026).
> - **Canale notifica PULL-02 (deciso 20/07/2026):** si mantengono **entrambe** le modalità — **email e/o webhook** — selezionabili via **parametro di configurazione** (solo email / solo webhook / entrambi). Con il **webhook** il SIA deve **esporre un servizio REST**, il cui **contratto, firma e sicurezza sono forniti da CSI**. 🆕 In V1.0 solo email (06/11/2026): il webhook richiede sviluppo da parte delle ASR.
> - I servizi di inserimento, modifica ed eliminazione endpoint si usano **solo dalla web app** (CDU-14). ~~Alle aziende sono esposti solo il cambio di stato di allineamento e la manutenzione.~~ 🆕 In V1.0 alle aziende non è esposto nulla: cambio di stato di allineamento e manutenzione restano nel codice (proposta A+D, 06/11/2026).
> - Scenario di **manutenzione endpoint** (senza inserimento di nuovo endpoint) trattato a parte: [[Manutenzione-endpoint_diagramma-sequenza\|Manutenzione endpoint — Diagramma di sequenza]].

> Nota: CDU-17 è una **proposta tecnica** (rif. TR34/TR68, ADR-006); il rifacimento 20/07/2026 recepisce le indicazioni del committente.

## Sigle

- **OP, GC, AZ, SIA:** nomi brevi dei partecipanti nei diagrammi: operatore di configurazione, Gestione Consensi, Azienda, SIA.
- **ASR:** Azienda Sanitaria Regionale.
- **SIA:** Sistema Informativo Aziendale, il sistema informatico dell'ASR che riceve i consensi.
- **RIS, LIS:** esempi di sistemi aziendali collegati come endpoint (radiologia, laboratorio).
- **CDU:** caso d'uso dell'SRS. CDU-03: rilascio del consenso da parte del cittadino; CDU-09: rilascio del consenso da parte dell'operatore; CDU-14: gestione enti ed endpoint; CDU-17: allineamento dei consensi su un nuovo endpoint.
- **SRS:** documento dei requisiti dell'applicativo.
- **CSI:** CSI Piemonte.
- **PUA:** portale da cui gli operatori accedono alla web app.
- **IRIDE:** autenticazione CSI che identifica l'operatore (codice fiscale dall'header Shibboleth).
- **LCCE:** servizio del Configuratore CSI che verifica il token del PUA, l'abilitazione e il profilo dell'operatore.
- **BFF:** Backend For Frontend, il backend della web app; chiama il sistema regionale con una chiave condivisa.
- **BATCH-01:** processo che ogni 5 minuti invia le notifiche dei consensi agli endpoint delle aziende.
- **BATCH-03:** vecchio allineamento in push, sostituito da CDU-17.
- **SRV-03/04:** servizi SOAP con cui BATCH-01 notifica i consensi alle aziende.
- **CSV:** file di testo con campi separati da `;`, con il tracciato dell'allineamento massivo di oggi.
- **REST:** servizi web via HTTP (`GET`, `PATCH`) previsti per il SIA nello scenario futuro.
- **A+D:** proposta Exprivia del 06/11/2026: in V1.0 fa tutto l'operatore dalla web app; i servizi REST per le aziende restano nel codice ma non sono esposti.
- **ADR:** Architecture Decision Record, decisione architetturale registrata (es. ADR-006, ADR-027).
- **TR34/TR68:** numero della proposta di revisione dell'SRS che sostituisce BATCH-03 (TR68 è il nuovo numero di TR34).
- **PULL-01…08, ST-11, ST-14:** punti aperti del [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|tracker CSI]]. PULL-02: canale di notifica all'azienda (email e/o webhook). ST-11: proposta A+D. ST-14: rischio dei servizi che oggi si fidano dell'header dell'API Manager per il codice ente.

---

## V1.0 — Diagramma (solo operatore, proposta A+D)

```mermaid
sequenceDiagram
    autonumber
    actor OP as Operatore di configurazione<br/>(web app, accesso da PUA, IRIDE + LCCE)
    participant GC as Gestione Consensi<br/>(sistema regionale + web app)
    actor AZ as Azienda (ASR)
    participant SIA as SIA (ASR)

    Note over OP,SIA: Precondizione: l'azienda ha già ≥1 endpoint attivo (es. RIS), si attiva un nuovo endpoint (es. LIS) → serve allineamento

    rect rgb(245,245,243)
    Note over OP,GC: Fase 0 — Registrazione nuovo endpoint (CDU-14), tramite BFF
    OP->>GC: Registra nuovo endpoint per un consenso attivo
    GC->>GC: stato_allineamento = DA_ALLINEARE
    GC-->>AZ: email: nuovo endpoint da allineare (PULL-02, solo email in V1.0)
    end

    rect rgb(234,241,251)
    Note over OP,GC: Fase 1 — Scaricamento snapshot (CDU-14, tramite BFF)
    OP->>GC: Scarica snapshot (un file con tutti i consensi dell'endpoint)
    GC->>GC: ente = azienda dell'endpoint scelto · IN_CORSO (da DA_ALLINEARE o ERRORE) · blocca CDU-03 / CDU-09 per i sotto-tipi dell'endpoint
    alt generazione riuscita
        GC->>GC: genera lo snapshot · COMPLETATO · sblocca CDU-03 / CDU-09 (blocco di pochi secondi)
        GC-->>OP: file snapshot (CSV identico all'allineamento massivo AS-IS)
    else errore nella generazione
        GC->>GC: ERRORE · sblocca CDU-03 / CDU-09
        GC-->>OP: errore (l'operatore può riscaricare)
    end
    end

    rect rgb(232,245,233)
    Note over OP,SIA: Fase 2 — Dopo lo snapshot
    GC-->>SIA: BATCH-01 notifica al nuovo endpoint i consensi successivi (SRV-03/04)
    OP-->>AZ: consegna il file snapshot (fuori dal sistema, a cura di CSI)
    AZ->>SIA: carica lo snapshot nel SIA (a carico dell'azienda)
    end
```

### I passi V1.0, in parole semplici

0. **Registrazione.** L'operatore di configurazione registra il nuovo endpoint da CDU-14. Il sistema lo segna **DA_ALLINEARE** e avvisa l'azienda via email (PULL-02).
1. **Scaricamento.** L'operatore di configurazione scarica lo snapshot da CDU-14 sull'endpoint che sceglie. L'ente è quello dell'endpoint; l'operatore lavora su tutte le aziende. Il blocco delle acquisizioni dura solo il tempo di generare lo snapshot; poi l'endpoint è subito **COMPLETATO**. Se la generazione fallisce, l'endpoint va in **ERRORE**, le acquisizioni si sbloccano e l'operatore può riscaricare.
2. **Dopo.** Da quel momento BATCH-01 notifica i nuovi consensi anche al nuovo endpoint. L'operatore consegna il file all'azienda, fuori dal sistema (a cura di CSI). L'azienda lo carica nel suo SIA, sotto la sua responsabilità, come oggi con il CSV: il file ha lo stesso tracciato ([[wiki/sources/2019-05-01-specifica-ws-consenso-regionale-aziendale-v02c\|specifica v02c]], cap. 9), quindi per l'azienda non cambia niente. Non serve una conferma di fine allineamento nel sistema.

---

## Scenario futuro — Diagramma (SIA chiamante, non esposto in V1.0)

> ⚠️ Richiede uno sviluppo da parte delle ASR (un client per il nuovo servizio), **oggi non previsto**: le ASR non devono adeguarsi. Servirebbero anche un nuovo ADR, un canale autenticato e il legame tra credenziale e azienda. Vedi ST-11.

```mermaid
sequenceDiagram
    autonumber
    actor OP as Operatore di configurazione<br/>(web app, accesso da PUA)
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
    Note over SIA,GC: Fase 1 — Connessione autenticata (canale da definire, nuovo ADR)
    end

    rect rgb(245,245,243)
    Note over SIA,GC: Fase 2 — Avvio allineamento (blocco obbligatorio)
    SIA->>GC: PATCH /endpoints/{endp_id}/stato-allineamento { IN_CORSO }
    GC->>GC: IN_CORSO · blocca CDU-03 / CDU-09 per il sotto_tipo<br/>(snapshot coerente — Variante B eliminata)
    end

    rect rgb(234,241,251)
    Note over SIA,GC: Fase 3 — Recupero snapshot (ciclo paginato)
    loop finché has_more = true
        SIA->>GC: GET /consensi/snapshot?codice_ente&codice_consenso&cursor&page_size<br/>(canale autenticato)
        GC->>GC: EnteAuthorizationFilter: verifica ente del chiamante (ente dalla credenziale, legame credenziale → azienda nel DB) → 403 se non autorizzato
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
    GC->>GC: Aggiorna stato visibile all'operatore di configurazione
    end
```

---

## I passi dello scenario futuro, in parole semplici

0. **Registrazione (operatore di configurazione).** L'**operatore di configurazione**, sulla web app Gestione Consensi (accesso da **PUA**), aggiunge un nuovo endpoint per una ASR (CDU-14). Il sistema segna quell'endpoint come **DA_ALLINEARE** e avvisa il SIA che c'è da fare l'allineamento (notifica "fuori banda"). La notifica può essere via **email e/o webhook** (configurabile con apposito parametro); con il **webhook** il SIA espone un endpoint REST il cui **contratto è fornito da CSI**. *Questa operazione passa dal BFF della web app.*
1. **Connessione.** Il SIA si collega su un canale autenticato con la credenziale dell'azienda (da definire con un nuovo ADR; richiede sviluppo da parte delle ASR, non previsto).
2. **Avvio.** Il SIA dichiara "sto iniziando" (**IN_CORSO**). Per avere una "foto" coerente, il sistema **blocca temporaneamente** i nuovi consensi di quel tipo. *(Unica modalità — la variante watermark senza blocco è stata eliminata.)*
3. **Scaricamento a pagine.** Il SIA chiama ripetutamente `GET /consensi/snapshot` passando un **cursore**; a ogni chiamata riceve una pagina di consensi + il cursore per la successiva, finché **`has_more = false`**. A ogni chiamata il sistema verifica che il SIA stia leggendo **solo i dati del proprio ente**.
4. **Chiusura.** Il SIA dichiara **COMPLETATO**; il sistema sblocca le acquisizioni e l'allineamento è concluso.
5. **Notifica esito alla webapp.** Il SIA **comunica alla webapp lo stato COMPLETATO e i dati dell'ultimo invio andato a buon fine**, tramite la **stessa canalità di PULL-02**. La webapp aggiorna lo stato visibile all'operatore.

---

## Servizi per le aziende (nel codice, non esposti in V1.0)

`PATCH /endpoints/{endp_id}/stato-allineamento` (CDU-17) e `PATCH /endpoints/{endp_id}/stato` (manutenzione: [[Manutenzione-endpoint_diagramma-sequenza\|Manutenzione endpoint]]) restano nel codice ma **non sono esposti in V1.0** (proposta A+D, ST-11). Oggi si fidano dell'header dell'API Manager per il codice ente: prima di esporli servono autenticazione e legame tra credenziale e azienda (rischio ST-14). Il CRUD degli endpoint (inserimento, modifica, eliminazione) resta solo nella web app (CDU-14).

---

## Punti d'interazione — stato dopo la call 20/07/2026 (aggiornato al 06/11/2026)

| #   | Punto                       | Esito                                                                                                     | Rif.    |
| --- | --------------------------- | --------------------------------------------------------------------------------------------------------- | ------- |
| A   | **Capacità del SIA**        | ✅ Chiamate REST attive confermate (PULL-08). 🆕 In V1.0 nessuna chiamata dal SIA: scarica l'operatore di configurazione (proposta A+D, ST-11). ~~canale: mutual TLS (decisione dedotta)~~ | PULL-08 |
| B   | **Canale di notifica**      | ✅ **Deciso:** email **e/o** webhook, via parametro di configurazione (solo email / solo webhook / entrambi). Con webhook il SIA espone un endpoint REST (contratto/firma/sicurezza forniti da CSI) 🆕 In V1.0 solo email (06/11/2026): il webhook richiede sviluppo da parte delle ASR. | PULL-02 |
| C   | **Coerenza dello snapshot** | ✅ **Blocco obbligatorio** durante il pull (Variante A). **Variante B watermark ELIMINATA**               | PULL-01 |
| D   | **Conferma completamento**  | In V1.0 COMPLETATO allo scaricamento, nessuna conferma. Nello scenario futuro: PATCH di conferma idempotente | PULL-07 |
| E   | **Dimensione pagina**       | `page_size` max e tarabilità per ASR da precisare                                                          | PULL-04 |

---

*Riferimenti wiki: [[wiki/concepts/alternativa-batch-03-pull\|Alternativa BATCH-03 — PULL CDU-17]] · [[wiki/docs/adr/ADR-027-architettura-senza-api-manager\|ADR-027]] · [[Manutenzione-endpoint_diagramma-sequenza\|Manutenzione endpoint]] · [[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15/16]] · SRS §6.17. Dettaglio punti aperti: [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Tracker punti aperti CSI]] §3.*

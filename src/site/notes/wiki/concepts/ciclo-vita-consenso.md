---
{"dg-publish":true,"permalink":"/wiki/concepts/ciclo-vita-consenso/","title":"Ciclo di Vita del Consenso","tags":["macchina-a-stati","consenso","business-logic","gestione-consensi","terminologia-ui","mf9","mf11","mf14"],"dg-note-properties":{"title":"Ciclo di Vita del Consenso","aliases":["Ciclo di Vita del Consenso"],"type":"concept","tags":["macchina-a-stati","consenso","business-logic","gestione-consensi","terminologia-ui","mf9","mf11","mf14"],"created":"2026-05-05","updated":"2026-05-14","sources":["2026-03-02-conspref-srs-v1-revised","2023-09-01-conspref-srs-01-v03"],"related":["[[Gestione Consensi - Applicativo]]","[[2026-03-02-conspref-srs-v1-revised|CONSPREF-SRS-V1.0 revised bozza v2]]","[[wiki/concepts/composizione-dinamica-form-consenso|Composizione Dinamica Form Consenso — Single Source of Truth]]","[[analysis-2026-05-14-risposte-mf-srs-v3]]"]}}
---


# Ciclo di Vita del Consenso

Macchina a stati che governa ogni consenso espresso nel sistema [[wiki/concepts/gestione-consensi-applicativo|Gestione Consensi - Applicativo]].

---

## Terminologia UI vs tecnica (MF9R8 — SRS v3)

| Termine UI (acconsento/nego) | Valore tecnico DB | Codice in API REST |
|---|---|---|
| "acconsento" | `ATTIVO` | `"valore_consenso": "SI"` (+ `"stato_consenso": "ATTIVO"`) |
| "nego" | `NEGATO` | `"valore_consenso": "NO"` (+ `"stato_consenso": "NEGATO"`) |

> ⚠️ I termini visibili all'utente nell'interfaccia sono **"acconsento"** e **"nego"** (decisione MF9R8). I termini tecnici `ATTIVO`/`NEGATO` restano invariati a livello DB, API e tracciatura. Sostituire ogni occorrenza "Accettato/Negato" nelle UI mockup e documentazione utente.

---

## Diagramma degli stati (aggiornato MF11/MF14)

```
NON_ESPRESSO
    │
    ├─→ ATTIVO (valore=SI, UI="acconsento")
    │       ▲
    │       │  ◄────────────┐
    │       │   (modifica   │  cambio diretto via webapp citt o operatore
    │       │    valore)    │  (CDU-04/05 — no nuova informativa richiesta)
    │       ▼               │
    └─→ NEGATO (valore=NO, UI="nego") ─┘
         │
         ├─[informativa scaduta, annulla_consensi=NO]─→ SCADUTO
         └─[informativa scaduta, annulla_consensi=SI]─→ ANNULLATO
                    │
                    ├─→ ATTIVO (nuova espressione con riaccettazione informativa)
                    └─→ NEGATO (nuova espressione con riaccettazione informativa)
```

**Transizioni dirette ATTIVO ↔ NEGATO (MF11R10 + MF14R12):**
- ATTIVO → NEGATO: cambio valore via webapp cittadino o operatore (CDU-04 lato citt, CDU-05/CDU-11 lato op). Nessuna riaccettazione informativa richiesta finché l'informativa è quella corrente.
- NEGATO → ATTIVO: simmetrica.

---

## Semantica degli stati

| Stato (tecnico) | UI label | Significato | Notifica ASR? |
|---|---|---|---|
| `NON_ESPRESSO` | (vuoto / "non espresso") | Mai espresso | No |
| `ATTIVO` | "acconsento" | Espresso con SI | Sì (al cambiamento) |
| `NEGATO` | "nego" | Espresso con NO | Sì (al cambiamento) |
| `SCADUTO` | "scaduto" | Informativa cambiata, annulla=NO, valore ancora valido | **No** |
| `ANNULLATO` | "annullato" | Informativa cambiata, annulla=SI, consenso nullo | **Sì** |

---

## Regola fondamentale — No sovrascrittura

**Ogni variazione NON sovrascrive il record precedente.**
- Record esistente: `UPDATE data_fine = NOW()`
- Copia storica: `INSERT in cons_s_consenso`
- Nuovo stato: `INSERT in cons_t_consenso`

Garantisce storia completa degli atti di consenso. Vale anche per le transizioni dirette ATTIVO↔NEGATO: si chiude il record corrente e si inserisce un nuovo record con il nuovo valore.

---

## Logica CDU (aggiornata MF45)

| CDU | Stato di partenza | Azione | Richiede riaccettazione informativa? | Lato |
|---|---|---|---|---|
| CDU-03 | NON_ESPRESSO | Rilascio | **Sì** — lettura + checkbox presa visione | Citt + Op |
| CDU-04 | SCADUTO | Modifica con riaccettazione | **Sì** — nuova informativa | Citt + Op |
| CDU-04 | ANNULLATO | Modifica come rilascio ex-novo | **Sì** — come rilascio ex-novo | Citt + Op |
| CDU-04 | ATTIVO / NEGATO | Cambio valore (UI cittadino inglobata in CDU-04 — MF45) | **No** | Citt |
| CDU-05 | ATTIVO o NEGATO | Cambio valore | **No** | **Solo Op** |
| CDU-09/10/11 | qualsiasi | Equivalenti operatore di CDU-03/04/05 | Variabile | Op |

> **Nota MF45R44:** lato **webapp Cittadino**, CDU-05 NON è caso d'uso separato — il flusso "cambio valore" è inglobato in CDU-04 (pulsante unico "Salva"). La distinzione CDU-04/CDU-05 è rilevante solo lato **Operatore** e per la logica interna di tracciatura.

---

## Trigger batch

| Evento | Batch | Risultato |
|---|---|---|
| Nuovo consenso espresso o variazione | → record in `cons_t_notifica` | [[wiki/concepts/batch-processes|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] BATCH-01 invia alle ASR ogni 5 min (con `SELECT FOR UPDATE SKIP LOCKED`) |
| Informativa scaduta | BATCH-02 | Consensi → SCADUTO o ANNULLATO (SQL canonico in [[wiki/concepts/batch-processes|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] MF66) |
| Nuovo endpoint configurato | ~~BATCH-03 push~~ → **PULL CDU-17** | Allineamento on-demand via [[wiki/concepts/alternativa-batch-03-pull|Alternativa BATCH-03 — PULL CDU-17 (centro stella)]] |

---

## Consenso aziendale — caso speciale CDU-04

Se anche solo **1 consenso** di un cittadino per un'ASR è SCADUTO o ANNULLATO → il cittadino deve riaccettare le informative di **tutte** le ASR per quel tipo consenso.

**Visualizzazione informativa per azienda (MF28R27):** quando il consenso aziendale ha informativa specifica per ente, l'UI deve consentire la visualizzazione dell'informativa della singola azienda **prima** della raccolta del consenso per quell'azienda. Vedi [[wiki/concepts/composizione-dinamica-form-consenso|Composizione Dinamica Form Consenso — Single Source of Truth]] §2.3.

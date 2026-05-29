---
{"dg-publish":true,"permalink":"/wiki/concepts/informativa/","title":"Informativa Consenso","tags":["consenso","informativa","modello-dati","core-domain","gdpr"],"dg-note-properties":{"title":"Informativa Consenso","aliases":["Informativa Consenso","Informativa"],"type":"concept","tags":["consenso","informativa","modello-dati","core-domain","gdpr"],"created":"2026-05-15","updated":"2026-05-29","sources":["2026-03-02-conspref-srs-v1-revised","2019-03-20-acc-del-cdu-01-servizi-acquisizione","2026-03-02-sommario-srs-consensi"],"related":["[[wiki/concepts/ciclo-vita-consenso\|Ciclo di Vita del Consenso]]","[[Gestione Consensi - Applicativo]]","[[wiki/concepts/composizione-dinamica-form-consenso\|Composizione Dinamica Form Consenso]]","[[batch-processes|Processi Batch — BATCH-01, BATCH-02, BATCH-03]]"]}}
---


# Informativa Consenso

**Definizione:** Documento normativo-applicativo che descrive scopo, base giuridica, ambito ASR, decorrenza/scadenza e contenuti del consenso che il cittadino è chiamato a esprimere. È l'**oggetto dichiarativo** rispetto al quale il consenso (record `cons_t_consenso`) è una posizione del cittadino.


---

## Modello dati

### Tabella `cons_d_informativa` (§8.3.5 SRS)

Chiave logica: `(codice_tipo_consenso, codice_sotto_tipo_consenso, data_decorrenza_max)`.

Una nuova informativa per la stessa coppia (tipo, sottotipo) **scaduisce** automaticamente i consensi attivi sulla precedente — gestito dal [[wiki/concepts/batch-processes\|BATCH-02]] (transizione → SCADUTO nel [[wiki/concepts/ciclo-vita-consenso\|Ciclo di Vita del Consenso]]).

### Relazioni rilevanti

| Tabella | Ruolo |
|---|---|
| `cons_d_informativa` | dizionario informative attive/scadute |
| `cons_r_informativa_asr` (§8.3.6) | mapping informativa ↔ ASR di applicabilità |
| `cons_r_asr_endpoint` (§8.3.7) | endpoint SIA ASR per notifica acquisizione |
| `cons_d_allegato_tipo` + `cons_t_allegato` | allegati PDF/testuali |

### Estensione [PROPOSTA §8.4.8]

Estensione di `cons_d_informativa` con campi aggiuntivi per gestione versionamento e metadata legali. Dettaglio in [[wiki/sources/2026-03-02-conspref-srs-v1-revised\|CONSPREF-SRS-V1.0 revised bozza v2]].

---

## Ciclo di vita

```
[bozza redazionale] → ATTIVA (decorrenza ≤ today < scadenza) → SCADUTA
```

- **Attivazione:** una nuova informativa con `data_decorrenza` futura entra in vigore al raggiungimento della data.
- **Scadenza implicita:** quando viene attivata una nuova informativa per la stessa coppia (tipo, sotto-tipo), la precedente diventa SCADUTA e i consensi attivi su di essa sono propagati a stato SCADUTO.
- **Trigger di scadenza:** [[wiki/concepts/batch-processes\|BATCH-02]] verifica periodicamente le informative scadute e applica la transizione di stato sui consensi (storicizzazione in `cons_s_consenso`). Frequenza da definire con [[wiki/entities/csi-piemonte\|CSI Piemonte]] — non specificata nell'SRS.

---

## Lookup nel servizio di acquisizione (CDU-03)

Durante DA01 `acquisizioneConsenso` (vedi [[wiki/sources/2019-03-20-acc-del-cdu-01-servizi-acquisizione\|ACC-DEL-CDU-01 Servizi Acquisizione Consensi (AS-IS)]]):

1. Validazione `codiceTipoConsenso` ∈ `CONS_D_TIPO_CONS`
2. Validazione `codiceSottotipoConsenso` ∈ `CONS_D_SOTTO_TIPO_CONS`
3. Lookup informativa: `SELECT FROM cons_d_informativa WHERE tipo + sotto_tipo AND data_decorrenza ≤ today ORDER BY data_decorrenza DESC LIMIT 1`
4. Se non trovata → errore `0016` (informativa non trovata)

---

## Composizione dinamica del form

L'informativa è la **Single Source of Truth** per la composizione del form di consenso (vedi [[wiki/concepts/composizione-dinamica-form-consenso\|Composizione Dinamica Form Consenso]]):

- Backend Spring Boot espone endpoint `GET /informativa/{tipo}/{sottotipo}` con metadata
- Frontend Angular Form Renderer consuma il payload e costruisce dinamicamente:
  - Testo informativa
  - Allegati scaricabili
  - Sezioni opzionali con valori multipli (`cons_d_valore_cons`)
  - ASR target applicabili

---

## Riferimenti normativi

- DPCM 178/2015 — FSE
- Nota Garante 0020885/2017
- GDPR — artt. 13, 14 (informativa al trattamento)
- Regione Piemonte DGR 19-4900 del 20/4/2017

---

## Punti aperti

- **Versionamento storico:** retention di informative scadute per audit legale → da verificare con [[wiki/entities/csi-piemonte\|CSI Piemonte]] policy retention DB
- **Notifica scadenza al cittadino:** quando un'informativa scade, va notificato il cittadino con consenso attivo? (no in SRS attuale)
- **PROPOSTA §8.4.8** non ancora validata da [[wiki/entities/csi-piemonte\|CSI Piemonte]] — vedi tracker [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI — Tracker Unificato]]

---

## ADR correlati

| ADR | Decisione |
|---|---|
| [ADR-015](ADR-015-storicizzazione-immutabile.md) | Storicizzazione immutabile (anche informative scadute) |
| [ADR-016](ADR-016-scaduto-async-batch-02.md) | Scadenza informativa → stato SCADUTO async via BATCH-02 |

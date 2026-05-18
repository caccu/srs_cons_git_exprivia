---
{"dg-publish":true,"permalink":"/wiki/sources/2019-03-20-acc-del-cdu-01-servizi-acquisizione/","title":"ACC-DEL-CDU-01 Servizi Acquisizione Consensi (AS-IS)","tags":["soap","cdu","as-is","acquisizione-consenso","webservice",2019],"dg-note-properties":{"title":"ACC-DEL-CDU-01 Servizi Acquisizione Consensi (AS-IS)","aliases":["ACC-DEL-CDU-01 Servizi Acquisizione Consensi (AS-IS)"],"type":"source","tags":["soap","cdu","as-is","acquisizione-consenso","webservice",2019],"created":"2026-05-05","updated":"2026-05-05","sources":[],"related":["[[wiki/sources/2019-06-01-webservice-consenso-regionale-v03|Specifica WebService ConsensoRegionaleAziendale v03 (AS-IS)]]","[[Gestione Consensi - Applicativo]]","[[2019-04-08-dizionario-dati-as-is|Modello Dizionario Dati AS-IS (2019)]]","[[ciclo-vita-consenso|Ciclo di Vita del Consenso]]"]}}
---


# ACC-DEL-CDU-01 — Servizi Acquisizione Consensi (AS-IS)

**Documento:** ACC-DEL-CDU-01-V01 Servizi Acquisizione Consensi
**Autore:** Celoria ([[wiki/entities/csi-piemonte\|CSI Piemonte]]) — 20/03/2019
**Versione:** V01
**Uso:** Interno CSI Piemonte
**Contesto:** Specifica dei servizi SOAP esposti dal Modulo Regionale Gestione Consensi lato **inbound** (da WebApp o SIA ASR verso il Regionale)

---

## Scopo

Definisce i requisiti di accettazione per il servizio GESTIONE CONSENSI lato acquisizione (inbound). Complementare alla [[wiki/sources/2019-06-01-webservice-consenso-regionale-v03\|Specifica WebService ConsensoRegionaleAziendale v03 (AS-IS)]] che copre le notifiche outbound.

---

## 4 Operazioni SOAP AS-IS

| Operazione | Codice | Descrizione |
|---|---|---|
| DA01 | acquisizioneConsenso | Acquisisce (rilascia) un consenso cittadino |
| DA02 | revocaConsenso | Revoca un consenso esistente |
| DA03a | consultazioneConsenso | Legge stato consensi per un cittadino |
| DA03b | consultazioneInformativa | Legge informativa di un consenso |

**Modalità chiamata:**
- Sincrona: da WebApp Cittadino/Punto Assistito → Modulo Regionale
- Asincrona: da Modulo Regionale → ASR (notifica)

---

## DA01: acquisizioneConsenso — Logica dettagliata

### Validazioni input (in ordine)
1. `cfRichiedente` — obbligatorio, validazione formale, lookup AURA (ricava nome/cognome/idAura)
2. `cfDelegato` — opzionale, se presente deve essere diverso da cfRichiedente
3. `operatore` (tipo + codice) — opzionale, se presente verifica chiave in `CONS_D_OPERATORE`
4. `fonte` (codiceTipoFonte + codiceFonte) — **obbligatorio**, verifica in `CONS_D_TIPO_FONTE` e `CONS_D_FONTE`
5. `dataAcquisizione` — obbligatorio, validazione sintattica
6. `codiceTipoConsenso` — obbligatorio, verifica in `CONS_D_TIPO_CONS`
7. `codiceSottotipoConsenso` — obbligatorio, verifica in `CONS_D_SOTTO_TIPO_CONS`
8. Per ogni consenso dell'array: se tipo='A' (aziendale), `codiceASR` obbligatorio
9. Lookup informativa in `CONS_D_INFORMATIVA` (chiave: tipo_consenso + sotto_tipo + data_decorrenza > max)

### Logica aggiornamento DB (upsert)
```
SELECT da cons_t_consenso WHERE informativa_id + cfCittadino + fonte_id + stato_attivo
  SE non trovato → INSERT nuovo consenso
  SE trovato:
    SE valoreConsenso == valore_consenso attuale → nessuna azione
    SE valoreConsenso = 'NE' e diverso → esito KO (errore E01)
    ALTRIMENTI:
      UPDATE occorrenza: data_fine_validita = today, tipo_stato = 'scaduto'
      INSERT nuovo consenso con nuovo valore
```

---

## Interfaccia DA01 — Input

| Campo | Livello | Obbligatorio | Tipo |
|---|---|---|---|
| cfRichiedente | 1 | Sì | TEXT |
| cfDelegato | 1 | No | TEXT |
| tipoOperatore | 1 | Sì | TEXT |
| codiceOperatore | 1 | Sì | TEXT |
| codiceTipoFonte | 1 | Sì | TEXT |
| codiceFonte | 1 | Sì | TEXT |
| dataAcquisizione | 1 | Sì | TIMESTAMP |
| codiceTipoConsenso | 1 | Sì | TEXT |
| codiceSottotipoConsenso | 1 | Sì | TEXT |
| descrizioneSottotipoConsenso | 1 | Sì | TEXT |
| elencoConsensi.valoreConsenso(n) | 2 | Sì | TEXT |
| elencoConsensi.codiceASR(n) | 2 | Sì | TEXT |

## Interfaccia DA01 — Output (Response)

| Campo | Tipo | Campo DB |
|---|---|---|
| Esito | TEXT | — |
| Errori.codice | TEXT | err_cod |
| Consenso.idConsenso | TEXT | cons_id |
| Consenso.codiceFiscale.Cittadino | TEXT | cf_cittadino |
| Consenso.idAURA | TEXT | — |
| Consenso.dataAcquisizione | TIMESTAMP | data_acquisizione |
| Consenso.id_operatore | TEXT | operatore_id |
| Consenso.fonte_id | INTEGER | fonte_id |
| Consenso.audit_id | INTEGER | audit_id |
| Consenso.tipoStato | TEXT | tipo_stato |
| Consenso.valoreConsenso | TEXT | valore_consenso |

---

## Confronto AS-IS vs TO-BE

| Aspetto | AS-IS (ACC-DEL-CDU-01) | TO-BE (SRS CDU-03) |
|---|---|---|
| Storicizzazione | UPDATE tipo_stato='scaduto' + INSERT | UPDATE data_fine=NOW() + INSERT in cons_s_consenso + INSERT nuovo |
| Stato 'scaduto' | Impostato su UPDATE durante acquisizione | Impostato da BATCH-02 su scadenza informativa |
| Audit | csi_log_audit | csi_log_audit (stessa tabella) |
| Notifica ASR | Sincrona nel servizio | Asincrona via BATCH-01 (coda cons_t_notifica) — vedi [[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] |

> ⚠️ **Differenza importante:** nell'AS-IS lo stato 'scaduto' viene impostato durante l'operazione di acquisizione (se il cittadino ha già espresso quel consenso). Nel TO-BE invece SCADUTO è uno stato del [[wiki/concepts/ciclo-vita-consenso\|ciclo di vita]] gestito da BATCH-02 quando l'informativa scade. Sono due meccanismi distinti.

---

## Codici errore principali DA01

| Codice | Condizione |
|---|---|
| 0001 | cfRichiedente non valorizzato |
| 0002 | cfRichiedente non trovato su AURA |
| 0003 | cfDelegato sintassi errata |
| 0004 | operatore non trovato in CONS_D_OPERATORE |
| 0005 | dataAcquisizione non valorizzata |
| 0006 | dataAcquisizione sintassi errata |
| 0007 | codiceTipoFonte non trovato |
| 0008 | codiceFonte non trovato |
| 0009 | codiceTipoConsenso non valorizzato |
| 0010 | codiceSottotipoConsenso non valorizzato |
| 0011 | codiceTipoConsenso non trovato in CONS_D_TIPO_CONS |
| 0012 | codiceSottotipoConsenso non trovato |
| 0013 | fonte non valorizzata |
| 0014 | codiceASR mancante per consenso aziendale |
| 0015 | ASR fonte non coincide con ASR consenso |
| 0016 | informativa non trovata |
| 0017 | cfRichiedente sintassi errata |
| 0018 | cfDelegato == cfRichiedente |
| E01 | tentativo di impostare valore 'NE' su consenso già presente |

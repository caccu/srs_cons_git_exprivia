---
{"dg-publish":true,"permalink":"/wiki/sources/2019-06-01-webservice-consenso-regionale-v03/","title":"Specifica WebService ConsensoRegionaleAziendale v03 (AS-IS)","tags":["soap","wsdl","webservice","as-is","interoperabilita","batch-01","asr"],"dg-note-properties":{"title":"Specifica WebService ConsensoRegionaleAziendale v03 (AS-IS)","aliases":["Specifica WebService ConsensoRegionaleAziendale v03 (AS-IS)"],"type":"source","tags":["soap","wsdl","webservice","as-is","interoperabilita","batch-01","asr"],"created":"2026-05-05","updated":"2026-05-05","sources":[],"related":["[[Gestione Consensi - Applicativo]]","[[ciclo-vita-consenso|Ciclo di Vita del Consenso]]","[[2026-03-02-conspref-srs-v1-revised|CONSPREF-SRS-V1.0 revised bozza v2]]","[[2019-03-20-acc-del-cdu-01-servizi-acquisizione|ACC-DEL-CDU-01 Servizi Acquisizione Consensi (AS-IS)]]"]}}
---


# Specifica WebService ConsensoRegionaleAziendale v03

**Documento:** Specifica-WebService_ConsensoRegionaleAziendale_v03
**Data:** Giugno 2019
**Uso:** Esterno — contratto tecnico tra Modulo Regionale Gestione Consensi e SIA delle ASR
**Rilevanza TO-BE:** Contratto **invariato** nel TO-BE (confermato da CSI). BATCH-01 deve usare questo WSDL.

---

## 5 Servizi SOAP definiti

| Servizio | Operazione | Direzione | Uso TO-BE |
|---|---|---|---|
| SRV-01 | AcquisizioneConsenso | ASR/WebApp → Regionale | Gestisce inbound da SIA |
| SRV-02 | RevocaConsenso | ASR/WebApp → Regionale | Gestisce revoca inbound |
| SRV-03 | **NotificaAcquisizioneConsenso** | Regionale → ASR | **BATCH-01 usa questo** |
| SRV-04 | NotificaRevocaConsenso | Regionale → ASR | Notifica revoca |
| SRV-05 | VerificaServizio | — | Health check endpoint ASR |
| Cap. 9 | Allineamento massivo | Regionale → ASR | **BATCH-03 usa questo** |

---

## Protocollo

- **SOAP 1.2**
- Namespace: `http://consprefbe.csi.it/`
- Standard: W3C XML/SOAP/WSDL

---

## Sicurezza

### Servizi esposti da CSI verso ASR (SRV-03, SRV-04)
- HTTPS
- **WS-Security** profile: Sign and Encrypt — X509 Authentication con Timestamp
- Ogni ASR ha un certificato per sistema
- Certificato verificato contro associazione ASR su DB
- Gestione periodi di rinnovo: accetta certificato vecchio e nuovo in contemporanea

### Servizi esposti dalle ASR verso CSI (SRV-01, SRV-02)
- **SSL Client Authentication** (stesso certificato indipendentemente dall'ASR)
- Truststore HTTPS per certificati server affidabili
- Timeout parametrico per chiamate uscenti
- Tutti i messaggi uscenti e le risposte tracciati in chiaro (no dati soggetti a trattamento speciale)
- Malfunzionamenti ASR non devono degradare le prestazioni del sistema centrale

---

## Struttura payload SRV-01: AcquisizioneConsenso (Request)

```xml
<soap:Envelope xmlns:soap="..." xmlns:con="http://consprefbe.csi.it/">
  <soap:Body>
    <con:acquisizioneConsensoRichiesta>
      <requestId>UUID</requestId>                          <!-- obbligatorio -->
      <codiceServizio>?</codiceServizio>                   <!-- concordato con CSI -->
      <cfRichiedente>CF_CITTADINO</cfRichiedente>          <!-- obbligatorio -->
      <idAura>ID_AURA</idAura>                             <!-- obbligatorio -->
      <cfDelegato>?</cfDelegato>                           <!-- opzionale -->
      <operatore>                                          <!-- opzionale -->
        <con:tipoOperatore>?</con:tipoOperatore>
        <con:codiceOperatore>?</con:codiceOperatore>
      </operatore>
      <fonte>                                              <!-- obbligatorio -->
        <con:codiceTipoFonte>CITT|PASS|ASR</con:codiceTipoFonte>
        <con:codiceFonte>?</con:codiceFonte>
      </fonte>
      <dataAcquisizione>?</dataAcquisizione>               <!-- obbligatorio -->
      <codiceTipoConsenso>?</codiceTipoConsenso>
      <codiceSottotipoConsenso>?</codiceSottotipoConsenso>
      <descrizioneSottotipoConsenso>?</descrizioneSottotipoConsenso>
      <elencoConsensi>
        <consenso>                                         <!-- 1..N -->
          <valoreConsenso>SI|NO</valoreConsenso>
          <asr>                                            <!-- opzionale -->
            <codice>COD_ASR</codice>
          </asr>
        </consenso>
      </elencoConsensi>
    </con:acquisizioneConsensoRichiesta>
  </soap:Body>
</soap:Envelope>
```

**Valori codiceTipoFonte:**
- `CITT` — Fonte Cittadino (web app)
- `PASS` — Fonte Punto Assistito (operatore)
- `ASR` — Fonte Sistema centralizzato ASR

---

## ⚠️ Conflitto/Ambiguità con SRS TO-BE

**Problema:** L'SRS (§7.1 BATCH-01) dice che il payload deve usare "l'operazione Acquisizione" e lista i campi: `codFiscale, codAsr, codConsenso, valConsenso, dataAcquisizione, codOperatore, fonte`.

**Analisi:** BATCH-01 è una notifica **uscente** da Regionale verso ASR → deve usare **SRV-03 NotificaAcquisizioneConsenso** (non SRV-01 AcquisizioneConsenso che è inbound). I campi dell'SRS corrispondono, ma il nome dell'operazione nell'SRS è potenzialmente fuorviante. Il team deve verificare con CSI se BATCH-01 usa SRV-03 o un'altra operazione.

> ⚠️ **Conflict:** L'SRS §7.1 nomina "operazione Acquisizione" per BATCH-01, ma la WebService spec ha SRV-03 (NotificaAcquisizioneConsenso) come servizio uscente verso ASR. Verificare il WSDL corretto con CSI prima dell'implementazione.

---

## Allineamento massivo (Cap. 9) → BATCH-03

Tracciato per allineamento consensi pregresso verso nuovi endpoint. Usato da **BATCH-03** quando viene aggiunto un nuovo endpoint (stato_allineamento DA_ALLINEARE → COMPLETATO). Vedi [[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]] per logica completa BATCH-01/02/03.

---

## Implicazioni implementative TO-BE

- Client SOAP nel backend: **Apache CXF** o Spring-WS (entrambi compatibili Spring Boot 3.x)
- WSDL disponibili su richiesta a CSI (già confermato nel Q&A)
- Namespace XML: `http://consprefbe.csi.it/`
- Certificati X509 per WS-Security: richiederli in Sprint 0
- truststore HTTPS per certificati ASR: gestione parametrica

Vedi [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] per stato approvvigionamento certificati Sprint 0. Vedi [[wiki/analyses/analysis-gap-as-is-to-be\|Analisi Gap AS-IS → TO-BE — Gestione Consensi]] per delta integrazioni AS-IS→TO-BE.

---
{"dg-publish":true,"permalink":"/wiki/sources/2019-02-01-sfu-gestione-consensi-v1-7/","title":"Studio Funzionale Gestione Consensi SoL V1.7 (AS-IS 2019)","tags":["as-is","studio-funzionale",2019,"csi-piemonte","gestione-consensi"],"dg-note-properties":{"title":"Studio Funzionale Gestione Consensi SoL V1.7 (AS-IS 2019)","aliases":["Studio Funzionale Gestione Consensi SoL V1.7 (AS-IS 2019)"],"type":"source","tags":["as-is","studio-funzionale",2019,"csi-piemonte","gestione-consensi"],"created":"2026-05-05","updated":"2026-05-05","sources":[],"related":["[[wiki/sources/2023-09-01-conspref-srs-01-v03|CONSPREF-SRS-01-V03 Requisiti Gestione Consensi]]","[[Gestione Consensi - Applicativo]]","[[ciclo-vita-consenso|Ciclo di Vita del Consenso]]"]}}
---


# Studio Funzionale Gestione Consensi SoL V1.7

**Documento:** P18-004-SFU-StudioFunzionale-GestioneConsensiSoL-V1.7
**Data:** Febbraio 2019 (versione 1.0: 16/01/2019)
**Autori:** O. Medeot, L. Cosmi ([[wiki/entities/csi-piemonte\|CSI Piemonte]])
**Uso:** Interno CSI

---

## Scopo

Specifica funzionale dell'applicativo AS-IS "Gestione Consensi" pubblicato come servizio on-line (SoL) per la Sanità Piemontese. Baseline di partenza per il progetto di rifacimento TO-BE.

---

## Casi d'Uso AS-IS (6 CDU)

| CDU | Attore | Descrizione |
|---|---|---|
| 1 | Cittadino | Rilascio consenso su SoL |
| 2 | Cittadino | Revoca consenso su SoL |
| 3 | Cittadino | Consultazione consensi su SoL |
| 4 | Operatore P.A./Farmacia | Rilascio consenso per conto cittadino |
| 5 | Operatore P.A./Farmacia | Revoca consenso per conto cittadino |
| 6 | Operatore P.A./Farmacia | Consultazione consensi per conto cittadino |

---

## Delta AS-IS → TO-BE

| Aspetto             | AS-IS (2019)              | TO-BE (2026)                                       |               |
| ------------------- | ------------------------- | -------------------------------------------------- | ------------- |
| CDU                 | 6                         | **16** (+10)                                       |               |
| Generazione PDF     | Non prevista              | **CDU-06 — NUOVA**                                 |               |
| Stack DB            | PostgreSQL 9              | **PostgreSQL 17**                                  |               |
| Architettura        | Legacy/monolitica         | **Microservizi [[Architettura ECaaS                \| ECaaS]]/K8s** |
| Autenticazione      | Non specificata (vecchia) | [[wiki/concepts/gasp-salute\|GASP Salute]] (SPID/CIE), PUA/IRIDE |               |
| Notifiche cittadino | Non documentate           | UNP (email, push, IO, mex)                         |               |
| API per SIA         | SOAP AS-IS                | SOAP invariato + **REST CDU-15/16 NUOVI**          |               |

---

## Riferimenti normativi (da SFU)

- DPCM 178/2015 — FSE
- Nota Garante 0020885/2017
- GDPR
- Regione Piemonte DGR 19-4900 del 20/4/2017

---

## Note

Documento del 2019 — usato come baseline ma non come specifica TO-BE. Le evoluzioni sono tutte nel [[wiki/sources/2023-09-01-conspref-srs-01-v03\|CONSPREF-SRS-01-V03 Requisiti Gestione Consensi]] e [[wiki/sources/2026-03-02-conspref-srs-v1-revised\|CONSPREF-SRS-V1.0 revised bozza v2]].

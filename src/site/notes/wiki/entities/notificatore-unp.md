---
{"dg-publish":true,"permalink":"/wiki/entities/notificatore-unp/","title":"Notificatore UNP","tags":["sistema-esterno","notifica","csi-piemonte","rest","unp"],"dg-note-properties":{"title":"Notificatore UNP","aliases":["Notificatore UNP","UNP","User Notification Platform"],"type":"entity","tags":["sistema-esterno","notifica","csi-piemonte","rest","unp"],"created":"2026-05-15","updated":"2026-10-22","sources":["2026-03-02-conspref-srs-v1-revised","2026-03-02-domande-srs-csi-v02","2026-03-02-appunti-e-pianificazione","2026-10-22-domande-dev-be-unp-cdu-02-08"],"related":["[[CSI Piemonte]]","[[Sistemi Esterni Integrati]]","[[Gestione Consensi - Applicativo]]","[[batch-processes|Processi Batch — BATCH-01, BATCH-02, BATCH-03]]"]}}
---


# Notificatore UNP

**Nome esteso:** User Notification Platform
**Owner:** [[wiki/entities/csi-piemonte\|CSI Piemonte]]
**Ruolo:** Piattaforma centralizzata multi-canale per notifiche applicative verso il cittadino.

> ⚠️ **Distinzione importante:** UNP **NON è il Notificatore di Deleghe**. Sono due servizi distinti. Il [[wiki/concepts/batch-processes\|Notificatore di Deleghe]] gestisce le conferme post-COMPLETATO al cittadino/delegato (MF33R31). In V1.0 UNP serve solo per la notifica al cittadino dei consensi ANNULLATI (BATCH-02, SRS §7.2).
>
> 🔄 **Precisazione 22/10/2026** ([[wiki/sources/2026-10-22-domande-dev-be-unp-cdu-02-08\|domande dev BE]], BE-09): le «notifiche applicative generiche» citate in precedenza descrivevano la capacità di UNP, non un caso d'uso: l'SRS v10 non ne prevede. Caso aperto **INT-10**: se il Notificatore di Deleghe risulta essere `notify-mb` (= UNP), passa da UNP anche la conferma post-COMPLETATO.

---

## Interfaccia

| Aspetto | Valore |
|---|---|
| Protocollo | **REST** |
| Auth | Token applicativo UNP |
| Canali | Email, push, IO (notifiche app IO), mex Salute Piemonte, SMS (disponibile ma non utilizzato per policy — da non implementare) |
| Conferma | Q&A CSI #8 |

> Nota: nel documento SRS il servizio è denominato **"Notificatore Regionale (UNP)"**.

---

## Uso nel progetto [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi - Applicativo]]

UNP è uno dei [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] consumati dal backend Spring Boot:

```
Spring Boot → UNP (REST) → email/push/IO/mex
```

Casi d'uso applicativi (non BATCH-01):
- **Notifica al cittadino di consenso ANNULLATO per scadenza informativa — IN SCOPE V1.0**: inviata direttamente da **BATCH-02** (SRS §7.2) tramite UNP, con flag `flag_notifica_cittadino = TRUE`. (Il consenso che diventa SCADUTO, `annulla_consensi=NO`, non genera notifica.)
- ~~Notifica eventi applicativi generici (audit, reset, comunicazioni operative)~~ — **fuori V1.0**: nessun caso d'uso nell'SRS v10 (BE-09, 22/10/2026)
- Conferma post-COMPLETATO al cittadino/delegato: **solo se** CSI conferma Notificatore di Deleghe = `notify-mb` (INT-10). Il legacy la invia già con `notify-mb` (`/api/v1/topics/messages`, token in `x-authentication`), la stessa API del client UNP di BATCH-02: in caso di conferma si riusa quel client (dev BE, 22/10/2026)
- Verifica preferenze di contatto: interna a UNP, nessuna chiamata separata (SRS §7.2, BE-10)

> ⚠️ **Correzione 2026-06-18:** la notifica di annullamento al cittadino era erroneamente marcata "futuro / non in scope"; il documento SRS la specifica come **in scope** in BATCH-02. Resta valido che la *conferma di rilascio* (CDU-03) vada via Notificatore di Deleghe, non UNP.

---

## Differenza Notificatore UNP vs Notificatore di Deleghe

Tema ricorrente sorgente di confusione nel corpus pre-MF33R31. Risolto definitivamente nella revisione 2026-05-14:

| Aspetto | Notificatore UNP | Notificatore di Deleghe |
|---|---|---|
| Protocollo | REST | (interno CSI, non specificato) |
| Scope | V1.0: notifica ANNULLATO al cittadino (BATCH-02) | Conferma post-acquisizione consenso al cittadino/delegato (identità con `notify-mb` da confermare, INT-10) |
| Trigger | Consenso ANNULLATO per scadenza informativa | Solo post `stato = COMPLETATO` di tutte le notifiche aziendali (MF33R31) |
| Owner | CSI Piemonte | CSI Piemonte |
| Riferimento | Q&A CSI #8 | [[wiki/concepts/batch-processes\|BATCH-01]] §G |

Vedi `analysis-2026-05-14-risposte-mf-srs-v3.md` §MF33R31 per il rationale completo della distinzione.

---

## Stato approvvigionamento

| Item | Stato |
|---|---|
| Endpoint REST UNP | Confermato (Q&A CSI #8) |
| Token applicativo UNP | Da richiedere Sprint 0/1 a CSI |
| Documentazione API UNP | Da richiedere a CSI |
| Test di integrazione | Pianificato Sprint 2 |

Tracciato in [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI — Tracker Unificato]] sotto INT-* se ancora aperto.

---

## Riferimenti nel corpus

- [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] §Notificatore — sezione dedicata
- [[wiki/sources/2026-03-02-domande-srs-csi-v02\|Domande SRS Consensi — Revisione CSI V02]] Q8 — conferma REST
- [[wiki/sources/2026-03-02-appunti-e-pianificazione\|Appunti Sistema + Pianificazione Progetto Consensi]] §Integrazioni
- [[wiki/analyses/analysis-gap-as-is-to-be\|Analisi Gap AS-IS → TO-BE — Gestione Consensi]] — UNP nuovo canale (non presente AS-IS)

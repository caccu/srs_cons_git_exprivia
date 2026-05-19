---
{"dg-publish":true,"permalink":"/wiki/concepts/sistemi-esterni-integrati/","title":"Sistemi Esterni Integrati","tags":["integrazione","soap","rest","aura","sia","notificatore","gestione-deleghe","pua","configuratore","lis","mf53","mf55","mf33"],"dg-note-properties":{"title":"Sistemi Esterni Integrati","aliases":["Sistemi Esterni Integrati"],"type":"concept","tags":["integrazione","soap","rest","aura","sia","notificatore","gestione-deleghe","pua","configuratore","lis","mf53","mf55","mf33"],"created":"2026-05-05","updated":"2026-05-18","sources":["2026-03-02-conspref-srs-v1-revised","2019-06-01-webservice-consenso-regionale-v03","2026-03-02-domande-srs-csi-v02"],"related":["[[Gestione Consensi - Applicativo]]","[[Architettura ECaaS]]","[[CSI Piemonte]]","[[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]]","[[GASP Salute]]","[[analysis-2026-05-14-risposte-mf-srs-v3]]"]}}
---


# Sistemi Esterni Integrati

Sistemi esterni con cui [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi - Applicativo]] si integra nel TO-BE. Tutti gestiti da [[wiki/entities/csi-piemonte\|CSI Piemonte]] o dalle ASR della Regione Piemonte.

---

## AURA — Anagrafe Unica Regionale Assistiti

| Aspetto                    | Dettaglio                                                            |
| -------------------------- | -------------------------------------------------------------------- |
| Gestore                    | [[wiki/entities/csi-piemonte\|CSI Piemonte]]                                       |
| Protocollo                 | SOAP + WS-Security UsernameToken (credenziali IRIS)                  |
| Credenziali                | IRIS — da richiedere a referente CSI Sprint 0 ❌                      |
| Uso                        | Ricerca assistito per codice fiscale (CDU-07, CDU-08 area Operatore) |
| Servizi invocati (MF53R52) | **FindProfiliAnagrafici**, **getProfiloSanitario**                   |
| Fallback                   | **NESSUNO** — vedi nota sotto                                        |
| WSDL                       | Da richiedere a CSI (lista servizi da specificare) ❌                 |

### Comportamento ricerca assistito (MF53R52, MF55R54)

> Il sistema invoca **FindProfiliAnagrafici** + **getProfiloSanitario** di AURA. Se il CF non viene trovato → messaggio fisso: **«La ricerca con il filtro fornito non ha prodotto risultati»**. **Nessuna chiamata a SistemaTS.**

> ⚠️ **Eliminazione SistemaTS dal SRS:** decisione MF55R54 elimina **tutti i riferimenti** a SistemaTS come fallback in SRS §6.7. SistemaTS non fa parte dell'integrazione del sistema Gestione Consensi TO-BE.

Conseguenza wiki: rimosso dal corpus dei sistemi integrati. La voce SistemaTS NON deve comparire nei diagrammi di contesto, nelle mappe di integrazione né nel modello dati.

---

## SIA ASR — Sistemi Informativi Aziendali delle ASR

Sistema bidirezionale — consumatore API REST e destinatario notifiche SOAP.

| Direzione | Protocollo | CDU/Batch | Stato |
|---|---|---|---|
| Inbound (SIA→Regionale) | REST OpenAPI 3.x — OAuth2 Bearer JWT | CDU-15, CDU-16, **CDU-17 (snapshot)** | CDU-15/16: [[wiki/analyses/analysis-2026-05-06-openapi-cdu-15-16\|v0.1-DRAFT prodotta]], 5 TBD CSI; CDU-17 in proposta TR68 |
| Outbound (Regionale→SIA) | SOAP AS-IS invariato — [[wiki/sources/2019-06-01-webservice-consenso-regionale-v03\|Specifica WebService ConsensoRegionaleAziendale v03 (AS-IS)]] | BATCH-01 (solo notifiche puntuali) | Contratto definito ✅ |

**BATCH-03 push rimosso:** l'allineamento massivo per nuovo endpoint passa a modello PULL (CDU-17). Vedi [[wiki/concepts/alternativa-batch-03-pull\|Alternativa BATCH-03 — PULL CDU-17 (centro stella)]].

**Sicurezza outbound SOAP (BATCH-01):** WS-Security X509, un certificato per ASR — richiederli in Sprint 0.
**Sicurezza inbound REST:** OAuth2 Client Credentials + tabella `cons_t_client_ente`. Vedi [[wiki/concepts/sicurezza-cdu-15-16\|Sicurezza CDU-15-16 — Modello Autorizzazione per Ente]].

**Rischi aperti:** ambiguità BATCH-01 WSDL + semantica SCADUTO AS-IS≠TO-BE. Vedi [[wiki/concepts/batch-processes\|Processi Batch — BATCH-01, BATCH-02, BATCH-03]].

---

## Notificatore UNP — User Notification Platform

| Aspetto           | Dettaglio                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Gestore           | [[wiki/entities/csi-piemonte\|CSI Piemonte]]                                                                                               |
| Protocollo        | REST                                                                                                                         |
| Canali supportati | Email, push, AppIO                                                                                                           |
| Uso               | Notifiche applicative generiche verso cittadino (NON per conferma rilascio consenso — quella va via Notificatore di Deleghe) |
| Documentazione    | gitlab.csi.it/user-notification-platform/unpdocumentazione                                                                   |

---

## Notificatore di Deleghe (MF33R31) — distinto da UNP

| Aspetto     | Dettaglio                                                                    |
| ----------- | ---------------------------------------------------------------------------- |
| Gestore     | [[wiki/entities/csi-piemonte\|CSI Piemonte]]                                               |
| Uso         | **Notifica cittadino/delegato post-acquisizione consenso**                   |
| Timing      | Parte **SOLO dopo conferma notifica aziende** (BATCH-01, stato = COMPLETATO) |
| Distinzione | Servizio separato dall'UNP — non confondere                                  |

> ⚠️ **Importante:** Notificatore di Deleghe ≠ Notificatore UNP. UNP per notifiche applicative generiche; Notificatore di Deleghe per la conferma al cittadino/delegato a valle dell'acquisizione consenso. Documentare distinzione in SRS §3 e §7 (sezione notifiche).

---

## Gestione Deleghe

| Aspetto          | Dettaglio                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| Protocollo       | SOAP + OAuth2 Client Credentials                                                                                |
| Uso              | Verifica deleghe familiari — cittadino che opera per conto di un delegante (pulsante "Deleghe" webapp, MF20R19) |
| WSDL             | Da richiedere a [[wiki/entities/csi-piemonte\|CSI Piemonte]] Sprint 0 ❌                                                       |
| Stato produzione | Scenario delegante già attivo in produzione (MF22R21)                                                           |

Variante errore [PROPOSTA]: se il servizio non risponde, il sistema impedisce la selezione del delegante e mostra avviso. Il cittadino opera solo per sé stesso.

---

## LIS — Laboratorio (canale acquisizione consensi) (MF3R1, MF4R1)

| Aspetto | Dettaglio |
|---|---|
| Funzione | Acquisizione consenso del cittadino presso il laboratorio (front-office) |
| Integrazione | Da definire — canale aggiuntivo rispetto a webapp Citt e webapp Operatore |
| Implicazione SRS | Diagramma di contesto §1/§2 deve riflettere 3 canali, non 2 |

Nota: l'acronimo LIS va chiarito formalmente con CSI nella prossima revisione SRS.

---

## Configuratore Regionale / PUA

| Sistema | Funzione | Profilo utente |
|---|---|---|
| PUA (Punto Unico di Accesso) | Autenticazione operatori sanitari/amministrativi | RUPAR / IRIDE |
| Configuratore Regionale | Censimento applicazioni, profili operatori, endpoint ASR | Back Office |

> **Nota MF7R5:** Cittadino **NON** è profilo applicativo del Configuratore — accede via webapp dedicata SPID/CIE. Configuratore gestisce solo i profili operatore.

Registrazione app PUA (2 profili operatore) da richiedere a [[wiki/entities/csi-piemonte\|CSI Piemonte]] in Sprint 0 ❌.

---

## Mappa integrazioni sintetica (aggiornata)

```
[Cittadino] → GASP Salute (OIDC/SAML2) → Webapp Citt
[Cittadino c/o LIS] → operatore LIS → Webapp Operatore (caso d'uso LIS)
[Operatore] → PUA/Configuratore Regionale → Webapp Operatore
                              ↓
[Applicativo Gestione Consensi]
        ├─ AURA              (SOAP/IRIS) — FindProfiliAnagrafici, getProfiloSanitario
        ├─ Gestione Deleghe  (SOAP/OAuth2) — verifica deleghe familiari
        ├─ Notificatore Deleghe (REST?) — conferma post-acquisizione al cittadino
        ├─ Notificatore UNP  (REST) — notifiche applicative generiche
        ├─ SIA ASR           (SOAP outbound) ← BATCH-01 notifiche puntuali
        └─ SIA ASR           (REST inbound) ← CDU-15, CDU-16, CDU-17 PULL
```

---

## Stato approvvigionamento Sprint 0

| Sistema | Cosa serve | Stato |
|---|---|---|
| AURA | Credenziali IRIS + WSDL (FindProfiliAnagrafici, getProfiloSanitario) | ❌ Da richiedere |
| SIA ASR | Certificati X509 per ogni ASR | ❌ Da richiedere |
| Gestione Deleghe | WSDL | ❌ Da richiedere |
| Notificatore di Deleghe | API + integration spec | ❌ Da richiedere (distinta da UNP) |
| Notificatore UNP | Già documentato — gitlab.csi.it | ✅ Riferimento disponibile |
| PUA | Registrazione 2 profili applicativo | ❌ Da richiedere |
| LIS | Specifica integrazione canale acquisizione | ❌ Da chiarire con CSI (acronimo + spec) |
| GASP Salute | Documentazione protocollo OIDC/SAML2 | ❌ Blocco critico — giorno 1 |
| SistemaTS | — | ⛔ **NON integrato** (decisione MF55R54 — rimosso dal SRS) |

---

## ADR correlati

| ADR | Decisione |
|---|---|
| [ADR-009](../../docs/adr/ADR-009-eliminazione-sistemats.md) | Eliminazione SistemaTS dall'integrazione |
| [ADR-012](../../docs/adr/ADR-012-notificatore-deleghe-post-completato.md) | Notificatore di Deleghe ≠ Notificatore UNP, post-COMPLETATO |
| [ADR-014](../../docs/adr/ADR-014-apache-cxf-soap-client.md) | Apache CXF client SOAP (AURA, Deleghe, SIA outbound) |
| [ADR-017](../../docs/adr/ADR-017-lis-terzo-canale.md) | LIS terzo canale di acquisizione |

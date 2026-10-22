---
{"dg-publish":true,"permalink":"/wiki/sources/2026-10-22-domande-dev-be-unp-cdu-02-08/","title":"Domande dev BE su UNP, CDU-02 e CDU-08 — risposte","tags":["team-sviluppo","backend","notificatore-unp","batch-02","cdu-02","cdu-08","consensobeservice","in-manutenzione"],"dg-note-properties":{"title":"Domande dev BE su UNP, CDU-02 e CDU-08 — risposte","aliases":["Domande dev BE su UNP, CDU-02 e CDU-08 — risposte"],"type":"source","tags":["team-sviluppo","backend","notificatore-unp","batch-02","cdu-02","cdu-08","consensobeservice","in-manutenzione"],"created":"2026-10-22","updated":"2026-10-22","sources":["2026-10-22-domande-dev-be-unp-cdu-02-08"],"related":["[[wiki/entities/notificatore-unp\|Notificatore UNP]]","[[wiki/concepts/batch-processes\|Processi Batch]]","[[wiki/docs/adr/ADR-012-notificatore-deleghe-post-completato\|ADR-012]]","[[ADR-021-perimetro-solo-operatore|ADR-021]]","[[wiki/docs/adr/ADR-025-contratto-cittadino-soap-consensobeservice\|ADR-025]]","[[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI]]"]}}
---


# Domande dev BE su UNP, CDU-02 e CDU-08 — risposte

**Fonte:** 12 domande dello sviluppatore BE del 22/10/2026 su backlog BE-23 (Notificatore UNP), CDU-02 (cittadino) e CDU-08 (operatore). Risposte Exprivia dello stesso giorno, basate su SRS `revised_v10` e wiki. Criterio dato dall'utente: rispondere solo se l'informazione c'è ed è utile; altrimenti chiedere a CSI, oppure non intervenire se il flusso produce già il risultato atteso.

Le domande sono tracciate come **BE-09÷BE-20** in [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|Punti Aperti CSI]] §13.

---

## Notificatore UNP (BE-23)

| # | Domanda | Risposta | Riferimento |
|---|---|---|---|
| BE-09 | Le «notifiche generiche» di BE-23 e della wiki sono in V1.0? Con quale caso d'uso? | **Fuori V1.0.** Nessun caso d'uso nell'SRS v10: l'espressione descriveva la capacità generale di UNP (ADR-012 citava solo «es. promemoria, comunicazioni»). In V1.0 UNP serve solo per la notifica ANNULLATO di BATCH-02. Caso aperto: se CSI conferma che il Notificatore di Deleghe è `notify-mb` (= UNP, **INT-10**), passa da UNP anche la conferma post-COMPLETATO ([[wiki/docs/adr/ADR-012-notificatore-deleghe-post-completato\|ADR-012]]). Non va implementata prima della risposta | SRS §7.2; tracker INT-10 |
| BE-10 | I passi a-b di §7.2 (verifica preferenze, poi invio) richiedono una chiamata separata? | **No, basta l'invio.** Lo dice SRS §7.2 «Implicazioni per BATCH-02»: la verifica delle preferenze è interna a UNP, non serve una chiamata separata. Il testo dei passi a-b è quello originale. Si traccia la singola chiamata in `cons_t_traccia_serv_est` | SRS §7.2 |

## CDU-02 (cittadino)

| # | Domanda | Risposta | Riferimento |
|---|---|---|---|
| BE-11 | La Webapp Cittadino passa dal BO o chiama il BE direttamente? | **Direttamente:** SANSOL via APISAN sul SOAP `ConsensoBeService` | [[wiki/docs/adr/ADR-025-contratto-cittadino-soap-consensobeservice\|ADR-025]], SRS rev. 1.14 §4.2 |
| BE-12 | Quali delle operazioni di `ConsensoBeService` usa davvero? | Dall'audit su TEST (`csi_log_audit`, `id_app = SANSOL`, ~41.000 chiamate): consulta consenso, informativa, codifiche, notifiche, inserisci, modifica. Il riferimento di non-regressione è il WSDL completo, **10 operazioni**. **Esito verifica dev BE:** WSDL TEST = 10 operazioni (`inserisciInformativa`, undicesima, commentata anche nel legacy); SANSOL ne usa 9, tutte tranne `consultaProfilo` (solo Back Office). Si espone comunque il WSDL completo | ADR-025 §Operazioni |
| BE-13 | Come arriva `cf_delegato`? Il BE verifica l'accesso del delegato? | **Nessuna verifica BE:** la delega è verificata a monte, il BE registra solo il CF (DEV-02, CSI 25/09). Il CF del delegato arriva nella richiesta SOAP con il CF dell'utente autenticato e del cittadino. Nome del campo dal WSDL (nel documento ACC-DEL-CDU-01 è `cfDelegato`) | DEV-02; ADR-025 §Sicurezza e identità |
| BE-14 | Il flag `verificaAura` va replicato? | Contratto preservato a iso-funzionalità: il campo resta e si replica il comportamento del legacy. **Esito verifica dev BE:** campo di `consultaConsensoBe` mai letto; TODO del 2019 mai implementato; verifica AURA **sempre**; il Back Office legacy invia `false`. Nuovo servizio con lo stesso comportamento. Nessuna domanda a CSI | ADR-025 §Sicurezza e identità |
| BE-15 | Il raggruppamento per tipologia e stato lo fa il FE? | **Nessuna modifica:** FE cittadino fuori perimetro, il BE restituisce quello che restituisce il legacy (lista piatta) | [[wiki/docs/adr/ADR-021-perimetro-solo-operatore\|ADR-021]] |

## CDU-08 (operatore)

| # | Domanda | Risposta | Riferimento |
|---|---|---|---|
| BE-16 | Azienda esclusa se almeno un endpoint è dismesso o se lo sono tutti? Solo elenco o anche raccolta? | **Domanda CSI già aperta (DEV-01).** La regola adottata dal dev, «almeno un endpoint attivo per essere mostrata», va bene come provvisoria | DEV-01 |
| BE-17 | `IN_MANUTENZIONE` è stato del consenso o dell'allineamento? Cosa blocca? | **Stato dell'endpoint (allineamento)**, accanto a `IN_CORSO`/`COMPLETATO`: `PATCH /endpoints/{endp_id}/stato`, alla ripresa torna `COMPLETATO`. Blocca l'acquisizione CDU-03/09 per l'azienda e sospende BATCH-01/02; la web app mostra un messaggio di indisponibilità. **Proposta Exprivia:** stessa regola della precondizione `IN_CORSO` di CDU-09, estesa a CDU-10/11; consultazione CDU-08 libera. Modello dati da dettagliare in progettazione: decisione Exprivia, non CSI | SRS §7.4, §6.9 |
| BE-18 | Con `online = false` l'operatore può rilasciare o modificare? | **Sì.** `online = false` significa esprimibile solo de visu presso un punto di servizio assistito, e l'operatore è il Punto Assistito (`fonte_id = PASS`). Il flag limita solo il canale cittadino | SRS §8.4.5 |
| BE-19 | La tipologia «Nazionali» esiste? | **Sì:** glossario §2 (Consenso Nazionale, FSE/INI), CDU-12 (Nazionale/Regionale/Aziendale), `tipo_ente = NAZIONALE` (§8.4.6). In CDU-02 «Regionali, Aziendali» è un esempio. Nessuna logica dedicata: valore di `cons_d_tipo_cons` | SRS §2, §6.12, §8.4.6 |
| BE-20 | Le azioni ammesse le calcola il BE? | **Non è un requisito:** assente da SRS e wiki. Il FE le ricava da stato, flag `online` e stato dell'endpoint. Da non confondere con `valori_ammessi`, che è requisito ([[wiki/docs/adr/ADR-023-cdu-11-contratto-rest-valori-ammessi\|ADR-023]]) | SRS §6.8 |

---

## Effetti sulla wiki

- Corretta la formula «UNP per notifiche applicative generiche» in [[wiki/entities/notificatore-unp\|Notificatore UNP]], [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]], [[wiki/concepts/batch-processes\|Processi Batch]] e [[wiki/docs/adr/ADR-012-notificatore-deleghe-post-completato\|ADR-012]]: in V1.0 UNP = notifica ANNULLATO di BATCH-02; conferma post-COMPLETATO in attesa di INT-10.
- Nessuna nuova domanda a CSI: BE-16 confluisce in DEV-01, BE-09 in INT-10.

## Esito verifiche del dev BE (22/10/2026)

Risposte del dev BE alle verifiche chieste in BE-12, BE-14 e INT-10:

- **BE-12, chiuso:** 10 operazioni nel WSDL di TEST; l'undicesima, `inserisciInformativa`, è commentata anche nel legacy. SANSOL ne usa 9, tutte tranne `consultaProfilo`, usata dal solo Back Office. Recepito in [[wiki/docs/adr/ADR-025-contratto-cittadino-soap-consensobeservice\|ADR-025]] §Operazioni.
- **BE-14, chiuso:** `verificaAura` (richiesta `consultaConsensoBe`) non è mai letto; il TODO del 2019 non è stato implementato e la verifica AURA avviene sempre. Il Back Office legacy invia `false`. Il nuovo servizio mantiene lo stesso comportamento.
- **INT-10, resta a CSI:** nel legacy c'è un solo notificatore, `notify-mb` (`/api/v1/topics/messages`, token nell'header `x-authentication`), usato da `consprefnotifica` per l'avviso al cittadino; nessun client per un «Notificatore di Deleghe». Il client UNP di BATCH-02 usa la stessa API, quindi l'avviso post-COMPLETATO si può fare riusandolo. Solo CSI può confermare che il «Notificatore di Deleghe» sia lo stesso servizio con un altro nome ([[wiki/docs/adr/ADR-012-notificatore-deleghe-post-completato\|ADR-012]]).

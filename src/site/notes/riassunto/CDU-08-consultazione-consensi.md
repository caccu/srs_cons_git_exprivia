---
{"dg-publish":true,"permalink":"/riassunto/cdu-08-consultazione-consensi/","dg-note-properties":{}}
---

# CDU-08 — Consultazione dei consensi di un assistito

**Perimetro:** FE ✅ · BE ✅ — Riferimenti: SRS v10 §6.8 (rinvia a §6.2 CDU-02), §6.3 ALG01, §7.4; riscontro CSI 25/09/2026 (DEV-01).

## Cosa fa

È il **cruscotto dell'assistito** lato operatore: mostra lo stato di tutti i suoi consensi. Da qui partono le azioni: rilascio (CDU-09), modifica (CDU-10), cambio valore (CDU-11), scarico dell'informativa (CDU-06).

## Precondizioni

Operatore autenticato; assistito selezionato in CDU-07.

## Cosa mostra

La logica è identica al CDU-02 del cittadino. Per ogni consenso:
- nome del consenso (`desc_sotto_tipo_cons`);
- ente/ASR di riferimento (per gli aziendali);
- stato (Attivo/Acconsento, Negato, Scaduto, Annullato, oppure "non espresso");
- valore espresso;
- data di acquisizione / ultima modifica;
- informativa associata.

Raggruppamento per tipologia (Nazionali, Regionali, Aziendali) o per stato. Il clic su una riga apre il dettaglio.

Regole di presentazione (dal CDU-03 ALG01 e dal passo 2):
- **regionale**: una riga con lo stato globale;
- **aziendale**: una riga **per ogni azienda**, con il suo stato;
- vanno mostrati anche i consensi **non ancora espressi** o **ANNULLATI**, perché da qui si avvia il rilascio;
- consenso con informativa `online = false`: per il cittadino è "non esprimibile online". Per l'operatore il comportamento è un punto aperto (vedi sotto).

Azioni per riga, abilitate in base allo stato:

| Stato | Azioni |
|---|---|
| non espresso / ANNULLATO | Rilascia (CDU-09); ANNULLATO anche via Modifica (CDU-10) |
| ATTIVO / NEGATO | **Cambia valore** (CDU-11), Scarica informativa (CDU-06) |
| SCADUTO / ANNULLATO | **Modifica consenso** (CDU-10) con riaccettazione dell'informativa |
| endpoint in allineamento (`IN_CORSO`) o ASR in manutenzione | azioni di acquisizione disabilitate, con messaggio di indisponibilità |

Variante: nessun consenso espresso → messaggio informativo e invito al rilascio.

## Riferimento AS-IS

`GET /informativa/find/{cf}/{cfOperatore}` restituisce l'elenco delle informative, ognuna con `consenso_list[]` per ASR; `GET /informativa/get-asl-list/{cfOperatore}` restituisce l'elenco ASR; `GET /informativa/get-sotto-tipo-services{cf}` i sotto-tipi. Nel TO-BE il FE si adegua al nuovo BE (DEV-01). Il contratto AS-IS resta come riferimento di comportamento.

Due comportamenti AS-IS da **non** replicare così come sono:
- l'esclusione hard-coded dell'**ASR 904 (San Luigi)** decade: va ripristinata;
- l'esclusione delle aziende va legata allo **stato degli endpoint** dell'azienda (endpoint dismessi), non a codici scritti nel codice.

## Come svilupparlo

**Backend**
- Endpoint, ad esempio `GET /consensi/{cfAssistito}` (CF operatore dalla sessione). Restituisce per ogni sotto-tipo configurato e valido (`cons_d_sotto_tipo_cons`) e per ogni ASR pertinente:
  - il record corrente in `cons_t_consenso` (`data_fine IS NULL`) oppure "non espresso";
  - `tipo_stato`, `valore_consenso`, `data_acquisizione`, `d_informativa_id` + descrizione;
  - le **azioni ammesse**, calcolate dal BE (stato, `online`, `stato_allineamento`, manutenzione ASR) così il FE non duplica le regole.
- Elenco ASR: da `cons_d_asr` e `cons_r_sotto_tipo_cons_asr_endpoint` / `cons_r_asr_endpoint`, escludendo le aziende senza endpoint validi secondo la regola da definire.
- Audit della consultazione in `csi_log_audit` (operazione su dati sanitari dell'assistito).

**Frontend**
- Pagina cruscotto con intestazione assistito (dati da CDU-07), gruppi per tipologia, righe per azienda, badge di stato, pulsanti azione abilitati dal BE.
- Dettaglio consenso (pannello o pagina).
- Punto d'ingresso per CDU-06, 09, 10, 11.

## Dipendenze

CDU-07; dati configurati da CDU-12/13/14 (sotto-tipi, informative, enti, endpoint).

## Punti aperti

- Regola esatta di esclusione delle "aziende con endpoint dismessi": basta un endpoint dismesso o devono esserlo tutti? Vale solo per l'elenco o anche per la raccolta?
- `modifyToRevoked` AS-IS senza risposta CSI: chiedere di nuovo o chiudere con decisione interna.
- Comportamento per l'operatore dei consensi con `online = false`. Proposta: l'operatore **può** rilasciarli, perché è lui il punto assistito. Da confermare con CSI.

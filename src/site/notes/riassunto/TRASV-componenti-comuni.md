---
{"dg-publish":true,"permalink":"/riassunto/trasv-componenti-comuni/","dg-note-properties":{}}
---

# Componenti trasversali (riusati da più CDU)

Questi componenti vanno costruiti una volta sola e riusati. Quasi tutti i CDU operativi passano da qui.

Riferimenti: SRS v10 §2.3, §3, §4, §5, §6.4 (algoritmo canonico), §8; ADR-004, 005, 007, 008, 014, 015, 018, 021, 023.

---

## 1. Stack e infrastruttura

| Livello | Scelta |
|---|---|
| Frontend | Angular 19+, SPA servita da Apache 2.4; componenti UI QUASAR forniti da CSI (accesso al repository da concordare); accessibilità AgID WCAG 2.1 AA |
| Backend | Spring Boot ≥ 3.4.10, Java 17 (Temurin) |
| DB | PostgreSQL 18 su DBaaS Nivola, istanza per ambiente (oggi DEV e pre-produzione). Su DEV viene ribaltato il DB di TEST PG 9.6 |
| Esecuzione | IaaS Nivola (VM), **non** Kubernetes. Deploy ADA/Chef |
| Toolchain | GitLab CSI → Jenkins CI (SonarQube) → Jenkins CD → Artifactory → ADA → consegna su ASGARD |

Regole pratiche:
- credenziali (JDBC, IRIS/AURA, UNP) **mai nel repository**: variabili d'ambiente iniettate dall'infrastruttura (meccanismo segreti ancora da definire con CSI, INF-05);
- HikariCP dimensionato sul limite di connessioni DBaaS (indicativo: ≤ 40 per istanza con 2 istanze e 100 connessioni totali);
- SpringDoc/Swagger UI attivo solo negli ambienti non produttivi.

## 2. Sicurezza: due mondi distinti

**Webapp Operatore → Backend (diretto, senza API Manager)**
- L'operatore si autentica sul PUA (RUPAR/IRIDE o SPID/CIE/CNS).
- Il backend risolve il profilo con `getTokenInformation2` (AS-IS: `GET /cittadino/token/{token}`) e verifica che l'utente sia operatore (AS-IS: `/cittadino/login` risponde 200 o 403).
- **Profilo unico Operatore** sul Configuratore Regionale: copre CDU-01a, 05, 06, 07÷14. Non ci sono più due profili (Sanitario/Amministrativo e Back Office).
- Il CF dell'operatore si legge **dalla sessione**, mai dal path o dal body.

**SIA/aziende → Backend (API REST nuove: CDU-15, 16, 17, servizi endpoint)**
- Token OAuth2 `client_credentials` emesso e validato da **APIMBBONE** (Key Manager); servizi dietro l'API Gateway. Il backend non valida JWKS.
- Il Gateway inoltra in header/claim `codice_ente` (e CF). Il backend lo considera autoritativo.
- `EnteAuthorizationFilter` (Spring Security custom): se la richiesta contiene un `codice_ente` diverso da quello del Gateway → 403. Le repository applicano sempre `WHERE codice_ente = :authorizedEnte` (difesa in profondità).
- Rate limiting: lo fa APIMBBONE (Traffic Manager), non il backend.
- Audit strutturato per ogni chiamata: `client_id`, `codice_ente_requested`, `codice_ente_authorized`, `outcome`, `latency_ms`, `trace_id`. CF mai in chiaro.
- Precondizione infrastrutturale: backend REST raggiungibile **solo** dal Gateway (DEV-05, conferma formale in corso).
- `cons_t_client_ente` **non** si implementa in V1.0.

**Aziende federate (canale AS-IS)**
- Il servizio SOAP in ingresso `/services/ConsprefService` resta **a contratto invariato** (spec. WebService ConsensoRegionaleAziendale v03, namespace `http://consprefbe.csi.it/`). Va sbloccato nella configurazione di sicurezza del nuovo backend con autenticazione equivalente all'AS-IS (da verificare sul sorgente, presumibilmente certificati X509).
- Le aziende già federate restano su questo canale; il REST via APIM si affianca, non lo sostituisce.

## 3. Ciclo di vita del consenso

Valori tecnici di `tipo_stato` (chiave in `cons_d_stato`): `ATTIVO` (UI "Acconsento", valore SI), `NEGATO` (UI "Nego", valore NO), `SCADUTO`, `ANNULLATO`. Stato logico iniziale: `NON_ESPRESSO` (nessun record).

| Da | A | Chi |
|---|---|---|
| NON_ESPRESSO | ATTIVO / NEGATO | CDU-09 (o CDU-03 cittadino) |
| ATTIVO ↔ NEGATO | cambio valore | CDU-11/05 (senza riaccettare informativa) |
| ATTIVO / NEGATO | SCADUTO | BATCH-02, informativa scaduta con `annulla_consensi = false` — **non notificato** alle aziende |
| ATTIVO / NEGATO | ANNULLATO | BATCH-02, informativa scaduta con `annulla_consensi = true` — notificato alle aziende e al cittadino (UNP) |
| SCADUTO / ANNULLATO | ATTIVO / NEGATO | CDU-10 (o CDU-04 cittadino), con accettazione della nuova informativa |

Lo stato `SCADUTO` lo imposta **solo** BATCH-02 (diverso dall'AS-IS, dove poteva nascere in acquisizione). Va comunicato ai SIA.

## 4. Motore di storicizzazione (algoritmo canonico, SRS §6.4 ALG02, ADR-015)

Un consenso **non si sovrascrive mai**. Ogni modifica, in **un'unica transazione**:

1. `SELECT` del record valido su `cons_t_consenso`: `data_fine IS NULL` per `cf_cittadino` + `sotto_tipo_consenso` + `cod_asr`.
2. `UPDATE` di chiusura: `data_fine = NOW()`, `login_operazione` = CF di chi opera.
3. `INSERT` in `cons_s_consenso` con copia del record chiuso e FK `cons_id`.
4. `INSERT` del nuovo record in `cons_t_consenso`: `tipo_stato`, `valore_consenso`, `d_informativa_id`, `data_acquisizione = NOW()`, `data_fine = NULL`, `fonte_id`, `cf_delegato` (se presente), `endp_id = NULL` (valorizzato solo per consensi arrivati da SIA), `uuid`.
5. `INSERT` in `csi_log_audit` (`operazione`, `ogg_oper = 'cons_t_consenso'`, `key_oper` = id del record).
6. `INSERT` in `cons_t_notifica`, un record per ogni endpoint attivo associato al sotto-tipo in `cons_r_sotto_tipo_cons_asr_endpoint` (escludendo quelli con `stato_allineamento = 'IN_CORSO'`), con `not_stato = 'DA_INVIARE'`.

Il rilascio di un consenso nuovo (CDU-09) fa solo i passi 4, 5, 6. BATCH-02 usa la stessa logica con stato terminale SCADUTO/ANNULLATO.

Coerenza obbligatoria (§8.4.10): `cons_t_consenso.sotto_tipo_consenso` (NOT NULL) deve coincidere con `cons_d_informativa.sotto_tipo_consenso` dell'informativa referenziata. Va garantita nel codice.

**Consenso regionale**: il valore si salva N volte, una per ogni ASR collegata in `cons_r_sotto_tipo_cons_asr_endpoint`, tutte con lo stesso valore. **Consenso aziendale**: un record per coppia consenso/azienda, ogni azienda con la propria informativa.

## 5. Campi di tracciatura valorizzati dal backend

Il frontend non li invia mai:

| Campo | Operatore (CDU-09/10/11) | Cittadino (BE iso) | Batch |
|---|---|---|---|
| `fonte_id` | fonte Punto Assistito censita in `cons_d_fonte` (`PASS` etichetta logica; valore reale da verificare, es. `WA_PASS`) | fonte cittadino AS-IS (`CITT`) | invariato dal record originale |
| `login_operazione` | CF operatore da sessione PUA | CF cittadino | `BATCH-02` / `BATCH_SCADENZA_INF` |
| `ruoloop_id` | ruolo operatore PUA | NULL | — |
| `cf_delegato` | NULL | CF del delegato se in sessione di delega (ricevuto in input) | copiato |

## 6. Audit e tracciatura

- **`csi_log_audit`**: ogni evento di business (timestamp, utente, profilo, CF assistito, operazione, esito, IP, dettagli/errore, payload).
- **`cons_t_traccia_serv_est`** (tabella nuova, obbligatoria): ogni chiamata in uscita verso AURA, UNP, SIA, con request/response completi, esito, codice/descrizione errore e FK `audit_id`.
- Log applicativo SLF4J/Logback; dati personali mascherati. Il logging centralizzato su IaaS è ancora da confermare con CSI.

## 7. Integrazioni esterne

| Sistema | Protocollo | Usato da | Note |
|---|---|---|---|
| AURA | SOAP, WS-Security UsernameToken (PasswordText) con credenziali IRIS | CDU-07 | Servizi `FindProfiliAnagrafici`, `getProfiloSanitario`; WSDL da chiedere a CSI elencando i servizi. Nessuna chiamata a SistemaTS (ADR-009) |
| SIA ASR (uscita) | SOAP, WSDL AS-IS v03 invariato | BATCH-01 | SRV-03 NotificaAcquisizioneConsenso, SRV-04 NotificaRevocaConsenso (da confermare) |
| SIA ASR (ingresso) | SOAP `/services/ConsprefService` | aziende federate | contratto invariato |
| SIA ASR (ingresso REST) | REST via APIMBBONE | CDU-15/16/17, servizi endpoint | OpenAPI da produrre a cura Exprivia |
| Notificatore UNP | REST | BATCH-02 | canale scelto da UNP in base alle preferenze del cittadino |
| Notificatore di Deleghe | REST | conferma rilascio al cittadino/delegato dopo `COMPLETATO` | distinto da UNP (ADR-012) |
| Gestione Deleghe | — | nessuno | fuori perimetro |

Client SOAP: **Apache CXF** (`cxf-spring-boot-starter-jaxws`), Spring-WS solo come fallback (ADR-014).

## 8. Errori

- Formato **RFC 7807** (`application/problem+json`) per tutti i 4xx/5xx REST (ADR-018).
- Proposta in verifica CSI (DEV-04): 502 per sistema esterno irraggiungibile, 409 per vincolo DB violato, 503 per DB non disponibile. Ipotesi: applicarla solo ai servizi REST nuovi e a quelli del FE Operatore, lasciando invariati i contratti AS-IS (Webapp Cittadino, SOAP).

## 9. Form Renderer dinamico (ADR-008, ADR-023, risposta FE 01/10/2026)

Usato da CDU-09, CDU-10, CDU-11. La **struttura** del form è fissa, i **contenuti** vengono dal DB:

| Elemento | Fonte DB | Configurato in |
|---|---|---|
| Descrizione consenso | `cons_d_sotto_tipo_cons.desc_sotto_tipo_cons` | CDU-12 |
| Valori ammessi del radio (`valori_ammessi`) | `cons_r_consenso_valore` + `cons_d_valore_cons.desc_consenso` | CDU-12 (migrazione: SI/NO per tutti i sotto-tipi esistenti) |
| Descrizione estesa, Domanda, Testo aggiuntivo | `cons_r_consenso_parametro` (chiavi in `cons_d_parametro`) | CDU-12 |
| Flag `online` | `cons_d_informativa` | CDU-13 |
| Informativa (per azienda se aziendale) | `cons_d_informativa` + `cons_r_informativa_asr` | CDU-13 |

Ordine fisso dei blocchi: intestazione (consenso e azienda) → informativa (PDF) → descrizione estesa → domanda con radio → testo aggiuntivo → checkbox presa visione → Salva.

Le regole di visibilità dipendono da operazione e stato e le **calcola il backend** (campo `regole` nella risposta). Il FE non le ricalcola:

| Operazione | Stato | Valore precedente | Valore modificabile | Checkbox informativa |
|---|---|---|---|---|
| RILASCIO (09) | mai espresso / ANNULLATO | — | sì, obbligatorio | obbligatoria |
| MODIFICA (10) | SCADUTO | mostrato | sì, dopo presa visione | obbligatoria |
| MODIFICA (10) | ANNULLATO | nascosto | sì, obbligatorio | obbligatoria |
| CAMBIO_VALORE (11) | ATTIVO / NEGATO | precompilato | sì | no, informativa in sola lettura |

Contratto proposto (deciso tra team FE e BE, autorizzazione CSI DEV-01):

```
GET  /consensi/{cfAssistito}/form?sotto_tipo_consenso_id=..&cod_asr=..&operazione=RILASCIO|MODIFICA|CAMBIO_VALORE
POST /consensi/{cfAssistito}          (CDU-09)
PUT  /consensi/{cfAssistito}          (CDU-10)
PUT  /consensi/{cfAssistito}/valore   (CDU-11, già deciso in ADR-023)
```

La GET restituisce: `sotto_tipo_consenso_id`, `codice`, `descrizione`, `tipo_consenso`, `cod_asr`/`desc_asr`, `parametri{descrizione_estesa, domanda, testo_aggiuntivo}`, `valori_ammessi[]`, `stato_corrente`, `valore_corrente`, `informativa{d_informativa_id, descrizione, data_decorrenza, pdf_url}`, `regole{mostra_valore_precedente, valore_modificabile, accettazione_informativa_richiesta, informativa_sola_lettura, bloccato_allineamento}`.

Corpo dei salvataggi: `{sotto_tipo_consenso_id, cod_asr, valore_consenso, d_informativa_id, accettazione_informativa}`. Gli ultimi due sono assenti per CDU-11.

## 10. Modello dati: cosa cambia rispetto all'AS-IS

Tabelle e colonne che **non esistono nel DB AS-IS** e vanno create con gli script di migrazione TO-BE:

| Oggetto | Serve a |
|---|---|
| `cons_d_informativa.online`, `.annulla_consensi` (boolean) | CDU-09/13, BATCH-02 (deroga V03 approvata da CSI, GOV-02) |
| `cons_d_informativa.stato_elaborazione` (DA_ELABORARE / IN_ELABORAZIONE / ELABORATA) | BATCH-02 |
| `cons_d_asr.tipo_ente` (NAZIONALE / REGIONALE / AZIENDALE) | CDU-12, CDU-14 |
| `cons_r_asr_endpoint.stato_allineamento` (DA_ALLINEARE / IN_CORSO / COMPLETATO / ERRORE) | CDU-09, CDU-14, CDU-17 |
| `cons_t_notifica`: `flag_notifica_cittadino`, `num_tentativi`, `notificatore_uuid`, `notificatore_data_invio` | BATCH-01/02 |
| `cons_t_consenso` / `cons_s_consenso`: `sotto_tipo_consenso` NOT NULL, `endp_id` | tutti gli algoritmi |
| `cons_r_consenso_valore` (popolata SI/NO) | Form Renderer, CDU-12 |
| `cons_r_consenso_parametro`, `cons_d_parametro` | Form Renderer, CDU-12 |
| `cons_t_traccia_serv_est`, `cons_t_batch_errori`, `cons_d_asr_destinazione`, `cons_t_allegato`, `cons_d_allegato_tipo`, `cons_r_sotto_tipo_cons_asr_endpoint`, `cons_r_asr_endpoint` | vari CDU |
| rinomina `cons_d_valore_consenso` → `cons_d_valore_cons` | mapping nel piano di migrazione |

Indici su tutte le FK e su `cf_cittadino`. La redazione del piano di migrazione (CONSPREF-DMP) è in carico a CSI.

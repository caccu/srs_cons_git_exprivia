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
| Frontend | Angular 21, SPA servita da Apache 2.4; componenti UI QUASAR forniti da CSI (accesso al repository da concordare); accessibilità AgID WCAG 2.1 AA |
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
- **Due profili** di Back Office sul Configuratore Regionale (call CSI 28/10/2026, corregge il profilo unico del 06/08): operatore di sportello (CDU-06÷11, già censito) e profilo di configurazione (CDU-12÷14, nuovo; nome definito da CSI). CDU-01a comune; l'utente non seleziona il profilo, l'interfaccia mostra le sezioni abilitate.
- Il CF dell'operatore si legge **dalla sessione**, mai dal path o dal body.

**SIA/aziende → Backend REST (V1.0: nessun REST esposto ai SIA; CDU-15/16/17 e manutenzione solo nel codice)**
- Nessun API Manager né OAuth2 nel TO-BE V1.0 (ADR-027, approvato da CSI nella call del 05/11/2026).
- CDU-15 e CDU-16: sviluppati nel backend ma non esposti ai SIA.
- CDU-17 (snapshot) e manutenzione (`PATCH .../stato`): in V1.0 solo dall'operatore, tramite BFF (proposta A+D, ST-11; vincolo: nessun adeguamento per le ASR). Lo snapshot è un CSV identico a quello dell'allineamento massivo AS-IS. I REST per i SIA restano nel codice, non esposti. ~~Mutual TLS con servizio separato (decisione dedotta).~~
- `EnteAuthorizationFilter` (Spring Security custom): l'azienda opera solo sui propri dati. Le repository applicano sempre `WHERE codice_ente = :authorizedEnte` (difesa in profondità). ⚠️ Oggi il filtro prende il codice ente dall'header dell'API Manager, che senza API Manager nessuno imposta. In V1.0 il filtro vale solo per le rotte delle aziende (`/api/v1`), non esposte. Gli `X-APIM-*` non si scartano: senza la chiave condivisa la richiesta è rifiutata tutta con 401; con la chiave vengono letti come arrivano, quindi la chiave resta solo al BFF (rischio ST-14). Per l'operatore non c'è filtro sull'ente: il BFF passa solo il CF con la chiave condivisa e l'operatore lavora su tutte le aziende.
- Nessun rate limiting applicativo in V1.0.
- Audit strutturato per ogni chiamata: identificativo dell'azienda chiamante, `codice_ente_requested`, `codice_ente_authorized`, `outcome`, `latency_ms`, `trace_id`. CF mai in chiaro.
- Precondizione infrastrutturale: backend raggiungibile solo dal BFF, da APISAN e, per `ConsprefService`, dai sistemi delle aziende (regole di rete a carico di CSI).
- `cons_t_client_ente` **non** si implementa in V1.0.

**Aziende federate (canale AS-IS)**
- Il servizio SOAP in ingresso `/services/ConsprefService` resta **a contratto invariato** (documento CPROL v02c, maggio 2019; l'SRS cita la v03). Namespace: nel documento `http://conspref.csi.it`, nella wiki finora `http://consprefbe.csi.it/`: fa fede il WSDL reale. Va sbloccato nella configurazione di sicurezza del nuovo backend con autenticazione equivalente all'AS-IS: secondo il documento WS-Security X509 Sign and Encrypt con timestamp, un certificato per sistema ASR associato nel DB, certificato vecchio e nuovo accettati insieme durante il rinnovo (verificato sul sorgente dal team di sviluppo il 06/11/2026: firma XML e timestamp con keystore `TrustedCAKeyStore.jks`, ma **nessun legame tra certificato e azienda**, al contrario di quanto dice il documento; conflitto in ADR-027, ST-11).
- Le aziende già federate restano su questo canale. In V1.0 non c'è un REST per le aziende (proposta A+D). ~~Il REST in mutual TLS si affianca.~~

## 3. Ciclo di vita del consenso (logica TO-BE indicata da CSI, 23/11/2026)

Fonte: documento CSI «Passaggi di stato CONSPREF» V01 (wiki `sources/2026-11-23-passaggi-stato-consenso-csi`). Sostituisce il modello precedente a cinque stati (NON_ESPRESSO, ATTIVO, NEGATO, SCADUTO, ANNULLATO). Stato e valore sono separati (`cons_d_stato`, `cons_d_valore_cons`).

- **Stati:** ATT (attivo); SCA (record superato da una variazione, tiene il suo valore); ANN (annullato per cambio di informativa). I codici in `cons_d_stato` sono da definire: nel documento CSI ATT, SCA, ANN; oggi nel DB A, R, S.
- **Valori:** SI, NO, NE (non espresso, solo sui consensi annullati).
- **Mai espresso:** nessun record in `cons_t_consenso`.
- **A video:** ATT/SI «Acconsento», ATT/NO «Nego»; ANN e mai espresso «non espresso».
- Spariscono NEGATO, REVOCATO, lo SCADUTO da riaccettare e il flag `annulla_consensi`.

Passaggi:
- **Mai espresso → ATT/SI o ATT/NO:** CDU-09 (o CDU-03 cittadino).
- **ATT/SI ↔ ATT/NO:** il record precedente passa a SCA con il suo valore, il nuovo record è ATT. CDU-11/05, senza riaccettare l'informativa.
- **ATT → ANN/NE:** BATCH-02, automatico al cambio di informativa, su tutti i consensi ATT dell'informativa; notificato alle aziende con valore NE. I record SCA non cambiano.
- **ANN/NE → ATT/SI o ATT/NO:** nuova espressione con la nuova informativa. Se passa da CDU-09 (rilascio) o da CDU-10 è da chiarire con CSI (ST-18).

Da chiarire con CSI (ST-18):
- nel documento CSI l'annullamento modifica lo stesso record invece di chiuderlo e crearne uno nuovo (vedi §4);
- valore dopo l'annullamento: la mail CSI dice che resta quello del cittadino, il documento mette NE;
- cosa fare dei record R esistenti e del primo «no» che la Webapp Operatore oggi scrive R/NO (ST-17);
- se le aziende accettano NE nelle notifiche SRV-03 (oggi solo SI/NO);
- come esporre gli stati sul SOAP `ConsensoBeService` (CSI li chiede su SOAP e REST, cittadino e operatore);
- se resta la notifica UNP al cittadino sull'annullamento.

## 4. Motore di storicizzazione (algoritmo canonico, SRS §6.4 ALG02, ADR-015)

Un consenso **non si sovrascrive mai**. Ogni modifica, in **un'unica transazione**:

1. `SELECT` del record valido su `cons_t_consenso`: `data_fine IS NULL` per `cf_cittadino` + `sotto_tipo_consenso` + `cod_asr`.
2. `UPDATE` di chiusura: `data_fine = NOW()`, `login_operazione` = CF di chi opera.
3. `INSERT` in `cons_s_consenso` con copia del record chiuso e FK `cons_id`.
4. `INSERT` del nuovo record in `cons_t_consenso`: `tipo_stato`, `valore_consenso`, `d_informativa_id`, `data_acquisizione = NOW()`, `data_fine = NULL`, `fonte_id`, `cf_delegato` (se presente), `endp_id = NULL` (valorizzato solo per consensi arrivati da SIA), `uuid`.
5. `INSERT` in `csi_log_audit` (`operazione`, `ogg_oper = 'cons_t_consenso'`, `key_oper` = id del record).
6. `INSERT` in `cons_t_notifica`, un record per ogni endpoint attivo associato al sotto-tipo in `cons_r_sotto_tipo_cons_asr_endpoint` (escludendo quelli con `stato_allineamento = 'IN_CORSO'`), con `not_stato = 'DA_INVIARE'`.

Il rilascio di un consenso nuovo (CDU-09) fa solo i passi 4, 5, 6. Con la logica CSI il record chiuso al passo 2 prende lo stato SCA e tiene il suo valore (come la S chiusa di oggi). BATCH-02 usa la stessa logica per portare il consenso in ANN/NE; nel documento CSI invece l'annullamento modifica lo stesso record (da chiarire, ST-18).

Coerenza obbligatoria (§8.4.10): `cons_t_consenso.sotto_tipo_consenso` (NOT NULL) deve coincidere con `cons_d_informativa.sotto_tipo_consenso` dell'informativa referenziata. Va garantita nel codice.

**Consenso regionale**: il valore si salva N volte, una per ogni ASR collegata in `cons_r_sotto_tipo_cons_asr_endpoint`, tutte con lo stesso valore. Senza aziende collegate il salvataggio è rifiutato con errore (BE-05). I consensi regionali AS-IS migrati in un solo record sull'ASR fittizia 999 sono in attesa di decisione CSI sulla conversione (DEV-07). **Consenso aziendale**: un record per coppia consenso/azienda, ogni azienda con la propria informativa.

## 5. Campi di tracciatura valorizzati dal backend

Il frontend non li invia mai:

| Campo | Operatore (CDU-09/10/11) | Cittadino (BE iso) | Batch |
|---|---|---|---|
| `fonte_id` | fonte Punto Assistito censita in `cons_d_fonte` (`PASS` etichetta logica; `WA_PASS`, già usato (BE-01 chiuso il 24/11); nel contratto SOAP, documento CPROL v02c: `PASS` / `WA_PASS`) | fonte cittadino AS-IS (`CITT`) | invariato dal record originale |
| `login_operazione` | CF operatore da sessione PUA | CF cittadino | `BATCH-02` / `BATCH_SCADENZA_INF` |
| `ruoloop_id` | vuoto, come nel vecchio sistema che non lo ha mai scritto (decisione 24/11/2026; l'SRS chiede i dati dell'operatore, da correggere) | NULL | — |
| `cf_delegato` | NULL | CF del delegato se in sessione di delega (ricevuto in input) | copiato |

## 6. Audit e tracciatura

- **`csi_log_audit`**: ogni evento di business (timestamp, utente, profilo, CF assistito, operazione, esito, IP, dettagli/errore, payload).
- **`cons_t_traccia_serv_est`** (tabella nuova, obbligatoria): ogni chiamata in uscita verso AURA, UNP, SIA, con request/response completi, esito, codice/descrizione errore e FK `audit_id`.
- Date di audit e tracciature in ora italiana, come nel vecchio sistema (dev BE, 24/11/2026).
- Su una richiesta rifiutata (dalle aziende via SOAP o dal back office) l'audit della chiamata e la traccia della verifica su AURA restano salvati, come nel vecchio sistema (dev BE, 24/11/2026).
- Log applicativo SLF4J/Logback; dati personali mascherati. Il logging centralizzato su IaaS è ancora da confermare con CSI.

## 7. Integrazioni esterne

| Sistema | Protocollo | Usato da | Note |
|---|---|---|---|
| AURA | SOAP, WS-Security UsernameToken (PasswordText) con credenziali IRIS | CDU-07 | Servizio `FindProfiliAnagrafici` (`getProfiloSanitario` non usato, come nel vecchio back office; 24/11/2026); nessun servizio nuovo: WSDL e credenziali IRIS DEV sono già nei properties (INT-01). Chiamata solo da `rconsprefbe`. Nessuna chiamata a SistemaTS (ADR-009) |
| SIA ASR (uscita) | SOAP, WSDL AS-IS v03 invariato | BATCH-01 | SRV-03 NotificaAcquisizioneConsenso, SRV-04 NotificaRevocaConsenso (confermati, BAT-01); con la logica CSI l'annullamento va alle aziende con valore NE, che oggi SRV-03 non ammette (ST-18) |
| SIA ASR (ingresso) | SOAP `/services/ConsprefService` | aziende federate, LIS | contratto invariato (DEV-03); LIS verificato su TEST, conferma produzione a CSI (INT-07) |
| Webapp Cittadino (ingresso) | SOAP `ConsensoBeService` via APISAN | SANSOL | WSDL AS-IS, 10 operazioni, a contratto invariato (ADR-025) |
| PUA / LCCE (Configuratore) | `getTokenInformation2` (`TokenInformationService`), SOAP del legacy riusato (il REST `/login/token-information2` è nuovo e non serve); autenticazione del SOAP da confermare (INT-09: il PDF indica la basic auth solo per il REST) | CDU-01a, dal backend (come AURA) | token monouso; `applicazione` = CONSPREF, `ipBrowser` = IP del browser passato dal BFF (altrimenti `AUTH_ER_602`); SUCCESSO = abilitato; profilo in `funzionalitaAbilitate` (ST-16); CF da header IRIDE, da confrontare **sempre** con quello restituito (SOLCONFIG SDI-01 V07); indirizzi e credenziali da CSI (INT-09) |
| SIA ASR (ingresso REST) | nessuno in V1.0 (proposta A+D, ST-11) | CDU-15/16/17 e manutenzione: nel codice, non esposti (servirebbe sviluppo da parte delle ASR) | OpenAPI dei servizi della webapp a cura di Exprivia (PULL-09) |
| Notificatore UNP (`notify-mb`) | REST | BATCH-02 | in V1.0 solo la notifica di annullamento al cittadino; se resta con la logica CSI è da chiarire (ST-18); canale scelto da UNP in base alle preferenze del cittadino |
| Notificatore di Deleghe | REST | conferma rilascio al cittadino/delegato dopo `COMPLETATO` | è `notify-mb`, la stessa API dell'UNP (INT-10 chiuso il 20/11/2026); ADR-012 resta valido per il momento dell'invio |
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
| RILASCIO (09) | mai espresso / ANN | — | sì, obbligatorio | obbligatoria |
| MODIFICA (10) | ANN (se CDU-10 resta, da chiarire ST-18) | nascosto | sì, obbligatorio | obbligatoria |
| CAMBIO_VALORE (11) | ATT (SI o NO) | precompilato | sì | no, informativa in sola lettura |

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
| `cons_d_informativa.online` (boolean); `.annulla_consensi` non serve più con la logica CSI (annullamento automatico) | CDU-09/13 (deroga V03 approvata da CSI, GOV-02) |
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

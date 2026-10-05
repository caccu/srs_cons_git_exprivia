---
{"dg-publish":true,"permalink":"/riassunto/cdu-07-ricerca-assistito/","dg-note-properties":{}}
---

# CDU-07 — Ricerca assistito

**Perimetro:** FE ✅ · BE ✅ — Riferimenti: SRS v10 §6.7, §4.1, §4.2, §8.4.1; ADR-009, ADR-014.

## Cosa fa

L'operatore cerca l'assistito su cui vuole lavorare, per **codice fiscale** oppure per **cognome + nome + data di nascita**. La ricerca passa da **AURA**, l'anagrafe sanitaria regionale. Scelto l'assistito, si apre il suo cruscotto consensi (CDU-08).

## Precondizioni

Operatore autenticato via PUA (CDU-01a).

## Flusso

1. L'operatore vede la maschera di ricerca.
2. Inserisce il CF **oppure** cognome, nome e data di nascita (almeno uno dei due criteri).
3. Il backend invoca AURA: `FindProfiliAnagrafici` e `getProfiloSanitario`.
4. Nessun risultato → messaggio *"La ricerca con il filtro fornito non ha prodotto risultati"*. **Nessun fallback su SistemaTS** (eliminato, ADR-009).
5. Risultati: tabella con **Cognome, Nome, Codice Fiscale, Data di nascita, Comune di nascita, ASR di appartenenza**.
6. Con più risultati l'operatore sceglie la riga giusta (omonimi).
7. Il sistema carica il cruscotto consensi (CDU-08).

## Campi e validazioni

| Campo | Obbligatorio | Formato | Errore |
|---|---|---|---|
| codice_fiscale | condizionato | 16 caratteri alfanumerici, validazione formale CF | "Codice Fiscale non valido" |
| cognome, nome | condizionato | testo | — |
| data_nascita | condizionato | GG/MM/AAAA | — |
| Cerca | — | CF **oppure** nome+cognome+data | "Inserire almeno un criterio di ricerca" |

## Riferimento AS-IS

`GET /cittadino/find/{cf}` e `GET /cittadino/find` (nome/cognome/data via header) restituiscono `Cittadino { id_aura, codice_fiscale, cognome, nome, data_nascita, sesso, comune_nascita, asl }`.

## Come svilupparlo

**Backend**
- Client SOAP **Apache CXF** generato dal WSDL AURA (da richiedere a CSI indicando i due servizi).
- Autenticazione **WS-Security UsernameToken, PasswordText**, con credenziali IRIS fornite da CSI e iniettate da variabile d'ambiente.
- Endpoint REST, ad esempio `GET /assistiti?cf=...` oppure `GET /assistiti?cognome=&nome=&dataNascita=`, che restituisce la lista normalizzata (stessi campi del `Cittadino` AS-IS).
- Ogni chiamata AURA va tracciata in **`cons_t_traccia_serv_est`** (servizio, operazione, CF assistito, request/response, esito, errore, `audit_id`). È obbligatorio.
- Errori: AURA irraggiungibile → proposta 502 (DEV-04 in verifica); nessun risultato → lista vuota oppure 404, da concordare con il FE.
- Validazione formale del CF anche lato BE.
- Conservare in sessione/contesto l'`id_aura` e i dati anagrafici: servono poi per scrivere `cons_t_consenso` (`id_aura`, `nome`, `cognome`).

**Frontend**
- Form con due modalità mutuamente esclusive e validazione CF.
- Tabella risultati con le 6 colonne; selezione riga → navigazione al cruscotto `assistito/{cf}/consensi`.
- Messaggi di "nessun risultato" e di errore servizio.

## Dipendenze

WSDL ed endpoint AURA di test/produzione; credenziali IRIS (richiesta formale a CSI).

## Punti aperti

- Campi esatti della response AURA, per confermare la disponibilità di comune di nascita e ASR.
- Limite massimo di risultati e comportamento con troppi omonimi.

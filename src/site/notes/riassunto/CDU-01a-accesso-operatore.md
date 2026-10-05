---
{"dg-publish":true,"permalink":"/riassunto/cdu-01a-accesso-operatore/","dg-note-properties":{}}
---

# CDU-01a — Accesso dell'operatore e profilazione

**Perimetro:** FE ✅ · BE ✅ — Riferimenti: SRS v10 §2.3, §6.1; ADR-010, ADR-021; ricognizione AS-IS 22/09/2026.

## Cosa fa

È la porta d'ingresso della Webapp Operatore. L'operatore arriva dal PUA già autenticato, il sistema verifica che sia un operatore abilitato, legge il suo profilo e gli apre la webapp (ricerca assistito e Back Office).

Il CDU-01 originale comprendeva anche l'accesso del cittadino (CDU-01b) e la scelta del delegante. Qui resta **solo la parte operatore**. La verifica delle deleghe (passo 5, variante 6.1.3) **non è a carico del backend**.

## Attore e precondizioni

- Operatore, profilo unico (copre CDU-05, 06, 07÷14).
- Applicazione "Gestione Consensi BackOffice" registrata sul **Configuratore Regionale** con un unico profilo Operatore. È un prerequisito di go-live.

## Flusso

1. L'operatore apre la webapp dal PUA (RUPAR/IRIDE o SPID/CIE/CNS). Il link è diverso da quello della Webapp Cittadino.
2. Il PUA reindirizza con un token.
3. Il backend risolve il token con **`getTokenInformation2`** e ottiene CF e funzionalità abilitate.
4. Il backend verifica che il CF corrisponda a un operatore: se no risponde 403 (comportamento AS-IS di `/cittadino/login`).
5. Il frontend mostra solo le sezioni abilitate. Con il profilo unico, in pratica, sono tutte.
6. Logout / pulizia sessione.

Errori: se il PUA o il servizio token non rispondono, pagina d'errore generica senza dettagli tecnici.

## Riferimento AS-IS (da riprodurre come comportamento)

| Endpoint AS-IS | Ruolo |
|---|---|
| `GET /cittadino/login` | Legge il CF dalla sessione IRIDE (nessuna credenziale nel body), risponde `{responseServizio: 200/403, codiceFiscaleOperatore}` |
| `GET /cittadino/token/{token}` | `getTokenInformation2`, profilo operatore dopo il PUA |
| `GET /cittadino/removeFromSession` | Pulizia sessione |

Attenzione al naming: il prefisso `/cittadino` **non** indica servizi per il cittadino. Sono servizi dell'operatore che lavora *su* un cittadino. Nel TO-BE conviene rinominarli (es. `/operatore/...`): CSI ha accettato che il FE Operatore si adegui ai servizi del nuovo BE (DEV-01).

## Come svilupparlo

**Backend**
- Endpoint di risoluzione token: chiama `getTokenInformation2`, valida, crea la sessione applicativa e registra in `csi_log_audit`.
- Spring Security: il filtro di sessione protegge tutte le API della webapp. Il CF operatore va messo nel `SecurityContext` e da lì letto da tutti i CDU (mai dal path).
- Endpoint "chi sono" (CF, nome, abilitazioni) per il FE.
- Tracciare la chiamata al servizio token in `cons_t_traccia_serv_est`.

**Frontend**
- Pagina di ingresso che intercetta il token PUA, chiama il BE e conserva lo stato utente.
- Guard di routing sulle sezioni (Ricerca assistito; Configurazione: Tipi consenso, Informative, Enti/Endpoint).
- Pagina d'errore generica e logout.

## Dipendenze

Configuratore Regionale e PUA (CSI); specifiche di `getTokenInformation2`. È prerequisito di tutti gli altri CDU della webapp.

## Punti aperti

- Attributi esatti restituiti da `getTokenInformation2` e loro mappatura sul profilo unico.
- Durata della sessione e comportamento al timeout.
- Verificare che CDU-01a sia nelle stime FE: nella prima lista del team FE mancava.

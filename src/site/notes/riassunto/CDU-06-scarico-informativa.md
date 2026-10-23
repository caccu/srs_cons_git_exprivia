---
{"dg-publish":true,"permalink":"/riassunto/cdu-06-scarico-informativa/","dg-note-properties":{}}
---

# CDU-06 — Scarico / stampa dell'informativa

**Perimetro:** FE ✅ solo lato Operatore · BE ✅ servizio unico per Operatore e Cittadino — Riferimenti: SRS v10 §6.6 (rev. 1.18); ADR-022 (supera di fatto ADR-019), ADR-025; riscontro CSI 25/09/2026 (DEV-06).

## Cosa fa

Permette di scaricare o stampare il **PDF dell'informativa** associata a un consenso. Il documento è l'informativa, non un'attestazione del consenso: non contiene il valore espresso e non è firmato digitalmente (firma qualificata eIDAS non richiesta).

È l'unico CDU con **due attori**:
- **Operatore**: dalla consultazione dei consensi dell'assistito (CDU-08). Frontend in perimetro.
- **Cittadino**: dalla Webapp Cittadino esistente. Frontend fuori perimetro, ma il servizio BE va garantito a contratto invariato.

## Flusso (lato Operatore)

1. Dal cruscotto CDU-08 l'operatore individua il consenso.
2. Sceglie "Scarica PDF" o "Stampa".
3. Il backend restituisce il PDF dell'informativa.
4. Il browser scarica il file o apre la stampa.

## Scelta tecnica

Il passo 4 dell'SRS (PDF generato server-side, "Attestazione di Consenso", iText 7 o PDFBox) è **superato** dalla rev. 1.18 del 22/10/2026 e resta solo come riferimento storico: l'oggetto è l'informativa.

**Decisione (ADR-022, SRS rev. 1.18):** servire il **PDF già memorizzato** dell'informativa (`cons_d_informativa.pdf_informativa`, percorso sullo storage, oppure allegato in `cons_t_allegato`), **senza generazione**. Il contratto AS-IS `Informativa` espone già `pdf_informativa`.

Non servono librerie di generazione PDF (SRS §6.6: «Non applicabile»).

## Come svilupparlo

**Backend**
- Un solo servizio, ad esempio `GET /informative/{d_informativa_id}/pdf` (stesso URL che il Form Renderer espone come `pdf_url`). Risposta `Content-Type: application/pdf`, stream binario.
- Lato operatore: sessione PUA. Lato cittadino il backend non riceve l'identità GASP: la Webapp Cittadino passa da APISAN sul SOAP `ConsensoBeService` (ADR-025), che espone anche l'informativa. Il servizio di dominio è unico, i due canali restano distinti.
- Lettura del file dallo storage dedicato (CDU-13 lo salva e memorizza il percorso). 404 RFC 7807 se manca.
- Audit dello scarico in `csi_log_audit`.

**Frontend (Operatore)**
- Pulsanti "Scarica" e "Stampa" sulla riga/dettaglio del consenso in CDU-08 (e nel form CDU-09/10/11, dove l'informativa va visualizzata).
- Scarico blob, oppure apertura in nuova scheda e `window.print()`.
- Senza PDF le icone sono nascoste e la card mostra «PDF non disponibile» (mockup FE, R-03).

## Dipendenze

CDU-13 (caricamento PDF e storage); CDU-08.

## Punti aperti

- Confermare il modello dati di `pdf_informativa` (percorso o contenuto) sul DB AS-IS migrato. Storage su IaaS: **DEV-11** a CSI (proposta: percorso configurabile, 10 MB, nessuna cancellazione).
- ~~Riallineare il passo 4 dell'SRS~~ **Chiuso:** SRS rev. 1.18 (22/10/2026).
- ~~Contratto attuale usato dalla Webapp Cittadino per lo scarico~~ **Chiarito 21/10/2026:** SOAP `ConsensoBeService` via APISAN (ADR-025). Resta da verificare quale operazione restituisce il PDF.

---
{"dg-publish":true,"permalink":"/riassunto/cdu-06-scarico-informativa/","dg-note-properties":{}}
---

# CDU-06 — Scarico / stampa dell'informativa

**Perimetro:** FE ✅ solo lato Operatore · BE ✅ servizio unico per Operatore e Cittadino — Riferimenti: SRS v10 §6.6; ADR-022 (supera di fatto ADR-019); riscontro CSI 25/09/2026 (DEV-06).

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

L'SRS descrive al passo 4 un PDF generato server-side (logo Regione, "Attestazione di Consenso", dati assistito, delegato, data e ora di generazione, iText 7 o PDFBox). Quella struttura è marcata **[PROPOSTA] da riallineare**, perché l'oggetto è l'informativa.

**Ipotesi preferita (ADR-022):** servire il **PDF già memorizzato** dell'informativa (`cons_d_informativa.pdf_informativa`, percorso sullo storage, oppure allegato in `cons_t_allegato`), **senza generazione**. Il contratto AS-IS `Informativa` espone già `pdf_informativa`.

La generazione con iText 7 (AGPL) o Apache PDFBox (Apache 2.0) serve solo se si decidesse di comporre un documento: in quel caso l'header `Content-Disposition` previsto è `attachment; filename="consenso_[CF]_[data].pdf"`.

## Come svilupparlo

**Backend**
- Un solo servizio, ad esempio `GET /informative/{d_informativa_id}/pdf` (stesso URL che il Form Renderer espone come `pdf_url`). Risposta `Content-Type: application/pdf`, stream binario.
- Autorizzazione differenziata sullo stesso servizio: sessione PUA per l'operatore, sessione GASP/identità del cittadino per la Webapp Cittadino. Verificare l'URL e il formato usati oggi dalla Webapp Cittadino: è nell'elenco interfacce richiesto a CSI.
- Lettura del file dallo storage dedicato (CDU-13 lo salva e memorizza il percorso). 404 RFC 7807 se manca.
- Audit dello scarico in `csi_log_audit`.

**Frontend (Operatore)**
- Pulsanti "Scarica" e "Stampa" sulla riga/dettaglio del consenso in CDU-08 (e nel form CDU-09/10/11, dove l'informativa va visualizzata).
- Scarico blob, oppure apertura in nuova scheda e `window.print()`.

## Dipendenze

CDU-13 (caricamento PDF e storage); CDU-08.

## Punti aperti

- Confermare il modello dati di `pdf_informativa` (percorso o contenuto) sul DB AS-IS migrato e la posizione dello storage su IaaS.
- Riallineare il passo 4 dell'SRS (non più "Attestazione di Consenso").
- Contratto attuale usato dalla Webapp Cittadino per lo scarico.

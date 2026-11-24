---
{"dg-publish":true,"permalink":"/wiki/sources/2026-11-24-revisione-be-deck-glossario/","title":"Revisione dev BE del deck tecnico con glossario (24/11/2026)","tags":["dev-be","revisione","deck","cdu-01a","cdu-06","cdu-07","cdu-09","cdu-14","cdu-15","batch-01","unp","smtp","swagger","ruoloop-id"],"dg-note-properties":{"title":"Revisione dev BE del deck tecnico con glossario (24/11/2026)","aliases":["Revisione dev BE del deck tecnico con glossario (24/11/2026)"],"type":"source","tags":["dev-be","revisione","deck","cdu-01a","cdu-06","cdu-07","cdu-09","cdu-14","cdu-15","batch-01","unp","smtp","swagger","ruoloop-id"],"created":"2026-11-24","updated":"2026-11-24","sources":["2026-11-24-revisione-be-deck-glossario"],"related":["[[analysis-2026-05-14-punti-aperti-csi|Punti aperti CSI]]","[[2026-10-27-revisione-be-slide-domande|Revisione dev BE di slide e domande CSI (27/10/2026)]]","[[sistemi-esterni-integrati|Sistemi Esterni Integrati]]","[[batch-processes|Processi Batch]]","[[notificatore-unp|Notificatore UNP]]"]}}
---


# Revisione dev BE del deck tecnico con glossario (24/11/2026)

**Fonte:** mail del dev BE (Henri Molla, [[wiki/entities/exprivia\|Exprivia]]) del 24/11/2026 a Marco Forneris, dopo la rilettura di `presentazione/CONSPREF-presentazione-tecnica_2026-10-28_glossario.pptx` (versione del 23/11). Le affermazioni sul codice sono dichiarazioni del dev: il repository del nuovo backend non è nel workspace.

Secondo il dev, le slide su CDU-17, manutenzione, CDU-12 e modifiche al database corrispondono al sistema. Alcune slide descrivono la situazione di prima del 12/11 e del 19/11.

## Correzioni al deck

- **CDU-01a (slide 9 e 47):** non è più da sviluppare. Dal 18/11 il backend verifica il token del PUA con l'IP della postazione, confronta il codice fiscale, legge i due profili e apre la sessione. Dal 24/11 il login restituisce anche nome e cognome dell'operatore, quindi copre il «chi sono». Da CSI mancano i codici dei profili, le credenziali e gli utenti di prova. Il PUA reindirizza alla webapp, che poi chiama il BFF (non direttamente al BFF).
- **CDU-07 (slide 11 e 40):** la ricerca usa solo `FindProfiliAnagrafici`, come il vecchio back office. `getProfiloSanitario` non è usato e l'«ASR di appartenenza» non viene restituita, né oggi né nel vecchio sistema. **Decisione 24/11/2026:** si toglie, come nel vecchio back office.
- **CDU-06 (slide 15 e 47):** il 404 non c'è più. Le informative migrate si scaricano dall'indirizzo salvato in `pdf_informativa`; le nuove stanno su file system.
- **CDU-09 (slide 17):** `ruoloop_id` resta vuoto, come nel vecchio sistema, che non lo ha mai scritto (in test è vuoto su tutti i consensi). L'SRS chiede di valorizzarlo con i dati dell'operatore; il Configuratore restituisce il ruolo scelto sul PUA come codice testuale (es. `OAM`). **Decisione 24/11/2026:** resta vuoto come nell'AS-IS; l'SRS va corretto.
- **CDU-14 (slide 29, 43 e glossario):** A-01 e A-02 sono fatti dal 12/11. Dell'ente si modificano descrizione e data di fine; l'e-mail dell'endpoint si può cancellare.
- **CDU-15/16 (slide 32):** anche il 401 è nel formato standard degli errori (RFC 7807).
- **BATCH-01 (slide 36, 47 e glossario):** i ritentativi ci sono già: tre, uno per giro, poi errore permanente; un sistema che non risponde viene saltato fino al giro dopo. È la proposta EXP-06, resta solo la conferma di CSI. Da togliere la frase «nessun ritentativo automatico».
- **Integrazioni (slide 40):** il token UNP di test è quello indicato da CSI il 17/11; manca quello di produzione. In sviluppo le e-mail usano il server SMTP del vecchio sistema; per la produzione servono conferma, mittente e destinatari.
- **Stato del codice e prossimi passi (slide 46 e 47):**
  - lo snapshot in CSV c'è dal 12/11;
  - dal 16/11 il primo «no» (A/NO) è letto come NEGATO; manca solo la prova a video;
  - l'elenco dei sotto-tipi risponde correttamente, senza 404;
  - la fonte del Punto Assistito è `WA_PASS` ed è già usata: BE-01 si può chiudere.
- **Swagger (ST-01, PULL-09):** lo swagger generato dal codice c'è già e comprende snapshot e manutenzione; il dev lo esporta aggiornato e lo manda.

## Novità del 24/11/2026 (utili per SRS e wiki)

- Date di audit e tracciature scritte in ora italiana, come nel vecchio sistema (prima risultavano un'ora indietro).
- CDU-15 controlla prima i parametri: codice fiscale malformato o codice consenso inesistente danno 400, prima del controllo sull'ente (403) e della ricerca (404), come dice SRS §6.15.
- Richiesta rifiutata (dalle aziende via SOAP o dal back office): l'audit della chiamata e la traccia della verifica su AURA restano salvati, come nel vecchio sistema (prima si perdevano).
- PDF di un'informativa caricabile fino a 10 MB (prima 1 MB); oltre il limite, errore nel formato standard. Coerente con la proposta DEV-11.
- I due batch sono spenti per default: negli ambienti di deploy vanno accesi con la loro variabile.

## Impatti

- Tracker [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|analysis-2026-05-14-punti-aperti-csi]]: ST-01, PULL-09, BE-01, ST-06, EXP-06, BE-24, INT-09, ID-02, ST-16, token UNP.
- [[wiki/concepts/sistemi-esterni-integrati\|sistemi-esterni-integrati]] e [[wiki/entities/notificatore-unp\|notificatore-unp]]: AURA solo `FindProfiliAnagrafici`; token UNP di test.
- SRS da allineare (§6.7 AURA e ASR di appartenenza, `ruoloop_id` in CDU-09/10/11), nell'allineamento dedicato.

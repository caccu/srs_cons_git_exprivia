---
{"dg-publish":true,"permalink":"/wiki/sources/2026-11-27-risposte-csi-riscontro-stati-cdu17/","title":"Risposte CSI al riscontro sui passaggi di stato e su CDU-17 (27/11/2026)","tags":["csi","macchina-a-stati","consenso","att","sca","ann","non-espresso","cdu-17","snapshot","srv-04","logica-csi"],"dg-note-properties":{"title":"Risposte CSI al riscontro sui passaggi di stato e su CDU-17 (27/11/2026)","aliases":["Risposte CSI al riscontro sui passaggi di stato e su CDU-17 (27/11/2026)"],"type":"source","tags":["csi","macchina-a-stati","consenso","att","sca","ann","non-espresso","cdu-17","snapshot","srv-04","logica-csi"],"created":"2026-11-27","updated":"2026-11-27","sources":["2026-11-27-risposte-csi-riscontro-stati-cdu17"],"related":["[[csi-piemonte|CSI Piemonte]]","[[2026-11-23-passaggi-stato-consenso-csi|Passaggi di stato del consenso — logica CSI V01]]","[[2026-11-23-risposte-csi-domande-funzionali|Risposte CSI alle domande funzionali (23/11/2026)]]","[[ciclo-vita-consenso|Ciclo di vita del consenso]]","[[alternativa-batch-03-pull|Alternativa BATCH-03 — PULL CDU-17]]","[[analysis-2026-05-14-punti-aperti-csi|Punti aperti CSI]]"]}}
---


# Risposte CSI al riscontro sui passaggi di stato e su CDU-17 (27/11/2026)

**Fonte:** mail di risposta di [[wiki/entities/csi-piemonte\|CSI]] del 27/11/2026, con le risposte scritte in linea alla nostra mail a Gaia Bourlot. Incollata dall'utente il 27/11/2026. La nostra mail riprende `presentazione/Risposta_CSI_logica-stati_23_11_2026.md`, ma nella versione inviata la parte sui passaggi di stato ha 4 domande invece di 9.

## Risposte sul documento CONSPREF_REVCSI

- **2.1 Passaggi di stato.** Noi: usiamo il vostro documento come riferimento per il nuovo sistema; per Sistemi Terzi si intendono le ASR, come da voi indicato. CSI: OK.
- **2.2 Prima informativa di un'azienda.** Noi: un consenso non può passare da regionale ad aziendale, né al contrario; se un'azienda pubblica la sua prima informativa, i consensi già dati sull'informativa generale restano validi. CSI: «Non si capisce bene la domanda. Il concetto di informativa è legato ad un consenso, che può essere di tipo nazionale, regionale o aziendale. Il tipo di consenso non può cambiare e quindi l'informativa non può variare ad esempio da regionale ad aziendale o viceversa.» La seconda parte è la spiegazione di CSI e vale come risposta: il tipo di consenso non cambia, quindi l'informativa non passa da regionale ad aziendale né al contrario.
- **2.3** Noi: il Sistema invia le notifiche soltanto ai Sistemi Terzi attivi. CSI: OK.
- **2.4 e 2.5** Noi: confermiamo quanto da voi specificato. CSI: OK.
- **Altre domande**, chiarite nella riunione del 16/11. CSI: OK.

## Risposte sui passaggi di stato

1. **Valore del cittadino all'annullamento.** Noi: proposta di chiudere il record «Attivo / Sì» come «Scaduto / Sì» e creare un nuovo record «Annullato / Non espresso». CSI: «Seguire lo schema proposto nel documento Passaggi_stato_consenso_CSI.docx». La proposta non è accolta: vale lo schema di [[wiki/sources/2026-11-23-passaggi-stato-consenso-csi\|V01]], in cui lo stesso record passa da ATT/SI ad ANN/NE con la data di modifica.
2. **Codici degli stati.** Noi: «Precisiamo che gli stati verranno gestiti secondo i codici ed i valori da voi indicati (ATT, SCA, ANN con valori SI, NO, NE). Non è a carico di Exprivia l'adeguamento dei dati nel DB dei vecchi codici/valori ai codici/valori previsti dal TO-BE». CSI: OK.
3. **Annullamento verso le aziende: SRV-03 o SRV-04?** CSI: «Seguire lo schema proposto nel documento Passaggi_stato_consenso_CSI.docx». Il documento dice solo «la variazione si notifica alle aziende con valore NE» e non indica il messaggio. **Decisione Exprivia (27/11/2026):** SRV-04, perché scaduto e annullato sono congrui con la revoca.
4. **File di allineamento per un nuovo sistema aziendale (CDU-17).** Noi: il file conterrà solo i consensi attivi. CSI: «Attualmente in caso di partenza di un nuovo endpoint, la migrazione dei dati è in carico alle ASR. Vorremmo mantenere questo comportamento. Sarà cura di CSI fare un export della base dati nel caso in cui le aziende non abbiano possibilità di recuperare il pregresso. Pertanto non riteniamo necessario sviluppare questa funzionalità.»

**Approvazione di CDU-17 entro venerdì 27/11.** CSI: «In merito al CDU-17, confermiamo la gestione da backoffice di un nuovo endpoint. L'allineamento, tuttavia, andrà fatto fuori linea e pertanto non è da prevedere nel flusso di sviluppo attuale.»

## Decisioni Exprivia del 27/11/2026

- **CDU-17:** escono dal perimetro V1.0 lo snapshot (pulsante «Scarica snapshot» in CDU-14, file CSV, stati di allineamento DA_ALLINEARE, IN_CORSO e COMPLETATO, blocco delle acquisizioni) e la manutenzione dell'endpoint (`IN_MANUTENZIONE`, BE-25), parte dello stesso flusso; resta la creazione degli endpoint da CDU-14.
- **Domande della bozza non inviate a CSI:**
  - le aziende accettano il valore NE? A carico di CSI;
  - stati su `ConsensoBeService`: a carico di CSI;
  - avviso UNP al cittadino all'annullamento: resta aperto;
  - CDU-10 «Modifica consenso»: resta una funzione separata;
  - tabella dei contatti per endpoint (ST-19): la struttura è a carico di Exprivia, il resto a carico di CSI.
- **Record R già presenti:** la migrazione dei dati vecchi ai codici e valori TO-BE dello schema V01 è a carico di CSI, come da risposta al punto 2.

## Impatto sulla wiki

- [[wiki/concepts/ciclo-vita-consenso\|ciclo-vita-consenso]]: risolti i conflitti sull'annullamento (stesso record, valore NE), sui record R e sulle notifiche NE.
- [[wiki/docs/adr/ADR-015-storicizzazione-immutabile\|ADR-015]]: eccezione per l'annullamento.
- [[wiki/concepts/alternativa-batch-03-pull\|alternativa-batch-03-pull]] e [[wiki/docs/adr/ADR-006-batch-03-pull-cdu-17\|ADR-006]]: snapshot fuori perimetro V1.0.
- [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|analysis-2026-05-14-punti-aperti-csi]]: ST-18, ST-19, ST-11, PULL-09, BAT-03.

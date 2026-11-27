---
{"dg-publish":true,"permalink":"/wiki/sources/2026-11-23-risposte-csi-domande-funzionali/","title":"Risposte CSI alle domande funzionali (23/11/2026)","tags":["csi","risposte","domande-funzionali","bat-03","dev-10","dev-12","cdu-14","fe-08","notifiche","macchina-a-stati"],"dg-note-properties":{"title":"Risposte CSI alle domande funzionali (23/11/2026)","aliases":["Risposte CSI alle domande funzionali (23/11/2026)"],"type":"source","tags":["csi","risposte","domande-funzionali","bat-03","dev-10","dev-12","cdu-14","fe-08","notifiche","macchina-a-stati"],"created":"2026-11-23","updated":"2026-11-27","sources":["2026-11-23-risposte-csi-domande-funzionali"],"related":["[[csi-piemonte|CSI Piemonte]]","[[2026-11-23-passaggi-stato-consenso-csi|Passaggi di stato del consenso — logica TO-BE CSI V01]]","[[analysis-2026-05-14-punti-aperti-csi|Punti aperti CSI]]","[[ciclo-vita-consenso|Ciclo di vita del consenso]]","[[composizione-dinamica-form-consenso|Composizione dinamica del form]]"]}}
---


# Risposte CSI alle domande funzionali (23/11/2026)

**Fonte:** `raw/Domande-CSI_CONSPREF_REVCSI_v1.md` (e `.docx`), il nostro documento di domande per CSI con le risposte scritte da CSI al gruppo 2 (domande funzionali). È arrivato per mail da Gaia Bourlot ([[wiki/entities/csi-piemonte\|CSI]]) il 23/11/2026 insieme al documento [[wiki/sources/2026-11-23-passaggi-stato-consenso-csi\|Passaggi di stato del consenso V01]].

**Mail di accompagnamento (sintesi):**
- CSI risponde solo alle domande del punto 2 (requisiti funzionali);
- secondo CSI le altre (logica applicativa, infrastruttura, in attesa dell'architettura) sono già state chiarite nella riunione di lunedì 16/11/2026, di cui non abbiamo verbale;
- il documento sui passaggi di stato, scritto dalle colleghe CSI, propone un processo «più operativo e semplificato»;
- CSI aspetta un nostro riscontro.

## Risposte

### 2.1 Consensi «scaduti» e «annullati» verso le aziende (BAT-03)

**Chiedevamo:**
- conferma di quanto detto nella call del 28/10: verso le aziende solo SÌ e NO, consenso permanente al ritiro referti mai scaduto, invio a sistemi terzi fuori perimetro;
- conferma della regola «ANNULLATO inviato alle aziende come NO (revoca)».

**Risposta CSI:**
- l'invio a terzi non è fuori perimetro: i consensi vanno inviati alle aziende (ASR). Per CSI «fruitori terzi» sono le ASR;
  - CSI chiede cosa intendevamo con «fruitori terzi»: risposta nella mail del 24/11 (destinatari diversi dai sistemi delle aziende già collegati, come emerso nella call del 28/10, per esempio futuri servizi di diffusione del consenso; restano fuori perimetro); 🆕 Nella mail effettivamente inviata il testo è diverso: «Come da voi indicato per Sistemi Terzi si intende le ASR»; CSI: OK ([[wiki/sources/2026-11-27-risposte-csi-riscontro-stati-cdu17\|risposte CSI del 27/11]]);
- la regola «ANNULLATO come NO» **non è accettata**: lo stato del consenso e il valore espresso dal cittadino sono cose distinte. Quando l'informativa è annullata, «rimane comunque il valore di espressione del cittadino, ma lo stato diventa NE (non espresso)»;
- CSI rimanda al documento sui passaggi di stato, che secondo loro semplifica il lavoro ed elimina il flag «annulla consensi».

> ⚠️ **Da chiarire con CSI:** la mail dice che resta il valore del cittadino e lo stato diventa NE; il documento sui passaggi di stato mette stato ANN e valore NE. Vedi [[wiki/sources/2026-11-23-passaggi-stato-consenso-csi\|2026-11-23-passaggi-stato-consenso-csi]]. ✅ Risolto 27/11/2026: vale il documento, con ANN/NE sullo stesso record ([[wiki/sources/2026-11-27-risposte-csi-riscontro-stati-cdu17\|risposte CSI del 27/11]]).

### 2.2 Prima informativa propria di un'azienda (DEV-10)

**Chiedevamo:** se un'azienda che usava l'informativa generale (es. ASL TO5) pubblica la sua prima informativa, i consensi dei suoi assistiti sulla generale scadono o restano validi? Proposta: restano validi, la generale non scade.

**Risposta CSI:** non è possibile uno scambio tra tipologie di consenso, ad esempio da regionale ad aziendale e viceversa.

Risposta presa come definitiva (23/11/2026).

🆕 27/11/2026: CSI spiega che il consenso può essere nazionale, regionale o aziendale e che il tipo non cambia, quindi l'informativa non passa da regionale ad aziendale né al contrario ([[wiki/sources/2026-11-27-risposte-csi-riscontro-stati-cdu17\|risposte CSI del 27/11]]).

### 2.3 Quando bloccare modifica o disattivazione (DEV-12)

**Chiedevamo:** casi in cui va impedita la modifica o la disattivazione di un ente o di un endpoint (allineamento in corso, manutenzione, ultimo endpoint con consensi attivi). Fino alla risposta l'interfaccia non introduce blocchi.

**Risposta CSI:**
- non hanno capito la richiesta;
- in ogni caso gli stati devono essere riportati su entrambi i servizi esposti verso cittadino e operatore di back office (SOAP e REST).

Risposta presa come definitiva (23/11/2026): nessun blocco su modifica o disattivazione.

🆕 27/11/2026: nella mail inviata il nostro riscontro dice «il Sistema invia le notifiche soltanto ai Sistemi Terzi attivi»; CSI: OK ([[wiki/sources/2026-11-27-risposte-csi-riscontro-stati-cdu17\|risposte CSI del 27/11]]).

### 2.4 A chi va l'avviso quando si aggiunge un sistema (CDU-14)

**Chiedevamo:** conferma che l'avviso automatico all'azienda per un nuovo endpoint va per mail all'indirizzo facoltativo del nuovo endpoint (`notifica_email`, SRS rev. 1.26).

**Risposta CSI:** confermato; «sarà modificata la tabella di gestione dei contatti per endpoint».

> ⚠️ **Da chiarire con CSI:** chi modifica la tabella dei contatti per endpoint (CSI o noi)? La modifica sostituisce il campo `notifica_email` dell'endpoint?

### 2.5 Maschera di consenso composta dalla configurazione (FE-08)

**Chiedevamo:**
- se bastano campi di sola visualizzazione più la domanda SÌ/NO, o servono campi in cui l'assistito risponde;
- se le voci disponibili le fissiamo noi alla migrazione o le può aggiungere il profilo di configurazione.

**Risposta CSI:**
- l'assistito non deve rispondere a nulla: bastano campi di sola visualizzazione più la domanda;
- il profilo operatore di configurazione (back office) non può aggiungere nuovi campi.

## Impatti sulla wiki

- BAT-03: chiuso sul perimetro (invio alle ASR); la regola ANNULLATO → NO va rivista sulla [[wiki/sources/2026-11-23-passaggi-stato-consenso-csi\|logica CSI]].
- DEV-10, DEV-12, FE-08: chiusi.
- CDU-14 (avviso): destinatario confermato; resta la domanda sulla tabella dei contatti per endpoint.
- Stati da esporre anche sul SOAP `ConsensoBeService`: in conflitto con la regola «nessuno stato nuovo nel contratto SOAP» ([[wiki/sources/2026-10-27-revisione-be-slide-domande\|2026-10-27-revisione-be-slide-domande]]).
- Dettaglio nel tracker [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|analysis-2026-05-14-punti-aperti-csi]].

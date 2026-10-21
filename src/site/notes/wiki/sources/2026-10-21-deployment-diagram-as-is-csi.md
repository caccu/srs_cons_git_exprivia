---
{"dg-publish":true,"permalink":"/wiki/sources/2026-10-21-deployment-diagram-as-is-csi/","title":"Deployment diagram AS-IS CONSPREF (CSI)","tags":["as-is","deployment","infrastruttura","nivola","csi-piemonte","security-group","jboss","postgresql"],"dg-note-properties":{"title":"Deployment diagram AS-IS CONSPREF (CSI)","aliases":["Deployment diagram AS-IS CONSPREF (CSI)"],"type":"source","tags":["as-is","deployment","infrastruttura","nivola","csi-piemonte","security-group","jboss","postgresql"],"created":"2026-10-21","updated":"2026-10-21","sources":["2026-10-21-deployment-diagram-as-is-csi"],"related":["[[architettura-iaas|Architettura IaaS]]","[[sistemi-esterni-integrati|Sistemi Esterni Integrati]]","[[2026-09-22-ricognizione-endpoint-as-is|Ricognizione endpoint AS-IS — riscontro sviluppo]]","[[wiki/entities/csi-piemonte\|CSI Piemonte]]","[[analysis-2026-05-14-punti-aperti-csi|Punti Aperti CSI]]"]}}
---


# Deployment diagram AS-IS CONSPREF (CSI)

**File:** `raw/disegno csi piemonte layer.png` (titolo originale `consensi Deployment diagramNEW.png`), condiviso da [[wiki/entities/csi-piemonte\|CSI Piemonte]], ricevuto il 21/10/2026.

![disegno csi piemonte layer.png](/img/user/raw/disegno%20csi%20piemonte%20layer.png)

**Cosa rappresenta:** la topologia di produzione **attuale** (AS-IS) di CONSPREF su Nivola: bilanciatori, Apache, nodi JBoss, database, security group e sistemi esterni. Non è il TO-BE. I moduli corrispondono a quelli della [[wiki/sources/2026-09-22-ricognizione-endpoint-as-is\|ricognizione del sorgente AS-IS]]: `consprefboweb`, `consprefbe`, `consprefnotifica`, `consprefdb`.

---

## Attori

| Attore | Ingresso | Bilanciatore | Security group |
|---|---|---|---|
| Utente Regionale (operatore) | HTTPS:443 | `lb-conspref-int.nivolapiemonte.it` | SG-INT |
| Aziende Sanitarie | HTTPS:443, servizi SOAP | `lb-prd-conspref1.site01.nivolapiemonte.it` | SG-RUP |
| APISAN | **HTTP:80** | **bilanciatore assente** | SG-RUP |

Il **cittadino** non compare come attore.

---

## Componenti

### Back-office operatore — `consprefboweb`

- Apache FE `ap1/2-conspref.site01`, Location `/consprefboweb`
- JBoss 6.4 su due nodi: `jb1-conspref.site01` e `jb2-conspref.site01` (partizione `part009`), artefatto `consprefboweb.ear`, SG-APPL
- Chiamate in uscita:
  - Notificatore `https://notify.csi.it` (REST, HTTPS:443)
  - AURA: `.../sanitxens/aura/AURA.WS.AnagrafeFind.cls`, `.../sanitxens/AURA.WS.AnagrafeSanitaria.cls`
  - LCCE: `https://be-lcce-rupar.isan.csi.it/lccews/TokenInformationService`

### Backend servizi — `consprefbe`

- Apache FE `ap1/2-conspref.site01`, Location `/consprefbe-web` (ingresso Aziende Sanitarie)
- Apache BE `ap3-be-conspref.site01`, Location `/consprefbe-web` (ingresso APISAN, senza bilanciatore)
- JBoss 6.4 su due nodi: `jb1-conspref.site01` e `jb2-conspref.site01` (partizione `part010`), artefatto `consprefbe.ear`, SG-APPL
- Chiamate in uscita:
  - Notificatore `http://notify.csi.it` (REST, **HTTP:80**)
  - AURA, stessi due servizi (HTTPS:443)

### Batch — `consprefnotifica.war`

- Batch Java su `jb1-conspref.site01`, un solo nodo
- Chiamate in uscita: Aziende Sanitarie e Notificatore
- Nessun ingresso, coerente con la ricognizione: `consprefnotifica` è solo client SOAP in uscita

### Database

- PostgreSQL **9.6.10**, database `consprefdb`, «DATABASE NIVOLA», SG-DBAAS
- Accesso JDBC da `consprefboweb`, `consprefbe` e batch

---

## Riscontri con la wiki

| Punto | Esito |
|---|---|
| LIS/RIS | Nessuna integrazione nel diagramma. Coerente con [[wiki/docs/adr/ADR-020-lis-integrazione-be-esistente\|ADR-020]] e con la ricognizione |
| Notifiche alle ASR | Passano dal batch `consprefnotifica`, come BATCH-01 |
| SOAP in ingresso dalle Aziende Sanitarie | Su `consprefbe`, via SG-RUP. È il canale `/services/ConsprefService` mantenuto da CSI (DEV-03, [[wiki/sources/2026-09-25-riscontro-csi-domande-sviluppo\|riscontro 25/09/2026]]) |
| AURA | Stessi servizi `AnagrafeFind` / `AnagrafeSanitaria` già nei properties (INT-01) |
| LCCE `TokenInformationService` | Dal nome corrisponde al servizio PUA post-autenticazione `getTokenInformation2` (lettura profilo operatore) descritto in [[wiki/concepts/sistemi-esterni-integrati\|Sistemi Esterni Integrati]] §Configuratore Regionale/PUA. Da confermare (INT-09) |
| Notificatore | Il diagramma mostra un solo «NOTIFICATORE» (`notify.csi.it`). La wiki distingue Notificatore UNP e Notificatore di Deleghe ([[wiki/docs/adr/ADR-012-notificatore-deleghe-post-completato\|ADR-012]]): dal diagramma non si capisce quale dei due sia |
| Cittadino | Assente come attore. L'ipotesi è che arrivi tramite APISAN su `consprefbe`; da confermare (INT-08), collegato a INT-06 |
| DB AS-IS | PG 9.6, coerente con il ribaltamento dal DB TEST PG 9.6 e la migrazione PG9→PG18 ([[wiki/concepts/architettura-iaas\|Architettura IaaS]] §DBaaS) |

---

## Debito tecnico AS-IS

1. **JBoss EAP 6.4 e PostgreSQL 9.6** fuori supporto.
2. **APISAN** su HTTP:80 in chiaro e senza bilanciatore: singolo punto di guasto.
3. **Notificatore** chiamato in HTTP da `consprefbe` e in HTTPS da `consprefboweb`.
4. **Batch** su un solo nodo (`jb1`), senza ridondanza.

---

## Domande per CSI

Registrate nel [[wiki/analyses/analysis-2026-05-14-punti-aperti-csi\|tracker CSI]]:

- **INT-08:** chi è APISAN, quale contratto usa su `consprefbe`, e se è il canale con cui arriva la Webapp Cittadino.
- **INT-09:** conferma che LCCE `TokenInformationService` è il servizio PUA post-login e che nel TO-BE resta invariato.
- **INF-05 (esteso):** nel TO-BE IaaS si mantiene la segmentazione SG-INT / SG-RUP / SG-APPL / SG-DBAAS? L'ingresso delle ASR passa interamente da APIMBBONE, rendendo superfluo `lb-prd-conspref1` su SG-RUP?

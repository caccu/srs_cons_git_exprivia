---
{"dg-publish":true,"permalink":"/wiki/entities/regione-piemonte/","title":"Regione Piemonte","tags":["organizzazione","committente","sanita-piemonte","pubblica-amministrazione","regione"],"dg-note-properties":{"title":"Regione Piemonte","aliases":["Regione Piemonte"],"type":"entity","tags":["organizzazione","committente","sanita-piemonte","pubblica-amministrazione","regione"],"created":"2026-05-05","updated":"2026-05-14","sources":["2026-03-02-conspref-srs-v1-revised","2023-09-01-conspref-srs-01-v03"],"related":["[[CSI Piemonte]]","[[Gestione Consensi - Applicativo]]","[[GASP Salute]]"]}}
---


# Regione Piemonte

Ente committente finale del progetto [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi - Applicativo]]. Proprietaria del sistema di Sanità Elettronica Regionale di cui fa parte l'applicativo.

---

## Ruolo nel progetto

- **Committente finale** — finanzia e richiede il rifacimento applicativo
- **[[wiki/entities/csi-piemonte\|CSI Piemonte]]** è l'intermediario tecnico: gestisce infrastruttura, fornisce componenti, fa da committente tecnico verso [[wiki/entities/exprivia\|Exprivia S.p.A.]]
- Gli utenti "Operatori Sanitari/Amministrativi" appartengono alle ASR della Regione Piemonte
- I destinatari del servizio sono i **cittadini piemontesi**

La Regione non compare come attore tecnico diretto nell'SRS — il referente operativo è sempre [[wiki/entities/csi-piemonte\|CSI Piemonte]].

---

## Ecosistema Sanità Elettronica Regione Piemonte

| Sistema                                                            | Funzione                                                |
| ------------------------------------------------------------------ | ------------------------------------------------------- |
| FSE/INI                                                            | Fascicolo Sanitario Elettronico (consensi nazionali)    |
| [[wiki/concepts/gestione-consensi-applicativo\|Gestione Consensi - Applicativo]] | Gestione consensi sanitari regionali e aziendali        |
| AURA                                                               | Anagrafe Unica Regionale Assistiti                      |
| [[wiki/concepts/gasp-salute\|GASP Salute]]                                       | Identity Provider regionale SPID/CIE                    |
| SIA delle ASR                                                      | Sistemi Informativi Aziendali — oltre 10 ASR piemontesi |

---

## Obblighi normativi

I requisiti di business dell'applicativo (3 livelli consenso, propagazione regionale→aziendale, storicizzazione immutabile) riflettono obblighi di Regione Piemonte verso i cittadini ai sensi del GDPR e della normativa sanitaria nazionale.

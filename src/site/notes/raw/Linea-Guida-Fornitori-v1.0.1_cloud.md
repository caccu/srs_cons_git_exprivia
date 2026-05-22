---
{"dg-publish":true,"permalink":"/raw/linea-guida-fornitori-v1-0-1-cloud/","dg-note-properties":{}}
---

LineaGuidaFornitori.md
1 / 16
Linee guida Cloud Native per Fornitori
V 1.0.1
L'infrastruttura Cloud Native in CSI
Immagini docker CSI
Pipeline di build delle immagini in CSI
Chart CSI
Pipeline di build delle Chart in CSI
Accesso alla piattaforma Cloud Native
Glossario
L'infrastruttura Cloud Native in CSI
Il Cloud Native in CSI si implementa con una serie di nuove metodiche di sviluppo che portano a creare delle
componenti di prodotto incapsulate in container e dispiegate su una infrastruttura ECaaS (Enterprise
Container as a Service)3 ospitata su Nivola e basata su Kubernetes2 - l'orchestratore di container. Questa
infrastruttura è configurata con una serie di software di supporto come monitoraggio, storage, layer di rete,
soluzioni dedicate per gli ingress che sono brevemente descritti nel diagramma che segue.
1 / 16

LineaGuidaFornitori.md
2 / 16
Ogni progetto sarà collocato in un Namespace5 ad esso dedicato ed isolato da un punto di vista di
rete dagli altri (box verde).
Gli unici punti di ingresso al cluster e quindi al namespace passano attraverso degli IngressController6
di tipo TRAEFIK7; ci sono diverse istanze di IngressController nell'infrastuttura CSI per gestire il traffico
in ingresso da reti differenti.
I POD possono richiedere dei volumi di tipo NFS dinamicamente attraverso una StorageClass8 messa a
disposizione dalla CSI9 Trident10
I POD vengono monitorati attraverso un sistema interno costituito da Prometheus11 che fornisce le
metriche e gli alert
I log applicativi vengono mandati verso un sistema ELK12
La soluzione di rete (CNI13) del cluster si basa su Cilium14
La visibilità di rete delle risorse interne del progetto o la raggiungibilità di risorse esterne è governato
da NetworkPolicy15 gestite centralmente.
Il dispiegamento viene fatto con Helm16 e un processo di GitOps: il cluster osserva i cambiamenti del
repository di Environment del progetto e quando percepisce una variazione sul branch dell'ambiente
corrispondente procede automaticamente al roll out. La chart di progetto dovrà includere come
dipendenze le chart CSI delle tecnologie utilizzate, non è possibile dispiegare Chart esterne.
Non ci sono più, pertanto, le macchine virtuali, ma un ambiente in cluster dove vengono eseguiti i container.
Questo insieme di container, che corrispondono (nella maggioranza dei casi) alle componenti del prodotto del
progetto, sono ospitate in una area dedicata e isolata chiamata namespace.
Il cluster ha degli accessi di comunicazione di rete da e verso i diversi indirizzamenti: internet, Rupar, rete CSI,
interoperabilità interna; dal namespace sarà possibile accedere a questi accessi da parte delle componenti
architetturalmente coerenti: un web server potrà ricevere traffico da internet o un servizio API potrà esporsi
sull'accesso Rupar. Le regole di come le componenti possono esporsi sui diversi accessi sono già state
predefinite e configurate e non serve richiedere abilitazioni. Le componenti potranno accedere a spazio disco
reperito dagli storage aziendali tramite delle configurazioni scritte sulle componenti, sarà il cluster a reperire i
volumi e agganciarli automaticamente.
Più in generale la ECaaS è un sistema molto automatizzato, progettato per gestire il mondo dinamico dei
micro-servizi. L'infrastruttura ECaaS è abilitata a raggiungere tutti gli ambienti CSI, per questo è possibile
effettuare migrazioni parziali del contesto legacy, evolvendo il proprio ecosistema gradualmente.
Il processo di sviluppo sarà conseguentemente adeguato al diverso modo di compilare e pacchettizare il
codice, a come vengono gestiti questi nuovi tipi di pacchetti e a come vengono installati in produzione.
Sul cluster Cloud Native sono presenti i seguenti vincoli:
Sarà solo possibile utilizzare immagini ospitate sul Registry aziendale. Il cluster rigetterà immagini
provenienti dall'esterno. A tale proposito è possibile fornire/esportare le immagini necessarie allo
sviluppo al fine di garantire l'utilizzo delle immagini corrette.
L'elenco delle immagini disponibili è riassunto nel capitolo seguente. Le immagini di progetto possono
derivare solo dalle immagini presenti nell'elenco indicato. Ogni nuova esigenza dovrà essere
concordata con l'area Architetture.
2 / 16

LineaGuidaFornitori.md
3 / 16
Ad ogni tecnologia è associata una Chart Helm corrispondente, configurata in modo da essere
compliant con le linee guida CSI e l'infrastruttura e disponibile su repository aziendale. Il dispiegamento
dovrà essere fatto utilizzando le Chart CSI; la modalità è descritta nel capitolo seguente.
Non è possibile installare software a livello di Cluster (come ad esempio un nuovo ingress controller);
ogni eventuale esigenza deve essere progettata per tempo con l'area Architetture e Nivola ingegneria.
Non è possibile installare IngressController di tipo differente da quello presente sull'infrastruttura.
Non è possibile utilizzare Storage diverso da quello specificato.
Non è possibile utilizzare volumi di tipo host
Non è possibile installare CNI di tipo differente rispetto a Cilium
Ogni deployment dovrà avere specificate le risorse minime e richieste al sistema
Ogni deployment dovrà aver previsto degli health e readiness check con una tempistica congrua
Non è possibile installare soluzioni quali KNative, Istio o più in generale soluzioni di Network Mesh
Immagini docker CSI
Le immagini docker sono gli elementi base per lo sviluppo di soluzioni Cloud Native e occorre distinguere tra
immagini base e immagini di progetto. Le immagini base sono quelle con già installato il software necessario
come possono essere l'immagine con Java o PHP etc.; queste devono essere generiche configurabili tramite
variabili d'ambiente e costruite secondo una serie di linee guida specifiche. Le immagini di progetto sono
quelle che ospiteranno il codice sviluppato dal progetto e sono costruite utilizzando la pipeline di build del
CSI.
Registry Immagini
Le immagini docker in CSI sono ospitate sul repository degli artifatti aziendale: Artifactory (soluzione open
source di JFrog); questo è stato configurato in modo da poter essere anche esposto come Docker Registry.
La policy aziendale è quella che richiede l'utilizzo di immagini che sono state approvate, validate ed incluse
nel registry aziendale in modo da garantire l'adeguatezza delle medesime oltre che il rispetto di standard e
configurazioni aziendali.
Esistono 3 registry di cui si riassume lo scopo e le funzioni aziendali abilitati a operare:
Registry Scopo Autori
docker- Le immagini riportate da sorgenti pubbliche as-is poiché
Area Architetture/Dev Ops
trusted valutate già adeguate ad un utilizzo aziendale
Le immagini derivate da immagini pubbliche o costruite Area Architetture/Dev Ops con
docker-
internamente al CSI per fornire immagini più integrate ai alcune aree aziendali
base
bisogni interni puntualmente individuate
CI automation process su
docker- Immagini create durante il processo di continuous
controllo da parte del team di
projects integration aziendale specifiche per i progetti
progetto
3 / 16

LineaGuidaFornitori.md
4 / 16
Al fine di effettuare richieste di nuove immagini base o ufficiali occorre scrivere all'indirizzo
architetture_ai@csi.it
Immagini disponibili
Poichè i progetti devono partire dalle chart base generate dagli strumenti di automation CSI dopo che il
progetto medesimo ha descritto la propria architettura le immagini da utilizzare sono già predefinite
all'interno delle suddette chart. In caso di sviluppi che abbiano particolari necessità, come specificato
precedentemente, occorre prevedere una riunione con l'area architetture. Si elenca qui l'attuale insieme di
immagini presente nei registry CSI anche se è bene verificare sul registry specifico l'elenco aggiornato così
come la versione specifica disponibile poichè anche le versioni corrispondono a quelle definite nelle linee
guida degli stack applicativi.
Registry trusted
Le immagini dell'elenco che segue sono reperite direttamente da dockerhub e ritenute affidabili ed adeguate.
Sono ospitate nel registry denominato 'trusted' e le versioni possono essere consultate all'indirizzo docker-
trusted.ecosis.csi.it; le immagini indicate con il segno ($) devono essere considerate immagini di utilizzo
interno e non possono essere utilizzate nei progetti a meno di necessità da esporre in fase di assessment
architetturale iniziale.
adoptopenjdk
centos
gitlab/gitlab-ce ($)
hipages/php-fpm_exporter
httpd ($)
jupyter/nbviewer
lusotycoon/apache-exporter
nginx
node
osixia/openldap ($)
php
python
rasa/rasa ($)
rasa/rasa-sdk ($)
ubuntu
wheelybird/ldap-user-manager ($)
Registry base
Le immagini dell'elenco seguente sono immagini personalizzate da CSI-Piemonte al fine di rispettare standard
interni e di sicurezza pertanto sono le immagini da utilizzare genericamente per gli sviluppi; le versioni
correnti disponibili e l'elenco aggiornato sono consultabili all'indirizzo docker-base.ecosis.csi.it
activemq
aiplatform/mlflow
aiplatform/mlhub
4 / 16

LineaGuidaFornitori.md
5 / 16
aiplatform/mlworkspace
angular
ant
apache-shib
botplatform/chatcontrolapi
botplatform/csibot
botplatform/mailclassbot
botplatform/mlflowbot
botplatform/rasa-actions-csibot
globaleaks
httpd_csi
java/java5
java/java8
jboss/jboss4
jupyter
mailclassplatform/mailclassifier
mailclassplatform/mailreporter
maven
mongo
nginx
reference/spring-boot
shibboleth2-spid
shibboleth3
shibboleth3-spid
solr
spark
spring-boot-cli
swaks
tomcat
vuejs
wildfly
wordpress
zookeeper
Linee guida creazione immagini
Le immagini devono essere create seguendo le linee guida che seguono:
devono contenere delle label ben precise al fine di facilitare la classificazione
il Dockerfile deve rispettare alcune buone prassi al fine di avere delle immagini ben confezionate
Dockerfile
Il dockerfile deve essere costruito seguendo i seguenti principi:
5 / 16

LineaGuidaFornitori.md
6 / 16
occorre raggruppare tutte le operazioni di RUN, quando possibile, così da non generare un numero
eccessivo di layer e da avere una immagine di piccole dimensioni
occorre eliminare i contenuti che non devono essere conservati nell'immagine nello stesso RUN in cui
sono stati scaricati o creati (altrimenti rimarrebbero in ogni caso nel layer del RUN precedente)
occorre utilizzare quanto più possibile immagini multi-stage così da effettuare per esempio le
operazioni di build di maven nello stage di build e copiare l'artefatto java nello stage finale così da
avere una immagine piccola, senza contenuti che non servono all'esecuzione e con una superficie di
attacco minima al fine di ottimizzare la sicurezza
occorre inserire tutte le variabili d'ambiente necessarie per configurare il software e progettare questa
configurazione in modo che l'immagine possa essere utilizzata sia autonomamente con un docker run
sia sapendo che sarà inclusa in una chart di Helm; questo significa che da una parte è necessario sia
fare si che i file di configurazione siano scritti usando delle variabili d'ambiente che l'immagine
reperisce in fase di avvio del container e che anche la Chart potrà eventualmente iniettare, sia che il
medesimo file di configurazione potrebbe essere sovrascritto dalla chart tramite una config map
occorre aggiungere tutte le label indicate nel capitolo seguente
occorre indicare esplicitamente durante le installazioni di eventuali pacchetti la versione richiesta
perché deve essere certo che ogni riesecuzione della build dell'immagine in periodi differenti generi il
medesimo risultato, pertanto non si può correre il rischio che vengano introdotti dei cambiamenti nel
contenuto dell'immagine che possono portare a errori difficili da individuare.
Labels
Le immagini create dovranno contenere una serie di etichette che serviranno a identificare i container che
faranno uso di queste immagini nella fase di operation, oltre che a reperire con facilità le medesime e
classificarle appropriatamente.
Le etichette rispettano una definizione standard definita dalla OpenContainers Foundation, ma ci saranno
anche etichette derivanti dal mondo kubernetes e etichette custo per rispondere ad esigenze CSI.
Label Descrizione
date and time on which the image was built (string, date-time
org.opencontainers.image.created
as defined by RFC 3339).
Contact details of the people or organization responsible for
org.opencontainers.image.authors
the image (freeform string).
org.opencontainers.image.url URL to find more information on the image (string).
org.opencontainers.image.documentation URL to get documentation on the image (string).
org.opencontainers.image.source URL to get source code for building the image (string).
Version of the packaged software. The version MAY match a
org.opencontainers.image.version label or tag in the source code repository. Version MAY be
Semantic versioning-compatible.
org.opencontainers.image.revision Source control revision identifier for the packaged software.
6 / 16

LineaGuidaFornitori.md
7 / 16
Label Descrizione
org.opencontainers.image.vendor Name of the distributing entity, organization or individual.
License(s) under which contained software is distributed as an
org.opencontainers.image.licenses
[SPDX License Expression][spdx-license-expression].
org.opencontainers.image.ref.name Name of the reference for a target (string).
org.opencontainers.image.title Human-readable title of the image (string).
Human-readable description of the software packaged in the
org.opencontainers.image.description
image (string).
Flusso di creazione delle immagini
Il flusso implementato per la creazione delle immagini è stato quanto più automatizzato al fine di facilitare e
velocizzare il processo di sviluppo. A parte le immagini trusted, le quali vengono prese dall'esterno del CSI,
occorre distinguere la gestione delle immagini base e delle immagini di progetto: le prime sono manutenute e
gestite da un mantainer e collocate tutte in un'area GitLab dedicata. Le seconde derivano dei repository di
progetto, create automaticamente dalla pipeline descritta precedentemente.
Da un punto di vista di versioning, la strategia sarà differenziata tra immagini base e immagini di progetto:
per le prime occorre manutere contemporaneamente diverse versioni di immagine che possono dover
evolvere contemporaneamente. Per questo motivo si seguirà una strategia di branching descritta in
seguito, così da poter gestire tutte le immagini che sono necessarie al Consorzio beneficiando di una
facile integrazione con il processo automatico di GitOps
per le seconde, invece, si utilizzerà il classico branching dedicato al development, conservando il branch
master per la creazione dell'immagine corretta del progetto
In tutti i casi occorrerà utilizzare i tag di GitLab per marcare un momento specifico del rilascio. Il tag assegnato
sarà utilizzato come tag dell'immagine.
Branching e tagging delle immagini base
E' stata definita una modalità che permette di utilizzare un singolo repo che mantiene al suo interno diversi
branch, ciascuno corrispondente ad una diversa versione del software.
La gestione delle due versioni 8.5 e 9.0 di tomcat porta a:
un singolo repo chiamato per esempio tomcat
all'interno di questo repo un branch 9.0
all'interno di questo repo un branch 8.5
I vantaggi di questa modalità sono:
ad ogni software corrisponde un singolo repo, il che limita il propagarsi di più repository per la
medesima tecnologia
7 / 16

LineaGuidaFornitori.md
8 / 16
basta creare una sola volta il webhook da Gitlab verso Jenkins col quale sarà possibile gestire tutte le
versioni del software, presenti e future
molto più facile portare patch tra branch diversi del software, o fare cherry-pick di singoli commit
si riduce lo spazio utilizzato, se un file è lo stesso tra più branch ne esiste una sola copia nel repo git
Attivazione modalità branching
Per gestire questa nuova modalità è stato sfruttato il file csi.props, aggiungendo nel Jenkinsfile la gestione
della variabile REPO_BRANCH_MODE_ACTIVE. Per compatibilità con i repo esistenti, questa variabile prende il
valore di default false.
Per attivare la nuova modalità è necessario aggiungere nel file csi.props del repo sorgente la riga:
REPO_BRANCH_MODE_ACTIVE=true
Nome immagine Artifactory
Quando si lavora in modalità branching, il nome dell'immagine che viene caricata sul Registry Artifactory sarà:
repo tomcat, push su branch 9.0 → immagine tomcat:9.0-testing
repo tomcat, push su branch 8.5-feature1 → immagine tomcat:8.5-feature1-testing
repo tomcat, tag 9.0.3 su branch 9.0 → immagine tomcat:9.0.3
Inoltre, in questà modalità, vengono ignorati i push o i tag sul branch master:
repo tomcat, push o tag su branch master → errore Jenkins, nessuna immagine generata
Possibili workflow in modalità branching
Il workflow più semplice in assoluto è quello "lineare", in cui i commit vengono fatti direttamente sul branch di
lavoro:
il branch 9.0 contiene la versione stabile 9.0.x più recente, ad esempio 9.0.3
lo sviluppatore comincia ad implementare una nuova funzionalità feature1 direttamente sul branch 9.0
lo sviluppatore fa un paio di commit, poi fa un push per provare le modifiche
il webhook fa partire Jenkins che compila una immagine di test chiamata 9.0-testing e la carica su
Artifactory
lo sviluppatore prova l'immagine e se necessario fa ulteriori modifiche e prove
quando la nuova funzionalità è pronta, lo sviluppatore crea un tag 9.0.4
il webhook fa partire Jenkins che compila una immagine ufficiale chiamata 9.0.4 e la carica su
Artifactory
Questo tipo di workflow può essere valido nel caso di modifiche banali e/o pochi sviluppatori che lavorano
sull'immagine. Nel caso di molti sviluppatori o di modifiche non banali, si consiglia l'utilizzo di un feature
branch.
8 / 16

LineaGuidaFornitori.md
9 / 16
Per implementare la stessa funzionalità usando però un feature branch, il workflow diventa:
il branch 9.0 contiene la versione stabile 9.0.x più recente, ad esempio 9.0.3
lo sviluppatore crea un nuovo feature branch 9.0-feature1 a partire dal branch 9.0
lo sviluppatore comincia ad implementare la nuova funzionalità feature1 nel nuovo feature branch
appena creato
lo sviluppatore fa un paio di commit, poi fa un push per provare le modifiche
il webhook fa partire Jenkins che compila una immagine di test chiamata 9.0-feature1-testing e la
carica su Artifactory
lo sviluppatore prova l'immagine e se necessario fa ulteriori modifiche e prove
quando la nuova funzionalità è pronta, lo sviluppatore esegue un merge del feature branch sul branch
ufficiale 9.0
dopo il merging, lo sviluppatore crea un tag 9.0.4
il webhook fa partire Jenkins che compila una immagine ufficiale chiamata 9.0.4 e la carica su
Artifactory
Se fosse necessario analizzare a posteriori i sorgenti utilizzati per costruire l'immagine 9.0.4, in entrambi i
casi fa fede il tag che è stato salvato nel repository.
Linee guida per tag versioning delle immagini base
Sono state stabilite delle linee guida da utilizzare per i nomi dei tag delle immagini base:
si usano solo lettere minuscole, numeri, punti e trattini (no underscore)
i tag devono essere il più possibile parlanti ed autoesplicativi, ma allo stesso tempo non troppo lunghi
o di difficile lettura
deve essere possibile identificare immediatamente la revisione software major.minor.build
deve essere possibile identificare immediatamente eventuali info opzionali importanti (ad esempio la
versione java usata nell'immagine)
deve essere presente un numero progressivo interno CSI che "identifichi" univocamente l'immagine
le info specifiche CSI devono essere chiaramente separate dalle info non-CSI
Questo ha portato al seguente formato di tag, in cui le info sono raggruppate in blocchi successivi, separati da
trattini:
<sw_version>-<optional_info>-csi-r<progressive_csi_release_number>
Alcuni esempi di tag:
tomcat:8.5.56-csi-r1
tomcat:8.5.56-j8-csi-r1
tomcat:9.0.3-csi-r1
tomcat:9.0.3-j11-csi-r1
Per le immagini di progetto si utilizza il tagging coerente con l'evoluzione delle versioni del progetto.
Pipeline di build delle immagini in CSI
9 / 16

LineaGuidaFornitori.md
10 / 16
Il CSI ha definito un processo di automatizzazione per la creazione delle immagini partendo dal Git aziendale,
scatenato dalla push del nuovo sorgente così da non richiedere allo sviluppatore di eseguire operazioni
aggiuntive.
Dal momento della push sul repository, in pochi minuti l'immagine è disponibile sul repository.
Pipeline automatizzata
Il flusso descritto nella figura seguente riassume cosa accade ad ogni push o tag push su GitLab.
Da Gitlab il file Dockerfile e gli eventuali contenuti da includere nel context della build saranno processati da
Jenkins che provvederà a pubblicare l'immagine sul registry aziendale. Nel frattempo viene fatta le analisi di
conformità del Dockerfile, i cui report sono collocati su artifactory per la facile consultazione dello
sviluppatore
Analisi SonarQube
10 / 16

LineaGuidaFornitori.md
11 / 16
L'automatismo impostato sulle pipeline prevede anche la configurazione - all'atto della creazione del
repository della componente - di un ulteriore webhook che fa scattare una pipeline su Jenkins anche per
l'attivazione del controllo di SonarQube per l'analisi della qualità del codice. Anche in questo caso il progetto
non dve fare nulla per abilitare questa opzione che è abilitata di default e che genererà i diversi report
reperibili sul server sonarqube all'indirizzo: sonarqube.csi.it
Chart CSI
Le Chart sono artifatti usati da HELM per distribuire un applicativo in un cluster Kubernetes.
Il CSI ha scelto di distribuire i propri applicativi utilizzando delle Chart di prodotto che hanno come
dipendenze delle Chart base relative alle tecnologie utilizzate nelle componenti del prodotto.
Per cui un prodotto che ha come componenti un web server Apache un sito fatto con Angular e un backend-
for-frontend in Quarkus avrà due Chart dipendenti una per Apache e una per Quarkus.
Catalogo Chart
Come per le immagini il CSI ha scelto di utilizzare Artifactory come catalogo di Chart e di definire 2 aree dove
collocare le Chart base e le Chart di progetto.
Esistono 2 cataloghi di cui si riassume lo scopo e le funzioni aziendali abilitati a operare:
Registry Scopo Autori
helm- Le Chart costruite internamente al CSI per fornire Area Architetture/Dev Ops con alcune
base le configurazioni coerenti con la ECaaS aziendale aree aziendali puntualmente individuate
helm- Chart create durante il processo di continuous CI automation process su controllo da
projects integration aziendale specifiche per i progetti parte del team di progetto
Chart disponibili
Le Chart disponibili sono:
httpd
phpfpm
quarkus
springboot
wordpress
activemq
solr
Pipeline di build delle Chart in CSI
La pipeline di build delle Chart è la medesima delle immagini e segue le stesse regole.
11 / 16

LineaGuidaFornitori.md
12 / 16
Accesso alla piattaforma Cloud Native
Per accedere alla piattaforma Cloud Native serve avere una utenza di posta CSI.
Si può accedere:
1. tramite la console web per eseguire operazioni di controllo e analisi del proprio deployment
2. tramite strumenti come helm o kubectl per eseguire dispiegamenti a mano in ambiente di sviluppo.
Console web
Nel primo caso l'indirizzo da utilizzare è: nivola-rancher2.nivolapiemonte.it selezionando Login with
OpenLDAP ed utilizzando le proprie credenziali di posta CSI.
Dopo il login occorrerà selezionare il cluster ove si vuole operare e da li il namespace di interesse tra quelli cui
si è abilitati
12 / 16

LineaGuidaFornitori.md
13 / 16
Strumenti CLI
Per utilizzare gli strumenti da linea di comando come kubectl o helm occorre aver installato l'applicativo
Rancher CLI e aver opportunamente configurato il file kubeconfig per puntare all'LDAP CSI. Infatti è
necessario avere un appliativo che si frapponga tra quesi comandi CLI e il cluster per intercettare la chiamata,
validare la utenza e la password e passare a Rancher il token corretto così che l'operatore possa lavorare con
le corrette ACL.
Per i colleghi CSI è possibile scaricare sia la Rancher CLI sia il file kubeconfig tramite software center.
Per i consulenti, che non hanno accesso al software center aziendale, sarà necessario installare
autonomamente l'applicativo Rancher CLI e scaricare il file kubeconfig dal link
All'esecuzione del comando kubectl si dovrà scegliere l'opzione 1 OpenLDAPProvider e inserire le credenziali
di posta
13 / 16

LineaGuidaFornitori.md
14 / 16
Glossario
0
Container: Tecnologia in grado di isolare un processo software in un contesto ad esso dedicato da parte del
sistema operativo, come se fosse su un sistema ad esso totalmente dedicato
1
Immagine di container: Un file tar che contiene la copia dell'installazione del processo che verrà eseguito in
un container. L'immagine è lo stampino da cui si genera un container e pertanto garantisce che tutti i
container che partono dalla stessa immagine saranno sempre uguali a prescindere dall'ambiente dove
verranno eseguiti
2
Kubernetes: Orchestratore di containers - sviluppato inizialmente da Google - che si preoccupa di gestire il
ciclo di vita dei container e di orchestrarli su nodi differenti di un cluster di macchine fisico o virtuale. La
versione correntemente utilizzata in CSI è la 1.21
3
ECaaS: Enterprise Container as a Service - una piattaforma composta da un orchestratore di container
(tipicamente Kubernetes) arricchito di ulteriori componenti software che gestiscono funzionalità come il
monitoraggio, il backup, la sicurezza, la scalabilità etc.
14 / 16

LineaGuidaFornitori.md
15 / 16
4
GitOps: Metodica che utilizza GIT come sorgente di verità per tutte le configurazioni applicative e non solo
per conservare il sorgente. Su GIT vengono scritte tutte le configurazioni della ECaaS e dei dispiegamenti dei
prodotti software e questo consente di utilizzare dei software che leggono cosa è stato scritto su GIT o ne
monitorano le variazioni per applicare le configurazioni o le installazioni o gli aggiornamenti al software in
esercizio
5
Namespace: raggruppamento logico utilizzato da kubernetes per isolare gruppi di POD tra loro
6
IngressController: componente di kubernetes che ha lo scopo di esporre i servizi che girano all'interno del
cluster verso l'esterno e consentire il traffico dall'esterno verso la rete del cluster (una sorta di proxy dalla rete
degli host alla rete interna)
7
TRAEFIK: software che assolve al compito di IngressController con capacità di gestione del traffico sia HTTP
sia TCP
8
StorageClass: componente utilizzata da kubernetes per richiedere "volumi" da montare nei container; le
StorageClass possono fornire tipologie di storage differenti
9
CSI: Container Storage Interface: modalità di integrazione dei plugin di storage
10
Trident: CSI, fornita dalla NetApp, che fornisce il collegamento dinamico con lo storage aziendale
11
Prometheus: software di monitoraggio
12
ELK: soluzione di gestione dei log (ElasticSearch + LogStash + Kibana)
13
15 / 16

LineaGuidaFornitori.md
16 / 16
CNI: Container Network Interface: modalità di integrazione dei plugin di rete
14
Cilium: CNI fornita da IsoValent per realizzare la connettività di rete interna al cluster kubernetes
15
NetworkPolicy: regole di rete, espresse in formato YAML, che impostano la visibilità all'interno della CNI del
cluster
16
Helm: software per pacchettizare la descrizione del deployment su kuberntes e per effettuare il
dispiegamento
16 / 16
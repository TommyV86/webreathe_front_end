# webreathe_front_end

*** lancement du server front en https : http-server -S -C server.cert -K server.key ***

étapes pour avoir un server en https (si besoin):
-installer le module http server : npm install -g http-server
-generer les certificats ssl/tls auto signés : openssl req -nodes -new -x509 -keyout server.key -out server.cert

partie client où il est possible de voir les modules provenant de la base de données, d'ajouter de nouveaux modules, de consulter l'historique de panne de module
et de voir tout l'historique d'un module en detail

------- principe de fonctionnement -------

lorsque la vitesse est supérieure à 40, la température se situera entre 60 et 120 °c

si la température dépasse 100 °c, alors l'état du module sera en panne et un historique se generera avec en details l'id de l'historique, le module en question et la date de panne

toutes les 10 sec, les attributs de chaque module changeront et le degré sera conséquent selon la vitesse du module
//importer package http de node , importer le contenue d'un module require
const http = require('http'); /* on a acces a l'objet http qui nous permet de crée un serveur , on get pour recuperer*/

/*créons un nouvel objet server via la fonction createServer() , pour envoyer  une requete a se serveur cette function sera appelé*/
const server = http.createServer((request , response) => { //function fléché requete response en argument
response.end('voila la reponse du premier serveur !') // .end de l'objet ,renvoi une response L’appel à End() a mis fin à la requête active de type string.
}); 
//Démarre le serveur HTTP à l'écoute des connexions attendre les requete envoyer. 
server.listen(process.env.PORT || 3000);/*si l'environement tourne le serveur vous envoi un port a utiliser ou port 3000 part default a ecouter */
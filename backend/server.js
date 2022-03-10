//********importer package (http) de node , importer le contenue d'un module require************

const http = require('http'); /* on a acces a l'objet http qui nous permet de crée un serveur , on get pour recuperer*/
//importer app.js
const app = require('./app');

//---------------



//renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
const normalizePort = val => {
    const port = parseInt(val, 10); //parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier

    if (isNaN(port)) { //permet de déterminer si une valeur est NaN (Not a Number)
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
//----------




//Démarre le serveur HTTP à l'écoute des connexions attendre les requete envoyer. 
const port = normalizePort(process.env.PORT ||'3000');/*si l'environement tourne le serveur vous envoi un port a utiliser ou port 3000 part default a ecouter */

// indiquer sur quelle port elle vas tourner , on set le port et environement ou port (ex 3000) ('port', process.env.PORT || 3000)
app.set('port', port);


// recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur ;
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
    default:
        throw error;
    }
};
//-----------------------

/*créons un nouvel objet server via la fonction createServer() , pour envoyer  une requete a se serveur cette function sera appelé*/
const server = http.createServer(app); //une function expresse qui va recevoir la requete et la reponse de app.js qui est appeler


//un écouteur .on evenlistener d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
server.on('error', errorHandler); //evenement capture les errreur
server.on('listening', () => {  //evenement dire serveur demarer , ecouter port serveur
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
// **** aplication express require pour importer package express ********
const express =  require('express');

// appelle de la methode express (une function) permet de crée une application expresse
const app = express();

// exporter cette appaliction pour y avoir acces depuis les autre fichier de notre projet notament le server node
module.exports = app;


//--------- Middleware (Creation)-----------
//next(); // pour renvoyer vers le prochain middleware
//permet a l'application d'accedera l'api
app.use((req, res, next) => {
    // * signifie all tous le monde  a acces au serveur origin
    res.setHeader('Access-Control-Allow-Origin', '*'); //header ajouter un header aux routes  setheader sur nos response 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //autorise certaine header (en tete)sur l'objet requete
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //autorise certaine methode requete
    next();
});
//-------------


// reponse par default et donc retourn bien notre application on recoit l'objet request response et next pour passez a la suivante

// -------------ROUTE ------------// get pour recuperer tous le objet du site
app.get("/", (req ,res ) => res.send("Hello World"));
app.get('/api/sauces', (req, res, next)); //url viser (route a contacter) par l'application route http://localhost:3000



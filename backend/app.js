//importation du package d'expresse (npm)
const express =  require('express');
// importez mongoose dans votre fichier 
const mongoose = require('mongoose');
// Importation de 'Path' afin de definir les chemins
const path = require('path');
//nettoie les données d'entrée de l'utilisateur (dans req.body, req.query, req.headers et req.params) 
const { xss } = require('express-xss-sanitizer');
// proteger les données .env   
require('dotenv').config();

//importation de fichier (enregistrer notre nouveau routeur dans notre fichier app.js)
const sauceRoutes = require('./routes/sauce'); 
const userRoutes = require('./routes/user');  
//-----------------

// appelle de la methode express (une function) permet de crée une application expresse
const app = express();

// -----------conexion a la base de donnée mongoose -----------
mongoose.connect(`${process.env.DB_LOGIN_ACCOUNT}`, // DB_LOGIN_ACCOUNT identifiant utilisateur login du .env
{     
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
//---------------------

//--------Acces serveurs (CORS)

//reponse par default et donc retourn bien notre application on recoit l'objet request response et next pour passez middleware suivant
app.use((req, res, next) => { 
    // qui peut acceder a l'api '*' signifie all tous le monde  a acces au serveur origin
    res.setHeader('Access-Control-Allow-Origin', '*'); //header ajouter un header aux routes  setheader sur nos response 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //autorise certaine header (en tete)sur l'objet requete
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //autorise certaine methode requete
    next();
});

// utilisation du module----------
//acces au corp de la requete (body) et met a disposition dans le corp (acces) sur objet req (body)
app.use(express.json());// intercepte toute les requetes qui on content type json (format) 
app.use(xss());  //nettoie les données d'entrée de l'utilisateur


//Gestion des routes principales
// servir un dossier static avec cette methode , (ajouter .join) nom du dossier ou on se trouve et ajouter images
app.use('/images', express.static(path.join(__dirname, 'images')));// multer gerer les fichier (image)--- , dire a expresse de servir ce dossier images
// debut des Routes (enregistrer notre routeur pour toutes les demandes effectuées vers /api/sauces)
app.use('/api/auth', userRoutes); 
app.use('/api/sauces', sauceRoutes);
//------------------

// exporter cette application pour y avoir acces depuis les autre fichier (app.js) de notre projet notament le server node
module.exports = app;




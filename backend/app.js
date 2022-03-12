const express =  require('express'); //aplication express require pour importer package express
const mongoose = require('mongoose'); // importez mongoose dans votre fichier 
const saucesRoutes = require('./routes/sauce');//enregistrer notre nouveau routeur dans notre fichier app.js
const userRoutes = require('./routes/user');
// appelle de la methode express (une function) permet de crée une application expresse
const app = express();

// -----------conection a la base de donnée mongoose -----------
mongoose.connect('mongodb+srv://jojo:3f0kukHOv1LGYea5@cluster0.wi3rn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{     
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
//---------------------

//--------Creation de Middleware--------
//next(); // pour renvoyer vers le prochain middleware

// reponse par default et donc retourn bien notre application on recoit l'objet request response et next pour passez a la suivante
//permet a l'application d'accedera l'api

app.use((req, res, next) => { 
    // * signifie all tous le monde  a acces au serveur origin
    res.setHeader('Access-Control-Allow-Origin', '*'); //header ajouter un header aux routes  setheader sur nos response 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //autorise certaine header (en tete)sur l'objet requete
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //autorise certaine methode requete
    next();
});
//------------------

//acces au corp de la requete (body)
app.use(express.json());// intercepte toute les requetes qui on un content type json (format) et mais a disposition dans le  cors sur objet req  (body)


// enregistrer notre routeur pour toutes les demandes effectuées vers /api/sauces
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes); //route atendu par le front end
// exporter cette application pour y avoir acces depuis les autre fichier de notre projet notament le server node
module.exports = app;
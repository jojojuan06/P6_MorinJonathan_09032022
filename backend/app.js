// **** aplication express require pour importer package express ********
const express =  require('express');

// appelle de la methode express (une function) permet de crée une application expresse
const app = express();

// exporter cette appaliction pour y avoir acces depuis les autre fichier de notre projet notament le server node
module.exports = app;


//*********Creation de Middleware********
//next(); // pour renvoyer vers le prochain middleware


//permet a l'application d'accedera l'api
app.use((req, res, next) => {
    // * signifie all tous le monde  a acces au serveur origin
    res.setHeader('Access-Control-Allow-Origin', '*'); //header ajouter un header aux routes  setheader sur nos response 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //autorise certaine header (en tete)sur l'objet requete
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //autorise certaine methode requete
    next();
});


// reponse par default et donc retourn bien notre application on recoit l'objet request response et next pour passez a la suivante

//***route get pour recuperer tous le objet du site*******
app.use('/api/stuff', (req, res, next) => { //url viser (route a contacter) par l'application route http://localhost:3000
    
    //création des objet-----------
    const stuff = [
        {
            _id: 'oeihfzeoi',    //clée valeur
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900, //evite les chiffre a virgule , centimes pour eviter les erreurs d'arithmétique (calcul)
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    //------------------

    res.status(200).json(stuff); // retourne le status ex 200 pour ok pour la methode http , revoi la reponse json (body) stuff
});

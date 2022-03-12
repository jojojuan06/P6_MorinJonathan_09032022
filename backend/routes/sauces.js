// **** aplication express require pour importer package express ********
const express = require('express');

const Sauce = require('./models/sauce'); //importer de model sauce crée , pouvoir utiliser notre nouveau modèle Mongoose dans l'application, nous devons l'importer dans le fichier


// Creation d'un routeur
const router = express.Router(); // avec la methode routeur d'expresse (ex remplace app.get par router.get )

//***********  Routes  ***********

//--------POST -------- envoie la requete
router.post('/', (req, res, next) => { 
    //body correspond au model de l'objet que l'on envoi
    delete req.body._id; // enlever le champ id (envoyé par le front-end) du corp de la requete (methode delete) car mongoos le genere automatiquement
    const sauce = new Sauce({ /* creation d'une nouvelle instance  de mon objet sauce (class) de le req*/  
        ...req.body // operateur spread (...) vas copier les champ de l'objet , dans le corp de la request body
    });
    sauce.save() //methode save enregistre l'objet dans la base de donnée renvoi une promise
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))//retourne une promise asynchrone qui attend ,201 la requête a réussi avec le message
        .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)
});
//---------------


//--------Route update --------
router.put('/:id', (req, res, next) => {  // id en paramettre de route
    Sauce.updateOne({_id: req.params.id }, // egale (clée -> valeur) function pour modifier un sauces (produit) dans la base de donnée
    {...req.body,  //  spread pour recuperer le sauce (produit) qui est dans le corp de la requete (objet body)
    _id: req.params.id }) // et dire que l'id corespond a celui dees paramettre
    .then(() => res.status(200).json({message: 'Objet modifié !'})) // retourne la response 200 pour ok pour la methode http , renvoi objet modifier
    .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)
});
//---------------

//--------Route Delete --------
router.delete('/:id', (req, res, next) => {  // reagie a la requete delete id en paramettre de route
    //recuperer l'id des paramettre de route
    Sauce.deleteOne({_id: req.params.id }) // egale (clée -> valeur) function pour supprimer un sauces (produit) dans la base de donnée    
    .then(() => res.status(200).json({message: 'Objet supprimer !'})) // retourne la response 200 pour ok pour la methode http , renvoi objet modifier
    .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)
});
//---------------

//--------Get --------

//recuper un objet avec l'id (identifiant vas envoyer l'id de l'objet)
router.get('/:id', (req, res, next) => { // chercher l'identifiant dans la route , " : " dit a express cette partie de route est dynamique recuprer l'id
req.params.id // avoir acces  dans l'objet req.pams.id
Sauce.findOne({_id: req.params.id}) //trouver un objet , on pass l'objet en conparaison _id  egal le parm de req id
.then(sauce => res.status(200).json(sauce)) // retourne la response 200 pour ok pour la methode http , renvoi l'objet (un objet)si il existe dans la Bd
.catch(error => res.status(400).json({ error })); //objet non trouver
});

//route  pour recuperer les req  get tous le objet du site 
router.get('/', (req, res, next) => {    //url viser (route a contacter) par l'application route http://localhost:3000  
//création des objet-----------
Sauce.find() //trouve la liste d'objet (find) qui nous retourne une promise , envoi un tableau contenant tous les sauces dans notre base de données
    .then(sauces => res.status(200).json(sauces)) // retourne la response 200 pour ok pour la methode http , revoi le tableaux des sauces recu
    .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)
});
//------------------

//**********************

module.exports = router;  // re-exporte le router de se fichier la



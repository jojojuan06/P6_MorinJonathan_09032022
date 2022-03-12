/// Controller utilisateur------------- (contenue route utilisateur)

//enregister user dans middleware ,importer dans le fichier
const User = require('../models/User');
const bcrypt = require ('bcrypt') //importer package de cryptage

//function enregistrement de nouveaux utilisateur (Middleware d'authentification)

//crypter le mdp , cree un new user avec hash +email et enregistrer user dans la bdd
exports.signup = (req, res, next) => { //function pour crypter un mot de pass , on lui pass de mdp
    bcrypt.hash(req.body.password, 10) // 10 tour pour verifier l'algoritme (methode asyncrone)
    .then(hash => { // recuper le hash(mdp crypter)  de mdp 
        //creation du new utilisateur
        const user = new User({ //creation un nouvelle utilisateur (user) avec monggose
        email: req.body.email, // email passez l'addresse passsez dans le corp de la requete
        password :hash // enregistrer le mdp crypter (hash) pour ne pas stocker un mdp en blanc
        });
    user.save() //enregistre dans la BDD    
    .then(() => res.status(201).json({message: 'utilisateur créé !'})) //creation de ressource
    .catch(error => res.status(400).json({ error })); //impossible de se connecter au serveur
})
.catch(error => res.status(500).json({ error })); // 500 erreur serveur renvoi erreur dans objet
};  




//function login pour connecter de nouveaux utilisateur existant

exports.login = (req, res, next) => {

};

//----------------
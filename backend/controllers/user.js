/// Controller utilisateur------------- (contenue route utilisateur  POST)

//enregister user dans middleware ,importer dans le fichier
const User = require('../models/User');
const bcrypt = require('bcrypt'); //importer package de cryptage
const jwt = require('jsonwebtoken'); //crée des token et les verifier

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
    //trouver un seul utilisateur de la BD grace a (unique)    
    User.findOne({ email: req.body.email }) //on veut que email correspond a la req
    .then(user => {
    //si user (!user) n'est pas trouver  on renvoi le return message d'error
    if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    } //sinon l'user a etait trouver et on compare le mdp crypte de l'utilisateur qui se connect
    bcrypt.compare(req.body.password, user.password) // function pour comparer les mdp hash (crypter) envoyer par la req (objet body envoyer)
    // et le hash deja enregistrer
    .then(valid => {  //recoi un boolean (true false comparaison valid ou non)
        if (!valid) { //false mauvais mdp
            return res.status(401).json({ error: 'Mot de passe incorrect !' }); 
        } // sinon true on continue
        res.status(200).json({ // on verifie que la requete correspond a ce user_id
            userId: user._id, //id de l'utilisateur das la base
            // sign de jsonwebtoken pour encoder un nouveau token ;
            token: jwt.sign( //token crypter pour permettre la connection de l'utilisateur
            // cree un userid qui sera l'identifiant utilisateur du user
            { userId : user._id },// payload les donnée que le veut encoder a l'interieure de ce token (cree un objet)
            'RANDOM_TOKEN_SECRET',  // deuxieme argument clée secrete de l'encodage
            { expiresIn: '24h'} //troisieme argument (de config) apliquer une expiration du token de 24h
            ) 
        }); //connection valider
    }) 
    .catch(error => res.status(500).json({ error }));   
    })
    .catch(error => res.status(500).json({ error })); //erreur serveur (problem conenction mongo db)
};

//----------------

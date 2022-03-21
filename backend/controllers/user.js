/// Controller utilisateur------------- (contenue route utilisateur  POST)

//importer des fichier
const User = require('../models/User');
require('dotenv').config({ path:'../.env' });// proteger les donnée , adresse (path: chemin) du .env pour le process

// importe package express (npm)
const bcrypt = require('bcrypt'); //importer package de cryptage
const jwt = require('jsonwebtoken'); //crée des token et les verifier
const validator = require('validator'); //valide et nettoie uniquement les chaînes (validation de l'email)


//enregistrement de nouveaux utilisateur 

//crypter le mdp , cree un new user avec hash +email et enregistrer user dans la bdd
exports.signup = (req, res, next) => {
    const email = req.body.email; // recupere l'email du corp de la requete
    //verification de email
    if (!validator.isEmail(email)) { //si se n'est pas un email valide (validator) on retourne l'erreur
    return res.status(400).json({ error: `l'email ${email} n'est pas valide`})    
    }
    //verification du mot de passe
    const password = req.body.password;
     if (!validator.isStrongPassword(password)) { //si se n'est pas un password valide (validator) on retourne l'erreur
            return res.status(400).json({ error: `le password ${password} n'est pas valide`})    
        }
    //cryptage un mot de pass , on lui pass de mdp
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


//connecter un utilisateur existant
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
            userId: user._id, //id de l'utilisateur das la base (objet)
            // sign de jsonwebtoken pour encoder un nouveau token ;
            //creation de token---------
            token: jwt.sign( //token crypter pour permettre la connection de l'utilisateur
            // cree un userid qui sera l'identifiant utilisateur du user
            { userId : user._id },// payload les donnée que le veut encoder a l'interieure de ce token (cree un objet user id)
            process.env.SECRET_KEY,  // deuxieme argument clée secrete de l'encodage du .env qui est masqué
            { expiresIn: '24h'} //troisieme argument (de config) apliquer une expiration du token de 24h
            )  
        });
    }) 
    .catch(error => res.status(500).json({ message: `nous faisons face a cette: ${error}` }));   
    })
    .catch(error => res.status(500).json({ message: `nous faisons face a cette: ${error}` })); 
};

//----------------

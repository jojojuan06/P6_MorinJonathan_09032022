//Route utilisateur

// **** aplication express require pour importer router
const express = require('express');
const userControllers = require('../controllers/user'); // importation du controller user
const limiter = require('../middleware/rate-limit'); //importe le fichier (limiter les requete avant auth)
// Creation d'un routeur
const router = express.Router(); // avec la methode routeur d'expresse (ex remplace app.get par router.get)

//---------  Routes  -----------
//POST (envoie la requete mail /password)
router.post('/signup',limiter.auth, userControllers.signup); // recuperation de l'url du post et du contenue post (creatething(objet body))
router.post('/login', limiter.auth, userControllers.login); // adresse de la function
//-----------------

// exporter le router
module.exports = router;
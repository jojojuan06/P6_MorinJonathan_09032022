//Route utilisateur

// **** aplication express require pour importer router
const express = require('express');
const userControllers = require('../controllers/user'); // importation du controller user

// Creation d'un routeur
const router = express.Router(); // avec la methode routeur d'expresse (ex remplace app.get par router.get)

//---------  Routes  -----------
//POST (envoie la requete mail /password)
router.post('/signup', userControllers.signup); // recuperation de l'url du post et du contenue post (creatething(objet body))
router.post('/login', userControllers.login); // adresse de la function
//-----------------

// exporter le router
module.exports = router;
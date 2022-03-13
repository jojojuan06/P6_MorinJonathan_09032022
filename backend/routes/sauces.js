// **** aplication express require pour importer package express ********
const express = require('express');
const sauceControllers = require('../controllers/sauces'); // importation du controller sauce
const multer = require('../middleware/multer-config');//importe multer , gérer les fichiers entrants dans les requêtes HTTP
//-----------

// Creation d'un routeur
const router = express.Router(); // avec la methode routeur d'expresse (ex remplace app.get par router.get )

//importation du midleware d'authentification (,auth pour l'apliquer) pour chaque route que l'on veut proteger
const auth = require('../middleware/auth');

//---------  Routes  -----------

//POST (envoie la requete)
router.post('/', auth, multer, sauceControllers.createSauce ); // recuperation de l'url du post et du contenue post (createSauce(objet body))
//Update (mettre a jour)
router.put('/:id', auth, sauceControllers.modifySauce); // "/"(adresse) + id  en paramettre de route , chemin du contenue la route
//Delete (supprimer l'objet)
router.delete('/:id', auth, sauceControllers.deleteSauce); // reagie a la requete delete id en paramettre de route , applique la function a la route
//Get (recupere un / plusieurs objet(s)) , chercher l'identifiant dans la route , " : " dit a express cette partie de route est dynamique recuprer l'id, avec l'id (identifiant vas envoyer l'id de l'objet)
router.get('/:id', auth, sauceControllers.getOneSauce); // l'url du post et du contenue post (getOneSauce(objet body)) , un seul objet
router.get('/', auth, sauceControllers.getAllSauce);//url viser (route a contacter) par l'application route http://localhost:3000  ,  recupere  req(s)  get de tous le objet .

//------------

module.exports = router;  // re-exporte le router de se fichier la



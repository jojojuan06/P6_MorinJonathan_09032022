//importer de model sauce crée , pouvoir utiliser notre nouveau modèle Mongoose dans l'application, nous devons l'importer dans le fichier
const Sauce = require('../models/Sauce');

//importer acces au systeme de fichier crer (file systeme)
const fs = require('fs');

//---------controller------------- (contenue des routes)

// POST-----
exports.createSauce = (req, res, next) => {//exporter une function createSauce / contenue de la route post / creation dun post
    //Le corps de la requête contient une chaîne donc on doit le parse
    const sauceObject = JSON.parse(req.body.sauce);//extraire l'objet json
    //body correspond au model de l'objet que l'on envoi
    delete sauceObject._id;// enlever le champ id (envoyé par le front-end) du corp de la requete (methode delete) car mongoos le genere automatiquement
    const sauce = new Sauce({/* creation d'une nouvelle instance  de mon objet sauce (class) de le req*/  
    ...sauceObject,// operateur spread (...) vas copier les champ de l'objet , dans le corp de la request 
    //http ou https puis le host de notre server (localhost:3000), la racine du serveur
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//adresse de l'image en interpolation  host(nom de domaine ou ad ip)
    });
    sauce.save()//methode save enregistre l'objet dans la base de donnée renvoi une promise
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))//retourne une promise asynchrone qui attend ,201 la requête a réussi avec le message
    .catch(error => res.status(400).json({ error }));// capture l'erreur et renvoi un message erreur (egale error: error)
};
//---------

// PUT (modifier / mise a jour de l'objet) -----

exports.modifySauce = (req, res, next) => {//exporter une function createsauce / contenue de la route post / creation dun post
    //test le cas de figure ou on se trouve
    const sauceObject = req.file ?//si req.file exist (ternaire)
        {
        ...JSON.parse(req.body.sauce),//si il exist il faut le prendre en compte  l'ojet du produit
        //on genere une nouvelle image url
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//adresse de l'image en interpolation 
        } : { ...req.body };//sinon il n'exite pas on copie l'objet (corp de la requete)
    Sauce.updateOne({ _id: req.params.id }, // egale (clée -> valeur) function pour modifier un sauces (produit) dans la base de donnée
        { ...sauceObject, _id: req.params.id })//pour correspondre a l'id des param de la req et dire que l'id corespond a celui des paramettre
    //spread pour recuperer le sauce (produit) qui est dans le corp de la requete que l'on a cree et on modifier sont identifiant
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))// retourne la response 200 pour ok pour la methode http , renvoi objet modifier
        .catch(error => res.status(400).json({ error }));// capture l'erreur et renvoi un message erreur (egale error: error)
};

//---------------

// DELETE (supprimer / suppression de l'objet) -----

exports.deleteSauce = (req, res, next) => {
    // allez le chercher et avoir l'url de l'image pour la supprimer (cherche le produit)
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {  //recuperer un sauce (produit) dans le callback (function de rapelle)
        //split retourne un tableaux de que qu'il y a avant  /image , apres /image
        const filename = sauce.imageUrl.split('/images/')[1];//extraire le fichier , recup l'image url du produit retourner par la base,le2eme pour avoir le nom du fichier
        // package fs , unlike pour supprimer un fichier (1 arg(chemin fichier , 2 arg(callback apres supprimer)))
        fs.unlink(`images/${filename}`, () => { //filename fait reference au dossier image
        //recuperer l'id des paramettre de route ,si oui on effectue la suppression
        Sauce.deleteOne({_id: req.params.id }) // egale (clée -> valeur) function pour supprimer un sauces (produit) dans la base de donnée    
        .then(() => res.status(200).json({message: 'Objet supprimer !'})) // retourne la response 200 pour ok pour la methode http , renvoi objet modifier
        .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)   
    }); 
})
.catch(error => res.status(500).json({ error })); //erreur serveur
// recupere le sauce dans la base
Sauce.findOne({ _id:req.params.id }) //trouver id a celui qui est dans les parametres de la req
.then(
    //on verifier q'uil appartient bien  a la personne qui effectuer la req
    (sauce) => {
        if (!sauce) {
            return res.status(404).json({
                error: new Error('Objet non trouvé')
            });
        }
        // verifier que seulement la personne qui detient l'objet peu le supprimer
        if (sauce.userId !== req.auth.userId) { //different de req.auth
            return res.status(401).json({ //probleme authentification
                error: new Error('Requete non autorisé !')
            });   
        }
    }
);
};

//---------------


// GET (recuperation / recuperer le/les l'objet) -----

// recuperer  un objet
exports.getOneSauce = (req, res, next) => { 
    req.params.id // avoir acces  dans l'objet req.pams.id
    Sauce.findOne({_id: req.params.id}) //trouver un objet , on pass l'objet en conparaison _id  egal le parm de req id
    .then(sauce => res.status(200).json(sauce)) // retourne la response 200 pour ok pour la methode http , renvoi l'objet (un objet)si il existe dans la Bd
    .catch(error => res.status(400).json({ error })); //objet non trouver
}

// recuperer  les objet
exports.getAllSauce = (req, res, next) => {    
    //création des objet-----------
    Sauce.find() //trouve la liste d'objet (find) qui nous retourne une promise , envoi un tableau contenant tous les sauces dans notre base de données
        .then(sauces => res.status(200).json(sauces)) // retourne la response 200 pour ok pour la methode http , revoi le tableaux des sauces recu
        .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)
    }
//----------------

// POST-- LIKE / DISLIKE UNE SAUCE
exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId; // chercher user id dans le corp de la requete
    const like = req.body.like; // chercher like dans le corp de la requete
    const sauceId = req.params.id;// chercher id de la sauce dans le corp de la requete
    Sauce.findOne({ _id: sauceId })
        .then(sauce => {
            // nouvelles valeurs à modifier
            const newValues = {
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked,
                likes: 0, // mais zero par default
                dislikes: 0 // mais zero par default
            }
            // Différents cas:
            switch (like) {
                case 1:  // CAS: sauce liked
                if (newValues.usersLiked.includes(req.auth.userId) ) { //si userlikes inclus user id descrypter avec le token alors on eux peu pas fait d'action (et pas deja like)
                    return res.status(403).json({ message: 'Requete non autorisé !'}) //indique qu'un serveur comprend la requête mais refuse de l'autoriser.
                }
                    newValues.usersLiked.push(userId);  //dans le cas ajouter un like
                    break;
                case -1:  // CAS: sauce disliked
                if (newValues.usersDisliked.includes(req.auth.userId) ) { // si userdislike  inclue userid authentifier
                    return res.status(403).json({ message: 'Requete non autorisé !'}) 
                }
                    newValues.usersDisliked.push(userId); //dans le cas enleve un like il push dans unlike
                    break;
                case 0:  // CAS: Annulation du like/dislike
                // si userlike  et user dislike (n'a pas fait d'action) n'inclue pas  userid authentifier alors tu n'est pas autoriser
                    if (!newValues.usersLiked.includes(req.auth.userId) && !newValues.usersDisliked.includes(req.auth.userId) ) { 
                        return res.status(403).json({ message: 'Requete non autorisé !'}) 
                    }             
                    if (newValues.usersLiked.includes(userId)) { //include cherche dans un tableaux zero
                        // si on annule le like
                        const index = newValues.usersLiked.indexOf(userId); // renvoie le premier indice pour lequel on trouve un élément donné 
                        newValues.usersLiked.splice(index, 1); //modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant 
                    } else {
                        // si on annule le dislike
                        const index = newValues.usersDisliked.indexOf(userId);// renvoie le premier indice pour lequel on trouve un élément donné 
                        newValues.usersDisliked.splice(index, 1); //splice modifie le contenu d'un tableau 
                    }
                    break;
            };
            // Calcul du nombre de likes / dislikes
            newValues.likes = newValues.usersLiked.length;
            newValues.dislikes = newValues.usersDisliked.length;
            // Mise à jour de la sauce avec les nouvelles valeurs
            Sauce.updateOne({ _id: sauceId }, newValues )
                .then(() => res.status(200).json({ message: 'Sauce notée !' }))
                .catch(error => res.status(400).json({ error }))  
        })
        .catch(error => res.status(500).json({ error }));
}   
//----------------
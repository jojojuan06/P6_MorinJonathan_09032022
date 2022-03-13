//protéger les routes sélectionnées et vérifiera que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes.

// package verification require
const jwt = require('jsonwebtoken'); //crée des token et les verifier

//exportation d'un middleware
module.exports = (req, res, next) => {
    //permet de capturer plusieur erreur 
    try {
    //split divise une chaîne de caractères en une liste ordonnée de sous-chaînes, place ces sous-chaînes dans un tableau et retourne le tableau.
    const token = req.headers.authorization.split(' ')[1];  //retourner un tableau bearer  1 element , token 2 element (que l'on recupere)
    //decoder le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // function pour verifier le token et le token deja crée
    //il fois decoder il devient un objet classique pour le recuperer
    const userId = decodedToken.userId; // recuperer le userid qui est a l'interieure
    // verifier que la requete correspond a celle du token
    // si userid dans le corp de la req et que celuici et different de userId
    if (req.body.userId && req.body.userId !== userId)  {
        throw 'User iD non valable !'; //pour renvoyer l'erreur
    } else { //si tout vas bien
        next(); // on pass la req au middleware suivant
    }
    } catch (error) {
        res.status(401).json({ error: error | 'Requete non authentifiée !' })  // '|' signifier ou (sinon) sur un autre erreur le msg
    };
}
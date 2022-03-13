//gerer les fichier

//importer multer
const multer = require('multer');

// dictionnaire types , generer extension du ficher img/jpg , img/png
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};


//creation d'un ojbet de configuration pour multer (avec deux arguments)
const storage = multer.diskStorage({ //function de multer pour enr sur le disk
    destination: (req, file, callback) => {  //expliquer a multer dans quel dossier enr les fichier
    //apelle du callback
    callback(null, 'images');
    },
    //expliquer quel nom de fichier utiliser
    filename: (req, file, callback) => { 
        // cree sont nom avant extension (nom origine)
        const name = file.originalname.split(' ').join('_'); //split cree un tableaux des string et join qui remplace les espace par les "_"
        // utiliser le mime type pour generer l'extension du fichier
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); // date.now vas ajouter un timestamp (delai)
    }
});

module.exports = multer({storage: storage}).single('image'); //fichier unique et on explique a multer qui sagit d'img uniquement

// importez mongoose dans votre fichier (pour utiliser des schema)
const mongoose = require('mongoose');


//permet de créer un schéma de données pour votre base de données MongoDB
const sauceSchema = mongoose.Schema({
userId: { type: String, required: true },//require true champ requis
name: {type : String, require:true }, 
manufacturer: { type: String, required: true },
description : { type: String, required: true },
mainPepper : { type: String, required: true },
imageUrl : { type: String, required: true },
heat : { type: Number, required: true },
// pas obliger de like ou dislike
likes : { type: Number , default: 0}, 
dislikes : { type: Number , default: 0}, //par default 0 
usersLiked : { type: Array , default: [] }, 
usersDisliked : { type: Array, default: [] }, //par default tableaux vide
//-------
});

// model  transforme ce modèle en un modèle utilisable (nom du model,schema)
module.exports = mongoose.model('Sauce', sauceSchema);
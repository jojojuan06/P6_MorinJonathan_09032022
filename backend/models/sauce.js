// importez mongoose dans votre fichier 
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
likes : { type: Number },
dislikes : { type: Number },
usersLiked : { type: Array }, 
usersDisliked : { type: Array}, 
//-------
});

// model  transforme ce modèle en un modèle utilisable (nom du model,schema)
module.exports = mongoose.model('Sauce', sauceSchema);
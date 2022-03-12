// importez mongoose dans votre fichier 
const mongoose = require('mongoose');


//permet de créer un schéma de données pour votre base de données MongoDB
const saucesSchema = mongoose.Schema({
userId: { type: String, required: true },//require true champ requis
name: {type : String, require:true }, 
manufacturer: { type: String, required: true },
description : { type: String, required: true },
mainPepper : { type: String, required: true },
imageUrl : { type: String, required: true },
heat : { type: Number, required: true },
likes : { type: Number, required: true },
dislikes : { type: Number, required: true },
usersLiked : [ "String <userId>" ] ,
usersDisliked : [ "String <userId>" ] 
});

// model  transforme ce modèle en un modèle utilisable (nom du model,schema)
module.exports = mongoose.model('Sauce', saucesSchema);
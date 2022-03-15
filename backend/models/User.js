// faciliser les tache ecriture lecture de mongo DB

// importez mongoose dans votre fichier 
const mongoose = require('mongoose');
//package de validation pour prévalider les informations avant de les enregistrer
const uniqueValidator = require('mongoose-unique-validator');

//importer notre schema et utilisation de la function de mongoose
const userSchema = mongoose.Schema({
    email: {type : String, require: true , unique: true }, // unique true pour eviter de s'inscrire plusieur fois
    password: { type: String, required: true }
}); //require true champ requis

//s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail.
userSchema.plugin(uniqueValidator);

// exporté model de mongoose , transforme ce modèle en un modèle utilisable (nom du model,schema)
module.exports = mongoose.model('User', userSchema); //schema de donnée
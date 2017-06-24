var mongoose          = require('mongoose');
var connoisseurSchema = require('./connoisseur.schema.server');
var connoisseurModel  = mongoose.model('connoisseurModel', connoisseurSchema);

connoisseurModel.createConnoisseur  = createConnoisseur;
connoisseurModel.getAllConnoisseurs = getAllConnoisseurs;

module.exports = connoisseurModel;

function createConnoisseur(connoisseur) {
    return connoisseurModel
        .create(connoisseur);
}

function getAllConnoisseurs() {
    return connoisseurModel
        .find();
}
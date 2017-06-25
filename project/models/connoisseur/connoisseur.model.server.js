var mongoose          = require('mongoose');
var connoisseurSchema = require('./connoisseur.schema.server');
var connoisseurModel  = mongoose.model('connoisseurModel', connoisseurSchema);

connoisseurModel.createConnoisseur  = createConnoisseur;
connoisseurModel.getAllConnoisseurs = getAllConnoisseurs;
connoisseurModel.deleteConnoisseur = deleteConnoisseur;

module.exports = connoisseurModel;

function createConnoisseur(connoisseur) {
    return connoisseurModel
        .create(connoisseur);
}

function getAllConnoisseurs() {
    return connoisseurModel
        .find();
}

function deleteConnoisseur(connoisseurId) {
    return connoisseurModel
        .remove({'_id' : connoisseurId});
}
var app                 = require('../../express');
var connoisseurModel     = require('../models/connoisseur/connoisseur.model.server');

app.post('/api/project/connoisseur/application', submitApplication);
app.get('/api/project/allConnoisseurs/application', getAllConnoisseurs);

function submitApplication(req, res) {
    var connoisseur = req.body;

    connoisseurModel
        .createConnoisseur(connoisseur)
        .then(function (connoisseur) {
            res.json(connoisseur);
        }, function (err) {
            res.sendStatus(404);
        });
}

function getAllConnoisseurs(req, res) {

    connoisseurModel
        .getAllConnoisseurs()
        .then(function (connoisseurs) {
            res.json(connoisseurs);
        }, function (err) {
            res.sendStatus(404);
        });
}
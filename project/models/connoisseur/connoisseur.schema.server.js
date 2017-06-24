var mongoose = require('mongoose');

var connoisseurSchema = mongoose.Schema({
    userId     : String,
    firstName  : String,
    lastName   : String,
    username   : String,
    speciality : String,
    experience : String
}, {collection : "connoisseurs"});

module.exports = connoisseurSchema;
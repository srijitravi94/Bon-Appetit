var mongoose = require('mongoose');
var restaurantSchema = require('../restaurant/restaurant.schema.server');

var userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    username : {type : String, unique : true},
    password : String,
    email : String,
    phone : Number,
    image : String,

    roles : [{type: String,
            default : 'USER',
            enum : ['USER', 'ADMIN','CONNOISSEUR']}],

    google: {
        id:    String,
        token: String
    },

    facebook: {
        id:    String,
        token: String
    },

    likes : [String],
    followers: [String],
    following: [String],
    visited : [String],
    reviews : [restaurantSchema],
    dateCreated : {type : Date, default: Date.now}
}, {collection : "users"});

module.exports = userSchema;
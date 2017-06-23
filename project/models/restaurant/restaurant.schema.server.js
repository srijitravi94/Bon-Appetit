var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
    restaurantId   : String,
    cityName       : String,
    cityId         : String,
    restaurantName : String,
    imageUrl       : String,
    reviews      : [
        {
            userId      : String,
            firstName   : String,
            lastName    : String,
            profilePic  : String,
            summary     : String,
            description : String,
            dateCreated : {type : Date, default: Date.now}
        }
    ]
}, {collection : "restaurant_reviews"});

module.exports = restaurantSchema;
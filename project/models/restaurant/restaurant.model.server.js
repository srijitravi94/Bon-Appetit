var mongoose         = require('mongoose');
var restaurantSchema = require('./restaurant.schema.server');
var restaurantModel  = mongoose.model('restaurantModel', restaurantSchema);
var userModel        = require('../user/user.model.server');

restaurantModel.createReview = createReview;
restaurantModel.findReviewsForRestaurant = findReviewsForRestaurant;

module.exports = restaurantModel;

function createReview(review, userId) {
    return restaurantModel
        .create(review)
        .then(function (review) {
           return userModel
               .addReviewsForUser(userId, review);
        });
}

function findReviewsForRestaurant(resId) {
    return restaurantModel
        .find({restaurantId : resId})
        .exec();
}
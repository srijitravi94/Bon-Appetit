var mongoose         = require('mongoose');
var restaurantSchema = require('./restaurant.schema.server');
var restaurantModel  = mongoose.model('restaurantModel', restaurantSchema);
var userModel        = require('../user/user.model.server');

restaurantModel.createReview = createReview;
restaurantModel.findReviewsForRestaurant = findReviewsForRestaurant;
restaurantModel.findRestaurantReviewById = findRestaurantReviewById;
restaurantModel.updateReviewForRestaurant = updateReviewForRestaurant;
restaurantModel.deleteReview = deleteReview;

module.exports = restaurantModel;

function createReview(review, userId) {
    return restaurantModel
        .create(review)
        .then(function (review) {
           return userModel
               .addReviewsForUser(userId, review._id);
        });
}

function findReviewsForRestaurant(resId) {
    return restaurantModel
        .find({restaurantId : resId})
        .exec();
}

function findRestaurantReviewById(reviewId) {
    return restaurantModel
        .findOne({_id: reviewId});
}

function updateReviewForRestaurant(reviewId, review) {
    return restaurantModel
        .update({_id: reviewId}, {$set: review});
}

function deleteReview(userId, reviewId) {
    return restaurantModel
        .remove({'_id' : reviewId})
        .then(function (review) {
           return userModel
               .deleteReviewsFromUser(userId, reviewId);
        });
}
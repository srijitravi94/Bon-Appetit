var app                 = require('../../express');
var restaurantModel     = require('../models/restaurant/restaurant.model.server');

app.post('/api/project/:userId/restaurant/review', createReview);
app.get('/api/project/restaurant/:restaurantId/review', findReviewsForRestaurant);
app.get('/api/project/restaurant/review/:reviewId', findRestaurantReviewById);
app.put('/api/project/restaurant/review/update/:reviewId', updateReviewForRestaurant);
app.delete('/api/project/restaurant/review/:userId/delete/:reviewId', deleteReview);
app.get('/api/project/restaurant/review', findAllReviews);


function createReview(req, res) {
    var userId = req.params.userId;
    var review = req.body;

    restaurantModel
        .createReview(review, userId)
        .then(function (review) {
           res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findReviewsForRestaurant(req, res) {
    var resId = req.params.restaurantId;

    restaurantModel
        .findReviewsForRestaurant(resId)
        .then(function (review) {
           res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });

}

function findRestaurantReviewById(req, res) {
    var reviewId = req.params.reviewId;

    restaurantModel
        .findRestaurantReviewById(reviewId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });
}

function updateReviewForRestaurant(req, res) {
    var reviewId = req.params.reviewId;
    var review = req.body;

    restaurantModel
        .updateReviewForRestaurant(reviewId, review)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteReview(req, res) {
    var userId = req.params.userId;
    var reviewId = req.params.reviewId;

    restaurantModel
        .deleteReview(userId, reviewId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findAllReviews(req, res) {
    restaurantModel
        .findAllReviews()
        .then(function (reviews) {
            res.json(reviews);
        }, function (err) {
            res.sendStatus(404);
        })
}
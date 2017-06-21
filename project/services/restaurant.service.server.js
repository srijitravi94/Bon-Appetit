var app                 = require('../../express');
var restaurantModel     = require('../models/restaurant/restaurant.model.server');

app.post('/api/project/:userId/restaurant/review', createReview);
app.get('/api/project/restaurant/:restaurantId/review', findReviewsForRestaurant);


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
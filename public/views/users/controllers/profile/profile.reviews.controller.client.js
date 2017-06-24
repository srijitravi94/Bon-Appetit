(function () {
    angular
        .module("BonAppetit")
        .controller("reviewController", reviewController);

    function reviewController(currentUser, $stateParams, userService, restaurantService) {
        var model = this;
        model.userId = $stateParams.userId;
        model.currentUser = currentUser;
        model.follow = follow;
        model.unfollow = unfollow;
        model.isUserFollowed = isUserFollowed;
        model.findReviewsForUser = findReviewsForUser;
        var userReviews = [];

        function init() {
            findReviewsForUser();
            isUserFollowed();
        } init();


        function findReviewsForUser() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    var reviews = [];
                    var reviewId = user.reviews;

                    for(var r in reviewId) {
                        restaurantService
                            .findRestaurantReviewById(reviewId[r]._id)
                            .then(function (reviews) {
                               userReviews.push(reviews);
                            });
                    }
                });

            model.userReviews = userReviews;
        }

        function follow(followUserId) {
            userService
                .followUsers(model.currentUser._id, followUserId)
                .then(function (user) {
                    model.isFollow = true;
                }, function (err) {
                    console.log(err);
                });
        }

        function unfollow(unfollowUserId) {
            userService
                .unfollowUsers(model.currentUser._id, unfollowUserId)
                .then(function (user) {
                    model.isFollow = false;
                }, function (err) {
                    console.log(err);
                });
        }

        function isUserFollowed() {
            userService
                .isUserFollowed(model.currentUser._id, model.userId)
                .then(function (user) {
                    if(user) {
                        model.isFollow = true;
                    } else {
                        model.isFollow = false;
                    }
                });
        }

    }
})();
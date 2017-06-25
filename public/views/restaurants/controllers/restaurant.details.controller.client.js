(function () {
    angular
        .module("BonAppetit")
        .controller("restaurantDetailsController", restaurantDetailsController);

    function restaurantDetailsController(apiService, $routeParams, userService, getLoggedIn, restaurantService) {
        var model = this;
        model.restaurantId = $routeParams.restaurantId;
        model.cityName = $routeParams.cityName;
        model.cityId  =  $routeParams.cityId;
        model.getLoggedIn = getLoggedIn;
        model.likeRestaurant = likeRestaurant;
        model.unLikeRestaurant = unLikeRestaurant;
        model.isRestaurantLiked = isRestaurantLiked;
        model.visited = visited;
        model.undoVisited = undoVisited;
        model.haveBeenThere = haveBeenThere;
        model.createReview = createReview;
        model.selectReview = selectReview;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;
        model.createConnoisseurReview = createConnoisseurReview;

        function init() {
            restaurantDetails();
            isRestaurantLiked();
            haveBeenThere();
            findReviewsForRestaurant();
        }
        init();

        function findReviewsForRestaurant() {
            restaurantService
                .findReviewsForRestaurant(model.restaurantId)
                .then(renderReviews);

            function renderReviews(restaurantReview) {
                    var reviews= [];
                    for(r in restaurantReview){
                        reviews.push(restaurantReview[r]);
                    }
                    model.reviews = reviews;
                }
            }

        function restaurantDetails() {
            apiService
                .restaurantDetails(model.restaurantId)
                .then(function (response) {
                    model.restaurantDetails = response.data;
                });
        }

        function likeRestaurant(resId) {
            userService
                .likeRestaurant(resId, model.getLoggedIn._id)
                .then(function (response) {
                    model.isLiked = true;
                }, function (err) {
                    console.log(err);
                });
        }

        function unLikeRestaurant(resId) {
            userService
                .unLikeRestaurant(resId, model.getLoggedIn._id)
                .then(function (response) {
                    model.isLiked = false;
                }, function (err) {
                    console.log(err);
                });
        }

        function isRestaurantLiked() {
            userService
                .isRestaurantLiked(model.restaurantId, model.getLoggedIn._id)
                .then(function (user) {
                    if (user) {
                        model.isLiked = true;
                    }
                    else {
                        model.isLiked = false;
                    }
                });
        }

        function visited(resId) {
            userService
                .visited(resId, model.getLoggedIn._id)
                .then(function (response) {
                    model.been = true;
                }, function (err) {
                    console.log(err);
                });
        }

        function undoVisited(resId) {
            userService
                .undoVisited(resId, model.getLoggedIn._id)
                .then(function (response) {
                    model.been = false;
                }, function (err) {
                    console.log(err);
                });
        }

        function haveBeenThere() {
            userService
                .haveBeenThere(model.restaurantId, model.getLoggedIn._id)
                .then(function (user) {
                    if (user) {
                        model.been = true;
                    }
                    else {
                        model.been = false;
                    }
                });
        }

        function createReview(summary, description) {

            if(summary === null || summary === '' || typeof summary === 'undefined') {
                model.error = "Summary is required";
                return model.error;
            }

            if(description === null || description === '' || typeof description === 'undefined') {
                model.error = "Description is required";
                return model.error;
            }

            var review = {
                restaurantId   : model.restaurantId,
                cityName       : model.cityName,
                cityId         : model.cityId,
                restaurantName : model.restaurantDetails.name,
                imageUrl       : model.restaurantDetails.featured_image,
                isConnoisseur  : model.getLoggedIn.roles.indexOf('CONNOISSEUR')>-1,
                userId         : model.getLoggedIn._id,
                firstName      : model.getLoggedIn.firstName,
                lastName       : model.getLoggedIn.lastName,
                profilePic     : model.getLoggedIn.image,
                summary        : summary,
                description    : description
            };


            restaurantService
                .createReview(review, model.getLoggedIn._id)
                .then(findReviewsForRestaurant);
        }

        function selectReview(review) {
            model.review = angular.copy(review);
        }

        function updateReview(updatedReview) {

            if(updatedReview.summary === null || updatedReview.summary === '' || typeof updatedReview.summary === 'undefined') {
                model.error = "Summary is required";
                return model.error;
            }

            if(updatedReview.description === null || updatedReview.description === '' || typeof updatedReview.description === 'undefined') {
                model.error = "Description is required";
                return model.error;
            }

            var review = {
                _id            : updatedReview._id,
                restaurantId   : model.restaurantId,
                cityName       : model.cityName,
                cityId         : model.cityId,
                restaurantName : model.restaurantDetails.name,
                imageUrl       : model.restaurantDetails.featured_image,
                userId         : updatedReview.userId,
                firstName      : updatedReview.firstName,
                lastName       : updatedReview.lastName,
                profilePic     : updatedReview.profilePic,
                summary        : updatedReview.summary,
                description    : updatedReview.description

            };


            restaurantService
                .updateReviewForRestaurant(review._id, review)
                .then(findReviewsForRestaurant);
        }

        function deleteReview(reviewId) {
            restaurantService
                .deleteReview(model.getLoggedIn._id, reviewId)
                .then(findReviewsForRestaurant);
        }

        function createConnoisseurReview(summary, description) {

            if(summary === null || summary === '' || typeof summary === 'undefined') {
                model.error = "Summary is required";
                return model.error;
            }

            if(description === null || description === '' || typeof description === 'undefined') {
                model.error = "Description is required";
                return model.error;
            }

            var review = {
                restaurantId   : model.restaurantId,
                cityName       : model.cityName,
                cityId         : model.cityId,
                restaurantName : model.restaurantDetails.name,
                imageUrl       : model.restaurantDetails.featured_image,
                isConnoisseur  : model.getLoggedIn.roles.indexOf('CONNOISSEUR')>-1,
                userId         : model.getLoggedIn._id,
                firstName      : model.getLoggedIn.firstName,
                lastName       : model.getLoggedIn.lastName,
                profilePic     : model.getLoggedIn.image,
                summary        : summary,
                description    : description
            };

            restaurantService
                .createReview(review, model.getLoggedIn._id)
                .then(findReviewsForRestaurant);
        }

    }
})();
(function () {
    angular
        .module("BonAppetit")
        .controller("restaurantDetailsController", restaurantDetailsController);
    
    function restaurantDetailsController(apiService, $stateParams, userService, getLoggedIn, restaurantService) {
        var model = this;
        model.restaurantId = $stateParams.restaurantId;
        model.cityName = $stateParams.cityName;
        model.cityId  =  $stateParams.cityId;
        model.getLoggedIn = getLoggedIn;
        model.likeRestaurant = likeRestaurant;
        model.unLikeRestaurant = unLikeRestaurant;
        model.visited = visited;
        model.undoVisited = undoVisited;
        model.createReview = createReview;
        model.isRestaurantLiked = isRestaurantLiked;
        model.haveBeenThere = haveBeenThere;


        function init() {
            restaurantDetails();
            isRestaurantLiked();
            haveBeenThere();

            restaurantService
                .findReviewsForRestaurant(model.restaurantId)
                .then(renderReviews);

            function renderReviews(restaurantReview) {
                var reviews= [];
                for(r in restaurantReview){
                    reviews.push(restaurantReview[r].reviews[0]);
                }
                model.reviews = reviews;
            }

        }
        init();

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
                        console.log(user);
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
                reviews      :  [
                    {
                        userId      : model.getLoggedIn._id,
                        firstName   : model.getLoggedIn.firstName,
                        lastName    : model.getLoggedIn.lastName,
                        summary     : summary,
                        description : description
                    }
                ]
            };

            restaurantService
                .createReview(review, model.getLoggedIn._id)
                .then(function (response) {
                    restaurantService
                        .findReviewsForRestaurant(model.restaurantId)
                        .then(function (restaurantReview) {
                            var reviews= [];
                            for(r in restaurantReview){
                               reviews.push(restaurantReview[r].reviews[0]);
                           }
                           model.reviews = reviews;
                        });
                });
        }

    }
})();
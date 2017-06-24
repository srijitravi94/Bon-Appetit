(function () {
    angular
        .module("BonAppetit")
        .controller("adminReviewsController", adminReviewsController);

    function adminReviewsController($stateParams, restaurantService) {
        var model = this;
        model.userId = $stateParams.userId;
        model.deleteReview = deleteReview;

        function init() {
            findAllReviews();
        } init();

        function findAllReviews() {
            restaurantService
                .findAllReviews()
                .then(function (reviews) {
                    model.reviews = reviews;
                });
        }

        function deleteReview(userId, reviewId) {
            restaurantService
                .deleteReview(userId, reviewId)
                .then(findAllReviews);
        }

    }
})();
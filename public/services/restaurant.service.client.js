(function () {
    angular
        .module("BonAppetit")
        .factory("restaurantService", restaurantService);

    function restaurantService($http) {

        var api = {
            "createReview"              : createReview,
            "findReviewsForRestaurant"  : findReviewsForRestaurant,
            "findRestaurantReviewById"  : findRestaurantReviewById,
            "updateReviewForRestaurant" : updateReviewForRestaurant,
            "deleteReview"              : deleteReview,
            "findAllReviews"            : findAllReviews
        };

        return api;

        function createReview(review, userId) {
            var url = "/api/project/" +userId+ "/restaurant/review";
            return $http.post(url, review)
                .then(function (response) {
                   return response.data;
                });
        }

        function findReviewsForRestaurant(resId) {
            var url = "/api/project/restaurant/" +resId+ "/review";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findRestaurantReviewById(reviewId) {
            var url = "/api/project/restaurant/review/" +reviewId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateReviewForRestaurant(reviewId, review) {
            var url = "/api/project/restaurant/review/update/" +reviewId;
            return $http.put(url, review)
                .then(function (response) {
                   return response.data;
                });
        }

        function deleteReview(userId, reviewId) {
            var url = "/api/project/restaurant/review/" +userId+ "/delete/" +reviewId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllReviews() {
            var url = "/api/project/restaurant/review";
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }
    }
})();

(function () {
    angular
        .module("BonAppetit")
        .factory("restaurantService", restaurantService);

    function restaurantService($http) {

        var api = {
            createReview : createReview,
            findReviewsForRestaurant : findReviewsForRestaurant
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
    }
})();

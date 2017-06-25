(function () {
    angular
        .module("BonAppetit")
        .controller("searchRestaurantController", searchRestaurantController);

    function searchRestaurantController(apiService, $routeParams, getLoggedIn) {
        var model = this;
        model.getLoggedIn = getLoggedIn;
        model.restaurant = $routeParams.restaurant;
        model.cityName = $routeParams.cityName;
        model.cityId = $routeParams.cityId;

        function init() {
            searchRestaurantResults();
        }
        init();

        function searchRestaurantResults() {
            apiService
                .searchRestaurants(model.cityId, model.restaurant)
                .then(function (response) {
                    var restaurants = [];
                    var restaurantResults = response.data.restaurants;

                    for(var r in restaurantResults) {
                        restaurants.push(restaurantResults[r].restaurant);
                    }
                    model.restaurants = restaurants;
                });
        }
    }
})();
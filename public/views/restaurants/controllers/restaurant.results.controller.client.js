(function () {
    angular
        .module("BonAppetit")
        .controller("searchRestaurantController", searchRestaurantController);

    function searchRestaurantController(apiService, $stateParams) {
        var model = this;
        model.restaurant = $stateParams.restaurant;
        model.cityName = $stateParams.cityName;
        model.cityId = $stateParams.cityId;

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
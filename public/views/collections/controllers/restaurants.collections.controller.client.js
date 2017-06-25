(function () {
    angular
        .module("BonAppetit")
        .controller("restaurantCollectionsController",restaurantCollectionsController);


    function restaurantCollectionsController(apiService, $routeParams, getLoggedIn) {
        var model = this;
        model.getLoggedIn = getLoggedIn;
        model.cityName = $routeParams.cityName;
        model.cityId = $routeParams.cityId;
        model.collectionId = $routeParams.collectionId;

        function init() {
            collections();
        }
        init();

        function collections() {
            apiService
                .restaurantCollections(model.cityId, model.collectionId)
                .then(function (response) {
                    var restaurants = [];
                    var restaurantCollections = response.data.restaurants;

                    for(var r in restaurantCollections) {
                        restaurants.push(restaurantCollections[r].restaurant);
                    }
                    model.restaurants = restaurants;
                });
        }
    }
})();
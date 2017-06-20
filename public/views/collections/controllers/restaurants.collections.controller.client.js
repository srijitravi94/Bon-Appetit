(function () {
    angular
        .module("BonAppetit")
        .controller("restaurantCollectionsController",restaurantCollectionsController);


    function restaurantCollectionsController(apiService, $stateParams) {
        var model = this;
        model.cityName = $stateParams.cityName;
        model.cityId = $stateParams.cityId;
        model.collectionId = $stateParams.collectionId;

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
                    console.log(model.restaurants)
                });
        }
    }
})();
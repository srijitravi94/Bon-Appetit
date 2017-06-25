(function () {
    angular
        .module("BonAppetit")
        .controller("locationCollectionsController",locationCollectionsController);


    function locationCollectionsController(apiService, $routeParams, $location, getLoggedIn) {
        var model = this;
        model.getLoggedIn = getLoggedIn;
        model.cityName = $routeParams.cityName;
        model.cityId = $routeParams.cityId;
        model.searchRestaurant = searchRestaurant;

        function init() {
            cityCollections();
        }
        init();

        function cityCollections() {
            apiService
                .searchCollections(model.cityId)
                .then(function (response) {
                    var collections = [];
                    var cityCollections = response.data.collections;

                    if(cityCollections != null) {
                        for(var c in cityCollections) {
                            collections.push(cityCollections[c].collection);
                        }
                    } else {
                        model.noCollections = true;
                    }
                    model.collections = collections;
                });
        }

        function searchRestaurant(restaurant) {
            if(restaurant) {
                $location.url(model.cityName+ "/" +model.cityId+ "/restaurants/search/" +restaurant);
            } else {
                return;
            }
        }
    }
})();
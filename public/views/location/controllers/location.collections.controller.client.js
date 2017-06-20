(function () {
    angular
        .module("BonAppetit")
        .controller("locationCollectionsController",locationCollectionsController);


    function locationCollectionsController(apiService, $stateParams, $location) {
        var model = this;
        model.cityName = $stateParams.cityName;
        model.cityId = $stateParams.cityId;
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
                        console.log('No collections found');
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
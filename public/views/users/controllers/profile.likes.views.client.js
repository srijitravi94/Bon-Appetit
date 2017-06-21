(function () {
    angular
        .module("BonAppetit")
        .controller("likesController", likesController);

    function likesController(currentUser, apiService) {
        var model = this;
        var restaurants = [];

        for(var r in currentUser.likes) {
            apiService
                .restaurantDetails(currentUser.likes[r])
                .then(function (response) {
                    restaurants.push(response.data);
                });
        }
        model.restaurants = restaurants;
    }
})();
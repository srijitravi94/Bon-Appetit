(function () {
    angular
        .module("BonAppetit")
        .controller("visitedController", visitedController);

    function visitedController(currentUser, apiService) {
        var model = this;
        var restaurants = [];

        for(var r in currentUser.visited) {
            apiService
                .restaurantDetails(currentUser.visited[r])
                .then(function (response) {
                    restaurants.push(response.data);
                });
        }
        model.restaurants = restaurants;
    }
})();
(function () {
    angular
        .module("BonAppetit")
        .controller("restaurantDetailsController", restaurantDetailsController);
    
    function restaurantDetailsController(apiService, $stateParams) {
        var model = this;
        model.restaurantId = $stateParams.restaurantId;


        function init() {
            restaurantDetails();
        }
        init();

        function restaurantDetails() {
            apiService
                .restaurantDetails(model.restaurantId)
                .then(function (response) {
                    model.restaurantDetails = response.data;
                    console.log(model.restaurantDetails);
                });
        }
    }
})();
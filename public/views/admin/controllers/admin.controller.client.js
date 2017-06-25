(function () {
    angular
        .module("BonAppetit")
        .controller("adminController", adminController);

    function adminController($routeParams, getLoggedIn) {
        var model = this;
        model.getLoggedIn = getLoggedIn;
        model.userId = $routeParams.userId;

    }
})();
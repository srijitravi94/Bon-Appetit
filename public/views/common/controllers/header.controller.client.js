(function () {
    angular
        .module("BonAppetit")
        .controller("headerController", headerController);

    function headerController(getLoggedIn) {
        var model         = this;
        model.getLoggedIn = getLoggedIn;
    }
})();
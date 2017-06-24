(function () {
    angular
        .module("BonAppetit")
        .controller("adminController", adminController);

    function adminController($stateParams) {
        var model = this;
        model.userId = $stateParams.userId;
    }
})();
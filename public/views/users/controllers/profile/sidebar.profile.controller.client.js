(function () {
    angular
        .module("BonAppetit")
        .controller("sidebarController", sidebarController);

    function sidebarController($routeParams, userService) {
        var model    = this;
        model.userId = $routeParams.userId;

        function init() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                   model.user = user;
                });
        }init();
    }
})();
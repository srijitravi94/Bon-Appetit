(function () {
    angular
        .module("BonAppetit")
        .controller("sidebarController", sidebarController);

    function sidebarController($stateParams, userService) {
        var model    = this;
        model.userId = $stateParams.userId;

        function init() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                   model.user = user;
                });
        }init();
    }
})();
(function () {
    angular
        .module("BonAppetit")
        .controller("adminConnoisseursController", adminConnoisseursController);

    function adminConnoisseursController($routeParams, connoisseurService, getLoggedIn, userService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.getLoggedIn = getLoggedIn;
        model.acceptApplication = acceptApplication;
        model.deleteApplication = deleteApplication;

        function init() {
            getAllConnoisseurs();
        } init();

        function getAllConnoisseurs() {
            connoisseurService
                .getAllConnoisseurs()
                .then(function (connoisseurs) {
                   model.connoisseurs = connoisseurs;
                });
        }

        function acceptApplication(connoisseur) {

            connoisseurService
                .deleteConnoisseur(connoisseur._id)
                .then(function (response) {
                });

            userService
                .addConnoisseurToUser(connoisseur.userId)
                .then(function (user) {
                    console.log(user);
                   getAllConnoisseurs();
                });
        }

        function deleteApplication(connoisseur) {
            connoisseurService
                .deleteConnoisseur(connoisseur._id)
                .then(function (response) {
                    getAllConnoisseurs();
                });
        }
    }
})();
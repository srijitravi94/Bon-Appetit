(function () {
    angular
        .module("BonAppetit")
        .controller("adminConnoisseursController", adminConnoisseursController);

    function adminConnoisseursController($stateParams, connoisseurService) {
        var model = this;
        model.userId = $stateParams.userId;
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

        function acceptApplication(userId) {
            console.log("OK", userId);
        }

        function deleteApplication(userId) {
            console.log("NO", userId);
        }
    }
})();
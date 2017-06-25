(function () {
    angular
        .module("BonAppetit")
        .factory("connoisseurService", connoisseurService);

    function connoisseurService($http) {
        var api = {
            "submitApplication"  : submitApplication,
            "getAllConnoisseurs" : getAllConnoisseurs,
            "deleteConnoisseur"  : deleteConnoisseur
        };

        return api;

        function submitApplication(connoisseur) {
            var url = "/api/project/connoisseur/application";
            return $http.post(url, connoisseur)
                .then(function (response) {
                   return response.data;
                });
        }

        function getAllConnoisseurs() {
            var url = "/api/project/allConnoisseurs/application";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function deleteConnoisseur(connoisseurId) {
            var url = "/api/project/connoisseur/" +connoisseurId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
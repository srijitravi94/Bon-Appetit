(function () {
    angular
        .module("BonAppetit")
        .controller("mainController",mainController);

    function mainController($location, getLoggedIn) {
        var model = this;
        model.getLoggedIn = getLoggedIn;
        model.search = search;

        function search(location) {
            if (location) {
                    $location.url("/search/" + location);
            }
            else {
                return;
            }
        }
    }
})();
(function () {
    angular
        .module("BonAppetit")
        .controller("mainController",mainController);

    function mainController($location) {
        var model = this;
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
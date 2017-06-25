(function () {
    angular
        .module("BonAppetit")
        .controller("searchLocationController",searchLocationController);
    
    function searchLocationController(apiService, $routeParams, $location, getLoggedIn) {
        var model = this;
        model.getLoggedIn = getLoggedIn;
        model.location = $routeParams.location;
        model.search = search;

        function init() {
            searchResults();
        }
        init();

        function search(location) {
            if (location) {
                $location.url("/search/" + location);
            }
            else {
                return;
            }
        }

        function searchResults() {
          apiService
              .searchLocation(model.location)
              .then(function (response) {
                  var suggestions = [];
                  var location_suggestions = response.data.location_suggestions;

                  for(var l in location_suggestions) {
                      suggestions.push(location_suggestions[l]);
                  }
                  model.suggestions = suggestions;
              });
        }
    }
})();
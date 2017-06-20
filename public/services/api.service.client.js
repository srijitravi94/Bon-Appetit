(function () {
    angular
        .module('BonAppetit')
        .factory('apiService', apiService);
    
    function apiService($http) {

        var api = {
            "searchLocation"        : searchLocation,
            "searchCollections"     : searchCollections,
            "restaurantCollections" : restaurantCollections,
            "searchRestaurants"     : searchRestaurants,
            "restaurantDetails"     : restaurantDetails
        };

        var baseUrl = "https://developers.zomato.com/api/v2.1/";
        var apikey = "&apikey=0393efd0fa7d592433e675f2a7c2729d";

        return api;



        function searchLocation(location) {
            var url = baseUrl + "locations?query=" + location + "&count=10" + apikey;
            return $http.get(url);
        }
        
        function searchCollections(cityId) {
            var url = baseUrl + "collections?city_id=" + cityId + apikey;
            return $http.get(url);
        }

        function restaurantCollections(cityId, collectionId) {
            var url = baseUrl + "search?entity_id=" + cityId + "&entity_type=city&collection_id=" +collectionId + apikey;
            return $http.get(url);
        }

        function searchRestaurants(cityId, restaurant) {
            var url = baseUrl + "search?entity_id=" + cityId + "&entity_type=city&q=" + restaurant + apikey;
            return $http.get(url);
        }

        function restaurantDetails(resId) {
            var url = baseUrl + "restaurant?res_id=" + resId + apikey;
            return $http.get(url);
        }
    }
})();
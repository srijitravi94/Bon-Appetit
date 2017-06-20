(function () {
    angular
        .module('BonAppetit')
        .config(configuration);

    function configuration($stateProvider, $urlRouterProvider,$locationProvider, $qProvider) {

        $qProvider.errorOnUnhandledRejections(false);
        $locationProvider.hashPrefix("");

        $stateProvider

        //route for the main page
            .state("index",{
                url:"/",
                views: {
                    "header": {
                        templateUrl: "views/common/templates/header.view.client.html",
                        controller : "headerController",
                        controllerAs : "model"
                    },
                    "content": {
                        templateUrl: "views/main/templates/main.view.client.html",
                        controller: "mainController",
                        controllerAs: "model"
                    }
                },
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })

            //route for register page
            .state("index.register", {
                url:"register",
                views: {
                    "content@": {
                        templateUrl : "views/users/templates/register.view.client.html",
                        controller : "registerController",
                        controllerAs : "model"
                    }
                }
            })

            //route for login page
            .state("index.login", {
                url:"login",
                views: {
                    "content@": {
                        templateUrl : "views/users/templates/login.view.client.html",
                        controller : "loginController",
                        controllerAs : "model"
                    }
                }

            })

            //route for profile page
            .state("index.profile", {
                url : "profile",
                views : {
                    "content@" : {
                        templateUrl : "views/users/templates/profile.view.client.html",
                        controller : "profileController",
                        controllerAs : "model"
                    }
                },
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            //route for location search results page
            .state("index.location", {
                url:"search/:location",
                views: {
                    "content@": {
                        templateUrl : "views/location/templates/location.results.view.client.html",
                        controller: "searchLocationController",
                        controllerAs: "model"
                    }
                }
            })

            //route for collections in a location
            .state("index.collections", {
                url:":cityName/:cityId",
                views: {
                    "content@": {
                        templateUrl : "views/location/templates/location.collections.view.client.html",
                        controller: "locationCollectionsController",
                        controllerAs: "model"
                    }
                }
            })

            //route for restaurants inside a collection
            .state("index.restaurantCollections", {
                url:":cityName/:cityId/collections/:collectionId/restaurants",
                views: {
                    "content@": {
                        templateUrl : "views/collections/templates/restaurants.collections.view.client.html",
                        controller: "restaurantCollectionsController",
                        controllerAs: "model"
                    }
                }
            })

            //route for search results for restaurants
            .state("index.restaurantSearch", {
                url : ":cityName/:cityId/restaurants/search/:restaurant",
                views: {
                    "content@": {
                        templateUrl: "views/restaurants/templates/restaurant.results.view.client.html",
                        controller: "searchRestaurantController",
                        controllerAs: "model"
                    }
                }
            })

            //route for restaurant details page
            .state("index.restaurantDetails", {
                url : ":cityName/:cityId/restaurant/:restaurantId",
                views: {
                    "content@": {
                        templateUrl: "views/restaurants/templates/restaurant.details.view.client.html",
                        controller: "restaurantDetailsController",
                        controllerAs: "model"
                    }
                }
            });

        $urlRouterProvider.otherwise("/");

    }
    
    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function getLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }
})();
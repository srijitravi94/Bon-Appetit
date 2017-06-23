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
                url : "profile/:userId",
                views : {
                    "content@" : {
                        templateUrl : "views/users/templates/profile/profile.view.client.html",
                        controller : "profileController",
                        controllerAs : "model"
                    }
                },
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            //route for user likes
            .state("index.likes", {
                url : "profile/:userId/likes",
                views : {
                    "content@" : {
                        templateUrl : "views/users/templates/profile/profile.likes.view.client.html",
                        controller : "likesController",
                        controllerAs : "model"
                    }
                },
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            //route for user visited
            .state("index.visited", {
                url : "profile/:userId/visited",
                views : {
                    "content@" : {
                        templateUrl : "views/users/templates/profile/profile.visited.view.client.html",
                        controller : "visitedController",
                        controllerAs : "model"
                    }
                },
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            //route for user followers
            .state("index.followers", {
                url : "profile/:userId/followers",
                views : {
                    "content@" : {
                        templateUrl : "views/users/templates/profile/profile.followers.view.client.html",
                        controller : "followerController",
                        controllerAs : "model"
                    }
                },
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            //route for user following
            .state("index.following", {
                url : "profile/:userId/following",
                views : {
                    "content@" : {
                        templateUrl : "views/users/templates/profile/profile.following.view.client.html",
                        controller : "followingController",
                        controllerAs : "model"
                    }
                },
                resolve : {
                    currentUser : checkLoggedIn
                }
            })

            //route for user reviews
            .state("index.reviews", {
                url : "profile/:userId/reviews",
                views : {
                    "content@" : {
                        templateUrl : "views/users/templates/profile/profile.reviews.view.client.html",
                        controller : "reviewController",
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
                },
                resolve : {
                    getLoggedIn : getLoggedIn
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

    function getLoggedIn(userService, $q) {
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
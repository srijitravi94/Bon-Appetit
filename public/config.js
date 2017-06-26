(function () {
    angular
        .module('BonAppetit')
        .config(configuration);

    function configuration($routeProvider,$locationProvider, $qProvider) {

        $qProvider.errorOnUnhandledRejections(false);
        $locationProvider.hashPrefix("");

        $routeProvider

            //route for landing page
            .when('/', {
                templateUrl : 'views/main/templates/main.view.client.html',
                controller : 'mainController',
                controllerAs : 'model',
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })

            //route for login page
            .when('/login', {
                templateUrl : "views/users/templates/login.view.client.html",
                controller : "loginController",
                controllerAs : "model",
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })

            //route for register page
            .when('/register', {
                templateUrl : "views/users/templates/register.view.client.html",
                controller : "registerController",
                controllerAs : "model",
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })

            //route for profile page
            .when('/profile/:userId', {
                templateUrl : "views/users/templates/profile/profile.view.client.html",
                controller : "profileController",
                controllerAs : "model",
                resolve : {
                    currentUser : checkLoggedIn,
                    getLoggedIn : getLoggedIn
                }
            })

            //route for admin page
            .when("/profile/:userId/admin", {
                templateUrl: "views/admin/templates/admin.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkAdmin,
                    getLoggedIn: getLoggedIn
                }
            })

            //route for admin-users page
            .when("/profile/:userId/admin/users", {
                templateUrl : "views/admin/templates/admin.users.view.client.html",
                controller : "adminUsersController",
                controllerAs : "model",
                resolve : {
                    currentUser : checkAdmin,
                    getLoggedIn: getLoggedIn
                }
            })

            //route for admin-reviews page
            .when("/profile/:userId/admin/reviews", {
                templateUrl : "views/admin/templates/admin.reviews.view.client.html",
                controller : "adminReviewsController",
                controllerAs : "model",
                resolve : {
                    currentUser : checkAdmin,
                    getLoggedIn: getLoggedIn
                }
            })

            //route for admin-connoisseurs page
            .when("/profile/:userId/admin/connoisseurs", {
                templateUrl : "views/admin/templates/admin.connoisseurs.view.client.html",
                controller : "adminConnoisseursController",
                controllerAs : "model",
                resolve : {
                    currentUser : checkAdmin,
                    getLoggedIn: getLoggedIn
                }
            })


            //route for connoisseur application
            .when("/profile/:userId/connoisseur/application", {
                templateUrl : "views/connoisseur/templates/connoisseur.view.client.html",
                controller : "connoisseurController",
                controllerAs : "model",
                resolve : {
                    getLoggedIn : getLoggedIn,
                    currentUser : checkLoggedIn
                }
            })

            //route for user likes
            .when("/profile/:userId/likes", {
                templateUrl : "views/users/templates/profile/profile.likes.view.client.html",
                controller : "likesController",
                controllerAs : "model",
                resolve : {
                    getLoggedIn : getLoggedIn,
                    currentUser : checkLoggedIn
                }
            })

            //route for user visted
            .when("/profile/:userId/visited", {
                templateUrl : "views/users/templates/profile/profile.visited.view.client.html",
                controller : "visitedController",
                controllerAs : "model",
                resolve : {
                    getLoggedIn : getLoggedIn,
                    currentUser : checkLoggedIn
                }
            })

            //route for user followers
            .when("/profile/:userId/followers", {
                templateUrl : "views/users/templates/profile/profile.followers.view.client.html",
                controller : "followerController",
                controllerAs : "model",
                resolve : {
                    getLoggedIn : getLoggedIn,
                    currentUser : checkLoggedIn
                }
            })

            //route for user following
            .when("/profile/:userId/following", {
                templateUrl : "views/users/templates/profile/profile.following.view.client.html",
                controller : "followingController",
                controllerAs : "model",
                resolve : {
                    getLoggedIn : getLoggedIn,
                    currentUser : checkLoggedIn
                }
            })

            //route for user reviews
            .when("/profile/:userId/reviews", {
                templateUrl : "views/users/templates/profile/profile.reviews.view.client.html",
                controller : "reviewController",
                controllerAs : "model",
                resolve : {
                    getLoggedIn : getLoggedIn,
                    currentUser : checkLoggedIn
                }
            })

            //route for search users
            .when("/profile/:userId/search/users", {
                templateUrl : "views/users/templates/profile/profile.search.users.view.client.html",
                controller : "searchUsersController",
                controllerAs : "model",
                resolve : {
                    getLoggedIn : getLoggedIn,
                    currentUser : checkLoggedIn
                }
            })

            //route for search results
            .when("/search/:location", {
                templateUrl : "views/location/templates/location.results.view.client.html",
                controller: "searchLocationController",
                controllerAs: "model",
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })

            //route for collections in a location
            .when("/:cityName/:cityId", {
                templateUrl : "views/location/templates/location.collections.view.client.html",
                controller: "locationCollectionsController",
                controllerAs: "model",
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })

             // route for restaurants inside a collection
            .when("/:cityName/:cityId/collections/:collectionId/restaurants", {
                templateUrl : "views/collections/templates/restaurants.collections.view.client.html",
                controller: "restaurantCollectionsController",
                controllerAs: "model",
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })

            //route for search results for restaurants
            .when("/:cityName/:cityId/restaurants/search/:restaurant", {
                templateUrl: "views/restaurants/templates/restaurant.results.view.client.html",
                controller: "searchRestaurantController",
                controllerAs: "model",
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })

            //route for restaurant details page
            .when("/:cityName/:cityId/restaurant/:restaurantId", {
                templateUrl: "views/restaurants/templates/restaurant.details.view.client.html",
                controller: "restaurantDetailsController",
                controllerAs: "model",
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            })

            .otherwise({
                templateUrl : 'views/main/templates/main.view.client.html',
                controller : 'mainController',
                controllerAs : 'model',
                resolve : {
                    getLoggedIn : getLoggedIn
                }
            });


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

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .checkAdmin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }
})();
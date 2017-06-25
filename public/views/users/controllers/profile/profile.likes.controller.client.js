(function () {
    angular
        .module("BonAppetit")
        .controller("likesController", likesController);

    function likesController($routeParams, apiService, userService, currentUser, getLoggedIn) {
        var model = this;
        model.userId = $routeParams.userId;
        model.getLoggedIn = getLoggedIn;
        model.currentUser = currentUser;
        model.follow = follow;
        model.unfollow = unfollow;
        model.isUserFollowed = isUserFollowed;
        model.findLikesForUser = findLikesForUser;
        var restaurants = [];


        function init() {
            findLikesForUser();
            isUserFollowed();

            userService
                .findUserById(model.userId)
                .then(renderUser, userError);

            function renderUser(user) {
                model.user = user;
            }

            function userError() {
                model.error = "User not found";
            }
        } init();

        function findLikesForUser() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    for(var r in user.likes) {
                        apiService
                            .restaurantDetails(user.likes[r])
                            .then(function (response) {
                                restaurants.push(response.data);
                            });
                    }
                });

            model.restaurants = restaurants;
        }

        function follow(followUserId) {
            userService
                .followUsers(model.currentUser._id, followUserId)
                .then(function (user) {
                    model.isFollow = true;
                }, function (err) {
                    console.log(err);
                });
        }

        function unfollow(unfollowUserId) {
            userService
                .unfollowUsers(model.currentUser._id, unfollowUserId)
                .then(function (user) {
                    model.isFollow = false;
                }, function (err) {
                    console.log(err);
                });
        }

        function isUserFollowed() {
            userService
                .isUserFollowed(model.currentUser._id, model.userId)
                .then(function (user) {
                    if(user) {
                        model.isFollow = true;
                    } else {
                        model.isFollow = false;
                    }
                });
        }

    }
})();
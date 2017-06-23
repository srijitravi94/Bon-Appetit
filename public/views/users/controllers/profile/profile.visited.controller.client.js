(function () {
    angular
        .module("BonAppetit")
        .controller("visitedController", visitedController);

    function visitedController($stateParams, currentUser, apiService, userService) {
        var model = this;
        model.userId = $stateParams.userId;
        model.currentUser = currentUser;
        model.follow = follow;
        model.unfollow = unfollow;
        model.isUserFollowed = isUserFollowed;
        model.findVisitedForUser = findVisitedForUser;
        var restaurants = [];

        function init() {
            findVisitedForUser();
            isUserFollowed();
        } init();


        function findVisitedForUser() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    for(var r in user.visited) {
                        apiService
                            .restaurantDetails(user.visited[r])
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
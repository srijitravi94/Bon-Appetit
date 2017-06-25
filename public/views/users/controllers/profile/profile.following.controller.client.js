(function () {
    angular
        .module("BonAppetit")
        .controller("followingController", followingController);

    function followingController(userService, $routeParams, currentUser, getLoggedIn) {
        var model = this;
        model.userId = $routeParams.userId;
        model.getLoggedIn = getLoggedIn;
        model.currentUser = currentUser;
        model.follow = follow;
        model.unfollow = unfollow;
        model.isUserFollowed = isUserFollowed;
        model.findFollowingForUser = findFollowingForUser;
        var following = [];

        function init() {
            findFollowingForUser();
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

        function findFollowingForUser() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    for(var f in user.following) {
                        userService
                            .findUserById(user.following[f])
                            .then(function (user) {
                                following.push(user);
                            });
                    }
                });
            model.following = following;
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
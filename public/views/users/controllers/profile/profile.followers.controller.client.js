(function () {
    angular
        .module("BonAppetit")
        .controller("followerController", followerController);

    function followerController(userService, $routeParams, currentUser, getLoggedIn) {
        var model = this;
        model.userId = $routeParams.userId;
        model.getLoggedIn = getLoggedIn;
        model.currentUser = currentUser;
        model.follow = follow;
        model.unfollow = unfollow;
        model.isUserFollowed = isUserFollowed;
        model.findFollowersForUser = findFollowersForUser;
        var followers = [];

        function init() {
            findFollowersForUser();
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

        userService
            .findUserById(model.userId)
            .then(renderUser, userError);

        function renderUser(user) {
            model.user = user;
        }

        function userError() {
            model.error = "User not found";
        }

        function findFollowersForUser() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    for(var f in user.followers) {
                        userService
                            .findUserById(user.followers[f])
                            .then(function (user) {
                                followers.push(user);
                            });
                    }
                });
            model.followers = followers;
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
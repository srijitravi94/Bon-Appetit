(function () {
    angular
        .module('BonAppetit')
        .controller('profileController',profileController);

    function profileController(userService, $routeParams, currentUser, $location, $timeout, getLoggedIn) {
        var model = this;
        model.userId = $routeParams.userId;
        model.getLoggedIn = getLoggedIn;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.currentUser = currentUser;
        model.follow = follow;
        model.unfollow = unfollow;
        model.isUserFollowed = isUserFollowed;
        model.logout = logout;

        function init() {
            renderUser(currentUser);
            isUserFollowed();
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

        function updateUser(user) {
            userService
                .updateUser(user, model.userId)
                .then(updateSuccess, updateError);

            function updateSuccess() {
                model.successMessage = "Profile updated successfully";
            }

            function updateError() {
                model.errorMessage = "Unable to update profile";
            }
        }

        function deleteUser() {
            userService
                .deleteUser(model.userId)
                .then(deleteSuccess, deleteError);

            function deleteSuccess() {
                model.successMessage = "Profile deleted successfully. Please wait while we're redirecting ....";
                $timeout( function() {
                    $location.url('/');
                }, 3000);
            }

            function deleteError() {
                model.errorMessage = "Unable to delete profile";
            }

        }
        
        function logout() {
            userService
                .logout()
                .then(function () {
                    $timeout( function() {
                        $location.url('/login');
                    }, 1000);
                });
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
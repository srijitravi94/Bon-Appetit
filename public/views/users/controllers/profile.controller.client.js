(function () {
    angular
        .module('BonAppetit')
        .controller('profileController',profileController);

    function profileController(userService, currentUser, $location, $timeout, $window) {
        var model = this;
        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {
            renderUser(currentUser);
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
                    $window.location.reload();
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
                    $window.location.reload();
                    $timeout( function() {
                        $location.url('/login');
                    }, 1000);
                });
        }
    }
})();
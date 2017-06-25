(function () {
    angular
        .module("BonAppetit")
        .controller("adminUsersController", adminUsersController);

    function adminUsersController(userService,$routeParams, getLoggedIn) {
        var model = this;
        model.getLoggedIn = getLoggedIn;
        model.userId = $routeParams.userId;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;

        function init() {
            findAllUsers();
        } init ();

        function findAllUsers() {
            userService
                .adminFindAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }

        function deleteUser(user) {
            userService
                .adminDeleteUser(user._id)
                .then(findAllUsers);
        }

        function createUser(user) {

            if(user.username === null || user.username === '' || typeof user.username === 'undefined') {
                model.error = "Username is required";
                return;
            }

            userService
                .adminCreateUser(user)
                .then(findAllUsers);
        }

        function selectUser(user) {
            model.user = angular.copy(user);
        }

        function updateUser(user) {

            if(user.username === null || user.username === '' || typeof user.username === 'undefined') {
                model.error = "Username is required";
                return;
            }

            userService
                .adminUpdateUser(user, user._id)
                .then(function () {
                    findAllUsers();
                    model.updateButton = false;
                });
        }
    }
})();
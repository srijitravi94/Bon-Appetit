(function () {
    angular
        .module("BonAppetit")
        .controller("loginController", loginController);

    function loginController(userService, $location, getLoggedIn) {
        var model = this;
        model.getLoggedIn = getLoggedIn;
        model.login = login;

        function login(username, password) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = "Username is required";
                return;
            }

            if(password === null || password ==='' || typeof password === 'undefined') {
                model.error = "Password is required";
                return;
            }

            userService
                .login(username, password)
                .then(foundUser, notFound);

            function foundUser(user) {
                if(user !== null) {
                    $location.url('/profile/' +user._id );
                }
            }

            function notFound(error) {
                model.error = "Sorry, " +username+ " not found or the password doesn't match. Please try again";
            }
        }
    }
})();

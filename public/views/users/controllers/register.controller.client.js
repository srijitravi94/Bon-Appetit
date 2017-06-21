(function () {
    angular
        .module('BonAppetit')
        .controller('registerController',registerController);

    function registerController(userService, $location, $window) {

        var model = this;
        model.register = register;

        function register(firstName, lastName, username, password, verifyPassword) {

            if(firstName === null || firstName === '' || typeof firstName === 'undefined') {
                model.error = "First Name is required";
                return;
            }

            if(lastName === null || lastName === '' || typeof lastName === 'undefined') {
                model.error = "Last Name is required";
                return;
            }

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = "Username is required";
                return;
            }

            if(password === null || password ==='' || typeof password === 'undefined') {
                model.error = "Password is required";
                return;
            }

            if(password !== verifyPassword) {
                model.error = "Sorry, passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(ifFound, ifNotFound);

            function ifFound() {
                model.error = "Sorry, that Username is taken";
            }

            function ifNotFound() {
                var newUser = {
                    firstName : firstName,
                    lastName : lastName,
                    username : username,
                    password : password
                };
                return userService
                    .register(newUser)
                    .then(function (user) {
                        $window.location.reload();
                        $location.url('/profile');
                    });
            }

        }
    }
})();
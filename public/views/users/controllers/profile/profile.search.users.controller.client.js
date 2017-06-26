(function () {
    angular
        .module("BonAppetit")
        .controller("searchUsersController", searchUsersController);

    function searchUsersController($routeParams, currentUser, getLoggedIn, userService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.getLoggedIn = getLoggedIn;
        model.currentUser = currentUser;
        model.searchUsers = searchUsers;

        function init() {
            userService
                .findUserById(model.userId)
                .then(renderUser, userError);

            function renderUser(user) {
                model.user = user;
            }

            function userError() {
                model.error = "User not found";
            }
        } init ();

       function searchUsers(name) {
           userService
               .findUserByFirstName(name)
               .then(function (users) {
                  if(users) {
                      model.users = users;
                  } else {
                      model.error = true;
                      console.log(model.error);
                  }
               });
       }

    }
})();
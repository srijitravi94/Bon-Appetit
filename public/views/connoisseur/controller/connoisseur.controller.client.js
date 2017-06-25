(function () {
    angular
        .module("BonAppetit")
        .controller("connoisseurController", connoisseurController);

    function connoisseurController($routeParams, connoisseurService, currentUser, $timeout, $location, getLoggedIn) {
        var model = this;
        model.userId = $routeParams.userId;
        model.getLoggedIn = getLoggedIn;
        model.submitApplication = submitApplication;

        function submitApplication(speciality, experience) {
            if(speciality === null || speciality === '' || typeof speciality === 'undefined') {
                model.error = "Speciality is required";
                return model.error;
            }

            if(experience === null || experience === '' || typeof experience === 'undefined') {
                model.error = "Experience is required";
                return model.error;
            }

            var connoisseur = {
                userId     : currentUser._id,
                firstName  : currentUser.firstName,
                lastName   : currentUser.lastName,
                username   : currentUser.username,
                speciality : speciality,
                experience : experience
            };

            connoisseurService
                .submitApplication(connoisseur)
                .then(function (connoisseur) {
                    model.success = "Application submitted successfully. Redirecting ...";
                    $timeout(function () {
                        $location.url('/profile/' +currentUser._id);
                    },2000);
                });

        }
    }
})();
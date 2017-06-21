(function () {
    angular
        .module("BonAppetit")
        .controller("reviewController", reviewController);

    function reviewController(currentUser) {
        var model = this;
        var userReviews = [];
        var reviews = currentUser.reviews;

        for(var r in reviews) {
            userReviews.push(reviews[r]);
        }
        model.userReviews = userReviews;

    }
})();
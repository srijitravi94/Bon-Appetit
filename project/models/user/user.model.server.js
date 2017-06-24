var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel', userSchema);

userModel.createUser = createUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findAllUsers = findAllUsers;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.likeRestaurant = likeRestaurant;
userModel.unLikeRestaurant = unLikeRestaurant;
userModel.isRestaurantLiked = isRestaurantLiked;
userModel.visited = visited;
userModel.undoVisited = undoVisited;
userModel.haveBeenThere = haveBeenThere;
userModel.followUsers = followUsers;
userModel.unfollowUsers = unfollowUsers;
userModel.isUserFollowed = isUserFollowed;
userModel.addReviewsForUser = addReviewsForUser;
userModel.deleteReviewsFromUser = deleteReviewsFromUser;

module.exports = userModel;

function createUser(user) {
    user.image = "https://www.drupal.org/files/issues/default-avatar.png";
    return userModel
        .create(user);
}

function findUserByUsername(username) {
    return userModel
        .findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel
        .findOne({username : username, password : password});
}

function findAllUsers() {
    return userModel
        .find();
}

function findUserById(userId) {
    return userModel
        .findById({'_id' : userId});
}

function updateUser(user, userId) {
    return userModel
        .update({_id: userId}, {$set: user});
}

function deleteUser(userId) {
    return userModel
        .remove({'_id' : userId});
}

function likeRestaurant(userId, resId) {
    return userModel
        .update({_id: userId}, {$addToSet: {likes: resId}});
}

function unLikeRestaurant(userId, resId) {
    return userModel
        .update({_id: userId}, {$pullAll: {likes: [resId]}});
}

function isRestaurantLiked(userId, resId) {
    return userModel
        .findOne({_id: userId, likes: {$in: [resId]}});
}

function visited(userId, resId) {
    return userModel
        .update({_id: userId}, {$addToSet: {visited: resId}});
}

function undoVisited(userId, resId) {
    return userModel
        .update({_id: userId}, {$pullAll: {visited: [resId]}});
}

function haveBeenThere(userId, resId) {
    return userModel
        .findOne({_id: userId, visited: {$in: [resId]}});
}

function followUsers(currentUserId, followUserId) {
    return userModel
        .update({_id: currentUserId}, {$addToSet: {following: followUserId}})
        .then(function (user) {
           return userModel
               .update({_id: followUserId}, {$addToSet: {followers: currentUserId}});
        });
}

function unfollowUsers(currentUserId, unfollowUserId) {
    return userModel
        .update({_id: currentUserId}, {$pullAll: {following: [unfollowUserId]}})
        .then(function (user) {
            return userModel
                .update({_id: unfollowUserId}, {$pullAll: {followers: [currentUserId]}});
        });
}

function isUserFollowed(currentUserId, followUserId) {
    return userModel
        .findOne({_id: currentUserId, following: {$in: [followUserId]}});
}

function addReviewsForUser(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.reviews.push(reviewId);
            return user.save();
        });
}

function deleteReviewsFromUser(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.reviews.indexOf(reviewId);
            user.reviews.splice(index, 1);
            return user.save();
        });
}
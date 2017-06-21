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
userModel.addReviewsForUser = addReviewsForUser;

module.exports = userModel;

function createUser(user) {
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

function addReviewsForUser(userId, review) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.reviews.push(review);
            return user.save();
        });
}
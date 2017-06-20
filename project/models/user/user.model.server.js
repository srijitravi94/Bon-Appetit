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
var app           = require('../../express');
var passport      = require('passport');
var userModel     = require('../models/user/user.model.server');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get('/api/project/user', findUsers);
app.post('/api/project/user', createUser);
app.get('/api/project/user/:userId', findUserById);
app.put('/api/project/user/:userId', updateUser);
app.delete('/api/project/user/:userId', deleteUser);
app.put('/api/project/user/:userId/restaurant/like/:resId', likeRestaurant);
app.put('/api/project/user/:userId/restaurant/unlike/:resId', unLikeRestaurant);
app.get('/api/project/user/:userId/restaurant/like/:resId', isRestaurantLiked);
app.put('/api/project/user/:userId/restaurant/visited/:resId', visited);
app.put('/api/project/user/:userId/restaurant/undoVisited/:resId', undoVisited);
app.get('/api/project/user/:userId/restaurant/visited/:resId', haveBeenThere);

app.post('/api/project/login', passport.authenticate('local'), login);
app.get('/api/project/loggedin', loggedin);
app.post('/api/project/register', register);
app.post('/api/project/logout', logout);


function findUsers (req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
               if(user) {
                   res.json(user);
               } else {
                   res.sendStatus(404);
               }
            });
    }

    else if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else
                    res.sendStatus(404);
            });
    }

    else {
        userModel
            .findAllUsers()
            .then(function (users) {
               res.json(users);
            });
    }

}

function createUser(req, res) {
    var newUser = req.body;

    userModel
        .createUser(newUser)
        .then(function (newUser) {
            res.json(newUser);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findUserById(req, res) {
    var userId = req.params.userId;

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
           res.sendStatus(404);
        });
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(user, userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
           res.sendStatus(404);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (success) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (err) {
            done(null, false);
        });
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            });
}

function loggedin(req, res) {
    var user = req.user;

    if(req.isAuthenticated()) {
        res.json(user);
    } else {
        res.send('0');
    }
}

function register(req, res) {
    var newUser = req.body;
    userModel
        .createUser(newUser)
        .then(function (user) {
           req.login(user, function (status) {
              res.send(status);
           });
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function likeRestaurant(req, res) {
    var userId = req.params.userId;
    var resId = req.params.resId;

    userModel
        .likeRestaurant(userId, resId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function unLikeRestaurant(req, res) {
    var userId = req.params.userId;
    var resId = req.params.resId;

    userModel
        .unLikeRestaurant(userId, resId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function isRestaurantLiked(req, res) {
    var userId = req.params.userId;
    var resId = req.params.resId;

    userModel
        .isRestaurantLiked(userId, resId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function visited(req, res) {
    var userId = req.params.userId;
    var resId = req.params.resId;

    userModel
        .visited(userId, resId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function undoVisited(req, res) {
    var userId = req.params.userId;
    var resId = req.params.resId;

    userModel
        .undoVisited(userId, resId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function haveBeenThere(req, res) {
    var userId = req.params.userId;
    var resId = req.params.resId;

    userModel
        .haveBeenThere(userId, resId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}
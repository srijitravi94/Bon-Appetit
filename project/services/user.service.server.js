var app            = require('../../express');
var passport       = require('passport');
var userModel      = require('../models/user/user.model.server');
var bcrypt         = require("bcrypt-nodejs");
var multer         = require('multer');
var upload         = multer({ dest: __dirname+'/../../public/uploads' });
var LocalStrategy  = require('passport-local').Strategy;

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
app.put('/api/project/user/:currentUserId/follow/:followUserId', followUsers);
app.put('/api/project/user/:currentUserId/unfollow/:unfollowUserId', unfollowUsers);
app.get('/api/project/user/:currentUserId/follow/:followUserId', isUserFollowed);
app.post ("/api/project/upload", upload.single('myFile'), uploadImage);

app.post('/api/project/login', passport.authenticate('local'), login);
app.get('/api/project/loggedin', loggedin);
app.get('/api/project/checkAdmin', checkAdmin);
app.post('/api/project/register', register);
app.post('/api/project/logout', logout);

app.get('/api/project/checkAdmin/user', isAdmin, adminFindAllUsers);
app.delete('/api/project/checkAdmin/:userId',isAdmin, adminDeleteUser);
app.post('/api/project/checkAdmin',isAdmin, adminCreateUser);
app.put('/api/project/checkAdmin/:userId',isAdmin, adminUpdateUser);
app.put('/api/project/connoisseur/:userId/addRole', isAdmin, addConnoisseurToUser);



var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

app.get('/auth/google',
    passport.authenticate('google', {
        scope : ['profile', 'email']
    })
);

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#/',
        failureRedirect: '/#/login'
    })
);


var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields : ['id', 'emails','name','photos']
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
app.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope : ['email']
    })
);

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/#/',
        failureRedirect: '/#/login'
    })
);


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
        res.sendStatus(404);
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
        .findUserByUsername(username)
        .then(function(user) {
            if(user) {
                if (bcrypt.compareSync (password, user.password)) {
                    return userModel
                        .findUserByCredentials(username, user.password)
                        .then(function (user) {
                            if (user) {
                                return done(null, user);
                            } else {
                                return done(null, false);
                            }
                        });
                }
                else {
                    return done(null, false);
                }
            } else {
                return done(null, false);
            }
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

function checkAdmin(req, res) {
    var user = req.user;

    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN')>-1) {
        res.json(user);
    } else {
        res.send('0');
    }
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function register(req, res) {
    var newUser = req.body;

    newUser.password = bcrypt.hashSync(newUser.password);

    userModel
        .createUser(newUser)
        .then(function (user) {
           req.login(user, function (err) {
               if (err) {
                   res.sendStatus(404)
               } else {
                   res.json(user);
               }
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

function followUsers(req, res) {
    var currentUserId = req.params.currentUserId;
    var followUserId  = req.params.followUserId;

    userModel
        .followUsers(currentUserId, followUserId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function unfollowUsers(req, res) {
    var currentUserId = req.params.currentUserId;
    var unfollowUserId  = req.params.unfollowUserId;

    userModel
        .unfollowUsers(currentUserId, unfollowUserId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function isUserFollowed(req, res) {
    var currentUserId = req.params.currentUserId;
    var followUserId  = req.params.followUserId;

    userModel
        .isUserFollowed(currentUserId, followUserId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function uploadImage(req, res) {

    var myFile        = req.file;
    var userId        = req.body.userId;

    var originalname  = myFile.originalname;
    var filename      = myFile.filename;
    var path          = myFile.path;
    var destination   = myFile.destination;
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;


    userModel
        .findUserById(userId)
        .then(function (user) {
            user.image = '/uploads/' +filename;
            userModel
                .updateUser(user, userId)
                .then(function () {
                    res.redirect("/#/profile/" +userId);
                });
        });
}

function adminFindAllUsers(req, res) {
    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        }, function (err) {
            res.sendStatus(404);
        });
}

function adminDeleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status)
        }, function (err) {
           res.sendStatus(404);
        });
}

function adminCreateUser(req, res) {
    var newUser = req.body;

    userModel
        .adminCreateUser(newUser)
        .then(function (newUser) {
            res.json(newUser);
        }, function (err) {
            res.sendStatus(404);
        });
}

function adminUpdateUser(req, res) {
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

function addConnoisseurToUser(req, res) {
    var userId = req.params.userId;

    userModel
        .addConnoisseurToUser(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        image : profile._json.image.url,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel
                        .createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            })

        .then(function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            });
}



function facebookStrategy(accessToken, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if(user) {
                return done(null, user);
            } else {
                var email = profile.emails[0].value;
                var emailParts = email.split("@");
                var newFacebookUser = {
                    username:  emailParts[0],
                    firstName: profile.name.givenName,
                    lastName:  profile.name.familyName,
                    image : profile.photos[0].value,
                    email:     email,
                    facebook: {
                        id:    profile.id,
                        token: accessToken
                    }
                };
                return userModel
                    .createUser(newFacebookUser);
            }
        }, function(err) {
            if (err) { return done(err); }
        })

        .then(function(user){
                return done(null, user);
            },
            function(err){
                if (err) {
                    return done(err);
                }
            });
}

var crypto = require('crypto');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).
    digest('base64').toString();
}
exports.signup = function(req, res) {
    console.log("Begin exports.signup");
    var user = new User({ username: req.body.username });
    console.log("after new user exports.signup");
    user.set('hashed_password', hashPW(req.body.password));
    console.log("after hashing user exports.signup");
    user.set('email', req.body.email);
    console.log("after email user exports.signup");
    user.save(function(err) {
        console.log("In exports.signup");
        console.log(err);
        if (err) {
            res.session.error = err;
            res.redirect('/signup');
        }
        else {
            req.session.user = user.id;
            req.session.username = user.username;
            req.session.msg = 'Authenticated as ' + user.username;
            res.redirect('/');
        }
    });
};
exports.login = function(req, res) {
    User.findOne({ username: req.body.username })
        .exec(function(err, user) {
            if (!user) {
                err = 'User Not Found.';
            }
            else if (user.hashed_password ===
                hashPW(req.body.password.toString())) {
                req.session.regenerate(function() {
                    console.log("login");
                    console.log(user);
                    req.session.user = user.id;
                    req.session.username = user.username;
                    req.session.msg = 'Authenticated as ' + user.username;
                    req.session.B1 = user.B1;
                    req.session.B2 = user.B2;
                    req.session.B3 = user.B3;
                    req.session.B4 = user.B4;
                    req.session.B5 = user.B5;
                    req.session.B6 = user.B6;
                    req.session.B7 = user.B7;
                    req.session.B8 = user.B8;
                    req.session.B9 = user.B9;
                    req.session.B10 = user.B10;
                    res.redirect('/');
                });
            }
            else {
                err = 'Authentication failed.';
            }
            if (err) {
                req.session.regenerate(function() {
                    req.session.msg = err;
                    res.redirect('/login');
                });
            }
        });
};
exports.getUserProfile = function(req, res) {
    User.findOne({ _id: req.session.user })
        .exec(function(err, user) {
            if (!user) {
                res.json(404, { err: 'User Not Found.' });
            }
            else {
                res.json(user);
            }
        });
};
exports.updateUser = function(req, res) {
    User.findOne({ _id: req.session.user })
        .exec(function(err, user) {
            user.set('email', req.body.email);
            user.set('B1', req.body.B1);
            user.set('B2', req.body.B2);
            user.set('B3', req.body.B3);
            user.set('B4', req.body.B4);
            user.set('B5', req.body.B5);
            user.set('B6', req.body.B6);
            user.set('B7', req.body.B7);
            user.set('B8', req.body.B8);
            user.set('B9', req.body.B9);
            user.set('B10', req.body.B10);
            user.save(function(err) {
                if (err) {
                    res.sessor.error = err;
                }
                else {
                    req.session.msg = 'User Updated.';
                    req.session.B1 = user.B1;
                    req.session.B2 = user.B2;
                    req.session.B3 = user.B3;
                    req.session.B4 = user.B4;
                    req.session.B5 = user.B5;
                    req.session.B6 = user.B6;
                    req.session.B7 = user.B7;
                    req.session.B8 = user.B8;
                    req.session.B9 = user.B9;
                    req.session.B10 = user.B10;
                }
                res.redirect('/user');
            });
        });
};
exports.deleteUser = function(req, res) {
    User.findOne({ _id: req.session.user })
        .exec(function(err, user) {
            if (user) {
                user.remove(function(err) {
                    if (err) {
                        req.session.msg = err;
                    }
                    req.session.destroy(function() {
                        res.redirect('/login');
                    });
                });
            }
            else {
                req.session.msg = "User Not Found!";
                req.session.destroy(function() {
                    res.redirect('/login');
                });
            }
        });
};

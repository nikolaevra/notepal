'use strict';

/**
 * Created by Ruslan on 11/6/2017.
 */
var jwt = require('jsonwebtoken');
var PassportLocalStrategy = require('passport-local').Strategy;
var secret = require("../../secret");
var helpers = require("./helpers");

/**
 * Return the Passport Local Strategy object.
 */
function loginMiddleware(sql) {

    return new PassportLocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, function (req, email, password, done) {
        var userData = {
            email: email.trim(),
            password: password.trim()
        };

        sql.getUserByEmail(userData.email).then(function (user) {
            if (user == 'undefined') {
                // TODO: Add proper logging here
                console.log("Wrong email");

                var error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';

                return done(error);
            } else {
                return helpers.comparePassword(userData.password, user.password).then(function (isMatch) {
                    if (!isMatch) {
                        console.log("Wrong password");

                        var _error = new Error('Incorrect email or password');
                        _error.name = 'IncorrectCredentialsError';

                        return done(_error);
                    }

                    var payload = {
                        sub: user.user_id
                    };

                    console.log('User ' + user.user_id + ' Successfully Logged in');
                    // create a token string
                    var token = jwt.sign(payload, secret.jwtSecret);
                    var data = {
                        name: user.username,
                        id: user.user_id,
                        is_deleted: user.is_deleted,
                        last_connected: user.last_connected
                    };

                    return done(null, token, data);
                });
            }
        }).catch(function (err) {
            return done(err);
        });
    });
}

module.exports = function (db) {
    return loginMiddleware(db);
};
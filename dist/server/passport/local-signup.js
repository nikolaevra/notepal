'use strict';

/**
 * Created by Ruslan on 11/6/2017.
 */
var PassportLocalStrategy = require('passport-local').Strategy;
var debug = require('debug')('local-signup');

/**
 * Return the Passport Local Strategy object.
 */
function signupMiddleware(sql) {
    return new PassportLocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, function (req, email, password, done) {

        var e = email.trim();
        var pw = password.trim();
        var un = req.body.name.trim();

        sql.getUserByEmail(e).then(function (user) {
            if (user) {
                done({
                    name: "user_exists",
                    message: 'User with email ' + e + ' already exists'
                });
            } else {
                var result = sql.addUser(un, e, pw);
                if (result) {
                    return done(null);
                } else {
                    return done({
                        name: "sql_error",
                        message: "Internal server error"
                    });
                }
            }
        });
    });
}

module.exports = function (db) {
    return signupMiddleware(db);
};
/**
 * Created by Ruslan on 11/6/2017.
 */
const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
const secret = require("../../secret");
const helpers = require("./helpers");

/**
 * Return the Passport Local Strategy object.
 */
function loginMiddleware (sql) {

    return new PassportLocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, (req, email, password, done) => {
        const userData = {
            email: email.trim(),
            password: password.trim(),
        };

        sql.getUserByEmail(userData.email).then((user) => {
            if (user == 'undefined') {
                // TODO: Add proper logging here
                console.log("Wrong email");

                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';

                return done(error);
            } else {
                return helpers.comparePassword(userData.password, user.password).then((isMatch) => {
                    if (!isMatch) {
                        console.log("Wrong password");

                        const error = new Error('Incorrect email or password');
                        error.name = 'IncorrectCredentialsError';

                        return done(error);
                    }

                    const payload = {
                        sub: user.user_id
                    };

                    console.log(`User ${user.user_id} Successfully Logged in`);
                    // create a token string
                    const token = jwt.sign(payload, secret.jwtSecret);
                    const data = {
                        name: user.username,
                        is_deleted: user.is_deleted,
                        last_connected: user.last_connected,
                    };

                    return done(null, token, data);
                });
            }

        }).catch((err) => {
            return done(err);
        });
    });
}

module.exports = (db) => {
    return loginMiddleware(db);
};

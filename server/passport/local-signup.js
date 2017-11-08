/**
 * Created by Ruslan on 11/6/2017.
 */
const PassportLocalStrategy = require('passport-local').Strategy;

/**
 * Return the Passport Local Strategy object.
 */
function signupMiddleware (sql) {
    return new PassportLocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, (req, email, password, done) => {

        let e = email.trim();
        let pw = password.trim();
        let un = req.body.name.trim();

        let result = sql.addUser(un, e, pw);
        if (result) {
            return done(null);
        } else {
            return done("error message");
        }
    });
}

module.exports = (db) => {
    return signupMiddleware(db);
};

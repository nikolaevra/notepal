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

        console.log(req.body);

        let e = email.trim();
        let pw = password.trim();
        let un = req.body.username.trim();

        sql.getUserByEmail(e).then((user) => {
            if (user) {
                done({
                    name: "user_exists",
                    message: `User with email ${e} already exists`
                });
            } else {
                let result = sql.addUser(un, e, pw);
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

module.exports = (db) => {
    return signupMiddleware(db);
};

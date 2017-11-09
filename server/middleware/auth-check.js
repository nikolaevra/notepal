/**
 * Created by Ruslan on 11/6/2017.
 */
const jwt = require('jsonwebtoken');
const secret = require('../../secret');
const debug = require('debug')('mid:auth-check');

/**
 *  The Auth Checker middleware function.
 */
function gen_auth_middleware (sql) {
    return function (req, res, next) {
        debug(`${req.method} ${req.url}`);

        if (!req.headers.authorization) {
            return res.status(401).end();
        }

        // get the last part from a authorization header string like "bearer token-value"
        const token = req.headers.authorization.split(' ')[1];

        // decode the token using a secret key-phrase
        return jwt.verify(token, secret.jwtSecret, (err, decoded) => {
            // the 401 code is for unauthorized status
            if (err) {
                return res.status(401).end();
            }

            const userId = decoded.sub;

            // check if a user exists
            return sql.getUser(userId).then((user) => {
                if (!user) {
                    return res.status(401).end();
                }

                return next();
            });
        });
    };
}

module.exports = (db) => {
    return gen_auth_middleware(db);
};

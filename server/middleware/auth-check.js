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
        if (!req.headers.authorization) {
            return res.status(401).end();
        }

        // get the last part from a authorization header string like "bearer token-value"
        const token = req.headers.authorization.split(' ')[1];

        // decode the token using a secret key-phrase
        return jwt.verify(token, secret.jwtSecret, (err, decoded) => {
            // the 401 code is for unauthorized status
            if (err) {
                debug(`[401] ${req.method} ${req.url}: Cannot verify JWT token`);
                return res.status(401).end();
            }

            const userId = decoded.sub;

            // check if a user exists
            return sql.getUserById(userId).then((user) => {
                if (!user) {
                    debug(`[401] ${req.method} ${req.url}: Cannot find user in DB`);
                    return res.status(401).end();
                }

                debug(`[200] ${req.method} ${req.url}: Found user in DB`);
                return next();
            });
        });
    };
}

module.exports = (db) => {
    return gen_auth_middleware(db);
};

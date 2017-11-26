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
        const token = req.headers.authorization.split(' ')[1];

        return jwt.verify(token, secret.jwtSecret, (err, decoded) => {
            if (err) {
                debug(`[401] ${req.method} ${req.url}: Cannot verify JWT token`);
                return res.status(401).end();
            }

            const userId = decoded.sub;
            
            // check if a user exists
            return sql.getUserById(userId).then((user) => {
                if (!user) {
                    debug(`[401] ${req.method} ${req.url}: Cannot find user in DB`);
                    return res.status(401).end('Cannot find user in DB');
                }

                debug(`[200] ${req.method} ${req.url}: Found user in DB`);
                return next();
            }).catch((err) => {
                debug(`[401] ${req.method} ${req.url}: ${err.message}`);
                return res.status(401).end(err.message);
            });
        });
    };
}

module.exports = (db) => {
    return gen_auth_middleware(db);
};

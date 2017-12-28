'use strict';

/**
 * Created by Ruslan on 11/6/2017.
 */
var jwt = require('jsonwebtoken');
var secret = require('../../secret');
var debug = require('debug')('mid:auth-check');

/**
 *  The Auth Checker middleware function.
 */
function gen_auth_middleware(sql) {
    return function (req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).end();
        }
        var token = req.headers.authorization.split(' ')[1];

        return jwt.verify(token, secret.jwtSecret, function (err, decoded) {
            if (err) {
                debug('[401] ' + req.method + ' ' + req.url + ': Cannot verify JWT token');
                return res.status(401).end();
            }

            var userId = decoded.sub;

            // check if a user exists
            return sql.getUserById(userId).then(function (user) {
                if (!user) {
                    debug('[401] ' + req.method + ' ' + req.url + ': Cannot find user in DB');
                    return res.status(401).end('Cannot find user in DB');
                }

                debug('[200] ' + req.method + ' ' + req.url + ': Found user in DB');
                return next();
            }).catch(function (err) {
                debug('[401] ' + req.method + ' ' + req.url + ': ' + err.message);
                return res.status(401).end(err.message);
            });
        });
    };
}

module.exports = function (db) {
    return gen_auth_middleware(db);
};
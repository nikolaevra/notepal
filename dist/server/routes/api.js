'use strict';

/**
 * Created by Ruslan on 11/6/2017.
 */
var express = require('express');
var router = new express.Router();
var debug = require('debug')('route:api');

function myRouter(sql) {

    router.get('/dashboard', function (req, res) {
        debug('[200] ' + req.method + ' ' + req.url);

        res.status(200).json({
            message: "You're authorized to see this secret message."
        });
    });

    router.get('/getUserFiles', function (req, res) {
        debug('[200] ' + req.method + ' ' + req.url);
        var userId = req.query.userId;

        sql.getAllFiles(userId).then(function (data) {
            console.log(files);
        }).catch(function (err) {
            console.log(err);
        });

        res.status(200).json({
            message: "You're authorized to see this secret message."
        });
    });
    return router;
}

module.exports = function (db) {
    return myRouter(db);
};
/**
 * Created by Ruslan on 11/6/2017.
 */
const express = require('express');
const router = new express.Router();
const debug = require('debug')('route:api');

function myRouter(sql) {

    router.get('/dashboard', (req, res) => {
        debug(`[200] ${req.method} ${req.url}`);



        res.status(200).json({
            message: "You're authorized to see this secret message."
        });
    });

    router.get('/editor', (req, res) => {
        debug(`[200] ${req.method} ${req.url}`);

        res.status(200).json({
            message: "You're authorized to see this secret message."
        });
    });

    return router;

}


module.exports = (db) => {
    return myRouter(db);
};

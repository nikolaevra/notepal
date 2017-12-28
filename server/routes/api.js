/**
 * Created by Ruslan on 11/6/2017.
 */
const express = require('express');
const router = new express.Router();

function myRouter(sql) {

    router.get('/files', (req, res) => {
        console.log(`Files: [200] ${req.method} ${req.url}`);
        const { userId } = req.locals;

        sql.getAllFiles(userId).then((data) => {
            res.status(200).json(data.rows);
        }).catch((err) => {
            res.status(400).json(err);
        });
    });

    router.get('/getUserFiles', (req, res) => {
        console.log(`Get User files: [200] ${req.method} ${req.url}`);
        const userId = req.query.userId;

        sql.getAllFiles(userId).then((data) => {
            console.log(files);
        }).catch((err) => {
            console.log(err);
        });

        res.status(200).json({
            message: "You're authorized to see this secret message."
        });
    });
    return router;
}

module.exports = (db) => {
    return myRouter(db);
};

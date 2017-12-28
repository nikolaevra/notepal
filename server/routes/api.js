/**
 * Created by Ruslan on 11/6/2017.
 */
const express = require('express');
const router = new express.Router();

function myRouter(sql) {

    router.get('/files', (req, res) => {
        const { userId } = req.locals;

        sql.getAllFiles(userId).then((data) => {
            console.log(`Get all files: [200] ${req.method} ${req.url}`);
            res.status(200).json(data.rows);
        }).catch((err) => {
            console.log(`Get all files: [400] ${req.method} ${req.url}`);
            console.log("DB error: ", err);
            res.status(400).json(err);
        });
    });

    router.post('/file/new', (req, res) => {
        const { userId } = req.locals;
        let file_data =
            (typeof req.body.file_data !== 'undefined' && req.body.file_data ) ? req.body.file_data : '';

        sql.addFile(userId, file_data).then((result) => {
            console.log(`Create new file: [200] ${req.method} ${req.url}`);

            res.status(200).json({
                message: "Successfully created new file",
                fileid: result.rows[0].file_id
            });
        }).catch((err) => {
            console.log(`Create new file: [400] ${req.method} ${req.url}`);
            console.log("DB error: ", err);
            res.status(400).json(err);
        });
    });
    return router;
}

module.exports = (db) => {
    return myRouter(db);
};

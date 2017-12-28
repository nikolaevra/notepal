'use strict';

/**
 * Created by Ruslan on 11/6/2017.
 */
var _require = require('pg'),
    Pool = _require.Pool;

var secret = require('../../secret');
var bcrypt = require('bcrypt');
var esc = require('pg-escape');
var debug = require('debug')('database');
var SALT = secret.salt;

var _sql = new Pool({
    user: secret.user,
    host: secret.host,
    database: secret.database,
    password: secret.password,
    port: secret.port
});

function encrypt(word) {
    return bcrypt.hash(word, SALT);
}

module.exports = {
    getUserByEmail: async function getUserByEmail(email) {
        debug('getUserByEmail: ' + email);
        var result = await _sql.query('SELECT * FROM notepal.notepal.t_user WHERE email=\'' + esc(email) + '\' LIMIT 1;');
        return result.rows[0];
    },

    getUserById: async function getUserById(id) {
        debug('getUserById: ' + id);
        var result = await _sql.query('SELECT * FROM notepal.notepal.t_user WHERE user_id=\'' + esc(id) + '\' LIMIT 1;');
        return result.rows[0];
    },

    addUser: async function addUser(username, email, password) {
        debug('addUser: ' + email);

        var hash = await encrypt(password);
        var result = await _sql.query('INSERT INTO notepal.notepal.t_user (username, email, password) VALUES (\'' + esc(username) + '\', \'' + esc(email) + '\', \'' + hash + '\');');
        return !!result;
    },

    addFile: async function addFile(userID) {
        debug('addFile');
        return await _sql.query('INSERT INTO notepal.notepal.t_files (user_id, file_data) VALUES (\'' + userID + '\', \'\');');
    },

    getAllFiles: async function getAllFiles(userID) {
        debug('addFile');
        return await _sql.query('SELECT DISTINCT f.file_id, f.file_data, f.user_id, f.file_recent_date\n            FROM notepal.t_user_file_junct as j\n            JOIN notepal.t_files as f ON  j.user_id = f.user_id\n            WHERE f.user_id=\'' + userID + '\';');
    }
};
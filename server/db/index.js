/**
 * Created by Ruslan on 11/6/2017.
 */
const { Pool } = require('pg');
const secret = require('../../secret');
const bcrypt = require('bcrypt');
const esc = require('pg-escape');
const debug = require('debug')('database');
const SALT = secret.salt;

const _sql = new Pool({
    user: secret.user,
    host: secret.host,
    database: secret.database,
    password: secret.password,
    port: secret.port,
});

function encrypt (word) {
    return bcrypt.hash(word, SALT);
}

module.exports = {
    getUserByEmail: async function (email) {
        console.log(`getUserByEmail: ${email}`);
        
        const result = await _sql.query(`SELECT * FROM notepal.notepal.t_user WHERE email='${esc(email)}' LIMIT 1;`);
        return result.rows[0];
    },

    getUserById: async function (id) {
        console.log(`getUserById: ${id}`);

        const result = await _sql.query(`SELECT * FROM notepal.notepal.t_user WHERE user_id='${esc(id)}' LIMIT 1;`);
        return result.rows[0];
    },

    addUser: async (username, email, password) => {
        console.log(`addUser: ${email}`);

        const hash = await encrypt(password);
        const result = await _sql.query(`INSERT INTO notepal.notepal.t_user (username, email, password) VALUES ('${esc(username)}', '${esc(email)}', '${hash}');`);
        return !!result;
    },

    addFile: async (userID) => {
        console.log(`addFile`);

        return await _sql.query(`INSERT INTO notepal.notepal.t_files (user_id, file_data) VALUES ('${userID}', '');`);
    },

    getAllFiles: async (userID) => {
        console.log(`addFile`);

        return await _sql.query(
            `SELECT DISTINCT f.file_id, f.file_data, f.user_id, f.file_recent_date
            FROM notepal.t_user_file_junct as j
            JOIN notepal.t_files as f ON  j.user_id = f.user_id
            WHERE f.user_id='${userID}';`
        );
    }
};
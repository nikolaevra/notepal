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
        debug(`getUserByEmail: ${email}`);
        //noinspection UnnecessaryLocalVariableJS
        const result = await _sql.query(`SELECT * FROM notepal.notepal.t_user WHERE email='${esc(email)}' LIMIT 1;`);
        return result.rows[0];
    },

    getUserById: async function (id) {
        debug(`getUserById: ${id}`);
        //noinspection UnnecessaryLocalVariableJS
        const result = await _sql.query(`SELECT * FROM notepal.notepal.t_user WHERE id='${esc(id)}' LIMIT 1;`);
        return result.rows[0];
    },

    addUser: async (username, email, password) => {
        debug(`addUser: ${email}`);

        const hash = await encrypt(password);
        const result = await _sql.query(`INSERT INTO notepal.notepal.t_user (username, email, password) VALUES ('${esc(username)}', '${esc(email)}', '${hash}')`);
        return !!result;
    },
};
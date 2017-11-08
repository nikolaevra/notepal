/**
 * Created by Ruslan on 11/6/2017.
 */
const { Pool } = require('pg');
const config = require('../../config');
const bcrypt = require('bcrypt');
const esc = require('pg-escape');
const SALT = config.salt;

const _sql = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port,
});

function encrypt (word) {
    return bcrypt.hash(word, SALT);
}

module.exports = {
    getUser: async function (email) {
        //noinspection UnnecessaryLocalVariableJS
        const result = await _sql.query(`SELECT * FROM notepal.notepal.t_user WHERE email='${esc(email)}' LIMIT 1;`);
        return result.rows[0];
    },

    addUser: async (username, email, password) => {
        const hash = await encrypt(password);
        const result = await _sql.query(`INSERT INTO notepal.notepal.t_user (username, email, password) VALUES ('${esc(username)}', '${esc(email)}', '${hash}')`);
        return !!result;
    },
};
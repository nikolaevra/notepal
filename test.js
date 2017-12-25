const { Pool } = require('pg');
const config = require('./secret');
const _sql = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port,
});
const bcrypt = require('bcrypt');
const esc = require('pg-escape');

const salt = 5;

function encrypt (word) {
    return bcrypt.hash(word, salt);
}

module.exports = {
    getUserByEmail: async function (email) {
        // debug(`getUserByEmail: ${email}`);
        const result = await _sql.query(`SELECT * FROM notepal.notepal.t_user WHERE email='${esc(email)}' LIMIT 1;`);
        return result.rows[0];
    },

    getUserById: async function (id) {
        // debug(`getUserById: ${id}`);
        const result = await _sql.query(`SELECT * FROM notepal.notepal.t_user WHERE user_id='${esc(id)}' LIMIT 1;`);
        return result.rows[0];
    },

    addUser: async (username, email, password) => {
        // debug(`addUser: ${email}`);

        const hash = await encrypt(password);
        const result = await _sql.query(`INSERT INTO notepal.notepal.t_user (username, email, password) VALUES ('${esc(username)}', '${esc(email)}', '${hash}')`);
        return !!result;
    },

    addFile: async () => {
        // debug(`addFile`);
        const result = await _sql.query(`INSERT INTO notepal.notepal.t_files (file_data) VALUES ('')`);
        return !!result;
    },
};
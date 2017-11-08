/**
 * Created by Ruslan on 11/8/2017.
 */
const bcrypt = require('bcrypt');

module.exports = {
    comparePassword: function (p1, p2) {
        return bcrypt.compare(p1, p2);
    }
};
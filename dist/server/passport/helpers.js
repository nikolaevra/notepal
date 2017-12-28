'use strict';

/**
 * Created by Ruslan on 11/8/2017.
 */
var bcrypt = require('bcrypt');

module.exports = {
    comparePassword: function comparePassword(p1, p2) {
        return bcrypt.compare(p1, p2);
    }
};
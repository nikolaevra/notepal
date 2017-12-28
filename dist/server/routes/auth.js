'use strict';

var express = require('express');
var validator = require('validator');
var passport = require('passport');
var debug = require('debug')('route:auth');
var router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
    var errors = {};
    var isFormValid = true;
    var message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }

    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message: message,
        errors: errors
    };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
    var errors = {};
    var isFormValid = true;
    var message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message: message,
        errors: errors
    };
}

router.post('/signup', function (req, res, next) {
    debug(req.method + ' ' + req.url);

    var validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate('local-signup', function (err) {
        if (err) {
            debug(err.message);

            if (err.name === 'user_exists') {
                // error name generated in local-login.js
                return res.status(409).json({
                    success: false,
                    message: err.message,
                    errors: {
                        email: 'This email is already taken.'
                    }
                });
            }

            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        debug('new user created');
        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up! Now you should be able to log in.'
        });
    })(req, res, next);
});

router.post('/login', function (req, res, next) {
    var validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        debug('[400] ' + req.method + ' ' + req.url + ': Could not validate login form');
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate('local-login', function (err, token, userData) {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                debug('[400] ' + req.method + ' ' + req.url + ': Incorrect credentials');
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            debug('[400] ' + req.method + ' ' + req.url + ':Could not process the form');
            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }

        debug('[200] ' + req.method + ' ' + req.url + ': Successfully logged in');
        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token: token,
            user: userData
        });
    })(req, res, next);
});

module.exports = router;
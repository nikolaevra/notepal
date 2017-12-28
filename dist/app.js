'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./config');
var debug = require('debug')('express');

debug('booting %s', config.APP_NAME);
var PORT = config.SERVER_PORT;

// connect to the database and load db
var pg_db = require('./server/db');

var localSignupStrategy = require('./server/passport/local-signup')(pg_db);
var localLoginStrategy = require('./server/passport/local-login')(pg_db);
var authCheckMiddleware = require('./server/middleware/auth-check')(pg_db);
var authRoutes = require('./server/routes/auth');
var apiRoutes = require('./server/routes/api')(pg_db);

var app = express();

// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
app.use('/api', authCheckMiddleware);

// routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// start the server
app.listen(PORT, function () {
    console.log('Server is running on http://localhost:' + PORT + ' or http://127.0.0.1:' + PORT);
});
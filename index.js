const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const PORT = 3001;

// connect to the database and load db
const pg_db = require('./server/db');

const localSignupStrategy = require('./server/passport/local-signup')(pg_db);
const localLoginStrategy = require('./server/passport/local-login')(pg_db);
// const authCheckMiddleware = require('./server/middleware/auth-check');
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');

const app = express();

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
// app.use('/api', authCheckMiddleware);

// routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


// start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} or http://127.0.0.1:${PORT}`);
});

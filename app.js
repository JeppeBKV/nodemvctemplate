const express = require('express');
require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');
const app = express();
const routes = require('./routes');


// passport requires
const connection = require('./config/database');
const passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

// When a user visits site it creates a new session for the user and assigns them a cookie
// Next time user visits the cookie is checked an the session id which is stored in the cookie is retrieved and searched in the session store
// Session store is where all data regarding your session is stored.
// The session table will automatically be created when the server side code is run
app.use(session({
    key: 'auth',
    secret: process.env.SESSION_SECRET,
    store: new MySQLStore({}, connection),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 1000 * 60 * 60 * 24, // 1 day

    }
}));
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());



// Middleware used to access form data submitted with post method in req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static files folder
app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');

//Routes
app.use(routes);
const PORT = process.env.PORT;
app.listen(PORT, console.log("Server has started at port " + PORT));
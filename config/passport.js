const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const validPassword = require('../lib/passwordUtils').validPassword;

const verifyCallback = (username, password, done) => {
    connection.query('SELECT * FROM user WHERE username = ?', [username], function (error, results) {
        if (error) {
            return done(error);
        }
        if (results.length == 0) {
            return done(null, false);
        }
        const isValid = validPassword(password, results[0].hash, results[0].salt);

        const user = {
            id: results[0].id,
            username: results[0].username,
            hash: results[0].hash,
            salt: results[0].salt,
            admin: results[0].admin
        };
        if (isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}

const strategy  = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    console.log('inside serialize');
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    console.log('deserilizeUser: ' + userId);
    connection.query('SELECT * FROM user where id = ?', [userId], function(error, results){
        done(null, results[0]);
    });
});

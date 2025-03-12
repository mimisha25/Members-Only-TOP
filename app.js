const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const { Client } = require('pg');
const pool = require('./config/pool');
const path = require('node:path')
const methodOverride = require('method-override');
require('dotenv').config();
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));


passport.use(new LocalStrategy(
    (username, password, done) => {
        pool.query("SELECT * FROM users WHERE email = $1", [username], (err, result) => {
            if (err) return done(err);
            const user = result.rows[0];
            if (!user) return done(null, false, { message: 'No user with that email' });

            bcrypt.compare(password, user.password, (err, res) => {
                if (err) return done(err);
                if (res) return done(null, user);
                else return done(null, false, { message: 'Incorrect password' });
            });
        })
    }
));


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    pool.query("SELECT * FROM users WHERE id=$1", [id], (e, result) => {
        if (e) return done(e);
        done(null, result.rows[0]);
    });
});

app.use(passport.session());

app.listen(8080, () => console.log('Server is running on 8080'))
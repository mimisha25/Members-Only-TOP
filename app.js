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

app.get('/sign-up', (req, res) => res.render('signup'));

app.post('/sign-up', async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) return res.send('Password do not match!');
    const hashedPassword = await bcrypt.hash(password, 10);
    pool.query(
        'INSERT INTO users (first_name, last_name, email, password, membership_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [firstName, lastName, email, hashedPassword, false],
        (e, result) => {
            if (e) return res.render('Error creating user');
            res.redirect('/login');
        }
    )
})


app.get('/login', (req, res) => res.render('login'));
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get('/message/new', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    res.render('newMessage');
});


app.post('/message/new', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');

    const { title, content } = req.body;

    pool.query(
        'INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)',
        [title, content, req.user.id],
        (e, result) => {
            if (e) return res.render('Error creating message');
            res.redirect('/');
        }
    );
});



app.get('/', (req, res) => {
    const isMember = req.user && req.user.membership_status;
    const isLoggedIn = req.isAuthenticated();

    if (!isLoggedIn) return res.render('index', { messages: [], user: req.user });
    const query = isMember
        ? 'SELECT messages.id, messages.title, messages.content, messages.timestamp, users.first_name, users.last_name, messages.user_id, messages.status FROM messages JOIN users ON messages.user_id=users.id'
        : 'SELECT id, title, content, user_id, status  FROM messages';

    pool.query(query, (e, result) => {
        if (e) {
            console.error('Error fetching messages:', e);
            return res.send('Error fetching messages. Please try again later.');
        }
        console.log(result.rows);
        res.render('index', { messages: result.rows || [], user: req.user });
    });
});


app.get('/join-club', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    res.render('joinClub');
})

app.post('/join-club', (req, res) => {
    const { passcode } = req.body;
    const correctPasscode = process.env.SECRET_PASSCODE;
    if (passcode === correctPasscode) {
        pool.query(
            'UPDATE users SET membership_status = TRUE WHERE id = $1',
            [req.user.id],
            (e, result) => {
                if (e) return res.render('Error updating membership status');
                res.redirect('/');
            });
    } else res.send('Incorrect passcode');
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.send('Error logging out');
        res.redirect('/');
    });
});

app.listen(8080, () => console.log('Server is running on 8080'))
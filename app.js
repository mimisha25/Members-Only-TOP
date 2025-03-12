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
app.use(express.static(path.join(__dirname, './public')));


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

app.get('/is-admin', (req, res) => {
    res.render('isAdmin')
})

app.post('/is-admin', (req, res) => {
    const { passcode } = req.body;
    if (passcode === 'admin') {
        pool.query(
            'UPDATE users SET admin=true WHERE email =$1 RETURNING *',
            [req.user.email],
            (e, result) => {
                if (e) return res.send('Error updating user role');
                res.redirect('/');
            })
    } else res.send('Invalid passcode');
})


app.post('/message/delete/:id', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    // if (!req.user.admin) return res.send('You are not authorized to delete messages.');
    const isMember = req.user && req.user.membership_status;

    const { id } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.admin;
    console.log(`Attempting to delete message with ID: ${id} by user: ${userId}`);

    const query = isAdmin
        ? 'DELETE FROM messages WHERE id=$1 RETURNING*'
        : 'DELETE FROM messages WHERE id=$1 AND user_id=$2 RETURNING*';


    pool.query(query, isAdmin ? [id] : [id, userId],
        (e, result) => {
            if (e) {
                console.error('Error deleting message:', e);
                return res.send('Error deleting message');
            }
            if (result.rows.length === 0) {
                console.log('No message was deleted. Either the message does not exist or the user does not own it.');
                return res.send('You are not authorized to delete this message.');
            }
            console.log('Message deletion successful:', result.rows);
            res.redirect('/');
        }
    )
})

app.get('/message/edit/:id', (req, res) => {
    const messageId = req.params.id;
    const userId = req.user.id;
    const query = 'SELECT * FROM messages WHERE id=$1 AND user_id=$2';
    pool.query(query, [messageId, userId], (e, result) => {
        if (e) {
            console.error('Error fetching message for editing:', e);
            return res.send('Error fetching message');
        }
        if (result.rows.length === 0) return res.send('Message not found or you are not authorized to edit this message.');
        const message = result.rows[0];
        res.render('editMessage', { message: message });
    });
});

app.post('/message/edit/:id', (req, res) => {
    const messageId = req.params.id;
    const userId = req.user.id;
    const { title, content } = req.body;
    const query = 'UPDATE messages SET title=$1, content=$2 WHERE id=$3 AND user_id=$4 RETURNING *';
    pool.query(query, [title, content, messageId, userId], (e, result) => {
        if (e) {
            console.error('Error updating message:', e);
            return res.send('Error updating message.');
        }
        if (result.rows.length === 0) return res.send('Message not found or you are not authorized to edit this message.');
        console.log('Message updated successfully:', result.rows);
        res.redirect('/');
    });
});

app.post('/message/mark-inappropriate/:id', (req, res) => {
    if (!req.isAuthenticated() || !req.user.admin) return res.send('You are not authorized to perform this action');
    const { id } = req.params;
    const query = `
    UPDATE messages
    SET status = CASE
        WHEN status = 'inappropriate' THEN 'appropriate'
        ELSE 'inappropriate'
    END
    WHERE id = $1
    RETURNING *;
`;
    pool.query(query, [id], (e, result) => {
        if (e) {
            console.error('Error marking message as inappropriate:', e);
            return res.send('Error marking message.');
        }
        if (result.rows.length === 0) return res.send('Message not found.')
        console.log('Message marked as inappropriate:', result.rows);
        res.redirect('/');
    })
})



app.listen(8080, () => console.log('Server is running on 8080'))
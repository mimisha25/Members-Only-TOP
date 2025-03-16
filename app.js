const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const { Client } = require('pg');
const pool = require('./config/pool');
const path = require('path')
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

const loginRouter = require('./routes/forum/login/loginRouter.js');
const joinclubRouter = require('./routes/forum/joinClub/joinclubRouter.js');
const signupRouter = require('./routes/forum/signup/signupRouter.js');
const isAdminRouter = require('./routes/forum/admin/isAdminRouter.js');
const messageRouter = require('./routes/forum/message/messageRouter.js');
const forumRouter = require('./routes/forum/forumRouter.js');
const logoutRouter = require('./routes/forum/logoutRouter.js');
const showCategoryItemRouter = require('./routes/category/showCategory.js');
const categoryRouter = require('./routes/category/categoryRouter.js')
const carRouter = require('./routes/category/carRouter.js');
const newsRouter = require('./routes/newsRoute.js');
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

app.use('/', loginRouter);
app.use('/', signupRouter);
app.use('/', joinclubRouter);
app.use('/', isAdminRouter);
app.use('/', messageRouter);
app.use('/', forumRouter);
app.use('/', logoutRouter);
app.use('/', categoryRouter);
app.use('/', showCategoryItemRouter);
app.use('/', carRouter);
app.use('/', newsRouter);

app.listen(8080, () => console.log('Server is running on 8080'))
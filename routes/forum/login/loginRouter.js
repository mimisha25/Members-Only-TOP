const { Router } = require('express');
const loginRouter = Router();
const passport = require('passport');

loginRouter.get('/login', (req, res) => res.render('login'));
loginRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/forum',
    failureRedirect: '/login'
}));

module.exports = loginRouter;
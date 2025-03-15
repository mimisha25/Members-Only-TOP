const { Router } = require('express');
const logoutRouter = Router();

logoutRouter.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.send('Error logging out');
        res.redirect('/');
    });
});

module.exports = logoutRouter;
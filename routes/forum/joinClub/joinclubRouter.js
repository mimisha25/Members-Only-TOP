const { Router } = require('express');
const joinclubRouter = Router();
require('dotenv').config();
const controller = require('../../../controllers/forum/joinclub/joinClubController');

joinclubRouter.get('/join-club', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    res.render('joinClub');
})
joinclubRouter.post('/join-club', controller.member);
module.exports = joinclubRouter;
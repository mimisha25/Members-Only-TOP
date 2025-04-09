const { Router } = require('express');
const joinclubRouter = Router();
require('dotenv').config();
const controller = require('../../../controllers/forum/joinclub/joinClubController');
const isAdmin = require('../../authMiddleware').isMember;
const catchAsync = require('../../../utils/catchAsync');

joinclubRouter.get('/join-club', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    if (req.isAuthenticated() && req.user.membership_status) {
        return res.render('partials/modal', {
            text: 'You are a member!'
        });
    } else {
        return res.render('joinClub');
    }
})
joinclubRouter.post('/join-club', catchAsync(controller.member));
module.exports = joinclubRouter;
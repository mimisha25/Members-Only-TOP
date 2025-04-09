const { Router } = require('express');
const isAdminRouter = Router();
require('dotenv').config();
const controller = require('../../../controllers/forum/admin/isAdminController');
const isAdmin = require('../../authMiddleware').isAdmin;
const catchAsync = require('../../../utils/catchAsync');

isAdminRouter.get('/is-admin', (req, res) => {
    if (req.isAuthenticated() && req.user.admin) {
        return res.render('partials/modal', {
            text: 'You are an admin!'
        });
    } else {
        return res.render('isAdmin');
    }
});
isAdminRouter.post('/is-admin', catchAsync(controller.isAdmin));

module.exports = isAdminRouter;
const { Router } = require('express');
const isAdminRouter = Router();
require('dotenv').config();
const controller = require('../../../controllers/forum/admin/isAdminController');

isAdminRouter.get('/is-admin', (req, res) => res.render('isAdmin'));
isAdminRouter.post('/is-admin', controller.isAdmin);

module.exports = isAdminRouter;
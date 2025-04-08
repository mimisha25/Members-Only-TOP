const { Router } = require('express');
const signupRouter = Router();
const controller = require('../../../controllers/forum/signup/signupController');
const catchAsync = require('../../../utils/catchAsync');

signupRouter.get('/sign-up', (req, res) => res.render('signup'));
signupRouter.post('/sign-up', catchAsync(controller.signup));


module.exports = signupRouter;
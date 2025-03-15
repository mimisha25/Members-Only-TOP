const { Router } = require('express');
const signupRouter = Router();
const controller = require('../../../controllers/forum/signup/signupController');

signupRouter.get('/sign-up', (req, res) => res.render('signup'));
signupRouter.post('/sign-up', controller.signup);


module.exports = signupRouter;
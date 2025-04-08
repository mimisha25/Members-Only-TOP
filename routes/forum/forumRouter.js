const { Router } = require('express');
const forumRouter = Router();
const controller = require('../../controllers/forum/forumController');
const catchAsync = require('../../utils/catchAsync');

forumRouter.get('/forum', catchAsync(controller.forum));

module.exports = forumRouter;
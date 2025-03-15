const { Router } = require('express');
const forumRouter = Router();
const controller = require('../../controllers/forum/forumController');

forumRouter.get('/forum', controller.forum);

module.exports = forumRouter;
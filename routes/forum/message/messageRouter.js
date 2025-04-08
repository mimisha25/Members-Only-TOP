const { Router } = require('express');
const messageRouter = Router();
require('dotenv').config();
const controller = require('../../../controllers/forum/message/messageController');
const catchAsync = require('../../../utils/catchAsync');

messageRouter.get('/message/new', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    res.render('newMessage');
});

messageRouter.post('/message/new', catchAsync(async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    await controller.createMessage(req, res)
}));

messageRouter.post('/message/delete/:id', catchAsync(async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    await controller.deleteMessage(req, res);
}))

messageRouter.get('/message/edit/:id', catchAsync(controller.editMessage));
messageRouter.post('/message/edit/:id', catchAsync(controller.postEditMessage));
messageRouter.post('/message/mark-inappropriate/:id', catchAsync(async (req, res) => {
    if (!req.isAuthenticated() || !req.user.admin) return res.send('You are not authorized to perform this action');
    await controller.markInappropriate(req, res);
}))

module.exports = messageRouter;
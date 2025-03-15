const { Router } = require('express');
const messageRouter = Router();
require('dotenv').config();
const controller = require('../../../controllers/forum/message/messageController');

messageRouter.get('/message/new', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    res.render('newMessage');
});

messageRouter.post('/message/new', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    controller.createMessage(req, res)
});

messageRouter.post('/message/delete/:id', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    controller.deleteMessage(req, res);
})

messageRouter.get('/message/edit/:id', controller.editMessage);
messageRouter.post('/message/edit/:id', controller.postEditMessage);
messageRouter.post('/message/mark-inappropriate/:id', (req, res) => {
    if (!req.isAuthenticated() || !req.user.admin) return res.send('You are not authorized to perform this action');
    controller.markInappropriate(req, res);
})

module.exports = messageRouter;
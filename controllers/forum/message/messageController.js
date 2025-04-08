const db = require('../../../config/queries');
require('dotenv').config();
const ExpressError = require('../../../utils/ExpressError')

async function createMessage(req, res) {
    const { title, content } = req.body;
    const newMessage = await db.createMessage(title, content, req.user.id);
    if (!newMessage) throw new ExpressError('Error in creating message', 400);
    res.redirect('/forum');
}


async function deleteMessage(req, res) {
    const isMember = req.user && req.user.membership_status;
    const { id } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.admin;
    const message = await db.deleteMessage(id, isAdmin, userId);
    if (!message) throw new ExpressError('Error in deleting message', 400);
    res.redirect('/forum');
}


async function editMessage(req, res) {
    const messageId = req.params.id;
    const userId = req.user.id;
    const message = await db.editMessage(userId, messageId);
    if (!message) throw new ExpressError('Message not found or you are not authorized to edit this message.', 400);
    res.render('editMessage', { message: message });
};

async function postEditMessage(req, res) {
    const messageId = req.params.id;
    const userId = req.user.id;
    const { title, content } = req.body;
    const message = await db.postEditMessage(title, content, messageId, userId);
    if (!message) throw new ExpressError('Error in updating message .', 400);
    if (message.length === 0) throw new ExpressError('Any message got to data.', 400);
    res.redirect('/forum');
};


async function markInappropriate(req, res) {
    const { id } = req.params;
    const message = await db.markInappropriate(id);
    if (!message) throw new ExpressError('Error marking message as inappropriate', 400);
    if (message.length === 0) throw new ExpressError('Message not found', 400);
    res.redirect('/forum');

}

// async function forum(isMember) {
//     const query = isMember
//         ? 'SELECT messages.id, messages.title, messages.content, messages.timestamp, users.first_name, users.last_name, messages.user_id, messages.status FROM messages JOIN users ON messages.user_id=users.id'
//         : 'SELECT id, title, content, user_id, status  FROM messages';
//     pool.query(query, (e, result) => {
//         if (e) return res.send('Error fetching messages. Please try again later.');
//         res.render('index', { messages: result.rows || [], user: req.user });
//     })

// }
module.exports = {
    createMessage,
    deleteMessage,
    editMessage,
    postEditMessage,
    markInappropriate,
    // forum
}
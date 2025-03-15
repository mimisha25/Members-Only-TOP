const db = require('../../../config/queries');
require('dotenv').config();


async function createMessage(req, res) {
    try {
        const { title, content } = req.body;
        console.log('Title:', title);
        console.log('Content:', content);
        console.log('User ID:', req.user.id);
        const newMessage = await db.createMessage(title, content, req.user.id);
        if (!newMessage) return res.status(400).send('Error creating message');
        console.log('New Message:', newMessage);

        res.redirect('/forum');
    } catch (e) {
        console.error('Error in creating messages controller: ', e);
        res.status(500).send('Error in creating messages controller');
    }
}


async function deleteMessage(req, res) {
    try {
        const isMember = req.user && req.user.membership_status;
        const { id } = req.params;
        const userId = req.user.id;
        const isAdmin = req.user.admin;
        console.log(`Attempting to delete message with ID: ${id} by user: ${userId}`);
        const message = await db.deleteMessage(id, isAdmin, userId);
        if (!message) return res.send('Error deleting message');


        res.redirect('/forum');
    } catch (e) {
        console.error('Error in deleting messages controller: ', e);
        res.status(500).send('Error in deleting messages controller');
    }
}


async function editMessage(req, res) {
    try {
        const messageId = req.params.id;
        const userId = req.user.id;
        console.log('Attempting to fetch message with ID:', messageId, 'for user ID:', userId); // Debugging line

        const message = await db.editMessage(userId, messageId);
        if (!message) return res.send('Message not found or you are not authorized to edit this message.');
        res.render('editMessage', { message: message });
    } catch (e) {
        console.error('Error in editing messages controller: ', e);
        res.status(500).send('Error in editing messages controller');
    }
};

async function postEditMessage(req, res) {
    try {
        const messageId = req.params.id;
        const userId = req.user.id;
        const { title, content } = req.body;
        const message = await db.postEditMessage(title, content, messageId, userId);
        if (!message) {
            console.error('Error updating message:', e);
            return res.send('Error updating message.');
        }
        if (message.length === 0) return res.send('Message not found or you are not authorized to edit this message.');
        console.log('Message updated successfully:', message);
        res.redirect('/forum');
    } catch (e) {
        console.error('Error in post editing messages controller: ', e);
        res.status(500).send('Error in post editing messages controller');
    }
};


async function markInappropriate(req, res) {
    try {
        const { id } = req.params;
        const message = await db.markInappropriate(id);
        if (!message) {
            console.error('Error marking message as inappropriate:', e);
            return res.send('Error marking message.');
        }
        if (message.length === 0) return res.send('Message not found.')
        console.log('Message marked as inappropriate:', message);
        res.redirect('/forum');
    } catch (e) {
        console.error('Error in post editing messages controller: ', e);
        res.status(500).send('Error in post editing messages controller');
    }
}

async function forum(isMember) {
    try {
        const query = isMember
            ? 'SELECT messages.id, messages.title, messages.content, messages.timestamp, users.first_name, users.last_name, messages.user_id, messages.status FROM messages JOIN users ON messages.user_id=users.id'
            : 'SELECT id, title, content, user_id, status  FROM messages';
        pool.query(query, (e, result) => {
            if (e) return res.send('Error fetching messages. Please try again later.');
            res.render('index', { messages: result.rows || [], user: req.user });
        })
    } catch (e) {
        console.error('Error in post editing messages controller: ', e);
        res.status(500).send('Error in post editing messages controller');
    }
}
module.exports = {
    createMessage,
    deleteMessage,
    editMessage,
    postEditMessage,
    markInappropriate,
    forum
}
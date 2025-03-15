
const db = require('../../config/queries');
require('dotenv').config();



async function forum(req, res) {
    try {
        const isMember = req.user && req.user.membership_status;
        const isLoggedIn = req.isAuthenticated();
        if (!isLoggedIn) return res.render('index', { messages: [], user: req.user });
        const messages = await db.forum(req, res, isMember);
        return messages;
    } catch (e) {
        console.error('Error in forum controller: ', e);
        res.status(500).send('Error in forum controller');
    }

}



module.exports = { forum };
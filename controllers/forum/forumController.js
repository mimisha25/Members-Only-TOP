
const db = require('../../config/queries');
require('dotenv').config();


async function forum(req, res) {
    try {
        const isMember = req.user && req.user.membership_status;
        const isLoggedIn = req.isAuthenticated();
        if (!isLoggedIn) return res.render('forum', { messages: [], user: req.user });
        const message = await db.forum(req, res, isMember);

        const date = new Date(new Date().toISOString());
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        return res.render('forum', { messages: message, user: req.user, date: formattedDate });
    } catch (e) {
        console.error('Error in forum controller: ', e);
        res.status(500).send('Error in forum controller');
    }
}



module.exports = { forum };
const db = require('../../../config/queries');
const ExpressError = require('../../../utils/ExpressError');

async function isAdmin(req, res) {
    const { passcode } = req.body;
    if (!req.user || !req.user.email) throw new ExpressError('User is not authenticated', 401);
    if (passcode === 'admin') {
        const updateUser = await db.isAdmin(req.user.email);
        if (!updateUser) throw new ExpressError('User not found or already an admin', 400);
        res.redirect('/forum');
    } else res.send('Invalid passcode');
}


module.exports = {
    isAdmin
}
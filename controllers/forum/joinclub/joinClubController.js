const db = require('../../../config/queries');
require('dotenv').config();
const ExpressError = require('../../../utils/ExpressError');

async function member(req, res) {
    const { passcode } = req.body;
    const correctPasscode = process.env.SECRET_PASSCODE;
    if (passcode === correctPasscode) {
        const updateUser = db.member(req.user.id);
        if (!updateUser) throw new ExpressError('Error updating membership status .', 400);
        res.redirect('/forum');
    } else res.send('Incorrect passcode');
}


module.exports = {
    member
}
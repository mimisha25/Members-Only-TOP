const db = require('../../../config/queries');
require('dotenv').config();

async function member(req, res) {
    try {
        const { passcode } = req.body;
        const correctPasscode = process.env.SECRET_PASSCODE;
        if (passcode === correctPasscode) {
            const updateUser = db.member(req.user.id);
            if (!updateUser) return res.render('Error updating membership status');
            res.redirect('/forum');
        } else res.send('Incorrect passcode');
    } catch (e) {
        console.error('Error in is admin: ', e);
        res.status(500).send('Error fetching admin');
    }
}


module.exports = {
    member
}
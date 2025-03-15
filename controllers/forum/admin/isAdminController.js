const db = require('../../../config/queries');

async function isAdmin(req, res) {
    try {
        const { passcode } = req.body;
        if (!req.user || !req.user.email) {
            return res.status(401).send('User is not authenticated'); // or redirect to login
        }
        if (passcode === 'admin') {
            const updateUser = await db.isAdmin(req.user.email);
            if (!updateUser) return res.status(400).send('User not found or already an admin');
            res.redirect('/forum');
        } else res.send('Invalid passcode');
    } catch (e) {
        console.error('Error in is admin: ', e);
        res.status(500).send('Error fetching admin');
    }
}


module.exports = {
    isAdmin
}
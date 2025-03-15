const db = require('../../../config/queries');
require('dotenv').config();
async function signup(req, rea) {

    async function signup(req, res) {
        try {
            const { firstName, lastName, email, password, confirmPassword } = req.body;
            if (password !== confirmPassword) return res.send('Password do not match!');
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await db.signup(firstName, lastName, email, hashedPassword);
            if (!user) return res.render('Error creating user');
            res.redirect('/login');

        } catch (e) {
            console.error('Error in creating user controller: ', e);
            res.status(500).send('Error in creating user controller');
        }
    }
}

module.exports = {
    signup
}
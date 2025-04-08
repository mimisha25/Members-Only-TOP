const db = require('../../../config/queries');
require('dotenv').config();
const bcrypt = require('bcryptjs')
const ExpressError = require('../../../utils/ExpressError');
async function signup(req, res) {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) throw new ExpressError('Password do not match!', 400);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.signup(firstName, lastName, email, hashedPassword);
    if (!user) throw new ExpressError('Error creating user .', 400);
    res.redirect('/login');
}

module.exports = {
    signup
}
const pool = require('./pool');
const { v4: uuid } = require('uuid');



async function isAdmin() {
    try {
        const { rows } = await pool.query(
            'UPDATE users SET admin=true WHERE email=$1 RETURNING *',
            [email]
        );
        return rows[0];
    } catch (e) {
        console.error('Error updating admin permission: ', e);
        throw e;
    }
}


async function member() {
    try {
        const { rows } = await pool.query(
            'UPDATE users SET membership_status = TRUE WHERE id = $1',
            [req.user.id]);
        return rows[0];
    } catch (e) {
        console.error('Error updating status of membership: ', e);
        throw e;
    }
}


async function createMessage(title, content, userId) {
    try {
        console.log('Inserting message with title:', title, 'content:', content, 'userId:', userId); // Log the inputs

        const { rows } = await pool.query(
            'INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
            [title, content, userId]);
        console.log('Inserted Message:', rows[0]);  // Log the inserted message

        return rows[0];
    } catch (e) {
        console.error('Error creating messages: ', e);
        throw e;
    }
}

async function deleteMessage(id, isAdmin, userId) {
    try {
        const query = isAdmin
            ? 'DELETE FROM messages WHERE id=$1 RETURNING*'
            : 'DELETE FROM messages WHERE id=$1 AND user_id=$2 RETURNING*';
        const { rows } = await pool.query(query, isAdmin ? [id] : [id, userId]);
        return rows[0];
    } catch (e) {
        console.error('Error deleting messages: ', e);
        throw e;
    }
}

async function editMessage(userId, messageId) {
    try {
        console.log('Querying message with ID:', messageId, 'and user ID:', userId);  // Debugging line

        const query = 'SELECT * FROM messages WHERE id=$1 AND user_id=$2';
        const { rows } = await pool.query(query, [messageId, userId]);
        return rows[0];
    } catch (e) {
        console.error('Error editing messages: ', e);
        throw e;
    }
}

async function postEditMessage(title, content, messageId, userId) {
    try {
        const query = 'UPDATE messages SET title=$1, content=$2 WHERE id=$3 AND user_id=$4 RETURNING *';
        const { rows } = await pool.query(query, [title, content, messageId, userId]);
        return rows[0];
    } catch (e) {
        console.error('Error post editing messages: ', e);
        throw e;
    }
}

async function markInappropriate(id) {
    try {
        const query = `
        UPDATE messages
        SET status = CASE
            WHEN status = 'inappropriate' THEN 'appropriate'
            ELSE 'inappropriate'
        END
        WHERE id = $1
        RETURNING *;
    `;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (e) {
        console.error('Error post editing messages: ', e);
        throw e;
    }
}

async function signup(firstName, lastName, email, hashedPassword) {
    try {
        const { rows } = await pool.query(
            'INSERT INTO users (first_name, last_name, email, password, membership_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [firstName, lastName, email, hashedPassword, false]);
        return rows[0];
    } catch (e) {
        console.error('Error signup user: ', e);
        throw e;
    }
}


async function forum(req, res, isMember) {
    try {
        const query = isMember
            ? 'SELECT messages.id, messages.title, messages.content, messages.timestamp, users.first_name, users.last_name, messages.user_id, messages.status FROM messages JOIN users ON messages.user_id=users.id'
            : 'SELECT id, title, content, user_id, status  FROM messages';
        pool.query(query, (e, result) => {
            if (e) return res.send('Error fetching messages. Please try again later.');
            console.log(result.rows);
            res.render('index', { messages: result.rows || [], user: req.user });
        });
    } catch (e) {
        console.error('Error forum: ', e);
        throw e;
    }
}

module.exports = {
    isAdmin,
    member,
    createMessage,
    deleteMessage,
    editMessage,
    postEditMessage,
    markInappropriate,
    signup,
    forum
}
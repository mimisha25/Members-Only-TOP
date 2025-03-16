const pool = require('./pool');
const { v4: uuid } = require('uuid');




async function isAdmin(email) {
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


async function member(id) {
    try {
        const { rows } = await pool.query(
            'UPDATE users SET membership_status = TRUE WHERE id = $1',
            [id]);
        return rows[0];
    } catch (e) {
        console.error('Error updating status of membership: ', e);
        throw e;
    }
}


async function createMessage(title, content, userId) {
    try {
        const { rows } = await pool.query(
            'INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
            [title, content, userId]);
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
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}
async function signup(firstName, lastName, email, hashedPassword) {
    try {
        const svgProfilePicture = `<?xml version="1.0" encoding="UTF-8"?> 
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="80" fill=${getRandomColor()} class="bi bi-person-bounding-box img-fluid rounded-start" viewBox="0 0 16 16">
            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
        </svg>`;
        const { rows } = await pool.query(
            'INSERT INTO users (first_name, last_name, email, password, membership_status , profile_picture) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [firstName, lastName, email, hashedPassword, false, svgProfilePicture]);
        return rows[0];
    } catch (e) {
        console.error('Error signup user: ', e);
        throw e;
    }
}



async function forum(isMember) {
    try {
        const query = isMember
            ? 'SELECT messages.id, messages.title, messages.content, messages.timestamp, users.first_name, users.last_name,  users.profile_picture,messages.user_id, messages.status FROM messages JOIN users ON messages.user_id=users.id'
            : 'SELECT id, title, content, user_id, status  FROM messages';
        const { rows } = await pool.query(query);
        return rows;
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
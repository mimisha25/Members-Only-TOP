const { Client } = require('pg');
require('dotenv').config();
const CREATE_SQL_USERS = `
CREATE TABLE IF NOT EXISTS users (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    membership_status BOOLEAN DEFAULT FALSE,
    admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   profile_picture TEXT
);
`;

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

const CREATE_SQL_MESSAGES = `
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'active'
);
`;
const svg = `<?xml version="1.0" encoding="UTF-8"?> 
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="80" ${getRandomColor()} class="bi bi-person-bounding-box img-fluid rounded-start" viewBox="0 0 16 16">
    <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
</svg>`;

const date = new Date().toISOString();
const INSERT_USERS = `
INSERT INTO users (first_name, last_name, email, password, membership_status, admin, created_at, profile_picture)
VALUES 
('Jane', 'Doe', 'janedoe@email.com', '123', true, true, '${date}', '${svg}'),
('John', 'Doe', 'johndoe@email.com', '123', true, false, '${date}', '${svg}'),
('James', 'Smith', 'jamessmith@email.com', '123', false, false, '${date}', '${svg}');
`;


async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: process.env.DB_URL,
    })
    await client.connect();

    try {
        console.log('Creating tables...');
        await client.query(CREATE_SQL_USERS);
        await client.query(CREATE_SQL_MESSAGES);

        console.log('Inserting users...');
        await client.query(INSERT_USERS);

        console.log('Seeding completed!');

    } catch (e) {
        console.error('Error during seeding...', e);
        throw e;
    } finally {
        await client.end();
    }
}

main();
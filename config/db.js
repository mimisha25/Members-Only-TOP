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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
`;

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

const date = new Date().toISOString();
const INSERT_USERS = `
INSERT INTO users (first_name, last_name, email, password, membership_status, admin, created_at)
VALUES 
('Jane', 'Doe', 'janedoe@email.com', '123', true, true, '${date}'),
('John', 'Doe', 'johndoe@email.com', '123', true, false, '${date}'),
('James', 'Smith', 'jamessmith@email.com', '123', false, false, '${date}');
`;



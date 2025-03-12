const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const { Client } = require('pg');
const pool = require('./config/pool');
const path = require('node:path')
const methodOverride = require('method-override');
require('dotenv').config();
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));


app.listen(8080, () => console.log('Server is running on 8080'))
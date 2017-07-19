// initialize app
const express = require('express');
const app = express();

// dependencies
const chalk = require('chalk'); // colors for terminal
const mongoose = require('mongoose'); // mongodb object modeling
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler'); // handle server errors
const path = require('path'); // directory paths (built-in)
const flash = require('express-flash'); // flash without redirect

dotenv.load({ path: '.env' });

// DATABASE SETUP | MONGO-DB
// define database outside of callback
var db;
// create connection to database - MongoDB w/ Mongoose
db = mongoose.connect('mongodb://localhost:27017/movie-chat-app', { useMongoClient: true });

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // look for JSON in response body
app.use(flash());
app.use(errorHandler());

// routes through controller
var UserController = require('./controllers/users');
var RoomController = require('./controllers/rooms');
app.use('/api/users', UserController);
app.use('/api/rooms', RoomController);

module.exports = app;

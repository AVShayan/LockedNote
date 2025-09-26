require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const connectDB = require('./dbConn');
const mongodb = require('mongodb');
const PORT = process.env.PORT || 3500;
app.use(express.urlencoded({extended: false}));

connectDB();
app.use(cors());
app.use(express.json());
app.use('/',express.static(path.join(__dirname,'Views')));
app.use(session({
    secret: "090408",
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false},
}));
// Serving the index file temporarily
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'Views','index.html'));
})
app.use('/signup',require('./routes/signup'));
app.use('/login',require('./routes/login'));
app.use('/logout',require('./routes/logout'));
app.use('/notes',require('./routes/API/notes'));

mongoose.connection.once('open',() => {
    console.log("Connected to MongoDB");
    app.listen(PORT,() => console.log("Server running on PORT 3500"));
})
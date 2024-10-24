const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


// Load environment variables from a .env file (if you have one)
dotenv.config({ path: './config.env' });



//connects server.js to app.js
const app = require('./app');


mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    //console.log(conn);
    console.log('DB Connection Successful');
})

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log('server has started...');
})
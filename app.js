const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { DB_URL } = require('./config');

mongoose.connect(DB_URL, () => {
    console.log(`Connected to ${DB_URL}`);
})

module.exports = app;
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { DB_URL } = require('./config');
const bodyParser = require('body-parser');
const router = require('./router/routes.js');

mongoose.connect(DB_URL, () => {
    console.log(`Connected to ${DB_URL}`);
});

app.use(bodyParser.json());
app.use('/api', router);

app.use('/*', (req, res, next) => ({status: 404, msg: 'Page not found'}));

module.exports = app;
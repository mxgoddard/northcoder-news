const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { DB_URL } = require('./config');
const bodyParser = require('body-parser');
const router = require('./router/routes.js');
const { handle404, handle400, handle500 } = require('./error-handlers');

mongoose.connect(DB_URL, () => {
    console.log(`Connected to ${DB_URL}`);
});

app.use(bodyParser.json());
app.use('/api', router);

// Error handling
app.use('/*', (req, res, next) => ({status: 404, msg: 'Page not found'}));
app.use(handle400);
app.use(handle404);
app.use(handle500);

// 404 - Endpoint doesn't exist, 
// 404 - Paramter doesn't exist,
// 400 - Invalid parameter, 
// 400 - POST doesn't correspond with schema,

// Invalid queries should be ignored


module.exports = app;
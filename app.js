const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const { DB_URL } = require('./config');
const bodyParser = require('body-parser');
const router = require('./router/routes.js');
const { handle404, handle400, handle500 } = require('./error-handlers');
const { sendAllEndpoints } = require('./controllers/general.js');

mongoose.connect(process.env.PORT, () => {
    console.log(`Connected to mongodb server`);
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.get('/', sendAllEndpoints);
app.use('/api', router);

// Error handling
app.use('/*', (req, res, next) => next({status: 404, msg: `${req.originalUrl} does not exist`}));
app.use(handle400);
app.use(handle404);
app.use(handle500);

// 404 - Endpoint doesn't exist, 
// 404 - Paramter doesn't exist,
// 400 - Invalid parameter, 
// 400 - POST doesn't correspond with schema,

// Invalid queries should be ignored


module.exports = app;
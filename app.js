const express = require('express');
const mongoose = require('mongoose');
const app = express();
const  DB_URL  = process.env.DB_URL || require('./config').DB_URL;
const bodyParser = require('body-parser');
const router = require('./router/routes.js');
const { handle404, handle400, handle500 } = require('./error-handlers');
const { sendAllEndpoints } = require('./controllers/general.js');
const cors = require('cors');

mongoose.connect(DB_URL, { useNewUrlParser: true }, () => {
    console.log(`Connected to mongodb server`);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  });

app.use(express.static('public'));
// app.use(cors());
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
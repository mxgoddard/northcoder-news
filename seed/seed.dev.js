const seedDB = require('./seed');
const mongoose = require('mongoose');
const { DB_URL } = require('../config.js');
const data = require('./devData');

mongoose.connect('mongodb://mxgoddard:ncreddit1@ds131753.mlab.com:31753/db_ncreddit')
    .then(() => seedDB(data))
    .then(() => {   // What should I do with this line?
        mongoose.disconnect();
    });
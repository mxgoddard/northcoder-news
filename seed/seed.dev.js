const seedDB = require('./seed');
const mongoose = require('mongoose');
const { DB_URL } = require('../config.js');
const data = require('./devData');

mongoose.connect(DB_URL)
    .then(() => seedDB(data))
    .then(() => {   // What should I do with this line?
        mongoose.disconnect();
    });
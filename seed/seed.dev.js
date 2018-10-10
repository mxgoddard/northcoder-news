const seedDB = require('./seed');
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/ncreddit';
const data = require('./testData');

mongoose.connect(DB_URL)
    .then(() => seedDB(data))
    .then(({ article, comment, topic, user}) => {
        mongoose.disconnect();
    })
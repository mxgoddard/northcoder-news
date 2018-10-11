const express = require('express');
const router = express.Router();
const { sendAllEndpoints } = require('../controllers/general');
const { sendAllTopics } = require('../controllers/topics.js');

router
    .route('')
    .get(sendAllEndpoints);

router
    .route('/topics')
    .get(sendAllTopics);

module.exports = router;
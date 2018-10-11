const express = require('express');
const router = express.Router();
const { sendAllEndpoints } = require('../controllers/general.js');
const { sendAllTopics } = require('../controllers/topics.js');
const { sendAllArticles } = require('../controllers/articles.js');
const { sendAllUsers, sendUserByUsername } = require('../controllers/users.js');

// API
router
    .route('')
    .get(sendAllEndpoints);

// Topics
router
    .route('/topics')
    .get(sendAllTopics);

// router
//     .route('/topics/:topic_slug/articles')
//     .get(sendTopicBySlug);

// Articles
router
    .route('/articles')
    .get(sendAllArticles);

// USers
router
    .route('/users')
    .get(sendAllUsers);

router
    .route('/users/:username')
    .get(sendUserByUsername);

module.exports = router;
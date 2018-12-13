const express = require('express');
const router = express.Router();
const { sendAllEndpoints } = require('../controllers/general.js');
const { sendAllTopics, sendTopicBySlug } = require('../controllers/topics.js');
const { sendAllArticles, sendArticleByID, getArticleComments, postArticleComment, patchArticleVotes } = require('../controllers/articles.js');
const { sendAllUsers, sendUserByUsername } = require('../controllers/users.js');
const { deleteCommentById, patchCommentVotes } = require('../controllers/comments.js');

// API
router
    .route('')
    .get(sendAllEndpoints);

// Topics
router
    .route('/topics')
    .get(sendAllTopics);

router
    .route('/topics/:topic_slug/articles')
    .get(sendTopicBySlug)
    .post(sendTopicBySlug);

// Articles
router
    .route('/articles')
    .get(sendAllArticles);

router
    .route('/articles/:article_id/comments')
    .get(getArticleComments)
    .post(postArticleComment)

router
    .route('/articles/:article_id')
    .get(sendArticleByID)
    .patch(patchArticleVotes);

// Users
router
    .route('/users')
    .get(sendAllUsers);

router
    .route('/users/:username')
    .get(sendUserByUsername);

router
    .route('/comments/:comment_id')
    .delete(deleteCommentById)
    .patch(patchCommentVotes);

module.exports = router;
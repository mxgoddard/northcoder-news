const { Article, Comment, Topic } = require('../models');

/// GET /api/topics
/// # Get all the topics
exports.sendAllTopics = (req, res, next) => {
  return Topic.find()
    .then(topics => {
      res.status(200)
      res.send({ topics });
    })
    .catch(next);
};
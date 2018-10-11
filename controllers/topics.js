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

/// GET /api/topics/:topic_slug/articles
/// # Return all the articles for a certain topic
/// # e.g: `/api/topics/football/articles`
exports.sendTopicBySlug = (req, res, next) => {
    const { slug } = req.params;
    res.status(200);
    res.send({slug: `slug`});
}
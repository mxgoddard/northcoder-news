const { Article, Comment, Topic } = require('../models');


// Gets all the topics
exports.sendAllTopics = (req, res, next) => {
  return Topic.find()
    .then(topics => {
      res.status(200)
      res.send({ topics });
    })
    .catch(next);
};


exports.sendTopicBySlug = (req, res, next) => {
    const { topic_slug } = req.params;
    return Promise.all([Article.find({ belongs_to: topic_slug })
        .populate('created_by')
        .lean()
        .exec(),
        Comment.find()
        .lean()
      ])
    .then(([articleDocs, commentDocs]) => {
        if (articleDocs.length === 0) throw { status: 404, message: 'No Articles Found for Requested Topic' };
        articles = articleDocs.map(article => {
            const comments = commentDocs.filter(comment => comment.belongs_to.toString() === article._id.toString()).length;
            return { ...article, comments };
        });
        res.status(200).send({ articles });
      })
      .catch(next);
  };


// Post article by topic
exports.postArticleBySlug = (req, res, next) => {
    const { topic_slug } = req.params;
    const { body, title, created_by} = req.body

    Article.create({ ...req.body, belongs_to: topic_slug })
    .then(article => {
      res.status(201).send(article)
    })
    .catch(next)
};
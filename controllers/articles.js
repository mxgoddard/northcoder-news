const { Article, Comment } = require('../models');

exports.sendAllArticles = (req, res, next) => {
    return Article.find()
    .then((articles) => {
        res.status(200);
        res.send({ articles });
    })
    .catch(next);
};


exports.sendArticleByID = (req, res, next) => {
    const { article_id } = req.params;
    return Article.findById(article_id)
      .lean()
      .populate('created_by')
      .then(article => {
        return Promise.all([Comment.find({ belongs_to: article._id }), article]);
      })
      .then(([comments, article]) => {
        article.comment_count = comments.length;
        res.status(200).send({ article });
      })
      .catch(err => {
        if (err.name === 'CastError') next({ status: 400, msg: 'Bad Request' });
        else next(err);
      });
};


// Get all the comments for an article
exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  return Article.findById(article_id)
    .then(article => {
      if (!article) return Promise.reject({ status: 404, msg: "Article doesn't exist"});
      return Comment.find({ belongs_to: article_id })
        .populate('belongs_to created_by')
        .exec()
    })
    .then(comments => {
      if (!comments.length) res.status(404).send({status: 404, msg: "There aren't any comments for this article"})
      else res.status(200).send({ comments });
    })
    .catch(next);
};


// Post a comment for an article
exports.postArticleComment = (req, res, next) => {
  const { article_id } = req.params; 
  const { body, votes, created_by } = req.body

  Comment.create({ ...req.body, belongs_to: article_id })
  .then(comment => {
    res.status(201).send(comment)
  })
  .catch(next)
};


// Updated articles votes
exports.patchArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const vote = req.query.vote;

  vote === 'up' ? vote=1 : vote = -1;

  return Article.findByIdAndUpdate(
    article_id,
    { $inc: { votes: vote } },
    { new: true }
  )
    .then(article => {
      if (!article) Promise.reject({ status: 404, message: 'No article to adjust votes for.' });
      res.status(200).send({ article });
    })
    .catch(next);
};
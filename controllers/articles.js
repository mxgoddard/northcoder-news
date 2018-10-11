const { Article, Comment, Topic } = require('../models');

exports.sendAllArticles = (req, res, next) => {
    return Article.find()
    .then((articles) => {
        res.status(200);
        res.send(articles);
    })
    .catch(next);
};

// GET /api/articles/:article_id
// # Get an individual article
// exports.sendArticleByID = (req, res, next) => {
//     const { id } = req.params;   
//     return Article.findById(id);
    
// }

// lean returns a JS object instead of a mongoose document
exports.sendArticleByID = (req, res, next) => {
    const { aID } = req.params;
    return Article.findOne({ aID })
      .lean()
      .populate('created_by')
      .then(article => {
          // article._id or aID??
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
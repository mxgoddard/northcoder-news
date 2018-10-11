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
exports.sendArticleByID = (req, res, next) => {
    const { id } = req.params;
    return Article.findById(id);
    
}
const { Article, Comment, Topic } = require('../models');

exports.sendAllArticles = (req, res, next) => {
    return Article.find()
    .then((articles) => {
        res.status(200);
        res.send(articles);
    })
    .catch(next);
};


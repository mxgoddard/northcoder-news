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
// exports.sendTopicBySlug = (req, res, next) => {
//     const { slug } = req.params;
//     res.status(200);
//     res.send({slug: `slug`});
// }

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

// POST /api/topics/:topic_slug/articles
// # Add a new article to a topic. This route requires a JSON body with title and body key value pairs
// # e.g: `{ "title": "new article", "body": "This is my new article content", "created_by": "user_id goes here"}`
exports.postArticleBySlug = (req, res, next) => {
    const { topic_slug } = req.params;
    // newArticle = new Article(req.body);
    // newArticle.belongs_to = topic_slug;
    const { body, title, created_by} = req.body

    Article.create({ ...req.body, belongs_to: topic_slug })
    .then(article => {
      res.status(201).send(article)
    })
    .catch(err => console.log(err))
    
    // return Topic.findOne({ slug: topic_slug })
    //     .then(topic => {
    //       console.log(topic, '<<<<<<<<<< TOPIC')
    //     if (!topic) next({ status: 400, message: 'Topic Does Not Exist' });
    //       return newArticle.save();
    //     })
    //     .then(article => {
    //     res.status(201).send({ article });
    //     })
    //   .catch(next);
};
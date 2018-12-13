const { Article, Comment, Topic, User } = require('../models');


// Gets all the topics
exports.sendAllTopics = (req, res, next) => {
  return Topic.find()
    .then(topics => {
      res.status(200)
      res.send({ topics });
    })
    .catch(next);
};


// exports.sendTopicBySlug = (req, res, next) => {
//     const { topic_slug } = req.params;
//     return Promise.all([Article.find({ belongs_to: topic_slug })
//         .populate('created_by')
//         .lean()
//         .exec(),
//         Comment.find()
//         .lean()
//       ])
//     .then(([articleDocs, commentDocs]) => {
//         if (articleDocs.length === 0) throw { status: 404, message: 'No Articles Found for Requested Topic' };
//         articles = articleDocs.map(article => {
//             const comments = commentDocs.filter(comment => comment.belongs_to.toString() === article._id.toString()).length;
//             return { ...article, comments };
//         });
//         res.status(200).send({ articles });
//       })
//       .catch(next);
//   };

  exports.sendTopicBySlug = (req, res, next) => {
    const {topic_slug} = req.params;
    const body = req.body;
    const post = new Article({
        title: body.title,
        body: body.body,
        belongs_to: topic_slug,
        created_by: body.created_by,
      })
      post.save()
        .then(postedArticle => {
          return Article.findOne({'_id' : postedArticle._id}).populate('created_by').lean()
        })
        .then(foundArticle => {
            let comment_count = 0;
            const article = {...foundArticle, comment_count}
            res.status(201).send({article})
        })
        .catch(err => {
            console.log(err);
        })
}


// Post article by topic
// exports.postArticleBySlug = (req, res, next) => {
//     const { topic_slug } = req.params;
//     const { body, title, created_by} = req.body

//     Promise.all([ Article.create({ ...req.body, belongs_to: topic_slug }), User.findOne({_id: created_by}) ])
//     .then(([article, user]) => {
//       console.log(article);
//       console.log(user);
//       article.created_by = user;
//       res.status(201).send(article)
//     })
//     .catch(next)
// };

exports.createArticle = (req, res, next) => {
	const { topic_slug } = req.params,
    newArticle = new Article(req.body);
  	newArticle.belongs_to = topic_slug;
  	return Topic.findOne({ slug: topic_slug }).then(topic => {
    	if (!topic) throw { status: 400, message: 'Topic Does Not Exist' };
    	return newArticle.save();
    }).then(article => {
    	res.status(201).send({ article });
    }).catch(next);
};
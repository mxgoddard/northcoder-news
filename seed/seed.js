const mongoose = require('mongoose');
const { createRefObject, formatArticleData, formatCommentData } = require('../utils');
const { Article, Comment, Topic, User } = require('../models'); 

const seedDB = ({ articlesData, commentsData, topicsData, usersData }) => {
    return mongoose.connection.dropDatabase()
        .then(() => {
            return Promise.all([ Topic.insertMany(topicsData), User.insertMany(usersData)]);
        })
        .then(([ topicDocs, userDocs ]) => {
            return Promise.all([ Article.insertMany(formatArticleData(articlesData, userDocs)), topicDocs, userDocs ]);
        })
        .then(([ articleDocs, topicDocs, userDocs ]) => {
            return Promise.all([ articleDocs, Comment.insertMany(formatCommentData(commentsData, articleDocs, userDocs)), topicDocs, userDocs ]);
        })
        .then(([ articleDocs, commentDocs, topicDocs, userDocs ]) => {
            return Promise.all([ articleDocs[0], commentDocs[0], topicDocs[0], userDocs[0] ]);  // [0] on end for reference
        });
};

module.exports = seedDB;
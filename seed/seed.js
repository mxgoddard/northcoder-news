const mongoose = require('mongoose');
const { createRefObject, formatArticleData } = require('../utils');
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
            return Promise.all([ articleDocs, commentDocs, topicDocs, userDocs ]);
        });
};

module.exports = seedDB;
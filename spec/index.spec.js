process.env.NODE_EV = 'test';
const mongoose = require('mongoose');
const app = require('../app');
const { expect } = require('chai');
const request = require('supertest')(app);
const seedDB = require('../seed/seed');
const data = require('../seed/testdata'); 
const { usersData, articlesData, commentsData, topicsData } = require('../seed/testData');
const { Article, Comment, Topic, User } = require('../models'); 

describe('/api', () => {
    let docData;

    // Drop and seed the database
    beforeEach(() => {
        return mongoose.connection.dropDatabase()
        .then(() => {
            return seedDB({topicsData, usersData, articlesData, commentsData})
        })    
        .then((docs) => {
            [article, comment, topic, user] = docs;
        })     
    });

    // Stop the test hanging at the end
    after(() => {
        mongoose.disconnect();
    });

    // Test for invalid URLs
    describe('/invalidURL', () => {
        it('Returns 404 for any method on a non-existant url', () => {
            return request
                .get('/api/dodgy-url')
                .expect(404)
        });
        it('Returns an appropriate error message when given a non-existant url', () => {
            let url = 'someting';
            return request 
                .get(`/api/${url}`)
                .then(({ body }) => {
                    expect(body.msg).to.equal(`/api/${url} does not exist`)
                });
        })
    });

    // Test that all topics are returned
    describe('/topics', () => {
        it('Returns all topics', () => {
            return request
                .get('/api/topics')
                .expect(200)
                .then(res => {
                    expect(res.body.topics).to.be.an('array');
                    expect(res.body.hasOwnProperty('topics')).to.equal(true);
                    expect(res.body.topics.length).to.equal(2);
                });
        });
    });

    // Test that all articles are returned
    describe('/articles', () => {
        it('Returns all articles', () => {
            return request
                .get('/api/articles')
                .expect(200)
                .then(res => {
                    expect(res.body.articles).to.be.an('array');
                    expect(res.body.hasOwnProperty('articles')).to.equal(true);
                    expect(res.body.articles.length).to.equal(4);
                });
        });
    });

    // Test that all users are returned
    describe('/users', () => {
        it('Returns all users', () => {
            return request
                .get('/api/users')
                .expect(200)
                .then(res => {
                    expect(res.body.users).to.be.an('array');
                    expect(res.body.hasOwnProperty('users')).to.equal(true);
                    expect(res.body.users.length).to.equal(2);
                });
        });
    });

    // Test that a specific user is returned from their username
    describe('/users/:username', () => {
        it('Gets a status code of 200 when getting a succesfull user', () => {
            return request 
                .get('/api/users/butter_bridge')
                .expect(200)
        })
        it('Returns the desired user object when given a valid username', () => {
            return request
                .get('/api/users/butter_bridge')
                .then(res => {
                    // console.log(res.body);
                    expect(res.body.hasOwnProperty('user')).to.equal(true);
                    // expect(res.body.user.length).to.equal(1);
                });
        });
        it('Incorrect usernames should send out a 404', () => {
            return request
            .get('/api/users/butter_bridg')
            .expect(404)
        })
        it('Incorrect usernames should display and tell the user the incorrect username', () => {
            let testUsername = 'butter_bridg';
            return request
            .get(`/api/users/${testUsername}`)
            .then(res => {
                expect(res.body.msg).to.equal(`Username '${testUsername}' is invalid`)
            });
        });
    });


    // Test that an article can successfully be POSTED
    describe('POST /topics/:slug/articles', () => {
        it('Returns an article that the user has created', () => {
            // let userID = "5bc077fda122bb52e2a19650";
            let userID = user._id;
            const newArticle = {
                "title": "newArticle",
                "body": "New content here",
                "created_by": `${userID}`
            };
            
            return request
                .post('/api/topics/mitch/articles')
                .send(newArticle)
                .expect(201)
                .then(res => {
                    // expect(res.body.hasOwnProperty('article')).to.equal(true);
                    // expect(res.body.created_by).to.equal(userID);
                });
        });
    });


    // Test that the correct article is retrieved when passing an articles ID
    describe('GET /articles/:article_id', () => {
        it('Requesting an article should give a 200', () => {
            let articleID = article._id;
            return request
                .get(`/api/articles/${articleID}`)
                .expect(200)
        });
        it('A returned article should be an article', () => {
            let articleID = article._id;
            return request
                .get(`/api/articles/${articleID}`)
                .then(res => {
                    expect(res.body.hasOwnProperty('article')).to.equal(true);
                });
        });
        it('The desired article should have 0 votes', () => {
            let articleID = article._id;
            return request
                .get(`/api/articles/${articleID}`)
                .then(res => {
                    expect(res.body.article.votes).to.equal(0);
                });
        });
    });


    // Test that all comments are returned when given an article ID
    describe('GET /articles/:article_id/comments', () => {
        it('The correct number of comments should be returned', () => {
            let articleID = article._id;
            return request
            .get(`/api/articles/${articleID}/comments`)
            .then(res => {
                expect(res.body.hasOwnProperty('comments')).to.equal(true);
            });
        });
        it('The comments should have some content', () => {
            let articleID = article._id;
            return request
            .get(`/api/articles/${articleID}/comments`)
            .then(res => {
                expect(res.body.comments[0].body.length).to.be.greaterThan(0);
                // expect(res.body.hasOwnProperty('comments')).to.equal(true);
            });
        });
    });


    // Test that a comment is created
    describe('POST /articles/:article_id/comments', () => {
        it('A successfully made comment should return a 201', () => {
            let userID = user._id;
            let articleID = article._id;
            const newComment = {
                "body": "THIS IS A COMMENT",
                "votes": 1,
                "created_by": userID
            };
            
            return request
                .post(`/api/articles/${articleID}/comments`)
                .send(newComment)
                .expect(201)
                .then(comment => {
                    expect(comment.body.votes).to.equal(1);
                })
        });
        it('Expect the newly created comment to have all the specified information on it', () => {
            let userID = user._id;
            let articleID = article._id;
            const newComment = {
                "body": "THIS IS A COMMENT",
                "votes": 1,
                "created_by": userID
            };
            
            return request
                .post(`/api/articles/${articleID}/comments`)
                .send(newComment)
                .then(comment => {
                    expect(comment.body.votes).to.equal(1);
                    expect(comment.body.created_by).to.equal(`${userID}`);
                })
        })
    });


    // Delete comments - expect 200, an empty object and comment count to decrease
    describe('DELETE /comments/:comment_id', () => {
        it('Comments should be deleted correctly', () => {
            let commentID = comment._id;
            return request
                .delete(`/api/comments/${commentID}`)
                .then(res => {
                    expect(200);
                    expect(res.body).to.eql({});
                    return Comment.count();
                })
                .then(commentCount => {
                    expect(commentCount).to.equal(7);
                })
                
        });
    });


});
 

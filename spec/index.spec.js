process.env.NODE_EV = 'test';
const mongoose = require('mongoose');
const app = require('../app');
const { expect } = require('chai');
const request = require('supertest')(app);
const seedDB = require('../seed/seed');
const data = require('../seed/testdata'); 
const { usersData, articlesData, commentsData, topicsData } = require('../seed/testData');

describe('/api', () => {
    let docData;

    // Drop and seed the database
    beforeEach(() => {
        return mongoose.connection.dropDatabase()
        .then(() => {
            return seedDB({topicsData, usersData, articlesData, commentsData})
        })    
        .then((docs) => {
            docData = docs;
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
                .then(({ body }) => {
                    expect(body.msg).to.equal('/api/dodgy-url does not exist')
                });
        });
    });


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

    describe('/users/:username', () => {
        it('Returns user specified by their username', () => {
            return request
                .get('/api/users/butter_bridge')
                .expect(200)
                .then(res => {
                    expect(res.body.hasOwnProperty('user')).to.equal(true);
                    expect(res.body.user.length).to.equal(1);
                });
        });
    });
 

});
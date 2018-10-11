process.env.NODE_EV = 'test';
const mongoose = require('mongoose');
const app = require('../app');
const { expect } = require('chai');
const request = require('supertest')(app);
const seedDB = require('../seed/seed');
const data = require('../seed/testdata');

describe('/api', () => {
    // let actor, movie, company;
    // beforeEach(() => {
    //     return seedDB(data)
    //     .then(docs => {
    //         [actor, company, movie] = docs;
    //     })
    // })
    // after(() => {
    //     return mongoose.disconnect();
    // })

    it('Returns 404 for any method on a non-existant url', () => {
        return request.get('/dodogy-url')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).to.equal('/dodgy-url does not exist')
        });
    });

});
process.env.NODE_EV = 'test';
const mongoose = require('mongoose');
const app = require('../app');
const { expect } = require('chai');
const request = require('supertest')(app);
const seedDB = require('../seed/seed');
const data = require('../seed/testdata');

describe('/api/articles', () => {
    it('Returns 404 for any method on a non-existant url', () => {
        return request.get('/api/dodgy-url')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).to.equal('/dodgy-url does not exist')
        });
    });

});
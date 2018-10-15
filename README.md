# Northcoder's Reddit

This is an express based API that serves information stored on the Northcoder reddit via a public API. The application is hosted with Heroku and uses MongoDB for data retrieval.

## Getting Started

[The Northcoder Reddit](https://ncreddit.herokuapp.com/)

## Installation & Configuration

### Dependencies

If wanting to use this program for yourself, you will have to install some dependices.

```
$ npm i body-parser

$ npm i ejs

$ npm i express

$ npm i mongodb

$ npm i mongoose
```

The below packages are only recommended if you want to test your program.

```
$ npm i chai

$ npm i mocha

$ npm i nodemon

$ npm i supertest
```

### Config File

You will have to setup a config.js file anyone in your environment like below. This will be needed to store your configuration and required in when needing to listen.

```js
let env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        DB_URL: '<database URL here>'
    }
}

module.exports = config[env];
```

### Database Seeding

Once everything else has been setup, you need to populate or 'seed' your database. 

This is done easily by running the following command.

```
$ npm run seed.dev.js
```

Depeneding on whether you want to seed your database with test data or actual data, you must change the file-path of data in the seed.dev.js file between either './testData' or './devData'.

```js
const data = require('./devData');
```

## Running Tests

If these steps haven't been completed, ensure that you complete them. 

* Create a spec folder containing an index.spec.js file

* In your package.json, create a test script in the script section that is directed to your test file.

```js
"test": "mocha ./spec/*.spec.js",
```

* The *mocha* and *chai* packages should be installed, follow installation instructions above if they aren't.

* Now in the console run

```
npm test
```

## Routes

```
GET /api
GET /api/topics
GET /api/topics/:topic_slug/articles
POST /api/topics/:topic_slug/articles
GET /api/articles
GET /api/articles/:article_id
GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments
PATCH /api/articles/:article_id
PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id
GET /api/users/:username
```

## Built With

[Express](https://expressjs.com/)

[EJS](http://ejs.co/)

[MongoDB](https://www.mongodb.com/)

-----------------------------------------------------------------------------------------------------------------------
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
        DB_URL: 'mongodb://localhost:27017/ncreddit'
    },
    test: {
        DB_URL: 'mongodb://localhost:27017/ncreddit'
    },
    production: {
        DB_URL: 'mongodb://<db_user>:<db_password>@ds131753.mlab.com:31753/db_ncreddit'
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

```js
// Gets the applications homepage
GET /api

// Gets an object containing all topics
GET /api/topics

// Gets all articles with a specified topic
GET /api/topics/:topic_slug/articles

// Creates a new article with the specified topic
POST /api/topics/:topic_slug/articles

// Gets all the articles
GET /api/articles

// Gets a specific article by its ID
GET /api/articles/:article_id

// Get all the comments for the specified article
GET /api/articles/:article_id/comments

// Creates a comment for a specific article
POST /api/articles/:article_id/comments

// Updates the votes for a specific article
PATCH /api/articles/:article_id

// Updates the comments for a specific comment
PATCH /api/comments/:comment_id

// Deletes a comment dependent on its ID
DELETE /api/comments/:comment_id

// Gets an object of all the users
GET /api/users

// Gets a specific user by their username
GET /api/users/:username
```

## Built With

[Express](https://expressjs.com/)

[EJS](http://ejs.co/)

[MongoDB](https://www.mongodb.com/)

-----------------------------------------------------------------------------------------------------------------------
# Northcoder's Reddit

This is an express based API that serves information stored on the Northcoder reddit via a public API. The application is hosted with Heroku and uses MongoDB for data retrieval.

## Getting Started

[The Northcoder Reddit](https://ncreddit.herokuapp.com/)

### Installation & Configuration

If wanting to use this program for yourself, you will have to install some dependices.

```
npm i body-parser

npm i ejs

npm i express

npm i mongodb

npm i mongoose
```

The below packages are only recommended if you want to test your program.

```
npm i chai

npm i mocha

npm i nodemon

npm i supertest
```

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

## Built With

[Express](https://expressjs.com/)

[EJS](http://ejs.co/)

[MongoDB](https://www.mongodb.com/)

-----------------------------------------------------------------------------------------------------------------------

Routes to do:

404 - endpoint doesn't exist
404 - parameter doesn't exist
400 - bad request, invalid param
400 - post doesn't respond to schema
Invalid queries should be ignored

---------------------------------
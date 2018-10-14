let env = process.env.NODE_ENV || 'production';

const config = {
    development: {
        DB_URL: 'mongodb://localhost:27017/ncreddit'
    },
    test: {
        DB_URL: 'mongodb://localhost:27017/ncreddit'
    },
    production: {
        DB_URL: 'mongodb://mxgoddard:ncreddit1@ds131753.mlab.com:31753/db_ncreddit'
    }
}

module.exports = config[env];
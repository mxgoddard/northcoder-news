let env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        DB_URL: 'mongodb://localhost:27017/ncreddit'
    },
    test: {
        DB_URL: 'mongodb://localhost:27017/ncreddit'
    }
}

module.exports = config[env];
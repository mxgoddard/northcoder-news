const { User } = require('../models');

exports.sendAllUsers = (req, res, next) => {
    return User.find()
    .then((users) => {
        res.status(200);
        res.send(users);
    })
    .catch(next)
}
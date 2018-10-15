const { User } = require('../models');

exports.sendAllUsers = (req, res, next) => {
    return User.find()
    .then((users) => {
        res.status(200);
        res.send({ users });
    })
    .catch(next)
}

exports.sendUserByUsername = (req, res, next) => {
    const { username } = req.params;
    return User.findOne( req.params ).lean()
    .then(user => {
        if(!user) return Promise.reject({status: 404, msg: `Username '${username}' is invalid`})
        res.status(200).send({ user });
    })
    .catch((err) => {
        next(err);
    })
};
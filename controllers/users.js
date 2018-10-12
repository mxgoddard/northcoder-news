const { User } = require('../models');

exports.sendAllUsers = (req, res, next) => {
    return User.find()
    .then((users) => {
        res.status(200);
        res.send(users);
    })
    .catch(next)
}

exports.sendUserByUsername = (req, res, next) => {
    const { username } = req.params;
    return User.findOne({ username: username })
    .then(user => {
        // if(!user) next({status: 400, msg: 'Invalid username'})
        res.status(200).send({ user });
    })
    .catch((err) => {
        res.status(400);
        if(err.name === 'CastError') next({status: 400, msg: 'Invalid username'})
        else next(err);
    })
};
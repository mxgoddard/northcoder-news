// err = { status, msg }
exports.handle404 = (err, req, res, next) => {
    if(err.status === 404) res.send(err.status).send({ msg });
    else next({status, msg});
};

exports.handle400 = (err, req, res, next) => {
    if(err.status === 400) res.send(err.status).send({ msg });
    else next({status, msg});
};

exports.handle500 = (err, req, res, next) => {
    // Do some error logging to fix in the future 'hypothetically'
    console.error(err);
    res.status(500).send({ msg: 'Internal server error' });
};
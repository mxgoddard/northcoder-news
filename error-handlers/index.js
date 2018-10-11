// err = { status, msg }
exports.handle404 = ({status, msg}, req, res, next) => {
    if(status === 404) res.sendStatus(status).send({ msg });
    else next({status, msg});
};

exports.handle400 = ({status, msg}, req, res, next) => {
    if(status === 400) res.sendStatus(status).send({ msg });
    else next({status, msg});
};

exports.handle500 = ({status, msg}, req, res, next) => {
    // Do some error logging to fix in the future 'hypothetically'
    console.error(msg);
    res.status(500).send({ msg: 'Internal server error' });
};
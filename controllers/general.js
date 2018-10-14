/// Send all endpoints
exports.sendAllEndpoints = (req, res, next) => {
    res.status(200);
    res.render('homepage');
}
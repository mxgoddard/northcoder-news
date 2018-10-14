const app = require('./app.js');
const port = 9090;

// app.listen(port, () => console.log(`Listening on port ${port}`));
app.listen(process.env.PORT || port)

module.exports = { app };
const app = require('./app.js');
const port = 9090;

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = { app };
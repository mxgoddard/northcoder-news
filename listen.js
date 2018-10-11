const app = require('./index.js');
const port = 9090;

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = { app };
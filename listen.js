const app = require('./app.js');
const port = 9090;

// app.listen(port, () => console.log(`Listening on port ${port}`));
app.listen(process.env.MONGO_URI || port)

module.exports = { app };
const app = require('./app');

const { PORT = 9090 } = process.env;
// app.listen(process.env.PORT || port)

app.listen(PORT, (err) => {
    if(err){
        console.log(err.message);
        throw err;
    } console.log(`Listening on port ${PORT}`);
})
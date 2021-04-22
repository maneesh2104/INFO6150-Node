const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/', {useNewUrlParser: true});
mongoose.connection.on('connected', err => {
    console.log("Connected");
    //logError(err);
});

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);
//cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

exports = module.exports  = app;
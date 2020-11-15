const express = require("express");
const logger = require("morgan");
const path = require('path')
let mongoose = require("mongoose");
require('dotenv/config');

// ***Setup Express
const PORT = process.env.PORT || 3000;
const app = express();

const db = require('./models');

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
    , () => console.log('connected to db'));

// ***Middleware
app.use(logger('dev'));

// ***body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ***Static Directory
app.use(express.static('public'));
app.get('/exercise', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/exercise.html'))
})
app.get('/stats', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/stats.html'))
})

app.get('/api/workouts', (req, res) => {
    console.log('testing')
    db.Workout.find({})
        .then(data => {
            console.log(data)
            res.json(data)
        })

})

app.get('/api/workouts/range', (req, res) => {
    console.log('testing')
    db.Workout.find({}).limit(7)
        .then(data => {
            console.log(data)
            res.json(data)
        })

})

// ***Start Server
app.listen(PORT, () => console.log("==> Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT));
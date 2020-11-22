const express = require('express');
const logger = require('morgan');
let mongoose = require('mongoose');
require('dotenv/config');

// ***Setup Express
const PORT = process.env.PORT || 3000;
const app = express();

// ***Middleware
app.use(logger('dev'));

// ***body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ***Static Directory
app.use(express.static('public'));

// ***Import Routes
const htmlRoutes = require('./routes/htmlRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');

app.use('/', htmlRoutes);
app.use('/api/workouts', apiRoutes);

// *** Connect to Mongoose & Start Server
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
    , useFindAndModify: false
    , useUnifiedTopology: true
})
    .then(() => {
        app.listen(PORT, () => console.log('==> Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT));
    })
    .catch((error) => { console.log(error.message); });

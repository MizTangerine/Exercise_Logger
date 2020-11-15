const express = require("express");
const logger = require("morgan");

// ***Setup Express
const PORT = process.env.PORT || 3000;
const app = express();

const Workout = require('./models/Model.js');

// ***Middleware
app.use(logger('dev'));

// ***body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ***Static Directory
app.use(express.static('public'));

// ***Start Server
app.listen(PORT, () => console.log("==> Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT));
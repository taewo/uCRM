const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const index = require('./routes/index');

const app = express();
//
app.use(logger('dev'));
//
app.use(bodyParser.json());
// Returns middleware that only parses urlencoded bodies. This parser accepts only UTF-8 encoding of the body
app.use(bodyParser.urlencoded({ extended: false}));
//
app.use(cors());

//
app.use(cookieParser());

// specify the folder where user can access static files
app.use(express.static(path.join(__dirname, 'client/dist')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', index);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;

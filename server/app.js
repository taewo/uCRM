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
require('./config/passport')(passport);

//
app.use(logger('dev'));
//
app.use(bodyParser.json());

// Returns middleware that only parses urlencoded bodies.
// This parser accepts only UTF-8 encoding of the body
app.use(bodyParser.urlencoded({ extended: false }));
//
app.use(cors());

//
app.use(cookieParser());

//
app.use(session({
  secret: 'uajwlekfjaslfjlsajlj23r23er',
  resave: true,
  saveUninitialized: false,
}));

// specify the folder where user can access static files
app.use(express.static(path.join(__dirname, '../client/public')));

app.use(passport.initialize());
app.use(passport.session());

app.post('/api/signup/admin/',
  passport.authenticate('admin', {
    successRedirect: '/api/dashboard', // redirect to the secure profile section
    failureRedirect: '/api/signup/admin', // redirect back to the signup page if there is an error
  })
);

app.post('/api/signup/staff/',
  passport.authenticate('staff', {
    successRedirect: '/api/dashboard', // redirect to the secure profile section
    failureRedirect: '/api/signup/staff', // redirect back to the signup page if there is an error
  })
);

app.post('/api/login/',
  passport.authenticate('login', {
    successRedirect: '/api/dashboard', // redirect to the secure profile section
    failureRedirect: '/api/login', // redirect back to the signup page if there is an error
  })
);

app.get('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  })
});

// ask Namse api 가 아닌데도 다 낚아 채버림.....위에 코드들 다 실행 안됌
app.use('/api', index);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const index = require('./routes/index');
const controller = require('./controller/utility');
const auth = require('./functions/token');
const Auth = require('./middleware/token');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

// Returns middleware that only parses urlencoded bodies.
// This parser accepts only UTF-8 encoding of the body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// specify the folder where user can access static files
app.use(express.static(path.join(__dirname, '../client/public')));

app.post('/api/signup/admin/', (req, res) => {
  console.log('req.body', req.body);
  const {
    companyname,
    userid,
    password,
    name,
    mobile,
    email,
  } = req.body;
  const formIncomplete = !companyname
    || !userid
    || !password
    || !name
    || !mobile
    || !email;

  if (formIncomplete) {
    res.status(400).send('admin form incomplete');
  }
  controller.signup_admin.post(req, res);
});

app.get('/api/signup/staff', (req, res) => {
  const formIncomplete = !req.query.companyname;
  if (formIncomplete) {
    res.status(400).send('we need companyname');
  }
  controller.signup_staff.get(req, res);
})

app.post('/api/signup/staff/', (req, res) => {
  const formIncomplete = !req.body.userid
  || !req.body.password
    || !req.body.name
    || !req.body.mobile
    || !req.body.email;

  if (formIncomplete) {
    res.status(400).send('staff form incomplete');
  }

  controller.signup_staff.post(req, res);
});

app.post('/api/login/', (req, res) => {
  const formIncomplete = !req.body.userid || !req.body.password;
  if (formIncomplete) {
    res.status(400).send('Error: login form incomplete');
  } else {
    Auth.login(req)
    .then((result) => {
      console.log('Welcome back!', result)
      delete result.expiredat;
      res.send(result);
      // res.set({
      //   Token: result.token,
      // })
      // .send(result);
    })
    .catch((err) => {
      if (err === 'Error: already logged in.') {
        res.status(401).send(err);
      } else {
        res.status(500).send(err);
      }
    });
  }
});

app.get('/api/logout', (req, res) => {
  auth.deleteToken(req.headers.token)
  .then((result) => {
    res.send('logged out!');
  })
  .catch((err) => {
    res.status(403).send(err);
  });
});

app.use('/api', index);

app.use((req, res, next) => {
  const err = new Error('Not Found API');
  err.status = 404;
  next(err);
});

module.exports = app;

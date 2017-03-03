const express = require('express');
const passport = require('passport');

const router = express.Router();
const controller = require('../controller/index');
require('../config/passport')(passport);

router.route('/')
.get(controller.dashboard.get);

router.post('/signup',
  passport.authenticate('admin-signup', {
  successRedirect : '/api/', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  })
);

module.exports = router;

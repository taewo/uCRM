const staffAuth = require('../model/staff_approve');
const signupAdmin = require('../model/signup_admin');
const signupStaff = require('../model/signup_staff');

module.exports = {
  signup_admin: {
    post:
    (req, res) => (signupAdmin.post(req.body))
    .then((result) => {
      console.log('signup successfull!', result);
      res.json(result);
    })
    .catch((err) => {
      console.log('signup admin failed', err)
      res.status(400).send(err)//.status(400);
    }),
  },

  signup_staff: {
    get:
    (req, res) => (signupStaff.get(req))
    .then((result) => {
      console.log(result, 'body');
      res.json(result);
    })
    .catch((err) => {
      console.log('here',err);
      res.status(400).send(err);
    }),
    post:
    (req, res) => (signupStaff.post(req.body))
    .then((result) => {
      console.log(result, 'body');
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    }),
  },
  staff_auth: {
    put:
    (req, res) => (staffAuth.put(req))
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    }),
  },
};

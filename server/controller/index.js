const dashboard = require('../model/dashboard');
const space = require('../model/space');
const staffAuth = require('../model/staff_auth');
const lead = require('../model/lead');

module.exports = {

  dashboard: {
    get:
    (req, res) => (dashboard.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err.stack);
      res.sendStatus(400);
    }),
  },

  space: {
    post:
    (req, res) => (space.post(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err.stack);
      if (err === 'unauthorized') {
        res.sendStatus(401);
      }
      res.sendStatus(400);
    }),
  },

  staff_auth: {
    put:
    (req, res) => (staffAuth.put(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err.stack);
      if (err === 'unauthorized') {
        res.sendStatus(401);
      }
      res.sendStatus(400);
    }),
  },

  lead: {
    post:
    (req, res) => (lead.post(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err.stack);
      res.sendStatus(400);
    }),
  },
};

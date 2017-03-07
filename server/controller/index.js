const dashboard = require('../model/dashboard');
const space = require('../model/space');

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
};

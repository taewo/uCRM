const dashboard = require('../model/dashboard');

module.exports = {
  get:
  (req, res) => (dashboard.get(req))
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.status(400).send(err);
  }),
};

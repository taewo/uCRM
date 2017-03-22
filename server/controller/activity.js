const activity = require('../model/activity');

module.exports = {
  get:
  (req, res) => (activity.get(req))
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.status(400).send(err);
  }),
};

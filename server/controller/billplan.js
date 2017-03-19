const billplan = require('../model/billplan');

module.exports = {
  get:
  (req, res) => (billplan.get(req))
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.status(400).send(err);
  }),

  post:
  (req, res) => {
    const dataIncomplete = (
      !req.body.space_id
      || !req.body.name
      || !req.body.cost
      || !req.body.duration
      || req.body.isdaily === undefined
    );
    if (dataIncomplete) {
      res.status(400).send('post data incomplete');
    }
    return billplan.post(req)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },
};

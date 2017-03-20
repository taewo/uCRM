const space = require('../model/space');

module.exports = {
  get:
  (req, res) => (space.get(req))
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    if (err === 'unauthorized') {
      res.status(401).send(err);
    }
    res.status(400).send(err);
  }),
  post:
  (req, res) => {
    const dataIncomplete = (
      !req.body.name
      || !req.body.company_id
      || !req.body.address
      || !req.body.max_desks
    );
    if (dataIncomplete) {
      res.status(400).send('post data incomplete');
    }
    return space.post(req)
    .then((result) => {
      if (result === undefined) {
        res.status(400).send('unauthorized');
      } else {
        res.json(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },
};

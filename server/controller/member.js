const member = require('../model/member');

module.exports = {
  get:
  (req, res) => (member.get(req))
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err);
  }),
  post:
  (req, res) => {
    const dataIncomplete = (
      !req.body.space_id
      || !req.body.name
      || !req.body.email
      || !req.body.mobile
      || !req.body.joined_date
    );
    if (dataIncomplete) {
      res.status(400).send('post data incomplete');
    }
    return member.post(req)
    .then((result) => {
      if (result) {
        res.json(result);
      }
      res.status(302).send('no access')
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(400).send(err);
    });
  },
};

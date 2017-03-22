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
      console.log('RESULT', result)
      if (result) {
        res.json(result);
      } else {
        res.status(302).send('Error: unahthorized access to this space');
      }
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(400).send(err);
    });
  },

  delete:
  (req, res) => {
    const dataIncomplete = (
      !req.body.member_id
      || !req.body.end_reason
    );
    if (dataIncomplete) {
      res.status(400).send('delete data incomplete');
    } else {
      return member.delete(req)
      .then((result) => {
        console.log('RESULT', result)
        res.json(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    }
  },
};

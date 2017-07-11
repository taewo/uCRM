const payment = require('../model/payment');

module.exports = {
  get:
  (req, res) => (payment.get(req))
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err);
  }),
  post:
  (req, res) => {
    const {
      space_id,
      member_id,
      bill_plan_id,
      start_date,
      end_date,
      payment_method,
    } = req.body;
    const dataIncomplete = (
      !space_id
      || !member_id
      || !bill_plan_id
      || !start_date
      || !end_date
      || !payment_method
    );
    if (dataIncomplete) {
      res.status(400).send('post data incomplete');
    }
    return payment.post(req)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  delete:
  (req, res) => {
    const dataIncomplete = (
      !req.body.payment_id
      || !req.body.member_id
    );
    if (dataIncomplete) {
      res.status(400).send('delete data incomplete');
    }
    return payment.delete(req)
    .then(result => (res.json(result)))
    .catch(err => (res.status(400).send(err)));
  },
};

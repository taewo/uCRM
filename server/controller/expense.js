const expense = require('../model/expense');

module.exports = {
  get:
  (req, res) => (expense.get(req))
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.status(400).send(err);
  }),
  post:
  (req, res) => {
    const {
      space_id,
      type,
      payment_date,
      payment_method,
      amount,
    } = req.body;
    const dataIncomplete = (
      !space_id
      || !type
      || !payment_date
      || !payment_method
      || !amount
    );
    if (dataIncomplete) {
      res.status(400).send('post data incomplete');
    }
    return expense.post(req)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
  },

  delete:
  (req, res) => {
    const {
      expense_id,
      space_id,
    } = req.body;
    const dataIncomplete = (
      !expense_id
      || !space_id
    );
    if (dataIncomplete) {
      res.status(400).send('post data incomplete');
    }
    return expense.delete(req)
    .then(result => (res.json(result)))
    .catch(err => (res.status(400).send(err)));
  },
};

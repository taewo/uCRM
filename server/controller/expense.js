const expense = require('../model/expense');

module.exports = {
  get:
  (req, res) => (expense.get(req))
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
    return expense.post(req)
    .then((result) => {
      console.log('RESULT', result)
      res.json(result);
    })
    .catch((err) => {
      console.log('err', err)
      res.status(400).send(err);
    });
  },
};

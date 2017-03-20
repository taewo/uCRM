const staffApprove = require('../model/staff_approve');
const expenseApprove = require('../model/expense_approve');

module.exports = {
  Staff: {
    post:
    (req, res) => (staffApprove.put(req))
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.stack);
      if (err === 'unauthorized') {
        res.status(401).send(err);
      }
      res.status(400).send(err);
    }),
  },

  Expense: {
    post:
    (req, res) => (expenseApprove.put(req))
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.stack);
      if (err === 'unauthorized') {
        res.status(401).send(err);
      }
      res.status(400).send(err);
    }),
  },
};

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
      res.status(400).send(err);
    }),
  },

  Expense: {
    post:
    (req, res) => {
      return expenseApprove.post(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    },
  },
};

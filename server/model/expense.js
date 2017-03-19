const Expense = require('../functions/expense');

module.exports = {
  get: (req) => {
    console.log('REQ', req.query)
    return Expense.getExpense(req.query.space_id)
    .then((result) => {
      if (result) {
        return result;
      }
      return [];
    });
  },
  post: (req) => {
    return Expense.addNewExpense(req.body)
    .then(result => (result))
    .catch((err) => {
      return Promise.reject(err);
    });
  },
};

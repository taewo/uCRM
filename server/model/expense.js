const Expense = require('../functions/expense');
const Auth = require('../functions/auth');

module.exports = {
  get: (req) => {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        return Expense.getExpense(req.query.space_id)
        .then(result => (result));
      }
      return Promise.reject('Error: unauthorized access request to the space');
    })
    .catch(err => (Promise.reject(err)));
  },

  post: (req) => {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        return Expense.addNewExpense(req.body)
        .then(result => (result))
      }
      return Promise.reject('Error: unauthorized access request to the space');
    })
    .catch(err => (Promise.reject(err)));
  },
};

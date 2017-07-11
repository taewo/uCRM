const Expense = require('../functions/expense');
const Auth = require('../functions/auth');

module.exports = {
  post(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        return Expense.toggleExpenseApproval(req);
      }
      return Promise.reject('Error: Your requested space does not exist.');
    })
    .catch(err => (Promise.reject(err)));
  },
};

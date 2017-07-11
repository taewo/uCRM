const Expense = require('../functions/expense');
const Auth = require('../functions/auth');
const Activity = require('../functions/activity');

module.exports = {
  get(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        return Expense.getExpense(req.query.space_id)
        .then(result => (result));
      }
      return Promise.reject('Error: Your requested space does not exist.');
    })
    .catch(err => (Promise.reject(err)));
  },

  post(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        const activityDetail = {
          space_id: req.body.space_id,
          type: 'expense_creation',
          date: new Date(),
          target: req.body.details,
        };
        const addExpense = Expense.addNewExpense(req.body);
        const addActivity = Activity.addNewActivity(activityDetail);
        return Promise.all([addExpense, addActivity])
        .then(result => (result[0]));
      }
      return Promise.reject('Error: Your requested space does not exist.');
    })
    .catch(err => (Promise.reject(err)));
  },

  delete(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        return Expense.ifExpenseExist(req.body.expense_id, req.body.space_id)
        .then((expenseExist) => {
          if (expenseExist) {
            return Expense.deleteExpense(req.body.expense_id);
          }
          return Promise.reject('Error: expense does not exist');
        });
      }
      return Promise.reject('Error: Your requested space does not exist.');
    })
    .catch(err => (Promise.reject(err)));
  },
};

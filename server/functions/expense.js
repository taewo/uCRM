const Expense = require('../db/expense');

module.exports = {
  getExpense(spaceid) {
    return Expense
    .where({ space_id: spaceid })
    .fetchAll()
    .then((expenseRecords) => {
      if (expenseRecords) {
        return expenseRecords.toJSON()
      } else {
        return [];
      }
    })
    .catch(err => (Promise.reject(err)));
  },

  addNewExpense(body) {
    body.isapproved = 0;
    return Expense
    .where(body)
    .fetch()
    .then((expenseExist) => {
      if (expenseExist) {
        return Promise.reject('Error: the same expense record already exist');
      }
      return new Expense(body)
      .save()
      .then(newExpense => (newExpense.toJSON()));
    })
    .catch(err => (Promise.reject(err)));
  },

  approveExpense(body) {
    return Expense(body)
    .where({ id: body.id })
    .save
  }
};

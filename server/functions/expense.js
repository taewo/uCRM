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

  toggleExpenseApproval(req) {
    return Expense
    .where({ id: req.body.id})
    .fetch()
    .then((expenseRecord) => {
      const toggleFlag = expenseRecord.toJSON().isapproved ? 0 : 1;
      return Expense
      .where({ id: req.body.id })
      .save({ isapproved: toggleFlag }, {patch: true})
      // .save({ isapproved: toggleFlag }, {method: 'update'})
      .then((result) => {
        return;
      });
    })
    .catch(err => (Promise.reject(err)));
  },
};

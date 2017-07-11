const Expense = require('../db/expense');

module.exports = {
  getExpense(spaceid) {
    return Expense
    .query('orderBy', 'id', 'DESC')
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

  ifExpenseExist(expenseid, spaceid) {
    return Expense
    .where({ id: expenseid, space_id: spaceid })
    .fetch()
    .then((expenseExist) => {
      if (expenseExist) {
        return true;
      }
      return false;
    });
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
    console.log('REQ', req.body)
    return Expense
    .where({ id: req.body.expense_id })
    .fetch()
    .then((expenseRecord) => {
      if (expenseRecord) {
        const toggleFlag = expenseRecord.toJSON().isapproved ? 0 : 1;
        return Expense
        .where({ id: req.body.expense_id })
        .save({ isapproved: toggleFlag }, {patch: true})
        .then((result) => {
          if (result.toJSON().isapproved) {
            return 'expense successfully approved';
          }
          return 'expense approval cancelled'
        })
        // .save({ isapproved: toggleFlag }, {method: 'update'})
      }
      return Promise.reject('Error: no such expense record');
    })
    .catch(err => (Promise.reject(err)));
  },

  deleteExpense(expenseid) {
    return Expense
    .where({ id: expenseid })
    .destroy()
    .then(result => ('successfully deleted'))
    .catch(err => (Promise.reject(err)))
  },
};

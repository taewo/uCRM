const Expense = require('../db/expense');

module.exports = {
  getExpense: (spaceid) => {
    return Expense
    .where({ space_id: spaceid })
    .fetchAll()
    .then((result) => {
      if (result) {
        return result.toJSON()
      } else {
        return [];
      }
    })
    .catch(err => (Promise.reject(err)));
  },

  addNewExpense: (body) => {
    return Expense
    .where({
      space_id: body.space_id,
      name: body.name,
    })
    .fetch()
    .then((result) => {
      if (result) {
        return Promise.reject('Error: the same bill plan name already exist');
      } else {
        return new Expense(body)
        .save()
        .then(result => (result.toJSON()));
      }
    })
    .catch(err => (Promise.reject(err)));
  },
};

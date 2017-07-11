const BillPlan = require('../db/billplan');

module.exports = {
  getBillPlan(spaceid) {
    return BillPlan
    .query('orderBy', 'id', 'DESC')
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
  addNewBillPlan(body) {
    return BillPlan
    .where(body)
    .fetch()
    .then((result) => {
      if (result) {
        return Promise.reject('Error: the same bill plan name already exist');
      }
      return new BillPlan(body)
      .save()
      .then(result => (result.toJSON()));
    })
    .catch(err => (Promise.reject(err)));
  },
};

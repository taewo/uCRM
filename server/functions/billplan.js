const BillPlan = require('../db/billplan');

module.exports = {
  getBillPlan: (spaceid) => {
    return BillPlan
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

  addNewBillPlan: (body) => {
    return BillPlan
    .where({
      space_id: body.space_id,
      name: body.name,
    })
    .fetch()
    .then((result) => {
      if (result) {
        return Promise.reject('Error: the same bill plan name already exist');
      } else {
        return new BillPlan(body)
        .save()
        .then(result => (result.toJSON()));
      }
    })
    .catch(err => (Promise.reject(err)));
  },
};

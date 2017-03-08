const BillPlan = require('../db/billingplan');

module.exports = {
  getBillPlan: (spaceid) => {
    return new Promise((resolve, reject) => {
      BillPlan.where({ space_id: spaceid })
      .fetchAll()
      .then((result) => {
        return resolve(result);
      });
    });
  },

  addNewBillPlan: (body) => {
    return new Promise((resolve, reject) => {
      new BillPlan(body)
      .save()
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        return reject('failed to add new billing plan');
      });
    });
  },
};

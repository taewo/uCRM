const Billing = require('../functions/billing');

module.exports = {
  get: (req) => {
    return new Promise((resolve, reject) => {
      Billing.getBillPlan(req.query.space_id)
      .then((result) => {
        if (!result) {
          return resolve([]);
        } else {
          return resolve(result);
        }
      });
    });
  },
  post: (req) => {
    return new Promise((resolve, reject) => {
      Billing.addNewBillPlan(req.body)
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        return reject(err);
      })
    });
  },
};

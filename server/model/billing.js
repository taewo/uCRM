const Billing = require('../functions/billing');

module.exports = {
  get: (req) => {
    return new Promise((resolve, reject) => {
      Billing.getBillPlan(req.query.space_id)
      .then((result) => {
        if (!result) {
          return resolve([]);
        }
        return resolve(result);
      });
    });
  },
  post: (req) => {
    return new Promise((resolve, reject) => {
      Billing.addNewBillPlan(req.body)
      .then(result => (resolve(result)))
      .catch(err => (reject(err)));
    });
  },
};

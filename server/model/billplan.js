const BillPlan = require('../functions/billplan');

module.exports = {
  get: (req) => {
    return BillPlan.getBillPlan(req.query.space_id)
    .then((result) => {
      if (result) {
        return result;
      }
      return [];
    });
  },
  post: (req) => {
    return BillPlan.addNewBillPlan(req.body)
    .then(result => (result))
    .catch((err) => {
      return Promise.reject(err);
    });
  },
};

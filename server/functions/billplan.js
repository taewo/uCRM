const BillPlan = require('../db/billplan');

module.exports = {
  getBillPlan: (spaceid) => {
    return BillPlan
    .where({ space_id: spaceid })
    .fetchAll()
    .then(result => (result.toJSON()));
  },

  addNewBillPlan: (body) => {
    return new BillPlan(body)
    .save()
    .then(result => (result.toJSON()));
  },
};

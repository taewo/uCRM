const BillPlan = require('../functions/billplan');
const Activity = require('../functions/activity');
const Auth = require('../functions/auth');

module.exports = {
  get(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        return BillPlan.getBillPlan(req.query.space_id)
        .then(result => (result));
      }
      return Promise.reject('Error: Your requested space does not exist.');
    })
    .catch(err => (Promise.reject(err)));
  },

  post(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        const activityDetail = {
          space_id: req.body.space_id,
          type: 'billplan_creation',
          date: new Date(),
          user: req.body.name,
        };
        const addBillplan = BillPlan.addNewBillPlan(req.body);
        const addActivity = Activity.addNewActivity(activityDetail);
        return Promise.all([addBillplan, addActivity])
        .then(result => (result[0]))
        .catch(err => (Promise.reject(err)));
      }
      return Promise.reject('Error: Your requested space does not exist.');
    })
    .catch(err => (Promise.reject(err)));
  },
};

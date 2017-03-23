const Activity = require('../functions/activity');
const Auth = require('../functions/auth');

module.exports = {
  get(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        return Activity.getActivity(req.query.space_id)
        .then((activity) => {
          console.log(activity);
          return activity;
        });
      }
      return Promise.reject('Error: Your requested space does not exist.');
    })
    .catch(err => (Promise.reject(err)));
  },
};

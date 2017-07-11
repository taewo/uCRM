const Dashboard = require('../functions/dashboard');
const Auth = require('../functions/auth');

module.exports = {
  get(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        return Dashboard(req);
      }
      return Promise.reject('Error: Your requested space does not exist.');
    });
  },
};

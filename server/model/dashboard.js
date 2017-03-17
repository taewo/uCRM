const Dashboard = require('../functions/dashboard');
const Auth = require('../functions/auth');

module.exports = {
  get: (req) => {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        return Dashboard(req);
      }
      throw new Error('Error: you have no access to this space');
    });
  },
}

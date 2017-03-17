const Dashboard = require('../functions/dashboard');
const Auth = require('../functions/auth');

module.exports = {
  get: (req) => {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      console.log('ACCESS', access)
      if (access) {
        console.log('CONDITION PASSED')
        return Dashboard(req);
      }
      throw new Error('Error: you have no access to this space');
    });
  },
}

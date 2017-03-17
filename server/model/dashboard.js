const Dashboard = require('../functions/dashboard');
const Space = require('../functions/space');

module.exports = {
  get: (req) => {
    return new Promise((resolve, reject) => {
      Space.checkIfUserHasSpace(req)
      .then(access => (resolve(access)))
      .catch(err => (reject(err)));
    })
    .then((access) => {
      console.log('ACCESS', access)
      return new Promise((resolve, reject) => {
        if (access) {
          return resolve(Dashboard(req));
        } else {
          return reject('Error: you have no access to this space');
        }
      });
    });
  },
}

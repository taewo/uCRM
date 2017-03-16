const Dashboard = require('../functions/dashboard');
const Space = require('../functions/space');
const Token = require('../middleware/token');

module.exports = {
  get: (req) => {
    return new Promise((resolve, reject) => {
      Token.getUserByToken(req.headers.token)
      .then(user => (resolve(user)))
      .catch(err => (reject(err)));
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        Space.checkIfUserHasSpace(user, req.query.space_id)
        .then(access => (resolve(access)))
        .catch(err => (reject(err)));
      });
    })
    .then((access) => {
      return new Promise((resolve, reject) => {
        if (access) {
          return resolve(Dashboard(req));
        }
        return reject('Error: you have no access to this space');
      });
    });
  },
}

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
        .then(flag => (resolve(flag)))
        .catch(err => (reject(err)));
      });
    })
    .then((flag) => {
      return new Promise((resolve, reject) => {
        if (flag) {
          return Dashboard(req);
        }
        return reject('Error: you have no access to this space');
      });
    });
  },
}

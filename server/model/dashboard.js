const Dashboard = require('../functions/dashboard');
const Token = require('../middleware/token');

module.exports = {
  get: (req) => {
    return new Promise((resolve, reject) => {
      Token.getUserByToken(req.headers.token)
      .then((user) => {
        if (user.type === 'staff') {
          const spaceid = user.space_id;
          return resolve(Dashboard(spaceid));
        } else if (user.type === 'comp') {
          return resolve(user);
        }
      })
      .catch((err) => {
        return reject(err);
      })
    });
  },
}

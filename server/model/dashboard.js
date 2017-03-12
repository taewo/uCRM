const Dashboard = require('../functions/dashboard');
const Token = require('../middleware/token');
const auth = require('../functions/auth');

module.exports = {
  get: (req) => {
    console.log('token', req.headers.token);
    return new Promise((resolve, reject) => {
      Token.getUserId(req.headers.token)
      .then((user) => {
        if (user.type === 'staff') {
          const spaceid = user.space_id;
          return resolve(Dashboard(spaceid));
        } else if (user.type === 'comp') {
          return new Promise((resolve, reject) => {
            const container = []
            if (user.spaceList) {
              user.spaceList.forEach((space) => {
                container.push(Dashboard(space));
              });
              console.log(container);
            }
            Promise.all(container)
            .then((res) => {
              console.log('res', res)
              return resolve(res);
            });
          });
        }
      })
      .catch((err) => {
        return reject(err);
      })
    });
  },
}

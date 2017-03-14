const Dashboard = require('../functions/dashboard');
// const Token = require('../middleware/token');

module.exports = {
  get: (req) => {
    // return new Promise((resolve, reject) => {
      console.log('req.query', req.query)
      // return resolve(Dashboard(req.query.space_id));
    return Dashboard(req.query.space_id);
    // });
  },
}

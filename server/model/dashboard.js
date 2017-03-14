const Dashboard = require('../functions/dashboard');

module.exports = {
  get: (req) => {
    console.log('req.query', req.query)
    return Dashboard(req.query.space_id);
  },
}

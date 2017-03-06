const dashboard = require('../model/dashboard');

module.exports = {

  dashboard: {
    get:
    (req, res) => (dashboard.get(req))
    .then((result) => {
      console.log('result', result)
      const body = JSON.stringify(result);
      console.log('hi', body)
      res.json(body);
    })
    .catch((err) => {
      console.log(err.stack);
      res.sendStatus(400);
    }),
  },
};

const paymentSpace = require('../model/payment_space');

module.exports = {
  get:
  // (req, res) => (paymentSpace.get(req))
  (req, res) => {
    console.log('REQ', req.query)
    return paymentSpace.get(req)
    .then((result) => {console.log(result)
    return res.json(result)})
    // .then(result => (res.json(result)))
    .catch(err => (res.status(400).send(err)));
  },
};

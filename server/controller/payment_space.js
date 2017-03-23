const paymentSpace = require('../model/payment_space');

module.exports = {
  get:
  (req, res) => (paymentSpace.get(req))
    .then(result => (res.json(result)))
    .catch(err => (res.status(400).send(err)))
  ,
};

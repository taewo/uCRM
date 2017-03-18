const Payment = require('../functions/payment');

module.exports = {
  get: (req) => {
    return Payment.getPayment(req.query.space_id)
    .then((result) => {
      if (result) {
        return result;
      }
      return [];
    });
  },
  post: (req) => {
    return Payment.addNewPayment(req.body)
    .then(result => (result))
    .catch((err) => {
      return Promise.reject(err);
    });
  },
};

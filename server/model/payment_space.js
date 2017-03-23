const PaymentSpace = require('../functions/payment_space');
const Auth = require('../functions/auth');

module.exports = {
  get(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((hasMember) => {
      if (hasMember) {
        return PaymentSpace.getPaymentSpace(req.query.space_id)
        .then((result) => {
          if (result) {
            return result;
          }
          return [];
        });
      } else {
        return Promise.reject('Error: unahthorized access request');
      }
    })
    .catch(err => (Promise.reject(err)));
  },
};

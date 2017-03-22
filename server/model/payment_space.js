const PaymentSpace = require('../functions/payment_space');
const Auth = require('../functions/auth');

module.exports = {
  get(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((hasMember) => {
      console.log('HASMEMBER', hasMember)
      if (hasMember) {
        console.log('1 CONDITION PASSED')
        return PaymentSpace.getPaymentSpace(req.query.space_id)
        .then((result) => {
          console.log('RESULT', result)
          if (result) {
            console.log('CONDITION PASSED')
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

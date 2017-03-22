const Payment = require('../functions/payment');
const Auth = require('../functions/auth');

module.exports = {
  // below code is getting payment records for one member
  get(req) {
    return Auth.checkIfUserHasMember(req)
    .then((hasMember) => {
      if (hasMember) {
        return Payment.getPayment(req.query.member_id)
        .then((result) => {
          console.log('payment RESULT for the space=', req.body.space_id, result)
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

  post(req) {
    return Auth.checkIfUserHasMember(req)
    .then((hasMember) => {
      console.log('HASMEMBER', hasMember)
      if (hasMember) {
        console.log('CONDITION PASSED')
        return Payment.addNewPayment(req.body)
        .then(result => (result));
      }
      return Promise.reject('Error: unahthorized access request');
    })
    .catch(err => (Promise.reject(err)));
  },
};

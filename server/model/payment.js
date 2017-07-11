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
          if (result.length) {
            return result;
          }
          return Promise.reject('Error: no payment exsit for this member');
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
      if (hasMember) {
        return Payment.addNewPayment(req.body)
        .then(result => (result));
      }
      return Promise.reject('Error: unahthorized access request');
    })
    .catch(err => (Promise.reject(err)));
  },

  delete(req) {
    const {
      member_id,
      payment_id,
    } = req.body;
    return Auth.checkIfUserHasMember(req)
    .then((hasMember) => {
      if (hasMember) {
        return Payment.ifPaymentExist(payment_id, member_id)
        .then((paymentExist) => {
          if (paymentExist) {
            return Payment.deleteMemberPayment(req.body)
            .then(result => (result));
          }
          return Promise.reject('Error: not authorized or payment does not exsit.');
        });
      }
      return Promise.reject('Error: unahthorized member access request');
    })
    .catch(err => (Promise.reject(err)));
  },
};

const PaymentSpace = require('../db/payment_space');
const Space = require('../db/space');

module.exports = {
  getPaymentSpace(spaceid) {
    return PaymentSpace
    .where({ space_id: spaceid })
    .fetchAll()
    .then((result) => {
      if (result) {
        return result.toJSON();
      }
      return [];
    })
    .catch(err => (Promise.reject(err)));
  },
};

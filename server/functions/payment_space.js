const PaymentSpace = require('../db/payment_space');

module.exports = {
  getPaymentSpace(spaceid) {
    return PaymentSpace
    .query('orderBy', 'id', 'DESC')
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

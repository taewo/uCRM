const PaymentSpace = require('../db/payment_space');
const Space = require('../db/space');

module.exports = {
  getPaymentSpace(spaceid) {
    return Space
    .where({ id: spaceid })
    .fetch()
    .then((space) => {
      return PaymentSpace
      .where({ space_id: space.toJSON().name })
      .fetchAll()
      .then((result) => {
        if (result) {
          return result.toJSON();
        }
        return [];
      });
    })
    .catch(err => (Promise.reject(err)));
  },
};

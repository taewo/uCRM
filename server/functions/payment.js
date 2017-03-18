const Payment = require('../db/payment');

module.exports = {
  getPayment: (memberid) => {
    return Payment
    .where({ member_id: memberid })
    .fetchAll()
    .then((result) => {
      if (result) {
        return result.toJSON();
      } else {
        return [];
      }
    })
    .catch(err => (Promise.reject(err)));
  },

  addNewPayment: (body) => {
    return Payment
    .where(body)
    .fetch()
    .then((result) => {
      if (result) {
        return Promise.reject('Error: the same payment already exist');
      } else {
        return new Payment(body)
        .save()
        .then(result => (result.toJSON()));
      }
    })
    .catch(err => (Promise.reject(err)));
  },
};

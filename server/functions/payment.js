const Payment = require('../db/payment');
const Member = require('../db/member');

module.exports = {
  getPayment(memberid) {
    return Payment
    .where({ member_id: memberid })
    .fetchAll()
    .then((result) => {
      if (result) {
        return result.toJSON();
      }
      return [];
    })
    .catch(err => (Promise.reject(err)));
  },

  addNewPayment(body) {
    return Payment
    .where(body)
    .fetch()
    .then((result) => {
      if (result) {
        return Promise.reject('Error: the same payment already exist');
      }
      return new Payment(body)
      .save()
      .then(newPayment => (newPayment.toJSON()));
    })
    .catch(err => (Promise.reject(err)));
  },

  getUnpaidSum(spaceid) {
    return Member.where({ space_id: spaceid })
    .fetch({ withRelated: ['payment'] })
    .then((result) => {
      if (result) {
        return result.related('payment').toJSON();
      }
      return [];
    })
    .catch(err => (Promise.reject(err)));
  },
};

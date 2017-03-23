const Moment = require('moment');

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

  ifPaymentExist(paymentid, memberid) {
    return Payment
    .where({ id: paymentid, member_id: memberid })
    .fetch()
    .then((payment) => {
      if (payment) {
        return true;
      }
      return false;
    });
  },

  getCountExpiring(spaceid) {
    return Payment
    .where({ space_id: spaceid })
    .query((qb) => {
      // change below hard code with moment.js to show the last mongh activity
      const now = Moment().add(1, 'days').format('YYYY-MM-DD');
      const weekLater = Moment().add(7, 'days').format('YYYY-MM-DD');
      qb.whereBetween('end_date', [now, weekLater]);
    })
    .count()
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

  deleteMemberPayment(body) {
    return Payment
    .where({ id: body.payment_id, member_id: body.member_id })
    .destroy()
    .then(() => ('succesfully deleted'))
    .catch(err => (Promise.reject(err)))
  },
};

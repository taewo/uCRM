const Payment = require('../db/payment');

module.exports = {
  getPayment: (spaceid) => {
    return Payment
    .where({ space_id: spaceid })
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
    .where({
      space_id: body.space_id,
      name: body.name,
    })
    .fetch()
    .then((result) => {
      if (result) {
        return Promise.reject('Error: the same bill plan name already exist');
      } else {
        return new Payment(body)
        .save()
        .then(result => (result.toJSON()));
      }
    })
    .catch(err => (Promise.reject(err)));
  },
};

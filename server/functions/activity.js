const Activity = require('../db/activity');

module.exports = {
  getActivity(spaceid) {
    return Activity
    .query('orderBy', 'id', 'DESC')
    // .query(function(qb) {return qb.orderBy('date', 'DESC')}) // this also works
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

  addNewActivity(body) {
    return new Activity(body)
    .save()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject(err)));
  },
};

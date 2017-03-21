const Activity = require('../db/activity');

module.exports = {
  getActivity(spaceid) {
    return Activity
    .query(qb => qb.orderby('data', 'DESC'))
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

  addNewActivity(body) {
    return new Activity(body)
    .save()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject(err)));
  },
};

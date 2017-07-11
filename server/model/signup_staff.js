const Space = require('../functions/space');
const Staff = require('../functions/staff');
const auth = require('../functions/auth');

module.exports = {
  get(req) {
    return Space.getAllSpacesByCompanyName(req.query.companyname)
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject(err)));
  },

  post(body) {
    return auth.checkId(body.userid)
    .then((result) => {
      if (result) {
        return Staff.addNewStaff(body)
        .then(newStaff => (newStaff));
      }
      return Promise.reject('Error: userid already taken');
    })
    .catch(err => (Promise.reject(err)));
  },
};

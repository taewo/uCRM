const Staff = require('../functions/staff');

module.exports = {
  put: (req) => {
    const currentUser = req.session.passport.user;
    console.log('sur', currentUser);

    if (currentUser.type === 'comp') {
      return Staff.approveNewStaff(req.body)
      .then(result => (result));
    }
    return Promise.reject('Error: not authorized request.');
  },
};

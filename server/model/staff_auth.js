const Staff = require('../functions/staff');

module.exports = {
  put: (req) => {
    return new Promise((resolve, reject) => {
      const currentUser = req.session.passport.user;
      console.log('sur', currentUser);

      if (currentUser.type === 'comp') {
        Staff.approveNewStaff(req.body)
        .then((result) => {
          return resolve(result);
        });
      } else {
        return reject('unauthorized');
      }
    });
  },
};

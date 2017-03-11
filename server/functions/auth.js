const Admin = require('../functions/admin');
const Staff = require('../functions/staff');

module.exports = {
  checkId: (userid) => {
    return new Promise((resolve, reject) => {

      const checkAdmin = Admin.checkExistence(userid);
      const checkStaff = Staff.checkExistence(userid);

      Promise.all([checkAdmin, checkStaff])
      .then((result) => {
        if (result[0]) {
          return resolve(false);
        } else if (result[1]) {
          return resolve(false);
        } else {
          return resolve(true);
        }
      })
      .catch((err) => {
        console.log('checkId failed');
        return reject(err);
      });
    });
  },
};

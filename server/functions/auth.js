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
  getUser: (userid) => {
    return new Promise((resolve, reject) => {
      const ifAdmin = Admin.checkExistence(userid);
      const ifStaff = Staff.checkExistence(userid);

      Promise.all([ifAdmin, ifStaff])
      .then((users) => {
        console.log('getuser user', users)
        if (users[0]) {
          users[0].type = 'comp';
          delete users[0].password;
          return resolve(users[0]);
        } else if (users[1]) {
          users[1].type = 'staff';
          delete users[1].password;
          return resolve(users[1]);
        }
      })
      .catch((err) => {
        return reject('user is neither admin nor staff');
      })
    });
  }
};

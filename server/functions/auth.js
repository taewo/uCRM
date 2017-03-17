const Admin = require('../functions/admin');
const Staff = require('../functions/staff');

const bcrypt = require('bcrypt');

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
      .catch(err => (reject(err)));
    });
  },

  checkIdPassword: (userid, password) => {
    const checkAdmin = Admin.checkExistence(userid);
    const checkStaff = Staff.checkExistence(userid);
    return Promise.all([checkAdmin, checkStaff])
    .then((result) => {
      const user = result[0] || result[1];
      if (!user) {
        return false;
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, isValidPassword) => {
          if (err) {
            return reject(err);
          }
          return resolve(isValidPassword);
        });
      });
    });
  },

  getUserByUserId: (userid) => {
    const ifAdmin = Admin.checkExistence(userid);
    const ifStaff = Staff.checkExistence(userid);

    return Promise.all([ifAdmin, ifStaff])
    .then((users) => {
      console.log('getuser user', users)
      if (users[0]) {
        users[0].type = 'comp';
        delete users[0].password;
        return users[0];
      } else if (users[1]) {
        users[1].type = 'staff';
        delete users[1].password;
        return users[1];
      }
    })
  },

  checkIfUserHasSpace: (req) => {
    const {
      token
    } = req.headers;
    const spaceid = req.query.space_id;

    return module.exports.getUserByToken(token)
    .then((user) => {
      console.log('USER', user)
      if (user.type === 'comp') {
        console.log('userspacelist', user)
        const flag = JSON.parse(user.space_list).some((space) => {
          return space.id === JSON.parse(spaceid);
        });
        console.log('FLAG', flag)
        if (flag) {
          return true;
        } else {
          return false;
        }
      } else if (user.type === 'staff') {
        if (user.space_id === spaceid) {
          return true;
        } else {
          return false;
        }
      } else {
        throw new Error('unahthorized user');
      }
    });
  },
};

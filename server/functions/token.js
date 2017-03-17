const Token = require('../db/token');

const Admin = require('./admin');
const Staff = require('./staff');
const Space = require('./space');

const uuid = require('uuid');
const bcrypt = require('bcrypt');


module.exports = {
  generateTokenData: () => {
    const token = uuid();
    const expiredat = new Date();
    expiredat.setTime(expiredat.getTime() + (30 * 60 * 1000));
    const tokenData = {
      token,
      expiredat,
    };
    return tokenData;
  },
  checkToken: (token) => {
    return new Promise((resolve, reject) => {
      Token
      .where({ token })
      .fetch()
      .then((result) => {
        const now = new Date();
        const session = result.toJSON().expiredat;
        if (now - session > 0) {
          return reject('Error: Authentication credentials expired.');
        } else {
          return resolve(result.toJSON());
        }
      })
      .catch(err => (reject('invalid token')));
    });
  },

  getUserToken(userid) {
    return Token
    .where({ userid })
    .fetch()
    .then(result => (result ? result.toJSON : null));
  },

  checkUserHasToken: (userid) => {
    return new Promise((resolve, reject) => {
      Token
      .where({ userid })
      .fetch()
      .then((result) => {
        if (result) {
          return resolve(result.toJSON());
        } else {
          return resolve(false);
        }
      })
      .catch(err => (reject('invalid token')));
    });
  },
  getUserByToken: (token) => {
    return new Promise((resolve, reject) => {
      Token
      .where({ token })
      .fetch()
      .then((result) => {
        return resolve(result.attributes);
      })
      .catch(err => (reject('invalid token')));
    });
  },
  extendToken: (tokenData) => {
    console.log('TOKENDATA', tokenData.company_id)
    return new Promise((resolve, reject) => {
      console.log('space', Space)
      Space.getAllSpacesByCompanyId(tokenData.company_id)
      .then((spaceList) => {
        console.log('spaceList', spaceList)
        const newExpiredAt = new Date();
        newExpiredAt.setTime(newExpiredAt.getTime() + (30 * 60 * 1000));
        console.log('tokenData', tokenData)
        Token
        .where({ token: tokenData.token })
        // .save({ expiredat: newExpiredAt }, { method: "update" })
        .save({ expiredat: newExpiredAt }, { patch: true }) // this works too
        .then(result => (resolve(result.toJSON())))
        .catch(err => (reject('extend expiration date failed', err)));
      });
    });
  },

  checkIdPassword2: (userid, password) => {
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

  checkIdPassword: (userid, password) => {
    return new Promise((resolve, reject) => {

      const checkAdmin = Admin.checkExistence(userid);
      const checkStaff = Staff.checkExistence(userid);

      Promise.all([checkAdmin, checkStaff])
      .then((result) => {
        if (result[0]) {
          const admin = result[0];
          bcrypt.compare(password, admin.password, (err, res) => {
            if (err) {
              return reject('bcrypt compare error');
            }
            if (res) {
              delete admin.password;
              return resolve([admin, 'comp']);
            } else {
              return reject('wrong admin password');
            }
          });
        } else if (result[1]) {
          const staff = result[1];
          bcrypt.compare(password, staff.password, (err, res) => {
            if (err) {
              return reject('bcrypt compare error');
            }
            if (res) {
              delete staff.password;
              return resolve([staff, 'staff']);
            } else {
              return reject('wrong staff password');
            }
          });
        } else {
          return reject('user is not found');
        }
      })
      .catch(err => (reject(err)));
    });
  },

  checkIfUserHasSpace: (req) => {
    return new Promise((resolve, reject) => {
      module.exports.getUserByToken(req.headers.token)
      .then(user => (resolve(user)))
      .catch(err => (reject(err)));
    })
    .then((user) => {
      console.log('USER', user)
      return new Promise((resolve, reject) => {
        const spaceid = req.query.space_id;
        if (user.type === 'comp') {
          console.log('userspacelist', user)
          const flag = JSON.parse(user.space_list).some((space) => {
            return space.id === JSON.parse(spaceid);
          });
          console.log('FLAG', flag)
          if (flag) {
            return resolve(true);
          } else {
            return resolve(false);
          }
        } else if (user.type === 'staff') {
          if (user.space_id === spaceid) {
            return resolve(true);
          } else {
            return resolve(false);
          }
        } else {
          return reject('unahthorized user');
        }
      });
    });
  },

  addNewToken: (tokenData) => {
    return new Promise((resolve, reject) => {
      new Token(tokenData)
      .save()
      .then(result => (resolve(result.toJSON())))
      .catch(err => (reject(err)));
    });
  },

  deleteToken: (token) => {
    return new Promise((resolve, reject) => {
      Token
      .where({ token })
      .destroy()
      .then((result) => {
        return resolve(result.toJSON());
      })
      .catch((err) => {
        return reject('failed to delete token');
      });
    });
  },
};

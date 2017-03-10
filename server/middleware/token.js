const Token = require('../db/token');
const Admin = require('../functions/admin');
const Staff = require('../functions/staff');
const Space = require('../functions/space');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  generateTokenData: () => {
    const token = uuid();
    const expiredat = new Date().getTime() + (60 * 60 * 1000);
    const tokenData = {
      token,
      expiredat,
    };
    return tokenData;
  },
  checkToken: (headers) => {
    return new Promise((resolve, reject) => {
      Token.where({ token: headers.token })
      .fetch()
      .then((result) => {
        console.log('valid token found, you are good to go');
        // this.extendExpiredAt(headers.token);
        return resolve(result)
      })
      .catch((err) => {
        return reject('invalid token');
      });
    });
  },
  getUserId: (token) => {
    return new Promise((resolve, reject) => {
      Token.where({ token })
      .fetch()
      .then((result) => {
        console.log('userid found', result)
        return resolve(result.userid);
      })
      .catch((err) => {
        console.log(err);
        return reject('invalid token');
      })
    });
  },
  extendExpiredAt: (token, time) => {
    return new Promise((resolve, reject) => {
      Token.where({ token })
      .fetch()
      .then((user) => {
        console.log('userid found', user)
        const newExpiredAt =  new Date().getTime() + time || (60 * 60 * 1000);
        new Token({ token })
        .save({ expiredat: newExpiredAt })
        .then((result) => {
          return resolve(result.expiredat);
        })
        .catch((err) => {
          reject('extend expiration date failed');
        });
      })
      .catch((err) => {
        console.log(err);
        return reject('invalid token');
      })
    });
  },
  checkIdPassword: (userid, password) => {
    return new Promise((resolve, reject) => {
      Admin.checkExistence(userid)
      .then((admin) => {
        // use bcrypt password
        if (admin) {
          bcrypt.compare(password, admin.password, (err, res) => {
            if (res) {
              delete admin.password;
              return resolve([admin, 'comp']);
            } else {
              console.log('user password not match in admin');
            }
          });
        } else {
          Staff.checkExistence(userid)
          .then((staff) => {
            bcrypt.compare(password, staff.password, (err, res) => {
              if (err) {
                return reject('invalid password');
              }
              if (res) {
                delete staff.password;
                return resolve([staff, 'staff']);
              }
            });
          })
          .catch((err) => {
            console.log('staff checkExistence failed to fetch');
            return reject(err);
          });
        }
      })
      .catch((err) => {
        console.log('admin checkExistence failed to fetch');
        return reject(err);
      })
    });
  },
  addNewToken: (body) => {
    return new Promise((resolve, reject) => {
      console.log('here')
      module.exports.checkIdPassword(body.userid, body.password)
      .then((result) => {
        const storage = {};
        const tokenData = module.exports.generateTokenData();
        storage.userid = body.userid;
        storage.token = tokenData.token;
        storage.expiredat = tokenData.expiredat;

        if (result[1] === 'comp') {
          const companyid = result[0].company_id;
          const spaceList = Space.getAllSpaces(companyid);
          storage.type = 'comp';
          storage.space_list = spaceList;
        } else if (result[1] === 'staff') {
          const spaceid = result[0].space_id;
          storage.type = 'staff';
          storage.space_id = spaceid;
        } else {
          return reject('unahthorized user tried to add token');
        }
        console.log('token storage', storage);
        new Token(storage)
        .save()
        .then((result) => {
          return resolve(result.attributes);
        })
        .catch((err) => {
          console.log('new token saving failed');
          return reject('saving new token data failed');
        });
      });
    });
  },
  deleteToken: (userid) => {
    return new Promise((resolve, reject) => {
      Token.where({ userid })
      .fetch()
      .then((result) => {console.log('result', result)})
      .destroy()
      .catch((err) => {
        return reject('failed to delete token');
      });
    });
  },
};

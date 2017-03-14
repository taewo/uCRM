const Token = require('../db/token');
const Admin = require('../functions/admin');
const Staff = require('../functions/staff');
const Space = require('../functions/space');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  generateTokenData: () => {
    const token = uuid();
    console.log('new Data', new Date(), 'newDAte.getTime', new Date().getTime())
    const expiredat = new Date().getTime() + (30 * 60 * 1000);
    // const expiredat = new Date();
    console.log('expiredat', expiredat)
    const tokenData = {
      token,
      expiredat,
    };
    return tokenData;
  },
  checkToken: (token) => {
    return new Promise((resolve, reject) => {
      Token.where({ token })
      .fetch()
      .then((result) => {
        console.log('valid token found, you are good to go');
        return resolve(result)
      })
      .catch((err) => {
        return reject('invalid token');
      });
    });
  },
  checkUserHasToken: (userid) => {
    return new Promise((resolve, reject) => {
      Token.where({ userid })
      .fetch()
      .then((result) => {
        console.log('userid found', result.attributes)
        return resolve(result.attributes);
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
            console.log(password, staff.password)
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
      .catch((err) => {
        console.log('checkExistence failed to fetch');
        return reject(err);
      })
    });
  },
  addNewToken: (req) => {
    return new Promise((resolve, reject) => {
      console.log('token', req.headers.token)
      module.exports.checkUserHasToken(req.body.userid)
      .then((result) => {
        console.log('user found in token db', result)
        return reject('already logged in!');
        // module.exports.extendExpiredAt(req.headers.token)
      })
      .catch((err) => {
        console.log('no token found err');
        return resolve();
      })
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        module.exports.checkIdPassword(req.body.userid, req.body.password)
        .then((result) => {
          const storage = {};
          const tokenData = module.exports.generateTokenData();
          console.log('tokendata', tokenData)
          storage.userid = req.body.userid;
          storage.token = tokenData.token;
          storage.expiredat = tokenData.expiredat;

          if (result[1] === 'comp') {
            const companyid = result[0].company_id;
            storage.type = 'comp';
            Space.getAllSpacesById(companyid)
            .then((spaceList) => {
              const JSONspaceList = spaceList.map((space) => {
                return {
                  id: space.id,
                  name: space.name,
                };
              });
              storage.space_list = JSON.stringify(JSONspaceList);
              new Token(storage)
              .save()
              .then((result) => {
                console.log('result', result)
                return resolve(result.attributes);
              })
              .catch((err) => {
                console.log(err)
                return reject('failed to save new token for admin');
              });
            })
            .catch((err) => {
              return reject(err);
            });
          } else if (result[1] === 'staff') {
            const spaceid = result[0].space_id;
            storage.type = 'staff';
            storage.space_id = spaceid;

            new Token(storage)
            .save()
            .then((result) => {
              console.log('new Token', result.attributes)
              return resolve(result.attributes);
            })
            .catch((err) => {
              return reject('saving new token data failed for staff');
            });
          } else {
            return reject('unahthorized user tried to add token');
          }
        })
        .catch((err) => {
          return reject(err);
        });
      });
    });
  },

  deleteToken: (token) => {
    return new Promise((resolve, reject) => {
      Token.where({ token })
      .destroy()
      .then((result) => {
        return resolve();
      })
      .catch((err) => {
        return reject('failed to delete token');
      });
    });
  },
};

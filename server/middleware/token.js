const Token = require('../db/token');
const Admin = require('../functions/admin');
const Staff = require('../functions/staff');
const Auth = require('../functions/auth');
const Space = require('../functions/space');

const uuid = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  generateTokenData: () => {
    const token = uuid();
    console.log('new Data', new Date(), 'newDAte.getTime', new Date().getTime())
    const expiredat = new Date();
    expiredat.setTime(expiredat.getTime() + (30 * 60 * 1000));
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
        const now = new Date();
        const session = result.attributes.expiredat;
        if (now - session > 0) {
          console.log('token expired');
          return reject('session(token) expired');
        } else {
          // updated token expiration date
          module.exports.extendToken(token)
          .then((extendedToken) => {
            return resolve(extendedToken);
          })
          .catch((err) => {
            return reject(err);
          });
        }
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
        if (result) {
          return resolve(result.attributes);
        } else {
          return resolve(false);
        }
      })
      .catch((err) => {
        console.log(err);
        return reject('invalid token');
      })
    });
  },
  getUserByToken: (token) => {
    return new Promise((resolve, reject) => {
      Token.where({ token })
      .fetch()
      .then((result) => {
        return resolve(result.attributes);
      })
      .catch((err) => {
        console.log(err);
        return reject('invalid token');
      })
    });
  },
  extendToken: (token) => {
    return new Promise((resolve, reject) => {
      const newExpiredAt =  new Date();
      newExpiredAt.setTime(newExpiredAt.getTime() + (30 * 60 * 1000));
      console.log('new extended time?', newExpiredAt)

      Token
      .where({ token })
      .save({ expiredat: newExpiredAt }, { method: "update" })
      // .save({ expiredat: newExpiredAt }, { patch: true }) // this works too
      .then((result) => {
        console.log('updated result', result.attributes)
        return resolve(result.attributes);
      })
      .catch((err) => {
        return reject('extend expiration date failed', err);
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
      .catch((err) => {
        console.log('checkExistence failed to fetch');
        return reject(err);
      })
    });
  },

  login: (req) => {
    return new Promise((resolve, reject) => {
      module.exports.checkIdPassword(req.body.userid, req.body.password)
      .then((userInfo) => {
        console.log('id and password are ok', userInfo);
        return resolve(userInfo);
      })
      .catch(err => (reject(err)));
    })
    .then((userInfo) => {
      return new Promise((resolve, reject) => {
        module.exports.checkUserHasToken(userInfo[0].userid)
        .then((tokenData) => {
          if (tokenData) {
            console.log('user already logged in. lets extend the token', tokenData);
            return resolve(tokenData);
          } else {
            console.log('no token found. lets continue to log in')
            return resolve(false);
          }
        })
        .catch(err => (reject(err)));
      });
    })
    .then((tokenData) => {
      return new Promise((resolve, reject) => {
        if (tokenData) {
          console.log('tokenData found extended', tokenData)
          module.exports.extendToken(tokenData.token)
          .then((result) => {
            console.log('extended!', result);
            delete tokenData.expiredat;
            return resolve(tokenData);
          })
        } else {
          console.log('lets save token, this has to be false', tokenData)
          Auth.getUser(req.body.userid)
          .then((user) => {
            console.log('user for token generation', user)
            const storage = {};
            const newToken = module.exports.generateTokenData();
            storage.userid = req.body.userid;
            storage.token = newToken.token;
            storage.expiredat = newToken.expiredat;

            if (user.type === 'comp') {
              const companyid = user.company_id;
              storage.type = 'comp';
              console.log('companyid', companyid)
              // console.log('function', Space.getAllSpacesByCompanyId);
              Space.getAllSpacesByCompanyId(companyid)
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
            } else if (user.type === 'staff') {
              const spaceid = user.space_id;
              storage.type = 'staff';
              storage.space_id = spaceid;

              new Token(storage)
              .save()
              .then((result) => {
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
        }
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

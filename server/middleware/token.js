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
        console.log('result', 'now', now, 'session', session, 'now-session', now - session)
        if (now - session > 0) {
          console.log('token expired');
          return reject('session(token) expired');
        } else {
          // updated token expiration date
          module.exports.extendExpiredAt(token)
          .then((extendedToken) => {
            console.log('extendedToken', extendedToken)
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
        return resolve(result.attributes);
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
  extendExpiredAt: (token) => {
    return new Promise((resolve, reject) => {
      const newExpiredAt =  new Date();
      newExpiredAt.setTime(newExpiredAt.getTime() + (30 * 60 * 1000));

      Token
      .where({ token })
      .save({ expiredat: newExpiredAt }, { method: 'update' })
      .then((result) => {
        return resolve(result.expiredat);
      })
      .catch((err) => {
        reject('extend expiration date failed');
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
  addNewToken: (req) => {
    return new Promise((resolve, reject) => {
      module.exports.checkUserHasToken(req.body.userid)
      .then((result) => {
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
          storage.userid = req.body.userid;
          storage.token = tokenData.token;
          storage.expiredat = tokenData.expiredat;

          if (result[1] === 'comp') {
            const companyid = result[0].company_id;
            storage.type = 'comp';
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
          } else if (result[1] === 'staff') {
            const spaceid = result[0].space_id;
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

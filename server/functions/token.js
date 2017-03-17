const Token = require('../db/token');

const Space = require('./space');

const uuid = require('uuid');


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

  getTokenByUserId(userid) {
    return Token
    .where({ userid })
    .fetch()
    // .then(result => (result ? result.toJSON : null));
    .then((result) => {
      if (result) {

        console.log('get user token', result.toJSON());
        return result.toJSON();
      }
    })
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

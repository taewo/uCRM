const Token = require('../db/token');
const uuid = require('uuid');

module.exports = {
  generateTokenData() {
    const token = uuid();
    const expiredat = new Date();
    expiredat.setTime(expiredat.getTime() + (30 * 60 * 1000));
    const tokenData = {
      token,
      expiredat,
    };
    return tokenData;
  },

  checkValidToken(token) {
    return Token.where({ token })
    .fetch()
    .then((result) => {
      if (!result) {
        return Promise.reject('Error: invalid token.');
      }
      console.log('valid token RESULT', result)
      const now = new Date();
      const session = result.toJSON().expiredat;
      if (now - session > 0) {
        return false;
      }
      console.log('RESULT.TOJSON()', result.toJSON())
      return result.toJSON();
    })
    .catch(err => (Promise.reject(err)));
  },

  getTokenByUserId(userid) {
    return Token
    .where({ userid })
    .fetch()
    .then(result => (result ? result.toJSON() : null))
    .catch(err => (Promise.reject(err)));
  },

  checkUserHasToken(userid) {
    return Token
    .where({ userid })
    .fetch()
    .then(result => (result ? result.toJSON() : false))
    .catch(err => (Promise.reject(err)));
  },

  getUserByToken(token) {
    return Token
    .where({ token })
    .fetch()
    .then(result => (result ? result.toJSON() : null))
    .catch(err => (Promise.reject(err)));
  },

  extendToken(tokenData) {
    const newExpiredAt = new Date();
    newExpiredAt.setTime(newExpiredAt.getTime() + (30 * 60 * 1000));
    return Token
    .where({ token: tokenData.token })
    // .save({ expiredat: newExpiredAt }, { method: "update" })
    .save({ expiredat: newExpiredAt }, { patch: true }) // this works too
    .then((result) => {
      const data = result.toJSON();
      data.token = tokenData.token;
      return data;
    });
  },

  addNewToken(tokenData) {
    return new Token(tokenData)
    .save()
    .then(result => (result ? result.toJSON() : null))
    .catch(err => (Promise.reject(err)));
  },

  deleteToken(token) {
    return Token
    .where({ token })
    .destroy()
    .then(result => (result ? result.toJSON() : null))
    .catch(err => (Promise.reject(err)));
  },
};

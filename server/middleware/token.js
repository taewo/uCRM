const Auth = require('../functions/auth');
const Token = require('../functions/token');
const Company = require('../functions/company');
const Space = require('../functions/space');

const ADMIN = 'comp';

module.exports = {
  login: (req) => {
    const {
      userid,
      password,
    } = req.body;

    return Token.checkIdPassword2(userid, password)
    .then((isValidIDAndPassword) => {
      if (!isValidIDAndPassword) {
        throw new Error('invalid id or password');
      }
      return Token.getUserToken(userid)
      .then((token) => {
        if (token) {
          return token;
        }

        const newToken = Token.generateTokenData();
        newToken.userid = userid;

        return Auth.getUser(req.body.userid)
        .then((user) => {
          if (!user) {
            throw new Error('no user founded');
          }
          newToken.type = user.type;

          if (user.type !== ADMIN) {
            return newToken;
          }

          const companyId = user.company_id;
          return Space.getAllSpacesByCompanyId(companyId)
          .then((spaceList) => {
            newToken.space_list = spaceList.map(space => ({
              id: space.id,
              name: space.name,
            }));
            newToken.company_id = companyId;
            return newToken;
          });
        });
      });
    });
  },

  checkNExtendedToken: (token) => {
    return new Promise((resolve, reject) => {
      Token.checkToken(token)
      .then((token) => {
        if (token) {
          return resolve(token);
        } else {
          return reject('Error: Authentication credentials expired.');
        }
      })
      .catch(err => (reject(err)));
    })
    .then((tokenData) => {
      console.log('TOKEN', tokenData)
      return new Promise((resolve, reject) => {
        Token.extendToken(tokenData)
        .then((result) => {
          delete result.expiredat;
          console.log('extended', result)
          return resolve(result);
        })
        .catch(err => (reject(err)));
      });
    });
  },
};

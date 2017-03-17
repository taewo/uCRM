const Auth = require('../functions/auth');
const Token = require('../functions/token');
const Space = require('../functions/space');

const ADMIN = 'comp';

module.exports = {
  login: (req) => {
    const {
      userid,
      password,
    } = req.body;

    return Auth.checkIdPassword(userid, password)
    .then((isValidIDAndPassword) => {
      console.log('heyheh')
      if (!isValidIDAndPassword) {
        throw new Error('invalid id or password');
      }
      console.log('finally we are here')
      const newToken = Token.generateTokenData();
      newToken.userid = userid;

      return Auth.getUserByUserId(userid)
      .then((user) => {
        if (!user) {
          throw new Error('no user found!');
        }
        newToken.type = user.type;
        if (user.type !== ADMIN) {
          return newToken;
        }

        const companyId = user.company_id;

        return Token.getTokenByUserId(userid)
        .then((token) => {
          console.log('TOKEN', token)
          if (token) {
            return Token.extendToken(token)
            .then((extendedToken) => {
              return Space.getAllSpacesByCompanyId(companyId)
              .then((spaceList) => {
                extendedToken.space_list = spaceList.map(space => ({
                  space_id: space.id,
                  name: space.name,
                }));
                extendedToken.company_id = companyId;
                return extendedToken;
              });
            });
          }
          return Token.addNewToken(newToken)
          .then((tokenData) => {
            return Space.getAllSpacesByCompanyId(companyId)
            .then((spaceList) => {
              tokenData.space_list = spaceList.map(space => ({
                space_id: space.id,
                name: space.name,
              }));
              tokenData.company_id = companyId;
              return tokenData;
            });
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

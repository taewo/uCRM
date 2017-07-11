const Auth = require('../functions/auth');
const Token = require('../functions/token');
const Space = require('../functions/space');

const ADMIN = 'comp';

module.exports = {
  login(req) {
    const {
      userid,
      password,
    } = req.body;

    return Auth.checkIdPassword(userid, password)
    .then((isValidIDAndPassword) => {
      if (!isValidIDAndPassword) {
        return Promise.reject('Error: Authentication credentials were not provided.');
      }
      const newToken = Token.generateTokenData();
      newToken.userid = userid;

      return Auth.getUserByUserId(userid)
      .then((user) => {
        if (!user) {
          return Promise.reject('Error: Your requested user does not exist.');
        }
        newToken.type = user.type;
        if (user.type !== ADMIN) {
          return newToken;
        }

        const companyId = user.company_id;

        return Token.getTokenByUserId(userid)
        .then((tokenData) => {
          if (tokenData) {
            return Token.checkValidToken(tokenData.token)
            .then((tokenValid) => {
              console.log(tokenValid);
              if (tokenValid) {
                console.log('validitychecked')
                return Token.extendToken(tokenData)
                .then((extendedToken) => {
                  console.log('extension');
                  return Space.getAllSpacesByCompanyId(companyId)
                  .then((spaceList) => {
                    console.log('sp', extendedToken);
                    extendedToken.space_list = spaceList.map(space => ({
                      space_id: space.id,
                      name: space.name,
                    }));
                    console.log('extendedToken', extendedToken);
                    extendedToken.company_id = companyId;
                    return extendedToken;
                  });
                });
              }
              return Token.deleteToken(tokenData.token)
              .then(() => {
                return Token.addNewToken(newToken)
                .then((generatedTokenData) => {
                  return Space.getAllSpacesByCompanyId(companyId)
                  .then((spaceList) => {
                    generatedTokenData.space_list = spaceList.map(space => ({
                      space_id: space.id,
                      name: space.name,
                    }));
                    generatedTokenData.company_id = companyId;
                    console.log('GENERATEDTOKENDATA', generatedTokenData)
                    return generatedTokenData;
                  })
                });
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

  checkNExtendedToken(token) {
    console.log('TOKEN', token)
    return Token.checkValidToken(token)
      .then((tokenCheck) => {
        console.log('TOKENCHECK', tokenCheck)
        if (tokenCheck) {
          console.log('CONDITION PASSED')
          return tokenCheck;
        }
        console.log('1111111111111111111111111')
        return Promise.reject('Error: Authentication credentials expired.');
      })
      .then((tokenData) => {
        return Token.extendToken(tokenData)
        .then((result) => {
          delete result.expiredat;
          return result;
        });
      })
      .catch(err => (Promise.reject(err)));
  },

  checkExistingToken(token) {
    return Token.checkValidToken(token)
      .then((tokenCheck) => {
        console.log('TOKENCHECK', tokenCheck)
        if (tokenCheck) {
          return tokenCheck;
        }
        return Promise.reject('Error: Authentication credentials expired.')
      })
      .catch(err => (Promise.reject(err)));
  },
};

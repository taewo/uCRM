const Space = require('../functions/space');
const Company = require('../functions/company');
const Token = require('../functions/token');

module.exports = {
  get: (req) => {
    return Token.getUserByToken(req.headers.token)
    .then((user) => {
      console.log('USER', user)
      return Company.getCompanyIdByUserId(user.userid)
      .then((companyId) => {
        return Space.getAllSpacesByCompanyId(companyId)
        .then((spaceList) => {
          console.log('SPACELIST', spaceList)
          return spaceList;
        });
      });
    });
  },
  post: (req) => {
    return Token.getUserByToken(req.headers.token)
    .then((user) => {
      if (user) {
        if (user.type === 'comp') {
          return Space.checkDuplicateSpace(req.body)
          .then((flagIfSpaceExist) => {
            console.log('duplicate?', flagIfSpaceExist);
            if (flagIfSpaceExist) {
              throw new Error('the space already exist');
            } else {
              return Space.addNewSpace(req.body)
              .then((newSpace) => {
                return newSpace;
              });
            }
          });
        } else if (user.type === 'staff') {
          throw new Error('staff is not authorized to create a new space');
        }
      } else {
        throw new Error('Error: you have no access to this space');
      }
    });
  },
};

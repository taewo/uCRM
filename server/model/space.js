const Space = require('../functions/space');
const Company = require('../functions/company');
const Token = require('../functions/token');

module.exports = {
  get(req) {
    return Token.getUserByToken(req.headers.token)
    .then(user => (
      Company.getCompanyIdByUserId(user.userid)
      .then(companyId => (
        Space.getAllSpacesByCompanyId(companyId)
        .then(spaceList => (spaceList))
      ))
    ))
    .catch(err => (Promise.reject(err)));
  },

  post(req) {
    return Token.getUserByToken(req.headers.token)
    .then((user) => {
      console.log('USER found by token', user)
      if (user) {
        if (user.type === 'comp') {
          return Space.checkDuplicateSpace(req.body)
          .then((flagIfSpaceExist) => {
            console.log('FLAGIFSPACEEXIST', flagIfSpaceExist)
            if (flagIfSpaceExist) {
              return Promise.reject('Error: requested space already exist');
            } else {
              return Space.addNewSpace(req.body)
              .then((newSpace) => {
                return newSpace;
              });
            }
          });
        } else if (user.type === 'staff') {
          return Promise.reject('staff is not authorized to create a new space');
        }
      } else {
        return Promise.reject('Error: Authentication credentials were not provided.');
      }
    })
    .catch(err => (Promise.reject(err)));
  },

  delete(req) {
    return Space.deleteSpace(req.body.space_id)
    .then((result) => {
      return result;
    })
    .catch(err => (Promise.reject(err)));
  },
};

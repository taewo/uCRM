const Space = require('../functions/space');
const Company = require('../functions/company');
const Token = require('../functions/token');

module.exports = {
  get(req) {
    const companyInfo = Company.getCompanyInfoByToken(req.headers.token);
    const spaceInfo = Space.getSpaceDetailBySpaceId(req.query.space_id);
    return Promise.all([companyInfo, spaceInfo])
    .then(basicInfo => (basicInfo))
    .catch(err => (Promise.reject(err)));
  },

  put(req) {
    return Token.getUserByToken(req.headers.token)
    .then((user) => {
      if (user) {
        if (user.type === 'comp') {
          return Space.checkDuplicateSpace(req.body)
          .then((flagIfSpaceExist) => {
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
};

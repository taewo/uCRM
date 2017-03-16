const Space = require('../functions/space');
const Company = require('../functions/company');
const Token = require('../middleware/token');

module.exports = {
  get: (req) => {
    return new Promise((resolve, reject) => {
      Token.getUserByToken(req.headers.token)
      .then(user => (resolve(user)))
      .catch(err => (reject(err)));
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        Company.getCompanyIdByUserId(user.userid)
        .then(companyId => (resolve(companyId)))
        .catch(err => (reject(err)));
      });
    })
    .then((companyId) => {
      return new Promise((resolve, reject) => {
        Space.getAllSpacesByCompanyId(companyId)
        .then((spaceList) => {
          return resolve(spaceList);
        })
        .catch(err => (reject(err)));
      });
    });
  },
  post: (req) => {
    return new Promise((resolve, reject) => {
      Token.getUserByToken(req.headers.token)
      .then(user => (resolve(user)))
      .catch(err => (reject(err)));
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        if (user) {
          if (user.type === 'comp') {
            Space.checkDuplicateSpace(req.body)
            .then((flagIfSpaceExist) => {
              console.log('duplicate?', flagIfSpaceExist);
              if (flagIfSpaceExist) {
                return reject('the space already exist');
              } else {
                Space.addNewSpace(req.body)
                .then((newSpace) => {
                  return resolve(newSpace);
                })
                .catch(err => (reject(err)));
              }
            });
          } else if (user.type === 'staff') {
            return reject('staff is not authorized to create a new space');
          }
        } else {
          return reject('Error: you have no access to this space');
        }
      });
    });
  },
}

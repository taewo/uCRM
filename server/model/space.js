const Space = require('../functions/space');
const Company = require('../functions/company');
const Token = require('../functions/token');
const Auth = require('../functions/auth');
const Activity = require('../functions/activity');

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
                console.log(newSpace.attributes.id, newSpace);
                const activityDetail = {
                  space_id: newSpace.id,
                  type: 'space_creation',
                  date: new Date(),
                  user: newSpace.attributes.name,
                };
                Activity.addNewActivity(activityDetail);
                // todo Error-handling
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
    return Auth.checkIfUserHasSpace(req)
    .then((hasSpace) => {
      return new Promise((resolve, reject) => {
        if (hasSpace) {
          return Space.deleteSpace(req.body.space_id)
          .then((result) => {
            return result;
          });
        }
        return reject('Error: Your requested space does not exist.');
      });
    })
    .catch(err => (Promise.reject(err)));
  },
};

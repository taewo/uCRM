const Admin = require('../functions/admin');
const Space = require('../functions/space');

module.exports = {
  post: (req) => {
    const currentUser = req.session.passport.user;
    console.log('currentUser', currentUser);
    if (currentUser.type === 'comp') {
      console.log('current user type is comp')
      return new Promise((resolve, reject) => {
        return resolve(Admin.checkExistence(currentUser.userid))
      })
      .then((result) => {
        console.log('here after Admin check exist result', result)
        return new Promise((resolve, reject) => {
          if (!result) {
            return reject('admin does not exist');
          } else {
            return resolve(Space.checkDuplicateSpace(req.body, currentUser.company_id));
          }
        })
      })
      .then((isDuplicate) => {
        return new Promise((resolve, reject) => {
          if (isDuplicate) {
            return reject('space already exist');
          } else {
            return resolve(Space.addNewSpace(req.body, currentUser));
        }})
      })
      .then((result) => {
        return new Promise((resolve, reject) => {
          if (!result) {
            return reject('space creation error');
          }
          return resolve(result);
        })
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
    } else {
      return Promise.reject('unauthorized');
    }
  },
}

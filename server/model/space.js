const Admin = require('../functions/admin');
const Space = require('../functions/space');

module.exports = {
  get: (req) => {
    const currentUser = req.session.passport.user;
    return new Promise((resolve, reject) => {
      if (currentUser.type === 'staff') {
        return resolve(Space.getSpaceDetailByID(currentUser.space_id));
      } else if (currentUser.type === 'comp') {
        const container = []
        if (currentUser.spaceList) {
          currentUser.spaceList.forEach((space) => {
            container.push(Space.getSpaceDetailByID(space));
          });
          console.log(container);
        }
        Promise.all(container)
        .then((res) => {
          return resolve(res);
        });
      } else {
        return reject('unauthorized');
      }
    });
  },
  post: (req) => {
    const currentUser = req.session.passport.user;
    console.log('currentUser', currentUser);
    if (currentUser.type === 'comp') {
      return new Promise((resolve, reject) => {
        return resolve(Admin.checkExistence(currentUser.userid))
      })
      .then((result) => {
        return new Promise((resolve, reject) => {
          if (!result) {
            return reject('admin does not exist');
          } else {
            return resolve(Space.checkDuplicateSpace(req.body, currentUser.company_id));
          }
        });
      })
      .then((isDuplicate) => {
        return new Promise((resolve, reject) => {
          if (isDuplicate) {
            return reject('space already exist');
          } else {
            return resolve(Space.addNewSpace(req.body, currentUser));
          }
        });
      })
      .then((result) => {
        return new Promise((resolve, reject) => {
          if (!result) {
            return reject('space creation error');
          }
          return resolve(result);
        });
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

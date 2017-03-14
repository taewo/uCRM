const Admin = require('../functions/admin');
const Space = require('../functions/space');
const Token = require('../middleware/token');

module.exports = {
  get: (req) => {
    console.log('req', req.query)
    return new Promise((resolve, reject) => {
      Token.getUserByToken(req.headers.token)
      .then((user) => {
        console.log('user', user);
        if (user.type === 'comp') {
          return resolve(JSON.parse(user.space_list));
        } else if (user.type === 'staff') {
          return resolve(user.space_id);
        } else {
          return reject('user is neither admin nor staff');
        }
      })
      .catch((err) => {
        return reject(err);
      })
    });
  },
  post: (req) => {
    console.log('req', req.body)
    // const user = req.body;
    return new Promise((resolve, reject) => {
      Token.getUserByToken(req.headers.token)
      .then((user) => {
        if (user.type === 'comp') {
          return resolve('comp')
        } else if (user.type === 'staff') {
          return resolve('staff');
        }
      })
      .catch((err) => {
        return reject(err);
      });
    })
    .then((result) => {
      console.log('finally result', result);
      return new Promise((resolve, reject) => {
        if (result === 'comp') {
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
              .catch((err) => {
                return reject(err);
              });
            }
          })
        } else if (result === 'staff') {
          return reject('staff is not authorized to create a new space');
        }
      });
    })

    if (user.type === 'comp') {
      return new Promise((resolve, reject) => {
        return resolve(Admin.checkExistence(user.userid))
      })
      .then((result) => {
        return new Promise((resolve, reject) => {
          if (!result) {
            return reject('admin does not exist');
          } else {
            return resolve(Space.checkDuplicateSpace(user));
          }
        });
      })
      .then((isDuplicate) => {
        return new Promise((resolve, reject) => {
          if (isDuplicate) {
            return reject('space already exist');
          } else {
            return resolve(Space.addNewSpace(req.body, user));
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

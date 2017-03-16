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
        return resolve(user);
      })
      .catch((err) => {
        return reject(err);
      });
    })
    .then((user) => {
      console.log('finally user', user);
      return new Promise((resolve, reject) => {
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
              .catch((err) => {
                return reject(err);
              });
            }
          });
        } else if (user.type === 'staff') {
          return reject('staff is not authorized to create a new space');
        }
      });
    });
  },
}

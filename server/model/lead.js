const Lead = require('../functions/lead');
const Space = require('../functions/space');
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
        Space.checkIfUserHasSpace(user, req.query.space_id)
        .then(flag => (resolve([user, flag])))
        .catch(err => (reject(err)));
      });
    })
    .then((result) => {
      return new Promise((resolve, reject) => {
        const user = result[0];
        const flag = result[1];
        if (flag) {
          console.log('result', result, 'user', user)
          Lead.getLead(req.query.space_id)
          .then((lead) => {
            console.log('lead', lead);
            return resolve(lead);
          })
        } else {
          return reject('user approaches unahthorized space_id');
        }
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
        Space.checkIfUserHasSpace(user, req.query.space_id)
        .then(flag => (resolve(flag)))
        .catch(err => (reject(err)));
      });
    })
    .then((flag) => {
      return new Promise((resolve, reject) => {
        if (flag) {
          console.log('flag', flag)
          Lead.addNewLead(req.body)
          .then((lead) => {
            console.log('lead', lead.toJSON());
            return resolve(lead);
          })
          .catch(err => (reject(err)));
        } else {
          return reject('user approaches unahthorized space_id');
        }
      });
    });
  },
};

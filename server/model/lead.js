const Lead = require('../functions/lead');
const Space = require('../functions/space');
const Auth = require('../functions/auth');
const Token = require('../middleware/token');

module.exports = {
  get: (req) => {
    return Auth.checkIfUserHasSpace(req)
    .then((hasSpace) => {
      if (hasSpace) {
        return Lead.getLead(req.query.space_id)
        .then((lead) => {
          return lead;
        })
      } else {
        throw new Error('user approaches unahthorized space_id');
      }
    });
  },

  post: (req) => {
    return Auth.checkIfUserHasSpace(req)
    .then((hasSpace) => {
      return new Promise((resolve, reject) => {
        if (hasSpace) {
          Lead.addNewLead(req.body)
          .then((lead) => {
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

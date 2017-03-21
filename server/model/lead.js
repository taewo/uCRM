const Lead = require('../functions/lead');
const Auth = require('../functions/auth');

module.exports = {
  get(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((hasSpace) => {
      if (hasSpace) {
        return Lead.getLead(req.query.space_id)
        .then((lead) => {
          return lead;
        })
      }
      return Promise.reject('Error: Your requested space does not exist.');
    })
    .catch(err => (Promise.reject(err)));
  },

  post(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((hasSpace) => {
      if (hasSpace) {
        return Lead.addNewLead(req.body)
        .then((lead) => {
          return lead;
        });
      }
      return Promise.reject('Error: Your requested space does not exist.');
    })
    .catch(err => (Promise.reject(err)));
  },

  delete(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((hasSpace) => {
      return Lead.deleteLead(req.body.lead_id)
      .then(result => (result));
    })
    .catch(err => (Promise.reject(err)));
  },
};

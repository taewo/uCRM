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
    return Lead.getSpaceForLead(req.body.lead_id)
    .then((spaceId) => {
      req.body.space_id = spaceId;
      return Auth.checkIfUserHasSpace(req)
      .then((hasSpace) => {
        if (hasSpace) {
          return Lead.deleteLead(req.body.lead_id)
          .then(result => (result));
        }
        return Promise.reject('Error: you have no authority to this lead.');
      });
    })
    .catch(err => (Promise.reject(err)));
  },
};

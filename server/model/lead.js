const Lead = require('../functions/lead');
const Auth = require('../functions/auth');
const Activity = require('../functions/activity');

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
        const activityDetail = {
          space_id: req.body.space_id,
          type: 'lead_' + req.body.type,
          date: new Date(),
          target: req.body.email,
        };
        const addLead = Lead.addNewLead(req.body);
        const addActivity = Activity.addNewActivity(activityDetail);
        return Promise.all([addLead, addActivity])
        .then(result => {
          console.log('res', result)
          return result[0]
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

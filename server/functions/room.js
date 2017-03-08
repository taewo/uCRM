const Lead = require('../db/lead');

module.exports = {
  getLead: (spaceid) => {
    return new Promise((resolve, reject) => {
      Lead.where({ space_id: spaceid })
      .fetch()
      .then((result) => {
        return resolve(result);
      })
    });
  },
  addNewLead: (body, spaceid) => {
    return new Promise((resolve, reject) => {
      body.space_id = spaceid;
      new Lead(body)
      .save()
      .then((result) => {
        return resolve(result);
      });
    });
  },
};

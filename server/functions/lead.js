const Lead = require('../db/lead');

module.exports = {
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

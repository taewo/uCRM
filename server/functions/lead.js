const Lead = require('../db/lead');

module.exports = {
  getLead: (spaceid) => {
    return new Promise((resolve, reject) => {
      console.log('spaceid', spaceid)
      Lead
      .where({ space_id: spaceid })
      .fetchAll()
      .then(result => (resolve(result)));
    });
  },
  addNewLead: (body) => {
    return new Promise((resolve, reject) => {
      // body.space_id = spaceid;
      body.conversion = 0;

      new Lead(body)
      .save()
      .then(result => (resolve(result)));
    });
  },
};

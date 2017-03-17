const Lead = require('../db/lead');

module.exports = {
  getLead: (spaceid) => {
    return new Promise((resolve, reject) => {
      Lead
      .where({ space_id: spaceid })
      .fetchAll()
      .then(result => (resolve(result)))
      .catch(err => (reject(err)));
    });
  },

  addNewLead: (body) => {
    return new Promise((resolve, reject) => {
      body.conversion = 0;
      new Lead(body)
      .save()
      .then(result => (resolve(result)))
      .catch(err => (reject(err)));
    });
  },

  toggleConvertedLead: (spaceid, email) => {
    return new Promise((resolve, reject) => {
      Lead
      .where({
        space_id: spaceid,
        email: email,
      })
      .fetchAll()
      .then((result) => {
        if (!result.toJSON().length) {
          return resolve(false);
        }
        const list = result.toJSON();
        let latestLeadId;
        const latestVisitDate = list[0].date;
        list.forEach((lead) => {
          if (latestVisitDate < lead.date) {
            latestLeadId = lead.id;
          }
        });
        return resolve(latestLeadId);
      })
      .catch(err => (reject(err)));
    })
    .then((latestLeadId) => {
      return new Promise((resolve, reject) => {
        if (!latestLeadId) {
          return resolve(false)
        }
        new Lead({ id: latestLeadId })
        .save({ conversion: 1 }, {patch: true})
        .then((lead) => {
          console.log('converted lead info', lead.toJSON());
          return resolve();
        })
        .catch(err => reject('failed to toggle lead conversion flag'));
      });
    });
  },
};

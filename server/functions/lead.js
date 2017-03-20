const Lead = require('../db/lead');

module.exports = {
  getLead(spaceid) {
    return Lead
    .where({ space_id: spaceid })
    .fetchAll()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject(err)));
  },

  addNewLead(body) {
    body.conversion = 0;
    new Lead(body)
    .save()
    .then(result => (result))
    .catch(err => (Promise.reject(err)));
  },

  toggleConvertedLead(spaceid, email) {
    return Lead
    .where({
      space_id: spaceid,
      email: email,
    })
    .fetchAll()
    .then((result) => {
      if (!result.toJSON().length) {
        return false;
      }
      const list = result.toJSON();
      let latestLeadId;
      const latestVisitDate = list[0].date;
      list.forEach((lead) => {
        if (latestVisitDate < lead.date) {
          latestLeadId = lead.id;
        }
      });
      return new Lead({ id: latestLeadId })
      .save({ conversion: 1 }, { patch: true });
    })
    .catch(err => Promise.reject(err));
  },
};

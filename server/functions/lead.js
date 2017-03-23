const Moment = require('moment');

const Lead = require('../db/lead');

module.exports = {
  getLead(spaceid) {
    return Lead
    .where({ space_id: spaceid })
    .fetchAll()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject(err)));
  },

  getCountRecentLead(spaceid) {
    return Lead
    .where({ space_id: spaceid })
    .query((qb) => {
      // change below hard code with moment.js to show the last mongh activity
      const now = Moment().format('YYYY-MM-DD HH:MM:SS');
      const weekAgo = Moment().subtract(7, 'days').format('YYYY-MM-DD HH:MM:SS');
      qb.whereBetween('date', [weekAgo, now]);
    })
    .count()
    .catch(err => (Promise.reject(err)));
  },

  addNewLead(body) {
    body.conversion = 0;
    return new Lead(body)
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

  getSpaceForLead(leadid) {
    return Lead
    .where({ id: leadid })
    .fetch()
    .then((lead) => {
      if (!lead) {
        return Promise.reject('Error: no lead found');
      }
      return lead.toJSON().space_id;
    })
    .catch(err => (Promise.reject(err)));
  },

  deleteLead(leadid) {
    return Lead
    .where({ id: leadid })
    .fetch()
    .then((lead) => {
      if (!lead) {
        return Promise.reject('Error: no lead found');
      }
      return Lead
      .where({ id: leadid })
      .destroy()
      .then(result => (result.toJSON()));
    })
    .catch(err => (Promise.reject(err)));
  },
};

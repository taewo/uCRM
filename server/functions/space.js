const Moment = require('moment');

const Space = require('../db/space');
const Company = require('../db/company');
const Room = require('../db/room');
const Member = require('../db/member');
const Activity = require('../db/activity');

module.exports = {

  getMemberListbySpaceId(spaceid) {
    return Space
    .where({ id: spaceid })
    .fetch({ withRelated: ['member'] })
    .then((result) => {
      if (!result) {
        return [];
      }
      return result.related('member').toJSON();
    })
    .catch(err => (Promise.reject('failed to get member list')));
  },

  getReservedList(spaceid) {
    return Room
    .where({ space_id: spaceid })
    .fetch({ withRelated: ['reservation'] })
    .then((result) => {
      if (!result) {
        return [];
      }
      return result.related('reservation').toJSON();
    })
    .catch(err => (Promise.reject(err)));
  },

  getLatestActivity(spaceid) {
    return Activity
    .where({ space_id: spaceid })
    .query((qb) => {
      // change below hard code with moment.js to show the last mongh activity
      const now = Moment().add(1, 'days').format('YYYY-MM-DD');
      const monthAgo = Moment().subtract(30, 'days').format('YYYY-MM-DD');
      console.log(monthAgo, now);
      qb.whereBetween('date', [monthAgo, now]);
    })
    .fetchAll()
    .then((result) => {
      console.log('res returned', result.toJSON());
      if (result) {
        return result.toJSON();
      }
      return [];
    })
    .catch(err => (Promise.reject(err)));
  },

  getSpaceDetailBySpaceId(spaceid) {
    return Space
    .where({ id: spaceid })
    .fetch()
    .then((result) => {
      if (result) {
        return result.toJSON();
      }
      return [];
    })
    .catch(err => (Promise.reject(err)));
  },

  getSpaceDetailByName(spaceName) {
    return Space
    .where({ name: spaceName })
    .fetch()
    .then((result) => {
      if (result) {
        return result.toJSON();
      }
      return Promise.reject('Error: requested space does not exist');
    })
    .catch(err => (Promise.reject(err)));
  },

  getAllSpacesByCompanyId(companyId) {
    return Space
    .where({ company_id: companyId, isactive: true })
    .fetchAll()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject(err)));
  },

  getAllSpacesByCompanyName(companyname) {
    return Company
    .where({ name: companyname, isactive: true })
    .fetch({ withRelated: ['space'] })
    .then(result => (result.related('space')))
    .catch(err => (Promise.reject(err)));
  },

  addNewSpace: ({
    company_id,
    name,
    address,
    max_desks,
  } = {}) => new Promise((resolve, reject) => {
    return new Space({
      company_id,
      name,
      address,
      max_desks,
      isactive: true,
    })
    .save()
    .then(newSpace => (resolve(newSpace)))
    .catch((err) => {
      if (err.code.includes('ER_DUP_ENTRY')) {
        return reject('Error: the space name is taken.');
      }
      return reject(err);
    });
  }),

  checkDuplicateSpace(body) {
    return module.exports.getAllSpacesByCompanyId(body.company_id)
    .then((result) => {
      console.log('if company has duplicate space name, RESULT', result);
      return result.some(space => (space.name === body.name));
    })
    .catch(err => (Promise.reject(err)));
  },

  getSpaceIdByMemberId(memberid) {
    return Member
    .where({ id: memberid })
    .fetch()
    .then(result => (result.toJSON().space_id))
    .catch(err => (Promise.reject(err)));
  },

  recoverSpace(spaceid) {
    return Space
    .where({ id: spaceid })
    .save({ isactive: true }, { patch: true })
    .then((result) => {
      return result.toJSON();
    })
    .catch(err => (Promise.reject(err)));
  },

  deleteSpace(spaceid) {
    return Space
    .where({ id: spaceid })
    .save({ isactive: false }, { patch: true })
    .then((result) => {
      return result.toJSON();
    })
    .catch(err => (Promise.reject(err)));
  },
};

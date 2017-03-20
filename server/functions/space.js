const Space = require('../db/space');
const Company = require('../db/company');
const Room = require('../db/room');
const Member = require('../db/member');
const Activity = require('../db/activity');

const company = require('./company');

module.exports = {

  getMemberList: spaceid => (
    Space
    .where({ id: spaceid })
    .fetch({ withRelated: ['member'] })
    .then((result) => {
      if (!result) {
        return [];
      }
      return result.related('member').toJSON();
    })
    .catch(err => (Promise.reject('failed to get member list')))
  ),

  getReservedList: spaceid => (
    Room.where({ space_id: spaceid })
    .fetch({ withRelated: ['reservation'] })
    .then((result) => {
      if (!result) {
        return [];
      }
      return result.related('reservation').toJSON();
    })
    .catch(err => (Promise.reject(err)))
  ),

  getLatestActivity: spaceid => (
    Activity.where({ space_id: spaceid })
    .query((query) => {
      // change below hard code with moment.js to show the last mongh activity
      query.whereBetween('date', ['2017-02-01', '2017-03-02']);
    })
    .fetch()
    .then((result) => {
      if (result) {
        return result.toJSON();
      }
      return [];
    })
    .catch(err => (Promise.reject(err)))
  ),

  getSpaceDetailByID: spaceid => (
    Space.where({ id: spaceid })
    .fetch()
    .then((result) => {
      if (result) {
        return result.toJSON();
      }
      return [];
    })
    .catch(err => (Promise.reject(err)))
  ),

  getSpaceDetailByName: spaceName => (
    Space.where({ name: spaceName })
    .fetch()
    .then((result) => {
      if (result) {
        return result.toJSON();
      }
      return Promise.reject('Error: requested space does not exist');
    })
    .catch(err => (Promise.reject(err)))
  ),

  getAllSpacesByCompanyId: companyId => (
    Space
    .where({ company_id: companyId })
    .fetchAll()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject(err)))
  ),

  getAllSpacesByCompanyName: companyname => (
    Company
    .where({ name: companyname })
    .fetch({ withRelated: ['space'] })
    .then(result => (result.related('space')))
    .catch(err => (Promise.reject(err)))
  ),

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
    })
    .save()
    .then(newSpace => (resolve(newSpace)))
    .catch(err => (reject(err)));
  }),

  checkDuplicateSpace: body => (
    company.getCompanySpaceInfoByCompanyId(body.company_id)
    .then((result) => {
      const existingSpace = result.related('space').toJSON();
      return existingSpace.some(space => (space.name === body.name));
    })
    .catch(err => (Promise.reject(err)))
  ),

  getSpaceIdByMemberId: memberid => (
    Member
    .where({ id: memberid })
    .fetch()
    .then(result => (result.toJSON().space_id))
    .catch(err => (Promise.reject(err)))
  ),
};

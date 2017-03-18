const Space = require('../db/space');
const Company = require('../db/company');
const Room = require('../db/room');
const Member = require('../db/member');
const Activity = require('../db/activity');

const company = require('./company');

module.exports = {

  getMemberList: (spaceid) => {
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

  getReservedList: (spaceid) => {
    return Room.where({ space_id: spaceid })
    .fetch({ withRelated: ['reservation'] })
    .then((result) => {
      if (!result) {
        return [];
      }
      return result.related('reservation').toJSON();
    })
    .catch(err => (Promise.reject(err)));
  },

  getUnpaidSum: (spaceid) => {
    return new Promise((resolve, reject) => {
      Member.where({ space_id: spaceid })
      .fetch({ withRelated: ['payment'] })
      .then((result) => {
        if (!result) {
          return resolve([]);
        }
        return resolve(result.related('payment').toJSON());
      })
    });
  },

  getLatestActivity: (spaceid) => {
    return new Promise((resolve, reject) => {
      Activity.where({ space_id: spaceid })
      .query((query) => {
        query.whereBetween('date', ['2017-02-01', '2017-03-02'])
      })
      .fetch()
      .then((result) => {
        if (!result) {
          return resolve([]);
        }
        return resolve(result.toJSON());
      });
    });
  },

  getSpaceDetailByID: (spaceid) => {
    return new Promise((resolve, reject) => {
      Space.where({ id: spaceid })
      .fetch()
      .then((result) => {
        if (!result) {
          console.log('no space list found');
          return resolve([]);
        }
        return resolve(result.attributes);
      })
      .catch(err => (reject('failed to get space info from db')));
    });
  },

  getSpaceDetailByName: (spaceName) => {
    return new Promise((resolve, reject) => {
      Space.where({ name: spaceName })
      .fetch()
      .then((result) => {
        if (!result) {
          return reject('corresponding space does not exist');
        }
        return resolve(result.toJSON());
      });
    });
  },

  getAllSpacesByCompanyId: (companyId) => {
    return new Promise((resolve, reject) => {
      Space
      .where({ company_id: companyId })
      .fetchAll()
      .then((result) => {
        return resolve(result.toJSON());
      })
      .catch(err => (reject(err)));
    });
  },

  getAllSpacesByCompanyName: (companyname) => {
    return new Promise((resolve, reject) => {
      Company
      .where({ name: companyname })
      .fetch({ withRelated: ['space'] })
      .then((result) => {
        return resolve(result.related('space'));
      });
    });
  },

  addNewSpace: (body) => {
    return new Promise((resolve, reject) => {
      return new Space({
        company_id: body.company_id,
        name: body.name,
        address: body.address,
        max_desks: body.max_desks,
      })
      .save()
      .then((newSpace) => {
        return resolve(newSpace);
      })
    });
  },

  checkDuplicateSpace: (body) => {
    return new Promise((resolve, reject) => {
      company.getCompanySpaceInfoByCompanyId(body.company_id)
      .then((result) => {
        const existingSpace = result.related('space').toJSON();
        const flag = existingSpace.some((space) => {
          return space.name === body.name;
        });
        return resolve(flag);
      })
      .catch((err) => {
        return reject(err);
      });
    });
  },
};

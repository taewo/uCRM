const Space = require('../db/space');
const Room = require('../db/room');
const Member = require('../db/member');
const Activity = require('../db/activity');

const Company = require('../functions/company');

module.exports = {
  getMemberList: (spaceid) => {
    return new Promise((resolve, reject) => {
      Space.where({ id: spaceid })
      .fetch({ withRelated: ['member'] })
      .then((result) => {
        if (!result) {
          return resolve([]);
        }
        return resolve(result.related('member').toJSON());
      })
      .catch((err) => {
        return console.log(err);
      });
    });
  },

  getReservedList: (spaceid) => {
    return new Promise((resolve, reject) => {
      Room.where({ space_id: spaceid })
      .fetch({ withRelated: ['reservation'] })
      .then((result) => {
        if (!result) {
          return resolve([]);
        }
        return resolve(result.related('reservation').toJSON());
      })
      .catch(function(err) {
        return console.log(err);
      });
    });
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
        return resolve(result.attributes);
      });
    });
  },

  getSpaceDetailByID: (spaceid) => {
    return new Promise((resolve, reject) => {
      Space.where({ id: spaceid })
      .fetch()
      .then((result) => {
        if (!result) {
          return reject('corresponding space does not exist');
        }
        return resolve(result.attributes);
      });
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
        return resolve(result.attributes);
      });
    });
  },

  getAllSpaces: (companyid) => {
    return new Promise((resolve, reject) => {
      Space
      .where({ company_id: companyid })
      .fetchAll()
      .then((result) => {
        return resolve(result);
      });
    });
  },

  addNewSpace: (body, user) => {
    return new Promise((resolve, reject) => {
      return new Space({
        company_id: user.company_id,
        name: body.name,
        address: body.address,
        max_desks: body.max_desks,
      })
      .save()
      .then((result) => {
        return resolve(result);
      })
    });
  },

  checkDuplicateSpace: (body, companyid) => {
    return new Promise((resolve, reject) => {
      Company.checkCompanySpace(companyid)
      .then((result) => {
        const existingSpace = result.related('space').toJSON();
        const flag = existingSpace.some((space) => {
          console.log('space', space)
          console.log('body', body)
          return space.name === body.name;
        });
        return resolve(flag);
      });
    });
  },
};

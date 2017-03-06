const Space = require('../db/space');
const Room = require('../db/room');
const Member = require('../db/member');
const Activity = require('../db/activity');

module.exports = {
  get: (req) => {
    const currentUser = req.session.passport.user;

    const type = currentUser.type;

    const spaceid = currentUser.space_id;
    console.log('check', req.session.passport)
    return new Promise((resolve, reject) => {
      const memberList = new Promise((resolve, reject) => {
        Space.where({id: spaceid})
        .fetch({withRelated: ['member']})
        .then(function(result) {
          return resolve(result.related('member').toJSON());
        })
        .catch(function(err) {
          return console.log(err);
        });
      });

      const reservedList = new Promise((resolve, reject) => {
        Room.where({space_id: spaceid})
        .fetch({withRelated: ['reservation']})
        .then((result) => {
          return resolve(result.related('reservation').toJSON());
        })
        .catch(function(err) {
          return console.log(err);
        });
      });

      const unpaidSum = new Promise((resolve, reject) => {
        Member.where({space_id: spaceid})
        .fetch({withRelated: ['payment']})
        .then((result) => {
          return resolve(result.related('payment').toJSON());
        })
      });

      const latestActivity = new Promise((resolve, reject) => {
        Activity.where({space_id: spaceid})
        .query((query) => {
          query.whereBetween('date', ['2017-02-01', '2017-03-02'])
        })
        .fetch()
        .then((result) => {
          return resolve(result.attributes);
        });
      });

      Promise.all([memberList, reservedList, unpaidSum, latestActivity])
      .then((result) => {
        const container = {};
        console.log('result!!', result[0])
        container['memberList'] = result[0];
        container['reservedList'] = result[1];
        container['unpaidSum'] = result[2];
        container['latestActivity'] = result[3];
        return resolve(container);
      })
      .then((container) => {
        console.log(container);
      })
    })

    .catch((err) => {
        return Promise.reject(err);
    })
  },
}

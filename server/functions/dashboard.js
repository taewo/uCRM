const Space = require('../functions/space');

const getDashboard = (req) => {
  return new Promise((resolve, reject) => {
    const memberList = Space.getMemberList(req.query.space_id);
    const reservedList = Space.getReservedList(req.query.space_id);
    const unpaidSum = Space.getUnpaidSum(req.query.space_id);
    const latestActivity = Space.getLatestActivity(req.query.space_id);

    Promise.all([memberList, reservedList, unpaidSum, latestActivity])
    .then((result) => {
      const container = {};
      container.memberList = result[0];
      container.reservedList = result[1];
      container.unpaidSum = result[2];
      container.latestActivity = result[3];
      return resolve(container);
    })
    .catch(err => (reject(err)));
  });
};

module.exports = getDashboard;

const Space = require('../functions/space');

const getDashboard = (spaceid) => {
  return new Promise((resolve, reject) => {

    const memberList = Space.getMemberList(spaceid);
    const reservedList = Space.getReservedList(spaceid);
    const unpaidSum = Space.getUnpaidSum(spaceid);
    const latestActivity = Space.getLatestActivity(spaceid);

    Promise.all([memberList, reservedList, unpaidSum, latestActivity])
    .then((result) => {
      const container = {};
      container.memberList = result[0];
      container.reservedList = result[1];
      container.unpaidSum = result[2];
      container.latestActivity = result[3];
      return resolve(container);
    });
  })
  .catch((err) => {
    return Promise.reject(err);
  });
};

module.exports = getDashboard;

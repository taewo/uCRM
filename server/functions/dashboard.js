const Space = require('../functions/space');
const Lead = require('../functions/lead');
const Member = require('../functions/member');
const Payment = require('../functions/payment');


const getDashboard = (req) => {
  const activeMember = Member.getCountActiveMemberBySpaceId(req.query.space_id);
  const expiringPayment = Payment.getCountExpiring(req.query.space_id);
  const leadCount = Lead.getCountRecentLead(req.query.space_id);
  const latestActivity = Space.getLatestActivity(req.query.space_id);

  return Promise.all([activeMember, expiringPayment, leadCount, latestActivity])
  .then((result) => {
    console.log('gd');
    const container = {};
    container.activeMember = result[0]
    container.expiringPayment = result[1];
    container.leadCount = result[2];
    container.latestActivity = result[3];
    return container;
  })
  .catch(err => (Promise.reject(err)));
};

module.exports = getDashboard;

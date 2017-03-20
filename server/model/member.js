const Member = require('../functions/member');
const Lead = require('../functions/lead');
const Auth = require('../functions/auth');

module.exports = {
  get(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        const spaceid = parseInt(req.query.space_id);
        return Member.getAllMembers(spaceid)
        .then((result) => {
          if (result) {
            return result;
          }
          return [];
        });
      }
      return Promise.reject('Error: unauthorized access request to the space');
    })
    .catch(err => (Promise.reject(err)));
  },

  post(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        const ifMemberExistByEmail = Member.checkExistingMemberByEmail(req.body.email);
        const ifMemberExistByMobile = Member.checkExistingMemberByMobile(req.body.mobile);
        return Promise.all([ifMemberExistByEmail, ifMemberExistByMobile])
        .then((check) => {
          if (check[0] && check[1]) {
            return Member.addNewMember(req.body, req.body.space_id)
            .then((newMember) => {
              return newMember;
            });
          }
          return Promise.reject('Error: member already exist 3');
        })
        .then((newMember) => {
          return Lead.toggleConvertedLead(req.body.space_id, req.body.email)
          .then(() => (newMember));
        });
      }
    })
    .catch(err => (Promise.reject(err)));
  },
};

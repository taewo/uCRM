const Member = require('../functions/member');
const Lead = require('../functions/lead');
const Space = require('../functions/space');
const Auth = require('../functions/auth');
const Token = require('../middleware/token');

module.exports = {
  get: (req) => {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        const spaceid = parseInt(req.query.space_id);
        return Member.getAllMembers(spaceid)
        .then((result) => {
          if (result === undefined) {
            throw new Error('unauthorized access');
          }
          return result;
        });
      } else {
        throw new Error('Error: you have no access to this space');
      }
    });
  },

  post: (req) => {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      if (access) {
        console.log(req.body)
        const ifMemberExistByEmail = Member.checkExistingMemberByEmail(req.body.email);
        const ifMemberExistByMobile = Member.checkExistingMemberByMobile(req.body.mobile);
        return Promise.all([ifMemberExistByEmail, ifMemberExistByMobile])
        .then((check) => {
          console.log('check', check);
          if (check[0] && check[1]) {
            return Member.addNewMember(req.body, req.body.space_id)
            .then((newMember) => {
              return newMember;
            });
          }
          else {
            throw new Error('member already exist 3');
          }
        })
        .then((newMember) => {
          return Lead.toggleConvertedLead(req.body.space_id, req.body.email)
          .then((flag) => {
            console.log('flag', flag)
            return newMember;
          });
        });
      }
    });
  },
};

const Member = require('../functions/member');
const Lead = require('../functions/lead');
const Space = require('../functions/space');
const Token = require('../middleware/token');

module.exports = {
  get: (req) => {
    return new Promise((resolve, reject) => {
      Token.getUserByToken(req.headers.token)
      .then(user => (resolve(user)))
      .catch(err => (reject(err)));
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        console.log('user', user)
        Space.checkIfUserHasSpace(user, req.query.space_id)
        .then(flag => (resolve()))
        .catch(err => (reject(err)));
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        const spaceid = parseInt(req.query.space_id);
        Member.getAllMembers(spaceid)
        .then((result) => {
          return resolve(result.toJSON());
        })
        .catch(err => (reject(err)));
      });
    });
  },

  post: (req) => {
    return new Promise((resolve, reject) => {
      console.log(req.body)
      const ifMemberExistByEmail = Member.checkExistingMemberByEmail(req.body.email);
      const ifMemberExistByMobile = Member.checkExistingMemberByMobile(req.body.mobile);
      Promise.all([ifMemberExistByEmail, ifMemberExistByMobile])
      .then((check) => {
        console.log('check', check);
        if (check[0] && check[1]) {
          Member.addNewMember(req.body, req.body.space_id)
          .then((newMember) => {
            return resolve(newMember);
          });
        }
        else {
          return reject('member already exist 3');
        }
      })
      .catch(err => (reject(err)));
    })
    .then((newMember) => {
      return new Promise((resolve, reject) => {
        Lead.toggleConvertedLead(req.body.space_id, req.body.email)
        .then(() => {
          return resolve(newMember);
        })
        .catch(err => (reject(err)));
      });
    })
  },
};

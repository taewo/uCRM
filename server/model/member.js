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
        Space.checkIfUserHasSpace(user, req.query.space_id)
        .then(access => (resolve(access)))
        .catch(err => (reject(err)));
      });
    })
    .then((access) => {
      return new Promise((resolve, reject) => {
        if (access) {
          const spaceid = parseInt(req.query.space_id);

          Member.getAllMembers(spaceid)
          .then((result) => {
            return resolve(result[0]);
          })
          .catch(err => (reject(err)));
        } else {
          return reject('Error: you have no access to this space');
        }
      });
    });
  },

  post: (req) => {
    return new Promise((resolve, reject) => {
      Token.getUserByToken(req.headers.token)
      .then(user => (resolve(user)))
      .catch(err => (reject(err)));
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        Space.checkIfUserHasSpace(user, req.body.space_id)
        .then(access => (resolve(access)))
        .catch(err => (reject(err)));
      });
    })
    .then((access) => {
      return new Promise((resolve, reject) => {
        if (access) {
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
        } else {
          return reject('Error: you have no access to this space');
        }
      })
      .then((newMember) => {
        return new Promise((resolve, reject) => {
          Lead.toggleConvertedLead(req.body.space_id, req.body.email)
          .then((flag) => {
            console.log('flag', flag)
            return resolve(newMember);
          })
          .catch(err => (reject(err)));
        });
      })
    })
  },
};

const Member = require('../db/member');

module.exports = {
  getAllMembers: (spaceid) => {
    return new Promise((resolve, reject) => {
      Member
      .where({ space_id: spaceid })
      .fetchAll()
      .then(result => (resolve(result.toJSON())))
      .catch(err => (reject('the space does not exist')));
    });
  },

  checkExistingMemberByEmail: (email) => {
    return new Promise((resolve, reject) => {
      Member
      .where({ email })
      .fetch()
      .then((result) => {
        if (result) {
          return reject('member already exist');
        } else {
          return resolve(true);
        }
      })
      .catch(err => (reject(err)));
    });
  },

  checkExistingMemberByMobile: (mobile) => {
    return new Promise((resolve, reject) => {
      Member
      .where({ mobile })
      .fetch()
      .then((result) => {
        if (result) {
          return reject('member already exist');
        } else {
          return resolve(true);
        }
      })
      .catch(err => (reject(err)));
    });
  },

  addNewMember: (body, spaceid) => {
    return new Promise((resolve, reject) => {
      body.space_id = spaceid;
      body.isactive = 1;
      new Member(body)
      .save()
      .then(result => (resolve(result)))
      .catch(err => (reject(err)));
    });
  },
};

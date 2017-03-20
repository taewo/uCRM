const Member = require('../db/member');

module.exports = {
  getAllMembers(spaceid) {
    return Member
    .where({ space_id: spaceid })
    .fetchAll()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject('Error: requested space does not exist')));
  },

  checkExistingMemberByEmail(email) {
    return Member
    .where({ email })
    .fetch()
    .then((result) => {
      if (result) {
        return Promise.reject('Error: duplicate email - member already exist');
      }
      return true;
    })
    .catch(err => (Promise.reject(err)));
  },

  checkExistingMemberByMobile(mobile) {
    return Member
    .where({ mobile })
    .fetch()
    .then((result) => {
      if (result) {
        return Promise.reject('Error: duplicate mobile - member already exist');
      }
      return true;
    })
    .catch(err => (Promise.reject(err)));
  },

  addNewMember(body, spaceid) {
    body.space_id = spaceid;
    body.isactive = 1;
    return new Member(body)
    .save()
    .then(result => (result))
    .catch(err => (Promise.reject(err)));
  },
};

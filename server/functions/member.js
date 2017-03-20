const Member = require('../db/member');

module.exports = {
  getAllMembers: spaceid => (
    Member
    .where({ space_id: spaceid })
    .fetchAll()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject('Error: requested space does not exist')))
  ),

  checkExistingMemberByEmail: email => (
    Member
    .where({ email })
    .fetch()
    .then((result) => {
      if (result) {
        return Promise.reject('Error: member already exist');
      }
      return true;
    })
    .catch(err => (Promise.reject(err)))
  ),

  checkExistingMemberByMobile: mobile => (
    Member
    .where({ mobile })
    .fetch()
    .then((result) => {
      if (result) {
        return Promise.reject('Error: member already exist');
      }
      return true;
    })
    .catch(err => (Promise.reject(err)))
  ),

  addNewMember: (body, spaceid) => {
    body.space_id = spaceid;
    body.isactive = 1;
    return new Member(body)
    .save()
    .then(result => (result))
    .catch(err => (Promise.reject(err)));
  },
};

const Member = require('../db/member');

module.exports = {
  getAllMembers(spaceid) {
    return Member
    .where({
      space_id: spaceid,
      end_date: null,
    })
    .fetchAll()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject('Error: requested space does not exist')));
  },

  getMember(memberid) {
    return Member
    .where({ id: memberid })
    .fetch()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject('Error: requested space does not exist')));
  },

  isMemberActive(memberid) {
    return Member
    .where({ id: memberid })
    .fetch()
    .then((member) => {
      if (member) {
        if (member.end_date) {
          return false;
        }
        return true;
      }
      return false;
    });
  },

  makeIdToMemberTable(spaceid) {
    return module.exports.getAllMembers(spaceid)
    .then((members) => {
      if (members.length) {
        const table = {};
        members.forEach((member) => {
          table[member.id] = [member.name, member.email];
        });
        return table;
      }
      return Promise.reject('Error: space has no members');
    })
    .catch(err => (Promise.reject(err)));
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
        // TODO just return false
      }
      return true;
    });
  },

  addNewMember(body, spaceid) {
    body.space_id = spaceid;
    body.isactive = 1;
    return new Member(body)
    .save();
  },

  deleteMember(memberid) {
    console.log('MEMBERID', memberid)
    const end_date = new Date();
    return Member
    .where({ id: memberid })
    .save({ end_date }, { patch: true })
    // .then((member) => {
    //   console.log('member', member);
    //   return member;
    // })
  },
};

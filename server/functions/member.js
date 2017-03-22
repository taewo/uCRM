const Member = require('../db/member');

module.exports = {
  getAllActiveMembers(spaceid) {
    return Member
    .where({
      space_id: spaceid,
      isactive: 1,
    })
    .fetchAll()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject('Error: requested space does not exist')));
  },

  getAllMembers(spaceid) {
    return Member
    .where({
      space_id: spaceid,
    })
    .fetchAll()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject('Error: requested space does not exist')));
  },

  getCountActiveMemberBySpaceId(spaceid) {
    return Member
    // .where({
    //   space_id: spaceid,
    //   isactive: 1,
    // })
    .query({where: {space_id: spaceid, isactive: 1}} )
    .count()
    // .then((result) => {
    //   return result;
    // })
    .then(result => (result))
  },

  getMemberByMemberId(memberid) {
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
        if (member.toJSON().isactive) {
          return true;
        }
        return false;
      }
      return false;
    });
  },

  makeIdToMemberTable(spaceid) {
    return module.exports.getAllActiveMembers(spaceid)
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
    .where({ email, isactive: 1 })
    .fetch()
    .then((result) => {
      if (result) {
        return true;
      }
      return false;
    })
    .catch(err => (Promise.reject(err)));
  },

  checkExistingMemberByMobile(mobile) {
    return Member
    .where({ mobile, isactive: 1 })
    .fetch()
    .then((result) => {
      if (result) {
        return true;
      }
      return false;
    });
  },

  addNewMember(body, spaceid) {
    console.log('BODY', body)
    const email = body.email;
    return module.exports.checkExistingMemberByEmail(email)
    .then((hasMember) => {
      console.log('HASMEMBER', hasMember)
      if (hasMember) {
        return Member
        .where({ email })
        .fetch()
        .then((member) => {
          console.log('MEMBER', member)
          return module.exports.toggleMemberStatus(member.id)
          .then(() => {
            return Member
            .where({ email })
            .save(body, { patch: true });
          })
        });
      }
      body.space_id = spaceid;
      body.isactive = 1;
      return new Member(body)
      .save();
    })
  },

  toggleMemberStatus(memberid) {
    return Member
    .where({ id: memberid })
    .fetch((member) => {
      if (member) {
        const flag = !member.isactive;
        let endDate = null;
        if (!member.end_date) {
          endDate = new Date();
        }
        return Member
        .where({ id: memberid })
        .save({
          isactive: flag,
          end_date: endDate
        });
      }
      return Promise.reject('Error: no member exist to toggle active/inactive');
    });
  },

  // deleteMember(memberid) {
  //   console.log('MEMBERID', memberid)
  //   const end_date = new Date();
  //   return Member
  //   .where({ id: memberid })
  //   .save({ end_date, isactive: 0 }, { patch: true });
  // },
};

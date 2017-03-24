const Member = require('../db/member');

module.exports = {
  getAllActiveMembers(spaceid) {
    return Member
    .query('orderBy', 'id', 'DESC')
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
    .query('orderBy', 'id', 'DESC')
    .where({
      space_id: spaceid,
    })
    .fetchAll()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject('Error: requested space does not exist')));
  },

  getCountActiveMemberBySpaceId(spaceid) {
    return Member
    .query({ where: { space_id: spaceid, isactive: 1 } })
    .count()
    .then(result => (result));
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

  checkAllMemberByEmail(email) {
    return Member
    .where({ email })
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
    const email = body.email;
    return module.exports.checkAllMemberByEmail(email)
    .then((member) => {
      if (member) {
        if (member.isactive) {
          return Promise.reject('Error: the member already exist.');
        } else {
          body.end_date = null;
          body.end_reason = null;
          body.isactive = 1;
          return Member
          .where({ email })
          .save(body, { patch: true })
          .then((member) => {
            return member.toJSON();
          })
        }
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
        },
      { patch: true });
      }
      return Promise.reject('Error: no member exist to toggle active/inactive');
    });
  },

  deleteMember(body) {
    const end_date = new Date();
    const end_reason = body.end_reason;
    return Member
    .where({ id: body.member_id })
    .save({
      end_date,
      isactive: 0,
      end_reason
    }, { patch: true });
  },
};

const Member = require('../functions/member');
const Lead = require('../functions/lead');
const Auth = require('../functions/auth');
const Activity = require('../functions/activity');

module.exports = {
  get(req) {
    // return Auth.checkIfUserHasSpace(req)
    // .then((access) => {
    //   if (access) {
    //     const spaceid = parseInt(req.query.space_id);
    //     return Member.getAllActiveMembers(spaceid)
    //     .then((result) => {
    //       if (result) {
    //         return result;
    //       }
    //       return [];
    //     });
    //   }
    //   return Promise.reject('Error: unauthorized access request to the space');
    // })
    // .catch(err => (Promise.reject(err)));

    return Member.getCountActiveMemberBySpaceId(req.query.space_id)
    .then((result) => {
      console.log('count', result)
    })
  },

  post(req) {
    return Auth.checkIfUserHasSpace(req)
    .then((access) => {
      console.log('ACCESS', access)
      if (access) {
        console.log('CONDITION PASSED')
        const ifMemberExistByEmail = Member.checkExistingMemberByEmail(req.body.email);
        const ifMemberExistByMobile = Member.checkExistingMemberByMobile(req.body.mobile);
        return Promise.all([ifMemberExistByEmail, ifMemberExistByMobile])
        .then((check) => {
          console.log('CHECK', check)
          if (!check[0] && !check[1]) {
            return Member.addNewMember(req.body, req.body.space_id)
            .then((newMember) => {
              console.log('NEWMEMBER', newMember.toJSON())
              return newMember.toJSON();
            });
          } else if (check[0] && !check[1]) {
            return Promise.reject('Error: member already exist(duplicate email)');
          } else if (!check[1] && !check[1]) {
            return Promise.reject('Error: member already exist(duplicate mobile)');
          }
          // return Promise.reject('Error: member already exist ');
        })
        .then((newMember) => {
          const activityDetail = {
            space_id: req.body.space_id,
            type: 'member_creation',
            date: new Date(),
            user: req.body.name,
          };
          const convertLead = Lead.toggleConvertedLead(req.body.space_id, req.body.email);
          const addActivity = Activity.addNewActivity(activityDetail);
          return Promise.all([convertLead, addActivity])
          .then(() => (newMember));
        });
      }
    })
    .catch(err => (Promise.reject(err)));
  },

  delete(req) {
    const memberid = req.body.member_id;
    return Auth.checkIfUserHasMember(req)
    .then((hasMember) => {
      if (hasMember) {
        return Member.isMemberActive(memberid)
        .then((active) => {
          console.log('ACTIVE', active)
          if (active) {
            console.log('CONDITION PASSED')
            return Member.toggleMemberStatus(memberid)
            .then(() => {
              return Member.getMemberByMemberId(memberid);
            })
          }
          return Promise.reject('Error: member is already inactive');
        })
      }
      return Promise.reject('Error: not authorized to delete this member');
    });
  },
};

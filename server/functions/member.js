const Member = require('../db/member');

module.exports = {
  getAllMembers: (spaceid) => {
    return new Promise((resolve, reject) => {
      console.log('spaceid', spaceid);
      Member.where({ space_id: spaceid })
      .fetchAll()
      .then((result) => {
        return resolve(result.toJSON());
      })
      .catch((err) => {
        return reject('the space does not exist');
      })
    });
  },
  checkExistingMemberByEmail: (email) => {
    return new Promise((resolve, reject) => {
      console.log('email', email)
      Member.where({ email })
      .fetch()
      .then((result) => {
        if (result) {
          return reject('member already exist');
        } else {
          return resolve(true);
        }
      })
    });
  },
  checkExistingMemberByMobile: (mobile) => {
    return new Promise((resolve, reject) => {
      Member.where({ mobile })
      .fetch()
      .then((result) => {
        if (result) {
          return reject('member already exist');
        } else {
          return resolve(true);
        }
      })
    });
  },
  addNewMember: (body, spaceid) => {
    return new Promise((resolve, reject) => {
      console.log('body', body, 'spaceid', spaceid)
      body.space_id = spaceid;
      body.isactive = 1;
      new Member(body)
      .save()
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        return reject(err);
      })
    });
  },
};

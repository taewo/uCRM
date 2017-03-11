const Staff = require('../db/staff');
const bcrypt = require('bcrypt');
const moment = require('moment');

const saltRounds = 10;

module.exports = {
  checkSession: (id) => {
    return new Promise((resolve, reject) => {
      Staff
      .where({ id })
      .fetch()
      .then((result) => {
        return resolve(result);
      });
    });
  },
  checkExistence: (userid) => {
    return new Promise((resolve, reject) => {
      Staff
      .where({ userid })
      .fetch()
      .then((result) => {
        if (result) {
          return resolve(result.attributes);
        } else {
          return resolve(false);
        }
      });
    });
  },
  addNewStaff: (body) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(body.password, saltRounds, (err, hash) => {
        const accountDetail = {};
        accountDetail.userid = body.userid;
        accountDetail.password = hash;
        accountDetail.name = body.name;
        accountDetail.mobile = body.mobile;
        accountDetail.email = body.email;
        accountDetail.space_id = body.spaceid;
        accountDetail.is_approved = false;
        accountDetail.joined_date = moment().format('YYYY-MM-DD');

        new Staff(accountDetail)
        .save()
        .then((result) => {
          return resolve(result);
        });
      });
    });
  },
  approveNewStaff: (body) => {
    return new Promise((resolve, reject) => {
      new Staff({
        id: body.id,
        username: body.username,
      })
      .save({ is_approved: true }, { patch: true })
      .then((result) => {
        delete result.attributes.password;
        return resolve(result.attributes);
      });
    });
  },
  getSpaceId: (userid) => {
    return new Promise((resolve, reject) => {
      Staff.where({ userid })
      .then((result) => {
        return resolve(result.space_id);
      })
      .catch((err) => {
        return reject('unahthorized, user has no space');
      })
    });
  },
};

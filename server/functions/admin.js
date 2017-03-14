const Admin = require('../db/admin');
const Space = require('../functions/space');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  checkSession: (id) => {
    return new Promise((resolve, reject) => {
      Admin
      .where({ id })
      .fetch()
      .then((result) => {
        return resolve(result);
      })
    })
  },
  checkExistence: (userid) => {
    return new Promise((resolve, reject) => {
      Admin
      .where({ userid })
      .fetch()
      .then((result) => {
        if (result) {
          return resolve(result.attributes);
        } else {
          return resolve(false);
        }
      })
      .catch((err) => {
        return reject('admin not found');
      })
    });
  },
  getCompanyId: (userid) => {
    return new Promise((resolve, reject) => {
      Admin
      .where({ userid })
      .then((result) => {
        return resolve(result.company_id);
      })
      .catch((err) => {
        return reject('unahthorized, user has no company');
      })
    });
  },
  addNewAdmin: (body, companyid) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(body.password, saltRounds, (err, hash) => {
        const adminInfo = {};
        adminInfo.company_id = companyid;
        adminInfo.name = body.name;
        adminInfo.userid = body.userid;
        adminInfo.password = hash;
        adminInfo.email = body.email;
        adminInfo.mobile = body.mobile;

        console.log('admin info', adminInfo)
        new Admin(adminInfo)
        .save()
        .then((admin) => {
          console.log('new admin added', admin)
          delete admin.password;
          return resolve(admin);
        })
        .catch((err) => {
          return reject('failed to save new admin in db');
        })
      });
    })
  },

};

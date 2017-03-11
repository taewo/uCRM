const Admin = require('../db/admin');
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
      Admin.where({ userid })
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
        const accountDetail = {};
        accountDetail.userid = body.userid;
        accountDetail.password = hash;
        accountDetail.name = body.name;
        accountDetail.mobile = body.mobile;
        accountDetail.email = body.email;
        accountDetail.company_id = companyid;

        new Admin(accountDetail).save()
        .then((result) => {
          return resolve(result);
        })
      });
    });
  },

};

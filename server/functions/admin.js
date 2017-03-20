const Admin = require('../db/admin');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  checkExistence(userid) {
    return Admin
    .where({ userid })
    .fetch()
    .then((result) => {
      if (result) {
        return result.toJSON();
      }
      return false;
    })
    .catch(err => (Promise.reject('Error: admin not found')));
  },

  addNewAdmin(body, companyid) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(body.password, saltRounds, (err, hash) => {
        const adminInfo = {};
        adminInfo.company_id = companyid;
        adminInfo.name = body.name;
        adminInfo.userid = body.userid;
        adminInfo.password = hash;
        adminInfo.email = body.email;
        adminInfo.mobile = body.mobile;

        new Admin(adminInfo)
        .save()
        .then((admin) => {
          adminInfo.space_list = [];
          delete admin.password;
          return resolve(admin);
        })
        .catch(err => (reject('Error: failed to save new admin in db')));
      });
    });
  },
};

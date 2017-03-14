const Company = require('../functions/company');
const Admin = require('../functions/admin');
const Staff = require('../functions/staff');

module.exports = {
  post: (body) => {
    return new Promise((resolve, reject) => {
      Company.checkExistence(body.companyname)
      .then((result) => {
        if (result) {
          return reject('company already exist');
        }
        return resolve();
      })
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        console.log('body.userid', body.userid)
        Admin.checkExistence(body.userid)
        .then((result) => {
          if (result) {
            return reject('admin already exist');
          }
          return resolve();
        });
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        Staff.checkExistence(body.userid)
        .then((result) => {
          if (result) {
            return reject('id already taken by staff');
          }
          return resolve();
        });
      });
    })
    .then(() => {
      console.log('body', body)
      return new Promise((resolve, reject) => {
        Company.addNewCompany(body.companyname)
        .then((newCompany) => {
          console.log('successfully added a new company', newCompany.attributes)
          return resolve(newCompany.attributes.id);
        })
        .catch((err) => {
          return reject(err);
        })
      })
    })
    .then((companyid) => {
      console.log('companyid', companyid)
      return new Promise((resolve, reject) => {
        Admin.addNewAdmin(body, companyid)
        .then((newAdmin) => {
          delete newAdmin.attributes.password;
          newAdmin.attributes.type = 'comp';
          console.log('newAdmin', newAdmin.attributes)
          return resolve(newAdmin.attributes);
        })
        .catch((err) => {
          return reject(err);
        });
      });
    });
  },
};

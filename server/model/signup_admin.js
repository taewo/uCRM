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
      .catch(err => (reject(err)));
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        Admin.checkExistence(body.userid)
        .then((result) => {
          if (result) {
            return reject('admin already exist');
          }
          return resolve();
        })
        .catch(err => (reject(err)));
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
        })
        .catch(err => (reject(err)));
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        Company.addNewCompany(body.companyname)
        .then((newCompany) => {
          return resolve(newCompany.attributes.id);
        })
        .catch(err => (reject(err)));
      });
    })
    .then((companyid) => {
      console.log('companyid', companyid)
      return new Promise((resolve, reject) => {
        Admin.addNewAdmin(body, companyid)
        .then((newAdmin) => {
          delete newAdmin.attributes.password;
          newAdmin.attributes.type = 'comp';
          return resolve(newAdmin.attributes);
        })
        .catch(err => (reject(err)));
      });
    });
  },
};

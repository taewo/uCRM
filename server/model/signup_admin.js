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
        return resolve(body.companyname);
      })
      .then((companyname) => {
        console.log('company name? ', companyname)
        return new Promise((resolve, reject) => {
          console.log('body.userid', body.userid)
          Admin.checkExistence(body.userid)
          .then((result) => {
            console.log('checkE', result)
            if (result) {
              return reject('id already taken');
            }
            return resolve(companyname);
          });
        });
      })
      .then((companyname) => {
        return new Promise((resolve, reject) => {
          Staff.checkExistence(body.userid)
          .then((result) => {
            if (result) {
              return reject('id already taken');
            }
            return resolve(companyname);
          });
        });
      })
      .then((companyname) => {
        return new Promise((resolve, reject) => {
          Company.addNewCompany(body.companyName)
          .then((newCompany) => {
            console.log('successfully added a new company', newCompany)
            return resolve(newCompany.id);
          })
          .catch((err) => {
            return reject(err);
          })
        })
      })
      .then((companyid) => {
        return new Promise((resolve, reject) => {
          Admin.addNewAdmin(body, companyid)
          .then((newAdmin) => {
            console.log('promiseall newAdmin', newAdmin)
            delete newAdmin.attributes.password;
            newAdmin.attributes.type = 'comp';
            return resolve(newAdmin.attributes);
          })
          .catch((err) => {
            return reject(err);
          });
        });
      })
      .catch((err) => {
        console.log(err.stack);
        return reject(err);
      });
    });
  },
};

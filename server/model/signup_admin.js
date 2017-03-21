const Company = require('../functions/company');
const Admin = require('../functions/admin');
const Staff = require('../functions/staff');

module.exports = {
  post(body) {
    return Company.checkExistence(body.companyname)
    .then((result) => {
      if (result) {
        return Promise.reject('Error: company already exist');
      }
      return Admin.checkExistence(body.userid)
      .then((admin) => {
        if (admin) {
          return Promise.reject('Error: admin already exist');
        }
        return Staff.checkExistence(body.userid)
        .then((staff) => {
          if (staff) {
            return Promise.reject('Error: id already taken by staff');
          }
          return Company
          .addNewCompany(body.companyname)
          .then((newCompany) => {
            const companyId = newCompany.toJSON().id;
            return Admin.addNewAdmin(body, companyId)
            .then((newAdmin) => {
              console.log('NEWADMIN', newAdmin)
              delete newAdmin.attributes.password;
              newAdmin.attributes.type = 'comp';
              return newAdmin.attributes;
            });
          });
        });
      });
    })
    .catch(err => (Promise.reject(err)));
  },
};

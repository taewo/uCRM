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
        // else {
        //   return Company.addNewCompany(body.companyname)
        //   .then((model) => {
        //     return model.attributes.id;
        //   });
        // }
      })
      .then((companyid) => {
        return new Promise((resolve, reject) => {
          console.log('body.userid', body.userid)
          Admin.checkExistence(body.userid)
          .then((result) => {
            if (result) {
              return reject('id already taken');
            }
            return resolve(companyid);
          });
        });
      })
      .then((companyid) => {
        return new Promise((resolve, reject) => {
          Staff.checkExistence(body.userid)
          .then((result) => {
            if (result) {
              return reject('id already taken');
            }
            return resolve(companyid);
          });
        });
      })
      .then((companyid) => {
        const newAdmin = Admin.addNewAdmin(body, companyid);
        const newCompany = Company.addNewCompany(body.companyName);

        Promise.all([newAdmin, newCompany])
        .then((result) => {
          console.log('promiseall result', result)
          delete result[0].attributes.password;
          result[0].attributes.type = 'comp';
          return resolve(result[0].attributes);
        });
      })
      .catch((err) => {
        console.log(err.stack);
        return reject(err);
      });
    });
  },
};

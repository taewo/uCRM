const Company = require('../db/company');
const Admin = require('../db/admin');

module.exports = {
  checkExistence: (name) => {
    return new Promise((resolve, reject) => {
      Company
      .where({ name })
      .fetch()
      .then((result) => {
        return resolve(result);
      });
    });
  },

  checkCompanySpaceByID: (companyid) => {
    return new Promise((resolve, reject) => {
      Company
      .where({ id: companyid })
      .fetch({ withRelated: ['space'] })
      .then((result) => {
        return resolve(result);
      });
    });
  },

  getCompanyIdByUserId: (userid) => {
    return new Promise((resolve, reject) => {
      Admin
      .where({ userid })
      .fetch()
      .then((result) => {
        const resultJSON = result.toJSON();
        return resolve(resultJSON.company_id);
      })
      .catch((err) => {
        return reject('unahthorized, user has no company');
      })
    });
  },

  addNewCompany: (name) => {
    return new Promise((resolve, reject) => {
      return new Company({ name })
      .save()
      .then((result) => {
        return resolve(result);
      });
    });
  },
};

const Company = require('../db/company');

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

const Company = require('../db/company');

module.exports = {
  checkExistence: (name) => {
    return new Promise((resolve, reject) => {
      Company
      .where({ name: name })
      .fetch()
      .then((result) => {
        return resolve(result);
      })
    })
  },

  checkCompanySpace: (companyid) => {
    return new Promise((resolve, reject) => {
      Company
      .where({ id: companyid })
      .fetch({ withRelated: ['space'] })
      .then((result) => {
        return resolve(result);
      })
    })
  },

  addNewCompany: (name) => {
    return new Promise((resolve, reject) => {
      return new Company({ name: name })
      .save()
      .then((result) => {
        return resolve(result);
      });
    });
  },
};

const Company = require('../db/company');
const Admin = require('../db/admin');

module.exports = {
  checkExistence: (name) => {
    return new Promise((resolve, reject) => {
      Company
      .where({ name })
      .fetch()
      .then(result => (resolve(result)))
      .catch(err => (reject(err)));
    });
  },

  getCompanySpaceInfoByCompanyId: (companyid) => {
    return new Promise((resolve, reject) => {
      Company
      .where({ id: companyid })
      .fetch({ withRelated: ['space'] })
      .then(result => (resolve(result)))
      .catch(err => (reject(err)));
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
      .catch(err => (reject('unahthorized, user has no company')));
    });
  },

  addNewCompany: (name) => {
    return new Promise((resolve, reject) => {
      return new Company({ name })
      .save()
      .then(result => (resolve(result)))
      .catch(err => (reject(err)));
    });
  },
};

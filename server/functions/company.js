const Company = require('../db/company');
const Admin = require('../db/admin');
const Token = require('../db/token');

module.exports = {
  checkExistence(name) {
    return Company
    .where({ name })
    .fetch()
    .then(result => (result))
    .catch(err => (Promise.reject(err)));
  },

  getCompanyInfoByToken(token) {
    return Token
    .where({ token })
    .fetch()
    .then((tokenData) => {
      if (tokenData) {
        return module.exports.getCompanyInfoByUserId(tokenData.toJSON().userid)
        .then(company => (company));
      }
    })
    .catch(err => (Promise.reject(err)));
  },

  getCompanyDetailByToken(companyid) {
    return Company
    .where({ id: companyid })
    .fetch({ withRelated: ['space'] })
    .then(result => (result))
    .catch(err => (Promise.reject(err)));
  },

  getCompanyIdByUserId(userid) {
    return Admin
    .where({ userid })
    .fetch()
    .then((result) => {
      return result.toJSON().company_id;
    })
    .catch(err => (Promise.reject('Error: unahthorized company request.')));
  },

  getCompanyInfoByUserId(userid) {
    return Admin
    .where({ userid })
    .fetch({ withRelated: ['company'] })
    .then((company) => {
      if (company) {
        return company.related('company').toJSON();
      }
      return Promise.reject('Error: user has no company');
    })
    .catch(err => (Promise.reject('Error: unahthorized company request.')));
  },

  addNewCompany(name) {
    return new Company({ name })
    .save()
    .then(result => (result))
    .catch(err => (Promise.reject(err)));
  },
};

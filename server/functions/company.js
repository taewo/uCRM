const Company = require('../db/company');
const Admin = require('../db/admin');

module.exports = {
  checkExistence: name => (
    Company
    .where({ name })
    .fetch()
    .then(result => (result))
    .catch(err => (Promise.reject(err)))
  ),

  getCompanySpaceInfoByCompanyId: companyid => (
      Company
    .where({ id: companyid })
    .fetch({ withRelated: ['space'] })
    .then(result => (result))
    .catch(err => (Promise.reject(err)))
  ),

  getCompanyIdByUserId: userid => (
    Admin
    .where({ userid })
    .fetch()
    .then((result) => {
      const resultJSON = result.toJSON();
      return resultJSON.company_id;
    })
    .catch(err => (Promise.reject('Error: unahthorized company request.')))
  ),

  addNewCompany: name => (
    new Company({ name })
    .save()
    .then(result => (result))
    .catch(err => (Promise.reject(err)))
  ),
};

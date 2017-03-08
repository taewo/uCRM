const Company = require('../functions/company');

module.exports = {
  get: (req) => {
    return new Promise((resolve, reject) => {
      Company.checkCompanySpaceByName(req.query.companyname)
      .then((result) => {
        return resolve(result.related('space').toJSON());
      })
      .catch((err) => {
        return reject(err);
      });
    });
  },
};

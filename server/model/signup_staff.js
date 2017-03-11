const Company = require('../functions/company');
const Staff = require('../functions/staff');
const auth = require('../functions/auth');

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
  post: (body) => {
    return new Promise((resolve, reject) => {
      auth.checkId(body.userid)
      .then((result) => {
        if (result) {
          Staff.addNewStaff(body)
          .then((result) => {
            return resolve(result);
          })
        } else {
          return reject('useid already exist');
        }
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      });
    });
  },
};

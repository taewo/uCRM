// const Company = require('../functions/company');
//
// module.exports = {
//   get: (req) => {
//     return new Promise((resolve, reject) => {
//
//     });
//   },
//   post: (req, userid, password) => {
//       const companyid = parseInt(req.query.companyid);
//       const spaceid = parseInt(req.query.spaceid);
//
//       Company.checkCompanySpaceByID(companyid)
//       .then((result) => {
//         if (!result) {
//           return Promise.reject('company does not exist');
//         }
//         if (!result.related('space').toJSON()) {
//           return Promise.reject('space does not exist');
//         } else {
//           const isValidSpace = result.related('space').toJSON().some((space) => {
//             return space.id === spaceid;
//           });
//           if (!isValidSpace) {
//             return Promise.reject('company and space do not match');
//           }
//         }
//       })
//       .then(() => {
//         return new Promise((resolve, reject) => {
//           Admin.checkExistence(userid)
//           .then((result) => {
//             if (result) {
//               return reject('id already taken');
//             } else {
//               return resolve();
//             }
//           });
//         });
//       })
//       .then(() => {
//         return new Promise((resolve, reject) => {
//           Staff.checkExistence(userid)
//           .then((result) => {
//             if (result) {
//               return reject('id already taken');
//             } else {
//               Staff.addNewStaff(req.body, spaceid)
//               .then((model) => {
//                 delete model.attributes.password;
//                 model.attributes.type = 'staff';
//                 return resolve(done(null, model.attributes));
//               });
//             }
//           });
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         return done(err, false);
//       });
//     }
//   }
// };

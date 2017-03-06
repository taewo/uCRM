const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const admin = require('../functions/admin');
const staff = require('../functions/staff');
const company = require('../functions/company');

module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser((user, done) => {
    admin.checkSession(user.id)
    .then((isAdmin) => {
      if (isAdmin) {
        delete isAdmin.attributes.password;
        done(null, isAdmin.attributes);
      } else {
        staff.checkSession(user.id)
        .then((user) => {
          if (user) {
            delete user.attributes.password;
            done(null, user.attributes);
          }
        });
      }
    });
  });

  // for admin signup
  passport.use('admin', new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
   (req, userid, password, done) => {
     company.checkExistence(req.body.companyname)
     .then((result) => {
       if (result) {
         return Promise.reject('company already exist');
       } else {
         return company.addNewCompany(req.body.companyname)
         .then((model) => {
           return model.attributes.id;
         });
       }
     })
     .then((companyid) => {
       admin.checkExistence(userid)
       .then((result) => {
         if (result) {
           return done(null, false);
         } else {
           return admin.addNewAdmin(req.body, companyid)
           .then((model) => {
             delete model.attributes.password;
             model.attributes.type = 'comp';
             done(null, model.attributes);
           });
         }
       });
     })
     .catch((err) => {
       console.log(err.stack);
       return done(null, false);
     });
   }));

  // for staff signup
  passport.use('staff', new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
   (req, userid, password, done) => {
     const companyid = parseInt(req.query.companyid);
     const spaceid = parseInt(req.query.spaceid);

     company.checkCompanySpace(companyid)
     .then((result) => {
       if (!result) {
         return Promise.reject('company does not exist');
       }
       if (!result.related('space').toJSON()) {
         return Promise.reject('space does not exist');
       } else {
         const isValidSpace = result.related('space').toJSON().some((space) => {
           return space.id === spaceid;
         });
         if (!isValidSpace) {
           return Promise.reject('company and space do not match');
         }
       }
     })
     .then(() => {
       admin.checkExistence(userid)
       .then((result) => {
         if (result) {
           return done(null, false);
         } else {
          return;
         }
       });
     })
     .then(() => {
       staff.checkExistence(userid)
       .then((result) => {
         if (result) {
           return done(null, false);
         } else {
           return staff.addNewStaff(req.body, spaceid)
           .then((model) => {
             delete model.attributes.password;
             model.attributes.type = 'staff';
             done(null, model.attributes);
           });
         }
       });
     })
     .catch((err) => {
       console.log(err.stack);
       return done(null, false);
     });
   }));

  // for login
  passport.use('login', new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
   (req, userid, password, done) => {
     admin.checkExistence(userid)
     .then((result) => {
       if (result) {
         const hash = result.attributes.password;
         bcrypt.compare(req.body.password, hash, (err, res) => {
           if (err) {
             console.log(err);
           }
           if (res) {
             delete result.attributes.password;
             result.attributes.type = 'comp';
             result.attributes.spaceList = [];

             space.getAllSpaces(result.attributes.company_id)
             .then((spaceModels) => {
               if (spaceModels) {
                 const spaceList = spaceModels.models.map((space) => {
                   return space.attributes.id;
                 });
                 result.attributes.spaceList = spaceList;
               }
               return done(err, result.attributes);
             });
           } else {
             return Promise.reject('password mismatch!');
           }
         });
       } else {
         staff.checkExistence(req.body.userid)
         .then((result) => {
           if (result) {
             const hash = result.attributes.password;
             bcrypt.compare(req.body.password, hash, (err, res) => {
               if (res) {
                 delete result.attributes.password;
                 result.attributes.type = 'staff';
                 return done(err, result.attributes);
               } else {
                 return Promise.reject('password mismatch!');
               }
             });
           } else {
             return done(null, false);
           }
         });
       }
     })
     .catch((err) => {
       console.log(err.stack);
       return done(null, false);
     });
   })
  );
};

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../db/admin');
const Company = require('../db/company');
const Space = require('../db/space');
const Staff = require('../db/staff');
const bcrypt = require('bcrypt');
const moment = require('moment');

const saltRounds = 10;

module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function(user, done) {
    console.log('id', user.id)
    Admin
    .where({id: user.id})
    .fetch()
    .then((admin) => {
      if (admin) {
        delete admin.attributes.password;
        done(null, admin.attributes);
      }
      else {
        Staff
        .where({id: user.id})
        .fetch()
        .then((user) => {
          if (user) {
            delete user.attributes.password;
            done(null, user.attributes);
          }
        })
      }
    })
  });

  // for admin signup
  passport.use('admin', new LocalStrategy({
       usernameField : 'userid',
       passwordField : 'password',
       passReqToCallback : true // allows us to pass back the entire request to the callback
   },
   function(req, userid, password, done) {
     console.log('req', req.body)

     return Company
     .where({name: req.body.companyname})
     .fetch()
     .then((result) => {
       if (result) {
         return Promise.reject('company already exist');
       }
       else {
         return new Company({name: req.body.companyname}).save()
         .then((model) => {
           console.log(model);
           return model.attributes.id;
         })
       }
     })
     .then((companyid) => {
       Admin
       .where({userid: userid})
       .fetch()
       .then((result) => {
         console.log('result', result)
         if (result) {
           return done(null, false);
         }
         else {
           console.log(req.body.password, saltRounds)
           return bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
             console.log('hash with callback', hash)

             const accountDetail = {};
             accountDetail['userid'] = req.body.userid;
             accountDetail['password'] = hash;
             accountDetail['name'] = req.body.name;
             accountDetail['mobile'] = req.body.mobile;
             accountDetail['email'] = req.body.email;
             accountDetail['company_id'] = companyid;

             console.log('accountDetail', accountDetail);
             new Admin(accountDetail).save()
             .then((model) => {
               delete model.attributes.password;
               model.attributes.type = 'comp';
               done(null, model.attributes);
             })
           })
         }
       })
     })
   }));

  // for staff signup
  passport.use('staff', new LocalStrategy({
       usernameField : 'userid',
       passwordField : 'password',
       passReqToCallback : true // allows us to pass back the entire request to the callback
   },
   function(req, userid, password, done) {
     console.log('req', req.body)
     const companyid = parseInt(req.query.companyid);
     const spaceid = parseInt(req.query.spaceid);

     return Company
     .where({id: companyid})
     .fetch({withRelated: ['space']})
     .then((result) => {
       if (!result) {
         return Promise.reject('company does not exist');
       }
       if (!result.related('space').toJSON()) {
         return Promise.reject('space does not exist');
       }
       else {
         const isValidSpace = result.related('space').toJSON().some((space) => {
           space.id === spaceid;
         });

         if (!isValidSpace) {
           return Promise.reject('company and space do not match');
         }
        return;
       }
     })
     .then(() => {
       Admin
       .where({userid: userid})
       .fetch()
       .then((result) => {
         if (result) {
           return done(null, false);
         }
         else {
          return;
        }
        })
      })
     .then(() => {
       Staff
       .where({userid: userid})
       .fetch()
       .then((result) => {
         console.log('result', result)
         if (result) {
           return done(null, false);
         }
         else {
           console.log(req.body.password, saltRounds)
           return bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
             console.log('hash with callback', hash)
             console.log('spaceid', spaceid)
             const accountDetail = {};
             accountDetail['userid'] = req.body.userid;
             accountDetail['password'] = hash;
             accountDetail['name'] = req.body.name;
             accountDetail['mobile'] = req.body.mobile;
             accountDetail['email'] = req.body.email;
             accountDetail['space_id'] = spaceid;
             accountDetail['joined_date'] = moment().format('YYYY-MM-DD');

             console.log('accountDetail', accountDetail);
             new Staff(accountDetail).save()
             .then((model) => {
               console.log('model', model);
               delete model.attributes.password;
               model.attributes.type = 'staff';
               done(null, model.attributes);
             })
           })
         }
       })
     })
     .catch((err) => {
       return done(null, false);
     })
   }));

  // for login
  passport.use('login', new LocalStrategy({
       usernameField : 'userid',
       passwordField : 'password',
       passReqToCallback : true // allows us to pass back the entire request to the callback
   },
   function(req, userid, password, done) {
     console.log('req', req.body)

     return Admin
     .where({userid: req.body.userid})
     .fetch()
     .then((result) => {
       if (result) {
         const hash = result.attributes.password;
         console.log(req.body.password, hash);
         bcrypt.compare(req.body.password, hash, function(err, res) {
           if (err) {
             console.log(err)
           }
           if (res) {
             console.log('res', res)
             delete result.attributes.password;
             result.attributes.type = 'comp';
             result.attributes.spaceList = [];
             Space
             .where({company_id: result.attributes.company_id})
             .fetchAll()
             .then((spaceModels) => {
               if (spaceModels) {
                 const spaceList = spaceModels.models.map((space) => {
                   return space.attributes.id;
                 })
                 result.attributes.spaceList = spaceList;
               }
               return done(err, result.attributes);
             })
          }
         });
       }
       else {
         Staff
         .where({userid: req.body.userid})
         .fetch()
         .then((result) => {
           console.log('result', result)
           if (result) {
             const hash = result.attributes.password;
             bcrypt.compare(req.body.password, hash, function(err, res) {
               if (res) {
                 delete result.attributes.password;
                 result.attributes.type = 'staff';
                 return done(err, result.attributes);
               }
             });
           }
           else {
             return done(null, false);
           }
         })
       }
     })
    })
  );
}

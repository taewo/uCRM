const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../db/admin');
const Company = require('../db/company');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('admin-signup', new LocalStrategy({
       // by default, local strategy uses username and password, we will override with email
       usernameField : 'userid',
       passwordField : 'password',
       passReqToCallback : true // allows us to pass back the entire request to the callback
   },
   function(req, userid, password, done) {
     console.log('req', req.body)

     return Company.where({name: req.body.companyname})
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
               done(null, req.body.userid);
             })
           })
         }
       })
     })
   }))
}

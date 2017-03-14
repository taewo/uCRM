const Lead = require('../functions/lead');
const Token = require('../middleware/token');

module.exports = {
  get: (req) => {
    return new Promise((resolve, reject) => {
      Token.getUserByToken(req.headers.token)
      .then((user) => {
        return resolve(user);
      })
      .catch((err) => {
        return reject(err);
      })
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        if (user.type === 'comp') {
          const container = JSON.parse(user.space_list);
          console.log('conatiner', container)
          const leadContainer = container.map((space) => {
            return Lead.getLead(space.id);
          });

          Promise.all(leadContainer)
          .then((lead) => {
            return resolve(lead);
          })
          .catch((err) => {
            return reject(err);
          });
        } else if (user.type === 'staff') {
          Lead.getLead(user.space_id)
          .then((lead) => {
            console.log('lead', lead);
            return resolve(lead);
          })
          .catch((err) => {
            return reject(err);
          });
        } else {
          return reject('unahthorized');
        }
      });
    });
  },
  post: (req) => {
    return new Promise((resolve, reject) => {
      const currentUser = req.session.passport.user;
      const spaceid = req.body.space_id;
      console.log(spaceid, typeof spaceid)

      if (currentUser.type === 'comp') {
        console.log('type comp', typeof spaceid, typeof currentUser.spaceList[0])
        const checkIsSpaceAdmin = currentUser.spaceList.includes(spaceid);
        console.log(checkIsSpaceAdmin, 'check??')
        if (!checkIsSpaceAdmin) {
          return reject('admin space mismatch');
        }
      } else if (currentUser.type === 'staff') {
        const checkIsSpaceStaff = currentUser.space_id === spaceid;
        if (!checkIsSpaceStaff) {
          return reject('staff space mismatch');
        }
      } else if (!currentUser.type) {
        return reject('unauthorized');
      }
      console.log('here!!!!!')
      Lead.addNewLead(req.body, spaceid)
      .then((result) => {
        console.log('new lead!', result)
        return resolve(result);
      });
    })
  },
};

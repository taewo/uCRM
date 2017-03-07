const Lead = require('../functions/lead');

module.exports = {
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

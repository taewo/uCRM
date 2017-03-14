const Room = require('../functions/room');

module.exports = {
  get: (req) => {
    return Room.getRoom(req.query.space_id);
  },

  post: (req) => {
    return new Promise((resolve, reject) => {
      const currentUser = req.session.passport.user;
      const spaceid = req.body.space_id;
      console.log(spaceid, typeof spaceid)

      if (currentUser.type === 'comp') {
        const checkIsSpaceAdmin = currentUser.spaceList.includes(spaceid);
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
      Room.addNewRoom(req.body, spaceid)
      .then((result) => {
        console.log('new lead!', result)
        return resolve(result);
      });
    })
  },
};

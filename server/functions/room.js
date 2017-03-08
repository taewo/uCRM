const Room = require('../db/room');

module.exports = {
  getRoom: (spaceid) => {
    return new Promise((resolve, reject) => {
      Room.where({ space_id: spaceid })
      .fetch()
      .then((result) => {
        return resolve(result);
      });
    });
  },
  addNewRoom: (body, spaceid) => {
    return new Promise((resolve, reject) => {
      body.space_id = spaceid;
      new Room(body)
      .save()
      .then((result) => {
        return resolve(result);
      });
    });
  },
};

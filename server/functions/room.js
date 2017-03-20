const Room = require('../db/room');

module.exports = {
  checkIfRoomExistByRoomName: (spaceId, roomName) => {
    return Room
    .where({
      space_id: spaceId,
      name: roomName,
    })
    .fetch()
    .then((result) => {
      if (result) {
        return true;
      }
      return false;
    })
    .catch(err => (Promise.reject(err)));
  },

  getRoomListBySpaceId: spaceid => (
    Room.where({ space_id: spaceid })
    .fetchAll()
    .then(result => (result.toJSON()))
    .catch(err => (Promise.reject(err)))
  ),

  addNewRoom: body => (
    new Room(body)
    .save()
    .then(result => (result))
    .catch(err => (Promise.reject(err)))
  ),
};

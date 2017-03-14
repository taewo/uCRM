const Room = require('../functions/room');
const Token = require('../middleware/token');

module.exports = {
  get: (req) => {
    return Room.getRoomListBySpaceId(req.query.space_id);
  },

  post: (req) => {
    return new Promise((resolve, reject) => {
      Token.getUserByToken(req.headers.token)
      .then((user) => {
        if (user.type === 'comp') {
          return resolve();
        } else {
          console.log('staff not authorized');
          return reject('staff cannot add a room');
        }
      })
      .catch((err) => {
        return reject('staff cannot add new room');
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        Room.checkIfRoomExistByRoomName(req.body.space_id, req.body.name)
        .then((result) => {
          if (result) {
            return reject('room name already exsit');
          } else {
            return resolve();
          }
        })
        .catch((err) => {
          return reject(err);
        });
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        Room.addNewRoom(req.body)
        .then((newRoom) => {
          return resolve(newRoom);
        })
        .catch((err) => {
          return reject(err);
        });
      });
    });
  },
};

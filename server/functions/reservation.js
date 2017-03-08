const Reservation = require('../db/reservation');
const Room = require('../db/room');

module.exports = {
  getReservationPerRoom: (roomid) => {
    return new Promise((resolve, reject) => {
      Reservation.where({ room_id: roomid })
      .fetchAll()
      .then((result) => {
        return resolve(result);
      });
    });
  },

  addNewReservation: (body) => {
    return new Promise((resolve, reject) => {
      new Reservation(body)
      .save()
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        return reject('room does not exist');
      })
    });
  },
};

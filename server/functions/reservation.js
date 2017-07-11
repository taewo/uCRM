const Reservation = require('../db/reservation');

module.exports = {
  getReservationPerRoom(roomid) {
    return Reservation.where({ room_id: roomid })
    .fetchAll()
    .then(result => (result))
    .catch(err => (Promise.reject(err)));
  },

  addNewReservation(body) {
    return new Reservation(body)
    .save()
    .then(result => (result))
    .catch(err => (Promise.reject('room does not exist')));
  },
};

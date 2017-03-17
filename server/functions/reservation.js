const Reservation = require('../db/reservation');

module.exports = {
  getReservationPerRoom: (roomid) => {
    return new Promise((resolve, reject) => {
      Reservation.where({ room_id: roomid })
      .fetchAll()
      .then(result => (resolve(result)))
      .catch(err => (reject(err)));
    });
  },

  addNewReservation: (body) => {
    return new Promise((resolve, reject) => {
      new Reservation(body)
      .save()
      .then(result => (resolve(result)))
      .catch(err => (reject('room does not exist')));
    });
  },
};

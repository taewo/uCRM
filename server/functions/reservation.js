const Reservation = require('../db/reservation');

module.exports = {
  getReservationPerRoom: roomid => (
    Reservation.where({ room_id: roomid })
    .fetchAll()
    .then(result => (result))
    .catch(err => (Promise.reject(err)))
  ),

  addNewReservation: body => (
    new Reservation(body)
    .save()
    .then(result => (result))
    .catch(err => (Promise.reject('room does not exist')))
  ),
};

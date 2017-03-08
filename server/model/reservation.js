const Reservation = require('../functions/reservation');

module.exports = {
  get: (req) => {
    return new Promise((resolve, reject) => {
      Reservation.getReservationPerRoom(req.query.room_id)
      .then((result) => {
        if (!result) {
          return resolve([]);
        } else {
          return resolve(result);
        }
      });
    });
  },
  post: (req) => {
    return new Promise((resolve, reject) => {
      Reservation.addNewReservation(req.body)
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        return reject(err);
      })
    });
  },
};

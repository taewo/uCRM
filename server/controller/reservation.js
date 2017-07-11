// const reservation = require('../model/reservation');

module.exports = {
//   get:
//   (req, res) => (reservation.get(req))
//   .then((result) => {
//     res.json(result);
//   })
//   .catch((err) => {
//     console.log(err.stack);
//     res.status(400).send(err);
//   }),
//   post:
//   (req, res) => {
//     return new Promise((resolve, reject) => {
//       const dataIncomplete = (
//         !req.body.room_id
//         || !req.body.date
//         || !req.body.start_time
//         || !req.body.end_time
//         || !req.body.duration
//         || !req.body.ispaid
//       );
//       if (dataIncomplete) {
//         return reject('post data incomplete');
//       }
//       return resolve(reservation.post(req));
//     })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.log(err.stack);
//       res.status(400).send(err);
//     });
//   },
// };

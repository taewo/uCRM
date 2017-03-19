// const room = require('../model/room');

module.exports = {
//   get:
//   (req, res) => (room.get(req))
//   .then((result) => {
//     res.json(result);
//   })
//   .catch((err) => {
//     console.log(err.stack);
//     if (err === 'unauthorized') {
//       res.send(err).status(401);
//     }
//     res.send(err).status(400);
//   }),
//   post:
//   (req, res) => {
//     return new Promise((resolve, reject) => {
//       const dataIncomplete = (
//         !req.body.name
//         || !req.body.cost
//         || !req.body.max_size
//         || !req.body.space_id
//       );
//       if (dataIncomplete) {
//         return reject('post data incomplete');
//       }
//       return resolve(room.post(req));
//     })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       if (err === 'unauthorized') {
//         res.send(err).status(401);
//       }
//       res.send(err).status(400);
//     });
//   },
// };

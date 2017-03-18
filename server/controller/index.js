const dashboard = require('../model/dashboard');
const space = require('../model/space');
const staffAuth = require('../model/staff_auth');
const lead = require('../model/lead');
const member = require('../model/member');
const signupAdmin = require('../model/signup_admin');
const signupStaff = require('../model/signup_staff');
const billplan = require('../model/billplan');
// const room = require('../model/room');
// const reservation = require('../model/reservation');

module.exports = {
  dashboard: {
    get:
    (req, res) => (dashboard.get(req))
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    }),
  },

  signup_admin: {
    post:
    (req, res) => (signupAdmin.post(req.body))
    .then((result) => {
      console.log('signup successfull!', result);
      res.json(result);
    })
    .catch((err) => {
      console.log('signup admin failed', err)
      res.send(err).status(400);
    }),
  },

  signup_staff: {
    get:
    (req, res) => (signupStaff.get(req))
    .then((result) => {
      console.log(result, 'body');
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err).status(400);
    }),
    post:
    (req, res) => (signupStaff.post(req.body))
    .then((result) => {
      console.log(result, 'body');
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err).status(400);
    }),
  },

  space: {
    get:
    (req, res) => (space.get(req))
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      if (err === 'unauthorized') {
        res.status(401).send(err);
      }
      res.status(400).send(err);
    }),
    post:
    (req, res) => {
      const dataIncomplete = (
        !req.body.name
        || !req.body.company_id
        || !req.body.address
        || !req.body.max_desks
      );
      if (dataIncomplete) {
        res.status(400).send('post data incomplete');
      }
      return space.post(req)
      .then((result) => {
        if (result === undefined) {
          res.status(400).send('unauthorized');
        } else {
          res.json(result);
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    },
  },

  staff_auth: {
    put:
    (req, res) => (staffAuth.put(req))
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.stack);
      if (err === 'unauthorized') {
        res.status(401).send(err);
      }
      res.status(400).send(err);
    }),
  },

  lead: {
    get:
    (req, res) => (lead.get(req))
    .then((result) => {
      console.log('RESULT', result)
      if (result.length) {
        res.json(result);
      }
      res.status(300).send('unauthorized access');
    })
    .catch((err) => {
      console.log(err.stack);
      if (err === 'unauthorized') {
        res.status(401).send(err);
      }
      res.status(400).send(err);
    }),
    post:
    (req, res) => {
      const dataIncomplete = (
        !req.body.date
        || !req.body.space_id
        || !req.body.email
        || !req.body.type
        || !req.body.name
      );
      if (dataIncomplete) {
        res.status(400).send('post data incomplete');
      }
      return lead.post(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err.stack);
        if (err === 'unauthorized') {
          res.status(401).send(err);
        }
        res.status(400).send(err);
      });
    },
  },

  // room: {
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
  // },

  member: {
    get:
    (req, res) => (member.get(req))
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    }),
    post:
    (req, res) => {
      const dataIncomplete = (
        !req.body.space_id
        || !req.body.name
        || !req.body.email
        || !req.body.mobile
        || !req.body.joined_date
      );
      if (dataIncomplete) {
        res.status(400).send('post data incomplete');
      }
      return member.post(req)
      .then((result) => {
        if (result) {
          res.json(result);
        }
        res.status(302).send('no access')
      })
      .catch((err) => {
        console.log(err.stack);
        res.status(400).send(err);
      });
    },
  },

  // reservation: {
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
  // },

  billplan: {
    get:
    (req, res) => (billplan.get(req))
    .then((result) => {
      console.log('bill plan list for', req.query.space_id, result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    }),
    post:
    (req, res) => {
      const dataIncomplete = (
        !req.body.space_id
        || !req.body.name
        || !req.body.cost
        || !req.body.duration
        || req.body.isdaily === undefined
      );
      if (dataIncomplete) {
        res.status(400).send('post data incomplete');
      }
      return billplan.post(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log('hahaha')
        res.status(400).send(err);
      });
    },
  },

  payment: {
    get:
    (req, res) => (payment.get(req))
    .then((result) => {
      console.log('bill plan list for', req.query.space_id, result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    }),
    post:
    (req, res) => {
      const dataIncomplete = (
        !req.body.space_id
        || !req.body.member_id
        || !req.body.cost
        || !req.body.duration
        || req.body.isdaily === undefined
      );
      if (dataIncomplete) {
        res.status(400).send('post data incomplete');
      }
      return payment.post(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    },
  },
};

const dashboard = require('../model/dashboard');
const space = require('../model/space');
const staffAuth = require('../model/staff_auth');
const lead = require('../model/lead');
const room = require('../model/room');
const member = require('../model/member');
const signupAdmin = require('../model/signup_admin');
const signupStaff = require('../model/signup_staff');
const reservation = require('../model/reservation');
const billing = require('../model/billing');

module.exports = {

  signup_admin: {
    post:
    (req, res) => (signupAdmin.post(req.body))
    .then((result) => {
      console.log('signup successfull!', result);
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log('signup admin failed', err)
      res.sendStatus(400);
    }),
  },

  signup_staff: {
    get:
    (req, res) => (signupStaff.get(req))
    .then((result) => {
      console.log(result, 'body');
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err);
      res.send(err).status(400);
    }),
    post:
    (req, res) => (signupStaff.post(req.body))
    .then((result) => {
      console.log(result, 'body');
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err);
      res.send(err).status(400);
    }),
  },

  dashboard: {
    get:
    (req, res) => (dashboard.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(400).send(err);
    }),
  },

  space: {
    get:
    (req, res) => (space.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
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
      return new Promise((resolve, reject) => {
        const dataIncomplete = (!req.body.name || !req.body.address || !req.body.max_desks);
        if (dataIncomplete) {
          return reject('post data incomplete');
        }
        return resolve(space.post(req));
      })
      .then((result) => {
        const body = JSON.stringify(result);
        res.json(body);
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

  staff_auth: {
    put:
    (req, res) => (staffAuth.put(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
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
      const body = JSON.stringify(result);
      res.json(body);
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
      return new Promise((resolve, reject) => {
        const dataIncomplete = (!req.body.date || !req.body.email || !req.body.type || !req.body.space_id);
        if (dataIncomplete) {
          return reject('post data incomplete');
        }
        return resolve(lead.post(req));
      })
      .then((result) => {
        const body = JSON.stringify(result);
        res.json(body);
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

  room: {
    get:
    (req, res) => (room.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
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
      return new Promise((resolve, reject) => {
        const dataIncomplete = (!req.body.name || !req.body.cost || !req.body.max_size || !req.body.space_id);
        if (dataIncomplete) {
          return reject('post data incomplete');
        }
        return resolve(room.post(req));
      })
      .then((result) => {
        const body = JSON.stringify(result);
        res.json(body);
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

  member: {
    get:
    (req, res) => (member.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(400).send(err);
    }),
    post:
    (req, res) => {
      return new Promise((resolve, reject) => {
        const dataIncomplete = (!req.body.space_id || !req.body.isactive || !req.body.name || !req.body.email || !req.body.mobile || !req.body.joined_date);
        if (dataIncomplete) {
          return reject('post data incomplete');
        }
        return resolve(member.post(req));
      })
      .then((result) => {
        const body = JSON.stringify(result);
        res.json(body);
      })
      .catch((err) => {
        console.log(err.stack);
        res.status(400).send(err);
      });
    },
  },

  reservation: {
    get:
    (req, res) => (reservation.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(400).send(err);
    }),
    post:
    (req, res) => {
      return new Promise((resolve, reject) => {
        const dataIncomplete = (!req.body.room_id || !req.body.date || !req.body.start_time || !req.body.end_time || !req.body.duration || !req.body.ispaid);
        if (dataIncomplete) {
          return reject('post data incomplete');
        }
        return resolve(reservation.post(req));
      })
      .then((result) => {
        const body = JSON.stringify(result);
        res.json(body);
      })
      .catch((err) => {
        console.log(err.stack);
        res.status(400).send(err);
      });
    },
  },

  billing: {
    get:
    (req, res) => (billing.get(req))
    .then((result) => {
      console.log(result, 'body');
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    }),
    post:
    (req, res) => {
      return new Promise((resolve, reject) => {
        const dataIncomplete = (!req.body.space_id || !req.body.name || !req.body.cost || !req.body.duration || req.body.isdaily === undefined);
        if (dataIncomplete) {
          return reject('post data incomplete');
        }
        return resolve(billing.post(req));
      })
      .then((result) => {
        const body = JSON.stringify(result);
        res.json(body);
      })
      .catch((err) => {
        console.log(err.stack);
        res.status(400).send(err);
      });
    },
  },
};

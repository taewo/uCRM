const dashboard = require('../model/dashboard');
const space = require('../model/space');
const staffAuth = require('../model/staff_auth');
const lead = require('../model/lead');
const room = require('../model/room');

module.exports = {

  dashboard: {
    get:
    (req, res) => (dashboard.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      console.log(err.stack);
      res.sendStatus(400);
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
        res.sendStatus(401);
      }
      res.sendStatus(400);
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
        res.sendStatus(401);
      }
      res.sendStatus(400);
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
        res.sendStatus(401);
      }
      res.sendStatus(400);
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
        res.sendStatus(401);
      }
      res.sendStatus(400);
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
};

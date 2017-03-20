const express = require('express');

const router = express.Router();
const dashboard = require('../controller/dashboard');
const space = require('../controller/space');
const lead = require('../controller/lead');
const member = require('../controller/member');
const payment = require('../controller/payment');
const expense = require('../controller/expense');
const utility = require('../controller/utility');
const billplan = require('../controller/billplan');
const Token = require('../middleware/token');

router.use((req, res, next) => {
  Token.checkNExtendedToken(req.headers.token)
  .then((result) => {
    next();
  })
  .catch((err) => {
    res.send(err).status(500)
  });
});

router.route('/dashboard')
.get(dashboard.get);

router.route('/space')
.get(space.get)
.post(space.post);

router.route('/lead')
.get(lead.get)
.post(lead.post);

router.route('/member')
.get(member.get)
.post(member.post);

router.route('/staff/permit')
.put(utility.staff_auth.put);

router.route('/billplan')
.get(billplan.get)
.post(billplan.post);

router.route('/payment')
.get(payment.get)
.post(payment.post);

router.route('/expense')
.get(expense.get)
.post(expense.post);

// router.route('/room')
// .get(room.get)
// .post(room.post);

// router.route('/room/reservation')
// .get(reservation.get)
// .post(reservation.post);

module.exports = router;

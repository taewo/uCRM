const express = require('express');

const router = express.Router();
const dashboard = require('../controller/dashboard');
const space = require('../controller/space');
const basic = require('../controller/basic');
const lead = require('../controller/lead');
const member = require('../controller/member');
const payment = require('../controller/payment');
const expense = require('../controller/expense');
const billplan = require('../controller/billplan');
const approve = require('../controller/approve');
const paymentSpace = require('../controller/payment_space');
const activity = require('../controller/activity');
const Token = require('../middleware/token');
// const approveStaff = require('../controller/approvestaff');
// const utility = require('../controller/utility');
// TODO you can require folder

router.get('/token', (req, res) => {
  Token.checkExistingToken(req.headers.token)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

router.use((req, res, next) => {
  Token.checkNExtendedToken(req.headers.token)
  .then((result) => {
    console.log('RESULT', result)
    next();
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});


router.route('/member/payment')
.get(payment.get)
.post(payment.post)
.delete(payment.delete);

router.route('/space')
.get(space.get)
.post(space.post)
.delete(space.delete);


router.get('*', (req, res, next) => {
  console.log(req.query.space_id);
  if (!req.query.space_id) {
    res.status(500).send('Error: no specified space id');
  }
  next();
});

router.route('/dashboard')
.get(dashboard.get);


router.route('/lead')
.get(lead.get)
.post(lead.post)
.delete(lead.delete);

router.route('/member')
.get(member.get)
.post(member.post)
.delete(member.delete);


router.route('/billplan')
.get(billplan.get)
.post(billplan.post);

router.route('/space/payment')
.get(paymentSpace.get);

router.route('/expense')
.get(expense.get)
.post(expense.post)
.delete(expense.delete);

router.route('/basic')
.get(basic.get)
.put(basic.put);

router.route('/approve/staff')
.post(approve.Staff.post);

router.route('/approve/expense')
.post(approve.Expense.post);

router.route('/activity')
.get(activity.get);

// router.route('/staff/permit')
// .put(utility.staff_auth.put);

// router.route('/room')
// .get(room.get)
// .post(room.post);

// router.route('/room/reservation')
// .get(reservation.get)
// .post(reservation.post);

module.exports = router;

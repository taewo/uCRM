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
const Token = require('../middleware/token');
// const approveStaff = require('../controller/approvestaff');
// const utility = require('../controller/utility');

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
.post(space.post)
.delete(space.delete);

router.route('/lead')
.get(lead.get)
.post(lead.post)
.delete(lead.delete);

router.route('/member')
.get(member.get)
.post(member.post);


router.route('/billplan')
.get(billplan.get)
.post(billplan.post);

router.route('/member/payment')
.get(payment.get)
.post(payment.post);

router.route('/space/payment')
.get(paymentSpace.get);

router.route('/expense')
.get(expense.get)
.post(expense.post);

router.route('/basic')
.get(basic.get)
.put(basic.put);

router.route('/approve/staff')
.post(approve.Staff.post);

router.route('/approve/expense')
.post(approve.Expense.post);

// router.route('/staff/permit')
// .put(utility.staff_auth.put);

// router.route('/room')
// .get(room.get)
// .post(room.post);

// router.route('/room/reservation')
// .get(reservation.get)
// .post(reservation.post);

module.exports = router;

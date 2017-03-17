const express = require('express');

const router = express.Router();
const controller = require('../controller/index');
const Token = require('../middleware/token');

router.use((req, res, next) => {
  Token.checkNExtendedToken(req.headers.token)
  .then((result) => {
    console.log('RESULT', result)
    next();
  })
  .catch((err) => {
    res.send(err).status(500)
  });
});

router.route('/dashboard')
.get(controller.dashboard.get);

router.route('/space')
.get(controller.space.get)
.post(controller.space.post);

router.route('/lead')
.get(controller.lead.get)
.post(controller.lead.post);

router.route('/room')
.get(controller.room.get)
.post(controller.room.post);

router.route('/member')
.get(controller.member.get)
.post(controller.member.post);

router.route('/staff/permit')
.put(controller.staff_auth.put);

router.route('/billplan')
.get(controller.billplan.get)
.post(controller.billplan.post);

// router.route('/room/reservation')
// .get(controller.reservation.get)
// .post(controller.reservation.post);

module.exports = router;

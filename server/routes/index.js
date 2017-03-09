const express = require('express');
const passport = require('passport');

const router = express.Router();
const controller = require('../controller/index');
require('../config/passport')(passport);

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

router.route('/room/reservation')
.get(controller.reservation.get)
.post(controller.reservation.post);

router.route('/staff/permit')
.put(controller.staff_auth.put);

router.route('/staff/signup')
.get(controller.signup_staff.get);

router.route('/billing')
.get(controller.billing.get)
.post(controller.billing.post);


module.exports = router;

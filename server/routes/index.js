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

router.route('/staff_auth')
.put(controller.staff_auth.put);

module.exports = router;

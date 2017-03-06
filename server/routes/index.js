const express = require('express');
const passport = require('passport');

const router = express.Router();
const controller = require('../controller/index');
require('../config/passport')(passport);

router.route('/')
.get(controller.dashboard.get);





module.exports = router;

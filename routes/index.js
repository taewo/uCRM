const express = require('express');

const router = express.Router();
const controller = require('../controller/index');

router.route('/')
.get(controller.dashboard.get);

module.exports = router;

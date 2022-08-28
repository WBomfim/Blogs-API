const express = require('express');
const rescue = require('express-rescue');
const loginController = require('../controllers/login');

const router = express.Router();

router.post('/', rescue(loginController.login));

module.exports = router;

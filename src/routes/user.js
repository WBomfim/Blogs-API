const express = require('express');
const rescue = require('express-rescue');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/', rescue(userController.addUser));

module.exports = router;

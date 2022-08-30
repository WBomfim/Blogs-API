const express = require('express');
const rescue = require('express-rescue');
const auth = require('../middlewares/auth');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/', rescue(userController.addUser));

router.get('/', auth, rescue(userController.getUsers));

router.get('/:id', auth, rescue(userController.getUserById));

router.delete('/me', auth, rescue(userController.deleteUser));

module.exports = router;

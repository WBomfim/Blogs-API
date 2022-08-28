const express = require('express');
const rescue = require('express-rescue');
const auth = require('../middlewares/auth');
const categoryController = require('../controllers/category');

const router = express.Router();

router.post('/', auth, rescue(categoryController.addCategory));

module.exports = router;

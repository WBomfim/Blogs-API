const express = require('express');
const rescue = require('express-rescue');
const auth = require('../middlewares/auth');
const postController = require('../controllers/post');

const router = express.Router();

router.post('/', auth, rescue(postController.addPost));

module.exports = router;

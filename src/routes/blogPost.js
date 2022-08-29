const express = require('express');
const rescue = require('express-rescue');
const auth = require('../middlewares/auth');
const blogPostController = require('../controllers/blogPost');

const router = express.Router();

router.post('/', auth, rescue(blogPostController.addPost));

module.exports = router;

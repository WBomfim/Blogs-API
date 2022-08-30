const express = require('express');
const rescue = require('express-rescue');
const auth = require('../middlewares/auth');
const blogPostController = require('../controllers/blogPost');

const router = express.Router();

router.post('/', auth, rescue(blogPostController.addPost));

router.get('/', auth, rescue(blogPostController.getPosts));

router.get('/:id', auth, rescue(blogPostController.getPostById));

module.exports = router;

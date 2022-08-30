const express = require('express');
const rescue = require('express-rescue');
const auth = require('../middlewares/auth');
const blogPostController = require('../controllers/blogPost');

const router = express.Router();

router.post('/', auth, rescue(blogPostController.addPost));

router.get('/', auth, rescue(blogPostController.getPosts));

router.get('/:id', auth, rescue(blogPostController.getPostById));

router.put('/:id', auth, rescue(blogPostController.updatePost));

router.delete('/:id', auth, rescue(blogPostController.deletePost));

module.exports = router;

const postService = require('../services/post');

const addPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { code, data } = await postService.addPost({ title, content, categoryIds });
  return res.status(code).json(data);
};

module.exports = {
  addPost,
};

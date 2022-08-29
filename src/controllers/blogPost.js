const blogPostService = require('../services/blogPost');

const addPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  
  const { code, data, error } = await blogPostService
    .addPost({ title, content, userId, categoryIds });

  if (error) return res.status(code).json(error);

  return res.status(code).json(data);
};

module.exports = {
  addPost,
};

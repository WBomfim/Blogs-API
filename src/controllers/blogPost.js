const blogPostService = require('../services/blogPost');

const addPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  const { code, data, error } = await blogPostService
    .addPost({ title, content, userId, categoryIds });
  if (error) return res.status(code).json(error);

  return res.status(code).json(data);
};

const getPosts = async (_req, res) => {
  const { code, data, error } = await blogPostService.getPosts();
  if (error) return res.status(code).json(error);

  return res.status(code).json(data);
};

const searchPosts = async (req, res) => {
  const { q } = req.query;

  const { code, data } = await blogPostService.searchPosts(q);

  return res.status(code).json(data);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const { code, data, error } = await blogPostService.getPostById(id);
  if (error) return res.status(code).json(error);

  return res.status(code).json(data);
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { title, content } = req.body;
  const { id: userId } = req.user;

  const { code, data, error } = await blogPostService
    .updatePost(userId, postId, { title, content });
  if (error) return res.status(code).json(error);

  return res.status(code).json(data);
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  const { code, data, error } = await blogPostService.deletePost(userId, postId);
  if (error) return res.status(code).json(error);

  return res.status(code).json(data);
};

module.exports = {
  addPost,
  getPosts,
  searchPosts,
  getPostById,
  updatePost,
  deletePost,
};

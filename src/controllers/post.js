const postService = require('../services/post');

const addPost = async ({ title, content, categoryIds }) => {
  const newPost = await postService.addPost({ title, content, categoryIds });
  return { code: 201, data: newPost };
};

module.exports = {
  addPost,
};

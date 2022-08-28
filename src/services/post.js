const { Post, PostCategory, sequelize } = require('../database/models');

const addPost = async ({ title, content, userId, categoryIds }) => {
  const result = await sequelize.transaction(async (trans) => {
    const post = await Post.create({ title, content, userId }, { transaction: trans });
    const postId = post.id;

    const insertCategories = categoryIds.map((categoryId) => ({ postId, categoryId }));
    await PostCategory.bulkCreate(insertCategories);

    return post;
  });

  return { code: 201, data: result };
};

module.exports = {
  addPost,
};

const Sequelize = require('sequelize');
const { development, test } = require('../database/config/config');
const { BlogPost, PostCategory } = require('../database/models');
const valadatePostInfos = require('../schemas/validatePostInfos');

const sequelize = new Sequelize(development || test);

const addPost = async ({ title, content, userId, categoryIds }) => {
  const { error } = await valadatePostInfos({ title, content, categoryIds });
  if (error) return error;

  const result = await sequelize.transaction(async (trans) => {
    const post = await BlogPost.create({ title, content, userId }, { trans });
    const { id: postId } = post;

    const insertCategories = categoryIds.map((categoryId) => ({ postId, categoryId }));
    await PostCategory.bulkCreate(insertCategories, { trans });

    return post;
  });

  return { code: 201, data: result };
};

module.exports = {
  addPost,
};

const Sequelize = require('sequelize');
const { development, test } = require('../database/config/config');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const validatePost = require('../schemas/validatePostInfos');

const sequelize = new Sequelize(development || test);

const addPost = async ({ title, content, userId, categoryIds }) => {
  const { error } = await validatePost.infosAdd({ title, content, categoryIds });
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

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!posts) return { code: 400, error: { message: 'Posts not found' } };

  return { code: 200, data: posts };
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return { code: 404, error: { message: 'Post does not exist' } };

  return { code: 200, data: post };
};

const updatePost = async (id, { title, content }) => {

};

module.exports = {
  addPost,
  getPosts,
  getPostById,
  updatePost,
};

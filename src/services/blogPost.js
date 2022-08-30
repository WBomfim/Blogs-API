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

const ASSOCIATIONS = [
  { model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } },
];

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: ASSOCIATIONS,
  });

  if (!posts) return { code: 400, error: { message: 'Posts not found' } };

  return { code: 200, data: posts };
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: ASSOCIATIONS,
  });

  if (!post) return { code: 404, error: { message: 'Post does not exist' } };

  return { code: 200, data: post };
};

const updatePost = async (userId, postId, { title, content }) => {
  const { error: errorValidate } = await validatePost.infosUpdate({ title, content });
  if (errorValidate) return errorValidate;

  const { code, data, error } = await getPostById(postId);
  if (error) return { code, error };

  if (data.userId !== userId) return { code: 401, error: { message: 'Unauthorized user' } };

  const postUpdated = await data.update({ title, content });
  return { code: 200, data: postUpdated };
};

const deletePost = async (userId, postId) => {
  const { code, data, error } = await getPostById(postId);
  if (error) return { code, error };

  if (data.userId !== userId) return { code: 401, error: { message: 'Unauthorized user' } };

  const postDeleted = await data.destroy();
  return { code: 204, data: postDeleted };
};

module.exports = {
  addPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};

const { Category } = require('../database/models');
const validateCategoryName = require('../schemas/validateCategoryName');

const addCategory = async (name) => {
  const { error } = await validateCategoryName(name);
  if (error) return error;

  const category = await Category.create({ name });
  return { code: 201, data: category };
};

const getCategories = async () => {
  const categories = await Category.findAll();
  if (!categories) return { code: 404, error: { message: 'No categories found' } };

  return { code: 200, data: categories };
};

module.exports = {
  addCategory,
  getCategories,
};

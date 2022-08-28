const { Category } = require('../database/models');
const validateCategoryName = require('../schemas/validateCategoryName');

const addCategory = async (name) => {
  const { error } = await validateCategoryName(name);
  if (error) return error;

  const category = await Category.create({ name });
  return { code: 201, data: category };
};

module.exports = {
  addCategory,  
};

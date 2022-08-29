const joi = require('joi');
const { Category } = require('../database/models');

const existThisCategories = async (categoryIds) => {
  const verifyCategories = categoryIds.map(async (categoryId) => {
    const category = await Category.findByPk(categoryId);
    if (!category) return false;
    return true;
  });
  
  const verified = await Promise.all(verifyCategories);
  if (verified.includes(false)) {
    return { error: { code: 400, error: { message: '"categoryIds" not found' } } };
  }

  return true;
};

const INFO_EMPTY = '400|Some required fields are missing';

const schemaTitle = joi.string().empty().required().messages({
  'string.empty': INFO_EMPTY,
  'any.required': '400|title is required',
});

const schemaContent = joi.string().empty().required().messages({
  'string.empty': INFO_EMPTY,
  'any.required': '400|content is required',
});

const schemaCategoryIds = joi.array().min(1).required().items(joi.number())
  .messages({
    'any.required': '400|categoryIds is required',
    'array.min': INFO_EMPTY,
    'number.base': '400|categoryIds must be a number',
  });

const validatePostInfos = async ({ title, content, categoryIds }) => {
  const schema = joi.object().keys({
    title: schemaTitle,
    content: schemaContent,
    categoryIds: schemaCategoryIds,
  });

  const { error } = schema.validate({ title, content, categoryIds });
  if (error) {
    const [code, message] = error.message.split('|');
    return { error: { code: Number(code), error: { message } } };
  }

  const verifyCategories = await existThisCategories(categoryIds);
  if (verifyCategories.error) return verifyCategories;

  return true;
};

module.exports = validatePostInfos;

const joi = require('joi');

const INFO_EMPTY = '400|Some required fields are missing';

const schemaTitle = joi.string().empty().required().messages({
  'string.empty': INFO_EMPTY,
  'any.required': '400|title is required',
});

const schemaContent = joi.string().empty().required().messages({
  'string.empty': INFO_EMPTY,
  'any.required': '400|content is required',
});

const schemaCategoryIds = joi.array().items(joi.number().empty().required().messages({
  'number.empty': INFO_EMPTY,
  'any.required': '400|categoryId is required',
})).empty().required()
.messages({
  'array.empty': INFO_EMPTY,
  'any.required': '400|categoryId is required',
});

const validatePostInfos = async ({ title, content, categoryIds }) => {
  const schema = joi.object().keys({
    title: schemaTitle,
    content: schemaContent,
    categoryId: schemaCategoryIds,
  });

  const { error } = schema.validate({ title, content, categoryIds });
  if (error) {
    const [code, message] = error.message.split('|');
    return { error: { code: Number(code), error: { message } } };
  }

  return true;
};

module.exports = validatePostInfos;

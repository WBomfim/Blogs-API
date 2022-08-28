const joi = require('joi');

const INFO_EMPTY = '400|Some required fields are missing';

const validateCategoryName = async (name) => {
  const schema = joi.string().empty().required().messages({
    'string.empty': INFO_EMPTY,
    'any.required': '400|"name" is required',
  });

  const { error } = schema.validate(name);
  if (error) {
    const [code, message] = error.message.split('|');
    return { error: { code: Number(code), error: { message } } };
  }

  return true;
};

module.exports = validateCategoryName;

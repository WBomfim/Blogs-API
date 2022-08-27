const joi = require('joi');

const validateUserInfos = ({ email, password }) => {
  const schema = joi.object().keys({
    email: joi.email().required().messages({
      'string.empty': '400|Email is required',
      'string.email': '400|Email is invalid',
      'any.required': '400|Some required fields are missing',
    }),
    password: joi.required().messages({
      'string.empty': '400|Password is required',
      'any.required': '400|Some required fields are missing',
    }),
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    const [code, message] = error.message.split('|');
    return { code: Number(code), error: { message } };
  }

  return false;
};

module.exports = validateUserInfos;

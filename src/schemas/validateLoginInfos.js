const joi = require('joi');

const validateLoginInfos = ({ email, password }) => {
  const schema = joi.object().keys({
    email: joi.string().empty().required().messages({
      'string.empty': '400|Some required fields are missing',
      'any.required': '400|Some required fields are missing',
    }),
    password: joi.string().empty().required().messages({
      'string.empty': '400|Some required fields are missing',
      'any.required': '400|Some required fields are missing',
    }),
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    const [code, message] = error.message.split('|');
    return { error: { code: Number(code), error: { message } } };
  }

  return true;
};

module.exports = validateLoginInfos;

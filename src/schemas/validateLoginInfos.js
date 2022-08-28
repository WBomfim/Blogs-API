const joi = require('joi');

const INFO_EMPTY = '400|Some required fields are missing';

const schemaEmail = joi.string().empty().required().messages({
  'string.empty': INFO_EMPTY,
  'any.required': '400|email is required',
});

const schemaPassword = joi.string().empty().required().messages({
  'string.empty': INFO_EMPTY,
  'any.required': '400|password is required',
});

const validateLoginInfos = ({ email, password }) => {
  const schema = joi.object().keys({
    email: schemaEmail,
    password: schemaPassword,
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    const [code, message] = error.message.split('|');
    return { error: { code: Number(code), error: { message } } };
  }

  return true;
};

module.exports = validateLoginInfos;

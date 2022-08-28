const joi = require('joi');
const { User } = require('../database/models');

const INFO_EMPTY = '400|Some required fields are missing';

const schemaDisplayName = joi.string().empty().min(8).required()
  .messages({
    'string.empty': INFO_EMPTY,
    'string.min': '400|"displayName" length must be at least {#limit} characters long',
    'any.required': '400|displayName is required',
  });

const schemaEmail = joi.string().empty().email().required()
  .messages({
    'string.empty': INFO_EMPTY,
    'string.email': '400|"email" must be a valid email',
    'any.required': '400|email is required',
  });

const schemaPassword = joi.string().empty().min(6).required()
  .messages({
    'string.empty': INFO_EMPTY,
    'string.min': '400|"password" length must be at least {#limit} characters long',
    'any.required': '400|password is required',
  });

const validateUserInfos = async ({ displayName, email, password }) => {
  const schema = joi.object().keys({
    displayName: schemaDisplayName,
    email: schemaEmail,
    password: schemaPassword,
  });

  const { error } = schema.validate({ displayName, email, password });
  if (error) {
    const [code, message] = error.message.split('|');
    return { error: { code: Number(code), error: { message } } };
  }

  const isEmailAlreadyExists = await User.findOne({ where: { email } });
  if (!isEmailAlreadyExists) {
    return { error: { code: 409, error: { message: 'User already registered' } } };
  }
  return true;
};

module.exports = validateUserInfos;

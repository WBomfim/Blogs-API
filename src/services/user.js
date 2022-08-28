const { User } = require('../database/models');
const validateUserInfos = require('../schemas/validateUserInfos');
const generateToken = require('../helpers/generateToken');

const addUser = async ({ displayName, email, password, image }) => {
  const validateInfos = await validateUserInfos({ displayName, email, password });
  if (validateInfos.error) return validateInfos.error;

  const newUser = await User.create({ displayName, email, password, image });
  const token = generateToken(newUser);

  return { code: 201, data: { token } };
};

module.exports = {
  addUser,
};

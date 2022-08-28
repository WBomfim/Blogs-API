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

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  if (!users) return { code: 404, error: { message: 'No users found' } };

  return { code: 200, data: users };
};

module.exports = {
  addUser,
  getUsers,
};

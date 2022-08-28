require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const validateUserInfos = require('../schemas/validateUserInfos');

const login = ({ email, password }) => {
  const isNotValidInfos = validateUserInfos({ email, password });
  if (isNotValidInfos) return isNotValidInfos;

  const user = User.findOne({ where: { email } });
  if (!user || !user.password === password) {
    return { code: 400, error: { message: 'Invalid fields' } };
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return { code: 200, data: { token } };
};

module.exports = {
  login,
};

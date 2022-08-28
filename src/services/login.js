require('dotenv').config();
const jwt = require('jsonwebtoken');
const validateLoginInfos = require('../schemas/validateLoginInfos');
const validateLogin = require('../schemas/validateLogin');

const login = async ({ email, password }) => {
  const isNotValidInfos = validateLoginInfos({ email, password });
  if (isNotValidInfos) return isNotValidInfos;

  const user = await validateLogin({ email, password });
  if (user.error) return user.error;

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

const validateLoginInfos = require('../schemas/validateLoginInfos');
const validateLogin = require('../schemas/validateLogin');
const generateToken = require('../helpers/generateToken');

const login = async ({ email, password }) => {
  const isNotValidInfos = validateLoginInfos({ email, password });
  if (isNotValidInfos) return isNotValidInfos;

  const user = await validateLogin({ email, password });
  if (user.error) return user.error;

  const token = generateToken(user);

  return { code: 200, data: { token } };
};

module.exports = {
  login,
};

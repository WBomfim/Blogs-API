const validateLoginInfos = require('../schemas/validateLoginInfos');
const validateLogin = require('../schemas/validateLogin');
const generateToken = require('../helpers/generateToken');

const login = async ({ email, password }) => {
  const validateInfos = validateLoginInfos({ email, password });
  if (validateInfos.error) return validateInfos.error;

  const user = await validateLogin({ email, password });
  if (user.error) return user.error;

  const token = generateToken(user);

  return { code: 200, data: { token } };
};

module.exports = {
  login,
};

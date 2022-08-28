const validateLoginInfos = require('../schemas/validateLoginInfos');
const generateToken = require('../helpers/generateToken');

const login = async ({ email, password }) => {
  const user = await validateLoginInfos({ email, password });
  if (user.error) return user.error;

  const token = generateToken(user);

  return { code: 200, data: { token } };
};

module.exports = {
  login,
};

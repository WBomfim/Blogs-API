const validateLoginInfos = require('../schemas/validateLoginInfos');
const generateToken = require('../helpers/generateToken');

const login = async ({ email, password }) => {
  const { user, error } = await validateLoginInfos({ email, password });
  if (error) return error;

  const token = generateToken(user);
  return { code: 200, data: { token } };
};

module.exports = {
  login,
};

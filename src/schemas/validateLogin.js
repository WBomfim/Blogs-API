const { User } = require('../database/models');

const validateLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user || email !== user.email || password !== user.password) {
    return { error: { code: 400, error: { message: 'Invalid fields' } } };
  }

  return user;
};

module.exports = validateLogin;

const loginService = require('../services/login');

const login = (req, res) => {
  const { email, password } = req.body;
  const { code, data, error } = loginService.login({ email, password });
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
};

module.exports = {
  login,
};

const userService = require('../services/user');

const addUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { code, data, error } = await userService.addUser({ displayName, email, password, image });
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
};

const getUsers = async (req, res) => {
  const { code, data, error } = await userService.getUsers();
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
};

module.exports = {
  addUser,
  getUsers,
};

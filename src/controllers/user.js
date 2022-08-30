const userService = require('../services/user');

const addUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { code, data, error } = await userService.addUser({ displayName, email, password, image });
  if (error) return res.status(code).json(error);

  return res.status(code).json(data);
};

const getUsers = async (_req, res) => {
  const { code, data, error } = await userService.getUsers();
  if (error) return res.status(code).json(error);

  return res.status(code).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const { code, data, error } = await userService.getUserById(id);
  if (error) return res.status(code).json(error);

  return res.status(code).json(data);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;

  const { code } = await userService.deleteUser(id);

  return res.status(code).end();
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  deleteUser,
};

const categoryService = require('../services/category');

const addCategory = async (req, res) => {
  const { name } = req.body;
  const { code, data, error } = await categoryService.addCategory(name);
  if (error) return res.status(code).json(error);

  return res.status(code).json(data);
};

module.exports = {
  addCategory,
};

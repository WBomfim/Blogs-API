const handleErrors = (err, _req, res, _next) => res.status(500)
  .json({ message: 'Internal server error' });

module.exports = handleErrors;

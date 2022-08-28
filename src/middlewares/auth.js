require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header.authotization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = auth;

require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const config = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, config);

  return token;
};

module.exports = generateToken;

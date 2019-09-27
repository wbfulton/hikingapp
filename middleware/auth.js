const jwt = require('jsonwebtoken'); // import jwt
const config = require('config'); // import config file

// Returns authentication method
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if there is a token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user; // sets req.user to the users id
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

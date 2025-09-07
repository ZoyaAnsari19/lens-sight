const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

const requireAuth = (user) => {
  if (!user) {
    throw new Error('Access denied. Please login to continue.');
  }
  return user;
};

const requireAdmin = (user) => {
  requireAuth(user);
  if (user.role !== 'admin') {
    throw new Error('Access denied. Admin privileges required.');
  }
  return user;
};

module.exports = {
  generateToken,
  verifyToken,
  requireAuth,
  requireAdmin
};

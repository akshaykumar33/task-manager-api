// middlewares/auth.middleware.js
const ApiError = require('../errors/api.error');
const { StatusCodes } = require('http-status-codes');
const { verifyToken } = require("../utils/jwt.util");
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Missing auth token');

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId; // 👈 this must match what generateToken sends
    next();
  } catch (err) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token');
  }
};

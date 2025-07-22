const ApiError = require('../errors/api.error');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`[${req.method}] ${req.originalUrl} - ${message}`, {
    stack: err.stack,
    userId: req.userId || 'unauthenticated'
  });

  res.status(statusCode).json({
    success: false,
    error: {
      message
    }
  });
};

module.exports = errorHandler;

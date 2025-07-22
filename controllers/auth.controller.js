const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt.util');
const asyncHandler = require('express-async-handler');
const ApiError = require('../errors/api.error');
const { StatusCodes } = require('http-status-codes');
const logger = require('../utils/logger');

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(StatusCodes.CONFLICT, 'User already exists');

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  logger.info(`User registered: ${user.email}`);
  res.status(StatusCodes.CREATED).json({ message: 'User registered', userId: user._id });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const token = generateToken({ userId: user._id.toString() });
  res.status(StatusCodes.OK).json({ token });
});

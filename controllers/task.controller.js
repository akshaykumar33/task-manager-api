const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const ApiError = require("../errors/api.error");
const { StatusCodes } = require("http-status-codes");
const logger = require("../utils/logger");

exports.listTasks = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "User not found");

  const visibleTasks = user.tasks
    .filter((t) => !t.deleted)
    .map((task) => ({
      ...task.toObject(),
      subtasks: task.subtasks.filter((st) => !st.deleted),
    }));

  res.status(StatusCodes.OK).json(visibleTasks);
});

exports.createTask = asyncHandler(async (req, res) => {
  const { subject, deadline, status } = req.body;

  const task = { subject, deadline, status, deleted: false, subtasks: [] };

  const user = await User.findById(req.userId);

  user.tasks.push(task);
  await user.save();

  const createdTask = user.tasks[user.tasks.length - 1];
  logger.info(`Task created for user ${req.userId}: ${subject}`);
  res.status(StatusCodes.CREATED).json(createdTask);
});

exports.updateTask = asyncHandler(async (req, res) => {
  const { subject, deadline, status } = req.body;
  const { taskId } = req.params;

  const user = await User.findById(req.userId);
  const task = user?.tasks?.id(taskId);
  if (!task || task.deleted)
    throw new ApiError(StatusCodes.NOT_FOUND, "Task not found");

  Object.assign(task, { subject, deadline, status });
  await user.save();

  res.status(StatusCodes.OK).json(task);
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const user = await User.findById(req.userId);
  const task = user?.tasks?.id(taskId);
  if (!task) throw new ApiError(StatusCodes.NOT_FOUND, "Task not found");

  task.deleted = true;
  await user.save();

  logger.info(`Task soft-deleted: ${taskId} by user ${req.userId}`);
  res.status(StatusCodes.OK).json({ message: "Task marked as deleted" });
});

exports.getSubtasks = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const user = await User.findById(req.userId);
  const task = user?.tasks?.id(taskId);
  if (!task || task.deleted)
    throw new ApiError(StatusCodes.NOT_FOUND, "Task not found");

  const subtasks = task.subtasks.filter((st) => !st.deleted);
  res.status(StatusCodes.OK).json(subtasks);
});

exports.updateSubtasks = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { subtasks } = req.body;
  const user = await User.findById(req.userId);
  const task = user?.tasks?.id(taskId);
  if (!task || task.deleted)
    throw new ApiError(StatusCodes.NOT_FOUND, "Task not found");

  const oldDeleted = task.subtasks.filter((st) => st.deleted);
  task.subtasks = [
    ...subtasks.map((st) => ({ ...st, deleted: false })),
    ...oldDeleted,
  ];
  await user.save();

  res.status(StatusCodes.OK).json(task.subtasks.filter((st) => !st.deleted));
});

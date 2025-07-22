const Joi = require('joi');

const statusEnum = ['pending', 'in progress', 'completed'];

exports.taskSchema = Joi.object({
  subject: Joi.string().required(),
  deadline: Joi.date().required(),
  status: Joi.string().valid(...statusEnum).required()
});

exports.subtaskSchema = Joi.object({
  subject: Joi.string().required(),
  deadline: Joi.date().required(),
  status: Joi.string().valid(...statusEnum).required()
});

exports.subtasksSchema = Joi.object({
  subtasks: Joi.array().items(exports.subtaskSchema).min(1).required()
});

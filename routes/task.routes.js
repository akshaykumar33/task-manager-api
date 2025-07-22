const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate.middleware');
const auth = require('../middlewares/auth.middleware');
const {
  taskSchema,
  subtasksSchema
} = require('../validations/task.validation');
const {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  getSubtasks,
  updateSubtasks
} = require('../controllers/task.controller');

router.use(auth);
router.get('/', listTasks);
router.post('/', validate(taskSchema), createTask);
router.put('/:taskId', validate(taskSchema), updateTask);
router.delete('/:taskId', deleteTask);
router.get('/:taskId/subtasks', getSubtasks);
router.put('/:taskId/subtasks', validate(subtasksSchema), updateSubtasks);

module.exports = router;

// models/user.model.js
const mongoose = require('mongoose');

const SubtaskSchema = new mongoose.Schema({
  subject: String,
  deadline: Date,
  status: String,
  deleted: { type: Boolean, default: false }
}, { _id: true });

const TaskSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  subject: String,
  deadline: Date,
  status: String,
  deleted: { type: Boolean, default: false },
  subtasks: [SubtaskSchema]
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  tasks: [TaskSchema]
});

module.exports = mongoose.model('User', UserSchema);

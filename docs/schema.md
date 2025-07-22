# MongoDB Schema

## User
- name: String
- email: String (unique)
- password: Hashed string
- tasks: Array of Task

## Task
- subject: String
- deadline: Date
- status: String
- deleted: Boolean
- subtasks: Array of Subtask

## Subtask
- subject: String
- deadline: Date
- status: String
- deleted: Boolean

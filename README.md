
# 📝 Task Manager API

A secure, modular backend API built using **Node.js**, **Express**, **MongoDB**, and **JWT** for managing **tasks and subtasks**. Each user can register, authenticate, and perform CRUD operations on their own tasks. It supports **soft deletion**, **subtask replacement**, and is fully tested and Dockerized.

---

## 🚀 Features

- ✅ User Registration & Login (JWT-based)
- ✅ Secure access to task APIs with JWT
- ✅ CRUD operations for tasks
- ✅ CRUD operations for subtasks (full replacement)
- ✅ Soft deletion for both tasks and subtasks
- ✅ MongoDB embedded document design
- ✅ Swagger and Postman API documentation
- ✅ Unit & Integration tests (Jest + Supertest)
- ✅ Dockerized development environment

---

## 📁 Project Structure

```
task-manager-api/
├── controllers/         # Auth and task logic
├── middlewares/         # JWT authentication middleware
├── models/              # Mongoose schema definitions
├── routes/              # Auth and task routes
├── utils/               # JWT utilities
├── tests/               # Jest + Supertest test cases
├── docs/                # Schema and Swagger documentation
├── validations/         # Validation of request structure
├── errors/              # Error Handler
├── logs/                # Loggers 
├── .env                 # Environment variables
├── Dockerfile           # Docker build config
├── docker-compose.yml   # Multi-container config (API + MongoDB)
├── app.js               # App setup
├── server.js            # Server entrypoint
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

---

## 🔐 API Authentication

All task and subtask routes require a valid **JWT token** in the `Authorization` header:

```
Authorization: Bearer <your_token_here>
```

---

## 📦 API Endpoints

### 🔑 Auth

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| POST   | `/auth/register` | Register new user   |
| POST   | `/auth/login`    | Authenticate & get JWT |

### 📌 Tasks (Protected)

| Method | Endpoint             | Description                     |
|--------|----------------------|---------------------------------|
| GET    | `/tasks`             | Get all non-deleted tasks       |
| POST   | `/tasks`             | Create a new task               |
| PUT    | `/tasks/:taskId`     | Update task by ID               |
| DELETE | `/tasks/:taskId`     | Soft delete a task              |

### 🔄 Subtasks (Protected)

| Method | Endpoint                         | Description                        |
|--------|----------------------------------|------------------------------------|
| GET    | `/tasks/:taskId/subtasks`        | List non-deleted subtasks          |
| PUT    | `/tasks/:taskId/subtasks`        | Replace subtasks for a task        |

---

## 🐳 Running with Docker

### 1. Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Run with Docker

```bash
# Clone the repository
git clone https://github.com/akshaykumar33/task-manager-api.git
cd task-manager-api

# Start API + MongoDB
docker-compose up --build
```

- API: http://localhost:5000
- MongoDB: localhost:27017

### 3. Environment (`.env`)

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/taskmanager
JWT_SECRET=supersecretkey
```

---

## 🖥 Running Locally (Without Docker)

```bash
# Install dependencies
npm install

# Create .env file (see above)

# Start the server
npm run dev   # for development (nodemon)
npm start     # for production
```

---

## 🧪 Running Tests

This project includes full **unit and integration tests** using `jest`, `supertest`, and `mongodb-memory-server`.

```bash
npm test
```

> Runs isolated in-memory tests without touching local MongoDB.

---

## 📘 API Documentation

### 📒 Swagger/OpenAPI

- File: [`docs/api-docs.yaml`](./docs/api-docs.yaml)
- Open online via: [https://editor.swagger.io/](https://editor.swagger.io/)

### 📬 Postman

You can also import the Postman Collection from the JSON file `task-manager-api.postman_collection.json`.

---

## 📘 Database Schema (Embedded)

Each user document in MongoDB looks like:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "<hashed>",
  "tasks": [
    {
      "subject": "Build API",
      "deadline": "2025-07-25",
      "status": "pending",
      "deleted": false,
      "subtasks": [
        {
          "subject": "Create routes",
          "deadline": "2025-07-23",
          "status": "completed",
          "deleted": false
        }
      ]
    }
  ]
}
```

---

## ✅ Features Checklist

| Feature                           | Status |
|----------------------------------|--------|
| Register/Login                   | ✅     |
| JWT Authentication Middleware    | ✅     |
| Task CRUD                        | ✅     |
| Subtask CRUD (Replace All)       | ✅     |
| Soft Deletion                    | ✅     |
| Docker Support                   | ✅     |
| Swagger/Postman API Docs         | ✅     |
| Unit/Integration Tests           | ✅     |

---

## 🛠 Built With

- **Node.js**, **Express.js**
- **MongoDB**, **Mongoose**
- **JWT**, **Bcrypt**
- **Docker**, **Docker Compose**
- **Jest**, **Supertest**
- **Swagger/OpenAPI**

---

## 👨‍💻 Author

Built by a passionate backend developer focused on clean architecture, testing, and DevOps.

---

## 📬 Contact & Contributions

Want to improve or fork it? Feel free to submit a PR or raise an issue.

---


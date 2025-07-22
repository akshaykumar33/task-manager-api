const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

let tokenTask;
let taskId;

describe('Task', () => {
  beforeAll(async () => {
    // Register and login user
    await request(app).post('/auth/register').send({
      name: 'Task User',
      email: 'task@example.com',
      password: 'taskpass123',
    });

    const res = await request(app).post('/auth/login').send({
      email: 'task@example.com',
      password: 'taskpass123',
    });

    tokenTask = res.body.token;
  });

  it('should create a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${tokenTask}`)
      .send({
        subject: 'Test Task',
        deadline: '2025-08-01',
        status: 'pending',
      });

    expect(res.statusCode).toBe(201);
    taskId = res.body._id;
  });

  it('should retrieve all tasks', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${tokenTask}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${tokenTask}`)
      .send({
        subject: 'Updated Task',
        status: 'in progress',
        deadline: '2025-08-10',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.subject).toBe('Updated Task');
  });

  it('should delete the task', async () => {
    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${tokenTask}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task marked as deleted');
  });
});

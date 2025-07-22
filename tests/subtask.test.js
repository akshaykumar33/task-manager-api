// tests/subtask.test.js
const requestSub = require('supertest');
const appSub = require('../app');

let tokenSub, taskIdSub;

describe('Subtask', () => {
  beforeAll(async () => {
    await requestSub(appSub).post('/auth/register').send({
      name: 'Subtask User',
      email: 'subtask@example.com',
      password: 'subtaskpass123'
    });
    const login = await requestSub(appSub).post('/auth/login').send({
      email: 'subtask@example.com',
      password: 'subtaskpass123'
    });
    tokenSub = login.body.token;

    const task = await requestSub(appSub)
      .post('/tasks')
      .set('Authorization', `Bearer ${tokenSub}`)
      .send({
        subject: 'Main Task',
        deadline: '2025-07-30',
        status: 'pending'
      });
    taskIdSub = task.body._id;
  });

  it('should update subtasks', async () => {
    const res = await requestSub(appSub)
      .put(`/tasks/${taskIdSub}/subtasks`)
      .set('Authorization', `Bearer ${tokenSub}`)
      .send({
        subtasks: [
          { subject: 'Subtask 1', deadline: '2025-07-28', status: 'pending' },
          { subject: 'Subtask 2', deadline: '2025-07-29', status: 'pending' }
        ]
      });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should fetch all subtasks', async () => {
    const res = await requestSub(appSub)
      .get(`/tasks/${taskIdSub}/subtasks`)
      .set('Authorization', `Bearer ${tokenSub}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
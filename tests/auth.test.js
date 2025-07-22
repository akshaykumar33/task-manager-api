// tests/auth.test.js
const request = require('supertest');
const app = require('../app');

let token;

describe('Auth', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(201);
  });

  it('should login with valid credentials', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });
});

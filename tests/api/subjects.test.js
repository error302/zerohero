/** @jest-environment node */
const request = require('supertest');
const app = require('../../server');

describe('GET /api/subjects', () => {
  it('should return subjects with a math key', async () => {
    const res = await request(app).get('/api/subjects');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('math');
  });
});

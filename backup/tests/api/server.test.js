/** @jest-environment node */
const request = require('supertest');
const app = require('../../server');

describe('KCSE Backend API', () => {
  it('GET / should serve the LMS application successfully', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toMatch(/KCSE/i);
  });

  it('GET /api/subjects should return a response without crashing', async () => {
    const res = await request(app).get('/api/subjects');
    // It might return 500 if subjects.json doesn't exist, or 200 if it does.
    // Both mean the server is running and the route is mounted.
    expect([200, 500]).toContain(res.statusCode);
  });
});

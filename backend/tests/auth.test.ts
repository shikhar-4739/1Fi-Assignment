import request from 'supertest'
import app from '../src/app'
import { cleanDatabase } from "./dbCleanup"
import { seedUser } from './seeds'

beforeEach(async () => {
  await cleanDatabase()
})

describe('Auth API (Test DB)', () => {

  it('should login a user in test database', async () => {

    const user = await seedUser();

    const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: user.email,
      password: 'password123'
    })

    console.log('Login response:', loginRes.body); // Debug log
    console.log('Status:', loginRes.status);

    const token = loginRes.body.token;

    expect(loginRes.status).toBe(200)
    expect(token).toBeDefined()
  })
})

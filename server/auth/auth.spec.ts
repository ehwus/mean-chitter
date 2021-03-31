import { connectTestDB, clearDatabase, closeDatabase } from '../config/test-db';
import { server } from '../server';
import {
  createValidUser,
  defaultEmail,
  defaultPassword,
} from '../spec/support/test-helpers';
import { UserModel } from '../users/user.model';
import supertest from 'supertest';

const request = supertest(server);

beforeAll(async () => await connectTestDB());
afterEach(async () => await clearDatabase());

describe('Auth', () => {
  it('Returns a JWT with a valid request', async () => {
    await createValidUser();
    const validRequest = await request
      .post('/api/auth')
      .send({ email: defaultEmail, password: defaultPassword });
    expect(validRequest.status).toBe(200);
    expect(validRequest.body.token).toBeTruthy();
  });

  it('Returns an error with an invalid request', async () => {
    const invalidRequest = await request
      .post('/api/auth')
      .send({ email: defaultEmail, password: defaultPassword });
    expect(invalidRequest.status).toBe(300);
    expect(invalidRequest.body.errors.length).toEqual(1);
  });

  it('Returns errors if email and password are not provided', async () => {
    const badRequest = await request.post('/api/auth').send();
    expect(badRequest.body.errors.length).toEqual(2);
  });
});

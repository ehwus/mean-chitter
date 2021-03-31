import { connectTestDB, clearDatabase, closeDatabase } from '../config/test-db';
import { server } from '../server';
import { createValidUser } from '../spec/support/test-helpers';
import { UserModel } from './user.model';
import supertest from 'supertest';

const request = supertest(server);

beforeAll(async () => await connectTestDB());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('User Model', () => {
  it('allows the creation of a user', async () => {
    await createValidUser();
  });

  it('Salts the password', async () => {
    let test = await UserModel.create({
      username: 'test123',
      email: 'test@test.com',
      password: 'foo123',
    });

    expect(test.password).not.toEqual('foo123');
    expect(test.checkPassword('foo123')).toBeTrue;
    expect(test.checkPassword('wrong')).toBeFalse;
  });

  it('Does not allow passwords fewer than 5 characters', async () => {
    try {
      await UserModel.create({
        username: 'test123',
        email: 'test@test.com',
        password: 'f',
      });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('Puts email and username into lowercase', async () => {
    let test = await UserModel.create({
      username: 'TEST123',
      email: 'TEST@TEST.COM',
      password: 'foo123',
    });

    expect(test.username).toEqual('test123');
    expect(test.email).toEqual('test@test.com');
  });

  it("doesn't allow duplicate email or username", async () => {
    await createValidUser();
    expect(async () => await createValidUser()).toThrowError;
  });

  it('gives error if usernames are less than 5 or greater than 20', async () => {
    try {
      await UserModel.create({
        username: 'f',
        email: 'foo@foo.com',
        password: 'foo12345',
      });
    } catch (error) {
      expect(error).toBeTruthy();
    }

    try {
      await UserModel.create({
        username: 'ffsdafddsfsadfsadfasdfasdfgdfgasgfsdfasdfasdgfsdfas',
        email: 'foo@foo.com',
        password: 'foo12345',
      });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});

describe('User Route', () => {
  describe('POST /api/users', () => {
    it('returns 400 with empty request', async () => {
      const emptyResponse = await request.post('/api/users');
      expect(emptyResponse.status).toEqual(400);
    });

    it('creates a user when given valid input', async () => {
      const validResponse = await request.post('/api/users').send({
        username: 'testuser',
        email: 'test@test.com',
        password: 'Partario',
      });

      const allUsers = await UserModel.find({});
      expect(allUsers.length).toEqual(1);
    });
  });
});

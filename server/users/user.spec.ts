import { connectTestDB, clearDatabase, closeDatabase } from '../config/test-db';
import { createValidUser } from '../spec/support/test-helpers';
import { IUser, User } from './user.model';

beforeAll(async () => await connectTestDB());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('User Model', () => {
  it('allows the creation of a user', async () => {
    await createValidUser();
  });

  it('Salts the password', async () => {
    let newUser = new User({
      username: 'testUser',
      email: 'test@test.com',
      password: 'supersecret',
    });

    let savedUser = await newUser.save();
    expect(savedUser.password).not.toEqual('supersecret');
  });
});

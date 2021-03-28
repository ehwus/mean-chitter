import { connectTestDB, clearDatabase, closeDatabase } from '../config/test-db';
import { createValidUser } from '../spec/support/test-helpers';
import { UserModel } from './user.model';

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
});

import { connectTestDB, clearDatabase, closeDatabase } from '../config/test-db';
import { IUser, User } from '../users/user.model';

beforeAll(async () => await connectTestDB());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('User Model', () => {
  it('allows the creation of a user', async () => {
    let user: IUser = new User({
      username: 'test',
      email: 'test',
      password: 'test',
    });

    await user.save();
  });
});

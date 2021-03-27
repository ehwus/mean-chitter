import { IUser, User } from '../../users/user.model';

export const createValidUser = async () => {
  let user: IUser = new User({
    username: 'testuser',
    email: 'test@test.com',
    password: 'test12345',
  });

  return await user.save();
};
